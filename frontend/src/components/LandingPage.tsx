import React, { useState } from 'react';
import { 
  Store, ShoppingCart, TrendingUp, ShieldCheck, Cpu, ArrowRight, CheckCircle2, 
  Sparkles, Layers, Users, Zap, BarChart3, HelpCircle, Mail, Phone, MapPin, ChevronRight
} from 'lucide-react';
import { BUSINESS_CATEGORIES } from '../config/categories';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onSelectCategoryPreview: (categoryName: string) => void;
  onStartOnboarding: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onOpenAuth, 
  onSelectCategoryPreview,
  onStartOnboarding
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Grocery / Kirana");

  const activeCat = BUSINESS_CATEGORIES[selectedCategory] || BUSINESS_CATEGORIES["Grocery / Kirana"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Public Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
                  SHOPMIND <span className="text-emerald-400">AI</span>
                </span>
                <span className="block text-[10px] text-slate-400 font-medium tracking-widest uppercase">POS & Inventory</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
              <a href="#categories" className="hover:text-emerald-400 transition-colors">Business Categories</a>
              <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a>
              <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Login
              </button>
              <button 
                onClick={onStartOnboarding}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(20,184,166,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Next-Gen Retail Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
                Run Your Shop Smarter with <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">AI Intelligence</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl leading-relaxed">
                One platform. Every shop. Custom billing, inventory rules, sales analytics, and intelligent business decisions tailored for Kirana, Fashion, Pharmacy, Bakery & more.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button 
                  onClick={onStartOnboarding}
                  className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl hover:from-emerald-400 hover:to-cyan-400 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a 
                  href="#categories"
                  className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-300 bg-slate-800/80 border border-slate-700/80 rounded-xl hover:bg-slate-800 hover:text-white transition-all text-center"
                >
                  Explore Business Categories
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 text-center lg:text-left">
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">11+</div>
                  <div className="text-xs text-slate-400 mt-1">Shop Categories</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">100%</div>
                  <div className="text-xs text-slate-400 mt-1">Offline POS Safe</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">99.9%</div>
                  <div className="text-xs text-slate-400 mt-1">Inventory Accuracy</div>
                </div>
              </div>
            </div>

            {/* Interactive Hero Image Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-2xl shadow-emerald-950/50 group">
                <img 
                  src={activeCat.bannerImage} 
                  alt={activeCat.name} 
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute bottom-0 inset-x-0 p-6 space-y-3">
                  <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Live Theme Active: {activeCat.name}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{activeCat.tagline}</h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {activeCat.fieldsLabel.map((f, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/80">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Dashboard Quick Badge */}
              <div className="absolute -top-6 -right-6 hidden sm:flex items-center space-x-3 bg-slate-900/90 border border-slate-700 p-4 rounded-xl shadow-2xl backdrop-blur-md">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Daily Sales Growth</div>
                  <div className="text-sm font-bold text-emerald-400">+34.8% Today</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Business Problems Section */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold">The Challenge</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Why Traditional POS Systems Fail Modern Retailers</p>
            <p className="text-slate-400 text-base">Generic billing software treats every business identically, leading to operational friction and wasted profits.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-red-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-bold text-white">Rigid Product Schemas</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Kirana needs batch numbers and expiry. Fashion needs sizes and colors. Generic software forces messy workarounds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-bold text-white">Unnoticed Stock Wastage</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Expired medicines or fresh bakery items go untracked until profits evaporate.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">3</div>
              <h3 className="text-xl font-bold text-white">No Predictive Insights</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Shop owners are left guessing what products to reorder and when to run discounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SHOPMIND AI Solution & Features */}
      <section id="features" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold">The Solution</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Built for Speed, Adaptability & Profit</p>
            <p className="text-slate-400 text-base">SHOPMIND AI dynamically adapts its entire interface, database schema, and reporting to match your exact business category.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Ultra-Fast POS Billing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Barcode scanning, instant search, custom discounts, tax calculations, and printable invoices in under 5 seconds.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-teal-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Category Variant System</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Instantly switch product fields for Clothing sizes, Pharmacy batches, Grocery weights, and Electronics serial numbers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">AI Decision Engine</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Automated low-stock alerts, reorder recommendations, gross margin analysis, and wastage prevention.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Role-Based Access Control</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Enforce granular permissions for Owners, Managers, Cashiers, Inventory Staff, Accountants, and Customers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Supplier & Purchase Orders</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Track ordered vs received stock, monitor supplier delivery times, and update inventory upon delivery.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Multi-Store Management</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Manage multiple retail branches under a single owner account with seamless store switching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11 Business Categories Showcase */}
      <section id="categories" className="py-24 bg-slate-900/80 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Universal Platform</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">11 Specialized Business Categories</p>
            <p className="text-slate-400 text-base">Select any shop category below to test how SHOPMIND AI dynamically adapts its theme and features.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {Object.keys(BUSINESS_CATEGORIES).map((catName) => {
              const cat = BUSINESS_CATEGORIES[catName];
              const isSelected = selectedCategory === catName;
              return (
                <button
                  key={catName}
                  onClick={() => {
                    setSelectedCategory(catName);
                    onSelectCategoryPreview(catName);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                    isSelected 
                      ? 'border-emerald-500 bg-slate-800/90 shadow-lg shadow-emerald-950/40 ring-2 ring-emerald-500/50' 
                      : 'border-slate-800 bg-slate-950/80 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {cat.id.toUpperCase()}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">{cat.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{cat.tagline}</p>
                </button>
              );
            })}
          </div>

          {/* Active Category Deep Dive */}
          <div className="mt-10 p-8 rounded-2xl bg-slate-950 border border-slate-800 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Active Selection</span>
              <h3 className="text-2xl font-bold text-white">{activeCat.name} Module</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{activeCat.tagline}</p>
              
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-400">Category-Specific Product Attributes:</span>
                <div className="flex flex-wrap gap-2">
                  {activeCat.fieldsLabel.map((lbl, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                      {lbl}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={onStartOnboarding}
                  className="px-6 py-3 text-sm font-bold text-white bg-emerald-500 rounded-xl hover:bg-emerald-400 transition-all flex items-center space-x-2"
                >
                  <span>Setup {activeCat.name} Shop</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl">
                <img src={activeCat.bannerImage} alt={activeCat.name} className="w-full h-56 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Simple Setup</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">How SHOPMIND AI Works</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-16">
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold mx-auto flex items-center justify-center">1</div>
              <h4 className="font-bold text-white">Select Category</h4>
              <p className="text-xs text-slate-400">Choose from Kirana, Pharmacy, Fashion, Bakery or 7 other types.</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 font-bold mx-auto flex items-center justify-center">2</div>
              <h4 className="font-bold text-white">Add Products & Stock</h4>
              <p className="text-xs text-slate-400">Import CSV or enter items with custom attribute fields.</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 font-bold mx-auto flex items-center justify-center">3</div>
              <h4 className="font-bold text-white">Start POS Billing</h4>
              <p className="text-xs text-slate-400">Scan barcodes, collect Cash/UPI/Card and issue printed invoices.</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 font-bold mx-auto flex items-center justify-center">4</div>
              <h4 className="font-bold text-white">Get AI Insights</h4>
              <p className="text-xs text-slate-400">Receive automated reorder warnings & profit margin analysis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About & Contact */}
      <section id="about" className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold">About SHOPMIND AI</h2>
            <h3 className="text-3xl font-extrabold text-white">Empowering Independent Retailers Across India & Beyond</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Designed by retail technology specialists, SHOPMIND AI bridges the gap between enterprise-grade AI analytics and simple daily billing. We empower shop owners to save time, reduce wastage, and increase profits.
            </p>
          </div>

          <div id="contact" className="p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white">Contact & Support</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>support@shopmind.ai</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 1800 200 9000 (Toll Free)</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>ShopMind AI Towers, Cyber City, Gurugram, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Store className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white">SHOPMIND AI</span>
            <span>— One Platform. Every Shop. Intelligent Business Decisions.</span>
          </div>
          <div className="flex space-x-6 text-slate-400">
            <a href="#" className="hover:text-slate-200">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200">Terms of Service</a>
            <a href="#" className="hover:text-slate-200">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
