import type { BookingRepository, ServiceRepository } from '@/domain/repositories';
import type { Booking } from '@/domain/entities';
import { z } from 'zod';

const createBookingSchema = z.object({
  customerId: z.string(),
  providerId: z.string(),
  petId: z.string(),
  serviceId: z.string(),
  date: z.string().datetime(),
  notes: z.string().optional(),
});

export class BookingService {
  constructor(
    private bookingRepo: BookingRepository,
    private serviceRepo: ServiceRepository
  ) {}

  async createBooking(data: unknown): Promise<Booking> {
    const validated = createBookingSchema.parse(data);
    
    // Business logic: price calc, availability check (stub)
    const service = await this.serviceRepo.findById(validated.serviceId);
    if (!service) throw new Error('Service not found');

    const totalPrice = Number(service.basePrice) * 1.1; // dynamic pricing example

    return this.bookingRepo.create({
      ...validated,
      date: new Date(validated.date),
      totalPrice,
      status: 'PENDING',
    });
  }
}