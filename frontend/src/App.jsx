import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import { SIHProvider } from '@/context/SIHContext';
import AppRoutes from '@/routes/AppRoutes';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } } });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SIHProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster position="top-right" richColors closeButton />
          </BrowserRouter>
        </SIHProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
