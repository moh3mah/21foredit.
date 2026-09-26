import React, { useState, useEffect } from 'react';
import { Download, Plus, Upload, Image, FileCode, Check, AlertCircle } from 'lucide-react';
import { PresetItem } from '../data/editData';

interface PresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preset: PresetItem) => void;
  initialData?: PresetItem | null;
  isOwner?: boolean;
}

export const PresetModal: React.FC<PresetModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isOwner = false,
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'shake' | 'effect' | 'cc' | 'course'>('shake');
  const [subType, setSubType] = useState('');
  const [description, setDescription] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [xmlUrl, setXmlUrl] = useState('');
  const [author, setAuthor] = useState('Talon');
  const [tags, setTags] = useState('XML, Alight Motion');
  const [fileSize, setFileSize] = useState('50 KB');

  // Phone local file status indicators
  const [gifFileName, setGifFileName] = useState<string | null>(null);
  const [xmlFileName, setXmlFileName] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setType(initialData.type);
      setSubType(initialData.subType || '');
      setDescription(initialData.description);
      setGifUrl(initialData.gifUrl);
      setXmlUrl(initialData.xmlUrl);
      setAuthor(initialData.author);
      setTags(initialData.tags.join(', '));
      setFileSize(initialData.fileSize || '50 KB');
      setGifFileName(null);
      setXmlFileName(null);
    } else {
      setTitle('');
      setType('shake');
      setSubType('');
      setDescription('');
      setGifUrl('');
      setXmlUrl('');
      setAuthor('Talon');
      setTags('XML, Alight Motion');
      setFileSize('50 KB');
      setGifFileName(null);
      setXmlFileName(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Handle Animated Image (GIF/Image) directly from phone files
  const handleGifFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGifFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setGifUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle XML Project file directly from phone files
  const handleXmlFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setXmlFileName(file.name);
      setFileSize(`${Math.round(file.size / 1024)} KB`);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setXmlUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !xmlUrl.trim()) return;

    onSave({
      id: initialData ? initialData.id : `preset-${Date.now()}`,
      title,
      type,
      subType: subType.trim() || undefined,
      description,
      gifUrl,
      xmlUrl,
      author,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      downloadsCount: initialData ? initialData.downloadsCount : 0,
      fileSize
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
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {initialData ? 'تعديل مشروع الـ XML والـ GIF' : 'إضافة مشروع / ملف XML جديد'}
                </h3>
                {isOwner && (
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
                    صلاحية المالك 👑
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400">
                يمكنك تغيير الصورة المتحركة وملف الـ XML مباشرة من ملفات هاتفك أو عبر الرابط
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
              نص عنوان المشروع / البريست *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: شيك سموذ Shaek by Talon 4"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
            />
          </div>

          {/* Section 1: Animated Image (GIF) Pick from Phone */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Image className="w-4 h-4 text-amber-300" />
                <span>تغيير الصورة المتحركة (GIF) من هاتفك:</span>
              </span>
              {gifFileName && (
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>تم اختيار: {gifFileName}</span>
                </span>
              )}
            </div>

            {/* Direct Phone File Picker */}
            <div className="relative">
              <input
                type="file"
                accept="image/*,.gif"
                onChange={handleGifFilePick}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-xs text-zinc-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer"
              />
            </div>

            {/* URL Fallback */}
            <div>
              <span className="text-[10px] text-zinc-500 block mb-1">أو ضع رابط مباشر للصورة / الـ GIF:</span>
              <input
                type="url"
                value={gifUrl}
                onChange={(e) => setGifUrl(e.target.value)}
                placeholder="https://...gif or jpg"
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white"
              />
            </div>

            {/* Live Preview if available */}
            {gifUrl && (
              <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
                <img
                  src={gifUrl}
                  alt="Live Preview"
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-1 right-2 text-[9px] bg-black/70 px-1.5 rounded text-white font-mono">
                  معاينة مباشرة
                </span>
              </div>
            )}
          </div>

          {/* Section 2: XML Project File Pick from Phone */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-300" />
                <span>تغيير ملف مشروع الـ XML من هاتفك:</span>
              </span>
              {xmlFileName && (
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>تم اختيار: {xmlFileName}</span>
                </span>
              )}
            </div>

            {/* Direct Phone File Picker */}
            <div className="relative">
              <input
                type="file"
                accept=".xml,text/xml,application/xml"
                onChange={handleXmlFilePick}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-xs text-zinc-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer"
              />
            </div>

            {/* URL Fallback */}
            <div>
              <span className="text-[10px] text-zinc-500 block mb-1">أو ضع رابط تحميل ملف الـ XML:</span>
              <input
                type="url"
                required
                value={xmlUrl}
                onChange={(e) => setXmlUrl(e.target.value)}
                placeholder="https://...xml (رابط مباشر للتحميل)"
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Type & Subtype */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">النوع الأساسي</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
              >
                <option value="shake">شيك (Shake)</option>
                <option value="effect">إفكت وتكست (Effect)</option>
                <option value="cc">تصحيح ألوان (CC FiveM / Dark)</option>
                <option value="course">كورس ومقدمة (Course / Intro)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">التصنيف الفرعي</label>
              <input
                type="text"
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                placeholder="مثال: سموذ، هارد، FiveM..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">وصف المشروع ومميزاته</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="نبذة عن طريقة استخدام البريست..."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
            />
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
              حفظ وتطبيق التغييرات
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
