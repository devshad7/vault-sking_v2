"use client";

import {
  Timestamp,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/config/firebase.config";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;

  address: string;
  city: string;
  district: string;
  zipCode: string;
}

export interface OrderItem {
  productId: string;

  title: string;

  thumbnail: string;

  price: number;

  discount: number;

  quantity: number;

  sku: string;
}

export interface PlaceOrderInput {
  userId: string;

  paymentMethod: "cash";

  shippingAddress: ShippingAddress;

  items: OrderItem[];
}

const generateOrderNumber = () => {
  const now = new Date();

  return `VS-${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0",
  )}${String(now.getDate()).padStart(2, "0")}-${Date.now()
    .toString()
    .slice(-6)}`;
};

export const placeOrder = async ({
  userId,
  paymentMethod,
  shippingAddress,
  items,
}: PlaceOrderInput) => {
  if (items.length === 0) {
    throw new Error("Cart is empty.");
  }
  return runTransaction(db, async (transaction) => {
    const productSnapshots: Array<{
      item: OrderItem;
      stock: number;
    }> = [];

    let subtotal = 0;

    let discount = 0;

    for (const item of items) {
      const productRef = doc(db, "products", item.productId);

      const snapshot = await transaction.get(productRef);

      if (!snapshot.exists()) {
        throw new Error(`${item.title} no longer exists.`);
      }

      const product = snapshot.data();

      if (product.stock < item.quantity) {
        throw new Error(
          `${item.title} has only ${product.stock} left in stock.`,
        );
      }

      productSnapshots.push({
        item,
        stock: product.stock,
      });

      subtotal += item.price * item.quantity;

      discount += item.discount * item.quantity;
    }

    const shipping = 100;

    const total = subtotal - discount + shipping;
    const orderRef = doc(collection(db, "orders"));

    transaction.set(orderRef, {
      orderNumber: generateOrderNumber(),

      userId,

      status: "pending",

      customer: {
        fullName: shippingAddress.fullName,
        phone: shippingAddress.phone,
        email: shippingAddress.email,
      },

      shippingAddress,

      payment: {
        method: paymentMethod,
        verified: false,
      },

      totals: {
        subtotal,

        discount,

        shipping,

        total,
      },

      items,

      timeline: [
        {
          status: "pending",

          note: "Order placed successfully.",

          at: Timestamp.now(),
        },
      ],

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),
    });

    for (const { item, stock } of productSnapshots) {
      const productRef = doc(db, "products", item.productId);

      transaction.update(productRef, {
        stock: stock - item.quantity,
      });
    }

    for (const item of items) {
      const cartRef = doc(db, "carts", userId, "items", item.productId);

      transaction.delete(cartRef);
    }
    return orderRef.id;
  });
};
