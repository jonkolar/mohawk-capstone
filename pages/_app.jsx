import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from '@mui/material/styles';

import theme from "@/utils/theme";
import "../app/globals.css";
import TopNavbar from "../components/TopNavbar"

// Root
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