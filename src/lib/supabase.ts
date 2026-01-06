import type { Database } from 'src/types/database.types';

import { createClient } from '@supabase/supabase-js';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const supabaseUrl = CONFIG.supabase.url;
const supabaseKey = CONFIG.supabase.key;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
