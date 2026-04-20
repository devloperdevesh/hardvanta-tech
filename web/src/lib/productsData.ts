// lib/productsData.ts

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
};

const brands = ["Bosch", "Siemens", "Honeywell", "Omron", "Panasonic"];
const categories = ["sensors", "electronics", "industrial", "automation"];

export const productsData: Product[] = Array.from(
  { length: 10000 },
  (_, i) => {
    const brand = brands[i % brands.length];
    const category = categories[i % categories.length];

    return {
      id: i + 1,
      name: `${brand} ${category} Product ${i + 1}`,
      brand,
      price: Math.floor(Math.random() * 5000) + 500,
      category,
      image: `https://picsum.photos/seed/product-${i}/400/400`,
    };
  }
);