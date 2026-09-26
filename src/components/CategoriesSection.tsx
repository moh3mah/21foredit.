import React, { useState } from 'react';
import { 
  BookOpen, Compass, Flame, Crown, Swords, 
  CloudRain, Film, Tag, Sparkles, Plus, Edit2, Trash2 
} from 'lucide-react';
import { EditCategory } from '../data/editData';

interface CategoriesSectionProps {
  categories: EditCategory[];
  isAdmin: boolean;
  onEditCategory?: (category: EditCategory) => void;
  onDeleteCategory?: (id: string) => void;
  onAddCategory?: () => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  isAdmin,
  onEditCategory,
  onDeleteCategory,
  onAddCategory,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || '');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return Compass;
      case 'Flame': return Flame;
      case 'Crown': return Crown;
      case 'BookOpen': return BookOpen;
      case 'Swords': return Swords;
      case 'CloudRain': return CloudRain;
      default: return Film;
    }
  };

  const selectedCategory = categories.find(c => c.id === activeCategoryId) || categories[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-zinc-300 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span>الصفحة الثالثة • تصانيف وثيمات المحتوى</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            تصانيف الادت <span className="text-zinc-500 font-light font-['Space_Grotesk']">(Categories Edit)</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            التصنيف هو الرسالة والهدف وراء الإيدت؛ سواء كان استعراضياً فخماً، قاصفاً هجومياً، أو قصة درامية تلامس الوجدان.
          </p>
        </div>

        {isAdmin && onAddCategory && (
          <button
            onClick={onAddCategory}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>إضافة تصنيف جديد</span>
          </button>
        )}
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.iconName);
          const isSelected = selectedCategory?.id === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`group relative flex flex-col justify-between rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'bg-zinc-900 border-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-[1.02]'
                  : 'bg-zinc-950/80 border border-white/10 hover:border-white/30 hover:bg-zinc-900/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isSelected ? 'bg-white text-black' : 'bg-white/5 border border-white/15 text-white group-hover:border-white'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {isAdmin && (
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      {onEditCategory && (
                        <button
                          onClick={() => onEditCategory(cat)}
                          className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10"
                          title="تعديل التصنيف"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onDeleteCategory && (
                        <button
                          onClick={() => onDeleteCategory(cat.id)}
                          className="p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                          title="حذف التصنيف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {cat.nameAr}
                </h3>
                <div className="text-xs font-mono text-zinc-400 mb-3 font-['Space_Grotesk']">
                  {cat.name}
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="text-xs text-zinc-400">
                  <span className="font-semibold text-zinc-300">طابع الفايب: </span>
                  <span>{cat.vibe}</span>
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.recommendedStyles.map((styleName, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                      {styleName}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Selected Category Spotlight */}
      {selectedCategory && (
        <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-zinc-900/90 to-black p-6 sm:p-8 glass-panel shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>نصيحة صناعة {selectedCategory.nameAr}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-white">
                كيف تصنع {selectedCategory.nameAr} يكسر المشاهدات؟
              </h4>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                في {selectedCategory.nameAr}، ركز دائماً على اختيار مقاطع سينمائية عالية الجودة 4K مع مطابقة كلمات الحوارات أو النغمات بدقة. تذكر أن توازن بين سرعة الانتقالات وهدوء المشهد، واستخدم ستايلات مثل {selectedCategory.recommendedStyles.join(' و ')} لإبراز الطابع.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col gap-2">
              <span className="text-xs text-zinc-400 font-mono">طابع وتصنيف رسمي</span>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-center font-mono text-sm text-white font-bold">
                {selectedCategory.name}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
