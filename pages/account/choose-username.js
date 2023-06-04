import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"

import { InputLabel, TextField, Button } from '@mui/material';

import { checkUsernameExistsCall, updateUserCall } from "@/utils/user-api";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

export default function AccountChooseUsername({  }) {
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
            <TextField
                id="username"
                label="Username"
                color={!username ? '' : available ? 'success' : 'warning'}
                defaultValue=""
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button 
                variant="contained"
                onClick={selectUsername}
                disabled={!available || username.length <= 3}
            >
                Choose Username
            </Button>
        </>
    )
  }