import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Bookings API coming soon" });
}

export async function POST() {
  return NextResponse.json({ message: "Booking creation coming soon" }, { status: 200 });
}