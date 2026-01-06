import { CONFIG } from 'src/config-global';

import { SupabaseVerifyView } from 'src/auth/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Verify | ${CONFIG.appName}` };

export default function Page() {
  return <SupabaseVerifyView />;
}
