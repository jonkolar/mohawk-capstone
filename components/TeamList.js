import { forwardRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import StarsIcon from '@mui/icons-material/Stars';

import Link from './Link';

const TeamListItem = forwardRef(({ user, team, onClick, href, viewOnly=false }, ref) => {
    const { data: session } = useSession()
    const theme = useTheme();
    const isOwner = session ? session.user.id == team.ownerId : false

    useEffect(() => {}, [session]);

    return (
        <a href={href} onClick={onClick} ref={ref} style={{textDecoration: 'none', color: theme.palette.white}}>
            <ListItem key={team.id} >
                <ListItemAvatar>
                <Avatar>
                    <WorkspacesIcon color='primary' />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={team.name} secondary={team.description} secondaryTypographyProps={{color: theme.palette.white}}/>
                { isOwner && 
                    <Box sx={{ ml: 5 }}>
                        <StarsIcon />
                    </Box>
                }
            </ListItem>
        </a>
    )
  })
TeamListItem.displayName = "TeamListItem";

export default function TeamList({ teams, user }) {
  const theme = useTheme();

  return (
    <List sx={{ width: '100%', maxWidth: 360, color: theme.palette.white, bgcolor: theme.palette.primary.main, borderRadius: 5}}>
        { teams.length <= 0 && <Typography variant='h6' style={{margin: 6}}>No teams exist... create one!</Typography> }
        { teams.map(team => {
            return (
                <Link key={team.id} useFunctionalComponent={true} href={"/teams/" + team.id}>
                    <TeamListItem team={team} user={user} />
                </Link>
            )
        })}
    </List>
  );
}