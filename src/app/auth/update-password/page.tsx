import { authPageMetadata } from 'src/auth/page-metadata';
import { SupabaseUpdatePasswordView } from 'src/auth/view';

// ----------------------------------------------------------------------

export function generateMetadata() {
  return authPageMetadata('updatePassword');
}

export default function Page() {
  return <SupabaseUpdatePasswordView />;
}
