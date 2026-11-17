import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Users, Eye, TrendingUp, Share2, Facebook, Video, Globe, PlusCircle, ArrowUpRight, RefreshCw 
} from 'lucide-react';

const weeklyData = [
  { day: 'จันทร์', facebook: 12400, tiktok: 25000, youtube: 8200 },
  { day: 'อังคาร', facebook: 15100, tiktok: 31200, youtube: 9500 },
  { day: 'พุธ', facebook: 14800, tiktok: 28900, youtube: 11000 },
  { day: 'พฤหัสบดี', facebook: 18200, tiktok: 42000, youtube: 14200 },
  { day: 'ศุกร์', facebook: 22100, tiktok: 51000, youtube: 18500 },
  { day: 'เสาร์', facebook: 27500, tiktok: 68000, youtube: 24100 },
  { day: 'อาทิตย์', facebook: 29000, tiktok: 72000, youtube: 26000 },
];

export default function App() {
  const [metrics, setMetrics] = useState({
    facebookFollowers: '124,500',
    tiktokFollowers: '310,200',
    youtubeSubscribers: '85,400',
    totalEngagement: '+18.4%'
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Social Analytics Hub</h1>
              <p className="text-xs text-slate-500">ระบบติดตามและวิเคราะห์สถิติโซเชียลมีเดีย</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => alert('ซิงค์ข้อมูลล่าสุดเรียบร้อย!')}
              className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>รีเฟรชข้อมูล</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">Facebook Followers</span>
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg"><Facebook className="w-5 h-5" /></div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-900">{metrics.facebookFollowers}</h3>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> +5.2%
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">TikTok Followers</span>
              <div className="bg-slate-900 text-white p-2 rounded-lg"><Video className="w-5 h-5" /></div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-900">{metrics.tiktokFollowers}</h3>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> +12.8%
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">YouTube Subscribers</span>
              <div className="bg-red-50 text-red-600 p-2 rounded-lg"><Eye className="w-5 h-5" /></div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-900">{metrics.youtubeSubscribers}</h3>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> +3.1%
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">Total Engagement</span>
              <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg"><Share2 className="w-5 h-5" /></div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-900">{metrics.totalEngagement}</h3>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> เฉลี่ยต่อโพสต์
              </span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">สถิติการเข้าถึงรายวัน (Reach by Platform)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="facebook" name="Facebook" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tiktok" name="TikTok" fill="#0f172a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="youtube" name="YouTube" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">แนวโน้มการเติบโตยอดวิวรวม</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="tiktok" name="TikTok Trends" stroke="#0f172a" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="facebook" name="Facebook Reach" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400">
          Social Media Analytics Dashboard • Built with React & Tailwind CSS
        </div>
      </footer>
    </div>
  );
}