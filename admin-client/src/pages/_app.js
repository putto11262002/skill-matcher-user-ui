import Layout from '@/components/common/Layout';
import '@/styles/globals.css';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import store from '@/redux/stores';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
       <ThemeProvider theme={theme}>
       <SnackbarProvider
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
        >
          <CssBaseline />
          {getLayout(
            <>
              <Component {...pageProps} />
            </>,
          )}
        </SnackbarProvider>
       </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
