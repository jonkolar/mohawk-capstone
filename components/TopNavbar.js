import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";

export default function TopNavbar({ }) {
    const { data: session } = useSession()

    return (
    <Navbar
      fluid={true}
      rounded={true}
    >
    <Navbar.Brand href="/">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="mr-3 h-6 sm:h-9"
        alt="Flowbite Logo"
      />
    </Navbar.Brand>
    { session ?
    <Dropdown
        arrowIcon={false}
        inline={true}
        label={<Avatar alt="User settings" img={session.user.image} rounded={true}/>}
      >
        <Dropdown.Header>
          <span className="block text-sm">
            {session.user.username ? <Link href={"/users/" + session.user.username}>{session.user.username}</Link> : <Link href={"/profile/choose-username"}>Choose Username</Link>}
          </span>
          <span className="block truncate text-sm font-medium">
            {session.user.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Item>
          <Link href={"/profile/me"}>Profile</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href={"/profile/teams"}>Teams</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          Settings
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <span onClick={() => signOut()}>Sign out</span>
        </Dropdown.Item>
      </Dropdown>
    :
     <Button color="dark" onClick={() => signIn('discord', {callbackUrl: window.location.href})}>Sign In</Button>}
  </Navbar>
    )
}