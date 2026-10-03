import React, { useState } from 'react';
import { AlertTriangle, Plus, ShieldAlert, DollarSign, Image as ImageIcon, X } from 'lucide-react';
import { fetchFromAPI } from '../services/api';

interface WastageViewProps {
  products: any[];
  onRefreshProducts: () => void;
}

export const WastageView: React.FC<WastageViewProps> = ({ products, onRefreshProducts }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("Expired");
  const [photoUrl, setPhotoUrl] = useState("");
  
  const [wastageList, setWastageList] = useState<any[]>([
    {
      id: "wast-1",
      product_name: "Fresh Butter Croissant (Pack of 2)",
      quantity: 4,
      reason: "Spoiled / Expired",
      estimated_cost: 240.0,
      recorded_at: "2026-10-01 21:00:00"
    },
    {
      id: "wast-2",
      product_name: "Fortune Sunlite Sunflower Oil 1L",
      quantity: 1,
      reason: "Damaged Packaging",
      estimated_cost: 125.0,
      recorded_at: "2026-09-28 14:30:00"
    }
  ]);

  const totalLoss = wastageList.reduce((acc, w) => acc + w.estimated_cost, 0);

  const handleRecordWastage = async (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === selectedProductId) || products[0];
    if (!prod) return;

    const cost = prod.purchase_price * Number(quantity);

    const payload = {
      product_id: prod.id,
      product_name: prod.name,
      quantity: Number(quantity),
      reason,
      estimated_cost: cost,
      photo_url: photoUrl || null
    };

    try {
      await fetchFromAPI('/wastage', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (err) {
      // Local fallback
    }

    setWastageList([
      {
        id: "wast-" + Math.floor(Math.random() * 900 + 100),
        ...payload,
        recorded_at: new Date().toLocaleString()
      },
      ...wastageList
    ]);

    // Update stock locally
    prod.stock = Math.max(0, prod.stock - Number(quantity));

    setShowAddModal(false);
    onRefreshProducts();
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Total Loss Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-red-400 font-bold text-xs">
            <ShieldAlert className="w-4 h-4" />
            <span>Wastage & Damage Control</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">Spoilage & Inventory Losses</h3>
          <p className="text-xs text-slate-400">Track damaged, expired, or unsold inventory items.</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-right">
            <div className="text-[10px] text-slate-400 font-medium">Recorded Financial Loss</div>
            <div className="text-lg font-black text-red-400">₹{totalLoss.toLocaleString()}</div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-3 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-xl hover:from-red-400 hover:to-rose-500 shadow-md flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Record Wastage</span>
          </button>
        </div>
      </div>

      {/* Wastage Logs Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Wastage History & Audit Log</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Quantity Lost</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Financial Loss (₹)</th>
                <th className="p-3">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {wastageList.map((w) => (
                <tr key={w.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-white">{w.product_name}</td>
                  <td className="p-3 font-semibold text-amber-400">{w.quantity} units</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-medium border border-red-500/20">
                      {w.reason}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-red-400">₹{w.estimated_cost}</td>
                  <td className="p-3 text-slate-400">{w.recorded_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Record Damaged / Expired Product</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordWastage} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Select Product</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.stock} in stock)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Quantity Damaged/Expired</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Reason</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="Expired">Expired</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Spoiled">Spoiled</option>
                  <option value="Unsold / Wastage">Unsold / Wastage</option>
                  <option value="Broken">Broken</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Optional Photo URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-xl hover:from-red-400 hover:to-rose-500"
              >
                Save Wastage Record & Deduct Stock
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
