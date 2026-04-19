import { esClient } from "@/lib/elasticsearch";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("search") || "";
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  try {
    // 🧠 Build Filters
    const filters: any[] = [];

    if (category) {
      filters.push({ term: { category } });
    }

    if (minPrice || maxPrice) {
      filters.push({
        range: {
          price: {
            ...(minPrice && { gte: Number(minPrice) }),
            ...(maxPrice && { lte: Number(maxPrice) }),
          },
        },
      });
    }

    // 🔍 Build Query
    const esQuery: any = {
      bool: {
        must: [],
        filter: filters,
      },
    };

    if (query.trim()) {
      esQuery.bool.must.push({
        multi_match: {
          query,
          type: "bool_prefix",
          fields: ["name", "name._2gram", "name._3gram"],
        },
      });
    }

    const result = await esClient.search({
      index: "products",
      query: esQuery,
    });

    const products: Product[] =
      result.hits?.hits?.map((hit: any) => hit._source) || [];

    // 👉 Fallback if no results
    if (products.length === 0) {
      return Response.json(productsData);
    }

    return Response.json(products);
  } catch (error) {
    console.error("Search Error:", error);

    // 👉 Fallback if ES fails
    return Response.json(productsData);
  }
}

/* 📦 Static Data (Fallback Products) */
const productsData: Product[] = [
  {
    id: 1,
    name: "Raspberry Pi 4 Model B (4GB)",
    brand: "Raspberry Pi",
    price: 4999,
    category: "Processors",
    image: "https://picsum.photos/seed/pi/300/300",
  },
  {
    id: 2,
    name: "Arduino Uno R3",
    brand: "Arduino",
    price: 699,
    category: "Processors",
    image: "https://picsum.photos/seed/arduino/300/300",
  },
  {
    id: 3,
    name: "NodeMCU ESP8266",
    brand: "Espressif",
    price: 249,
    category: "Processors",
    image: "https://picsum.photos/seed/nodemcu/300/300",
  },

  // 🔥 Auto-generated products
  ...Array.from({ length: 30 }, (_, i) => ({
    id: 4 + i,
    name: `Electronic Component ${i + 1}`,
    brand: ["Generic", "Adafruit", "SparkFun"][i % 3],
    price: Math.floor(Math.random() * 1000) + 50,
    category: ["Processors", "Sensors", "ICs"][i % 3],
    image: `https://picsum.photos/seed/product${i}/300/300`,
  })),
];