import { SupabaseVerifyView } from 'src/auth/view';
import { authPageMetadata } from 'src/auth/page-metadata';

// ----------------------------------------------------------------------

export function generateMetadata() {
  return authPageMetadata('verify');
}

export default function Page() {
  return <SupabaseVerifyView />;
}
