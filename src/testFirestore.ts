// testFirestore.ts
import { db } from "./firebaseConfig"; // assicurati che punti al file giusto
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function testFirestore() {
  try {
    // 1️⃣ Scrittura di un prodotto di prova
    const productRef = doc(db, "stock", "test-product"); // collection "stock", doc "test-product"
    await setDoc(productRef, {
      name: "Test Product",
      price: 9.99,
      stock: 5
    });
    console.log("✅ Documento scritto correttamente");

    // 2️⃣ Lettura dello stesso documento
    const docSnap = await getDoc(productRef);
    if (docSnap.exists()) {
      console.log("📦 Documento letto:", docSnap.data());
    } else {
      console.log("❌ Documento non trovato");
    }
  } catch (error) {
    console.error("🔥 Errore Firestore:", error);
  }
}


