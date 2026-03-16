import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, phone, email, message } = await request.json();

  if (!name || !phone || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Hive Motors Website <noreply@hivemotorsltd.com>',
    to: 'hivemotorsltd@gmail.com',
    replyTo: email,
    subject: `New Enquiry from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
        <h2 style="color:#0A3E66;margin-bottom:4px">New Contact Form Enquiry</h2>
        <p style="color:#6B7280;font-size:14px;margin-top:0">Submitted via hivemotorsltd.com</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr><td style="padding:8px 0;color:#6B7280;width:100px">Name</td><td style="padding:8px 0;font-weight:600;color:#1A1A2A">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280">Phone</td><td style="padding:8px 0;font-weight:600;color:#1A1A2A">${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280">Email</td><td style="padding:8px 0;font-weight:600;color:#1A1A2A">${email}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <p style="color:#6B7280;font-size:13px;margin-bottom:6px">Message</p>
        <p style="color:#1A1A2A;line-height:1.6;margin:0">${message.replace(/\n/g, '<br/>')}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="font-size:12px;color:#6B7280;margin:0">Reply directly to this email to respond to ${name}.</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
