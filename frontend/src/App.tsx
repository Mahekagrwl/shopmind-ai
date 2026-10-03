import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { OnboardingWizard } from './components/OnboardingWizard';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { POSView } from './components/POSView';
import { ProductsView } from './components/ProductsView';
import { InventoryView } from './components/InventoryView';
import { SuppliersView } from './components/SuppliersView';
import { WastageView } from './components/WastageView';
import { CustomersView } from './components/CustomersView';
import { EmployeesView } from './components/EmployeesView';
import { NotificationsView } from './components/NotificationsView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { AIDemandForecastingView } from './components/AIDemandForecastingView';
import { WhatIfSimulatorView } from './components/WhatIfSimulatorView';
import { CustomerPortalView } from './components/CustomerPortalView';
import { AIAssistantModal } from './components/AIAssistantModal';
import { fetchFromAPI } from './services/api';

export function App() {
  // Primary Navigation Mode
  const [view, setView] = useState<'landing' | 'onboarding' | 'dashboard'>('landing');
  
  // Auth State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<any>({
    id: 'usr-owner-1',
    full_name: 'Anshu Sharma',
    email: 'owner@shopmind.ai',
    phone: '+91 99887 76655',
    role: 'Owner'
  });

  // Multi-Store State
  const [activeStoreId, setActiveStoreId] = useState<string>("biz-freshmart");
  const [categoryName, setCategoryName] = useState<string>('Grocery / Kirana');
  const [businessName, setBusinessName] = useState<string>('FreshMart Grocery');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Data Stores
  const [products, setProducts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>({
    total_sales: 2063.82,
    num_transactions: 2,
    total_products: 7,
    low_stock_count: 2,
    estimated_gross_profit: 577.86,
    recorded_wastage: 1450.0,
    category: 'Grocery / Kirana',
    business_name: 'FreshMart Grocery'
  });

  // AI Assistant Modal
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // Load initial backend data or fallback seed
  const loadData = async () => {
    try {
      const [prodsData, txData, supData, dashData] = await Promise.all([
        fetchFromAPI('/products').catch(() => null),
        fetchFromAPI('/pos/transactions').catch(() => null),
        fetchFromAPI('/suppliers').catch(() => null),
        fetchFromAPI('/analytics/dashboard').catch(() => null)
      ]);

      if (prodsData) setProducts(prodsData);
      if (txData) setTransactions(txData);
      if (supData) setSuppliers(supData);
      if (dashData) setMetrics(dashData);
    } catch (err) {
      console.log('Backend connection offline, using instant demo state');
    }
  };

  useEffect(() => {
    loadData();
  }, [activeStoreId]);

  const handleSwitchStore = async (storeId: string) => {
    setActiveStoreId(storeId);
    try {
      await fetchFromAPI(`/stores/switch?store_id=${storeId}`, { method: 'POST' });
    } catch (err) {}

    if (storeId === 'biz-freshmart') {
      setBusinessName('FreshMart Grocery');
      setCategoryName('Grocery / Kirana');
    } else if (storeId === 'biz-stylehub') {
      setBusinessName('StyleHub Clothing');
      setCategoryName('Clothing / Fashion');
    } else if (storeId === 'biz-bakecraft') {
      setBusinessName('BakeCraft Bakery');
      setCategoryName('Bakery');
    }

    loadData();
  };

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    setAuthModalOpen(false);
    if (user.role === 'Customer') {
      setActiveTab('customer-portal');
    }
    setView('dashboard');
  };

  const handleOnboardingComplete = (onboardedData: any) => {
    setBusinessName(onboardedData.business_name);
    setCategoryName(onboardedData.category);
    if (onboardedData.products && onboardedData.products.length > 0) {
      setProducts(onboardedData.products);
    }
    setView('dashboard');
  };

  const handleCheckoutSuccess = (newTx: any) => {
    setTransactions([newTx, ...transactions]);
    setMetrics((prev: any) => ({
      ...prev,
      total_sales: Math.round((prev.total_sales + newTx.total) * 100) / 100,
      num_transactions: prev.num_transactions + 1,
      estimated_gross_profit: Math.round((prev.estimated_gross_profit + newTx.total * 0.28) * 100) / 100
    }));

    loadData();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* 1. PUBLIC LANDING PAGE */}
      {view === 'landing' && (
        <LandingPage
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setAuthModalOpen(true);
          }}
          onSelectCategoryPreview={(catName) => {
            setCategoryName(catName);
          }}
          onStartOnboarding={() => setView('onboarding')}
        />
      )}

      {/* 2. BUSINESS ONBOARDING WIZARD */}
      {view === 'onboarding' && (
        <OnboardingWizard onComplete={handleOnboardingComplete} />
      )}

      {/* 3. CORE POS DASHBOARD PLATFORM */}
      {view === 'dashboard' && (
        <div className="min-h-screen flex flex-col">
          
          <Header
            businessName={businessName}
            categoryName={categoryName}
            activeStoreId={activeStoreId}
            currentUser={currentUser}
            onOpenAI={() => setAiModalOpen(true)}
            onLogout={() => setView('landing')}
            onSwitchRole={(role) => {
              setCurrentUser({ ...currentUser, role });
              if (role === 'Customer') setActiveTab('customer-portal');
            }}
            onSwitchStore={handleSwitchStore}
          />

          <div className="flex-1 flex">
            
            <Sidebar
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              userRole={currentUser?.role || 'Owner'}
              categoryName={categoryName}
            />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
              
              {activeTab === 'overview' && (
                <DashboardOverview
                  metrics={{ ...metrics, category: categoryName, business_name: businessName }}
                  transactions={transactions}
                  products={products}
                  onOpenPOS={() => setActiveTab('pos')}
                />
              )}

              {activeTab === 'pos' && (
                <POSView
                  products={products}
                  categoryName={categoryName}
                  onCheckoutSuccess={handleCheckoutSuccess}
                />
              )}

              {activeTab === 'products' && (
                <ProductsView
                  products={products}
                  categoryName={categoryName}
                  onRefreshProducts={loadData}
                />
              )}

              {activeTab === 'inventory' && (
                <InventoryView
                  products={products}
                  onRefreshProducts={loadData}
                />
              )}

              {activeTab === 'forecasting' && (
                <AIDemandForecastingView categoryName={categoryName} />
              )}

              {activeTab === 'simulator' && (
                <WhatIfSimulatorView categoryName={categoryName} />
              )}

              {activeTab === 'suppliers' && (
                <SuppliersView
                  suppliers={suppliers}
                  products={products}
                  onRefreshProducts={loadData}
                />
              )}

              {activeTab === 'wastage' && (
                <WastageView
                  products={products}
                  onRefreshProducts={loadData}
                />
              )}

              {activeTab === 'customers' && (
                <CustomersView />
              )}

              {activeTab === 'customer-portal' && (
                <CustomerPortalView currentUser={currentUser} transactions={transactions} />
              )}

              {activeTab === 'employees' && (
                <EmployeesView />
              )}

              {activeTab === 'notifications' && (
                <NotificationsView userRole={currentUser?.role || 'Owner'} />
              )}

              {activeTab === 'reports' && (
                <ReportsView
                  transactions={transactions}
                  products={products}
                  categoryName={categoryName}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView
                  businessName={businessName}
                  categoryName={categoryName}
                  onUpdateCategory={(newCat) => setCategoryName(newCat)}
                  onUpdateBusiness={(newName) => setBusinessName(newName)}
                />
              )}

            </main>

          </div>

        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        categoryName={categoryName}
      />

    </div>
  );
}

export default App;
