'use client';

import { useState } from 'react';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { PawPrint, ArrowLeft, Calendar } from 'lucide-react';

const services = [
  { id: 'cleaning', name: 'Cleaning (Dog Bath)', basePrices: { small: 35, medium: 45, large: 50 } },
  { id: 'dogwalk', name: 'Dog Walk', options: ['One-Time', 'Twice per week', 'Daily (5 days/week)'] },
  { id: 'waste', name: 'Pet Waste Disposal', options: ['One-Time', 'Twice per week', 'Daily (5 days/week)'] },
  { id: 'checkin', name: 'Check-In (Feeding & Love)', options: ['One-Time', 'Twice per week', 'Daily (5 days/week)'] },
];

export default function BookPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  if (!isLoaded) return <div className="p-12 text-center">Loading...</div>;

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <PawPrint className="w-20 h-20 mx-auto text-emerald-600 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Book a Service</h1>
          <p className="text-xl mb-8">Please sign in to continue booking</p>
          <SignInButton mode="modal">
            <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-lg font-medium">
              Sign In / Create Account
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <PawPrint className="w-8 h-8 text-emerald-600" />
            <span className="font-bold text-2xl">At Home Paw Care</span>
          </Link>
          <UserButton />
        </div>
      </nav>

      <div className="max-w-3xl mx-auto p-6 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-emerald-600 hover:underline">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-10">Book a Service</h1>

        {/* Step 1: Choose Service */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">What service do you need?</h2>
            <div className="grid gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.id);
                    setStep(2);
                  }}
                  className="p-6 text-left border-2 border-zinc-200 hover:border-emerald-600 rounded-3xl transition-all hover:shadow-md"
                >
                  <span className="text-2xl font-semibold">{service.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Details */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Select Details for {services.find(s => s.id === selectedService)?.name}</h2>
            
            {/* Cleaning Size Selection */}
            {selectedService === 'cleaning' && (
              <div className="space-y-4">
                {['Under 30 lbs - $35', '30-100 lbs - $45', 'Over 100 lbs - $50'].map((option, i) => (
                  <button key={i} onClick={() => { setSelectedOption(option); setStep(3); }} className="w-full p-6 text-left border rounded-3xl hover:border-emerald-600">
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Other Services Frequency Selection */}
            {(selectedService === 'dogwalk' || selectedService === 'waste' || selectedService === 'checkin') && (
              <div className="space-y-4">
                {services.find(s => s.id === selectedService)?.options?.map((option, i) => (
                  <button key={i} onClick={() => { setSelectedOption(option); setStep(3); }} className="w-full p-6 text-left border rounded-3xl hover:border-emerald-600">
                    {option}
                  </button>
                ))}
              </div>
            )}

            <button onClick={() => setStep(1)} className="mt-8 text-emerald-600">← Back</button>
          </div>
        )}

        {/* Step 3: Date Selection (Simplified for MVP) */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">When do you need the service?</h2>
            <input 
              type="date" 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-4 border rounded-2xl text-lg"
            />
            <div className="mt-8 flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 py-4 border rounded-2xl">Back</button>
              <button onClick={() => alert('Booking submitted! (Demo)')} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-medium">
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}