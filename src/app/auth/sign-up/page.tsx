import { SupabaseSignUpView } from 'src/auth/view';
import { authPageMetadata } from 'src/auth/page-metadata';

// ----------------------------------------------------------------------

export function generateMetadata() {
  return authPageMetadata('signUp');
}

export default function Page() {
  return <SupabaseSignUpView />;
}
