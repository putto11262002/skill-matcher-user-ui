import Layout from '@/components/common/Layout'
import store from '@/redux/stores'
import '@/styles/global.css'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline } from '@mui/material'
const queryClient = new QueryClient()
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
  return <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <CssBaseline/>
      {
        getLayout(
          <Component {...pageProps} />
        )
      }
    </QueryClientProvider>
  </Provider>
}
