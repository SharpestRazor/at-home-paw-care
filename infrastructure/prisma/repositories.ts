import { prisma } from '@/lib/prisma';
import type { ServiceRepository, BookingRepository } from '@/domain/repositories';
import type { Service, Booking } from '@/domain/entities';

export class PrismaServiceRepository implements ServiceRepository {
  async findAll() {
    const services = await prisma.service.findMany({
      select: { id: true, name: true, basePrice: true, durationMin: true }
    });
    return services as Service[];
  }

  async findById(id: string) {
    return prisma.service.findUnique({ where: { id } });
  }
}

export class PrismaBookingRepository implements BookingRepository {
  async create(data: any) {
    return prisma.booking.create({ data });
  }

  async findByUser(userId: string) {
    return prisma.booking.findMany({ where: { customerId: userId } });
  }
}