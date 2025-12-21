'use client';

// =============================================
// Module List Component
// =============================================

import type { FC } from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';

import { Iconify } from 'src/components/iconify';

interface Lesson {
  id: string;
  title: string;
  description?: string;
  progress?: number;
  completed?: boolean;
  locked?: boolean;
}

interface Module {
  id: string;
  title: string;
  description?: string;
  progress?: number;
  lessons: Lesson[];
  locked?: boolean;
}

interface ModuleListProps {
  modules: Module[];
  onLessonClick?: (moduleId: string, lessonId: string) => void;
}

export const ModuleList: FC<ModuleListProps> = ({ modules, onLessonClick }) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(modules.filter(m => !m.locked).map(m => m.id))
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  return (
    <List sx={{ width: '100%' }}>
      {modules.map((module, index) => {
        const isExpanded = expandedModules.has(module.id);
        const isLocked = module.locked;
        
        return (
          <Card key={module.id} sx={{ mb: 2 }}>
            <ListItem
              disablePadding
              secondaryAction={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {isLocked ? (
                    <Chip label="Locked" size="small" icon={<Iconify icon="eva:lock-fill" />} />
                  ) : (
                    <Chip 
                      label={`${module.progress || 0}%`} 
                      size="small" 
                      color={module.progress === 100 ? 'success' : 'primary'}
                      variant="outlined"
                    />
                  )}
                  <IconButton
                    edge="end"
                    onClick={() => !isLocked && toggleModule(module.id)}
                    disabled={isLocked}
                  >
                    <Iconify 
                      icon={isExpanded ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} 
                    />
                  </IconButton>
                </Box>
              }
            >
              <ListItemButton 
                onClick={() => !isLocked && toggleModule(module.id)}
                disabled={isLocked}
              >
                <ListItemIcon>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: isLocked ? 'action.disabledBackground' : 'primary.main',
                      color: 'common.white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    {index + 1}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ color: isLocked ? 'text.disabled' : 'text.primary' }}>
                      {module.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      {module.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {module.description}
                        </Typography>
                      )}
                      {!isLocked && (
                        <LinearProgress 
                          variant="determinate" 
                          value={module.progress || 0} 
                          sx={{ 
                            height: 4, 
                            borderRadius: 2,
                            bgcolor: 'action.hover',
                            mt: 0.5,
                          }}
                        />
                      )}
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>

            <Collapse in={isExpanded && !isLocked} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {module.lessons.map((lesson, lessonIndex) => {
                  const isLessonLocked = lesson.locked;
                  
                  return (
                    <ListItemButton
                      key={lesson.id}
                      sx={{ pl: 9 }}
                      disabled={isLessonLocked}
                      onClick={() => !isLessonLocked && onLessonClick?.(module.id, lesson.id)}
                    >
                      <ListItemIcon>
                        <Iconify 
                          icon={
                            lesson.completed 
                              ? 'eva:checkmark-circle-2-fill' 
                              : isLessonLocked
                              ? 'eva:lock-fill'
                              : 'eva:radio-button-off-outline'
                          }
                          color={
                            lesson.completed 
                              ? 'success.main' 
                              : isLessonLocked
                              ? 'text.disabled'
                              : 'text.secondary'
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography 
                            variant="body1" 
                            sx={{ color: isLessonLocked ? 'text.disabled' : 'text.primary' }}
                          >
                            {lessonIndex + 1}. {lesson.title}
                          </Typography>
                        }
                        secondary={lesson.description}
                      />
                      {!isLessonLocked && lesson.progress !== undefined && (
                        <Chip 
                          label={`${lesson.progress}%`} 
                          size="small" 
                          variant="outlined"
                          color={lesson.completed ? 'success' : 'default'}
                        />
                      )}
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </Card>
        );
      })}
    </List>
  );
};
