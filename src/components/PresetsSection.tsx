import React, { useState } from 'react';
import { 
  Download, Copy, Check, ExternalLink, Zap, 
  Palette, Disc, Eye, Sparkles, Filter, Plus, Edit2, Trash2, Shield, Smartphone, Crown 
} from 'lucide-react';
import { PresetItem } from '../data/editData';

interface PresetsSectionProps {
  title: string;
  subtitle: string;
  initialType?: 'all' | 'shake' | 'effect' | 'cc' | 'course';
  items: PresetItem[];
  isAdmin: boolean;
  isOwner?: boolean;
  onEditPreset?: (preset: PresetItem) => void;
  onDeletePreset?: (id: string) => void;
  onAddPreset?: () => void;
}

export const PresetsSection: React.FC<PresetsSectionProps> = ({
  title,
  subtitle,
  initialType = 'all',
  items,
  isAdmin,
  isOwner = false,
  onEditPreset,
  onDeletePreset,
  onAddPreset,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'shake' | 'effect' | 'cc' | 'course'>(initialType);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<PresetItem | null>(null);

  const filteredItems = items.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.type === selectedFilter;
  });

  const handleCopyLink = (item: PresetItem) => {
    navigator.clipboard.writeText(item.xmlUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownload = (item: PresetItem) => {
    const link = document.createElement('a');
    link.href = item.xmlUrl;
    link.download = `${item.title.replace(/\s+/g, '_')}.xml`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-zinc-300 mb-3">
            <Download className="w-3.5 h-3.5 text-white" />
            <span>مشاريع وملفات XML جاهزة للتحميل</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            {subtitle}
            {isOwner && (
              <span className="text-amber-300 block font-semibold mt-1">
                👑 بصفتك المالك: يمكنك تغيير أي صورة متحركة (GIF) أو ملف مشروع XML وتعديل العنوان والرابط مباشرة من هاتفك!
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isAdmin && onAddPreset && (
            <button
              onClick={onAddPreset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>إضافة مشروع XML من هاتفك</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
        {[
          { id: 'all', label: 'الكل' },
          { id: 'shake', label: 'شيكات XML' },
          { id: 'effect', label: 'افكتات وتكست' },
          { id: 'course', label: 'كورسات ومقدمات' },
          { id: 'cc', label: 'CC FiveM & Dark' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedFilter === tab.id
                ? 'bg-white text-black font-bold shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 border border-white/10 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Presets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/90 overflow-hidden glass-panel-hover"
          >
            {/* Top Media Preview (GIF) */}
            <div className="relative w-full h-52 bg-zinc-900 overflow-hidden border-b border-white/10">
              {item.gifUrl ? (
                <img
                  src={item.gifUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : null}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

              {/* Subtype Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                  {item.subType || item.type.toUpperCase()}
                </span>
              </div>

              {/* Admin Actions on hover */}
              {isAdmin && (
                <div className="absolute top-3 left-3 flex items-center gap-1 z-10">
                  {onEditPreset && (
                    <button
                      onClick={() => onEditPreset(item)}
                      className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md text-zinc-300 hover:text-white border border-white/20"
                      title="تعديل المشروع"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDeletePreset && (
                    <button
                      onClick={() => onDeletePreset(item.id)}
                      className="p-1.5 rounded-lg bg-red-950/80 backdrop-blur-md text-red-300 hover:text-red-200 border border-red-500/30"
                      title="حذف المشروع"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Quick View Button */}
              <button
                onClick={() => setPreviewItem(item)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white text-black text-xs font-bold shadow-lg">
                  <Eye className="w-4 h-4" />
                  <span>معاينة مكبرة</span>
                </div>
              </button>

              {/* File size & author bottom strip */}
              <div className="absolute bottom-2 right-2 left-2 flex items-center justify-between text-[11px] text-zinc-300 font-mono z-10">
                <span>بواسطة: {item.author}</span>
                {item.fileSize && <span>{item.fileSize}</span>}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-white/10">
                
                {/* Download XML */}
                <button
                  onClick={() => handleDownload(item)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                >
                  <Download className="w-3.5 h-3.5 text-black" />
                  <span>تحميل ملف XML</span>
                </button>

                {/* Owner Direct Phone Change button */}
                {isOwner && onEditPreset && (
                  <button
                    onClick={() => onEditPreset(item)}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 text-xs font-bold transition-all"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>تغيير الـ GIF / الـ XML من هاتفي 👑</span>
                  </button>
                )}

                {/* Copy Link & Direct External link */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-zinc-300 transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-zinc-400" />
                        <span>نسخ الرابط</span>
                      </>
                    )}
                  </button>

                  <a
                    href={item.xmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                    title="فتح الرابط المباشر"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Modal for Expanded GIF Preview */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-6 glass-panel">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">{previewItem.title}</h4>
                <p className="text-xs text-zinc-400">{previewItem.description}</p>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-2 rounded-xl bg-white/10 text-zinc-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full max-h-[460px] rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10 mb-6">
              <img
                src={previewItem.gifUrl}
                alt={previewItem.title}
                className="w-full h-full object-contain max-h-[460px]"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              {isOwner && onEditPreset && (
                <button
                  onClick={() => {
                    const itm = previewItem;
                    setPreviewItem(null);
                    onEditPreset(itm);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>تغيير هذه الصورة من هاتفك</span>
                </button>
              )}

              <button
                onClick={() => handleDownload(previewItem)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all mr-auto"
              >
                <Download className="w-4 h-4 text-black" />
                <span>تحميل ملف XML الآن</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
