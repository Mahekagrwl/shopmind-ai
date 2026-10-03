import React, { useState } from 'react';
import { Store, Check, ArrowRight, ArrowLeft, Plus, Trash2, CheckCircle, Package, Users, Settings, Building } from 'lucide-react';
import { BUSINESS_CATEGORIES } from '../config/categories';

interface OnboardingWizardProps {
  onComplete: (onboardedData: any) => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  
  // Step 1: Business Details
  const [businessName, setBusinessName] = useState("Royal Kirana & Departmental Store");
  const [ownerName, setOwnerName] = useState("Anshu Sharma");
  const [phone, setPhone] = useState("+91 99887 76655");
  const [email, setEmail] = useState("owner@shopmind.ai");
  const [address, setAddress] = useState("Main Market Road, Block B, Connaught Place, New Delhi");
  const [numEmployees, setNumEmployees] = useState("1-5");
  const [currency, setCurrency] = useState("INR");
  const [taxSettings, setTaxSettings] = useState("GST 18%");

  // Step 2: Category
  const [selectedCategory, setSelectedCategory] = useState("Grocery / Kirana");

  // Step 3: Products
  const [products, setProducts] = useState([
    { name: "Fortune Sunlite Sunflower Oil 1L", barcode: "8901208001011", price: 145, cost: 125, stock: 42 },
    { name: "Aashirvaad Shudh Chakki Atta 5kg", barcode: "8901058852310", price: 275, cost: 230, stock: 8 }
  ]);
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState(100);
  const [newProdCost, setNewProdCost] = useState(70);
  const [newProdStock, setNewProdStock] = useState(20);

  // Step 4: Suppliers
  const [suppliers, setSuppliers] = useState([
    { name: "Metro Cash & Carry Wholesale", phone: "+91 98765 43210", email: "orders@metrowholesale.in" }
  ]);
  const [supName, setSupName] = useState("");
  const [supPhone, setSupPhone] = useState("");

  // Step 5: Inventory Rules
  const [minStockAlert, setMinStockAlert] = useState(10);
  const [allowBackorders, setAllowBackorders] = useState(false);
  const [autoExpiryAlertDays, setAutoExpiryAlertDays] = useState(30);

  // Step 6: Opening Stock Summary
  // (Auto calculated)

  // Step 7: Invite Employees
  const [employees, setEmployees] = useState([
    { name: "Ramesh Kumar", role: "Cashier", email: "ramesh@shopmind.ai" }
  ]);
  const [empName, setEmpName] = useState("");
  const [empRole, setEmpRole] = useState("Cashier");

  const handleAddProduct = () => {
    if (!newProdName) return;
    setProducts([...products, {
      name: newProdName,
      barcode: "890" + Math.floor(100000000 + Math.random() * 900000000),
      price: Number(newProdPrice),
      cost: Number(newProdCost),
      stock: Number(newProdStock)
    }]);
    setNewProdName("");
  };

  const handleAddSupplier = () => {
    if (!supName) return;
    setSuppliers([...suppliers, { name: supName, phone: supPhone, email: supName.toLowerCase().replace(/\s+/g, '') + "@supplier.com" }]);
    setSupName("");
    setSupPhone("");
  };

  const handleAddEmployee = () => {
    if (!empName) return;
    setEmployees([...employees, { name: empName, role: empRole, email: empName.toLowerCase().replace(/\s+/g, '') + "@shopmind.ai" }]);
    setEmpName("");
  };

  const finishWizard = () => {
    const payload = {
      business_name: businessName,
      owner_name: ownerName,
      phone,
      email,
      address,
      category: selectedCategory,
      num_employees: numEmployees,
      currency,
      tax_settings: taxSettings,
      products,
      suppliers,
      inventory_rules: { minStockAlert, allowBackorders, autoExpiryAlertDays },
      employees
    };
    onComplete(payload);
  };

