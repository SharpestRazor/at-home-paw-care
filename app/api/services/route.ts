import { NextResponse } from 'next/server';
import { PrismaServiceRepository } from '@/infrastructure/prisma/repositories';

const serviceRepo = new PrismaServiceRepository();

export async function GET() {
  const services = await serviceRepo.findAll();
  return NextResponse.json(services, {
    headers: { 'Cache-Control': 'public, s-maxage=300' }
  });
}
