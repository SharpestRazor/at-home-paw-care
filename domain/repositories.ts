import type { Booking, Service, User, Pet } from './entities';

export interface ServiceRepository {
  findAll(): Promise<Service[]>;
  findById(id: string): Promise<Service | null>;
  // ...
}

export interface BookingRepository {
  create(data: any): Promise<Booking>;
  findByUser(userId: string): Promise<Booking[]>;
  // ...
}

export interface UserRepository {
  findByClerkId(clerkId: string): Promise<User | null>;
  createOrUpdateFromClerk(data: any): Promise<User>;
}