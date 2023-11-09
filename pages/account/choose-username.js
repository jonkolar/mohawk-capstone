import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import { useTheme } from "@mui/styles";

import { checkUsernameExistsCall, updateUserCall } from "@/utils/api/user-api";
import BoxLabelIconTopper from "@/components/BoxLabelIconTopper";

import BadgeIcon from '@mui/icons-material/Badge';
import { TextField, Button, Box } from '@mui/material';

// /account/choose-username 

// FRONTEND
export default function AccountChooseUsername() {
    const { data: session } = useSession()
    const theme = useTheme();

    // states
    const [username, setUsername] = useState('')
    const [available, setAvailable] = useState(false)
    const [error, setError] = useState(null);

    // updates when username changes
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

    // username select button handler
    const selectUsername = async () => {
        setError(null)
            try {
                const res = await updateUserCall(session.user.email, { username: username })
                window.location.href = "/";
            } catch (error) {
                console.log(error)
                setError("An error has occured")
            }
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 5, justifyContent: 'center', alignItems: 'center', gap: 1}} >
            <Box>
                <BoxLabelIconTopper icon={<BadgeIcon fontSize="medium"/>} label="USERNAME SELECTION" />
                <Box sx={{display: 'flex', backgroundColor: theme.palette.white, padding: 3, borderRadius: theme.border.radius}}>
                    { error && <p>{error}</p>}
                    <TextField
                        id="username"
                        placeholder="Username"
                        color={!username ? '' : available ? 'success' : 'warning'}
                        defaultValue=""
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Box>
            </Box>
            <Button 
                variant="contained"
                onClick={selectUsername}
                disabled={!available || username.length <= 3}
            > Choose Username</Button>
        </Box>
    )
  }