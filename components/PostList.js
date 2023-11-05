import { useTheme } from "@mui/styles";
import List from '@mui/material/List';

import PostListItem from './PostListItem';

export default function PostList({ posts }) {
    const theme = useTheme();

    return (
        <List dense={true} sx={{ color: theme.palette.white}}>
            { posts.map(post => <PostListItem key={post.id} post={post} theme={theme}/>)}
        </List>
    );
}






