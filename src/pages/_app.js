import Layout from "@/components/common/Layout";
import store from "@/redux/stores";
import "@/styles/global.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/styles/theme";
import AuthProvider from "@/providers/AuthProvider";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/router";
import userService from "@/services/user.service";
import { clearAuth, updateUser } from "@/redux/slices/auth.slice";
import { useEffect } from "react";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InnerApp>{getLayout(<Component {...pageProps} />)}</InnerApp>
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

const InnerApp = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { clearAuth: _clearAuth } = router.query;

  const { refetch: fetchSelf } = useQuery(
    ["user", "self"],
    () => userService.getSelf(),
    {
      enabled: false,
      onSuccess: (res) => dispatch(updateUser(res.data)),
      onError: (err) => dispatch(clearAuth()),
    }
  );

  useEffect(() => {
    if (_clearAuth === "true") dispatch(clearAuth());
  }, [_clearAuth]);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchSelf();
  }, []);

  return children;
};
