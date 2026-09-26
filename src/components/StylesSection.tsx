import React, { useState } from 'react';
import { 
  Layers, Search, Filter, Sparkles, Zap, Flame, 
  CheckCircle, Plus, Edit2, Trash2, Combine, Info
} from 'lucide-react';
import { EditStyle } from '../data/editData';

interface StylesSectionProps {
  styles: EditStyle[];
  isAdmin: boolean;
  onEditStyle?: (style: EditStyle) => void;
  onDeleteStyle?: (id: string) => void;
  onAddStyle?: () => void;
}

export const StylesSection: React.FC<StylesSectionProps> = ({
  styles,
  isAdmin,
  onEditStyle,
  onDeleteStyle,
  onAddStyle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<EditStyle | null>(null);

  const filteredStyles = styles.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameAr.includes(searchQuery) ||
      s.description.includes(searchQuery) ||
      s.tag.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDiff = selectedDifficulty === 'all' || s.difficulty === selectedDifficulty;
    return matchesSearch && matchesDiff;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-zinc-300 mb-3">
            <Layers className="w-3.5 h-3.5 text-white" />
            <span>الصفحة الأولى • موسوعة الستايلات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            ستايل ادت <span className="text-zinc-500 font-light font-['Space_Grotesk']">(Edit Styles)</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            دليلك الشامل لجميع ستايلات المونتاج المعروفة في الساحة العالمية والتيك توك، مع الخصائص التقنية والبرامج المناسبة.
          </p>
        </div>

        {isAdmin && onAddStyle && (
          <button
            onClick={onAddStyle}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>إضافة ستايل جديد</span>
          </button>
        )}
      </div>

      {/* Special Callout: Double Styles & Combos (Restom, Blur+Velocity) */}
      <div className="mb-12 relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-zinc-900 via-black to-zinc-950 p-6 sm:p-8 glass-panel shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/10 text-white text-xs font-bold border border-white/15">
              <Combine className="w-3.5 h-3.5" />
              <span>فئات الـ دبل ستايل والدمج (Double Style & Combos)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              الستايلات المدمجة وستايل رستوم
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              طبعاً فيه ستايلات تكون مدمجة أو بالأصح يكون ستايلين مجمعين بواحد، مثال: ستايل <span className="text-white font-semibold underline decoration-white/40">Blur</span> مع <span className="text-white font-semibold underline decoration-white/40">Velocity</span>، هذه الحركة ما تطلع ستايل جديد بذاته بس تطلع فئات تحت مسمى <span className="text-white font-semibold">«دبل ستايل»</span> وفيه فئات كثيرة زيها؛ مثل <span className="text-white font-bold">ستايل رستوم</span>، فستايل رستوم يكون مجمع أكثر من ستايل في واحد. وفي الأخير فيه ستايلات غير متواجدة بسبب الكثرة الهائلة بستايلات الإيدت لكن هذه أبرزها وأكثرها تأثيراً!
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2 w-full lg:w-auto">
            <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 font-medium">
              ⚡ دبل ستايل: Blur + Velocity
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 font-medium">
              🔥 ستايل رستوم: دمج متعدد مخصص
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 font-medium">
              ✨ سموذ + هارد شيك مدمج
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن أي ستايل (مثال: Velocity, Glitch, Manga, Smooth...)"
            className="w-full pl-4 pr-11 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <span className="text-xs text-zinc-400 flex items-center gap-1 font-medium whitespace-nowrap pl-2">
            <Filter className="w-3.5 h-3.5" /> الصعوبة:
          </span>
          {['all', 'سهل', 'متوسط', 'صعب', 'أسطوري'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDifficulty === diff
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-zinc-900/60 text-zinc-400 border border-white/10 hover:text-white hover:bg-white/5'
              }`}
            >
              {diff === 'all' ? 'الكل' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Styles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStyles.map((style) => (
          <div
            key={style.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/80 p-6 glass-panel-hover overflow-hidden"
          >
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/60 transition-all duration-500" />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/15">
                  {style.tag}
                </span>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                    style.difficulty === 'أسطوري' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                    style.difficulty === 'صعب' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                    style.difficulty === 'متوسط' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                    'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {style.difficulty}
                  </span>

                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      {onEditStyle && (
                        <button
                          onClick={() => onEditStyle(style)}
                          className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10"
                          title="تعديل الستايل"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onDeleteStyle && (
                        <button
                          onClick={() => onDeleteStyle(style.id)}
                          className="p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                          title="حذف الستايل"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Title & English name */}
              <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                {style.nameAr}
              </h3>
              <div className="text-xs font-mono text-zinc-400 mt-0.5 mb-3 font-['Space_Grotesk']">
                {style.name}
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                {style.description}
              </p>

              {/* Characteristics bullets */}
              <div className="space-y-1.5 mb-5 pt-3 border-t border-white/5">
                {style.characteristics.map((c, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 mt-1.5 flex-shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom info (popular in + software) */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                <span>أشهر المنصات:</span>
                <span className="text-white font-medium">{style.popularIn}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {style.software.map((sw, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-white/5">
                    {sw}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredStyles.length === 0 && (
        <div className="text-center py-16 border border-white/10 rounded-2xl bg-zinc-950/60 p-8">
          <Info className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
          <p className="text-zinc-300 font-semibold text-lg">لم يتم العثور على أي ستايل مطابق</p>
          <p className="text-zinc-500 text-sm mt-1">جرب البحث بكلمات أخرى أو اختر تصفية مختلفة.</p>
        </div>
      )}

    </section>
  );
};
