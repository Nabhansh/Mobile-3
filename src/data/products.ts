export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnDeal?: boolean;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "UltraBook Pro X1",
    price: 99999,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800",
    isNew: true,
    description: "The thinnest, most powerful laptop we've ever built.",
  },
  {
    id: "2",
    name: "SonicBlast Headphones",
    price: 14999,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    isBestSeller: true,
    description: "Immersive noise-cancelling experience.",
  },
  {
    id: "3",
    name: "PowerCore 20000",
    price: 2999,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1609592424300-654cfa6f62d8?auto=format&fit=crop&q=80&w=800",
    isOnDeal: true,
    description: "High capacity portable charger for all your devices.",
  },
  {
    id: "4",
    name: "PixelFrame 4K Monitor",
    price: 34999,
    category: "Monitors",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
    isNew: true,
    description: "Crystal clear resolution for creative professionals.",
  },
  {
    id: "5",
    name: "SmartWatch Series 5",
    price: 29999,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    isBestSeller: true,
    description: "Track your fitness and stay connected.",
  },
  {
    id: "6",
    name: "MechKey RGB Keyboard",
    price: 8999,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&q=80&w=800",
    isOnDeal: true,
    description: "Tactile mechanical switches with customizable RGB.",
  },
  {
    id: "7",
    name: "Phone 15 Pro",
    price: 129999,
    category: "Phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
    isBestSeller: true,
    description: "The ultimate smartphone experience.",
  },
  {
    id: "8",
    name: "GameStation 5",
    price: 49999,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800",
    isNew: true,
    description: "Next-gen gaming console.",
  },
];
