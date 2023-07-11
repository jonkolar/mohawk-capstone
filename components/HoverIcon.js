import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    iconHover: {
        "&:hover": {
            cursor: 'pointer'
        }
    }
})

export default function HoverIcon({ icon, onClick }) {
    const classes = useStyles();

    return (
        <div onClick={onClick} className={classes.iconHover}>
            {icon}
        </div>
    )
}