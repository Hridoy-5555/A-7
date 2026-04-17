'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from './Navbar';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f5f7f6]">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-32 px-10 text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Page not found</h2>
        <p className="text-gray-500 mt-2 max-w-md">
          Oops! The friend or page you are looking for doesn't exist or has moved.
        </p>
        <Link href="/" className="mt-8 px-6 py-3 bg-[#1f7a63] text-white font-semibold rounded-xl hover:bg-[#165a49] transition-colors">
          Back to Home
        </Link>
      </div>
    </main>
  );
}