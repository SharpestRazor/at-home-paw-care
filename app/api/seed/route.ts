import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Clear existing services first
    await prisma.service.deleteMany();

    const services = [
      {
        name: "Grooming",
        description: "Full grooming service including bath, trim, nails, and ears.",
        basePrice: 45.00,
        durationMin: 60,
      },
      {
        name: "Dog Walk",
        description: "30-minute professional dog walk.",
        basePrice: 20.00,
        durationMin: 30,
      },
      {
        name: "Pet Waste Disposal",
        description: "Weekly or one-time yard waste removal.",
        basePrice: 20.00,
        durationMin: 20,
      },
      {
        name: "Pet Transportation",
        description: "Vet visit or grooming transport.",
        basePrice: 10.00,
        durationMin: 15,
      },
    ];

    await prisma.service.createMany({
      data: services,
    });

    return NextResponse.json({ message: "✅ Services seeded successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to seed services" }, { status: 500 });
  }
}