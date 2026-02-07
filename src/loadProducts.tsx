// loadProducts.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
  gallery: string[];
  specifications: Record<string, string>;
}

export const loadProductsData = async (): Promise<Product[]> => {
  const products: Product[] = [];
  const MAX_SCAN = 35; // numero massimo di ID da controllare
  for (let id = 1; id <= MAX_SCAN; id++) {
    try {
      const mainRes = await fetch(`/articoli/${id}/main.json`);
      if (!mainRes.ok) break; // se non esiste, fermiamo il ciclo
      const mainData = await mainRes.json();

      const mainImage = `/articoli/${id}/image.png`;

      // Galleria immagini
      const gallery: string[] = [];
      for (let g = 1; g <= 10; g++) {
        const imgUrl = `/articoli/${id}/${g}.png`;
        const imgRes = await fetch(imgUrl);
        if (!imgRes.ok) break;
        gallery.push(imgUrl);
      }

      products.push({
        id,
        name: mainData.name,
        price: mainData.price,
        image: mainImage,
        description: mainData.description,
        category: mainData.category || "",
        features: mainData.features || [],
        gallery,
        specifications: mainData.specifications || {}
      });

    } catch (err) {
      console.warn(`Errore caricando articolo ${id}:`, err);
      break; // blocchiamo al primo ID mancante o errore
    }
  }

  return products;
};
