import type { Metadata } from 'next';

// ----------------------------------------------------------------------

// Sign-in and account pages have nothing to rank for; keep them out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return children;
}
