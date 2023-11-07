import { useState, useEffect } from "react";

import { retrieveGamesCall } from "@/utils/api/data-api";
import { userAddAliasCall } from "@/utils/api/user-api";

import BasicModal from "./BasicModal";

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function AddAliasModal({ open, setModal, user }) {
    const [games, setGames] = useState([])
    const [gameId, setGameId] = useState(games.length > 0 ? games[0].id : null)
    const [alias, setAlias] = useState('')

    useEffect(() => {
        const retrieveGames = async () => {
            const data = await retrieveGamesCall();
            setGames(data.games)
            if (data.games.length >= 0)
                setGameId(data.games[0].id)
        }

        retrieveGames()
        .catch(console.error)
    }, [])

    const handleClose = () => {

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        
        await userAddAliasCall(gameId, alias)
            .then(data => {
                if (data.success) {
                    setModal(false)
                    location.reload()
                }
            })
    }

    return (
        <div>
            <BasicModal
                label="Add Alias"
                setModal={setModal}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form method="POST" onSubmit={onSubmit}>
                    <FormControl sx={{display: 'flex', gap: 2}}>
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

                        <TextField id="alias" label="Alias" variant="outlined" required={true}
                            onChange={(e) => setAlias(e.target.value)} value={alias} />

                        <Button type="submit" variant="contained">Add</Button>
                    </FormControl>
                </form>
            </BasicModal>
        </div>
    );
}