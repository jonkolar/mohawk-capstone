import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useSession, signIn, signOut } from "next-auth/react"
import moment from "moment";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

import { adminBanUserCall } from "@/utils/api/admin-api";

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { db } from "@/utils/db-server"

const AdminSignupsChart = dynamic(
    () => import('../../components/AdminSignupsChart'),
    { ssr: false, loading: () => <p>Loading...</p> }
  )
import { Box } from "@mui/material";

export default function Admin({ user, data }) {
    const [banUsername, setBanUsername] = useState("")
    const [unbanUsername, setUnbanUsername] = useState("")


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


    return (
        <>
            <h1>Data</h1>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', gap: 2}}>
                <Box>
                    <AdminSignupsChart data={data.signup} />
                </Box>
                <Box>
                    <Box sx={{ 
                            paddingX: '30px',
                            backgroundColor: 'lightgrey',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <h3>Total Users: {data.userCount}</h3>
                        <h3>Total Banned Users: {data.userBanCount}</h3>
                        <h3>Total Teams: {data.teamCount}</h3>
                        <h3>Total Posts: {data.postCount}</h3>
                        <h3>Total Matches: {data.matchCount}</h3>
                    </Box>
                </Box>
            </Box>
            <h1>Moderation</h1>

            <Box sx={{display: 'flex', gap: 3, justifyContent: 'center'}}>
                <form method="POST" onSubmit={onBanSubmit}>
                    <h3>Ban User:</h3>
                    <FormControl>
                        <TextField id="ban-username" label="Username" variant="outlined" onChange={(e) => setBanUsername(e.target.value)} value={banUsername} />
                        <Button type="submit" variant="contained">Ban</Button>
                    </FormControl>
                </form>

                <form method="POST" onSubmit={onUnbanSubmit}>
                    <h3>Unban User:</h3>
                    <FormControl>
                        <TextField id="unban-username" label="Username" variant="outlined" onChange={(e) => setUnbanUsername(e.target.value)} value={unbanUsername} />
                        <Button type="submit" variant="contained">Unban</Button>
                    </FormControl>
                </form>
            </Box>
        </>
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
    const userCreatedQueryResult = await db.$queryRaw`SELECT MONTH(created) AS created_month, YEAR(created) as created_year, COUNT(*) AS count 
                                      from User 
                                      GROUP BY created_year, created_month`
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
    signupsByMonth.forEach(su => !(su.year in distinctYears) && distinctYears.push(su.year))
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