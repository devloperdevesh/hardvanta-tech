export async function GET() {
  return Response.json([
    // ================= PROCESSORS =================
    {
      id: 1,
      name: "Raspberry Pi 4 Model B (4GB)",
      brand: "Raspberry Pi",
      price: 4999,
      category: "Processors",
      image: "https://example.com/images/raspberry-pi-4.jpg"
    },
    {
      id: 2,
      name: "Arduino Uno R3",
      brand: "Arduino",
      price: 699,
      category: "Processors",
      image: "https://example.com/images/arduino-uno.jpg"
    },
    {
      id: 3,
      name: "NodeMCU ESP8266",
      brand: "Espressif",
      price: 249,
      category: "Processors",
      image: "https://example.com/images/nodemcu.jpg"
    },

    // ================= SENSORS =================
    {
      id: 4,
      name: "DHT11 Temperature Sensor",
      brand: "Generic",
      price: 99,
      category: "Sensors",
      image: "https://example.com/images/dht11.jpg"
    },
    {
      id: 5,
      name: "DHT22 Sensor",
      brand: "Adafruit",
      price: 299,
      category: "Sensors",
      image: "https://example.com/images/dht22.jpg"
    },
    {
      id: 6,
      name: "Ultrasonic Sensor HC-SR04",
      brand: "Generic",
      price: 129,
      category: "Sensors",
      image: "https://example.com/images/hcsr04.jpg"
    },
    {
      id: 7,
      name: "LDR Light Sensor",
      brand: "Generic",
      price: 20,
      category: "Sensors",
      image: "https://example.com/images/ldr.jpg"
    },

    // ================= MODULES =================
    {
      id: 8,
      name: "ESP32 WiFi + Bluetooth Module",
      brand: "Espressif",
      price: 299,
      category: "Modules",
      image: "https://example.com/images/esp32.jpg"
    },
    {
      id: 9,
      name: "Relay Module 5V",
      brand: "Songle",
      price: 79,
      category: "Modules",
      image: "https://example.com/images/relay.jpg"
    },
    {
      id: 10,
      name: "Bluetooth Module HC-05",
      brand: "Generic",
      price: 199,
      category: "Modules",
      image: "https://example.com/images/hc05.jpg"
    },

    // ================= ICs =================
    {
      id: 11,
      name: "NE555 Timer IC",
      brand: "Texas Instruments",
      price: 25,
      category: "ICs",
      image: "https://example.com/images/ne555.jpg"
    },
    {
      id: 12,
      name: "LM358 Op-Amp IC",
      brand: "STMicroelectronics",
      price: 30,
      category: "ICs",
      image: "https://example.com/images/lm358.jpg"
    },
    {
      id: 13,
      name: "ATmega328P IC",
      brand: "Microchip",
      price: 250,
      category: "ICs",
      image: "https://example.com/images/atmega328.jpg"
    },

    // ================= NETWORKING =================
    {
      id: 14,
      name: "ESP8266 WiFi Module",
      brand: "Espressif",
      price: 199,
      category: "Networking",
      image: "https://example.com/images/esp8266.jpg"
    },
    {
      id: 15,
      name: "Ethernet Shield W5100",
      brand: "Arduino",
      price: 499,
      category: "Networking",
      image: "https://example.com/images/ethernet-shield.jpg"
    },

    // ================= AUTO-GENERATED PRODUCTS =================
    ...Array.from({ length: 90 }, (_, i) => ({
      id: 16 + i,
      name: `Electronic Component ${i + 1}`,
      brand: ["Generic", "Adafruit", "SparkFun", "Seeed Studio"][i % 4],
      price: Math.floor(Math.random() * 500) + 50,
      category: ["Processors", "Sensors", "ICs", "Modules", "Networking"][i % 5],
      image: `https://picsum.photos/seed/product${i}/300/300`
    }))
  ]);
}