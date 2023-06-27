import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TeamList({ teams, onDeleteTeamHandler }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        { teams.map(team => 
            <ListItem key={team.id}>
                <ListItemAvatar>
                <Avatar>
                    <GroupsIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={team.name} secondary={team.description} />
                <div onClick={(e) => onDeleteTeamHandler(team.id)}>
                    <DeleteIcon/>
                </div>
            </ListItem>
        )}
    </List>
  );
}