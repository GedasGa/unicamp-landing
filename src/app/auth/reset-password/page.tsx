import { CONFIG } from 'src/config-global';

import { SupabaseResetPasswordView } from 'src/auth/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Reset password | ${CONFIG.appName}` };

export default function Page() {
  return <SupabaseResetPasswordView />;
}
