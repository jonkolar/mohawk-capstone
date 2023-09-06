import { Typography } from "@mui/material"

export default function IconList ({ items }) {
    console.log(items)
    return (
        <ul>
            {items.map(i => {
                return (
                    <li style={{display: 'flex', alignItems: 'center', gap: 10, color:"white"}}>
                        {i.icon}
                        <Typography variant="h4">{i.label}</Typography>
                    </li>
                )
            })}
        </ul>
    )
}