import { useState, useEffect } from "react";

import { retrieveGamesCall } from "@/utils/api/data-api";
import { userAddAliasCall } from "@/utils/api/user-api";

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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form method="POST" onSubmit={onSubmit}>
                        <FormControl>
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

                            <TextField id="alias" label="Alias" variant="outlined" onChange={(e) => setAlias(e.target.value)} value={alias} />

                            <Button type="submit" variant="contained">Add</Button>
                            <Button onClick={() => setModal(false)}>Close</Button>
                        </FormControl>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}