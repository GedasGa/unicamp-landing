import { SupabaseSignInView } from 'src/auth/view';
import { authPageMetadata } from 'src/auth/page-metadata';

// ----------------------------------------------------------------------

export function generateMetadata() {
  return authPageMetadata('signIn');
}

export default function Page() {
  return <SupabaseSignInView />;
}
