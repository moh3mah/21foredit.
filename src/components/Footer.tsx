import React from 'react';
import { Sparkles, ExternalLink, ShieldCheck, Heart, Layers, Video, Download } from 'lucide-react';
import { DISCORD_URL, MAIN_BANNER_IMAGE, OWNER_EMAIL } from '../data/editData';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-white/10 bg-black/90 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <img 
                src={MAIN_BANNER_IMAGE} 
                alt="21foredit" 
                className="w-10 h-10 rounded-xl object-cover border border-white/20"
              />
              <span className="text-2xl font-black text-white font-['Space_Grotesk']">
                21<span className="text-zinc-500 font-light">for</span>edit
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              منصة المونتاج والـ Edit الرائدة لصنّاع المحتوى والمصممين في العالم العربي. نوفر دليلاً كاملاً للستايلات، سكيلز وتصانيف الإيدت، مشاريع وشيكات XML حصرية، وشروحات تفصيلية لأفضل برامج المونتاج.
            </p>
            <div className="pt-2">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(88,101,242,0.3)]"
              >
                <span>انضم لسيرفر الديسكورد الرسمي</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Space_Grotesk']">
              الأقسام الرئيسية
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('styles')} className="hover:text-white transition-colors">
                  • ستايل ادت (Edit Styles)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('skills')} className="hover:text-white transition-colors">
                  • سكيل ادت (Beat, Velocity, FX)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  • تصانيف الادت (Categories)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutorials')} className="hover:text-white transition-colors">
                  • شروحات لايت موشن وكاب كات
                </button>
              </li>
            </ul>
          </div>

          {/* Downloads & Community */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Space_Grotesk']">
              المكتبة والمشاريع
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('shakes')} className="hover:text-white transition-colors">
                  • شيكات سموذ وهارد XML
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('effects')} className="hover:text-white transition-colors">
                  • افكتات تكست وكورسات مقدمة
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cc')} className="hover:text-white transition-colors">
                  • تصحيح ألوان FiveM CC & Dark
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-white transition-colors">
                  • نشر ومشاركة الفيديوهات (4K / 120fps)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <span>© {new Date().getFullYear()}</span>
            <strong className="text-zinc-300">21foredit</strong>
            <span>— جميع الحقوق محفوظة لمالك المنصة ومجتمع المصممين.</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-500">
            <span>المالك المعتمد:</span>
            <span className="font-mono text-zinc-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              {OWNER_EMAIL}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
