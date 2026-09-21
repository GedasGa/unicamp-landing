import { authPageMetadata } from 'src/auth/page-metadata';
import { SupabaseResetPasswordView } from 'src/auth/view';

// ----------------------------------------------------------------------

export function generateMetadata() {
  return authPageMetadata('resetPassword');
}

export default function Page() {
  return <SupabaseResetPasswordView />;
}
