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

const TeamListItem = forwardRef(({ team, onDeleteTeamHandler, onClick, href }, ref) => {
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

export default function TeamList({ teams, onDeleteTeamHandler }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        { teams.map(team => 
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Link useFunctionalComponent={true} href={"/teams/" + team.id}>
                <TeamListItem team={team} onDeleteTeamHandler={onDeleteTeamHandler}/>
            </Link>
            <div onClick={(e) => onDeleteTeamHandler(team.id)}>
                <DeleteIcon/>
            </div>
        </Box>
        )}
    </List>
  );
}