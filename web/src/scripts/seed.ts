import { esClient } from "@/lib/elasticsearch";

const products = [
  {
    id: 1,
    name: "Raspberry Pi 4 Model B",
    category: "Processors",
    price: 4999,
  },
  {
    id: 2,
    name: "Arduino Uno R3",
    category: "Processors",
    price: 699,
  },
  {
    id: 3,
    name: "Temperature Sensor",
    category: "Sensors",
    price: 199,
  }
];

async function seed() {
  for (const product of products) {
    await esClient.index({
      index: "products",
      id: product.id.toString(),
      document: product,
    });
  }

  console.log("✅ Data inserted");
}

seed();