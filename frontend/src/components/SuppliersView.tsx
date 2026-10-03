import React, { useState } from 'react';
import { Truck, Plus, Mail, Phone, MapPin, CheckCircle, Clock, X } from 'lucide-react';
import { fetchFromAPI } from '../services/api';

interface SuppliersViewProps {
  suppliers: any[];
  products: any[];
  onRefreshProducts: () => void;
}

export const SuppliersView: React.FC<SuppliersViewProps> = ({ suppliers, products, onRefreshProducts }) => {
  const [showPOModal, setShowPOModal] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0]?.id || "");
  const [poProduct, setPoProduct] = useState(products[0]?.name || "");
  const [poQuantity, setPoQuantity] = useState(50);
  const [poCost, setPoCost] = useState(100);
  
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([
    {
      id: "po-101",
      supplier_name: "Metro Cash & Carry Wholesale",
      product_name: "Fortune Sunlite Sunflower Oil 1L",
      qty: 40,
      cost: 125,
      total: 5000,
      status: "Pending",
      order_date: "2026-10-02"
    }
  ]);

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find(s => s.id === selectedSupplierId) || suppliers[0];
    
    const newPO = {
      id: "po-" + Math.floor(Math.random() * 900 + 100),
      supplier_name: sup?.name || "Wholesale Supplier",
      product_name: poProduct,
      qty: Number(poQuantity),
      cost: Number(poCost),
      total: Number(poQuantity) * Number(poCost),
      status: "Pending",
      order_date: new Date().toISOString().split("T")[0]
    };

    setPurchaseOrders([newPO, ...purchaseOrders]);
    setShowPOModal(false);
  };

  const handleReceiveGoods = (poId: string) => {
    const updated = purchaseOrders.map((po) => {
      if (po.id === poId) {
        // Find product and update stock
        const prod = products.find(p => p.name === po.product_name);
        if (prod) {
          prod.stock += po.qty;
        }
        return { ...po, status: "Received" };
      }
      return po;
    });

    setPurchaseOrders(updated);
    onRefreshProducts();
  };

  return (
    <div className="space-y-6">
      
      {/* Supplier Directory & Add PO */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white">Wholesale Distributors & Suppliers</h3>
          <p className="text-xs text-slate-400">Manage supplier contacts & create replenishment purchase orders.</p>
        </div>
        <button
          onClick={() => setShowPOModal(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500 flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Purchase Order</span>
        </button>
      </div>

      {/* Supplier Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {suppliers.map((s) => (
          <div key={s.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm flex items-center space-x-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>{s.name}</span>
              </h4>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Avg Delivery: {s.avg_delivery_days} days
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{s.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{s.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate">{s.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Orders Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Purchase Orders History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">PO ID</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Item Ordered</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Total Cost</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-white">{po.id}</td>
                  <td className="p-3 text-slate-300">{po.supplier_name}</td>
                  <td className="p-3 font-semibold text-white">{po.product_name}</td>
                  <td className="p-3">{po.qty} units</td>
                  <td className="p-3 font-bold text-emerald-400">₹{po.total}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      po.status === "Received" ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {po.status === "Pending" ? (
                      <button
                        onClick={() => handleReceiveGoods(po.id)}
                        className="px-3 py-1 text-[11px] font-bold text-white bg-emerald-500 rounded-lg hover:bg-emerald-400"
                      >
                        Confirm Received Stock
                      </button>
                    ) : (
                      <span className="text-slate-500 text-[10px]">Stock Updated</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Purchase Order Modal */}
      {showPOModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Create Purchase Order</h3>
              <button onClick={() => setShowPOModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePO} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Select Supplier</label>
                <select
                  value={selectedSupplierId}
                  onChange={(e) => setSelectedSupplierId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Product to Replenish</label>
                <select
                  value={poProduct}
                  onChange={(e) => setPoProduct(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Order Quantity</label>
                  <input
                    type="number"
                    required
                    value={poQuantity}
                    onChange={(e) => setPoQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Unit Cost (₹)</label>
                  <input
                    type="number"
                    required
                    value={poCost}
                    onChange={(e) => setPoCost(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500"
              >
                Send Purchase Order
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
