import { useEffect } from "react";
import { SessionProvider } from "next-auth/react"
import "../app/globals.css";
import TopNavbar from "../components/TopNavbar"

import { Box } from "@mui/material";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
          <TopNavbar />
          <div style={{height: '100%'}}>

          </div>
          <Component {...pageProps}/>
    </SessionProvider>
  )
}