import moment from "moment";

import { acceptTeamMatchChallengeCall, ignoreTeamMatchChallengeCall } from "@/utils/api/team-api";
import BasicModal from "./BasicModal";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from "@mui/material";
import CarpenterIcon from '@mui/icons-material/Carpenter';

export default function ReceivedMatchChallengesModal({ challenges = [], open, setModal }) {
    const handleClose = () => {

    }

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
            <BasicModal
                label="Challenges"
                open={open}
                onClose={handleClose}
                setModal={setModal}
            >
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    {challenges.length <= 0 && <Typography variant="h5">No Challenges...</Typography>}
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
                </Box>
            </BasicModal>
        </div>
    );
}