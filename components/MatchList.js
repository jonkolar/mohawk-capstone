import { Box } from '@mui/material';
import moment from 'moment';
import { forwardRef } from 'react';
import Link from './Link';



const MatchListItem = forwardRef(({ match, onClick, href }, ref) => {
  const date = moment(match.date).format("MMM Do YYYY")

  return (
      <a href={href} onClick={onClick} ref={ref} style={{textDecoration: 'none', color: 'inherit'}}>
          <div>{match.team1.name} vs {match.team2.name}</div>
          <div>{date}</div>
      </a>
  )
})

export default function MatchList( { matches }) {
  return (
    <Box>
        {matches.map(match =>
            <Link useFunctionalComponent={true} href={"/matches/" + match.id}>
                <MatchListItem key={match.id} match={match}/>
            </Link>
        )}
    </Box>
    
  )
}