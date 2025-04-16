import React from 'react'
import { Box, Typography, keyframes, styled } from '@mui/material'

// Keyframes for bounce animation
const bounce = keyframes`
  0%   { transform: translateY(0) }
  50%  { transform: translateY(-10px) }
  100% { transform: translateY(0) }
`

// Component styling
const StyledTypography = styled(Typography)(({ fontSize, color }) => ({
  fontWeight: 'bold',
  fontSize,
  color,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  margin: '0.5em',
}))

const StyledBox = styled(Box)(({ delay }) => ({
  display: 'inline-block',
  animation: `${bounce} 1s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}))

// This component animates each character of the given text with a bouncing effect.
export function BouncyText({ text, variant = 'h4', color = '#1976d2', fontSize = '2.5em' }) {
  return (
    <StyledTypography variant={variant} fontSize={fontSize} color={color}>
      {text.split('').map((char, i) => (
        <StyledBox key={i} delay={i * 0.05}>
          {char === ' ' ? '\u00A0' : char}
        </StyledBox>
      ))}
    </StyledTypography>
  )
}