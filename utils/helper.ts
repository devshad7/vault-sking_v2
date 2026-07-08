import { db } from "@/config/firebase.config";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";

export const getCategoryProductCount = async (
  categoryId: string,
): Promise<number> => {
  const q = query(
    collection(db, "products"),
    where("category", "==", categoryId),
  );

  const snapshot = await getCountFromServer(q);

  return snapshot.data().count;
};
