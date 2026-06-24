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
  const [selectedDate, setSelectedDate] = useState('');

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
    setStep(3);
  };

  const createCheckout = async () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    if (!selectedTimeSlot) {
      alert("Please select a time slot");
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: `${selectedOption} - ${selectedService}`,
          price: selectedPrice + 10,
          email: user?.emailAddresses[0]?.emailAddress,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment session failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isLoaded) return <div className="p-12 text-center text-black">Loading...</div>;

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <PawPrint className="w-20 h-20 mx-auto text-emerald-600 mb-6" />
          <h1 className="text-4xl font-bold mb-4 text-black">Book a Service</h1>
          <SignInButton mode="modal">
            <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-lg font-medium">
              Sign In to Continue
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-black">
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <PawPrint className="w-8 h-8 text-emerald-600" />
            <span className="font-bold text-2xl text-black">At Home Paw Care</span>
          </Link>
          <UserButton />
        </div>
      </nav>

      <div className="max-w-3xl mx-auto p-6 pt-12 text-black">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-emerald-600 hover:underline">← Back to Home</Link>

        <h1 className="text-5xl font-bold mb-10 text-black">Book a Service</h1>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">What service do you need?</h2>
            <div className="grid gap-4">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s.id); setStep(2); }}
                  style={{ border: '2px solid #10b981', color: '#10b981', backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', width: '100%', textAlign: 'left', fontSize: '1.125rem', fontWeight: '600' }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">Choose Details</h2>
            
            {selectedService === 'cleaning' && (
              <div className="grid gap-4">
                {[
                  { label: 'Under 30 lbs', price: 35 },
                  { label: '30 - 100 lbs', price: 45 },
                  { label: 'Over 100 lbs', price: 50 }
                ].map((opt) => (
                  <button key={opt.label} onClick={() => handleFrequencySelect('cleaning', opt.label, opt.price)} style={{ border: '2px solid #10b981', color: '#10b981', backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', width: '100%', textAlign: 'left', fontSize: '1.125rem', fontWeight: '600' }}>
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
                  <button key={opt.label} onClick={() => handleFrequencySelect(selectedService, opt.label, opt.price)} style={{ border: '2px solid #10b981', color: '#10b981', backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', width: '100%', textAlign: 'left', fontSize: '1.125rem', fontWeight: '600' }}>
                    {opt.label} — ${opt.price} + $10 visit fee
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Time Slot */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">Preferred Time Slot</h2>
            <div className="grid gap-4 mb-8">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  style={{ border: selectedTimeSlot === slot ? '2px solid #10b981' : '2px solid #d1d5db', backgroundColor: selectedTimeSlot === slot ? '#ecfdf5' : 'white', padding: '1.5rem', borderRadius: '1.5rem', width: '100%', textAlign: 'left', fontSize: '1.125rem', fontWeight: '600', color: selectedTimeSlot === slot ? '#10b981' : '#374151' }}
                >
                  {slot}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setStep(4)} 
              style={{ backgroundColor: '#10b981', color: 'white', padding: '1rem', borderRadius: '1.5rem', width: '100%', fontSize: '1.125rem', fontWeight: '600' }}
              disabled={!selectedTimeSlot}
            >
              Continue to Date Selection
            </button>
          </div>
        )}

        {/* Step 4: Calendar */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">Select Preferred Date</h2>
            <input 
              type="date" 
              className="w-full p-4 border-2 border-zinc-400 rounded-2xl text-lg mb-8"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button 
              onClick={() => setStep(5)} 
              style={{ backgroundColor: '#10b981', color: 'white', padding: '1rem', borderRadius: '1.5rem', width: '100%', fontSize: '1.125rem', fontWeight: '600' }}
              disabled={!selectedDate}
            >
              Review & Pay
            </button>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-black">Confirm Your Booking</h2>
            
            <div className="bg-white p-8 rounded-3xl border space-y-6 mb-10">
              <div>
                <p className="text-sm text-zinc-500">Service</p>
                <p className="font-semibold text-black">{serviceNames[selectedService]}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Details</p>
                <p className="font-semibold text-black">{selectedOption}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Time Slot</p>
                <p className="font-semibold text-black">{selectedTimeSlot}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Date</p>
                <p className="font-semibold text-black">{selectedDate}</p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-zinc-500">Total (incl. visit fee)</p>
                <p className="text-3xl font-bold text-emerald-600">${(selectedPrice + 10).toFixed(2)}</p>
              </div>
            </div>

            <button 
              onClick={createCheckout} 
              style={{ backgroundColor: '#10b981', color: 'white', padding: '1rem', borderRadius: '1.5rem', width: '100%', fontSize: '1.125rem', fontWeight: '600' }}
            >
              Confirm & Pay with Stripe
            </button>
          </div>
        )}
      </div>
    </div>
  );
}