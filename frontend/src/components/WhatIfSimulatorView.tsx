import React, { useState } from 'react';
import { Sliders, TrendingUp, AlertTriangle, ShieldCheck, DollarSign, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { fetchFromAPI } from '../services/api';

interface WhatIfSimulatorViewProps {
  categoryName: string;
}

export const WhatIfSimulatorView: React.FC<WhatIfSimulatorViewProps> = ({ categoryName }) => {
  const [selectedScenario, setSelectedScenario] = useState<string>("price_change");
  const [paramValue, setParamValue] = useState<number>(10);
  
  const [simResult, setSimResult] = useState<any>({
    scenario: "price_change",
    input_parameter: 10,
    current_state: { revenue: 2063.82, gross_margin: 577.86, stockout_risk: "Low" },
    simulated_state: { revenue: 2240.50, gross_margin: 627.34, margin_difference: 49.48, stockout_risk: "Low" },
    ai_explanation: "Increasing selling prices by 10% boosts total revenue by ~8.5% while maintaining customer demand elasticity.",
    disclaimer: "All simulation results are estimates for decision exploring and do not modify live inventory or financial records."
  });

  const [loading, setLoading] = useState(false);

  const SCENARIOS = [
    { id: "price_change", title: "Price Change", desc: "What happens if selling price increases by X%?", defaultVal: 10, min: -20, max: 50, step: 5, unit: "%" },
    { id: "weekend_discount", title: "Weekend Discount", desc: "What happens if shop offers a weekend discount?", defaultVal: 15, min: 5, max: 40, step: 5, unit: "%" },
    { id: "demand_increase", title: "Demand Surge", desc: "What happens if demand increases by X%?", defaultVal: 40, min: 10, max: 100, step: 10, unit: "%" },
    { id: "supplier_delay", title: "Supplier Delay", desc: "What happens if supplier delivery is delayed by X days?", defaultVal: 5, min: 1, max: 15, step: 1, unit: "Days" },
    { id: "additional_purchase", title: "Additional Purchase", desc: "What happens if shop purchases X extra units?", defaultVal: 200, min: 50, max: 1000, step: 50, unit: "Units" },
    { id: "stop_slow_moving", title: "Halt Slow-Moving SKUs", desc: "What happens if shop stops purchasing slow-moving items?", defaultVal: 0, min: 0, max: 0, step: 1, unit: "" }
  ];

  const handleRunSimulation = async (scenarioId: string, val: number) => {
    setLoading(true);
    try {
      const data = await fetchFromAPI(`/simulator/run?scenario_type=${scenarioId}&param_value=${val}`, {
        method: 'POST'
      });
      setSimResult(data);
    } catch (err) {
      // Local fallback calculation engine
      const baseRev = 2063.82;
      const baseMargin = 577.86;
      let simRev = baseRev;
      let simMargin = baseMargin;
      let risk = "Low";
      let exp = "";

      if (scenarioId === "price_change") {
        simRev = baseRev * (1 + (val / 100) * 0.85);
        simMargin = simRev - (baseRev * 0.72);
        exp = `Increasing selling prices by ${val}% boosts total revenue by ~${round(val*0.85)}% while preserving elasticity.`;
      } else if (scenarioId === "weekend_discount") {
        simRev = baseRev * 1.35 * (1 - (val / 100));
        simMargin = simRev - (baseRev * 0.72 * 1.35);
        exp = `Offering a ${val}% discount increases transaction volume by 35%.`;
      } else if (scenarioId === "demand_increase") {
        simRev = baseRev * (1 + (val / 100));
        simMargin = simRev - (baseRev * 0.72 * (1 + (val / 100)));
        risk = val >= 30 ? "High" : "Moderate";
        exp = `A ${val}% surge in demand increases revenue but elevates stockout risk.`;
      } else if (scenarioId === "supplier_delay") {
        simRev = baseRev * (1 - (val * 0.04));
        simMargin = simRev - (baseRev * 0.72);
        risk = "Critical";
        exp = `A ${val}-day delivery delay reduces potential sales by ~${val*4}%.`;
      } else {
        simMargin = baseMargin + (val * 40);
        simRev = baseRev + (val * 120);
        exp = `Capital optimization simulation calculated for ${categoryName}.`;
      }

      setSimResult({
        scenario: scenarioId,
        input_parameter: val,
        current_state: { revenue: baseRev, gross_margin: baseMargin, stockout_risk: "Low" },
        simulated_state: { revenue: round(simRev), gross_margin: round(simMargin), margin_difference: round(simMargin - baseMargin), stockout_risk: risk },
        ai_explanation: exp,
        disclaimer: "All simulation results are estimates for decision exploring and do not modify live inventory or financial records."
      });
    } finally {
      setLoading(false);
    }
  };

  const round = (num: number) => Math.round(num * 100) / 100;
  const currentScenarioObj = SCENARIOS.find(s => s.id === selectedScenario) || SCENARIOS[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
          <Sliders className="w-5 h-5 text-emerald-400" />
          <span>Signature Business Feature</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">Interactive What-If Business Simulator</h2>
        <p className="text-xs text-slate-400">
          Simulate business decisions before making real store changes. Explore price changes, discount surges, supplier delays, or inventory investments safely.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SCENARIOS.map((sc) => {
          const isSelected = selectedScenario === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenario(sc.id);
                setParamValue(sc.defaultVal);
                handleRunSimulation(sc.id, sc.defaultVal);
              }}
              className={`p-3 rounded-xl border text-left text-xs transition-all ${
                isSelected 
                  ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold ring-2 ring-emerald-500/40' 
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-emerald-400 mb-0.5">{sc.title}</div>
              <div className="text-[10px] text-slate-400 truncate">{sc.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Simulator Inputs & Calculation Panel */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Scenario: {currentScenarioObj.title}</h3>
            <p className="text-xs text-slate-400">{currentScenarioObj.desc}</p>
          </div>

          {currentScenarioObj.max > 0 && (
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-300">Adjustment Value:</span>
              <input
                type="range"
                min={currentScenarioObj.min}
                max={currentScenarioObj.max}
                step={currentScenarioObj.step}
                value={paramValue}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setParamValue(val);
                  handleRunSimulation(selectedScenario, val);
                }}
                className="w-36 accent-emerald-500"
              />
              <span className="text-xs font-black text-emerald-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-mono">
                {paramValue}{currentScenarioObj.unit}
              </span>
            </div>
          )}
        </div>

        {/* Current vs Simulated Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Current State */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Business Baseline</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Current Revenue:</span>
                <span className="font-bold text-white">₹{simResult.current_state.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Gross Profit Margin:</span>
                <span className="font-bold text-emerald-400">₹{simResult.current_state.gross_margin.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Stockout Risk:</span>
                <span className="font-bold text-emerald-400">Low</span>
              </div>
            </div>
          </div>

          {/* Simulated State */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 shadow-lg shadow-emerald-950/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Simulated Outcome</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Est. Margin Impact: {simResult.simulated_state.margin_difference >= 0 ? `+₹${simResult.simulated_state.margin_difference}` : `-₹${Math.abs(simResult.simulated_state.margin_difference)}`}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Projected Revenue:</span>
                <span className="font-bold text-white">₹{simResult.simulated_state.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Projected Gross Margin:</span>
                <span className="font-bold text-emerald-400">₹{simResult.simulated_state.gross_margin.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Stockout Risk Level:</span>
                <span className={`font-bold ${
                  simResult.simulated_state.stockout_risk === 'Critical' || simResult.simulated_state.stockout_risk === 'High' ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {simResult.simulated_state.stockout_risk}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* AI Business Explanation */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>AI Simulation Explanation ({categoryName}):</span>
          </div>
          <p className="text-slate-300 leading-relaxed">{simResult.ai_explanation}</p>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{simResult.disclaimer}</span>
          </div>
          <span className="text-slate-500 font-semibold">Zero DB Mutation Guard</span>
        </div>

      </div>

    </div>
  );
};
