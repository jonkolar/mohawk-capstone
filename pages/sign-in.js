import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";

// /sign-in (mostly unused, anytime user hits page they are redirected)

// FRONTEND
export default function SignIn({ providers }){
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

// BACKEND
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    if (!session.user.username) {
      return { redirect: { destination: "/profile/choose-username" } }; // redirect to /choose-username
    }
    return { redirect: { destination: "/" } }; // redirect to home
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}