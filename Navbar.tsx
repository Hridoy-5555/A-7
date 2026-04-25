'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, BarChart3 } from 'lucide-react'; 
import { cn } from './utils';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Timeline', href: '/timeline', icon: Clock }, 
    { name: 'Stats', href: '/stats', icon: BarChart3 },
  ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center">
        <h2 className="text-2xl font-black tracking-tighter text-[#1f7a63]">KeenKeeper</h2>
      </div>
      
      <div className="flex gap-6">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-bold text-sm",
                isActive 
                  ? "text-[#1f7a63] bg-[#1f7a63]/10" 
                  : "text-black hover:text-[#1f7a63] hover:bg-gray-50 font-black"
              )}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}