import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose, categoryName }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your SHOPMIND AI Decision Assistant tailored for **${categoryName}**. Ask me about stock reorder predictions, margin tuning, or wastage minimization!`
    }
  ]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    const userMsg = query;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setQuery("");

    // Simulate AI response logic grounded in current category
    setTimeout(() => {
      let reply = `Based on your live **${categoryName}** sales data, I recommend reordering low stock items before the weekend rush. Your average gross margin is currently sitting at 28.4%.`;
      
      if (userMsg.toLowerCase().includes("reorder") || userMsg.toLowerCase().includes("stock")) {
        reply = `AI Stock Recommendation: Reorder 25 units of high-velocity items. Current stock velocity is +18% higher than last week.`;
      } else if (userMsg.toLowerCase().includes("profit") || userMsg.toLowerCase().includes("margin")) {
        reply = `Profitability Analysis: Bundling products with 15% discount increases basket size by 35%, net revenue increases by ₹4,200/week.`;
      } else if (userMsg.toLowerCase().includes("waste") || userMsg.toLowerCase().includes("expiry")) {
        reply = `Wastage Mitigation Strategy: 2 products approach expiry in 30 days. Run a 10% POS checkout discount to liquidate stock quickly without loss.`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4 flex flex-col h-[500px]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">SHOPMIND AI Advisor</h3>
              <p className="text-[10px] text-emerald-400 font-semibold">{categoryName} Intelligence Model</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[85%] ${
                m.sender === 'user'
                  ? 'ml-auto bg-emerald-500 text-white font-medium'
                  : 'mr-auto bg-slate-950 border border-slate-800 text-slate-200'
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Query Input */}
        <form onSubmit={handleSend} className="relative pt-2">
          <input
            type="text"
            placeholder="Ask AI about reordering, margins or expiry alerts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-3 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-4 p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-400"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
