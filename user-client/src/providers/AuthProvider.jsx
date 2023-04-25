import Loader from "@/components/common/Loader";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthProvider = ({children}) => {
  const router = useRouter();
  const requiredAuth = children?.props?.children?.type?.requiredAuth || false
  const { isLoggedIn } = useSelector((state) => state.auth);
  
  
  useEffect(() => {
    if (requiredAuth && !isLoggedIn) router.push("/landing");
  }, [])

  if(typeof window !== undefined && requiredAuth ){
    return <Box sx={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Loader/></Box>
  }
  
  return <>{children}</>;
};

export default AuthProvider;
