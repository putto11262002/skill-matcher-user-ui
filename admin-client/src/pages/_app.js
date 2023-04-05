import Layout from '@/components/common/Layout';
import '@/styles/globals.css';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import store from '@/redux/stores';
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <Provider store={store}>
      <CssBaseline />
      {getLayout(
        <>
          <Component {...pageProps} />
        </>,
      )}
    </Provider>
  );
}
