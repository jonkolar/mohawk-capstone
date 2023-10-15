import { Box, Typography } from "@mui/material"

export default function BoxLabelIconTopper ({ icon, label="", color="white" }) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1, color: color, ml: 2}}>
            {icon}
            <Typography>{label}</Typography>
        </Box>
    )
}