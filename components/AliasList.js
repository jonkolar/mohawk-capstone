import * as React from 'react';
import { useSession } from 'next-auth/react';

import { userDeleteAliasCall } from '@/utils/api/user-api';
import HoverIcon from './HoverIcon';

import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AliasList( { aliases }) {
 const { data: session } = useSession();

 const onDeleteAliasHandler = async (aliasId) => {
   await userDeleteAliasCall(aliasId)
    .then(data => {
      if (data.success)
        location.reload();
    })
 }

  return (
    <Stack direction="row" spacing={1}>
    { aliases.map(alias =>
            <Box key={alias.id} sx={{display: 'flex', alignItems: 'center'}}>
              <Chip label={alias.game.name + ' : ' + alias.alias} color='primary' />
              { session && session.user.id == alias.userId && <HoverIcon icon={<DeleteIcon color='error'/>} onClick={() => onDeleteAliasHandler(alias.id)}/> }
            </Box>
        )
    }
    </Stack>
  )
}