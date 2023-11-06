import React from 'react';

import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/styles';

const PageNotFound = ({label="Page doesn't exist"}) => {
  const theme = useTheme();

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 5}}>
        <Typography variant='h3' color={theme.palette.white}>{label}</Typography>
    </Box>
  );
};

export default PageNotFound;