import { useState } from "react";

import BasicModal from "./BasicModal";
import { checkUsernameExistsCall } from "@/utils/api/user-api";

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";

export default function InvitePlayerModal({ team, open, setModal, invitePlayerHandler }) {
    const [username, setUsername] = useState('')
    const [exists, setExists] = useState(false);
    const [userOnTeam, setUserOnTeam] = useState(false);

    const handleClose = () => {

    }

    const onChangeHandler = async (e) => {
        setUsername(e.target.value)

        const userOnTeamCheck = team.players.some(p => p.user.username == e.target.value);
        setUserOnTeam(userOnTeamCheck);

        await checkUsernameExistsCall(e.target.value)
        .then(({ available }) => {
            if (!available)
                setExists(true);
            else
                setExists(false);
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        invitePlayerHandler(username)
    }

    return (
        <div>
            <BasicModal
                label="Invite Player"
                setModal={setModal}
                open={open}
                onClose={handleClose}
            >
                <form method="POST" onSubmit={onSubmit}>
                    <FormControl sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                        <TextField id="invite-username" label="Username" variant="outlined" color={exists && !userOnTeam ? 'success' : 'error'} 
                            onChange={onChangeHandler} value={username} required={true} />
                        <Typography variant="h6">{exists ? userOnTeam ? "User already on team" : "Found User!" : "User does not exist"}</Typography>
                        <Button type="submit" variant="contained" required={true} disabled={!exists || userOnTeam} sx={{width: '100%'}}>Send Invite</Button>
                    </FormControl>
                </form>
            </BasicModal>
        </div>
    );
}