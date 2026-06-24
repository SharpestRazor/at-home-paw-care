import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { petType, location, duration, needs } = await request.json();

    await resend.emails.send({
      from: 'At Home Paw Care <quotes@athomepawcare.com>',
      to: process.env.YOUR_EMAIL!,
      subject: 'New Pet Sitting Quote Request',
      html: `
        <h2>New Pet Sitting Quote Request</h2>
        <p><strong>Pet Type:</strong> ${petType}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Duration:</strong> ${duration}</p>
        <p><strong>Specific Needs:</strong> ${needs || 'None provided'}</p>
        <hr>
        <p>Submitted at: ${new Date().toLocaleString()}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}