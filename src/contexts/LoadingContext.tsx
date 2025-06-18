import React, { createContext, useContext, useState } from 'react';
import Loading from '../components/Loading';

const LoadingContext = createContext({
  loading: false,
  setLoading: (value: boolean) => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loading />}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
