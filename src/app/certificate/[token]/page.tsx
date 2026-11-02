import type { Metadata } from 'next';

import { getCertificatePdfUrl, getCertificateByToken } from 'src/actions/certificate';

import { CertificateVerifyView } from 'src/sections/certificate/certificate-verify-view';

// ----------------------------------------------------------------------

type Props = {
  params: { token: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await getCertificateByToken(params.token);

  if (!data) {
    return {
      title: 'Certificate Not Found | Unicamp',
    };
  }

  const studentName = data.profiles?.full_name ?? 'A Student';
  const programName = data.groups?.name ?? 'a Unicamp Program';
  const title = `${studentName} – Certificate of Completion | Unicamp`;
  const description = `${studentName} has successfully completed ${programName} at Unicamp IT Academy.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://unicamp.lt/certificate/${params.token}`,
      type: 'website',
      siteName: 'Unicamp IT Academy',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ----------------------------------------------------------------------

export default async function CertificateVerifyPage({ params }: Props) {
  const { data, error } = await getCertificateByToken(params.token);

  const pdfUrl = data ? getCertificatePdfUrl(data.pdf_storage_path) : null;

  return (
    <CertificateVerifyView
      certificate={data}
      pdfUrl={pdfUrl}
      token={params.token}
      error={error}
    />
  );
}
