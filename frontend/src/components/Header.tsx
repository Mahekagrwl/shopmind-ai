import React, { useState } from 'react';
import { Store, Search, Bell, Sparkles, User, ChevronDown, LogOut, ShieldCheck, RefreshCw } from 'lucide-react';

interface HeaderProps {
  businessName: string;
  categoryName: string;
  activeStoreId: string;
  currentUser: any;
  onOpenAI: () => void;
  onLogout: () => void;
  onSwitchRole: (newRole: string) => void;
  onSwitchStore: (storeId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  businessName,
  categoryName,
  activeStoreId,
  currentUser,
  onOpenAI,
  onLogout,
  onSwitchRole,
  onSwitchStore
}) => {
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const DEMO_STORES = [
    { id: "biz-freshmart", name: "FreshMart Grocery", category: "Grocery / Kirana" },
    { id: "biz-stylehub", name: "StyleHub Clothing", category: "Clothing / Fashion" },
    { id: "biz-bakecraft", name: "BakeCraft Bakery", category: "Bakery" }
  ];

  const ROLES = ["Owner", "Manager", "Cashier", "Inventory Staff", "Accountant", "Customer"];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        
        {/* Left: Brand & Multi-Store Switcher */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Store className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-white tracking-tight text-lg hidden sm:inline-block">
              SHOPMIND <span className="text-emerald-400">AI</span>
            </span>
          </div>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          {/* Multi-Store Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowStoreDropdown(!showStoreDropdown)}
              className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-emerald-500/60 transition-colors text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white max-w-[150px] sm:max-w-[200px] truncate">{businessName}</span>
              <span className="text-slate-400 hidden md:inline">({categoryName})</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showStoreDropdown && (
              <div className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 text-xs space-y-1">
                <div className="px-3 py-1 font-semibold text-slate-400 text-[10px] uppercase tracking-wider">
                  Switch Active Store Account
                </div>
                {DEMO_STORES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSwitchStore(s.id);
                      setShowStoreDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-800 transition-colors flex items-center justify-between ${
                      activeStoreId === s.id ? 'text-emerald-400 font-bold bg-emerald-500/10' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div>{s.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{s.category}</div>
                    </div>
                    {activeStoreId === s.id && <span className="text-emerald-400 text-[10px] font-bold">ACTIVE</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search products, barcodes, transactions (Ctrl + K)..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Right: AI Assistant, Notifications & User */}
        <div className="flex items-center space-x-3">
          
          {/* AI Decision Assistant Button */}
          <button
            onClick={onOpenAI}
            className="px-3 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">AI Decision Assistant</span>
          </button>

          {/* Quick Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="px-2.5 py-1 text-[11px] font-bold text-slate-300 bg-slate-800 rounded-lg border border-slate-700 hover:border-emerald-500 transition-colors flex items-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentUser?.role || 'Owner'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1 z-50 text-xs">
                <div className="px-3 py-1.5 font-semibold text-slate-400 text-[10px] uppercase tracking-wider">Switch Role Preview</div>
                {ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onSwitchRole(r);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-slate-800 transition-colors ${
                      currentUser?.role === r ? 'text-emerald-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xs font-bold">
                {currentUser?.full_name?.charAt(0) || 'A'}
              </div>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 text-xs space-y-1">
                <div className="px-4 py-2 border-b border-slate-800">
                  <div className="font-bold text-white">{currentUser?.full_name || 'Anshu Sharma'}</div>
                  <div className="text-slate-400 text-[11px] truncate">{currentUser?.email || 'owner@shopmind.ai'}</div>
                </div>
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800 flex items-center space-x-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
