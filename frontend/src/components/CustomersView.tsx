import React, { useState } from 'react';
import { Users, Plus, Award, Phone, Mail, MapPin, ShoppingBag, X } from 'lucide-react';
import { fetchFromAPI } from '../services/api';

export const CustomersView: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [customers, setCustomers] = useState<any[]>([
    {
      id: "cust-1",
      name: "Rajesh Malhotra",
      phone: "+91 98765 00001",
      email: "rajesh.m@gmail.com",
      address: "House 42, Green Park, New Delhi",
      total_purchases: 4850.0,
      loyalty_points: 485
    },
    {
      id: "cust-2",
      name: "Priya Sharma",
      phone: "+91 98765 00002",
      email: "priya.sharma@yahoo.com",
      address: "Flat 302, Cyber Heights, Gurugram",
      total_purchases: 8900.0,
      loyalty_points: 890
    }
  ]);

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const payload = { name, phone, email, address, total_purchases: 0, loyalty_points: 50 };

    try {
      await fetchFromAPI('/customers', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (err) {
      // Local fallback
    }

    setCustomers([...customers, { id: "cust-" + Math.floor(Math.random() * 900 + 100), ...payload }]);
    setShowAddModal(false);
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white">Customer Database & Loyalty Points</h3>
          <p className="text-xs text-slate-400">Track customer order history, repeat visits & loyalty reward points.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500 flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {customers.map((c) => (
          <div key={c.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">{c.name}</h4>
                <div className="text-xs text-slate-400 flex items-center space-x-2 mt-0.5">
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>{c.phone}</span>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-right">
                <div className="text-[10px] font-bold uppercase">Loyalty Points</div>
                <div className="text-base font-black flex items-center justify-end space-x-1">
                  <Award className="w-4 h-4" />
                  <span>{c.loyalty_points} pts</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center space-x-1">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Total Spend: <strong>₹{c.total_purchases.toLocaleString()}</strong></span>
              </span>
              <button 
                onClick={() => alert(`Reedemed 100 points for customer ${c.name}! ₹50 discount voucher applied.`)}
                className="text-[11px] font-bold text-emerald-400 hover:underline"
              >
                Redeem Reward Voucher
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Add Customer Profile</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Malhotra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="customer@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Address</label>
                <input
                  type="text"
                  placeholder="City, State"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500"
              >
                Save Customer Profile
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
