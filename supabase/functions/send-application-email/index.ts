import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const COURSE_NAMES: Record<string, string> = {
  webDevelopment: 'Web Development',
  productDesign: 'Product Design',
};

interface ApplicationRecord {
  id: string;
  course: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  created_at: string;
}

interface WebhookPayload {
  type: 'INSERT';
  table: string;
  record: ApplicationRecord;
  schema: string;
}

Deno.serve(async (req) => {
  try {
    const payload: WebhookPayload = await req.json();
    const { record } = payload;

    const courseName = COURSE_NAMES[record.course] || record.course;

    const client = new SMTPClient({
      connection: {
        hostname: 'smtp.gmail.com',
        port: 465,
        tls: true,
        auth: {
          username: Deno.env.get('GMAIL_USER')!,
          password: Deno.env.get('GMAIL_APP_PASSWORD')!,
        },
      },
    });

    const messageHtml = record.message ? `<h3>Message:</h3><p>${record.message}</p>` : '';

    const htmlContent = [
      '<h2>New Program Application Received</h2>',
      `<p>A new application has been submitted for the <strong>${courseName}</strong> program.</p>`,
      '<h3>Applicant Details:</h3>',
      '<ul>',
      `<li><strong>Name:</strong> ${record.name}</li>`,
      `<li><strong>Email:</strong> ${record.email}</li>`,
      `<li><strong>Phone:</strong> ${record.phone || 'Not provided'}</li>`,
      `<li><strong>Course:</strong> ${courseName}</li>`,
      '</ul>',
      messageHtml,
      '<hr>',
      '<p style="color:#666;font-size:12px;">This is an automated notification from the Unicamp website.</p>',
    ].join('');

    await client.send({
      from: Deno.env.get('GMAIL_USER')!,
      to: 'info@unicamp.lt',
      subject: `New Program Application: ${courseName}`,
      content: 'auto',
      html: htmlContent,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
