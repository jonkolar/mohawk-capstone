import { Box, Typography } from '@mui/material';
import moment from 'moment';
import { forwardRef } from 'react';
import Link from './Link';

import { useTheme } from '@mui/material/styles';

const MatchListItem = forwardRef(({ match, onClick, href }, ref) => {
  const date = moment(match.date).format("MMM Do YYYY")
  return (
      <a href={href} onClick={onClick} ref={ref} style={{textDecoration: 'none', color: 'inherit'}}>
          <div>{match.team1.name} vs {match.team2.name}</div>
          <div>{date}</div>
      </a>
  )
})
MatchListItem.displayName = "MatchListItem";

export default function MatchList( { matches }) {
  const theme = useTheme();

  return (
    <Box sx={{color: theme.palette.white}}>
        {matches.length <= 0 && <Typography>No matches...</Typography>}
        {matches.map(match =>
            <Link key={match.id} useFunctionalComponent={true} href={"/matches/" + match.id}>
                <MatchListItem match={match}/>
            </Link>
        )}
    </Box>
  )
}