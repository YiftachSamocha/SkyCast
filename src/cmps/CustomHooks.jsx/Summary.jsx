import { Box, Typography } from "@mui/material";
import MuiTooltip from "@mui/material/Tooltip";

export function Summary({ active, payload }) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <MuiTooltip>
                <Box sx={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    minWidth: '150px',
                }}>
                    <Typography variant="subtitle1">{`${data.day}, ${data.temp}°C`}</Typography>
                    <Typography variant="body2">{data.summary}</Typography>
                </Box>
            </MuiTooltip>
        )
    }
    return null
}