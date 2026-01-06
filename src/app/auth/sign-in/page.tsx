import { CONFIG } from 'src/config-global';

import { SupabaseSignInView } from 'src/auth/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | ${CONFIG.appName}` };

export default function Page() {
  return <SupabaseSignInView />;
}
