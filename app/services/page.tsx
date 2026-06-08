'use client';

import { PawPrint } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <nav className="border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <PawPrint className="w-8 h-8 text-emerald-600" />
            <span className="font-bold text-2xl">At Home Paw Care</span>
          </Link>
          <Link href="/book" className="text-emerald-600 font-medium">Book a Service</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">All services include a $10 Visit Fee</p>
        </div>

        <div className="space-y-12">
          {/* Cleaning */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">Cleaning (Dog Bath)</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">Under 30 lbs</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$35</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee (One-time)</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">30 - 100 lbs</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$45</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee (One-time)</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">Over 100 lbs</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$50</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee (One-time)</p>
              </div>
            </div>
          </div>

          {/* Dog Walk */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">Dog Walk</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">One-Time</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$20</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">Twice per Week</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$35/week</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee per visit</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">Daily (5 days/week)</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$50/week</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee per visit</p>
              </div>
            </div>
          </div>

          {/* Waste Disposal */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">Pet Waste Disposal</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">One-Time</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$20</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">Twice per Week</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$35/week</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee per visit</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">Daily (5 days/week)</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$50/week</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee per visit</p>
              </div>
            </div>
          </div>

          {/* Check-In */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">Check-In (Feeding, Petting & Love)</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">One-Time</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$10</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">Twice per Week</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$20/week</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee per visit</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border">
                <h3 className="font-semibold text-lg">Daily (5 days/week)</h3>
                <p className="text-4xl font-bold text-emerald-600 mt-3">$30/week</p>
                <p className="text-sm text-zinc-500">+ $10 visit fee per visit</p>
              </div>
            </div>
          </div>

          {/* Pet Sitting */}
          <div className="bg-white dark:bg-zinc-900 p-10 rounded-3xl border text-center">
            <h2 className="text-3xl font-semibold mb-4">Pet Sitting (In-Home or Approved Sitter)</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Custom quote based on pet type, location, duration, and specific needs.
            </p>
            <Link href="/book" className="inline-block mt-8 px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-medium">
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link href="/book" className="inline-block px-12 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-semibold text-lg">
            Book a Service Now
          </Link>
        </div>
      </div>
    </div>
  );
}