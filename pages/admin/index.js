import { useState } from "react";
import dynamic from "next/dynamic";

import { useTheme } from "@mui/styles";
import moment from "moment";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

import { adminBanUserCall, adminPromoteUserCall } from "@/utils/api/admin-api";
import { db } from "@/utils/db-server"
import BoxLabelIconTopper from "@/components/BoxLabelIconTopper";

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BarChartIcon from '@mui/icons-material/BarChart';
import NumbersIcon from '@mui/icons-material/Numbers';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AdminSignupsChart = dynamic(
    () => import('../../components/AdminSignupsChart'),
    { ssr: false, loading: () => <p>Loading...</p> }
  )
import { Box, Typography } from "@mui/material";

export default function Admin({ user, data }) {
    const theme = useTheme();

    const [banUsername, setBanUsername] = useState("")
    const [unbanUsername, setUnbanUsername] = useState("")
    const [promoteUsername, setPromoteUsername] = useState("")
    const [demoteUsername, setDemoteUsername] = useState("")

    const onBanSubmit = async (e) => {
        e.preventDefault()  
        
        await adminBanUserCall(banUsername, true)
        .then(d => {
            if (d) {
                location.reload();
            } else {
                console.log("something went wrong");
            }
        })
    }

    const onUnbanSubmit = async (e) => {
        e.preventDefault()
        
        await adminBanUserCall(unbanUsername, false)
        .then(d => {
            if (d) {
                location.reload();
            } else {
                console.log("something went wrong");
            }
        })
    }

    const onPromoteSubmit = async (e) => {
        e.preventDefault()  
        
        await adminPromoteUserCall(promoteUsername, true)
        .then(d => {
            if (d) {
                location.reload();
            } else {
                console.log("something went wrong");
            }
        })
    }

    const onDemoteSubmit = async (e) => {
        e.preventDefault()  
        
        await adminPromoteUserCall(demoteUsername, false)
        .then(d => {
            if (d) {
                location.reload();
            } else {
                console.log("something went wrong");
            }
        })
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', margin: 5, gap: 5}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="h6" color={theme.palette.white}>Admin</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2, flexWrap: 'wrap'}}>
                <Box>
                    <BoxLabelIconTopper icon={<BarChartIcon fontSize="medium"/>} label="Signups"/>
                    <AdminSignupsChart data={data.signup} />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <BoxLabelIconTopper icon={<NumbersIcon fontSize="medium"/>} label="Statistics"/>
                    <Box sx={{ 
                            paddingX: '30px',
                            height: '100%',
                            backgroundColor: theme.palette.white,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: theme.border.radius,
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h6">Total Users: {data.userCount}</Typography>
                        <Typography variant="h6">Total Banned Users: {data.userBanCount}</Typography>
                        <Typography variant="h6">Total Teams: {data.teamCount}</Typography>
                        <Typography variant="h6">Total Posts: {data.postCount}</Typography>
                        <Typography variant="h6">Total Matches: {data.matchCount}</Typography>
                    </Box>
                </Box>
            </Box>


            <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Box>
                    <BoxLabelIconTopper icon={<AdminPanelSettingsIcon fontSize="medium"/>} label="Moderation"/>
                    <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', backgroundColor: theme.palette.white, padding: 2, borderRadius: theme.border.radius}}>
                        <form method="POST" onSubmit={onBanSubmit}>
                            <Typography>Ban User</Typography>
                            <FormControl>
                                <TextField id="ban-username" label="Username" variant="outlined" onChange={(e) => setBanUsername(e.target.value)} value={banUsername} />
                                <Button type="submit" variant="contained">Ban</Button>
                            </FormControl>
                        </form>

                        <form method="POST" onSubmit={onUnbanSubmit}>
                            <Typography>Unban User</Typography>
                            <FormControl>
                                <TextField id="unban-username" label="Username" variant="outlined" onChange={(e) => setUnbanUsername(e.target.value)} value={unbanUsername} />
                                <Button type="submit" variant="contained">Unban</Button>
                            </FormControl>
                        </form>

                        <form method="POST" onSubmit={onPromoteSubmit}>
                            <Typography>Promote User to Admin</Typography>
                            <FormControl>
                                <TextField id="unban-username" label="Username" variant="outlined" onChange={(e) => setPromoteUsername(e.target.value)} value={promoteUsername} />
                                <Button type="submit" variant="contained">Promote</Button>
                            </FormControl>
                        </form>

                        <form method="POST" onSubmit={onDemoteSubmit}>
                            <Typography>Demote User from Admin</Typography>
                            <FormControl>
                                <TextField id="unban-username" label="Username" variant="outlined" onChange={(e) => setDemoteUsername(e.target.value)} value={demoteUsername} />
                                <Button type="submit" variant="contained">Demote</Button>
                            </FormControl>
                        </form>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session || !session.user.admin) {
        return { redirect: { destination: "/" } };
    }

    let data = {}

    // SIGNUP DATA

    // Query signups by month data from database then downcast (because mysql returns bigint which is not serializable)
    const userCreatedQueryResult = await db.$queryRaw`SELECT 
                                                        EXTRACT(MONTH FROM created) AS created_month, 
                                                        EXTRACT(YEAR FROM created) AS created_year,
                                                        COUNT(*) AS count
                                                    FROM "User"
                                                    GROUP BY created_month, created_year`
    let signupsByMonth = userCreatedQueryResult.map(d => {
        const year = parseInt(d.created_year)
        const month = moment().month(parseInt(d.created_month - 1)).format("MMMM")
        return { year: year, 
                 month: month, 
                 signups: parseInt(d.count),
                 label: month + " " + year }
    })

    // Fill in missing months of the year
    let distinctYears = []
    signupsByMonth.forEach(su => !(distinctYears.findIndex(y => y == su.year) && distinctYears.push(su.year)));
    let signupData = []
    distinctYears.forEach(year => {
        for (let i = 0; i < 12; i++) {
            const currentMonth = moment().month(i).format("MMMM")
            const signupMonth = signupsByMonth.find(su => su.month == currentMonth)
            if (!signupMonth) {
                signupData.push({
                    year: year,
                    month: currentMonth,
                    signups: 0,
                    label: currentMonth + " " + year
                })
            } else {
                signupData.push(signupMonth)
            }
        }
    })
    data['signup'] = signupData

    // TOTAL COUNT DATA
    data['userCount'] = await db.user.count()

    data['userBanCount'] = await db.user.count({
        where: {
            banned: true
        }
    })

    data['teamCount'] = await db.team.count()

    data['postCount'] = await db.post.count()

    data['matchCount'] = await db.match.count()

    return {
        props: { user: session.user, data: data },
    }
}