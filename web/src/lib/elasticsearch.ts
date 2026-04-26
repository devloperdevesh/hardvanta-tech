import { Client } from "@elastic/elasticsearch";

// ================= CLIENT =================
let esClient: Client | null = null;

export function getESClient() {
  if (esClient) return esClient;

  if (!process.env.ELASTIC_NODE || !process.env.ELASTIC_API_KEY) {
    console.warn("⚠️ Elasticsearch not configured");
    return null; // ❗ crash नहीं करेगा
  }

  esClient = new Client({
    node: process.env.ELASTIC_NODE,
    auth: {
      apiKey: process.env.ELASTIC_API_KEY,
    },
  });

  return esClient;
}

// ================= TYPES =================
export type ESProduct = {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  stock?: number;
  image?: string;
  sold?: number;
  createdBy?: string;
};

// ================= INDEX =================
export async function indexProduct(product: ESProduct) {
  const client = getESClient();
  if (!client) return;

  await client.index({
    index: "products",
    id: product.id,
    document: product,
    refresh: true,
  });
}

// ================= SEARCH =================
export async function searchProducts(query: string) {
  const client = getESClient();
  if (!client) return [];

  const result = await client.search({
    index: "products",
    query: {
      multi_match: {
        query,
        fields: ["name", "brand", "category"],
        type: "bool_prefix",
      },
    },
  });

  return result.hits.hits.map((hit: any) => hit._source) || [];
}

// ================= DELETE =================
export async function deleteProduct(id: string) {
  const client = getESClient();
  if (!client) return;

  await client.delete({
    index: "products",
    id,
    refresh: true,
  });
}