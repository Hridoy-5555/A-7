'use client';
import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import friendsData from '../friends.json';
import { Users, AlertCircle, CheckCircle2, Clock, BarChart3, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function StatsPage() {
  const [friends] = React.useState(friendsData);
  const [interactions, setInteractions] = React.useState<{name: string, value: number}[]>([]);

  React.useEffect(() => {
    const history = JSON.parse(localStorage.getItem('keenkeeper_timeline') || '[]');
    const data = [
      { name: 'Call', value: history.filter((h: any) => h.type === 'Call').length },
      { name: 'Text', value: history.filter((h: any) => h.type === 'Text').length },
      { name: 'Video', value: history.filter((h: any) => h.type === 'Video').length },
    ];
    setInteractions(data);
  }, []);

  const stats = {
    total: friends.length,
    overdue: friends.filter(f => f.status === 'overdue').length,
    onTrack: friends.filter(f => f.status === 'on-track').length,
    almostDue: friends.filter(f => f.status === 'almost due').length,
  };

  const getPercentage = (count: number) => {
    return stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
  };

  const totalInteractions = interactions.reduce((sum, item) => sum + item.value, 0);
  const COLORS = ['#10b981', '#3b82f6', '#a855f7'];

  return (
    <main className="min-h-screen bg-[#f5f7f6] pb-20">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-10 animate-in fade-in duration-700">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Social Insights</h1>
          <p className="text-gray-900 mt-2 font-bold italic">Measuring the quality of your connections.</p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="text-blue-600" size={24} />
            </div>
            <div className="text-3xl font-black text-gray-900">{stats.total}</div>
            <div className="text-xs font-black text-gray-800 uppercase tracking-widest mt-1">Total Circle</div>
          </div>

          <div className="group bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="text-emerald-600" size={24} />
            </div>
            <div className="text-3xl font-black text-gray-900">{stats.onTrack}</div>
            <div className="text-xs font-black text-gray-800 uppercase tracking-widest mt-1">On Track</div>
          </div>

          <div className="group bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="text-amber-600" size={24} />
            </div>
            <div className="text-3xl font-black text-gray-900">{stats.almostDue}</div>
            <div className="text-xs font-black text-gray-800 uppercase tracking-widest mt-1">Almost Due</div>
          </div>

          <div className="group bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <div className="text-3xl font-black text-gray-900">{stats.overdue}</div>
            <div className="text-xs font-black text-gray-800 uppercase tracking-widest mt-1">Overdue</div>
          </div>
        </div>

        {/* Visual Charts Section */}
        <div className="flex justify-center mb-12">
          {/* Challenge C1: Pie Chart Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-[450px] w-full max-w-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Friendship Analytics</h3>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  className="fill-gray-900"
                >
                  <tspan x="50%" dy="-0.2em" fontSize="32" fontWeight="900">{totalInteractions}</tspan>
                  <tspan x="50%" dy="1.5em" fontSize="12" fontWeight="700" fill="#6b7280" className="uppercase tracking-widest">Total Logs</tspan>
                </text>
                <Pie data={interactions} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {interactions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProgressItem({ label, percent, color }: { label: string, percent: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-3 px-1">
        <span className="font-bold text-gray-700 text-sm uppercase tracking-wider">{label}</span>
        <span className="font-black text-gray-900 text-lg">{percent}%</span>
      </div>
      <div className="h-6 bg-gray-50 rounded-2xl p-1 border border-gray-100">
        <div 
          className={`h-full ${color} rounded-xl transition-all duration-1000 ease-out shadow-sm`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}