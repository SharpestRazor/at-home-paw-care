'use client';

import { SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { PawPrint } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Navbar */}
      <nav className="border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PawPrint className="w-9 h-9 text-emerald-600" />
            <div>
              <span className="font-bold text-2xl tracking-tight">At Home Paw Care</span>
              <p className="text-xs -mt-1 text-emerald-600">Pet Care at Your Doorstep</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <SignInButton mode="modal">
              <button className="text-sm font-medium hover:text-emerald-600">Sign In</button>
            </SignInButton>
            <UserButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-950 rounded-full text-emerald-700 dark:text-emerald-400 text-sm">
            Mobile Pet Services • Bentonville &amp; NW Arkansas
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            Pet Care Delivered to<br />Your Doorstep
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
            Professional grooming, waste removal, and basic health monitoring for busy families, new pet owners, and seniors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* New Primary Button */}
            <Link href="/book" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-lg transition-all">
              Book a Service Now
            </Link>
            
            {/* Changed Button */}
            <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl font-medium text-lg transition-all">
              Services Provided
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { title: "Flexible Scheduling", desc: "Book in minutes. Same-day options available for urgent needs." },
            { title: "Trusted Professionals", desc: "Background-checked providers with pet care expertise." },
            { title: "Senior & New Owner Friendly", desc: "Gentle handling and education for all pet parents." }
          ].map((feature, index) => (
            <div key={index} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-200 transition-colors">
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}