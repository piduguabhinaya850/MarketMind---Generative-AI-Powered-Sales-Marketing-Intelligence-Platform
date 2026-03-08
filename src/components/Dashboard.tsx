import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  Target, 
  Zap,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-zinc-800 rounded-lg">
        <Icon className="w-5 h-5 text-emerald-400" />
      </div>
      <div className={cn(
        "flex items-center text-xs font-medium px-2 py-1 rounded-full",
        trend === 'up' ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
      )}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
        {change}
      </div>
    </div>
    <p className="text-zinc-400 text-sm mb-1">{title}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
  </motion.div>
);

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence Overview</h1>
          <p className="text-zinc-400 mt-1">Real-time market insights and performance metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            Generate Insights
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Market Sentiment" value="Positive (82%)" change="+12%" icon={Globe} trend="up" />
        <StatCard title="Active Leads" value="1,284" change="+5.4%" icon={Users} trend="up" />
        <StatCard title="Conversion Rate" value="3.2%" change="-0.8%" icon={Target} trend="down" />
        <StatCard title="AI Efficiency" value="94.2%" change="+2.1%" icon={Zap} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6">Market Growth Projection</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6">Top Competitors</h3>
          <div className="space-y-6">
            {[
              { name: 'TechFlow Inc.', share: 34, color: 'bg-emerald-500' },
              { name: 'DataNexus', share: 28, color: 'bg-blue-500' },
              { name: 'CloudScale', share: 15, color: 'bg-purple-500' },
              { name: 'OptiMarket', share: 12, color: 'bg-amber-500' },
            ].map((comp) => (
              <div key={comp.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-300">{comp.name}</span>
                  <span className="text-zinc-500">{comp.share}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${comp.share}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-full rounded-full", comp.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
