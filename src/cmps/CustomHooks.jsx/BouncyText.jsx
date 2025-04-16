import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';

const bounce = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;


export function BouncyText({ text, variant = 'h4', color = '#1976d2', fontSize = '2.5em' }) {
  return (
    <Typography
      variant={variant}
      sx={{
        fontWeight: 'bold',
        fontSize,
        color,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: "0.5em"
      }}
    >
      {text.split('').map((char, i) => (
        <Box
          key={i}
          component="span"
          sx={{
            display: 'inline-block',
            animation: `${bounce} 1s ease-in-out infinite`,
            animationDelay: `${i * 0.05}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </Box>
      ))}
    </Typography>
  );
}
