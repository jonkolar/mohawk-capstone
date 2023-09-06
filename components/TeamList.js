import { forwardRef } from 'react';

import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkspacesIcon from '@mui/icons-material/WorkSpaces';
import StarsIcon from '@mui/icons-material/Stars';

import Link from './Link';

const TeamListItem = forwardRef(({ user, team, onClick, href, viewOnly=false }, ref) => {
    const isOwner = team.ownerId == user.id
    return (
        <a href={href} onClick={onClick} ref={ref} style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItem key={team.id}>
                <ListItemAvatar>
                <Avatar>
                    <WorkspacesIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={team.name} secondary={team.description}/>
                { isOwner && 
                    <Box sx={{ ml: 5 }}>
                        <StarsIcon />
                    </Box>
                }
            </ListItem>
        </a>
    )
  })

export default function TeamList({ teams, user }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: 5}}>
        { teams.map(team => {
            return (
                <Link useFunctionalComponent={true} href={"/teams/" + team.id}>
                    <TeamListItem team={team} user={user} />
                </Link>
            )
        })}
    </List>
  );
}