import { Box } from '@mui/material';
import moment from 'moment';
import * as React from 'react';

export default function MatchList( { matches }) {
  const MatchListItem = ({ match }) => {
    const date = moment(match.date).format("MMM Do YYYY")

    return (
        <div>
            <div>{match.team1.name} vs {match.team2.name}</div>
            <div>{date}</div>
        </div>
  )}

 

  return (
    <Box>
        {matches.map(match =>
            <>
                <MatchListItem key={match.id} match={match}/>
                <br/>
            </>
        )}
    </Box>
    
  )
}