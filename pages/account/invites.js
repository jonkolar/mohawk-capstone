import React, { useState, useEffect, useContext } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import moment from 'moment';

import Box from "@mui/material";
import { Button } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';

import { db } from "@/utils/db-server"
import { userAcceptTeamInviteCall } from "@/utils/api/user-api";

const AccountInvites = ({ session, invites }) => {
    const onRefreshInvites = async () => {
        // Get Updated Invites
        location.reload() // Placeholder
    }

    const onAnswerInvite = async (invite, answer) => {
        const response = await userAcceptTeamInviteCall(invite.id, answer)
            .then(response => {
                location.reload();
            })
    }

    return (
        <>
            <h1>Team Invites</h1>
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                {invites.map(invite => {
                    const timeSince = moment(invite.created).fromNow();
                    return (
                        <ListItem key={invite.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={invite.team.name} secondary={timeSince} />
                            <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={() => onAnswerInvite(invite, true)}>
                                Accept
                            </Button>
                            <Button variant="contained" sx={{ ml: 1 }} onClick={() => onAnswerInvite(invite, false)}>
                                Ignore
                            </Button>
                        </ListItem>
                    )
                })}
            </List>
            <Button onClick={() => onRefreshInvites()}>Refresh</Button>
        </>
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
    return { props: { session: session, invites: JSON.parse(JSON.stringify(invites)) } };
}