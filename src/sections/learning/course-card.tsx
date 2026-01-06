'use client';

// =============================================
// Student Course Card Component
// =============================================

import type { FC } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

interface CourseCardProps {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  progress?: number;
  moduleCount?: number;
  onClick?: () => void;
}

export const CourseCard: FC<CourseCardProps> = ({
  title,
  description,
  thumbnailUrl,
  progress = 0,
  moduleCount = 0,
  onClick,
}) => (
  <Card 
    sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      cursor: onClick ? 'pointer' : 'default',
      '&:hover': onClick ? {
        boxShadow: (theme) => theme.shadows[8],
        transform: 'translateY(-4px)',
        transition: 'all 0.3s ease-in-out',
      } : {},
    }}
    onClick={onClick}
  >
    {thumbnailUrl && (
      <CardMedia
        component="img"
        height="160"
        image={thumbnailUrl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
    )}
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      
      {description && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2, 
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
      )}

      <Box sx={{ mt: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {moduleCount} {moduleCount === 1 ? 'Module' : 'Modules'}
          </Typography>
          <Chip 
            label={`${progress}%`} 
            size="small" 
            color={progress === 100 ? 'success' : 'primary'}
            variant="outlined"
          />
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            height: 6, 
            borderRadius: 3,
            bgcolor: 'action.hover',
          }}
        />
      </Box>
    </CardContent>
  </Card>
);
