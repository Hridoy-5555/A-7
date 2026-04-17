'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../Navbar';
import friends from '../../../friends.json';
import { cn } from '../../../utils';
import { Mail, Bell, Archive, Trash2, Phone, MessageSquare, Video, Target, Edit2, Calendar, Clock } from 'lucide-react';

export default function FriendDetailPage() {
  const { id } = useParams();
  const friend = friends.find((f) => f.id === Number(id));

  // State to manage local timeline entries for this friend
  const [timeline, setTimeline] = React.useState([
    { id: 1, type: 'Call', title: `Call with ${friend?.name}`, date: '2 days ago', description: 'Catch up call' }
  ]);
  const [toast, setToast] = React.useState<string | null>(null);

  const handleCheckIn = (type: string) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const newEntry = {
      id: Date.now(),
      type,
      title: `${type} with ${friend?.name}`,
      date: formattedDate,
      description: `Quick ${type.toLowerCase()} check-in`
    };
    setTimeline(prev => [newEntry, ...prev]);
    
    // Save to localStorage so the Timeline Page can see it
    const existing = JSON.parse(localStorage.getItem('keenkeeper_timeline') || '[]');
    localStorage.setItem('keenkeeper_timeline', JSON.stringify([newEntry, ...existing]));

    setToast(`${type} logged for ${friend?.name}!`);
    setTimeout(() => setToast(null), 3000);
  };

  if (!friend) {
    return (
      <main className="min-h-screen bg-[#f5f7f6]">
        <Navbar />
        <div className="p-10 text-center">Friend not found</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7f6]">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column — Friend Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-32 h-32 rounded-2xl object-cover mb-4 border-4 border-gray-50"
              />
              
              <h1 className="text-2xl font-bold text-gray-800">{friend.name}</h1>
              
              <div className="flex items-center gap-2 mt-2 mb-4">
                <span className={cn(
                  "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded",
                  friend.status === 'on-track' && "bg-green-100 text-green-700",
                  friend.status === 'almost due' && "bg-amber-100 text-amber-700",
                  friend.status === 'overdue' && "bg-red-100 text-red-700"
                )}>
                  {friend.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {friend.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-tight">Bio</h4>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">{friend.bio}</p>
                </div>
                
                <div className="flex items-center gap-2 text-gray-500">
                  <Mail size={16} />
                  <span className="text-sm">{friend.email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Bell size={16} /> Snooze 2 Weeks
                </button>
                <button className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Archive size={16} /> Archive
                </button>
                <button className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-red-50 border border-red-100 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>

          {/* Right Column — 3 sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* ① Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Clock size={20} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800">{friend.days_since_contact}</div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Days Since Contact</div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Target size={20} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800">{friend.goal}</div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Goal (Days)</div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                    <Calendar size={20} />
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-800">{friend.next_due_date}</div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Next Due Date</div>
              </div>
            </div>

            {/* ② Relationship Goal Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Relationship Goal</h3>
                <p className="text-sm text-gray-500 mt-1">You aim to reach out to {friend.name} every {friend.goal} days.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Edit2 size={16} /> Edit
              </button>
            </div>

            {/* ③ Quick Check-In Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Check-In</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button onClick={() => handleCheckIn('Call')} className="flex flex-col items-center gap-2 p-4 border border-gray-50 rounded-xl hover:bg-green-50 hover:border-green-100 group transition-all">
                  <div className="p-3 bg-gray-50 rounded-full text-gray-600 group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                    <Phone size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">Call</span>
                </button>
                <button onClick={() => handleCheckIn('Text')} className="flex flex-col items-center gap-2 p-4 border border-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-100 group transition-all">
                  <div className="p-3 bg-gray-50 rounded-full text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    <MessageSquare size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Text</span>
                </button>
                <button onClick={() => handleCheckIn('Video')} className="flex flex-col items-center gap-2 p-4 border border-gray-50 rounded-xl hover:bg-purple-50 hover:border-purple-100 group transition-all">
                  <div className="p-3 bg-gray-50 rounded-full text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                    <Video size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Video</span>
                </button>
              </div>
            </div>

            {/* Section 6: Timeline List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Timeline</h3>
              <div className="space-y-4">
                {timeline.map(entry => (
                  <div key={entry.id} className="flex items-center gap-4 p-3 border-b border-gray-50 last:border-0">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                      {entry.type === 'Call' && <Phone size={16} />}
                      {entry.type === 'Text' && <MessageSquare size={16} />}
                      {entry.type === 'Video' && <Video size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{entry.title}</p>
                      <p className="text-xs text-gray-500">{entry.date} • {entry.description}</p>
                    </div>
                  </div>
                ))}
                {timeline.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No interactions logged yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl z-[100] transition-all">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </main>
  );
}