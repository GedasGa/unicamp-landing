'use server';

import { supabase } from 'src/lib/supabase';

// ----------------------------------------------------------------------

export type SaveSpotResult = {
  success: boolean;
  error?: string;
};

// Stored alongside program applications so the existing email notification fires.
const SAVE_SPOT_COURSE = 'saveSpot';

// ----------------------------------------------------------------------

export async function submitSaveSpot(email: string): Promise<SaveSpotResult> {
  try {
    const { error: insertError } = await supabase.from('program_applications').insert({
      course: SAVE_SPOT_COURSE,
      name: '',
      email,
    });

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return {
        success: false,
        error: 'Failed to save your spot. Please try again.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Save spot error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
