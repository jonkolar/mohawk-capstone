import { useSession, signIn, signOut } from "next-auth/react"

import Head from 'next/head';
import TopNavbar from '@/components/TopNavbar';

export default function Home({  }) {
    const { data: session } = useSession()

    return <TopNavbar session={session}/>
  }