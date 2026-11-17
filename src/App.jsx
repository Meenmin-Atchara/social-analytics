import React, { useState, useMemo } from 'react';
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
  CheckCircle2
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

const INITIAL_METRICS_HISTORY = [
  { date: 'Mon', facebookFollowers: 12400, tiktokFollowers: 45200, youtubeFollowers: 18900, reach: 34000, engagement: 4.2 },
  { date: 'Tue', facebookFollowers: 12450, tiktokFollowers: 46100, youtubeFollowers: 19000, reach: 41000, engagement: 4.5 },
  { date: 'Wed', facebookFollowers: 12480, tiktokFollowers: 47800, youtubeFollowers: 19050, reach: 52000, engagement: 5.1 },
  { date: 'Thu', facebookFollowers: 12520, tiktokFollowers: 48900, youtubeFollowers: 19120, reach: 48000, engagement: 4.8 },
  { date: 'Fri', facebookFollowers: 12600, tiktokFollowers: 51200, youtubeFollowers: 19250, reach: 67000, engagement: 5.8 },
  { date: 'Sat', facebookFollowers: 12710, tiktokFollowers: 53800, youtubeFollowers: 19400, reach: 78000, engagement: 6.2 },
  { date: 'Sun', facebookFollowers: 12850, tiktokFollowers: 56400, youtubeFollowers: 19550, reach: 85000, engagement: 6.7 }
];

const INITIAL_POSTS = [
  {
    id: 1,
    platform: 'tiktok',
    title: 'Behind the scenes office tour 🚀 #tech #vlog',
    views: '142.5K',
    likes: '18.4K',
    shares: '2.3K',
    comments: '412',
    date: '2026-03-28',
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
    date: '2026-03-25',
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
    date: '2026-03-26',
    status: 'Steady'
  },
  {
    id: 4,
    platform: 'tiktok',
    title: 'Quick tips for social media growth 📈',
    views: '95.1K',
    likes: '12.1K',
    shares: '1.8K',
    comments: '290',
    date: '2026-03-27',
    status: 'Viral'
  }
];

