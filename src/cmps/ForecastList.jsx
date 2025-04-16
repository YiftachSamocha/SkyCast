import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import locations from '../data/locations.json'
import { Typography } from '@mui/material';




export function ForecastList({ currLoc, setCurrLoc, isSmallScreen }) {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        paddingTop: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: theme.spacing(1),
        boxShadow: theme.shadows[3],
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
            transform: 'scale(1.02)',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: isSmallScreen ? '7em' : '14em',
        width: isSmallScreen ? '7em' : '14em',
        overflow: 'hidden',

    }))
    return (
        <Box sx={{ flexGrow: 1, paddingInline: "30px", paddingBlock: "5px", width: '100%' }}>
            <Grid container spacing={5} justifyContent="space-between" alignItems="center" >
                {locations.map((location) => (

                    <Grid item key={location.id}
                    >
                        <Item onClick={() => setCurrLoc(location)}
                            sx={{
                                backgroundColor: currLoc && location.id === currLoc.id ? '#90caf9' : '#fff',
                            }}>
                            <Typography variant="contained" component="h3"
                                sx={{ fontWeight: 'bold', color: '#000006', fontSize: isSmallScreen ? "1em" : "1.5em" }}>
                                {location.city}
                            </Typography>
                            <Typography variant="contained" component="h4"
                                sx={{ color: 'text.secondary', fontSize: isSmallScreen ? "0.7em" : "1em" }}>
                                {location.country}
                            </Typography>
                            <img src={location.img} width="100%"
                                style={{ height: isSmallScreen ? '50px' : '100px', width: isSmallScreen ? '100px' : '200px' }} />
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
