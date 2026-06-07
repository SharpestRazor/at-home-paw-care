export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
  // ... other fields
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  // ...
}

export interface Service {
  id: string;
  name: string;
  basePrice: number;
  durationMin: number;
}

export interface Booking {
  id: string;
  customerId: string;
  providerId: string;
  petId: string;
  serviceId: string;
  date: Date;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  totalPrice: number;
  // ...
}