export const ROLES = {
  CUSTOMER: 'CUSTOMER',
  PROVIDER: 'PROVIDER',
  ADMIN: 'ADMIN',
} as const;

export const BOOKING_STATUSES = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
export type BookingStatus = typeof BOOKING_STATUSES[keyof typeof BOOKING_STATUSES];
