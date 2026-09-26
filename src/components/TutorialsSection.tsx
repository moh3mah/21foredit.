import React, { useState } from 'react';
import { 
  Video, Play, CheckCircle, ExternalLink, Download, 
  Sparkles, Layers, RefreshCw, Maximize2, Edit2, Trash2, Plus, Share2, Crown, Smartphone 
} from 'lucide-react';
import { TutorialItem } from '../data/editData';

interface TutorialsSectionProps {
  tutorials: TutorialItem[];
  isAdmin: boolean;
  isOwner?: boolean;
  onEditTutorial?: (tut: TutorialItem) => void;
  onDeleteTutorial?: (id: string) => void;
  onAddTutorial?: () => void;
}

export const TutorialsSection: React.FC<TutorialsSectionProps> = ({
  tutorials,
  isAdmin,
  isOwner = false,
  onEditTutorial,
  onDeleteTutorial,
  onAddTutorial,
}) => {
  // Store which view is selected per tutorial: 'tutorial' | 'result'
  const [activeViews, setActiveViews] = useState<{ [id: string]: 'tutorial' | 'result' }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleView = (id: string, mode: 'tutorial' | 'result') => {
    setActiveViews(prev => ({ ...prev, [id]: mode }));
  };

  const handleShare = (tut: TutorialItem) => {
    const url = window.location.href;
    navigator.clipboard.writeText(`${tut.title} - شروحات موقع 21foredit\n${url}`);
    setCopiedId(tut.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-zinc-300 mb-3">
            <Video className="w-3.5 h-3.5 text-white" />
            <span>الشروحات التطبيقية • لايت موشن وكاب كات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            شروحات احتراف الـ Edit
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            شاهد الشرح التفصيلي خطوة بخطوة مع استعراض النتيجة النهائية مباشرة.
            {isOwner && (
              <span className="text-amber-300 block font-semibold mt-1">
                👑 بصفتك المالك: يمكنك تغيير أي فيديو للشرح أو النتيجة مباشرة من ملفات واستوديو هاتفك عبر زر التعديل!
              </span>
            )}
          </p>
        </div>

        {isAdmin && onAddTutorial && (
          <button
            onClick={onAddTutorial}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>إضافة شرح جديد من هاتفك</span>
          </button>
        )}
      </div>

      {/* Tutorials List */}
      <div className="space-y-12">
        {tutorials.map((tut) => {
          const currentMode = activeViews[tut.id] || 'tutorial';
          const currentVideoUrl = currentMode === 'tutorial' ? tut.tutorialVideoUrl : tut.resultVideoUrl;

          return (
            <div
              key={tut.id}
              className="rounded-3xl border border-white/15 bg-zinc-950/90 overflow-hidden glass-panel shadow-2xl transition-all"
            >
              {/* Top Bar of the Tutorial Card */}
              <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-black/40">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-white text-black font-bold">
                      {tut.software}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-white/10 text-zinc-300 border border-white/10 font-mono">
                      {tut.resolution}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-white/10 text-zinc-300 border border-white/10 font-mono">
                      {tut.fps}
                    </span>
                    <span className="text-xs text-zinc-400">
                      بواسطة: <strong className="text-white">{tut.author}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white pt-1">
                    {tut.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    {tut.description}
                  </p>
                </div>

                {/* Controls and Actions */}
                <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                  
                  {/* Switcher: الشرح vs النتيجة */}
                  <div className="p-1 rounded-xl bg-zinc-900 border border-white/15 flex items-center">
                    <button
                      onClick={() => toggleView(tut.id, 'tutorial')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        currentMode === 'tutorial'
                          ? 'bg-white text-black shadow-md'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>فيديو الشرح</span>
                    </button>
                    <button
                      onClick={() => toggleView(tut.id, 'result')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        currentMode === 'result'
                          ? 'bg-white text-black shadow-md'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>النتيجة النهائية (Result)</span>
                    </button>
                  </div>

                  {/* Share button */}
                  <button
                    onClick={() => handleShare(tut)}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                    title="مشاركة الشرح"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  {/* Owner Phone Edit Button */}
                  {isOwner && onEditTutorial && (
                    <button
                      onClick={() => onEditTutorial(tut)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold hover:bg-amber-400/30 transition-all shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                      title="تغيير الفيديو من ملفات هاتفك"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>تغيير الفيديو من هاتفك 👑</span>
                    </button>
                  )}

                  {/* General Admin controls */}
                  {!isOwner && isAdmin && onEditTutorial && (
                    <button
                      onClick={() => onEditTutorial(tut)}
                      className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
                      title="تعديل الشرح"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}

                  {isAdmin && onDeleteTutorial && (
                    <button
                      onClick={() => onDeleteTutorial(tut.id)}
                      className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300"
                      title="حذف الشرح"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Video Player Box */}
              <div className="relative w-full bg-black flex flex-col items-center justify-center min-h-[300px] sm:min-h-[440px]">
                
                {/* Active Mode Banner Badge */}
                <div className="absolute top-4 right-4 z-20 pointer-events-none">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border shadow-lg ${
                    currentMode === 'tutorial' 
                      ? 'bg-black/70 text-white border-white/20' 
                      : 'bg-emerald-500/80 text-black border-emerald-400 font-black'
                  }`}>
                    {currentMode === 'tutorial' ? '📹 وضع الشرح الكامل' : '✨ استعراض النتيجة النهائية (Result)'}
                  </span>
                </div>

                <video
                  key={currentVideoUrl}
                  src={currentVideoUrl}
                  controls
                  playsInline
                  className="w-full max-h-[580px] object-contain mx-auto"
                >
                  متصفحك لا يدعم تشغيل هذا الفيديو.
                </video>

                {/* Direct Source / Open in new tab link */}
                <div className="w-full p-3 bg-zinc-950/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>تشغيل عالي الدقة ({tut.resolution} • {tut.fps})</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {isOwner && onEditTutorial && (
                      <button
                        onClick={() => onEditTutorial(tut)}
                        className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                      >
                        <Smartphone className="w-3 h-3" />
                        <span>استبدال هذا الفيديو بفيديو من هاتفك</span>
                      </button>
                    )}

                    <a
                      href={currentVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>فتح في نافذة مستقلة</span>
                    </a>

                    <a
                      href={currentVideoUrl}
                      download
                      className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>تحميل الفيديو</span>
                    </a>
                  </div>
                </div>

              </div>

              {copiedId === tut.id && (
                <div className="bg-emerald-500/20 border-t border-emerald-500/40 text-emerald-300 text-xs text-center py-2 font-semibold">
                  ✓ تم نسخ رابط وحقوق الشرح لمشاركتها!
                </div>
              )}

            </div>
          );
        })}
      </div>

    </section>
  );
};
