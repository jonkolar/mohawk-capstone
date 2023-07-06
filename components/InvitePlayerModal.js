import { useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    //
    display: 'flex',
    justifyContent: 'center',
};

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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form method="POST" onSubmit={onSubmit}>
                        <FormControl>
                            <TextField id="invite-username" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} value={username} />
                            <Button type="submit" variant="contained">Send Invite</Button>
                            <Button onClick={() => setModal(false)}>Close</Button>
                        </FormControl>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}