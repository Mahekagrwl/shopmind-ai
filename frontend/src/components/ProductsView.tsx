import React, { useState } from 'react';
import { Plus, Search, Edit2, Archive, Barcode, Image as ImageIcon, Tag, Check, X } from 'lucide-react';
import { BUSINESS_CATEGORIES } from '../config/categories';
import { fetchFromAPI } from '../services/api';

interface ProductsViewProps {
  products: any[];
  categoryName: string;
  onRefreshProducts: () => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ products, categoryName, onRefreshProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("890" + Math.floor(100000000 + Math.random() * 900000000));
  const [purchasePrice, setPurchasePrice] = useState(100);
  const [sellingPrice, setSellingPrice] = useState(150);
  const [stock, setStock] = useState(25);
  const [imageUrl, setImageUrl] = useState("");
  
  // Category attributes state
  const [attr1, setAttr1] = useState("");
  const [attr2, setAttr2] = useState("");

  const catConfig = BUSINESS_CATEGORIES[categoryName] || BUSINESS_CATEGORIES["Grocery / Kirana"];

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const margin = purchasePrice > 0 ? Math.round(((sellingPrice - purchasePrice) / purchasePrice) * 1000) / 10 : 0;
    
    const payload = {
      name,
      barcode,
      category: categoryName,
      purchase_price: Number(purchasePrice),
      selling_price: Number(sellingPrice),
      profit_margin: margin,
      stock: Number(stock),
      min_stock_alert: 10,
      image_url: imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop",
      category_attributes: {
        [catConfig.fieldsLabel[0] || "Attribute 1"]: attr1 || "N/A",
        [catConfig.fieldsLabel[1] || "Attribute 2"]: attr2 || "N/A"
      }
    };

    try {
      await fetchFromAPI('/products', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (err) {
      // Local fallback in memory
      products.push({ id: "prod-" + Math.random().toString(36).substring(2, 6), ...payload });
    }

    setShowAddModal(false);
    onRefreshProducts();
    setName("");
  };

  const handleArchive = async (productId: string) => {
    if (!confirm("Are you sure you want to archive this product?")) return;
    try {
      await fetchFromAPI(`/products/${productId}`, { method: 'DELETE' });
    } catch (err) {
      const p = products.find(prod => prod.id === productId);
      if (p) p.is_archived = true;
    }
    onRefreshProducts();
  };

  const filteredProducts = products.filter(p => {
    if (p.is_archived) return false;
    if (!searchQuery) return true;
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.barcode.includes(searchQuery);
  });

  return (
    <div className="space-y-6">
      
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search products by name or barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500 flex items-center space-x-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Product Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Product Catalog ({filteredProducts.length} items)</h3>
          <span className="text-xs text-slate-400">Category Config: <strong className="text-emerald-400">{catConfig.name}</strong></span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Barcode</th>
                <th className="p-3">Cost Price</th>
                <th className="p-3">Sell Price</th>
                <th className="p-3">Margin</th>
                <th className="p-3">Available Stock</th>
                <th className="p-3">Category Attributes</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.map((p) => {
                const margin = p.profit_margin || (p.purchase_price > 0 ? Math.round(((p.selling_price - p.purchase_price) / p.purchase_price) * 100) : 0);
                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-white flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                        {p.image_url ? (
                          <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-slate-600 m-auto" />
                        )}
                      </div>
                      <span className="truncate max-w-[200px]">{p.name}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-400">{p.barcode}</td>
                    <td className="p-3">₹{p.purchase_price}</td>
                    <td className="p-3 font-bold text-emerald-400">₹{p.selling_price}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                        +{margin}%
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        p.stock <= 5 ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-200'
                      }`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">
                      {p.category_attributes ? (
                        <div className="flex flex-wrap gap-1 text-[10px]">
                          {Object.entries(p.category_attributes).map(([k, v]) => (
                            <span key={k} className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800 text-slate-300">
                              {k}: {String(v)}
                            </span>
                          ))}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleArchive(p.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                        title="Archive Product"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4 text-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Add Product ({catConfig.name})</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cotton Shirt or Paracetamol"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Barcode</label>
                  <input
                    type="text"
                    required
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-emerald-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Purchase Cost (₹)</label>
                  <input
                    type="number"
                    required
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-bold"
                  />
                </div>
              </div>

              {/* Dynamic Category Attributes */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 text-[11px] block">
                  Category Specific Fields ({catConfig.name}):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">{catConfig.fieldsLabel[0] || 'Attribute 1'}</label>
                    <input
                      type="text"
                      placeholder="e.g. Size or Weight"
                      value={attr1}
                      onChange={(e) => setAttr1(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">{catConfig.fieldsLabel[1] || 'Attribute 2'}</label>
                    <input
                      type="text"
                      placeholder="e.g. Color or Expiry"
                      value={attr2}
                      onChange={(e) => setAttr2(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500"
              >
                Save Product
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
