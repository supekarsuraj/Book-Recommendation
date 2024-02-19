import React from 'react';
import { Box, Typography } from '@mui/material';

const PageNotFound = () => {
    return (
        <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        >
        <Typography variant="h1" component="h1" gutterBottom>
            404 Not Found
        </Typography>
        <Typography variant="h5" component="p" align="center" gutterBottom>
            Oops! The page you're looking for does not exist.
        </Typography>
        <a href='/'>Home</a>
        </Box>
    );
};

export default PageNotFound;
