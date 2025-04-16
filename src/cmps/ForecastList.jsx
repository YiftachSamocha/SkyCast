import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import locations from '../data/locations.json'
import { Typography } from '@mui/material';


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
    height: '14em',
    width: '14em',
    overflow: 'hidden'
}))

export function ForecastList({ currLoc, setCurrLoc }) {
    return (
        <Box sx={{ flexGrow: 1, paddingInline: "30px", paddingBlock: "10px", width: '100%' }}>
            <Grid container spacing={5} justifyContent="space-between" alignItems="center" >
                {locations.map((location) => (

                    <Grid item xs={12} sm={6} md={4} lg={3} key={location.id}
                    >
                        <Item onClick={() => setCurrLoc(location)}
                            sx={{
                                backgroundColor: currLoc && location._id === currLoc._id ? '#90caf9' : '#fff',
                            }}>
                            <Typography variant="contained" component="h3" sx={{ fontWeight: 'bold', color: '#000006' }}>
                                {location.city}
                            </Typography>
                            <Typography variant="contained" component="h4" sx={{ color: 'text.secondary' }}>
                                {location.country}
                            </Typography>
                            <img src={location.img} width="100%" style={{ height: '100px', width: '200px' }} />
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
