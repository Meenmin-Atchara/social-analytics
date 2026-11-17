import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Eye, 
  Heart, 
  Video, 
  TrendingUp, 
  PlusCircle, 
  Share2, 
  Sparkles, 
  Layers,
  Facebook,
  Youtube,
  Search,
  CheckCircle2,
  ExternalLink,
  Link2,
  Trash2,
  RefreshCw,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';

const TikTokIcon = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" fill="none" />
  </svg>
);

const DEFAULT_ACCOUNTS = {
  facebook: 'https://facebook.com',
  tiktok: 'https://tiktok.com',
  youtube: 'https://youtube.com'
};

const DEFAULT_METRICS_HISTORY = [
  { date: '11/11', facebookFollowers: 12400, tiktokFollowers: 45200, youtubeFollowers: 18900, reach: 34000, engagement: 4.2 },
  { date: '11/12', facebookFollowers: 12450, tiktokFollowers: 46100, youtubeFollowers: 19000, reach: 41000, engagement: 4.5 },
  { date: '11/13', facebookFollowers: 12480, tiktokFollowers: 47800, youtubeFollowers: 19050, reach: 52000, engagement: 5.1 },
  { date: '11/14', facebookFollowers: 12520, tiktokFollowers: 48900, youtubeFollowers: 19120, reach: 48000, engagement: 4.8 },
  { date: '11/15', facebookFollowers: 12600, tiktokFollowers: 51200, youtubeFollowers: 19250, reach: 67000, engagement: 5.8 },
  { date: '11/16', facebookFollowers: 12710, tiktokFollowers: 53800, youtubeFollowers: 19400, reach: 78000, engagement: 6.2 },
  { date: '11/17', facebookFollowers: 12850, tiktokFollowers: 56400, youtubeFollowers: 19550, reach: 85000, engagement: 6.7 }
];

const DEFAULT_POSTS = [
  {
    id: 1,
    platform: 'tiktok',
    title: 'Behind the scenes office tour 🚀 #tech #vlog',
    views: '142.5K',
    likes: '18.4K',
    shares: '2.3K',
    comments: '412',
    date: '2026-11-15',
    url: 'https://tiktok.com',
    status: 'Viral'
  },
  {
    id: 2,
    platform: 'youtube',
    title: 'Full Tutorial: Building Modern Web Apps in 2026',
    views: '88.2K',
    likes: '7.9K',
    shares: '1.1K',
    comments: '850',
    date: '2026-11-14',
    url: 'https://youtube.com',
    status: 'High Growth'
  },
  {
    id: 3,
    platform: 'facebook',
    title: 'New Product Line Announcement Live Event!',
    views: '35.4K',
    likes: '3.2K',
    shares: '890',
    comments: '620',
    date: '2026-11-12',
    url: 'https://facebook.com',
    status: 'Steady'
  }
];

