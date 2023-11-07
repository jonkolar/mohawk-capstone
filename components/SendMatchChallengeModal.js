import { useState } from "react";

import BasicModal from "./BasicModal";
import { teamExistsCall, sendTeamMatchChallengeCall } from "@/utils/api/team-api";

import { Typography, Box, Button, FormControl, TextField } from "@mui/material";

export default function CreateMatchModal({ team, open, setModal }) {
    const [teamId, setTeamId] = useState('');
    const [date, setDate] = useState(null);
    const [teamExists, setTeamExists] = useState(false);

    const handleClose = () => {

    }

    const onTeamIdChangedHandler = async (e) => {
        setTeamId(e.target.value)

        if (e.target.value == '' || e.target.value == team.id) {
            setTeamExists(false);
            return;
        }

        await teamExistsCall(e.target.value)
        .then(({ exists }) => {
            setTeamExists(exists);
        })
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
                    <FormControl sx={{display: 'flex', gap: 2}}>
                        <TextField id="team-id" label="Team Id" type="number" variant="outlined" onChange={onTeamIdChangedHandler} value={teamId} required/>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            <Typography variant="h6" sx={{mr: 1}}>Date:</Typography>
                            <input
                                style={{width: '100%'}}
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </Box>
                        <Typography textAlign="center" variant="h6">{teamExists ? "Found Team!" : team.id == teamId ? "Can't challenge self" : "Team doesn't exist"}</Typography>
                        <Button type="submit" variant="contained" disabled={!teamExists}>Send</Button>
                    </FormControl>
                </form>
            </BasicModal>
        </div>
    );
}