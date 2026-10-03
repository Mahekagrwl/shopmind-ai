import React from 'react';
import { 
  LayoutDashboard, ShoppingCart, Package, Layers, Users, Truck, AlertTriangle, 
  Sparkles, Sliders, BarChart3, Settings, ShieldCheck, Tag, Bell, User
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  userRole: string;
  categoryName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  userRole,
  categoryName
}) => {
  
  const MENU_ITEMS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, roles: ['Owner', 'Manager', 'Accountant', 'Cashier', 'Inventory Staff'] },
    { id: 'pos', label: 'POS / Billing', icon: ShoppingCart, roles: ['Owner', 'Manager', 'Cashier'] },
    { id: 'products', label: 'Products & Variants', icon: Package, roles: ['Owner', 'Manager', 'Inventory Staff'] },
    { id: 'inventory', label: 'Inventory & Alerts', icon: Layers, roles: ['Owner', 'Manager', 'Inventory Staff'] },
    { id: 'forecasting', label: 'AI Demand Forecast', icon: Sparkles, roles: ['Owner', 'Manager', 'Inventory Staff'] },
    { id: 'simulator', label: 'What-If Simulator', icon: Sliders, roles: ['Owner', 'Manager'] },
    { id: 'suppliers', label: 'Suppliers & Purchases', icon: Truck, roles: ['Owner', 'Manager', 'Accountant'] },
    { id: 'wastage', label: 'Wastage & Losses', icon: AlertTriangle, roles: ['Owner', 'Manager', 'Inventory Staff'] },
    { id: 'customers', label: 'Customers & Loyalty', icon: Users, roles: ['Owner', 'Manager', 'Cashier'] },
    { id: 'customer-portal', label: 'Customer Portal', icon: User, roles: ['Customer'] },
    { id: 'employees', label: 'Employees & Roles', icon: ShieldCheck, roles: ['Owner'] },
    { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['Owner', 'Manager', 'Cashier', 'Inventory Staff', 'Accountant'] },
    { id: 'reports', label: 'Financial Reports', icon: BarChart3, roles: ['Owner', 'Accountant', 'Manager'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['Owner'] },
  ];

  // Filter items based on current role permissions
  const visibleItems = MENU_ITEMS.filter((item) => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-61px)]">
      <div className="p-4 space-y-6">
        
        {/* Category Context Banner */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center justify-between">
            <span>Store Theme</span>
            <Tag className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-xs font-bold text-emerald-400 truncate">{categoryName}</div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Navigation</div>
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-300 font-bold border border-emerald-500/30' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>

      {/* Footer Role Card */}
      <div className="p-4 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 font-semibold">Logged in as</div>
          <div className="text-xs font-bold text-white flex items-center justify-between">
            <span>{userRole}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        </div>
      </div>
    </aside>
  );
};
