// Group schedule types
export type ScheduleMode = 'online' | 'live';

export interface GroupSchedule {
  id: string;
  group_id: string;
  lesson_id: string | null;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  mode: ScheduleMode;
  meeting_link: string | null;
  address: string | null;
  city: string | null;
  instructions: string | null;
  created_at: string;
  updated_at: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  description?: string;
  mode: ScheduleMode;
  meetingLink?: string;
  address?: string;
  city?: string;
  instructions?: string;
  lessonId?: string | null;
}
