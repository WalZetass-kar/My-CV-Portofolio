import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, ActivityLog } from '../types';
import { defaultPortfolioData } from '../data/defaultData';
import { api } from '../services/api';

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateData: (newData: PortfolioData) => Promise<void>;
  updatePartial: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K], logDetails?: string) => Promise<void>;
  refreshData: () => Promise<void>;
  resetToDefault: () => Promise<void>;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('cms_portfolio_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse local portfolio data:', e);
    }
    return defaultPortfolioData;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('cms_admin_auth') === 'true';
  });
  const [activeSection, setActiveSection] = useState<string>('hero');

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const fetched = await api.getPortfolio();
      if (fetched) {
        setData(fetched);
        localStorage.setItem('cms_portfolio_data', JSON.stringify(fetched));
      }
    } catch (err) {
      console.error('Error loading portfolio:', err);
      const savedLocal = localStorage.getItem('cms_portfolio_data');
      if (savedLocal) {
        try {
          setData(JSON.parse(savedLocal));
        } catch (e) {}
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const login = async (password: string) => {
    try {
      const res = await api.loginAdmin(password);
      if (res.success) {
        setIsAuthenticated(true);
        localStorage.setItem('cms_admin_auth', 'true');
        return { success: true };
      }
      return { success: false, error: res.error || 'Password salah.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login gagal.' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cms_admin_auth');
    setIsAdminOpen(false);
  };

  const updateData = async (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('cms_portfolio_data', JSON.stringify(newData));
    const res = await api.savePortfolio(newData);
    if (res.data) {
      setData(res.data);
      localStorage.setItem('cms_portfolio_data', JSON.stringify(res.data));
    }
  };

  const updatePartial = async <K extends keyof PortfolioData>(
    key: K,
    value: PortfolioData[K],
    logDetails?: string
  ) => {
    const newLog: ActivityLog = {
      id: 'log-' + Date.now(),
      action: `${String(key).toUpperCase()} Manager Update`,
      details: logDetails || `Data ${String(key)} telah diperbarui oleh Admin.`,
      timestamp: new Date().toISOString(),
      user: 'Admin'
    };

    const updatedData: PortfolioData = {
      ...data,
      [key]: value,
      activityLogs: [newLog, ...(data.activityLogs || [])].slice(0, 100),
      settings: {
        ...data.settings,
        lastUpdate: new Date().toISOString()
      }
    };

    // Instant local state update for zero-latency UI reflection
    setData(updatedData);
    localStorage.setItem('cms_portfolio_data', JSON.stringify(updatedData));

    // Save to backend JSON database
    const res = await api.savePortfolio(updatedData);
    if (res.data) {
      setData(res.data);
      localStorage.setItem('cms_portfolio_data', JSON.stringify(res.data));
    }
  };

  const resetToDefault = async () => {
    localStorage.removeItem('cms_portfolio_data');
    const res = await api.resetDatabase();
    if (res.data) {
      setData(res.data);
    } else {
      setData(defaultPortfolioData);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        login,
        logout,
        updateData,
        updatePartial,
        refreshData,
        resetToDefault,
        activeSection,
        setActiveSection
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
