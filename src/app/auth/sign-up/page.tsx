import { CONFIG } from 'src/config-global';

import { SupabaseSignUpView } from 'src/auth/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up |  ${CONFIG.appName}` };

export default function Page() {
  return <SupabaseSignUpView />;
}
