import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// Component styling
const Header = styled(AppBar)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: 8,
    paddingRight: "35px",
    paddingLeft: "15px",
    flexDirection: "row",
    marginBottom: "20px"
}))

// This component serves as the header for the application.
// It displays the app's logo, title, and the currently selected location (if any).
// - The `clearLocation` function is triggered when the logo button is clicked, resetting the selected location (`currLoc`).
export function ForecastHeader({ currLoc, clearLocation }) {
    return (
        <Box>
            <Header position="static">
                {/* Left section: Logo button and app title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Button onClick={clearLocation} sx={{ backgroundColor: 'inherit' }}>
                        <img src='/img/sky-icon.png' height="30px" width="30px" />
                    </Button>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontFamily: '"Comic Sans MS", cursive, sans-serif',
                            flexGrow: 1,
                            cursor: 'default'
                        }}
                    >
                        SkyCast
                    </Typography>
                </div>

                {/* Center section: Display the current location if available */}
                {currLoc && <Typography variant="h6">{currLoc.city}</Typography>}

                {/* Right section: Mona's logo */}
                <img src='/img/mona-icon.png' height="30px" width="auto" />
            </Header>
        </Box>
    )
}