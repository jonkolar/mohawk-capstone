import React, { useState, useEffect, useContext } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import moment from 'moment';
import { useTheme } from "@mui/styles";

import { db } from "@/utils/db-server"
import { userAcceptTeamInviteCall } from "@/utils/api/user-api";
import ChooseAliasModal from "@/components/ChooseAliasModal";
import BoxLabelIconTopper from "@/components/BoxLabelIconTopper";

import { Button, Box, Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const AccountInvites = ({ user, invites }) => {
    const theme = useTheme();

    const [showChooseAliasModal, setShowChooseAliasModal] = useState(false)
    const [currentInvite, setCurrentInvite] = useState(null);

    const onRefreshInvites = async () => {
        // Get Updated Invites
        location.reload()
    }

    const onAnswerInvite = async (invite, answer) => {
        if (answer) {
            setCurrentInvite(invite)
            setShowChooseAliasModal(true)
        } else {
            const response = await userAcceptTeamInviteCall(invite.id, answer)
            .then(response => {
                location.reload();
            })
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 5, alignItems: 'center', gap: 2}}>
            <Box>
                <BoxLabelIconTopper icon={<WorkIcon fontSize="medium"/>} label="TEAM INVITES" />
                <Box sx={{display: 'flex', justifyContent: 'center', padding: 3, backgroundColor: theme.palette.primary.main, borderRadius: theme.border.radius}}>
                    <List sx={{ width: '100%', maxWidth: 500 }}>
                        {invites.length <= 0 && <Typography variant="h6" color={theme.palette.white}>No invites...</Typography>}
                        {invites.map(invite => {
                            const timeSince = moment(invite.created).fromNow();
                            return (
                                <ListItem key={invite.id} sx={{backgroundColor: theme.palette.white, borderRadius: theme.border.radius, mb: 1}}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <WorkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={invite.team.name} secondary={timeSince} />
                                    <Button variant="contained" color="success" sx={{ mr: 1, ml: 3 }} onClick={() => onAnswerInvite(invite, true)}>
                                        Accept
                                    </Button>
                                    <Button variant="contained" sx={{ ml: 1 }} onClick={() => onAnswerInvite(invite, false)}>
                                        Ignore
                                    </Button>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
            </Box>
            <Button variant="contained" onClick={() => onRefreshInvites()}>Refresh</Button>
            <ChooseAliasModal open={showChooseAliasModal} setModal={setShowChooseAliasModal} user={user} invite={currentInvite}/>
        </Box>
    )
}

export default AccountInvites;


// This gets called on every request
export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)

    const invites = await db.teamInvite.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            team: true
        }
    })

    // Pass data to the page via props
    return { props: { user: session.user, invites: JSON.parse(JSON.stringify(invites)) } };
}