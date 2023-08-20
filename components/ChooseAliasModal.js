import { useState, useEffect } from "react";

import { userRetrieveAllAliasCall, userAcceptTeamInviteCall } from "@/utils/api/user-api";

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

export default function ChooseAliasModal({ open, setModal, user, invite }) {
    const [aliasId, setAliasId] = useState("");
    const [aliases, setAliases] = useState([])

    useEffect(() => {
        const retrieveAliases = async () => {
            const data = await userRetrieveAllAliasCall(user.id);
            setAliases(data.aliases)
        }

        retrieveAliases()
        .catch(console.error)
    }, [])

    const handleClose = () => {

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        
        console.log("SUBMIT")

        const response = await userAcceptTeamInviteCall(invite.id, true, aliasId)
            .then(response => {
                setModal(false);
                location.reload();
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
                                labelId="alias-label"
                                id="alias"
                                value={aliasId}
                                onChange={(e) => { setAliasId(e.target.value) }}
                            >
                                {aliases.map((alias) =>
                                    <MenuItem key={alias.id} value={alias.id}>{alias.alias}</MenuItem>
                                )}
                            </Select>

                            <Button type="submit" variant="contained">Accept</Button>
                            <Button onClick={() => setModal(false)}>Close</Button>
                        </FormControl>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}