export default function App() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [metricsHistory, setMetricsHistory] = useState(INITIAL_METRICS_HISTORY);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  
  const [formData, setFormData] = useState({
    platform: 'facebook',
    date: new Date().toISOString().split('T')[0],
    followers: '',
    impressions: '',
    likes: '',
    views: '',
    postTitle: ''
  });

  const [notification, setNotification] = useState('');

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const latestData = metricsHistory[metricsHistory.length - 1];
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

  const followerGrowth = (((totalFollowers - prevTotalFollowers) / prevTotalFollowers) * 100).toFixed(1);

  const shareData = useMemo(() => [
    { name: 'TikTok', value: latestData.tiktokFollowers, color: '#00f2fe' },
    { name: 'YouTube', value: latestData.youtubeFollowers, color: '#FF0000' },
    { name: 'Facebook', value: latestData.facebookFollowers, color: '#1877F2' }
  ], [latestData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.followers && !formData.impressions) {
      alert("Please enter at least follower count or impressions.");
      return;
    }

    const newEntry = {
      date: formData.date.slice(5),
      facebookFollowers: formData.platform === 'facebook' ? Number(formData.followers) || latestData.facebookFollowers : latestData.facebookFollowers,
      tiktokFollowers: formData.platform === 'tiktok' ? Number(formData.followers) || latestData.tiktokFollowers : latestData.tiktokFollowers,
      youtubeFollowers: formData.platform === 'youtube' ? Number(formData.followers) || latestData.youtubeFollowers : latestData.youtubeFollowers,
      reach: (Number(formData.impressions) || 45000),
      engagement: 5.5
    };

    setMetricsHistory([...metricsHistory, newEntry]);

    if (formData.postTitle) {
      const newPost = {
        id: Date.now(),
        platform: formData.platform,
        title: formData.postTitle,
        views: formData.views ? `${(Number(formData.views) / 1000).toFixed(1)}K` : '1.2K',
        likes: formData.likes ? `${(Number(formData.likes) / 1000).toFixed(1)}K` : '350',
        shares: '120',
        comments: '45',
        date: formData.date,
        status: 'New'
      };
      setPosts([newPost, ...posts]);
    }

    setIsModalOpen(false);
    triggerNotification(`Metrics logged successfully for ${formData.platform.toUpperCase()}!`);
    setFormData({
      platform: 'facebook',
      date: new Date().toISOString().split('T')[0],
      followers: '',
      impressions: '',
      likes: '',
      views: '',
      postTitle: ''
    });
  };

  const filteredPosts = useMemo(() => {
    if (selectedPlatform === 'all') return posts;
    return posts.filter(p => p.platform === selectedPlatform);
  }, [posts, selectedPlatform]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 md:p-8">
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
            Real-time multi-channel analytics for Facebook, TikTok & YouTube
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-purple-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Update Metrics</span>
          </button>
        </div>
      </header>

      {/* Platform Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6">
        {[
          { id: 'all', label: 'All Channels', icon: Layers, color: 'text-purple-400', bg: 'bg-purple-500/10' },
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Audience</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Users className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-2">{totalFollowers.toLocaleString()}</div>
          <div className="flex items-center text-xs font-medium text-emerald-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+{followerGrowth}%</span>
            <span className="text-slate-500 ml-1.5">vs last week</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Est. Impressions</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Eye className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-2">
            {(latestData.reach * (selectedPlatform === 'all' ? 1 : 0.4)).toLocaleString()}
          </div>
          <div className="flex items-center text-xs font-medium text-emerald-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12.4%</span>
            <span className="text-slate-500 ml-1.5">vs last week</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Engagement Rate</span>
            <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg"><Heart className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-2">{latestData.engagement}%</div>
          <div className="flex items-center text-xs font-medium text-emerald-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+0.5%</span>
            <span className="text-slate-500 ml-1.5">benchmark high</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Video Views</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg"><Video className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-2">361.2K</div>
          <div className="flex items-center text-xs font-medium text-emerald-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+18.9%</span>
            <span className="text-slate-500 ml-1.5">trending up</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Audience Growth Trend</h2>
              <p className="text-xs text-slate-400">Follower dynamics over current period</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">Updated Live</span>
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
            <h2 className="text-lg font-bold text-white mb-1">Channel Distribution</h2>
            <p className="text-xs text-slate-400 mb-4">Follower share by platform</p>
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
              <span className="text-xs text-slate-400">Total</span>
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
                  {((item.value / totalFollowers) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Top Performing Posts</h2>
            <p className="text-xs text-slate-400">High engagement content highlights</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 w-full sm:w-48"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Content Header</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4">Likes</th>
                <th className="py-3 px-4">Shares</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 capitalize">
                    <div className="flex items-center space-x-2">
                      {post.platform === 'facebook' && <Facebook className="w-4 h-4 text-blue-400" />}
                      {post.platform === 'tiktok' && <TikTokIcon className="w-4 h-4 text-cyan-400" />}
                      {post.platform === 'youtube' && <Youtube className="w-4 h-4 text-red-400" />}
                      <span className="text-xs font-medium">{post.platform}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate font-medium text-white">{post.title}</td>
                  <td className="py-3.5 px-4 text-slate-200 font-mono text-xs">{post.views}</td>
                  <td className="py-3.5 px-4 text-slate-200 font-mono text-xs">{post.likes}</td>
                  <td className="py-3.5 px-4 text-slate-200 font-mono text-xs">{post.shares}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-purple-400" />
                <span>Log Daily Social Metrics</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Platform</label>
                <select 
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                >
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Date</label>
                <input 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Total Followers</label>
                  <input 
                    type="number"
                    placeholder="e.g. 52000"
                    value={formData.followers}
                    onChange={(e) => setFormData({...formData, followers: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Impressions/Reach</label>
                  <input 
                    type="number"
                    placeholder="e.g. 15000"
                    value={formData.impressions}
                    onChange={(e) => setFormData({...formData, impressions: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-slate-400">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl">Save Metrics</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}