import {
  Cpu,
  Activity,
  Microchip,
  Box,
  Wifi,
  Battery,
  Settings,
  Zap,
} from "lucide-react";

export const categories = [
  { name: "Processors", slug: "processors", icon: Cpu },
  { name: "Sensors", slug: "sensors", icon: Activity },
  { name: "ICs", slug: "ics", icon: Microchip },
  { name: "Modules", slug: "modules", icon: Box },
  { name: "Networking", slug: "networking", icon: Wifi },
  { name: "Power", slug: "power", icon: Battery },
  { name: "Motors", slug: "motors", icon: Settings },
  { name: "Components", slug: "components", icon: Zap },
] as const;

export type Category = (typeof categories)[number];