# Clean Architecture for Paw Care at Home

## Layers

1. **Domain** (core business logic, independent)
   - Entities (User, Pet, Booking, Service)
   - Repository Interfaces
   - Value Objects, Domain Events (future)

2. **Application** (use cases, orchestrates domain)
   - Services (BookingService, etc.)
   - DTOs, Input/Output models

3. **Infrastructure** (external concerns: DB, Clerk, Stripe)
   - Prisma Repositories implementation
   - Adapters for Clerk/Stripe
   - Config

4. **Presentation** (UI, API handlers)
   - Next.js App Router pages/components
   - API Routes (thin controllers calling Application layer)

## Benefits
- Testable (mock repositories)
- Maintainable (concerns separated)
- Scalable (easy to swap DB or add features)
- Independent of frameworks

Business rules stay in Domain/Application.