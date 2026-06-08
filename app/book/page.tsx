'use client';

import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { PawPrint, ArrowLeft } from 'lucide-react';

export default function BookPage() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <PawPrint className="w-16 h-16 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to At Home Paw Care</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
            Sign in or create an account to book services for your pet.
          </p>
          
          <SignInButton mode="modal">
            <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-medium text-lg mb-4">
              Sign In / Create Account
            </button>
          </SignInButton>

          <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Signed-in user sees booking interface
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <nav className="border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PawPrint className="w-8 h-8 text-emerald-600" />
            <span className="font-bold text-2xl">At Home Paw Care</span>
          </div>
          <UserButton />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:underline mb-8">
          ← Back to Home
        </Link>
        
        <h1 className="text-5xl font-bold mb-10">Book a Service</h1>
        
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-10 border">
          <p className="text-2xl font-medium mb-8">Service booking flow is ready.</p>
          <p className="text-zinc-600 dark:text-zinc-400">
            You are signed in. Full booking form (select service, pet, date, frequency) coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}