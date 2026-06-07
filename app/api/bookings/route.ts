import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { BookingService } from '@/application/services/booking.service';
import { PrismaBookingRepository, PrismaServiceRepository } from '@/infrastructure/prisma/repositories';

const bookingService = new BookingService(
  new PrismaBookingRepository(),
  new PrismaServiceRepository()
);

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const booking = await bookingService.createBooking({ ...body, customerId: userId });
    return NextResponse.json(booking);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid request' }, { status: 400 });
  }
}
