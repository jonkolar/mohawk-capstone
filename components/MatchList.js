import { Box, Typography } from '@mui/material';
import moment from 'moment';
import { forwardRef } from 'react';
import Link from './Link';

import { useTheme } from '@mui/material/styles';

const MatchListItem = forwardRef(({ match, onClick, href }, ref) => {
  const date = moment(match.date).format("MMM Do YYYY")
  return (
      <a href={href} onClick={onClick} ref={ref} style={{textDecoration: 'none', color: 'inherit'}}>
          <Typography fontSize={18}>{match.team1.name} vs {match.team2.name}</Typography>
          <Typography fontSize={12}>{date}</Typography>
      </a>
  )
})
MatchListItem.displayName = "MatchListItem";

export default function MatchList( { matches }) {
  const theme = useTheme();

  return (
    <Box sx={{color: theme.palette.white, display: 'flex', flexDirection: 'column', gap: 1}}>
        {matches.length <= 0 && <Typography>No matches...</Typography>}
        {matches.map(match =>
            <Link key={match.id} useFunctionalComponent={true} href={"/matches/" + match.id}>
                <MatchListItem match={match}/>
            </Link>
        )}
    </Box>
  )
}