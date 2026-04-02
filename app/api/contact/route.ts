import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Simple in-memory rate limiter — max 3 submissions per IP per 10 minutes
const rateMap = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json();
  const { name, phone, email, message } = body;

  if (!name || !phone || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  // Sanitise all inputs before injecting into HTML
  const safeName    = escapeHtml(String(name).slice(0, 100));
  const safePhone   = escapeHtml(String(phone).slice(0, 30));
  const safeEmail   = escapeHtml(String(email).slice(0, 200));
  const safeMessage = escapeHtml(String(message).slice(0, 2000)).replace(/\n/g, '<br/>');

  const { error } = await resend.emails.send({
    from: 'Hive Motors Website <noreply@hivemotorsltd.com>',
    to: 'hivemotorsltd@gmail.com',
    replyTo: safeEmail,
    subject: `New Enquiry from ${safeName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
        <h2 style="color:#0A3E66;margin-bottom:4px">New Contact Form Enquiry</h2>
        <p style="color:#6B7280;font-size:14px;margin-top:0">Submitted via hivemotorsltd.com</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr><td style="padding:8px 0;color:#6B7280;width:100px">Name</td><td style="padding:8px 0;font-weight:600;color:#1A1A2A">${safeName}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280">Phone</td><td style="padding:8px 0;font-weight:600;color:#1A1A2A">${safePhone}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280">Email</td><td style="padding:8px 0;font-weight:600;color:#1A1A2A">${safeEmail}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <p style="color:#6B7280;font-size:13px;margin-bottom:6px">Message</p>
        <p style="color:#1A1A2A;line-height:1.6;margin:0">${safeMessage}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="font-size:12px;color:#6B7280;margin:0">Reply directly to this email to respond to ${safeName}.</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
