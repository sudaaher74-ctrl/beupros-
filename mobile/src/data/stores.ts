export interface StoreHub {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  phone: string;
  hours: string;
  status: "Open Now" | "Closes at 8 PM";
  type: "Flagship Hub" | "Express Trade Center" | "Academy & Pro Store";
  services: string[];
}

export const STORE_HUBS: StoreHub[] = [
  {
    id: "delhi-cp",
    name: "Beupros Flagship Pro Hub — Connaught Place",
    city: "New Delhi",
    state: "Delhi NCR",
    address: "Block E, Inner Circle, Connaught Place, New Delhi",
    pincode: "110001",
    phone: "+91 11 4982 7100",
    hours: "9:00 AM – 8:30 PM (Mon–Sat) • 10:00 AM – 6:00 PM (Sun)",
    status: "Open Now",
    type: "Flagship Hub",
    services: ["2-Hour Click & Collect", "Colorist Mixing Bar", "Shear & Blade Sharpening", "Live Masterclass Studio"],
  },
  {
    id: "mumbai-bandra",
    name: "Beupros West Pro Hub — Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Waterfield Road, Off Linking Road, Bandra West, Mumbai",
    pincode: "400050",
    phone: "+91 22 6821 3400",
    hours: "9:30 AM – 8:30 PM (Mon–Sat) • 10:30 AM – 6:00 PM (Sun)",
    status: "Open Now",
    type: "Academy & Pro Store",
    services: ["2-Hour Click & Collect", "Appliance Warranty Testing", "Bulk Salon Order Desk", "Color Formulation Lab"],
  },
  {
    id: "bengaluru-indiranagar",
    name: "Beupros South Flagship — Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru",
    pincode: "560038",
    phone: "+91 80 4390 1200",
    hours: "9:00 AM – 8:00 PM (Mon–Sat) • Closed Sundays",
    status: "Open Now",
    type: "Flagship Hub",
    services: ["2-Hour Click & Collect", "Certified Stylist Concierge", "Electric Tool Repair", "Nail Tech Demo Bar"],
  },
  {
    id: "hyderabad-jubilee",
    name: "Beupros Regional Center — Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    address: "Road No. 36, Near Peddamma Temple, Jubilee Hills, Hyderabad",
    pincode: "500033",
    phone: "+91 40 4567 8900",
    hours: "9:00 AM – 8:00 PM (Mon–Sat)",
    status: "Open Now",
    type: "Express Trade Center",
    services: ["Same-Day Priority Pickup", "Color Bar Inventory", "Wholesale Account Setup"],
  },
  {
    id: "chennai-tnagar",
    name: "Beupros Trade Counter — T. Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "Pondy Bazaar, Sir Thyagaraya Road, T. Nagar, Chennai",
    pincode: "600017",
    phone: "+91 44 2815 6700",
    hours: "9:30 AM – 8:00 PM (Mon–Sat)",
    status: "Open Now",
    type: "Express Trade Center",
    services: ["Curbside Pro Pickup", "Spa & Esthetician Consumables", "Salon Furniture Showroom"],
  },
  {
    id: "kolkata-parkstreet",
    name: "Beupros East Pro Center — Park Street",
    city: "Kolkata",
    state: "West Bengal",
    address: "Park Street, Camac Street Intersection, Kolkata",
    pincode: "700016",
    phone: "+91 33 2289 4500",
    hours: "10:00 AM – 7:30 PM (Mon–Sat)",
    status: "Open Now",
    type: "Academy & Pro Store",
    services: ["2-Hour Click & Collect", "Live Color Demo Arena", "Barber Tools Specialist Desk"],
  },
  {
    id: "pune-koregaon",
    name: "Beupros Pro Hub — Koregaon Park",
    city: "Pune",
    state: "Maharashtra",
    address: "North Main Road, Koregaon Park, Pune",
    pincode: "411001",
    phone: "+91 20 6712 8900",
    hours: "9:00 AM – 8:00 PM (Mon–Sat)",
    status: "Open Now",
    type: "Express Trade Center",
    services: ["Instant Trade Pickup", "Hair Smoothing Demo Booth", "Commercial 5L Can Dispensing"],
  },
];
