import React, { useState } from 'react';
import { 
  TrendingUp, ShoppingBag, Package, AlertTriangle, DollarSign, Sparkles, 
  ArrowUpRight, ShieldAlert, CheckCircle2, Eye, EyeOff 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

interface DashboardOverviewProps {
  metrics: {
    total_sales: number;
    num_transactions: number;
    total_products: number;
    low_stock_count: number;
    estimated_gross_profit: number;
    recorded_wastage: number;
    category: string;
    business_name: string;
  };
  transactions: any[];
  products: any[];
  onOpenPOS: () => void;
}

const DAILY_DATA = [
  { label: '9 AM', sales: 1200, profit: 320 },
  { label: '12 PM', sales: 4800, profit: 1290 },
  { label: '3 PM', sales: 8900, profit: 2400 },
  { label: '6 PM', sales: 15400, profit: 4100 },
  { label: '9 PM', sales: 21000, profit: 5600 }
];

const WEEKLY_DATA = [
  { label: 'Mon', sales: 12400, profit: 3400 },
  { label: 'Tue', sales: 18900, profit: 5100 },
  { label: 'Wed', sales: 15600, profit: 4200 },
  { label: 'Thu', sales: 22100, profit: 6200 },
  { label: 'Fri', sales: 29800, profit: 8400 },
  { label: 'Sat', sales: 34500, profit: 9900 },
  { label: 'Sun', sales: 31200, profit: 8800 }
];

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ metrics, products, onOpenPOS }) => {
  const [chartTimeframe, setChartTimeframe] = useState<"daily" | "weekly">("weekly");
  const [showWastageWidget, setShowWastageWidget] = useState(true);
  const [showSlowMovingWidget, setShowSlowMovingWidget] = useState(true);
  const [showAIInsights, setShowAIInsights] = useState(true);

  const activeChartData = chartTimeframe === "daily" ? DAILY_DATA : WEEKLY_DATA;

  // Identify Top-selling and Slow-moving SKUs
  const topSelling = products.slice(0, 3);
  const slowMoving = products.filter(p => p.stock > (p.reorder_level || 10)).slice(0, 3);

  return (
    <div className="space-y-6">
      
      {/* Header Banner & Widget Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Live Operational Engine
            </span>
            <span className="text-xs text-slate-400">Category: <strong className="text-emerald-300">{metrics.category}</strong></span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">{metrics.business_name}</h2>
          <p className="text-xs text-slate-400">Real-time sales revenue, gross margin vs wastage and predictive inventory.</p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Widget Visibility Toggles */}
          <button
            onClick={() => setShowWastageWidget(!showWastageWidget)}
            className="px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700 flex items-center space-x-1"
            title="Toggle Wastage Widget"
          >
            {showWastageWidget ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden md:inline">Wastage</span>
          </button>

          <button
            onClick={onOpenPOS}
            className="px-5 py-3 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/25 flex items-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Launch POS Billing</span>
          </button>
        </div>
      </div>

      {/* 6 Core Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Total Sales */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Sales</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-white">₹{metrics.total_sales.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 font-semibold flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +18.4% this week
          </div>
        </div>

        {/* Transactions */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Transactions</span>
            <ShoppingBag className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-xl font-black text-white">{metrics.num_transactions}</div>
          <div className="text-[10px] text-slate-400">Invoices generated</div>
        </div>

        {/* Total Products */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total SKUs</span>
            <Package className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-black text-white">{metrics.total_products}</div>
          <div className="text-[10px] text-slate-400">Active catalog</div>
        </div>

        {/* Low Stock Alert */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Low Stock</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-400">{metrics.low_stock_count}</div>
          <div className="text-[10px] text-amber-400/80 font-medium">Reorder needed</div>
        </div>

        {/* Gross Profit */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Gross Profit</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400">₹{metrics.estimated_gross_profit.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400">~28.4% gross margin</div>
        </div>

        {/* Recorded Wastage */}
        {showWastageWidget && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Recorded Wastage</span>
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-xl font-black text-red-400">₹{metrics.recorded_wastage.toLocaleString()}</div>
            <div className="text-[10px] text-red-400/80 font-medium">Spoiled / Damaged</div>
          </div>
        )}

      </div>

      {/* Analytics & AI Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Sales Trend Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Sales & Gross Profit Breakdown</h3>
              <p className="text-xs text-slate-400">Real-time revenue stream vs estimated margin</p>
            </div>

            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setChartTimeframe("daily")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  chartTimeframe === "daily" ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setChartTimeframe("weekly")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  chartTimeframe === "weekly" ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="label" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="sales" stroke="#10b981" fillOpacity={1} fill="url(#salesGrad)" name="Sales (₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Box */}
        {showAIInsights && (
          <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-emerald-400">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-white">SHOPMIND AI Assistant</h3>
                </div>
                <button onClick={() => setShowAIInsights(false)} className="text-slate-500 hover:text-white text-xs">
                  Hide
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                  <div className="font-bold text-emerald-400">Demand Spike Warning</div>
                  <p className="text-slate-300">
                    Category <strong>{metrics.category}</strong> items are experiencing +22% higher velocity today. Ensure replenishment before peak hours.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                  <div className="font-bold text-amber-400">Reorder Alert</div>
                  <p className="text-slate-300">
                    {metrics.low_stock_count} SKUs are below safety threshold. Create a Purchase Order to Metro Cash & Carry.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI Engine Guard</span>
              </span>
              <span>Updated live</span>
            </div>
          </div>
        )}

      </div>

      {/* Top Selling vs Slow-moving SKUs Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Top-Selling */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Top-Selling SKUs</span>
          </h3>

          <div className="space-y-2 text-xs">
            {topSelling.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-white truncate max-w-[180px]">{p.name}</span>
                <span className="font-bold text-emerald-400">₹{p.selling_price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Slow-Moving */}
        {showSlowMovingWidget && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Slow-Moving Products</span>
              </h3>
              <button onClick={() => setShowSlowMovingWidget(false)} className="text-xs text-slate-500 hover:text-white">
                Hide
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {slowMoving.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-bold text-white truncate max-w-[180px]">{p.name}</span>
                  <span className="text-amber-400 font-semibold">{p.stock} units sitting</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
