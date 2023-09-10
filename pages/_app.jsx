import { useEffect } from "react";
import { SessionProvider } from "next-auth/react"
import { ThemeProvider, styled } from '@mui/material/styles';

import theme from "@/utils/theme";
import "../app/globals.css";
import TopNavbar from "../components/TopNavbar"

import { Box } from "@mui/material";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
            <TopNavbar />
            <Component {...pageProps}/>
          </ThemeProvider>
      </SessionProvider>
  )
}