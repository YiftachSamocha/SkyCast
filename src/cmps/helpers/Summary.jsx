import { Box, Typography } from "@mui/material"
import MuiTooltip from "@mui/material/Tooltip"
import { styled } from "@mui/material"

// Component styling
const StyledBox = styled(Box)({
    backgroundColor: '#f9f9f9',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    minWidth: '150px',
})

// This component displays a tooltip with a summary of weather data when active.
// It shows the day, temperature, and a brief summary inside a styled box.
export function Summary({ active, payload }) {
    if (active && payload && payload.length) {
        const data = payload[0].payload
        return (
            <MuiTooltip>
                <StyledBox>
                    <Typography variant="subtitle1">{`${data.day}, ${data.temp}°C`}</Typography>
                    <Typography variant="body2">{data.summary}</Typography>
                </StyledBox>
            </MuiTooltip>
        )
    }
    return null
}