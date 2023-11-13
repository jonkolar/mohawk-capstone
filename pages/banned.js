import React from 'react';

import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/styles';

const BannedPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 5}}>
        <Typography variant='h3' color={theme.palette.white}>{"Your account is banned."}</Typography>
    </Box>
  );
};

export default BannedPage;