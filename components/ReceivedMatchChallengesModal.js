import { useState } from "react";
import moment from "moment";

import { acceptTeamMatchChallengeCall, ignoreTeamMatchChallengeCall } from "@/utils/api/team-api";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import CarpenterIcon from '@mui/icons-material/Carpenter';

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
    flexDirection: 'column',
    justifyContent: 'center',
};

export default function ReceivedMatchChallengesModal({ challenges = [], open, setModal }) {
    const handleClose = () => {

    }

    console.log(challenges)

    const handleAnswerChallenge = async (challenge, answer) => {

        if (answer) {
            await acceptTeamMatchChallengeCall(challenge.id, challenge.teamSender.id, challenge.teamReceiver.id, challenge.date)
                .then(data => {
                    if (data) {
                        location.replace("/matches/" + data.match.id)
                    } else {
                        console.log('something went wrong')
                    }
                })
        } else {
            await ignoreTeamMatchChallengeCall(challenge.id)
                .then(data => {
                    if (data) {
                        location.reload()
                    } else {
                        console.log('something went wrong')
                    }
                })
        }
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
                    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                        {challenges.map(challenge => {
                            const date = moment(challenge.date).format("MMM Do YYYY")
                            const timeSince = moment(challenge.created).fromNow();
                            return (
                                <ListItem key={challenge.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <CarpenterIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={challenge.teamSender.name} secondary={date} />
                                    <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={() => handleAnswerChallenge(challenge, true)}>
                                        Accept
                                    </Button>
                                    <Button variant="contained" sx={{ ml: 1 }} onClick={() => handleAnswerChallenge(challenge, false)}>
                                        Ignore
                                    </Button>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Button onClick={() => setModal(false)}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}