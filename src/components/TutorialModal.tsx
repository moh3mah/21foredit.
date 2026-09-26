import React, { useState, useEffect } from 'react';
import { Video, Plus, Upload, Check, Play, Film, Sparkles } from 'lucide-react';
import { TutorialItem } from '../data/editData';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tut: TutorialItem) => void;
  initialData?: TutorialItem | null;
  isOwner?: boolean;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isOwner = false,
}) => {
  const [title, setTitle] = useState('');
  const [software, setSoftware] = useState('Alight Motion');
  const [technique, setTechnique] = useState('');
  const [description, setDescription] = useState('');
  const [tutorialVideoUrl, setTutorialVideoUrl] = useState('');
  const [resultVideoUrl, setResultVideoUrl] = useState('');
  const [fps, setFps] = useState('120 FPS');
  const [resolution, setResolution] = useState('4K Ultra HD');
  const [author, setAuthor] = useState('Talon');

  // Phone file state indicators
  const [tutFileName, setTutFileName] = useState<string | null>(null);
  const [resFileName, setResFileName] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSoftware(initialData.software);
      setTechnique(initialData.technique);
      setDescription(initialData.description);
      setTutorialVideoUrl(initialData.tutorialVideoUrl);
      setResultVideoUrl(initialData.resultVideoUrl);
      setFps(initialData.fps);
      setResolution(initialData.resolution);
      setAuthor(initialData.author);
      setTutFileName(null);
      setResFileName(null);
    } else {
      setTitle('');
      setSoftware('Alight Motion');
      setTechnique('');
      setDescription('');
      setTutorialVideoUrl('');
      setResultVideoUrl('');
      setFps('120 FPS');
      setResolution('4K Ultra HD');
      setAuthor('Talon');
      setTutFileName(null);
      setResFileName(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Handle Tutorial Video Pick directly from phone
  const handleTutVideoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTutFileName(file.name);
      const url = URL.createObjectURL(file);
      setTutorialVideoUrl(url);
    }
  };

  // Handle Result Video Pick directly from phone
  const handleResultVideoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResFileName(file.name);
      const url = URL.createObjectURL(file);
      setResultVideoUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !tutorialVideoUrl.trim() || !resultVideoUrl.trim()) return;

    onSave({
      id: initialData ? initialData.id : `tut-${Date.now()}`,
      title,
      software,
      technique: technique.trim() || 'Custom Edit Technique',
      description,
      tutorialVideoUrl,
      resultVideoUrl,
      fps,
      resolution,
      author
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 glass-panel shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {initialData ? 'تعديل وتغيير فيديوهات الشرح' : 'إضافة شرح جديد'}
                </h3>
                {isOwner && (
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
                    صلاحية المالك 👑
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400">
                يمكنك اختيار فيديوهات الشرح والنتيجة مباشرة من ملفات واستوديو هاتفك
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 text-zinc-300 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              نص عنوان الشرح *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: شرح زوم شيك لايت موشن احترافي"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
            />
          </div>

          {/* Section 1: Tutorial Video Pick from Phone */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Film className="w-4 h-4 text-blue-400" />
                <span>فيديو الشرح (Tutorial Video) من هاتفك:</span>
              </span>
              {tutFileName && (
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>تم اختيار: {tutFileName}</span>
                </span>
              )}
            </div>

            {/* Direct Phone File Picker */}
            <div className="relative">
              <input
                type="file"
                accept="video/*"
                onChange={handleTutVideoPick}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-xs text-zinc-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer"
              />
            </div>

            {/* URL Fallback */}
            <div>
              <span className="text-[10px] text-zinc-500 block mb-1">أو ضع رابط مباشر لفيديو الشرح:</span>
              <input
                type="url"
                required
                value={tutorialVideoUrl}
                onChange={(e) => setTutorialVideoUrl(e.target.value)}
                placeholder="https://...mov or mp4"
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Section 2: Result Video Pick from Phone */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>فيديو النتيجة النهائية (Result Video) من هاتفك:</span>
              </span>
              {resFileName && (
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>تم اختيار: {resFileName}</span>
                </span>
              )}
            </div>

            {/* Direct Phone File Picker */}
            <div className="relative">
              <input
                type="file"
                accept="video/*"
                onChange={handleResultVideoPick}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-xs text-zinc-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer"
              />
            </div>

            {/* URL Fallback */}
            <div>
              <span className="text-[10px] text-zinc-500 block mb-1">أو ضع رابط مباشر لفيديو النتيجة:</span>
              <input
                type="url"
                required
                value={resultVideoUrl}
                onChange={(e) => setResultVideoUrl(e.target.value)}
                placeholder="https://...mov or mp4"
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Software & Author */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">البرنامج</label>
              <select
                value={software}
                onChange={(e) => setSoftware(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
              >
                <option value="Alight Motion">Alight Motion</option>
                <option value="CapCut">CapCut</option>
                <option value="After Effects">After Effects</option>
                <option value="Premiere Pro">Premiere Pro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">الكاتب / المٌعد</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">وصف الشرح والتقنية</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="شرح بسيط للخطوات والملاحظات المهمة..."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
            />
          </div>

          {/* Quality & FPS */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">الدقة</label>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
              >
                <option value="4K Ultra HD">4K Ultra HD</option>
                <option value="2K QHD">2K QHD</option>
                <option value="1080p FHD">1080p FHD</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">الإطارات</label>
              <select
                value={fps}
                onChange={(e) => setFps(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
              >
                <option value="120 FPS">120 FPS</option>
                <option value="60 FPS">60 FPS</option>
                <option value="30 FPS">30 FPS</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 text-sm font-semibold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              حفظ وتطبيق الفيديو الجديد
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
