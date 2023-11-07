import { useState, useEffect } from "react";

import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'

import Link from "@/components/Link";
import PostList from "@/components/PostList";
import TeamList from "@/components/TeamList";

import { useTheme } from "@mui/styles";
import { TextField, InputAdornment, Button, Typography } from "@mui/material"
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
    const theme = useTheme();

    const [value, setValue] = useState(0);
 
    const [search, setSearch] = useState('');
    const [results, setResults] = useState({
        teams: [],
        posts: [],
        users: [],
    });
    const [resultsDoneFlags, setResultsDoneFlags] = useState({
        teams: false,
        posts: false,
        users: false
    })
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

            setResultsDoneFlags({teams: initialTeams.length <= 2, posts: initialPosts.length <= 2, users: initialUsers.length <= 2})

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
            if (data.results.length <= 2)
                setResultsDoneFlags({teams: true, posts: resultsDoneFlags.posts, users: resultsDoneFlags.users})

            addToResults({ newTeams: data.results })
            updateResultsCursors({ teamsCursor: data.results.length > 0 ? data.results[data.results.length - 1].id : resultsCursors.teams })
        })
    }

    const onShowMorePostsButtonClicked = async () => {
        await searchPostsCall(search, resultsCursors.posts)
        .then(data => {
            if (data.results.length <= 2)
                setResultsDoneFlags({teams: resultsDoneFlags.teams, posts: true, users: resultsDoneFlags.users})
            addToResults({ newPosts: data.results })
            updateResultsCursors({ postsCursor: data.results.length > 0 ? data.results[data.results.length - 1].id : resultsCursors.posts })
        })
    }

    const onShowMoreUsersButtonClicked = async () => {
        await searchUsersCall(search, resultsCursors.users)
        .then(data => {
            if (data.results.length <= 2)
                setResultsDoneFlags({teams: resultsDoneFlags.teams, posts: resultsDoneFlags.posts, users: true})
            addToResults({ newUsers: data.results })
            updateResultsCursors({ usersCursor: data.results.length > 0 ? data.results[data.results.length - 1].id : resultsCursors.users })
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <TextField
                id="search"
                type="search"
                placeholder="Search"
                value={search}
                onKeyDown={onSubmitSearchHandler}
                onChange={e => setSearch(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                  }}
                sx={{ width: '75%', marginTop: 5, marginBottom: 5, backgroundColor: theme.palette.white, borderRadius: 2}}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                }}
            />

            { router.query.q &&
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', backgroundColor: theme.palette.white}} >
                    <Tabs 
                        value={value} 
                        onChange={handleTabChange} 
                        aria-label="basic tabs example" 
                        TabIndicatorProps={{
                            style: {
                              backgroundColor: theme.palette.primary.main,
                            }
                          }}
                        textColor="primary"
                        
                    >
                        <Tab label="Teams" />
                        <Tab label="Posts" />
                        <Tab label="Users" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Typography variant="h6" color={theme.palette.white} sx={{marginBottom: 3}}>Team Results:</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {results.teams.length <= 0 && <Typography variant="h5" color={theme.palette.white}>No results...</Typography>}
                        {results.teams.length > 0 && <TeamList teams={results.teams} />}
                        {!resultsDoneFlags.teams && <Button variant="contained" sx={{marginTop: 3}} onClick={() => onShowMoreTeamsButtonClicked()}>Show More</Button>}
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography variant="h6" color={theme.palette.white} sx={{marginBottom: 3}}>Post Results:</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {results.posts.length <= 0 && <Typography variant="h5" color={theme.palette.white}>No results...</Typography>}
                        <PostList posts={results.posts} />
                        {!resultsDoneFlags.posts && <Button variant="contained" sx={{marginTop: 3}} onClick={() => onShowMorePostsButtonClicked()}>Show More</Button>}
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Typography variant="h6" color={theme.palette.white} sx={{marginBottom: 3}}>User Results:</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {results.users.length <= 0 && <Typography variant="h5" color={theme.palette.white}>No results...</Typography>}
                        {results.users.map(user => <Link href={"/users/" + user.username} key={user.id}>
                                                      <Typography variant="h5" key={user.id} color={theme.palette.white}>{user.username}</Typography>
                                                   </Link>)}
                        {!resultsDoneFlags.users && <Button variant="contained" sx={{marginTop: 3}} onClick={() => onShowMoreUsersButtonClicked()}>Show More</Button> }
                    </Box>
                </TabPanel>
            </Box>
            }
        </Box>
    )
  }