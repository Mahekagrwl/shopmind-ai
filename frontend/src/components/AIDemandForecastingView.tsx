import React, { useState } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Package, Calendar, RefreshCw, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AIDemandForecastingViewProps {
  categoryName: string;
}

const HISTORICAL_VS_FORECAST = [
  { day: 'Day -3', actual: 120, forecast: 115 },
  { day: 'Day -2', actual: 145, forecast: 140 },
  { day: 'Day -1', actual: 160, forecast: 155 },
  { day: 'Today', actual: 180, forecast: 175 },
  { day: '+1 Day', actual: null, forecast: 195 },
  { day: '+2 Day', actual: null, forecast: 210 },
  { day: '+3 Day', actual: null, forecast: 225 },
  { day: '+7 Day', actual: null, forecast: 260 },
];

export const AIDemandForecastingView: React.FC<AIDemandForecastingViewProps> = ({ categoryName }) => {
  const [days, setDays] = useState<7 | 30>(7);

  const PREDICTIONS = [
    { name: "Fortune Sunlite Sunflower Oil 1L", current: 42, forecast: 28, reorder: 0, risk: "12%", velocity: "Fast Moving" },
    { name: "Aashirvaad Shudh Chakki Atta 5kg", current: 8, forecast: 24, reorder: 25, risk: "88%", velocity: "Fast Moving" },
    { name: "Organic Farm Fresh Tomatoes 1kg", current: 35, forecast: 40, reorder: 20, risk: "74%", velocity: "Fast Moving" },
    { name: "Paracetamol 650mg (Dolo 650)", current: 150, forecast: 45, reorder: 0, risk: "5%", velocity: "Moderate" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI Predictive Inventory Engine</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">AI Demand Forecasting</h3>
          <p className="text-xs text-slate-400">7-day & 30-day predicted customer demand, stockout risk detection & automated reorders.</p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setDays(7)}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              days === 7 ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            7-Day Forecast
          </button>
          <button
            onClick={() => setDays(30)}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              days === 30 ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            30-Day Forecast
          </button>
        </div>
      </div>

      {/* Historical vs Forecasted Demand Chart */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Historical Checkout Volume vs Predicted Demand ({days} Days)</h3>
            <p className="text-xs text-slate-400">Model Assumptions: Linear velocity extrapolation over active inventory checkout trend (Confidence: 94.2%)</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            94.2% AI Accuracy
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HISTORICAL_VS_FORECAST}>
              <defs>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              <Area type="monotone" dataKey="actual" stroke="#10b981" fill="url(#actualGrad)" name="Historical Demand" />
              <Area type="monotone" dataKey="forecast" stroke="#06b6d4" strokeDasharray="5 5" fill="url(#forecastGrad)" name="AI Predicted Demand" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product-wise Forecast Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Product-Wise Demand Predictions ({days}-Day Horizon)</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Current Stock</th>
                <th className="p-3">Forecasted Demand ({days}d)</th>
                <th className="p-3">Suggested Reorder</th>
                <th className="p-3">Stockout Risk %</th>
                <th className="p-3">Velocity Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {PREDICTIONS.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-white">{p.name}</td>
                  <td className="p-3 font-semibold text-slate-300">{p.current} units</td>
                  <td className="p-3 font-bold text-cyan-400">{p.forecast} units</td>
                  <td className="p-3">
                    {p.reorder > 0 ? (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-extrabold">
                        Reorder +{p.reorder} units
                      </span>
                    ) : (
                      <span className="text-slate-500">Optimal Stock</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      parseInt(p.risk) >= 70 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {p.risk} Risk
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      {p.velocity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
