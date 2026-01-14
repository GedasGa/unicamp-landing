'use client';

import { useDocumentTitle } from 'src/hooks/use-document-title';

import { DashboardView } from 'src/sections/dashboard/view';

// ----------------------------------------------------------------------

export default function Page() {
  useDocumentTitle('Dashboard');

  return <DashboardView />;
}
