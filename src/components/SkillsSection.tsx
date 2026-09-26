import React, { useState, useEffect } from 'react';
import { 
  Wand2, Music, Gauge, Sparkles, SunMedium, 
  ArrowLeftRight, Type, Volume2, CheckCircle2, 
  Award, Play, RotateCcw, Edit2, Trash2, Plus
} from 'lucide-react';
import { EditSkill } from '../data/editData';

interface SkillsSectionProps {
  skills: EditSkill[];
  isAdmin: boolean;
  onEditSkill?: (skill: EditSkill) => void;
  onDeleteSkill?: (id: string) => void;
  onAddSkill?: () => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isAdmin,
  onEditSkill,
  onDeleteSkill,
  onAddSkill
}) => {
  // Beat Sense interactive simulation
  const [bpm, setBpm] = useState<number>(128);
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [isBeating, setIsBeating] = useState<boolean>(false);
  const [beatScore, setBeatScore] = useState<string>('اضغط على الزر بالتزامن مع إيقاعك المفضل لقياس الـ Beat Sense');

  const handleTap = () => {
    const now = Date.now();
    setIsBeating(true);
    setTimeout(() => setIsBeating(false), 150);

    const newTimes = [...tapTimes, now].slice(-5);
    setTapTimes(newTimes);

    if (newTimes.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTimes.length; i++) {
        intervals.push(newTimes[i] - newTimes[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 40 && calculatedBpm <= 260) {
        setBpm(calculatedBpm);
        setBeatScore(`إيقاع ممتاز: ${calculatedBpm} BPM! إحساسك الموسيقي متزن وجاهز للقص على البيت.`);
      }
    }
  };

  const getSkillIcon = (id: string) => {
    switch (id) {
      case 'beat-senses': return Music;
      case 'velocity': return Gauge;
      case 'effects': return Sparkles;
      case 'colours-lighting': return SunMedium;
      case 'transitions': return ArrowLeftRight;
      case 'text': return Type;
      case 'sound-effects': return Volume2;
      default: return Wand2;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-zinc-300 mb-3">
            <Wand2 className="w-3.5 h-3.5 text-white" />
            <span>الصفحة الثانية • مهارات الصانع المحترف</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            سكيل ادت <span className="text-zinc-500 font-light font-['Space_Grotesk']">(Edit Skills)</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            المهارات بالـ Edit هي اللي بتميزك عن أي إيديتور ثاني! للمهارات استخدامات كثيرة من انتقالات وشيكات وبلورز وحتى هندسة الصوت ومطابقة الرتم.
          </p>
        </div>

        {isAdmin && onAddSkill && (
          <button
            onClick={onAddSkill}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>إضافة مهارة جديدة</span>
          </button>
        )}
      </div>

      {/* Interactive Tool: Beat Senses Trainer */}
      <div className="mb-12 rounded-3xl border border-white/15 bg-gradient-to-br from-zinc-900/90 via-black to-zinc-950 p-6 sm:p-8 glass-panel shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
              <Music className="w-3.5 h-3.5" />
              <span>أداة تفاعلية: اختبار وممارسة الـ Beat Senses</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              جرّب إحساسك بنبضات الـ Beat
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              الإيدت مو مجرد وضع كليب وأغنية، لازم تخلي المشاهد يحس بالأغنية مع الإيدت وتوزن الانتقال مع كل Drop. اضغط على الزر بنبضات منتظمة لتحسب سرعة الإيقاع وتدرب أذنك!
            </p>
            <p className="text-xs text-zinc-400 font-mono bg-zinc-900/80 px-3 py-2 rounded-xl border border-white/5">
              {beatScore}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleTap}
              className={`w-36 h-36 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-100 select-none shadow-2xl active:scale-95 ${
                isBeating
                  ? 'bg-white text-black border-white scale-105 shadow-[0_0_50px_rgba(255,255,255,0.8)]'
                  : 'bg-zinc-900 text-white border-white/30 hover:border-white/80 hover:bg-zinc-800'
              }`}
            >
              <Music className={`w-8 h-8 mb-1 ${isBeating ? 'text-black' : 'text-white'}`} />
              <span className="text-xs font-black tracking-wider uppercase font-['Space_Grotesk']">
                TAP BEAT
              </span>
              <span className="text-xl font-bold font-mono mt-1">
                {bpm} <span className="text-xs font-light">BPM</span>
              </span>
            </button>

            <button
              onClick={() => {
                setTapTimes([]);
                setBpm(128);
                setBeatScore('تمت إعادة الضبط. اضغط مجدداً لحساب الـ BPM.');
              }}
              className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة ضبط المقياس</span>
            </button>
          </div>

        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => {
          const Icon = getSkillIcon(skill.id);
          return (
            <div
              key={skill.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/80 p-6 glass-panel-hover"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:border-white group-hover:bg-white/10 transition-all">
                    <Icon className="w-6 h-6 text-zinc-200 group-hover:text-white" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/15">
                      {skill.tag}
                    </span>

                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        {onEditSkill && (
                          <button
                            onClick={() => onEditSkill(skill)}
                            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10"
                            title="تعديل المهارة"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {onDeleteSkill && (
                          <button
                            onClick={() => onDeleteSkill(skill.id)}
                            className="p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                            title="حذف المهارة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Skill Name */}
                <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                  {skill.nameAr}
                </h3>
                <div className="text-xs font-mono text-zinc-400 mt-0.5 mb-3 font-['Space_Grotesk']">
                  {skill.name}
                </div>

                {/* Importance Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-400">مستوى التأثير في الإيدت:</span>
                    <span className="font-mono text-white font-bold">{skill.importance}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-white transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      style={{ width: `${skill.importance}%` }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                  {skill.description}
                </p>

                {/* Pro Tips */}
                <div className="space-y-2 mb-4 pt-3 border-t border-white/5">
                  <div className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-white" />
                    <span>نصائح ذهبية للإتقان:</span>
                  </div>
                  {skill.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Software Highlight */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-[11px] text-zinc-400">الأدوات المفتاحية: </span>
                <span className="text-xs font-medium text-white">{skill.softwareHighlight}</span>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
