'use client';
import React from 'react';
import Navbar from './Navbar';
import { Phone, MessageSquare, Video, Calendar } from 'lucide-react';

interface TimelineEntry {
  id: number;
  type: string;
  title: string;
  date: string;
  description: string;
}

export default function TimelinePage() {
  const [history, setHistory] = React.useState<TimelineEntry[]>([]);

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('keenkeeper_timeline') || '[]');
    setHistory(saved);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Call': return <Phone size={18} className="text-green-600" />;
      case 'Text': return <MessageSquare size={18} className="text-blue-600" />;
      case 'Video': return <Video size={18} className="text-purple-600" />;
      default: return <Calendar size={18} />;
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f6]">
      <Navbar />
      <div className="max-w-4xl mx-auto p-10 animate-in fade-in duration-700">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Timeline</h1>
          <p className="text-gray-500 mt-2">A history of your meaningful connections.</p>
        </header>

        <div className="space-y-4">
          {history.length > 0 ? (
            history.map((entry, index) => (
              <div 
                key={entry.id} 
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-[#1f7a63]/30 transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
                    {getIcon(entry.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{entry.title}</h3>
                    <p className="text-sm text-gray-500">{entry.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{entry.date}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">No interactions logged yet. Start checking in with friends!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}