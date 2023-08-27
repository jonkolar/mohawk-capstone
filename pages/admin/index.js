import { useEffect } from "react";

import { useSession, signIn, signOut } from "next-auth/react"
import moment from "moment";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

import { db } from "@/utils/db-server"

import { Box } from "@mui/material";

export default function Admin({ user, data }) {

    console.log(data.signupsByMonth)

    return (
        <>
            <h1>Admin</h1>

            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h3>Signups</h3>
                <LineChart width={600} height={300} data={data.signupsByMonth} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="signups" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="label" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                </LineChart>
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

    // user count (can you downcast in prisma SQL???)
    const userCreatedQueryResult = await db.$queryRaw`SELECT MONTH(created) AS created_month, YEAR(created) as created_year, COUNT(*) AS count 
                                      from User 
                                      GROUP BY created_year, created_month`
    const signupsByMonth = userCreatedQueryResult.map(d => {
        const year = parseInt(d.created_year)
        const month = moment().month(parseInt(d.created_month - 1)).format("MMMM")
        return { year: year, 
                 month: month, 
                 signups: parseInt(d.count),
                 label: month + " " + year }
    })

    data['signupsByMonth'] = signupsByMonth

    return {
        props: { user: session.user, data: data },
    }
}