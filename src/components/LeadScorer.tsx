import React from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Star,
  Mail,
  Phone,
  Building2,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const leads = [
  { id: 1, name: 'Sarah Jenkins', company: 'Global Logistics', role: 'CTO', score: 94, status: 'Hot', trend: 'up' },
  { id: 2, name: 'Michael Chen', company: 'Nexus Health', role: 'Product Lead', score: 82, status: 'Warm', trend: 'up' },
  { id: 3, name: 'Emma Watson', company: 'Green Energy Co', role: 'Marketing VP', score: 45, status: 'Cold', trend: 'down' },
  { id: 4, name: 'Robert Fox', company: 'Cloud Nine', role: 'CEO', score: 88, status: 'Hot', trend: 'up' },
  { id: 5, name: 'Linda Miller', company: 'Retail Hub', role: 'Operations', score: 67, status: 'Warm', trend: 'down' },
];

export const LeadScorer = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Lead Scorer</h1>
          <p className="text-zinc-400 mt-1">Predictive lead scoring based on engagement and intent data.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors">
          <UserPlus className="w-4 h-4" />
          Import Leads
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/80">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Lead</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Company</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">AI Score</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {leads.map((lead) => (
              <motion.tr 
                key={lead.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-zinc-800/30 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-emerald-400">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-100">{lead.name}</p>
                      <p className="text-xs text-zinc-500">{lead.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">{lead.company}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 w-24 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${lead.score}%` }}
                        className={cn(
                          "h-full rounded-full",
                          lead.score > 80 ? "bg-emerald-500" : lead.score > 50 ? "bg-amber-500" : "bg-zinc-600"
                        )}
                      />
                    </div>
                    <span className={cn(
                      "text-sm font-bold",
                      lead.score > 80 ? "text-emerald-400" : lead.score > 50 ? "text-amber-400" : "text-zinc-500"
                    )}>
                      {lead.score}
                    </span>
                    {lead.trend === 'up' ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingDown className="w-3 h-3 text-rose-500" />}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                    lead.status === 'Hot' ? "bg-rose-500/20 text-rose-400" : 
                    lead.status === 'Warm' ? "bg-amber-500/20 text-amber-400" : 
                    "bg-zinc-800 text-zinc-500"
                  )}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-emerald-400 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-emerald-400 transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
