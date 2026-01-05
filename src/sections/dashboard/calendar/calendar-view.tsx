'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Skeleton from '@mui/material/Skeleton';
import { useTheme, styled } from '@mui/material/styles';
import { varAlpha } from 'src/theme/styles';

import { getUserSchedule } from 'src/lib/database';
import { useAuthContext } from 'src/auth/hooks';
import { fDateTime } from 'src/utils/format-time';

import type { CalendarEvent } from 'src/types/schedule';
import type { EventClickArg } from '@fullcalendar/core';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Month', icon: 'mingcute:calendar-month-line' },
  { value: 'timeGridWeek', label: 'Week', icon: 'mingcute:calendar-week-line' },
  { value: 'timeGridDay', label: 'Day', icon: 'mingcute:calendar-day-line' },
  { value: 'listWeek', label: 'Agenda', icon: 'fluent:calendar-agenda-24-regular' },
] as const;

type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

type CalendarToolbarProps = {
  date: string;
  view: CalendarView;
  onToday: () => void;
  onNextDate: () => void;
  onPrevDate: () => void;
  onChangeView: (newView: CalendarView) => void;
};

function CalendarToolbar({
  date,
  view,
  onToday,
  onNextDate,
  onPrevDate,
  onChangeView,
}: CalendarToolbarProps) {
  const popover = usePopover();

  const selectedItem = VIEW_OPTIONS.find((item) => item.value === view) || VIEW_OPTIONS[0];

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2.5, pr: 2, position: 'relative' }}
      >
        <Button
          size="small"
          color="inherit"
          onClick={popover.onOpen}
          startIcon={<Iconify icon={selectedItem.icon} />}
          endIcon={<Iconify icon="eva:arrow-ios-downward-fill" sx={{ ml: -0.5 }} />}
          sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
        >
          {selectedItem.label}
        </Button>

        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={onPrevDate}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>

          <Typography variant="h6">{date}</Typography>

          <IconButton onClick={onNextDate}>
            <Iconify icon="eva:arrow-ios-forward-fill" />
          </IconButton>
        </Stack>

        <Button size="small" color="primary" variant="contained" onClick={onToday}>
          Today
        </Button>
      </Stack>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'top-left' } }}
      >
        <MenuList>
          {VIEW_OPTIONS.map((viewOption) => (
            <MenuItem
              key={viewOption.value}
              selected={viewOption.value === view}
              onClick={() => {
                popover.onClose();
                onChangeView(viewOption.value);
              }}
            >
              <Iconify icon={viewOption.icon} />
              {viewOption.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}

// ----------------------------------------------------------------------

const StyledCalendar = styled('div')(({ theme }) => ({
  width: 'calc(100% + 2px)',
  marginLeft: -1,
  marginBottom: -1,

  '& .fc': {
    '--fc-border-color': varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
    '--fc-now-indicator-color': theme.vars.palette.error.main,
    '--fc-today-bg-color': varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
    '--fc-page-bg-color': theme.vars.palette.background.default,
    '--fc-neutral-bg-color': theme.vars.palette.background.neutral,
    '--fc-list-event-hover-bg-color': theme.vars.palette.action.hover,
    '--fc-highlight-color': theme.vars.palette.action.hover,
  },

  '& .fc .fc-license-message': { display: 'none' },
  '& .fc a': { color: theme.vars.palette.text.primary },

  // Table Head
  '& .fc .fc-col-header ': {
    boxShadow: `inset 0 -1px 0 ${theme.vars.palette.divider}`,
    '& th': { borderColor: 'transparent' },
    '& .fc-col-header-cell-cushion': { ...theme.typography.subtitle2, padding: '13px 0' },
  },

  // List Empty
  '& .fc .fc-list-empty': {
    ...theme.typography.h6,
    backgroundColor: 'transparent',
    color: theme.vars.palette.text.secondary,
  },

  // Event
  '& .fc .fc-event': {
    borderColor: 'transparent !important',
    backgroundColor: 'transparent !important',
  },
  '& .fc .fc-event .fc-event-main': {
    padding: '2px 4px',
    borderRadius: 6,
    backgroundColor: theme.vars.palette.common.white,
    '&::before': {
      top: 0,
      left: 0,
      width: '100%',
      content: "''",
      opacity: 0.24,
      height: '100%',
      borderRadius: 6,
      position: 'absolute',
      backgroundColor: 'currentColor',
      transition: theme.transitions.create(['opacity']),
    },
  },
  '& .fc .fc-event:hover .fc-event-main::before': { opacity: 0.32 },
  '& .fc .fc-event .fc-event-main-frame': {
    fontSize: 13,
    lineHeight: '20px',
    filter: 'brightness(0.48)',
  },
  '& .fc .fc-daygrid-event .fc-event-title': {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  '& .fc .fc-event .fc-event-time': {
    overflow: 'unset',
    fontWeight: theme.typography.fontWeightBold,
  },

  // Month View
  '& .fc .fc-day-other .fc-daygrid-day-top': {
    opacity: 1,
    '& .fc-daygrid-day-number': { color: theme.vars.palette.text.disabled },
  },
  '& .fc .fc-daygrid-day-number': { ...theme.typography.body2, padding: theme.spacing(1, 1, 0) },
  '& .fc .fc-daygrid-event': { marginTop: 4 },
  '& .fc .fc-daygrid-event.fc-event-start, & .fc .fc-daygrid-event.fc-event-end': {
    marginLeft: 4,
    marginRight: 4,
  },

  // Week & Day View
  '& .fc .fc-timegrid-axis-cushion': {
    ...theme.typography.body2,
    color: theme.vars.palette.text.secondary,
  },
  '& .fc .fc-timegrid-slot-label-cushion': { ...theme.typography.body2 },

  // List View
  '& .fc .fc-list-event': {
    ...theme.typography.body2,
    '& .fc-list-event-time': { color: theme.vars.palette.text.secondary },
  },
  '& .fc .fc-list-table': { '& th, td': { borderColor: 'transparent' } },
  '& .fc .fc-list-event-dot': { display: 'none' },
}));

// ----------------------------------------------------------------------

export function CalendarView() {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [view, setView] = useState<CalendarView>('dayGridMonth');
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    fetchSchedule();
  }, [user]);

  const fetchSchedule = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const schedule = await getUserSchedule(user.id);
      setEvents(schedule);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    const event = events.find((e) => e.id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setDialogOpen(true);
    }
  }, [events]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleDateToday = () => {
    setDate(new Date());
  };

  const handleDatePrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView: CalendarView) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  if (loading) {
    return (
      <Card sx={{ p: 3, minHeight: 400 }}>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 2 }} />
        </Stack>
      </Card>
    );
  }

  const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };

  // Format date based on view
  const getFormattedDate = () => {
    if (view === 'dayGridMonth') {
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    }
    
    if (view === 'timeGridDay') {
      return date.toLocaleDateString('en-US', {
        month: 'long', 
        day: 'numeric',
        year: 'numeric' 
      });
    }
    
    if (view === 'timeGridWeek' || view === 'listWeek') {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        const currentView = calendarApi.view;
        const start = new Date(currentView.activeStart);
        const end = new Date(currentView.activeEnd);
        end.setDate(end.getDate() - 1); // Adjust end date
        
        const startMonth = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const endDate = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        return `${startMonth} - ${endDate}`;
      }
    }
    
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formattedDate = getFormattedDate();

  return (
    <>
      <Card sx={{ ...flexProps, minHeight: '50vh' }}>
        <StyledCalendar sx={{ ...flexProps, '.fc.fc-media-screen': { flex: '1 1 auto' } }}>
          <CalendarToolbar
            date={formattedDate}
            view={view}
            onToday={handleDateToday}
            onNextDate={handleDateNext}
            onPrevDate={handleDatePrev}
            onChangeView={handleChangeView}
          />
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            headerToolbar={false}
            initialView="dayGridMonth"
            firstDay={1}
            editable={false}
            selectable={false}
            dayMaxEvents={3}
            eventDisplay="block"
            weekends
            events={events.map((event) => ({
              id: event.id,
              title: event.title,
              start: event.start,
              end: event.end,
              backgroundColor: event.color || theme.palette.primary.main,
              borderColor: event.color || theme.palette.primary.main,
            }))}
            eventClick={handleEventClick}
            height="auto"
            slotMinTime="08:00:00"
            slotMaxTime="22:00:00"
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }}
          />
        </StyledCalendar>
      </Card>

      <Dialog 
        fullWidth
        maxWidth="xs"
        open={dialogOpen} 
        onClose={handleCloseDialog}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: theme.transitions.duration.shortest - 80,
        }}
      >
        {selectedEvent && (
          <>
            <DialogTitle sx={{ pb: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Iconify 
                  icon={selectedEvent.mode === 'online' ? 'mdi:monitor' : 'mdi:map-marker'} 
                  width={24}
                />
                <Typography variant="h6">{selectedEvent.title}</Typography>
              </Stack>
            </DialogTitle>
            
            <DialogContent sx={{ typography: 'body2' }}>
              <Stack spacing={3}>
                {selectedEvent.description && (
                  <Typography variant="body2" color="text.secondary">
                    {selectedEvent.description}
                  </Typography>
                )}

                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="mdi:clock-outline" width={20} />
                    <Typography variant="body2">
                      {fDateTime(selectedEvent.start, 'dddd, DD MMMM YYYY HH:mm')}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="mdi:clock-end" width={20} />
                    <Typography variant="body2">
                      {fDateTime(selectedEvent.end, 'dddd, DD MMMM YYYY HH:mm')}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify 
                      icon={selectedEvent.mode === 'online' ? 'mdi:monitor' : 'mdi:map-marker'} 
                      width={20} 
                    />
                    <Typography variant="body2">
                      {selectedEvent.mode === 'online' ? 'Online' : 'In Person'}
                    </Typography>
                  </Stack>
                </Stack>

                {selectedEvent.meetingLink && (
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="mdi:video" />}
                    href={selectedEvent.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    Join Meeting
                  </Button>
                )}

                {selectedEvent.mode === 'live' && selectedEvent.address && (
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2">Location:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedEvent.address}
                      {selectedEvent.city && `, ${selectedEvent.city}`}
                    </Typography>
                  </Stack>
                )}

                {selectedEvent.instructions && (
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2">Instructions:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedEvent.instructions}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
