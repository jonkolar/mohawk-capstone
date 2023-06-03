import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import { TextInput, Label, Button } from "flowbite-react";

import { checkUsernameExistsCall, updateUserCall } from "@/utils/user-api";

export default function ChooseUsername({  }) {
    const { data: session } = useSession()
    const { push } = useRouter();

    const [username, setUsername] = useState('')
    const [available, setAvailable] = useState(false)
    const [error, setError] = useState(null);

    useEffect(()=>{
        const checkUsernameExists = async () => {
            setError(null)
            try {
                const response = await checkUsernameExistsCall(username)
                setAvailable(response['available'])
            } catch (error) {
                setError("An error has occured")
            }
        }
        
        if (!username) return;
        checkUsernameExists()
    }, [username])

    const selectUsername = async () => {
        setError(null)
            try {
                console.log(session)
                const res = await updateUserCall(session.user.email, { username: username })
                push('/')
            } catch (error) {
                console.log(error)
                setError("An error has occured")
            }
    }

    return (
        <>
            { error && <p>{error}</p>}
            <Label
                htmlFor="username"
                value="Choose your username:"
            />
            <TextInput
                id="username"
                placeholder=""
                required={true}
                color={!username ? 'gray' : available ? 'success' : 'failure'}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button disabled={!available} onClick={selectUsername}>Select Username</Button>
        </>
    )
  }