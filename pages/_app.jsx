import { SessionProvider } from "next-auth/react"
import "../app/globals.css";
import TopNavbar from "../components/TopNavbar"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <TopNavbar />
      <Component {...pageProps} />
    </SessionProvider>
  )
}