export default function App() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  
  // LocalStorage state persistence
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('sph_accounts');
    return saved ? JSON.parse(saved) : DEFAULT_ACCOUNTS;
  });

  const [metricsHistory, setMetricsHistory] = useState(() => {
    const saved = localStorage.getItem('sph_metrics');
    return saved ? JSON.parse(saved) : DEFAULT_METRICS_HISTORY;
  });

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('sph_posts');
    return saved ? JSON.parse(saved) : DEFAULT_POSTS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    platform: 'facebook',
    date: new Date().toISOString().split('T')[0],
    followers: '',
    impressions: '',
    likes: '',
    views: '',
    postTitle: '',
    postUrl: ''
  });

  const [notification, setNotification] = useState('');

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('sph_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('sph_metrics', JSON.stringify(metricsHistory));
  }, [metricsHistory]);

  useEffect(() => {
    localStorage.setItem('sph_posts', JSON.stringify(posts));
  }, [posts]);

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const latestData = metricsHistory[metricsHistory.length - 1] || DEFAULT_METRICS_HISTORY[0];
  const previousData = metricsHistory[metricsHistory.length - 2] || latestData;

  const totalFollowers = useMemo(() => {
    if (selectedPlatform === 'facebook') return latestData.facebookFollowers;
    if (selectedPlatform === 'tiktok') return latestData.tiktokFollowers;
    if (selectedPlatform === 'youtube') return latestData.youtubeFollowers;
    return latestData.facebookFollowers + latestData.tiktokFollowers + latestData.youtubeFollowers;
  }, [selectedPlatform, latestData]);

  const prevTotalFollowers = useMemo(() => {
    if (selectedPlatform === 'facebook') return previousData.facebookFollowers;
    if (selectedPlatform === 'tiktok') return previousData.tiktokFollowers;
    if (selectedPlatform === 'youtube') return previousData.youtubeFollowers;
    return previousData.facebookFollowers + previousData.tiktokFollowers + previousData.youtubeFollowers;
  }, [selectedPlatform, previousData]);

  const followerGrowth = prevTotalFollowers > 0 
    ? (((totalFollowers - prevTotalFollowers) / prevTotalFollowers) * 100).toFixed(1)
    : '0.0';

  const shareData = useMemo(() => [
    { name: 'TikTok', value: latestData.tiktokFollowers, color: '#00f2fe' },
    { name: 'YouTube', value: latestData.youtubeFollowers, color: '#FF0000' },
    { name: 'Facebook', value: latestData.facebookFollowers, color: '#1877F2' }
  ], [latestData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.followers && !formData.impressions) {
      alert("กรุณากรอกจำนวนผู้ติดตาม หรือยอดการเข้าถึง (Reach/Impressions)");
      return;
    }

    const dateLabel = formData.date.slice(5).replace('-', '/');
    const newEntry = {
      date: dateLabel,
      facebookFollowers: formData.platform === 'facebook' ? Number(formData.followers) || latestData.facebookFollowers : latestData.facebookFollowers,
      tiktokFollowers: formData.platform === 'tiktok' ? Number(formData.followers) || latestData.tiktokFollowers : latestData.tiktokFollowers,
      youtubeFollowers: formData.platform === 'youtube' ? Number(formData.followers) || latestData.youtubeFollowers : latestData.youtubeFollowers,
      reach: Number(formData.impressions) || latestData.reach,
      engagement: 5.2
    };

    setMetricsHistory(prev => [...prev, newEntry]);

    if (formData.postTitle) {
      const newPost = {
        id: Date.now(),
        platform: formData.platform,
        title: formData.postTitle,
        views: formData.views ? (Number(formData.views) >= 1000 ? `${(Number(formData.views) / 1000).toFixed(1)}K` : formData.views) : '-',
        likes: formData.likes ? (Number(formData.likes) >= 1000 ? `${(Number(formData.likes) / 1000).toFixed(1)}K` : formData.likes) : '-',
        shares: '-',
        comments: '-',
        date: formData.date,
        url: formData.postUrl || accounts[formData.platform] || '#',
        status: 'New'
      };
      setPosts(prev => [newPost, ...prev]);
    }

    setIsModalOpen(false);
    triggerNotification(`บันทึกสถิติของ ${formData.platform.toUpperCase()} เรียบร้อยแล้ว!`);
    setFormData({
      platform: 'facebook',
      date: new Date().toISOString().split('T')[0],
      followers: '',
      impressions: '',
      likes: '',
      views: '',
      postTitle: '',
      postUrl: ''
    });
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchesPlatform = selectedPlatform === 'all' || p.platform === selectedPlatform;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPlatform && matchesSearch;
    });
  }, [posts, selectedPlatform, searchQuery]);

  const deletePost = (id) => {
    if (confirm("คุณต้องการลบโพสต์นี้ออกจากรายการหรือไม่?")) {
      setPosts(prev => prev.filter(p => p.id !== id));
      triggerNotification("ลบรายการเรียบร้อยแล้ว");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 md:p-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Social Pulse Hub
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            ระบบติดตามและรวมสถิติการเข้าถึงโซเชียลมีเดีย (Facebook, TikTok, YouTube)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium px-4 py-2.5 rounded-xl transition-all"
          >
            <Link2 className="w-4 h-4 text-purple-400" />
            <span>ตั้งค่าลิงก์ช่องทาง</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-purple-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>บันทึกสถิติประจำวัน</span>
          </button>
        </div>
      </header>

      {/* Platform Filter Tabs & Direct Profile Links */}
      <div className="flex items-center justify-between overflow-x-auto pb-4 mb-6 border-b border-slate-800/50">
        <div className="flex items-center space-x-2">
          {[
            { id: 'all', label: 'รวมทุกช่องทาง', icon: Layers, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { id: 'tiktok', label: 'TikTok', icon: TikTokIcon, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
            { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-400', bg: 'bg-red-500/10' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedPlatform === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedPlatform(tab.id)}
                className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all border whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800 border-slate-700 text-white shadow-md'
                    : 'bg-slate-900/50 border-slate-800/60 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <span className={`p-1 rounded-md ${tab.bg} ${tab.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* External links to main accounts */}
        <div className="hidden sm:flex items-center space-x-3 text-xs">
          <span className="text-slate-500">ไปที่หน้าจริง:</span>
          {accounts.facebook && (
            <a href={accounts.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-blue-400 hover:underline">
              <span>FB Page</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {accounts.tiktok && (
            <a href={accounts.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-cyan-400 hover:underline">
              <span>TikTok Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {accounts.youtube && (
            <a href={accounts.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-red-400 hover:underline">
              <span>YouTube Channel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">ผู้ติดตามรวม (Followers)</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Users className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-2">{totalFollowers.toLocaleString()}</div>
          <div className="flex items-center text-xs font-medium text-emerald-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>{followerGrowth}%</span>
            <span className="text-slate-500 ml-1.5">เติบโตจากรอบก่อน</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">การเข้าถึงรวม (Est. Reach)</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Eye className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-2">
            {(latestData.reach * (selectedPlatform === 'all' ? 1 : 0.4)).toLocaleString()}
          </div>
          <div className="flex items-center text-xs font-medium text-emerald-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12.4%</span>
            <span className="text-slate-500 ml-1.5">vs สัปดาห์ก่อน</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">อัตราการมีส่วนร่วม (Engagement Rate)</span>
            <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg"><Heart className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-2">{latestData.engagement}%</div>
          <div className="flex items-center text-xs font-medium text-emerald-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>เกณฑ์มาตรฐานดีเยี่ยม</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">ยอดวิววิดีโอรวม (Video Views)</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg"><Video className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-2">361.2K</div>
          <div className="flex items-center text-xs font-medium text-emerald-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>กำลังเป็นกระแส</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">แนวโน้มการเติบโตของผู้ติดตาม</h2>
              <p className="text-xs text-slate-400">กราฟแสดงการเปลี่ยนแปลงรายวันตามข้อมูลที่บันทึกไว้</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">อัปเดตอัตโนมัติ</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metricsHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="facebookGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1877F2" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1877F2" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="tiktokGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25F4EE" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#25F4EE" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="youtubeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF0000" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }} />
                {(selectedPlatform === 'all' || selectedPlatform === 'facebook') && (
                  <Area type="monotone" dataKey="facebookFollowers" name="Facebook" stroke="#1877F2" strokeWidth={2.5} fillOpacity={1} fill="url(#facebookGrad)" />
                )}
                {(selectedPlatform === 'all' || selectedPlatform === 'tiktok') && (
                  <Area type="monotone" dataKey="tiktokFollowers" name="TikTok" stroke="#25F4EE" strokeWidth={2.5} fillOpacity={1} fill="url(#tiktokGrad)" />
                )}
                {(selectedPlatform === 'all' || selectedPlatform === 'youtube') && (
                  <Area type="monotone" dataKey="youtubeFollowers" name="YouTube" stroke="#FF0000" strokeWidth={2.5} fillOpacity={1} fill="url(#youtubeGrad)" />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">สัดส่วนผู้ติดตามแต่ละแพลตฟอร์ม</h2>
            <p className="text-xs text-slate-400 mb-4">Channel Distribution</p>
          </div>
          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={shareData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                  {shareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400">ผู้ติดตามรวม</span>
              <span className="text-lg font-bold text-white">{(totalFollowers / 1000).toFixed(1)}k</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-slate-800/80 pt-4 mt-2">
            {shareData.map((item) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center space-x-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-xs text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="text-xs text-slate-400 block font-semibold">
                  {totalFollowers > 0 ? ((item.value / totalFollowers) * 100).toFixed(0) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Posts Table */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">รายการคอนเทนต์ & ลิงก์โพสต์</h2>
            <p className="text-xs text-slate-400">คลิกที่ชื่อโพสต์หรือปุ่มเปิดเพื่อข้ามไปยังคอนเทนต์จริง</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อโพสต์..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 w-full sm:w-56"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">แพลตฟอร์ม</th>
                <th className="py-3 px-4">หัวข้อคอนเทนต์ / ลิงก์</th>
                <th className="py-3 px-4">ยอดวิว</th>
                <th className="py-3 px-4">ยอดไลก์</th>
                <th className="py-3 px-4">วันที่บันทึก</th>
                <th className="py-3 px-4">สถานะ</th>
                <th className="py-3 px-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 capitalize">
                      <div className="flex items-center space-x-2">
                        {post.platform === 'facebook' && <Facebook className="w-4 h-4 text-blue-400" />}
                        {post.platform === 'tiktok' && <TikTokIcon className="w-4 h-4 text-cyan-400" />}
                        {post.platform === 'youtube' && <Youtube className="w-4 h-4 text-red-400" />}
                        <span className="text-xs font-medium">{post.platform}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate font-medium text-white">
                      {post.url && post.url !== '#' ? (
                        <a 
                          href={post.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:text-purple-400 underline decoration-purple-500/40 flex items-center space-x-1.5"
                        >
                          <span className="truncate">{post.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                        </a>
                      ) : (
                        <span>{post.title}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-200 font-mono text-xs">{post.views}</td>
                    <td className="py-3.5 px-4 text-slate-200 font-mono text-xs">{post.likes}</td>
                    <td className="py-3.5 px-4 text-slate-400 text-xs">{post.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        post.status === 'Viral' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={() => deletePost(post.id)} 
                        className="text-slate-500 hover:text-red-400 p-1 rounded-lg transition-colors"
                        title="ลบรายการ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-500 text-xs">
                    ไม่พบข้อมูลคอนเทนต์
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Update Daily Metrics & Post Link */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-purple-400" />
                <span>บันทึกสถิติโซเชียลประจำวัน</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">แพลตฟอร์ม</label>
                <select 
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">วันที่บันทึกสถิติ</label>
                <input 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">ผู้ติดตามทั้งหมด</label>
                  <input 
                    type="number"
                    placeholder="เช่น 12850"
                    value={formData.followers}
                    onChange={(e) => setFormData({...formData, followers: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">ยอดเข้าถึง (Reach)</label>
                  <input 
                    type="number"
                    placeholder="เช่น 35000"
                    value={formData.impressions}
                    onChange={(e) => setFormData({...formData, impressions: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Optional Section for Specific Post Details */}
              <div className="border-t border-slate-800 pt-4">
                <span className="text-xs text-purple-400 font-semibold uppercase block mb-3 flex items-center space-x-1">
                  <Link2 className="w-3.5 h-3.5" />
                  <span>บันทึกโพสต์ดีเด่น / ลิงก์คอนเทนต์ (ตัวเลือกเสริม)</span>
                </span>
                
                <input 
                  type="text"
                  placeholder="ชื่อโพสต์ หรือ แคปชันคอนเทนต์"
                  value={formData.postTitle}
                  onChange={(e) => setFormData({...formData, postTitle: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 mb-3"
                />

                <input 
                  type="url"
                  placeholder="URL ลิงก์โพสต์ (เช่น https://facebook.com/posts/123)"
                  value={formData.postUrl}
                  onChange={(e) => setFormData({...formData, postUrl: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 mb-3"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="number"
                    placeholder="ยอดวิว (Views)"
                    value={formData.views}
                    onChange={(e) => setFormData({...formData, views: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  <input 
                    type="number"
                    placeholder="ยอดไลก์ (Likes)"
                    value={formData.likes}
                    onChange={(e) => setFormData({...formData, likes: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl shadow-lg shadow-purple-900/30"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Manage Channel Profile Links */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Link2 className="w-5 h-5 text-purple-400" />
                <span>ตั้งค่าลิงก์ช่องทางโซเชียลมีเดีย</span>
              </h3>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Facebook Page URL</label>
                <input 
                  type="url"
                  value={accounts.facebook}
                  onChange={(e) => setAccounts({...accounts, facebook: e.target.value})}
                  placeholder="https://facebook.com/yourpage"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">TikTok Profile URL</label>
                <input 
                  type="url"
                  value={accounts.tiktok}
                  onChange={(e) => setAccounts({...accounts, tiktok: e.target.value})}
                  placeholder="https://tiktok.com/@username"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">YouTube Channel URL</label>
                <input 
                  type="url"
                  value={accounts.youtube}
                  onChange={(e) => setAccounts({...accounts, youtube: e.target.value})}
                  placeholder="https://youtube.com/@channelname"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button 
                  onClick={() => {
                    setIsSettingsOpen(false);
                    triggerNotification("บันทึกลิงก์ช่องทางเรียบร้อยแล้ว!");
                  }}
                  className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl shadow-lg shadow-purple-900/30"
                >
                  บันทึกลิงก์
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}