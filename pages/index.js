import { useSession, signIn, signOut } from "next-auth/react"

import Head from 'next/head';

export default function Home({  }) {
    const { data: session } = useSession()

    return <h1>Home</h1>
  }