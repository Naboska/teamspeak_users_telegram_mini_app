import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { HomePage } from '@/pages/HomePage';
import { queryClient } from '@/services/helpers/query-client';
import { ErrorBoundary } from '@/components/ErrorBoundary';

import '@telegram-apps/telegram-ui/dist/styles.css';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppRoot>
          <HomePage />
        </AppRoot>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
