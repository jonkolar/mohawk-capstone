import { useState } from "react";

import { createPostCall } from "@/utils/api/team-api";
import BasicModal from "./BasicModal";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function CreatePostModal({ team, open, setModal }) {
    const [content, setContent] = useState('')

    const handleClose = () => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPostCall(team.id, content)
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
                label="Create Post"
                open={open}
                setModal={setModal}
                onClose={handleClose}
            >
                <form method="POST" onSubmit={handleSubmit}>
                    <FormControl sx={{display: 'flex', gap: 2}}>
                        <TextField id="post-content" label="Content" variant="outlined" required={true} onChange={(e) => setContent(e.target.value)} value={content} inputProps={{ maxLength: 120 }}/>
                        <Button type="submit" variant="contained">Create</Button>
                    </FormControl>
                </form>
            </BasicModal>
        </div>
    );
}