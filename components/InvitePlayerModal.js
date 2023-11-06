import { useState } from "react";

import BasicModal from "./BasicModal";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function InvitePlayerModal({ open, setModal, invitePlayerHandler }) {
    const [username, setUsername] = useState('')

    const handleClose = () => {

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
                    <FormControl>
                        <TextField id="invite-username" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} value={username} />
                        <Button type="submit" variant="contained">Send Invite</Button>
                        <Button onClick={() => setModal(false)}>Close</Button>
                    </FormControl>
                </form>
            </BasicModal>
        </div>
    );
}