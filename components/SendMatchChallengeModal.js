import { useState } from "react";

import BasicModal from "./BasicModal";
import { sendTeamMatchChallengeCall } from "@/utils/api/team-api";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function CreateMatchModal({ team, open, setModal }) {
    const [teamId, setTeamId] = useState('');
    const [date, setDate] = useState(null);

    const handleClose = () => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await sendTeamMatchChallengeCall(team.id, parseInt(teamId), date)
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
            <BasicModal
                label="Send Challenge"
                open={open}
                setModal={setModal}
                onClose={handleClose}
            >
                <form method="POST" onSubmit={handleSubmit}>
                    <FormControl>
                        <TextField id="team-id" label="Team Id" variant="outlined" onChange={(e) => setTeamId(e.target.value)} value={teamId} required/>
                        <input
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained">Send</Button>
                        <Button onClick={() => setModal(false)}>Close</Button>
                    </FormControl>
                </form>
            </BasicModal>
        </div>
    );
}