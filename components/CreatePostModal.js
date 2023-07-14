import { useState } from "react";

import { createPostCall } from "@/utils/api/team-api";

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

export default function CreatePostModal({ team, open, setModal }) {
    const [content, setContent] = useState('')

    const handleClose = () => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("CREATE POST")

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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <form method="POST" onSubmit={handleSubmit}>
                        <FormControl>
                            <TextField id="post-content" label="Content" variant="outlined" onChange={(e) => setContent(e.target.value)} value={content} />
                            <Button type="submit" variant="contained">Create</Button>
                            <Button onClick={() => setModal(false)}>Close</Button>
                        </FormControl>
                    </form>

                </Box>
            </Modal>
        </div>
    );
}