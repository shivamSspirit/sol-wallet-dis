import { useState, useMemo, useCallback } from 'react';

type Wallet = {
  id: string;
  name: string;
  category: string;
  features: string[];
  securityLevel: 'low' | 'medium' | 'high';
};

export function useWalletSearch(initialWallets: Wallet[]) {
  const [searchParams, setSearchParams] = useState({
    query: '',
    filters: {
      category: 'all',
      features: [] as string[],
      securityLevel: null as 'low' | 'medium' | 'high' | null
    }
  });

  const filteredWallets = useMemo(() => {
    return initialWallets.filter(wallet => {
      const matchesQuery = wallet.name.toLowerCase().includes(searchParams.query.toLowerCase());
      
      const matchesCategory = 
        searchParams.filters.category === 'all' || 
        wallet.category === searchParams.filters.category;
      
      const matchesFeatures = 
        searchParams.filters.features.length === 0 || 
        searchParams.filters.features.every(feature => 
          wallet.features.includes(feature)
        );
      
      const matchesSecurity = 
        !searchParams.filters.securityLevel || 
        wallet.securityLevel === searchParams.filters.securityLevel;

      return matchesQuery && 
             matchesCategory && 
             matchesFeatures && 
             matchesSecurity;
    });
  }, [searchParams, initialWallets]);

  const updateSearch = useCallback((newParams: Partial<typeof searchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...newParams
    }));
  }, []);

  return {
    wallets: filteredWallets,
    searchParams,
    updateSearch
  };
} 