  const STEPS = [
    { num: 1, title: "Business Details", icon: Building },
    { num: 2, title: "Category", icon: Store },
    { num: 3, title: "Products", icon: Package },
    { num: 4, title: "Suppliers", icon: Users },
    { num: 5, title: "Inventory Rules", icon: Settings },
    { num: 6, title: "Opening Stock", icon: Package },
    { num: 7, title: "Employees", icon: Users },
    { num: 8, title: "Complete", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Wizard Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 text-emerald-400 font-bold text-sm tracking-wide uppercase">
            <Store className="w-5 h-5" />
            <span>Store Onboarding Wizard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Setup Your SHOPMIND AI Store</h1>
          <p className="text-sm text-slate-400">Step {step} of 8 — Customize your POS, inventory & AI rules</p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6 overflow-x-auto">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isDone = s.num < step;
            const isCurrent = s.num === step;
            return (
              <div key={s.num} className="flex items-center space-x-2 min-w-max px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500' : 'bg-slate-900 text-slate-500'
                }`}>
                  {isDone ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-xs font-medium ${isCurrent ? 'text-white font-bold' : 'text-slate-500'}`}>{s.title}</span>
              </div>
            );
          })}
        </div>

        {/* Step Card Content */}
        <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-6">

          {/* STEP 1: BUSINESS DETAILS */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">1. Enter Business & Contact Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Owner Name</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Store Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Default Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tax Settings</label>
                  <input
                    type="text"
                    value={taxSettings}
                    onChange={(e) => setTaxSettings(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CATEGORY SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">2. Choose Your Business Category</h3>
              <p className="text-xs text-slate-400">This configures themes, product variant fields and AI reorder rules.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.keys(BUSINESS_CATEGORIES).map((catName) => {
                  const cat = BUSINESS_CATEGORIES[catName];
                  const isSelected = selectedCategory === catName;
                  return (
                    <button
                      key={catName}
                      type="button"
                      onClick={() => setSelectedCategory(catName)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold ring-2 ring-emerald-500/40' 
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-emerald-400 mb-1">{cat.name}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2">{cat.tagline}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: ADD PRODUCTS */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">3. Initial Products Catalog</h3>
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300">Quick Add Product</div>
                <div className="grid sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white"
                  />
                  <input
                    type="number"
                    placeholder="Selling Price (₹)"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white"
                  />
                  <input
                    type="number"
                    placeholder="Purchase Cost (₹)"
                    value={newProdCost}
                    onChange={(e) => setNewProdCost(Number(e.target.value))}
                    className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white"
                  />
                  <input
                    type="number"
                    placeholder="Initial Stock"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-500 rounded-lg hover:bg-emerald-400 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300">Configured Products ({products.length}):</div>
                {products.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <div>
                      <span className="font-bold text-white">{p.name}</span>
                      <span className="ml-2 text-slate-400">Barcode: {p.barcode}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>Price: ₹{p.price}</span>
                      <span>Stock: {p.stock}</span>
                      <button onClick={() => setProducts(products.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: SUPPLIERS */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">4. Add Preferred Suppliers</h3>
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="grid sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Supplier Name / Distributor"
                    value={supName}
                    onChange={(e) => setSupName(e.target.value)}
                    className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    placeholder="Contact Phone"
                    value={supPhone}
                    onChange={(e) => setSupPhone(e.target.value)}
                    className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <button
                  onClick={handleAddSupplier}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-500 rounded-lg hover:bg-emerald-400 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Supplier</span>
                </button>
              </div>

              <div className="space-y-2">
                {suppliers.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <div>
                      <span className="font-bold text-white">{s.name}</span>
                      <span className="ml-2 text-slate-400">{s.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: INVENTORY RULES */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">5. Configure Inventory Rules</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Low-Stock Alert Threshold (Units)</label>
                  <input
                    type="number"
                    value={minStockAlert}
                    onChange={(e) => setMinStockAlert(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Auto Expiry Warning (Days before expiry)</label>
                  <input
                    type="number"
                    value={autoExpiryAlertDays}
                    onChange={(e) => setAutoExpiryAlertDays(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <input
                    type="checkbox"
                    checked={allowBackorders}
                    onChange={(e) => setAllowBackorders(e.target.checked)}
                    className="w-4 h-4 text-emerald-500 rounded bg-slate-950 border-slate-800"
                  />
                  <span className="text-slate-300">Allow negative inventory / backorders if stock runs out during POS billing</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: OPENING STOCK SUMMARY */}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">6. Review Opening Stock</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Total Products</div>
                  <div className="text-2xl font-bold text-white mt-1">{products.length}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Total Units</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">
                    {products.reduce((acc, p) => acc + p.stock, 0)}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Estimated Inventory Valuation</div>
                  <div className="text-2xl font-bold text-cyan-400 mt-1">
                    ₹{products.reduce((acc, p) => acc + (p.stock * p.cost), 0)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: INVITE EMPLOYEES */}
          {step === 7 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">7. Staff & Cashier Invitations</h3>
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="grid sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Staff Member Name"
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                    className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white"
                  />
                  <select
                    value={empRole}
                    onChange={(e) => setEmpRole(e.target.value)}
                    className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="Cashier">Cashier</option>
                    <option value="Manager">Shop Manager</option>
                    <option value="Inventory Staff">Inventory Staff</option>
                    <option value="Accountant">Accountant</option>
                  </select>
                </div>
                <button
                  onClick={handleAddEmployee}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-500 rounded-lg hover:bg-emerald-400 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Invite Staff</span>
                </button>
              </div>

              <div className="space-y-2">
                {employees.map((e, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <div>
                      <span className="font-bold text-white">{e.name}</span>
                      <span className="ml-2 text-emerald-400 font-semibold">({e.role})</span>
                    </div>
                    <span className="text-slate-400">{e.email}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 8: COMPLETE */}
          {step === 8 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">Setup Complete!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Your shop <strong>{businessName}</strong> ({selectedCategory}) is ready for real-time POS billing, product inventory, and AI decision insights.
              </p>
            </div>
          )}

          {/* Stepper Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700 flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 8 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-400 hover:to-teal-500 flex items-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={finishWizard}
                className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl hover:from-emerald-400 hover:to-cyan-400 shadow-xl shadow-emerald-500/30 flex items-center space-x-2"
              >
                <span>Launch Shop Platform</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
