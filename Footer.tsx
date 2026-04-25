'use client';
import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#1f7a63] to-[#114a3b] text-white py-20 mt-20 overflow-hidden">
      {/* Subtle Pattern Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")` }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-black tracking-tighter mb-3 mt-4">KeenKeeper</h2>
          <p className="text-sm font-bold text-white leading-relaxed mb-12 max-w-md">
            Nurturing the relationships that define your life. Keep your circle close and your connections meaningful.
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <Twitter size={20} className="text-white/70 group-hover:text-[#1DA1F2] transition-colors" />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <Facebook size={20} className="text-white/70 group-hover:text-[#1877F2] transition-colors" />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <Instagram size={20} className="text-white/70 group-hover:text-[#E4405F] transition-colors" />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <Linkedin size={20} className="text-white/70 group-hover:text-[#0077B5] transition-colors" />
            </a>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-12 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80 flex items-center gap-2">
              Designed with <Heart size={12} className="fill-white text-transparent" /> for meaningful connections
            </p>
            <p className="text-xs font-bold text-white">
              KeenKeeper &copy; 2026. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}