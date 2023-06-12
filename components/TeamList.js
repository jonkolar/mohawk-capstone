import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';

export default function TeamList({ teams }) {
    console.log(teams)

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        { teams.map(team => 
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <GroupsIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={team.name} secondary={team.description} />
            </ListItem>
        )}
    </List>
  );
}