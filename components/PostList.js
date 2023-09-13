import { useState } from 'react';
import moment from 'moment';

import { createPostLikeCall, removePostLikeCall } from '@/utils/api/team-api';

import HoverIcon from './HoverIcon';

import { useTheme } from "@mui/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box } from '@mui/material';


export default function PostList({ posts, user }) {
    const theme = useTheme();

    const PostListItem = ({ post, theme }) => {
        const [liked, setLiked] = useState(true ? user && post.likes.find(p => p.userId == user.id) : false)
        const [likeCount, setLikeCount] = useState(post.likes.length)

        const timeSince = moment(post.date).fromNow();

        const onLikeIconClickedHandler = async (liked) => {
            if (liked) {
                await createPostLikeCall(post.id)
                .then((data) => {
                    if (data)
                        setLiked(true)
                        setLikeCount(likeCount + 1)
                })
            } else {
                await removePostLikeCall(post.id)
                .then((data) => {
                    if (data)
                        setLiked(false)
                        setLikeCount(likeCount - 1)
                })
            }
        }

        return (
            <ListItem>
                <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginRight: '10px'}}>
                    { liked ?
                    <HoverIcon icon={<FavoriteIcon fontSize='small' sx={{ color: 'red'}} />} onClick={() => onLikeIconClickedHandler(false)} />
                    :
                    <HoverIcon icon={<FavoriteBorderIcon fontSize='small' sx={{ color: theme.palette.white}}/>} onClick={() => onLikeIconClickedHandler(true)} />
                    }
                    <span>{likeCount}</span>
                </Box>
                <ListItemText
                    secondaryTypographyProps={{color: theme.palette.white}}
                    primary={post.content}
                    secondary={timeSince}
                />
            </ListItem>
        )}

    return (
        <List dense={true} sx={{ color: theme.palette.white}}>
            { posts.map(post => <PostListItem key={post.id} post={post} theme={theme}/>)}
        </List>
    );
}






