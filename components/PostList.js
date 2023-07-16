import * as React from 'react';
import moment from 'moment';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function PostList({ posts }) {

    const PostListItem = ({ post }) => {
        const timeSince = moment(post.date).fromNow();
        return (
            <ListItem>
                <ListItemText
                    primary={post.content}
                    secondary={timeSince}
                />
            </ListItem>
        )}

    return (
        <List dense={true}>
            { posts.map(post => <PostListItem key={post.id} post={post}/>)}
        </List>
    );
}






