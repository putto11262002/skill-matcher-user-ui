import Layout from '@/components/common/Layout';
import '@/styles/globals.css';
import { CssBaseline } from '@mui/material';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '@/redux/stores';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';
import userService from '@/services/user.service';
import { setCookie, setCookies } from 'cookies-next';
import api from '@/services/api';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { clearAuth, updateUser } from '@/redux/slices/auth.slice';

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
          <InnerApp>
          {getLayout(
           
              <Component {...pageProps} />
    
          )}
          </InnerApp>
        </SnackbarProvider>
       </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}


App.getInitialProps = async (context) =>{
  return {
   
  }
}

const InnerApp = ({children}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.auth)
  const {clearAuth: _clearAuth} = router.query;

  const {mutate: fetchSelf} = useMutation(userService.getSelf, {
    onSuccess: (res) => dispatch(updateUser(res.data)),
    onError: (err) =>  dispatch(clearAuth())
  })

  // listen to when sign out is perform in api.js but redux state not updated
  useEffect(() => {
    if(_clearAuth === 'true') dispatch(clearAuth())
  }, [clearAuth])

  // Fetch new user data every time app first load
  useEffect(() => {
    if(!isLoggedIn) return;
    fetchSelf()
  }, [])

  return children;
}
