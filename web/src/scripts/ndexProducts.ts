import { getESClient } from "../lib/elasticsearch";

async function indexProducts() {
  try {
    const esClient = getESClient();

    if (!esClient) {
      console.warn("⚠️ Elasticsearch not configured");
      return;
    }

    await esClient.index({
      index: "products",
      id: crypto.randomUUID(), // ✅ unique id
      document: {
        name: "Temperature Sensor",
        category: "Sensors",
        price: 299,
      },
      refresh: true, // ✅ instant search
    });

    console.log("✅ Product indexed successfully");
  } catch (error) {
    console.error("❌ Indexing failed:", error);
  }
}

indexProducts();