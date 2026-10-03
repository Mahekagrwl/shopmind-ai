export interface BusinessCategoryConfig {
  id: string;
  name: string;
  tagline: string;
  accentColor: string; // Tailwind color class or hex
  themeBg: string;
  cardGradient: string;
  bannerImage: string;
  fieldsLabel: string[];
  sampleProducts: {
    name: string;
    price: number;
    cost: number;
    stock: number;
    attributes: Record<string, string>;
  }[];
}

export const BUSINESS_CATEGORIES: Record<string, BusinessCategoryConfig> = {
  "Grocery / Kirana": {
    id: "grocery",
    name: "Grocery / Kirana",
    tagline: "High-volume FMCG, batch tracking & weight billing",
    accentColor: "emerald",
    themeBg: "from-emerald-950 via-slate-900 to-amber-950",
    cardGradient: "from-emerald-600 to-teal-700",
    bannerImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop",
    fieldsLabel: ["Weight / Volume", "Unit Type", "Batch Number", "Expiry Date"],
    sampleProducts: [
      { name: "Fortune Sunlite Sunflower Oil 1L", price: 145, cost: 125, stock: 42, attributes: { "Weight": "1 Liter", "Expiry": "2027-06-30" } },
      { name: "Aashirvaad Shudh Chakki Atta 5kg", price: 275, cost: 230, stock: 8, attributes: { "Weight": "5 kg", "Expiry": "2027-03-15" } }
    ]
  },
  "Clothing / Fashion": {
    id: "clothing",
    name: "Clothing / Fashion",
    tagline: "Apparel variants, sizes, colors & seasonal collections",
    accentColor: "purple",
    themeBg: "from-purple-950 via-slate-900 to-pink-950",
    cardGradient: "from-purple-600 to-pink-600",
    bannerImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop",
    fieldsLabel: ["Size (S, M, L, XL)", "Color", "Brand", "Collection"],
    sampleProducts: [
      { name: "Slim Fit Cotton Casual Shirt", price: 1299, cost: 650, stock: 25, attributes: { "Size": "L", "Color": "Navy Blue" } }
    ]
  },
  "Pharmacy / Medical": {
    id: "pharmacy",
    name: "Pharmacy / Medical",
    tagline: "Batch control, manufacturer logs & strict expiry alerts",
    accentColor: "cyan",
    themeBg: "from-cyan-950 via-slate-900 to-teal-950",
    cardGradient: "from-cyan-600 to-teal-600",
    bannerImage: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&auto=format&fit=crop",
    fieldsLabel: ["Batch Number", "Manufacturer", "Expiry Date", "Schedule / OTC"],
    sampleProducts: [
      { name: "Paracetamol 650mg (Dolo 650)", price: 31, cost: 18, stock: 150, attributes: { "Batch": "DL-9082", "Expiry": "2027-11-01" } }
    ]
  },
  "Bakery": {
    id: "bakery",
    name: "Bakery",
    tagline: "Daily fresh items, shelf-life management & wastage logs",
    accentColor: "amber",
    themeBg: "from-amber-950 via-slate-900 to-orange-950",
    cardGradient: "from-amber-600 to-orange-600",
    bannerImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop",
    fieldsLabel: ["Baking Time", "Shelf Life (Hours/Days)", "Storage Temp"],
    sampleProducts: [
      { name: "Fresh Butter Croissant (Pack of 2)", price: 120, cost: 60, stock: 18, attributes: { "Shelf Life": "3 Days" } }
    ]
  },
  "Electronics": {
    id: "electronics",
    name: "Electronics",
    tagline: "Serial number tracking, warranty cards & high value items",
    accentColor: "indigo",
    themeBg: "from-indigo-950 via-slate-900 to-blue-950",
    cardGradient: "from-indigo-600 to-blue-600",
    bannerImage: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop",
    fieldsLabel: ["Model Number", "Serial Number", "Warranty Period"],
    sampleProducts: [
      { name: "Wireless Noise Cancelling Earbuds", price: 2499, cost: 1400, stock: 12, attributes: { "Model": "Pro X", "Warranty": "1 Year" } }
    ]
  },
  "Cosmetics": {
    id: "cosmetics",
    name: "Cosmetics",
    tagline: "Beauty shades, skincare types & expiry tracking",
    accentColor: "pink",
    themeBg: "from-pink-950 via-slate-900 to-rose-950",
    cardGradient: "from-pink-600 to-rose-600",
    bannerImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop",
    fieldsLabel: ["Shade Code", "Skin Type", "Brand", "Expiry Date"],
    sampleProducts: [
      { name: "Matte Lipstick Rose Velvet", price: 699, cost: 350, stock: 30, attributes: { "Shade": "#RV04", "Brand": "GlowArt" } }
    ]
  },
  "Stationery": {
    id: "stationery",
    name: "Stationery",
    tagline: "Office supplies, paper sizes, books & art tools",
    accentColor: "teal",
    themeBg: "from-teal-950 via-slate-900 to-emerald-950",
    cardGradient: "from-teal-600 to-yellow-600",
    bannerImage: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop",
    fieldsLabel: ["Paper GSM / Size", "Brand", "Pack Quantity"],
    sampleProducts: [
      { name: "A4 Printing Paper Ream 500 Sheets", price: 340, cost: 260, stock: 65, attributes: { "GSM": "75 GSM", "Pack": "500" } }
    ]
  },
  "Footwear": {
    id: "footwear",
    name: "Footwear",
    tagline: "UK/US shoe sizing, gender categories & material types",
    accentColor: "violet",
    themeBg: "from-violet-950 via-slate-900 to-purple-950",
    cardGradient: "from-violet-600 to-amber-700",
    bannerImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop",
    fieldsLabel: ["Shoe Size (UK/US)", "Gender", "Material", "Sole Type"],
    sampleProducts: [
      { name: "Men's Lightweight Running Shoes", price: 1899, cost: 950, stock: 14, attributes: { "Size": "UK 9", "Gender": "Men" } }
    ]
  },
  "Restaurant": {
    id: "restaurant",
    name: "Restaurant",
    tagline: "Menu items, kitchen ingredient inventory & quick tables",
    accentColor: "red",
    themeBg: "from-red-950 via-slate-900 to-orange-950",
    cardGradient: "from-red-600 to-orange-600",
    bannerImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
    fieldsLabel: ["Course Category", "Ingredients", "Portion Size", "Dietary Tag"],
    sampleProducts: [
      { name: "Paneer Butter Masala Special Combo", price: 260, cost: 110, stock: 50, attributes: { "Type": "Veg Main Course" } }
    ]
  },
  "Hardware": {
    id: "hardware",
    name: "Hardware",
    tagline: "Tools, electrical fittings, plumbing & weight items",
    accentColor: "sky",
    themeBg: "from-sky-950 via-slate-900 to-slate-800",
    cardGradient: "from-slate-700 to-sky-700",
    bannerImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop",
    fieldsLabel: ["Material Grade", "Dimensions", "Voltage / Power", "Brand"],
    sampleProducts: [
      { name: "Heavy Duty Cordless Drill 18V", price: 3499, cost: 2200, stock: 7, attributes: { "Power": "18V Lithium", "Brand": "BuildPro" } }
    ]
  },
  "Other / Custom Business": {
    id: "custom",
    name: "Other / Custom Business",
    tagline: "Customizable business rules, flex fields & tailored metrics",
    accentColor: "blue",
    themeBg: "from-blue-950 via-slate-900 to-cyan-950",
    cardGradient: "from-blue-600 to-indigo-600",
    bannerImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop",
    fieldsLabel: ["Custom Field 1", "Custom Field 2", "Tags"],
    sampleProducts: [
      { name: "Universal Retail Item", price: 500, cost: 300, stock: 20, attributes: { "Tag": "General" } }
    ]
  }
};
