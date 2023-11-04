import { Box } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useTheme } from '@mui/styles';


const AdminSignupsChart = ({ data }) => {
    const theme = useTheme();

    return (
        <Box sx={{backgroundColor: theme.palette.white, padding: 3, borderRadius: theme.border.radius}}>
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="signups" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip />
            </LineChart>
        </Box>
    )
}

export default AdminSignupsChart;