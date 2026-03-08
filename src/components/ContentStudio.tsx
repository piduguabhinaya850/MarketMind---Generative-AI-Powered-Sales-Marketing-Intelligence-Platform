import React, { useState } from 'react';
import { generateMarketingContent } from '@/src/services/geminiService';
import { 
  PenTool, 
  Loader2, 
  Copy, 
  Check, 
  Sparkles,
  Instagram,
  Linkedin,
  Twitter,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const ContentStudio = () => {
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!product || !audience) return;
    setLoading(true);
    try {
      const result = await generateMarketingContent(product, audience, platform);
      setContent(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-2xl">
          <PenTool className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Content Studio</h2>
          <p className="text-zinc-400">Generate high-converting marketing copy in seconds.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Product/Service</label>
            <input 
              type="text" 
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g. MarketMind AI"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Target Audience</label>
            <input 
              type="text" 
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Marketing Managers"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Platform</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'LinkedIn', icon: Linkedin },
                { name: 'Instagram', icon: Instagram },
                { name: 'Twitter', icon: Twitter },
                { name: 'Email', icon: Mail },
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => setPlatform(p.name)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all",
                    platform === p.name 
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" 
                      : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                  )}
                >
                  <p.icon className="w-3.5 h-3.5" />
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading || !product || !audience}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate Copy
          </button>
        </div>

        <div className="md:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center space-y-4 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl"
              >
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                <p className="text-zinc-500">Crafting your message...</p>
              </motion.div>
            ) : content ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {content.variations?.map((v: any, i: number) => (
                  <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl group relative">
                    <button 
                      onClick={() => copyToClipboard(`${v.headline}\n\n${v.body}`, i)}
                      className="absolute top-4 right-4 p-2 bg-zinc-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-700"
                    >
                      {copiedIndex === i ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                    </button>
                    <h4 className="text-lg font-bold text-emerald-400 mb-3 pr-8">{v.headline}</h4>
                    <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{v.body}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-4 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl p-12 text-center">
                <div className="p-4 bg-zinc-800/50 rounded-full">
                  <PenTool className="w-12 h-12 text-zinc-600" />
                </div>
                <div>
                  <h4 className="text-zinc-300 font-medium">No content generated yet</h4>
                  <p className="text-zinc-500 text-sm mt-1">Fill in the details on the left to start creating.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
