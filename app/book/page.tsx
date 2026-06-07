'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function BookPage() {
  const { isSignedIn } = useUser();
  const [selectedService, setSelectedService] = useState<string>('');

  if (!isSignedIn) {
    return <div className="p-8 text-center">Please sign in to book a service.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Book a Pet Service</h1>
      
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border">
        <h2 className="text-2xl font-semibold mb-6">Available Services</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { id: "grooming", name: "Grooming", price: "$45+" },
            { id: "dogwalk", name: "Dog Walk", price: "$20" },
            { id: "waste", name: "Pet Waste Disposal", price: "$20" },
            { id: "transport", name: "Pet Transportation", price: "$10" },
          ].map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`p-6 border-2 rounded-2xl cursor-pointer hover:border-emerald-600 transition-all ${
                selectedService === service.id ? 'border-emerald-600 bg-emerald-50' : ''
              }`}
            >
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="text-2xl font-bold text-emerald-600 mt-2">{service.price}</p>
              <p className="text-sm text-zinc-500 mt-4">Mobile service at your home</p>
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="mt-10 p-6 bg-emerald-50 dark:bg-emerald-950 rounded-2xl">
            <p className="text-lg">✅ Service selected. Full booking form (date, pet, frequency) coming in next update.</p>
            <button className="mt-6 px-8 py-4 bg-emerald-600 text-white rounded-xl font-medium">
              Continue to Schedule
            </button>
          </div>
        )}
      </div>
    </div>
  );
}