import { Typography } from "@mui/material"

export default function IconList ({ items }) {
    return (
        <ul>
            {items.map(i => {
                return (
                    <li key={items.indexOf(i)} style={{display: 'flex', alignItems: 'center', gap: 10, color:"white"}}>
                        {i.icon}
                        <Typography variant="h4">{i.label}</Typography>
                    </li>
                )
            })}
        </ul>
    )
}