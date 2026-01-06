import { CONFIG } from 'src/config-global';

import { SupabaseUpdatePasswordView } from 'src/auth/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Update password | ${CONFIG.appName}` };

export default function Page() {
  return <SupabaseUpdatePasswordView />;
}
