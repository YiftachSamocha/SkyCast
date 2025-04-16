import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Header = styled(AppBar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: 8,
    paddingInline:(15,30),
    flexDirection: "row",
    marginBottom: theme.spacing(3)
}))
export function ForecastHeader({ clearLocation }) {
    return (
        <Box sx={{ flexGrow: 1 }}>

            <Header position="static">
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Button onClick={clearLocation} sx={{backgroundColor: 'inherit'}}><img src='/img/sky-icon.png' height="30px" width="30px" /></Button>
                    <Typography variant="h6" component="div" sx={{fontFamily: '"Comic Sans MS", cursive, sans-serif', flexGrow: 1, cursor: 'default' }}>
                        SkyCast
                    </Typography>
                </div>
                <img src='/img/mona-icon.png' height="30px" width="auto" />

            </Header>
        </Box>
    );
}