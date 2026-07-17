"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

export interface Address {
  id?: string;

  fullName: string;
  phone: string;
  email: string;

  address: string;
  city: string;
  province: string;
  district: string;
  zipCode: string;

  isDefault: boolean;

  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export const saveAddress = async (
  userId: string,
  address: Omit<Address, "id">,
) => {
  const addressRef = collection(db, "users", userId, "addresses");

  // If this address is default,
  // remove default from every other address.
  if (address.isDefault) {
    const snapshot = await getDocs(addressRef);

    const batch = writeBatch(db);

    snapshot.docs.forEach((d) => {
      batch.update(d.ref, {
        isDefault: false,
      });
    });

    await batch.commit();
  }

  return addDoc(addressRef, {
    ...address,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateAddress = async (
  userId: string,
  addressId: string,
  address: Partial<Address>,
) => {
  const addressRef = collection(db, "users", userId, "addresses");

  if (address.isDefault) {
    const snapshot = await getDocs(addressRef);

    const batch = writeBatch(db);

    snapshot.docs.forEach((d) => {
      batch.update(d.ref, {
        isDefault: false,
      });
    });

    await batch.commit();
  }

  await updateDoc(doc(db, "users", userId, "addresses", addressId), {
    ...address,
    updatedAt: serverTimestamp(),
  });
};

export const deleteAddress = async (userId: string, addressId: string) => {
  await deleteDoc(doc(db, "users", userId, "addresses", addressId));
};

export const setDefaultAddress = async (userId: string, addressId: string) => {
  const addressRef = collection(db, "users", userId, "addresses");

  const snapshot = await getDocs(addressRef);

  const batch = writeBatch(db);

  snapshot.docs.forEach((d) => {
    batch.update(d.ref, {
      isDefault: d.id === addressId,
      updatedAt: serverTimestamp(),
    });
  });

  await batch.commit();
};

export const listenAddresses = (
  userId: string,
  callback: (addresses: Address[]) => void,
) => {
  return onSnapshot(
    query(
      collection(db, "users", userId, "addresses"),
      orderBy("createdAt", "desc"),
    ),
    (snapshot) => {
      callback(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Address, "id">),
        })),
      );
    },
  );
};

export const getAddresses = async (userId: string): Promise<Address[]> => {
  const snapshot = await getDocs(
    query(
      collection(db, "users", userId, "addresses"),
      orderBy("createdAt", "desc"),
    ),
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Address, "id">),
  }));
};
