import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { AppRoutes } from './routes/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster position="top-right" richColors closeButton />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
