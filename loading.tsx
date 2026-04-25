'use client';
import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f7f6] flex flex-col items-center justify-center">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-[#1f7a63] animate-spin" />
        <div className="absolute inset-0 blur-xl bg-[#1f7a63]/20 animate-pulse"></div>
      </div>
      <p className="mt-4 text-gray-500 font-medium animate-pulse">
        Fetching your circle...
      </p>
    </div>
  );
}