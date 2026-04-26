// lib/productsData.ts

// ---------------- TYPES ----------------
export type ElectronicsProduct = {
  id: number;
  category: string;
  type: string;
  value: string;
  costPer100?: string | null;
  costPerUnit?: string | null;
  sellingPrice?: number | null;
  margin?: number | null;
};

// ---------------- DATA ----------------
export const electronicsProducts: ElectronicsProduct[] = [
  {
    id: 1,
    category: "Resistor",
    type: "Carbon Film",
    value: "1kΩ - 100kΩ",
    costPer100: "40-70",
    costPerUnit: "2-3",
    sellingPrice: null,
    margin: null,
  },
  {
    id: 2,
    category: "Resistor",
    type: "Metal Film",
    value: "10kΩ",
    costPer100: "40-70",
    costPerUnit: "2-3",
    sellingPrice: null,
    margin: null,
  },
  {
    id: 3,
    category: "Capacitor",
    type: "Ceramic Capacitor",
    value: "100pF - 100nF",
    costPer100: "30-60",
    costPerUnit: null,
    sellingPrice: null,
    margin: null,
  },
  {
    id: 4,
    category: "Diode",
    type: "Rectifier Diode",
    value: "1N4007, 1N5408",
    costPer100: "50-80",
    costPerUnit: "1",
    sellingPrice: null,
    margin: null,
  },
  {
    id: 5,
    category: "Transistor",
    type: "BJT",
    value: "BC547, BC557",
    costPer100: null,
    costPerUnit: "1-5",
    sellingPrice: null,
    margin: null,
  },
  {
    id: 6,
    category: "IC",
    type: "Timer IC",
    value: "NE555",
    costPer100: null,
    costPerUnit: "5-10",
    sellingPrice: null,
    margin: null,
  },
  {
    id: 7,
    category: "Arduino",
    type: "Arduino UNO",
    value: "-",
    costPer100: null,
    costPerUnit: "250-400",
    sellingPrice: null,
    margin: null,
  },
  {
    id: 8,
    category: "Sensor",
    type: "Ultrasonic",
    value: "HC-SR04",
    costPer100: null,
    costPerUnit: "70-100",
    sellingPrice: null,
    margin: null,
  },
  {
    id: 9,
    category: "Motor Driver",
    type: "Driver Module",
    value: "L298N",
    costPer100: null,
    costPerUnit: "120-180",
    sellingPrice: null,
    margin: null,
  },
];
export const productsData = [
  {
    _id: "1",
    name: "Resistor 1kΩ",
    price: 2,
    category: "Resistor",
  },
  {
    _id: "2",
    name: "Arduino UNO",
    price: 300,
    category: "Arduino",
  },
  {
    _id: "3",
    name: "Ultrasonic Sensor HC-SR04",
    price: 80,
    category: "Sensor",
  },
];