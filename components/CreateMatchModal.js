import { useState } from "react";
import moment from "moment";

import { createTeamMatchCall } from "@/utils/api/team-api";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

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

export default function CreateMatchModal({ team, open, setModal }) {
    const [teamId, setTeamId] = useState('');
    const [date, setDate] = useState(null);

    const handleClose = () => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createTeamMatchCall(team.id, parseInt(teamId), date)
            .then(data => {
                if (data) {
                    console.log(data)
                    setModal(false)
                    location.reload()
                } else {
                    console.log('something went wrong')
                }
            })
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

                    <form method="POST" onSubmit={handleSubmit}>
                        <FormControl>
                            <TextField id="team-id" label="Team Id" variant="outlined" onChange={(e) => setTeamId(e.target.value)} value={teamId} required/>
                            <input
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                            <Button type="submit" variant="contained">Create</Button>
                            <Button onClick={() => setModal(false)}>Close</Button>
                        </FormControl>
                    </form>

                </Box>
            </Modal>
        </div>
    );
}