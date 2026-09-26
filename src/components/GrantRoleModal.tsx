import React, { useState, useEffect } from 'react';
import { 
  Crown, Shield, Code, Sparkles, Film, User, 
  Check, X, AlertCircle, Search, Info 
} from 'lucide-react';
import { 
  UserRole, 
  ROLE_CONFIG, 
  RegisteredAccount, 
  searchAccounts, 
  assignUserRoleByUsername, 
  normalizeUsername 
} from '../services/authService';

interface GrantRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUsername?: string;
  onRoleGranted: (username: string, role: UserRole) => void;
}

export const GrantRoleModal: React.FC<GrantRoleModalProps> = ({
  isOpen,
  onClose,
  initialUsername = '',
  onRoleGranted,
}) => {
  const [targetUsername, setTargetUsername] = useState(initialUsername);
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [searchSuggestions, setSearchSuggestions] = useState<RegisteredAccount[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (initialUsername) {
      setTargetUsername(initialUsername);
    }
  }, [initialUsername]);

  useEffect(() => {
    if (targetUsername.trim()) {
      const results = searchAccounts(targetUsername, 5);
      setSearchSuggestions(results);
    } else {
      setSearchSuggestions([]);
    }
  }, [targetUsername]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const clean = normalizeUsername(targetUsername);
    if (!clean) {
      setFeedback({ type: 'error', message: 'يرجى إدخال اسم مستخدم (يوزر) صالح' });
      return;
    }

    const res = assignUserRoleByUsername(clean, selectedRole);
    if (res.success) {
      setFeedback({
        type: 'success',
        message: res.error || `تم بنجاح تعيين رتبة "${ROLE_CONFIG[selectedRole].label}" للمستخدم @${clean}`
      });
      onRoleGranted(clean, selectedRole);
      setTimeout(() => {
        onClose();
        setFeedback(null);
      }, 1500);
    } else {
      setFeedback({ type: 'error', message: res.error || 'حدث خطأ أثناء تعيين الصلاحيات' });
    }
  };

  const rolesList: { role: UserRole; icon: any }[] = [
    { role: 'admin', icon: Shield },
    { role: 'developer', icon: Code },
    { role: 'vip', icon: Sparkles },
    { role: 'editor', icon: Film },
    { role: 'member', icon: User },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-zinc-950 border border-white/15 rounded-3xl p-6 shadow-2xl glass-panel relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">منح الصلاحيات والرتب باليوزر</h3>
            <p className="text-xs text-zinc-400">حدد يوزر المصمم لاختيار رتبته وصلاحياته في المنصة</p>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-3.5 rounded-2xl mb-4 text-xs font-semibold flex items-center gap-2 border ${
              feedback.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/15 border-red-500/30 text-red-300'
            }`}
          >
            {feedback.type === 'success' ? <Check className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input with Auto-Suggestions */}
          <div className="relative">
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              اسم المستخدم (@Username) المستهدف:
            </label>
            <div className="relative">
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-mono font-bold">@</span>
              <input
                type="text"
                required
                value={targetUsername}
                onChange={(e) => {
                  setTargetUsername(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="shanks, talon, sora..."
                className="w-full pr-8 pl-4 py-3 rounded-2xl bg-zinc-900 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
            </div>

            {/* Instant suggestions list when typing */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute z-20 left-0 right-0 top-full mt-2 bg-zinc-900 border border-white/15 rounded-2xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                {searchSuggestions.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      setTargetUsername(acc.username);
                      setShowSuggestions(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 px-3 hover:bg-white/10 text-right transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="w-7 h-7 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{acc.name}</div>
                        <div className="text-[11px] font-mono text-zinc-400">@{acc.username}</div>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${ROLE_CONFIG[acc.role].bg} ${ROLE_CONFIG[acc.role].color} ${ROLE_CONFIG[acc.role].border}`}>
                      {ROLE_CONFIG[acc.role].badge}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              اختر الرتبة والصلاحية المراد منحها:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {rolesList.map(({ role, icon: Icon }) => {
                const conf = ROLE_CONFIG[role];
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`flex items-start gap-3 p-3 rounded-2xl border text-right transition-all ${
                      isSelected
                        ? 'bg-white/10 border-white text-white shadow-lg'
                        : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
                    }`}
                  >
                    <div className={`p-2 rounded-xl mt-0.5 ${conf.bg} ${conf.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{conf.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 mr-auto" />}
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {conf.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Banner */}
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 text-xs text-zinc-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              إذا كان المستخدم غير مسجل بعد، فسيتم حفظ الرتبة له كصلاحية معلقة، وبمجرد تسجيله بهذا اليوزر ستتفعل رتبته تلقائياً!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-2xl bg-white text-black font-black text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              تأكيد وحفظ الصلاحيات
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-sm border border-white/10 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
