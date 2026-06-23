'use client';

import { useState } from 'react';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { PawPrint, ArrowLeft } from 'lucide-react';

export default function BookPage() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const services = [
    { id: 'cleaning', name: 'Cleaning (Dog Bath)' },
    { id: 'dogwalk', name: 'Dog Walk' },
    { id: 'waste', name: 'Pet Waste Disposal' },
    { id: 'checkin', name: 'Check-In (Feeding & Love)' },
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['Morning (8-11am)', 'Lunch-time (11am-2pm)', 'Afternoon (2-6pm)'];

  const handleFrequencySelect = (serviceId: string, option: string, price: number) => {
    setSelectedService(serviceId);
    setSelectedOption(option);
    setSelectedPrice(price);
    if (['waste', 'checkin'].includes(serviceId)) {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  const createCheckout = async () => {
    if (!selectedTimeSlot) {
      alert("Please select a time slot");
      return;
    }

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: `${selectedOption} - ${selectedService}`,
        price: selectedPrice + 10,
        email: user?.emailAddresses[0]?.emailAddress,
      }),
    });

    const { url } = await response.json();
    if (url) {
      window.location.href = url;
    } else {
      alert("Payment session failed. Please try again.");
    }
  };

  if (!isLoaded) return <div className="p-12 text-center">Loading...</div>;

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <PawPrint className="w-20 h-20 mx-auto text-emerald-600 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Book a Service</h1>
          <SignInButton mode="modal">
            <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-lg font-medium">
              Sign In to Continue
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
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
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-emerald-600">← Back to Home</Link>

        <h1 className="text-5xl font-bold mb-10">Book a Service</h1>

        {/* Step 1: Choose Service */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">What service do you need?</h2>
            <div className="grid gap-4">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s.id); setStep(2); }}
                  className="p-6 text-left border-2 border-zinc-200 hover:border-emerald-600 rounded-3xl transition-all"
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Frequency / Size Selection */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Choose Details</h2>
            
            {selectedService === 'cleaning' && (
              <div className="grid gap-4">
                {[
                  { label: 'Under 30 lbs', price: 35 },
                  { label: '30 - 100 lbs', price: 45 },
                  { label: 'Over 100 lbs', price: 50 }
                ].map((opt) => (
                  <button key={opt.label} onClick={() => handleFrequencySelect('cleaning', opt.label, opt.price)} className="p-6 text-left border rounded-3xl hover:border-emerald-600">
                    {opt.label} — ${opt.price} + $10 visit fee
                  </button>
                ))}
              </div>
            )}

            {(selectedService === 'dogwalk' || selectedService === 'waste' || selectedService === 'checkin') && (
              <div className="grid gap-4">
                {[
                  { label: 'One-Time', price: selectedService === 'checkin' ? 10 : 20 },
                  { label: 'Twice per week', price: selectedService === 'checkin' ? 20 : 35 },
                  { label: 'Daily (5 days/week)', price: selectedService === 'checkin' ? 30 : 50 }
                ].map((opt) => (
                  <button key={opt.label} onClick={() => handleFrequencySelect(selectedService, opt.label, opt.price)} className="p-6 text-left border rounded-3xl hover:border-emerald-600">
                    {opt.label} — ${opt.price} + $10 visit fee
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Day Selection for Waste & Check-In */}
        {step === 3 && (selectedService === 'waste' || selectedService === 'checkin') && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Select Days of the Week</h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    if (selectedDays.includes(day)) {
                      setSelectedDays(selectedDays.filter(d => d !== day));
                    } else {
                      setSelectedDays([...selectedDays, day]);
                    }
                  }}
                  className={`p-4 rounded-2xl border ${selectedDays.includes(day) ? 'bg-emerald-100 border-emerald-600' : 'border-zinc-200'}`}
                >
                  {day}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setStep(4)} 
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-medium" 
              disabled={selectedDays.length === 0}
            >
              Continue to Time Slot
            </button>
          </div>
        )}

        {/* Step 4: Time Slot Selection */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Preferred Time Slot</h2>
            <div className="grid gap-4 mb-8">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`p-6 text-left border-2 rounded-3xl transition-all ${selectedTimeSlot === slot ? 'border-emerald-600 bg-emerald-50' : 'border-zinc-200'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <button 
              onClick={createCheckout} 
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-lg font-medium"
              disabled={!selectedTimeSlot}
            >
              Proceed to Payment — ${(selectedPrice + 10).toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}