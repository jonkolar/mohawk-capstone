import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function AliasList( { aliases }) {
  return (
    <Stack direction="row" spacing={1}>
    { aliases.map(alias =>
            <Chip label={alias.game.name + ' : ' + alias.alias} color='primary'/>
        )
    }
    </Stack>
  )
}