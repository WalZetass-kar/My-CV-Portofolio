/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { LandingPage } from './pages/LandingPage';
import { AdminPage } from './pages/AdminPage';
import { Loader2 } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { isLoading, isAdminOpen, setIsAdminOpen } = usePortfolio();

  // Listen to custom route path /4dminLogin or hash #admin
  useEffect(() => {
    const handleRouteCheck = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/4dminLogin' || hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    handleRouteCheck();
    window.addEventListener('popstate', handleRouteCheck);
    window.addEventListener('hashchange', handleRouteCheck);
    return () => {
      window.removeEventListener('popstate', handleRouteCheck);
      window.removeEventListener('hashchange', handleRouteCheck);
    };
  }, [setIsAdminOpen]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase font-mono">
            Memuat Portfolio &amp; 3D Engine...
          </span>
        </div>
      </div>
    );
  }

  // Render dedicated Admin Page or Public Landing Page
  if (isAdminOpen || window.location.pathname === '/4dminLogin') {
    return <AdminPage />;
  }

  return <LandingPage />;
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainAppContent />
    </PortfolioProvider>
  );
}

