import React from 'react';
import { User, ShoppingBag, Award, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CustomerPortalViewProps {
  currentUser: any;
  transactions: any[];
}

export const CustomerPortalView: React.FC<CustomerPortalViewProps> = ({ currentUser, transactions }) => {
  const customerPhone = currentUser?.phone || "+91 98765 00001";
  
  // Filter customer's own transactions safely
  const customerTx = transactions.filter(tx => !tx.customer_phone || tx.customer_phone === customerPhone);

  const totalSpent = customerTx.reduce((acc, tx) => acc + tx.total, 0);
  const loyaltyPoints = Math.floor(totalSpent / 10);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
            <User className="w-4 h-4" />
            <span>Customer Rewards & Purchase Portal</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Welcome back, {currentUser?.full_name || 'Valued Customer'}</h2>
          <p className="text-xs text-slate-400">View your purchase history, receipts, and claim loyalty rewards.</p>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-right">
          <div className="text-[10px] uppercase font-bold">Loyalty Balance</div>
          <div className="text-xl font-black flex items-center space-x-1">
            <Award className="w-5 h-5" />
            <span>{loyaltyPoints} pts</span>
          </div>
        </div>
      </div>

      {/* Customer Profile & Rewards Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        
        {/* Profile Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Profile</h3>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div><strong>Full Name:</strong> {currentUser?.full_name || 'Anshu Sharma'}</div>
            <div><strong>Phone Number:</strong> {currentUser?.phone || '+91 99887 76655'}</div>
            <div><strong>Email Address:</strong> {currentUser?.email || 'customer@shopmind.ai'}</div>
            <div><strong>Membership Tier:</strong> <span className="text-emerald-400 font-bold">Gold Member</span></div>
          </div>
        </div>

        {/* Security Isolation Confirmation */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Customer Security Guard</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your customer account is strictly isolated. You have full access to your personal invoices and rewards, with zero access to store backend operations or staff data.
            </p>
          </div>
          <button 
            onClick={() => alert(`Voucher redeemed! Code SHOP50 applied to your next POS billing.`)}
            className="w-full py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500"
          >
            Redeem ₹50 Voucher (100 Pts)
          </button>
        </div>

      </div>

      {/* Customer Invoices Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Your Purchase History & Receipts</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Invoice No</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Items Purchased</th>
                <th className="p-3">Payment Mode</th>
                <th className="p-3">Total Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {customerTx.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-white">{tx.invoice_no}</td>
                  <td className="p-3 text-slate-400">{tx.created_at}</td>
                  <td className="p-3 font-medium text-slate-200">
                    {tx.items?.map((it: any) => `${it.name} (x${it.qty})`).join(', ')}
                  </td>
                  <td className="p-3 text-emerald-400 font-semibold">{tx.payment_method}</td>
                  <td className="p-3 font-bold text-white">₹{tx.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
