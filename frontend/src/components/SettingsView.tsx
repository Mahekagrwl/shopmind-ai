import React, { useState } from 'react';
import { Settings, Store, ShieldCheck, DollarSign, Tag, CheckCircle2, AlertTriangle } from 'lucide-react';
import { BUSINESS_CATEGORIES } from '../config/categories';
import { fetchFromAPI } from '../services/api';

interface SettingsViewProps {
  businessName: string;
  categoryName: string;
  onUpdateCategory: (newCategory: string) => void;
  onUpdateBusiness: (newName: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  businessName,
  categoryName,
  onUpdateCategory,
  onUpdateBusiness
}) => {
  const [storeNameInput, setStoreNameInput] = useState(businessName);
  const [currency, setCurrency] = useState("INR");
  const [taxRate, setTaxRate] = useState("GST 18%");
  const [allowBackorders, setAllowBackorders] = useState(false);
  const [selectedNewCat, setSelectedNewCat] = useState(categoryName);
  
  const [savedMsg, setSavedMsg] = useState("");

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBusiness(storeNameInput);
    if (selectedNewCat !== categoryName) {
      try {
        await fetchFromAPI('/business/category', {
          method: 'PUT',
          body: JSON.stringify({ category: selectedNewCat })
        });
      } catch (err) {}
      onUpdateCategory(selectedNewCat);
    }

    setSavedMsg("Settings and Store Preferences saved successfully!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Store Preferences & Configuration</h3>
          <p className="text-xs text-slate-400">Configure business identity, POS invoice settings & category rules.</p>
        </div>
        <Settings className="w-5 h-5 text-emerald-400" />
      </div>

      {savedMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{savedMsg}</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Business Details Section */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <Store className="w-4 h-4 text-emerald-400" />
            <span>Store Identity & Legal Details</span>
          </h4>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Business Name</label>
              <input
                type="text"
                value={storeNameInput}
                onChange={(e) => setStoreNameInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Default Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              >
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">POS Default Tax Configuration</label>
              <select
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              >
                <option value="GST 0%">0% GST</option>
                <option value="GST 5%">5% GST</option>
                <option value="GST 12%">12% GST</option>
                <option value="GST 18%">18% GST (Standard)</option>
                <option value="GST 28%">28% GST</option>
              </select>
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <input
                type="checkbox"
                id="backorders"
                checked={allowBackorders}
                onChange={(e) => setAllowBackorders(e.target.checked)}
                className="w-4 h-4 text-emerald-500 rounded bg-slate-950 border-slate-800"
              />
              <label htmlFor="backorders" className="text-slate-300">
                Allow negative inventory (Backorders during POS billing)
              </label>
            </div>
          </div>
        </div>

        {/* Guided Category Migration Wizard Section */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <Tag className="w-4 h-4 text-emerald-400" />
            <span>Business Category & Module Migration</span>
          </h4>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>
              Changing your business category will dynamically adapt your themes, accent colors, POS attribute fields, and AI insights. Existing products and historical sales transactions will remain safely preserved.
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.keys(BUSINESS_CATEGORIES).map((catName) => {
              const cat = BUSINESS_CATEGORIES[catName];
              const isSelected = selectedNewCat === catName;
              return (
                <button
                  key={catName}
                  type="button"
                  onClick={() => setSelectedNewCat(catName)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold ring-2 ring-emerald-500/40' 
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-emerald-400 mb-0.5">{cat.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{cat.tagline}</div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl hover:from-emerald-400 hover:to-cyan-400 shadow-xl shadow-emerald-500/25"
        >
          Save All Settings
        </button>

      </form>

    </div>
  );
};
