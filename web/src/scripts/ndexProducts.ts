import { esClient } from "../lib/elasticsearch";

async function indexProducts() {
  await esClient.index({
    index: "products",
    document: {
      name: "Temperature Sensor",
      category: "Sensors",
      price: 299,
    },
  });

  console.log("✅ Product indexed");
}

indexProducts();