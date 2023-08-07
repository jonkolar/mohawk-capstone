import { useState, useEffect } from "react";

import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'

import { TextField, InputAdornment, Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { Box, Tabs, Tab, } from "@mui/material";

import { searchTeamsCall, searchPostsCall, searchUsersCall } from "@/utils/api/search-api";

function TabPanel({ children, value, index }) {
    return (
        <div>
            {value === index && (
                <Box sx={{ p: 3 }}>
                {children}
                </Box>
            )}
        </div>
    );
}

export default function Search({  }) {
    const { data: session } = useSession();
    const router = useRouter()

    const [value, setValue] = useState(0);
 
    const [search, setSearch] = useState('');
    const [results, setResults] = useState({
        teams: [],
        posts: [],
        users: [],
    });
    const [resultsCursors, setResultsCursors] = useState({
        teams: null,
        posts: null,
        users: null,
    })

    const addToResults = ({ newTeams=[], newPosts=[], newUsers=[], }) => {
        setResults({
            teams: [...results.teams, ...newTeams],
            posts: [...results.posts, ...newPosts],
            users: [...results.users, ...newUsers]
        })
    }

    const updateResultsCursors = ({ teamsCursor=null, postsCursor=null, usersCursor=null}) => {
        setResultsCursors({
            teams: teamsCursor ? teamsCursor : resultsCursors.teams,
            posts: postsCursor ? postsCursor : resultsCursors.posts,
            users: usersCursor ? usersCursor : resultsCursors.users,
        })
    }

    useEffect(() => {
        const initialSearchCall = async (search) => {
            let initialTeams = []
            let initialPosts = []
            let initialUsers = []

            Promise.allSettled([
                await searchTeamsCall(search)
                .then(data => {
                    initialTeams = data.results
                }),
                await searchPostsCall(search)
                .then(data => {
                    initialPosts = data.results
                }),
                await searchUsersCall(search)
                .then(data => {
                    initialUsers = data.results
                }),
            ])

            setResults({
                teams: initialTeams,
                posts: initialPosts,
                users: initialUsers
            })

            updateResultsCursors({
                teamsCursor: initialTeams.length > 0 ? initialTeams[initialTeams.length - 1].id : null,
                postsCursor: initialPosts.length > 0 ? initialPosts[initialPosts.length - 1].id : null,
                usersCursor: initialUsers.length > 0 ? initialUsers[initialUsers.length - 1].id : null,
            })
        }

        if (!router.isReady) return;

        const { q } = router.query
        if (q) {
            setSearch(q)
            initialSearchCall(q);
        }
    }, [router.isReady, router.query])

    const onSubmitSearchHandler = (e) => {
        if (e.key == 'Enter') {
            if (search)
                router.push("?q=" + search);
        }
    }

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const onShowMoreTeamsButtonClicked = async () => {
        await searchTeamsCall(search, resultsCursors.teams)
        .then(data => {
            addToResults({ newTeams: data.results })
            updateResultsCursors({ teamsCursor: data.results.length > 0 ? data.results[data.results.length - 1].id : resultsCursors.teams })
        })
    }

    const onShowMorePostsButtonClicked = async () => {
        await searchPostsCall(search, resultsCursors.posts)
        .then(data => {
            addToResults({ newPosts: data.results })
            updateResultsCursors({ postsCursor: data.results.length > 0 ? data.results[data.results.length - 1].id : resultsCursors.posts })
        })
    }

    const onShowMoreUsersButtonClicked = async () => {
        await searchUsersCall(search, resultsCursors.users)
        .then(data => {
            console.log(data)
            addToResults({ newUsers: data.results })
            updateResultsCursors({ usersCursor: data.results.length > 0 ? data.results[data.results.length - 1].id : resultsCursors.users })
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <TextField
                id="search"
                type="search"
                label="Search"
                value={search}
                onKeyDown={onSubmitSearchHandler}
                onChange={e => setSearch(e.target.value)}
                sx={{ width: '75%', marginTop: 5 }}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                }}
            />

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center'}}>
                    <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example" >
                        <Tab label="Teams" />
                        <Tab label="Posts" />
                        <Tab label="Users" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <h2>Team Results:</h2>
                    {results.teams.map(team => <h3>{team.name}</h3>)}
                    <Button sx={{marginTop: 3}} onClick={() => onShowMoreTeamsButtonClicked()}>Show More</Button>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <h2>Post Results:</h2>
                    {results.posts.map(post => <h3>{post.content} on {post.date}</h3>)}
                    <Button sx={{marginTop: 3}} onClick={() => onShowMorePostsButtonClicked()}>Show More</Button>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <h2>User Results:</h2>
                    {results.users.map(user => <h3>{user.username}</h3>)}
                    <Button sx={{marginTop: 3}} onClick={() => onShowMoreUsersButtonClicked()}>Show More</Button>
                </TabPanel>
            </Box>
        </Box>
    )
  }