import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Bookings API is ready" });
}

export async function POST(req: Request) {
  return NextResponse.json({ 
    message: "Booking received - Full flow coming soon" 
  });
}