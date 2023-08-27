import { useEffect } from "react";
import dynamic from "next/dynamic";

import { useSession, signIn, signOut } from "next-auth/react"
import moment from "moment";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

import { db } from "@/utils/db-server"

const AdminSignupsChart = dynamic(
    () => import('../../components/AdminSignupsChart'),
    { ssr: false, loading: () => <p>Loading...</p> }
  )
import { Box } from "@mui/material";

export default function Admin({ user, data }) {
    return (
        <>
            <h1>Admin</h1>

            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h3>Signups</h3>
                <AdminSignupsChart data={data.signupData} />
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
    data['signupData'] = signupData

    return {
        props: { user: session.user, data: data },
    }
}