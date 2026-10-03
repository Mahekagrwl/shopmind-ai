import React, { useState } from 'react';
import { Layers, AlertTriangle, ArrowUpRight, ShieldAlert, CheckCircle, RefreshCw, X } from 'lucide-react';
import { fetchFromAPI } from '../services/api';

interface InventoryViewProps {
  products: any[];
  onRefreshProducts: () => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ products, onRefreshProducts }) => {
  const [filterMode, setFilterMode] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState<string>("Stock Audit / Physical Count");

  const lowStockCount = products.filter(p => p.stock <= p.min_stock_alert).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  const filteredProducts = products.filter(p => {
    if (filterMode === "Low Stock") return p.stock <= p.min_stock_alert && p.stock > 0;
    if (filterMode === "Out of Stock") return p.stock === 0;
    return true;
  });

  const handleStockAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      await fetchFromAPI('/inventory/adjust', {
        method: 'POST',
        body: JSON.stringify({
          product_id: selectedProduct.id,
          new_stock: Number(newStockVal),
          reason: adjustReason
        })
      });
    } catch (err) {
      selectedProduct.stock = Number(newStockVal);
    }

    setSelectedProduct(null);
    onRefreshProducts();
  };

  return (
    <div className="space-y-6">
      
      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Total Available Stock</div>
          <div className="text-2xl font-bold text-white">
            {products.reduce((acc, p) => acc + p.stock, 0)} <span className="text-xs text-slate-400 font-normal">units</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Low Stock SKUs</div>
          <div className="text-2xl font-bold text-amber-400">{lowStockCount}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Out of Stock SKUs</div>
          <div className="text-2xl font-bold text-red-400">{outOfStockCount}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Estimated Stock Valuation</div>
          <div className="text-2xl font-bold text-emerald-400">
            ₹{products.reduce((acc, p) => acc + (p.stock * p.purchase_price), 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        {["All", "Low Stock", "Out of Stock"].map((mode) => (
          <button
            key={mode}
            onClick={() => setFilterMode(mode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterMode === mode 
                ? 'bg-emerald-500 text-white shadow-md' 
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Stock Control Table</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Barcode</th>
                <th className="p-3">Current Stock</th>
                <th className="p-3">Min Alert Threshold</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.map((p) => {
                const isOut = p.stock === 0;
                const isLow = p.stock <= p.min_stock_alert && !isOut;
                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-white">{p.name}</td>
                    <td className="p-3 font-mono text-slate-400">{p.barcode}</td>
                    <td className="p-3 font-bold text-emerald-400">{p.stock} units</td>
                    <td className="p-3 text-slate-400">{p.min_stock_alert} units</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isOut ? 'bg-red-500/20 text-red-400' : isLow ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {isOut ? 'OUT OF STOCK' : isLow ? 'LOW STOCK' : 'IN STOCK'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedProduct(p);
                          setNewStockVal(p.stock);
                        }}
                        className="px-3 py-1 text-[11px] font-bold text-slate-300 bg-slate-800 rounded-lg hover:bg-slate-700 hover:text-white"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Stock Adjustment — {selectedProduct.name}</h3>
              <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStockAdjust} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">New Stock Count</label>
                <input
                  type="number"
                  required
                  value={newStockVal}
                  onChange={(e) => setNewStockVal(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Reason for Adjustment</label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="Physical Stock Audit">Physical Stock Audit</option>
                  <option value="Damaged / Broken Product">Damaged / Broken Product</option>
                  <option value="Expired Item">Expired Item</option>
                  <option value="Supplier Return">Supplier Return</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500"
              >
                Save Adjustment
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
