import Layout from '@/components/common/Layout';
import store from '@/redux/stores';
import '@/styles/global.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/styles/theme';
import AuthProvider from '@/providers/AuthProvider';
import { SnackbarProvider } from 'notistack';
import {LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <SnackbarProvider
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              autoHideDuration={3000}
            >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
           
              {getLayout(<Component {...pageProps} />)}
              </LocalizationProvider>
            </SnackbarProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
