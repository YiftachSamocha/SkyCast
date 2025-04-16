import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import locations from '../data/locations.json'
import { Typography } from '@mui/material'

// This component renders a list of locations.
// Each location is displayed as a clickable card.
// When clicked, it updates the `currLoc` state with the selected location.
// The selected location is highlighted with a different background color.
export function ForecastList({ currLoc, setCurrLoc, isSmallScreen }) {
    
    // Component styling
    const Item = styled(Paper)({
        paddingTop: '16px',
        paddingInline:0,
        textAlign: 'center',
        color: '#6b6b6b',
        borderRadius: '15px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.3s', 
        '&:hover': {
            transform: 'scale(1.02)', 
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: isSmallScreen ? '7em' : '14em', 
        width: isSmallScreen ? '6.25' : '12.5', 
        overflow: 'hidden',
    })

    return (
        <Box sx={{ flexGrow: 1, paddingInline: '30px', paddingBlock: '5px', width: '100%' }}>
            {/* Grid container for arranging location cards */}
            <Grid container spacing={5} justifyContent="space-between" alignItems="center">
                {locations.map((location) => (
                    <Grid item key={location.id}>
                        <Item
                            onClick={() => setCurrLoc(location)} 
                            sx={{
                                backgroundColor: currLoc && location.id === currLoc.id ? '#90caf9' : '#fff', 
                                // Highlights the selected location
                            }}
                        >
                            {/* Displays the city name */}
                            <Typography
                                variant="contained"
                                component="h3"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#000006',
                                    fontSize: isSmallScreen ? '1em' : '1.5em',
                                }}
                            >
                                {location.city}
                            </Typography>

                            {/* Displays the country name */}
                            <Typography
                                variant="contained"
                                component="h4"
                                sx={{
                                    color: '#6b6b6b',
                                    fontSize: isSmallScreen ? '0.7em' : '1em',
                                }}
                            >
                                {location.country}
                            </Typography>

                            {/* Displays the location image */}
                            <img
                                src={location.img}
                                width="100%"
                                style={{
                                    height: isSmallScreen ? '50px' : '100px',
                                    width: isSmallScreen ? '100px' : '200px',
                                }}
                            />
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}