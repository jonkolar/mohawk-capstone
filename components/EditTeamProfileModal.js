import { useState } from "react";

import { editTeamProfileCall } from "@/utils/api/team-api";
import BasicModal from "./BasicModal";

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function EditTeamProfileModal({ team, open, setModal }) {
    const [name, setName] = useState(team.name);
    const [description, setDescription] = useState(team.description);

    const handleClose = () => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editTeamProfileCall(team.id, name, description)
            .then(data =>{
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
                label="Edit Team"
                open={open}
                setModal={setModal}
                onClose={handleClose}
            >
                <form method="POST" onSubmit={handleSubmit}>
                    <FormControl sx={{display: 'flex', gap: 2}}>
                    <TextField id="team-name-edit" label="Name" variant="outlined" required={true} onChange={(e) => setName(e.target.value)} value={name} />
                        <TextField id="team-description-edit" label="Description" variant="outlined" required={true} onChange={(e) => setDescription(e.target.value)} value={description} />
                        <Button type="submit" variant="contained">Edit</Button>
                    </FormControl>
                </form>
            </BasicModal>
        </div>
    );
}