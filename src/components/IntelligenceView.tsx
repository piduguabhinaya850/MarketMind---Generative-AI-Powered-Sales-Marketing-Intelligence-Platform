import React, { useState } from 'react';
import { generateMarketAnalysis } from '@/src/services/geminiService';
import { 
  Search, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const IntelligenceView = () => {
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!industry) return;
    setLoading(true);
    setError('');
    try {
      const result = await generateMarketAnalysis(industry);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to generate analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tight">Market Intelligence Engine</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Enter an industry or company name to generate deep market insights, competitor analysis, and actionable strategies using Gemini AI.
        </p>
      </div>

      <div className="flex gap-4 p-2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input 
            type="text" 
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="e.g. Electric Vehicles, SaaS for HR, Fintech in SE Asia..." 
            className="w-full bg-transparent border-none py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-0"
          />
        </div>
        <button 
          onClick={handleAnalyze}
          disabled={loading || !industry}
          className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
          Analyze
        </button>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 space-y-4"
          >
            <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-zinc-400 animate-pulse">Consulting MarketMind AI...</p>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {analysis && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Trends */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BarChart3 className="text-emerald-400 w-6 h-6" />
                Key Market Trends
              </h3>
              <div className="space-y-4">
                {analysis.trends?.map((trend: any, i: number) => (
                  <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-emerald-400">{trend.trend}</h4>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${
                        trend.impact === 'High' ? 'bg-rose-500/20 text-rose-400' : 
                        trend.impact === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {trend.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{trend.description}</p>
                    <div className="pt-3 border-t border-zinc-800 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs font-medium text-zinc-300 italic">
                        Action: {trend.actionableStep}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitors */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="text-emerald-400 w-6 h-6" />
                Competitor Landscape
              </h3>
              <div className="space-y-4">
                {analysis.competitors?.map((comp: any, i: number) => (
                  <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl">
                    <h4 className="font-bold text-zinc-100 mb-4">{comp.name}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase font-bold text-zinc-500">Strengths</p>
                        <ul className="space-y-1">
                          {comp.strengths?.map((s: string, j: number) => (
                            <li key={j} className="text-xs text-emerald-400/80 flex items-center gap-1">
                              <ArrowRight className="w-3 h-3" /> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase font-bold text-zinc-500">Weaknesses</p>
                        <ul className="space-y-1">
                          {comp.weaknesses?.map((w: string, j: number) => (
                            <li key={j} className="text-xs text-rose-400/80 flex items-center gap-1">
                              <ArrowRight className="w-3 h-3" /> {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
