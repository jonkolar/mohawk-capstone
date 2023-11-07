import { useState } from "react";

import { createTeamCall } from "@/utils/api/team-api";
import BasicModal from "./BasicModal";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function CreateTeamModal({ user, open, setModal, games }) {
    const [name, setName] = useState('')
    const [gameId, setGameId] = useState(games.length > 0 ? games[0].id : null)
    const [description, setDescription] = useState('')

    const handleClose = () => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createTeamCall(user.email, name, gameId, description)
            .then(response => {
                if (response) {
                    setModal(false)
                    location.replace("/teams/" + response.id)
                } else {
                    console.log('something went wrong')
                }
            })
    }

    return (
        <div>
            <BasicModal
                label="Create Team"
                open={open}
                setModal={setModal}
                onClose={handleClose}
            >
                <form method="POST" onSubmit={handleSubmit}>
                    <FormControl sx={{display: 'flex', gap: 2}}>
                        <TextField id="team-name" label="Name" variant="outlined" required={true}
                            onChange={(e) => setName(e.target.value)} value={name}/>

                        <Select
                            labelId="team-game-label"
                            id="team-game"
                            value={gameId}
                            onChange={(e) => { setGameId(e.target.value) }}
                        >
                            {games.map((game) =>
                                <MenuItem key={game.id} value={game.id}>{game.name}</MenuItem>
                            )}
                        </Select>

                        <TextField id="team-description" label="Description" variant="outlined" required={true}
                            onChange={(e) => setDescription(e.target.value)} value={description} />


                        <Button type="submit" variant="contained">Submit</Button>

                    </FormControl>
                </form>
            </BasicModal>
        </div>
    );
}