import { createClient } from '@supabase/supabase-js';

import { CONFIG } from 'src/config-global';

// Use anon key — RLS policies control access per role
const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

// ----------------------------------------------------------------------

export type CertificateData = {
  id: string;
  student_id: string;
  group_id: string;
  pdf_storage_path: string;
  verification_token: string;
  issued_at: string;
  created_at: string;
  profiles: { full_name: string | null; email: string } | null;
  groups: { name: string } | null;
};

// ----------------------------------------------------------------------

/**
 * Fetch a certificate by its public verification token.
 * Used by the public /certificate/[token] page — no auth required.
 */
export async function getCertificateByToken(
  token: string
): Promise<{ data: CertificateData | null; error: string | null }> {
  const { data, error } = await supabase
    .from('certificates')
    .select('*, profiles:student_id(full_name, email), groups:group_id(name)')
    .eq('verification_token', token)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as CertificateData, error: null };
}

// ----------------------------------------------------------------------

/**
 * Fetch all certificates belonging to a student.
 * Used by the student dashboard — requires the student's own auth.uid().
 */
export async function getStudentCertificates(
  studentId: string
): Promise<{ data: CertificateData[]; error: string | null }> {
  const { data, error } = await supabase
    .from('certificates')
    .select('*, profiles:student_id(full_name, email), groups:group_id(name)')
    .eq('student_id', studentId)
    .order('issued_at', { ascending: false });

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: (data ?? []) as CertificateData[], error: null };
}

// ----------------------------------------------------------------------

/**
 * Get the public PDF URL from Supabase Storage.
 * The 'certificates' bucket must be set to public access.
 */
export function getCertificatePdfUrl(storagePath: string): string {
  const { data } = supabase.storage.from('certificates').getPublicUrl(storagePath);
  return data.publicUrl;
}
