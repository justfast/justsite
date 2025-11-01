import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";



export const getStockById = async (productId: string): Promise<number> => {
  try {
    const ref = doc(db, "stock", productId); // collection "stock"
    const snap = await getDoc(ref);

    if (!snap.exists()) return 0;

    const data = snap.data();
    if (!data || typeof data.stock !== "number") return 0;

    return data.stock;
  } catch (err) {
    console.error("❌ Errore leggendo Firestore per id:", productId, err);
    return 0;
  }
};
