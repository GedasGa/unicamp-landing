'use server';

import { supabase } from 'src/lib/supabase';

// ----------------------------------------------------------------------

export type ProgramApplicationData = {
  course: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

export type ProgramApplicationResult = {
  success: boolean;
  error?: string;
};

// ----------------------------------------------------------------------

export async function submitProgramApplication(
  data: ProgramApplicationData
): Promise<ProgramApplicationResult> {
  try {
    // Insert the application into Supabase
    // Email notification is triggered automatically via database trigger + Edge Function
    const { error: insertError } = await supabase.from('program_applications').insert({
      course: data.course,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message || null,
    });

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return {
        success: false,
        error: 'Failed to submit application. Please try again.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Program application error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
