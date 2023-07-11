import { forwardRef } from 'react';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteIcon from '@mui/icons-material/Delete';

import Link from './Link';
import HoverIcon from './HoverIcon';

const TeamListItem = forwardRef(({ team, onClick, href }, ref) => {
    return (
        <a href={href} onClick={onClick} ref={ref} style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItem key={team.id}>
                <ListItemAvatar>
                <Avatar>
                    <GroupsIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={team.name} secondary={team.description} />
            </ListItem>
        </a>
    )
  })

export default function TeamList({ teams, user, onDeleteTeamHandler }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        { teams.map(team => {
            const isOwner = team.ownerId == user.id
            return (
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Link useFunctionalComponent={true} href={"/teams/" + team.id}>
                        <TeamListItem team={team} />
                    </Link>
                    { isOwner && <HoverIcon icon={<DeleteIcon />} onClick={(e) => onDeleteTeamHandler(team.id)} /> }
                </Box>
            )
        })}
    </List>
  );
}