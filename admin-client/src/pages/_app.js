import Layout from "@/components/common/Layout";
import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
  return getLayout( 
    <>
    <CssBaseline/>
     <Component {...pageProps} />
    </>
     )

  
}
