import React, { useState } from 'react';
import { ShieldCheck, Plus, UserCheck, UserX, Mail, Phone, X } from 'lucide-react';
import { fetchFromAPI } from '../services/api';

export const EmployeesView: React.FC = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Cashier");

  const [employees, setEmployees] = useState<any[]>([
    {
      id: "emp-1",
      name: "Ramesh Kumar",
      role: "Cashier",
      email: "ramesh@shopmind.ai",
      phone: "+91 98765 43210",
      is_active: true,
      permissions: ["POS Billing", "Invoice Printing"]
    },
    {
      id: "emp-2",
      name: "Suresh Patel",
      role: "Inventory Staff",
      email: "suresh@shopmind.ai",
      phone: "+91 98112 33445",
      is_active: true,
      permissions: ["Stock Intake", "Stock Adjustment", "Wastage Entry"]
    },
    {
      id: "emp-3",
      name: "Anita Verma",
      role: "Shop Manager",
      email: "anita@shopmind.ai",
      phone: "+91 99100 22334",
      is_active: true,
      permissions: ["POS Billing", "Products Control", "Suppliers", "Reports View"]
    }
  ]);

  const handleInviteEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const payload = {
      name,
      email,
      phone: phone || "+91 98765 00000",
      role,
      is_active: true,
      permissions: [role.toLowerCase() + "_default_access"]
    };

    try {
      await fetchFromAPI('/employees', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (err) {
      // Local fallback
    }

    setEmployees([...employees, { id: "emp-" + Math.floor(Math.random() * 900 + 100), ...payload }]);
    setShowInviteModal(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  const toggleEmployeeActive = (empId: string) => {
    setEmployees(employees.map(e => e.id === empId ? { ...e, is_active: !e.is_active } : e));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white">Employee & Role Permissions Management</h3>
          <p className="text-xs text-slate-400">Invite store staff, assign operational roles & enforce API security permissions.</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500 flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Employee</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Active Staff Roster ({employees.length} members)</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Staff Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Status</th>
                <th className="p-3">Assigned Permissions</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-white">{emp.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                      {emp.role}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{emp.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      emp.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {emp.is_active ? 'ACTIVE' : 'DEACTIVATED'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {emp.permissions.map((p: string, idx: number) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800 text-slate-300">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => toggleEmployeeActive(emp.id)}
                      className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                        emp.is_active 
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                      }`}
                    >
                      {emp.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Invite Employee / Assign Role</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteEmployee} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="staff@shopmind.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Role Assignment</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
                >
                  <option value="Shop Manager">Shop Manager</option>
                  <option value="Cashier">Cashier / Billing Staff</option>
                  <option value="Inventory Staff">Inventory Staff</option>
                  <option value="Accountant">Accountant / Finance</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500"
              >
                Send Invite & Assign Role
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
