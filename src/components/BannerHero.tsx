import React, { useRef } from 'react';
import { 
  Sparkles, Download, Layers, Play, ExternalLink, 
  ShieldCheck, Upload, Zap, Eye, Film, Video, Camera, Crown
} from 'lucide-react';
import { MAIN_BANNER_IMAGE, DISCORD_URL } from '../data/editData';

interface BannerHeroProps {
  onNavigate: (tab: string) => void;
  onOpenUpload: () => void;
  bannerImage?: string;
  onUpdateBanner?: (newUrl: string) => void;
  isOwner?: boolean;
}

export const BannerHero: React.FC<BannerHeroProps> = ({ 
  onNavigate, 
  onOpenUpload,
  bannerImage = MAIN_BANNER_IMAGE,
  onUpdateBanner,
  isOwner = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateBanner) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateBanner(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background Ambience & Blurred Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[140px] opacity-40 animate-pulse" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-zinc-400/10 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14">
        
        {/* Main Banner Card */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-zinc-900/80 via-black/90 to-black shadow-[0_0_50px_rgba(0,0,0,0.9)] glass-panel group">
          
          {/* Banner Graphic Background with the user's primary image */}
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] overflow-hidden">
            <img 
              src={bannerImage} 
              alt="21foredit Main Banner" 
              className="w-full h-full object-cover object-center filter contrast-125 brightness-95 group-hover:scale-102 transition-transform duration-700"
            />

            {/* Cinematic Glass Gradients & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/95" />

            {/* Top Badge Strip & Owner Banner Edit Button */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex flex-wrap items-center gap-2 z-10">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>المنصة الرسمية الأولى للإيديتورز</span>
              </span>

              {isOwner && onUpdateBanner && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleBannerFileChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 backdrop-blur-md transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    title="تغيير بنر الموقع من ملفات هاتفك"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>تغيير البنر من هاتفك 👑</span>
                  </button>
                </>
              )}

              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-white/10 backdrop-blur-md text-zinc-300 border border-white/10">
                4K UHD • 120 FPS
              </span>
            </div>

            {/* Banner Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12 z-10">
              
              <div className="max-w-3xl space-y-4">
                
                {/* Brand Tagline */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>21foredit Creative Hub</span>
                </div>

                {/* Primary Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  عالم المونتاج والـ <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 underline decoration-white/30">Edit</span> بدون حدود
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base lg:text-lg text-zinc-300 line-clamp-3 sm:line-clamp-none max-w-2xl leading-relaxed">
                  مكتبة متكاملة تضم جميع ستايلات وتصانيف وسكيلز الـ Edit، مشاريع وشيكات XML حصرية، شروحات Alight Motion و CapCut، وتصحيح ألوان FiveM CC مع منصة مجتمعية لنشر مقاطعك بجودة فائقة تصل إلى 4K و 120 إطاراً.
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onNavigate('shakes')}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-sm sm:text-base transition-all hover:scale-105 shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                  >
                    <Download className="w-5 h-5 text-black" />
                    <span>تحميل شيكات XML</span>
                  </button>

                  <button
                    onClick={() => onNavigate('tutorials')}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/20 font-semibold text-sm sm:text-base backdrop-blur-md transition-all hover:border-white/40"
                  >
                    <Play className="w-4 h-4 text-white fill-current" />
                    <span>مشاهدة الشروحات</span>
                  </button>

                  <button
                    onClick={onOpenUpload}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-950/80 hover:bg-white/10 text-zinc-200 border border-white/15 font-medium text-sm transition-all"
                  >
                    <Upload className="w-4 h-4 text-zinc-400" />
                    <span>انشر إيدتك الخاص</span>
                  </button>

                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#5865F2]/25 hover:bg-[#5865F2]/40 text-[#b5bcff] border border-[#5865F2]/50 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(88,101,242,0.25)]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>ديسكورد المجتمع</span>
                  </a>
                </div>

              </div>
            </div>

          </div>

          {/* Highlights & Features Bar underneath the banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/10 bg-black/60 border-t border-white/10 backdrop-blur-xl">
            
            <div 
              onClick={() => onNavigate('styles')}
              className="p-4 sm:p-5 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group/stat"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover/stat:border-white transition-all">
                <Layers className="w-6 h-6 text-zinc-300 group-hover/stat:text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">+12 ستايل</div>
                <div className="text-xs text-zinc-400 font-medium">ستايلات ادت وشرح تفصيلي</div>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('shakes')}
              className="p-4 sm:p-5 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group/stat"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover/stat:border-white transition-all">
                <Zap className="w-6 h-6 text-zinc-300 group-hover/stat:text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">+7 شيكات XML</div>
                <div className="text-xs text-zinc-400 font-medium">سموذ، هارد، ودبل شيك</div>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('cc')}
              className="p-4 sm:p-5 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group/stat"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover/stat:border-white transition-all">
                <Film className="w-6 h-6 text-zinc-300 group-hover/stat:text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">CC Dark & FiveM</div>
                <div className="text-xs text-zinc-400 font-medium">تصحيح ألوان سينمائي فاخر</div>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('community')}
              className="p-4 sm:p-5 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group/stat"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover/stat:border-white transition-all">
                <Video className="w-6 h-6 text-zinc-300 group-hover/stat:text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">4K @ 120 FPS</div>
                <div className="text-xs text-zinc-400 font-medium">نشر إيدتاتك ومشاركتها</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
