import { useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
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
    borderRadius: 5
};

export default function CreateTeamModal({ session, open, setModal, games }) {
    const [name, setName] = useState('')
    const [game, setGame] = useState(games[0].id)
    const [description, setDescription] = useState('')

    const handleClose = () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // submit form to backend
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
                <TextField id="team-name" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} value={name}/>

                <br /><br />
                
                <Select
                    labelId="team-game-label"
                    id="team-game"
                    value={game}
                    onChange={(e) => {setGame(e.target.value)}}
                >
                    {games.map((game) => 
                        <MenuItem key={game.id} value={game.id}>{game.name}</MenuItem>
                    )}
                </Select>

                <br /><br />

                <TextField id="team-description" label="Description" variant="outlined" onChange={(e) => setDescription(e.target.value)} value={description}/>

                <br /><br />

                <Button type="submit" variant="contained">Submit</Button>
                <Button onClick={() => setModal(false)}>Close</Button>

            </FormControl>
            </form>

            </Box>
          </Modal>
        </div>
    );
}