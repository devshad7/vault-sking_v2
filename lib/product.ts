import { db } from "@/config/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import type { Product } from "@/data/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((doc) => ({
    _id: doc.id,
    ...(doc.data() as Omit<Product, "_id">),
  }));
};