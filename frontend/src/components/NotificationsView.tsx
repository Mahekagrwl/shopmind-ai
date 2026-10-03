import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Clock, ShieldAlert, Package } from 'lucide-react';
import { fetchFromAPI } from '../services/api';

interface NotificationsViewProps {
  userRole: string;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ userRole }) => {
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: "notif-1",
      title: "Low Stock Warning: Aashirvaad Atta 5kg",
      message: "Stock level is 8 units (Below min threshold 15). Supplier reorder recommended.",
      type: "low_stock",
      is_read: false,
      created_at: "2026-10-02 10:00:00",
      role_visibility: ["Owner", "Manager", "Inventory Staff"]
    },
    {
      id: "notif-2",
      title: "Product Expiry Alert: Paracetamol 650mg",
      message: "Batch DL-9082 expires in 45 days. 150 units remaining in pharmacy stock.",
      type: "expiring",
      is_read: false,
      created_at: "2026-10-01 16:30:00",
      role_visibility: ["Owner", "Manager", "Inventory Staff"]
    },
    {
      id: "notif-3",
      title: "Recorded Spoilage Alert",
      message: "4 units of Fresh Butter Croissant logged as spoiled (Loss: ₹240).",
      type: "wastage",
      is_read: true,
      created_at: "2026-10-01 21:05:00",
      role_visibility: ["Owner", "Manager", "Accountant"]
    }
  ]);

  const toggleRead = async (id: string) => {
    try {
      await fetchFromAPI(`/notifications/${id}/read`, { method: 'PUT' });
    } catch (err) {}

    setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const visibleNotifs = notifications.filter(n => n.role_visibility.includes(userRole) || userRole === "Owner");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Notification Centre</h3>
            <p className="text-xs text-slate-400">Automated inventory alerts, expiry warnings & supplier reminders.</p>
          </div>
        </div>

        <button
          onClick={() => setNotifications(notifications.map(n => ({ ...n, is_read: true })))}
          className="text-xs text-emerald-400 font-bold hover:underline"
        >
          Mark All Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {visibleNotifs.map((n) => (
          <div
            key={n.id}
            onClick={() => toggleRead(n.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${
              !n.is_read
                ? 'bg-slate-900 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                : 'bg-slate-950 border-slate-800/80 opacity-70'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-slate-800 text-amber-400 mt-0.5">
                {n.type === 'low_stock' && <Package className="w-4 h-4 text-amber-400" />}
                {n.type === 'expiring' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                {n.type === 'wastage' && <ShieldAlert className="w-4 h-4 text-rose-400" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-white text-xs">{n.title}</h4>
                  {!n.is_read && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{n.created_at}</span>
                </div>
              </div>
            </div>

            <button className="text-[10px] text-slate-400 hover:text-white">
              {n.is_read ? 'Read' : 'Mark Read'}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
