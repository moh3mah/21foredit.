import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Crown, UserPlus, Trash2, Edit3, 
  Plus, CheckCircle, Video, Download, Layers, AlertTriangle, 
  Code, Sparkles, Film, User, Search, Check, RefreshCw 
} from 'lucide-react';
import { 
  OWNER_EMAIL, 
  TutorialItem, 
  PresetItem, 
  UserVideo 
} from '../data/editData';
import { 
  UserRole, 
  ROLE_CONFIG, 
  RegisteredAccount, 
  getAllAccounts, 
  assignUserRoleByUsername, 
  searchAccounts, 
  normalizeUsername, 
  getAllPendingRoles, 
  removePendingRole 
} from '../services/authService';

interface AdminPanelProps {
  currentUser: { email: string; username: string; avatar: string; name?: string; role?: string };
  onOpenAddTutorial: () => void;
  onOpenAddPreset: () => void;
  onOpenUserSearch?: () => void;
  tutorialsCount: number;
  presetsCount: number;
  videosCount: number;
  onRefreshUsers?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  onOpenAddTutorial,
  onOpenAddPreset,
  onOpenUserSearch,
  tutorialsCount,
  presetsCount,
  videosCount,
  onRefreshUsers,
}) => {
  const isOwner = currentUser.email.toLowerCase() === OWNER_EMAIL.toLowerCase() || currentUser.username.toLowerCase() === 'shanks95816';

  // Permission Granting Form State
  const [targetUsername, setTargetUsername] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [suggestions, setSuggestions] = useState<RegisteredAccount[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Accounts with elevated roles
  const [accounts, setAccounts] = useState<RegisteredAccount[]>([]);
  const [pendingRoles, setPendingRoles] = useState<{ username: string; role: UserRole }[]>([]);

  const loadAccounts = () => {
    const all = getAllAccounts();
    setAccounts(all);
    setPendingRoles(getAllPendingRoles());
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  // Handle username search for suggestion when typing
  useEffect(() => {
    if (targetUsername.trim()) {
      const results = searchAccounts(targetUsername, 5);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [targetUsername]);

  const handleGrantRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const clean = normalizeUsername(targetUsername);
    if (!clean) {
      setFeedback({ type: 'error', message: 'يرجى إدخال اسم مستخدم (يوزر) صحيح' });
      return;
    }

    const result = assignUserRoleByUsername(clean, selectedRole);
    if (result.success) {
      setFeedback({
        type: 'success',
        message: result.error || `تم بنجاح تعيين رتبة "${ROLE_CONFIG[selectedRole].label}" لليوزر @${clean}`
      });
      setTargetUsername('');
      setShowSuggestions(false);
      loadAccounts();
      onRefreshUsers?.();
    } else {
      setFeedback({ type: 'error', message: result.error || 'حدث خطأ أثناء تعيين الصلاحيات' });
    }
  };

  const handleRevokeRole = (username: string) => {
    const clean = normalizeUsername(username);
    const result = assignUserRoleByUsername(clean, 'member');
    if (result.success) {
      setFeedback({ type: 'success', message: `تم سحب الرتبة وإرجاع @${clean} كعضو عادي` });
      loadAccounts();
      onRefreshUsers?.();
    } else {
      setFeedback({ type: 'error', message: result.error || 'تعذر سحب الصلاحيات' });
    }
  };

  const handleRemovePending = (username: string) => {
    removePendingRole(username);
    setPendingRoles(getAllPendingRoles());
  };

  const elevatedAccounts = accounts.filter(a => a.role !== 'member');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white mb-3">
            {isOwner ? <Crown className="w-3.5 h-3.5 text-amber-300" /> : <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />}
            <span>{isOwner ? 'لوحة المالك الأعلى (Owner)' : 'لوحة المشرف (Admin)'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            إدارة المنصة والصلاحيات والمحتوى
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            مرحباً <strong className="text-white">@{currentUser.username}</strong> ({currentUser.email})
            {isOwner 
              ? ' — بصفتك المالك، يمكنك منح وسحب الصلاحيات عن طريق اسم المستخدم (اليوزر)، وإضافة مشرفين ومطورين، وتعديل كافة محتويات الموقع.' 
              : ' — بصفتك مشرفاً، يمكنك إدارة الشروحات، ومشاريع الـ XML، وحذف المقاطع المخالفة.'}
          </p>
        </div>

        {/* Quick User Explorer Trigger */}
        {onOpenUserSearch && (
          <button
            onClick={onOpenUserSearch}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900 border border-white/15 text-white text-xs font-bold hover:bg-zinc-800 transition-all shadow-md self-start md:self-auto"
          >
            <Search className="w-4 h-4 text-amber-300" />
            <span>بحث واستكشاف المصممين 🔍</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 glass-panel">
          <div className="text-xs text-zinc-400 mb-1">الشروحات المتوفرة</div>
          <div className="text-3xl font-black text-white font-mono">{tutorialsCount}</div>
          <button
            onClick={onOpenAddTutorial}
            className="mt-3 flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة شرح جديد</span>
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 glass-panel">
          <div className="text-xs text-zinc-400 mb-1">شيكات ومشاريع XML و CC</div>
          <div className="text-3xl font-black text-white font-mono">{presetsCount}</div>
          <button
            onClick={onOpenAddPreset}
            className="mt-3 flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة مشروع XML</span>
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 glass-panel">
          <div className="text-xs text-zinc-400 mb-1">إيدتات ومقاطع المجتمع</div>
          <div className="text-3xl font-black text-white font-mono">{videosCount}</div>
          <span className="mt-3 inline-block text-xs text-zinc-500">
            يمكنك حذف أي فيديو مخالف من صفحة نشر الفيديوهات
          </span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-12">
        <button
          onClick={onOpenAddTutorial}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <Video className="w-4 h-4 text-black" />
          <span>إضافة فيديو شرح جديد (مع فيديو النتيجة)</span>
        </button>

        <button
          onClick={onOpenAddPreset}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-white/20 text-white font-bold text-sm hover:bg-zinc-800 transition-all"
        >
          <Download className="w-4 h-4 text-white" />
          <span>إضافة بريست / شيك / CC جديد مع ملف XML</span>
        </button>
      </div>

      {/* ROLE & PERMISSION MANAGEMENT (OWNER ONLY) */}
      {isOwner ? (
        <div className="rounded-3xl border border-white/15 bg-zinc-950 p-6 sm:p-8 glass-panel shadow-2xl mb-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 mb-6 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">إدارة صلاحيات ورتب الأعضاء عن طريق اليوزر</h3>
                <p className="text-xs text-zinc-400">
                  اكتب اسم المستخدم (اليوزر) لمنحه رتبة مشرف، مطور، أو صانع VIP موثق
                </p>
              </div>
            </div>

            <button
              onClick={loadAccounts}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>تحديث القائمة</span>
            </button>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div
              className={`p-3.5 rounded-2xl mb-6 text-xs font-semibold flex items-center gap-2 border ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/15 border-red-500/30 text-red-300'
              }`}
            >
              {feedback.type === 'success' ? <Check className="w-4 h-4 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Add / Grant Role Form with Instant Autocomplete */}
          <form onSubmit={handleGrantRoleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
            {/* Username Input with Auto-Suggestions */}
            <div className="md:col-span-5 relative">
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                اسم المستخدم / اليوزر (@username) *
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
                  placeholder="اكتب يوزر المصمم (مثل: talon, sora, k...)"
                  className="w-full pr-8 pl-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-white transition-all"
                />
              </div>

              {/* Instant Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-20 left-0 right-0 top-full mt-1.5 bg-zinc-900 border border-white/15 rounded-2xl shadow-2xl overflow-hidden max-h-52 overflow-y-auto divide-y divide-white/5">
                  {suggestions.map((acc) => (
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
            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                الرتبة والصلاحية المطلوبة *
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-sm focus:outline-none focus:border-white transition-colors"
              >
                <option value="admin">⭐ مشرف عام (Admin)</option>
                <option value="developer">💻 مطور معتمد (Developer - يوزرات 3 حروف)</option>
                <option value="vip">✨ صانع محتوى موثق (VIP Creator)</option>
                <option value="editor">🎬 محرر مشاريع وشروحات (Editor)</option>
                <option value="member">👤 عضو عادي (سحب الصلاحيات)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3 flex items-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                <UserPlus className="w-4 h-4 text-black" />
                <span>تعيين الصلاحيات باليوزر</span>
              </button>
            </div>
          </form>

          {/* List of Privileged Users Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center justify-between">
              <span>قائمة أصحاب الصلاحيات والرتب في المنصة:</span>
              <span className="text-zinc-500 font-mono text-[11px]">{elevatedAccounts.length} حسابات مميزة</span>
            </h4>

            {/* Owner Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://i.top4top.io/p_391173gui0.jpg"
                    alt="Owner"
                    className="w-12 h-12 rounded-xl object-cover border border-amber-400/50 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-xs font-bold">
                    👑
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>أحمد (Shanks)</span>
                    <span className="font-mono text-zinc-300 text-xs">@shanks95816</span>
                    <span className="text-[10px] bg-amber-400/30 text-amber-200 px-2 py-0.5 rounded-full font-bold">
                      المالك الأساسي الدائم
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400">{OWNER_EMAIL} — صاحب الصلاحيات المطلقة</div>
                </div>
              </div>
              <span className="text-xs text-amber-300 font-mono font-bold self-start sm:self-auto">PERMANENT OWNER</span>
            </div>

            {/* Other Elevated Accounts */}
            {elevatedAccounts.filter(a => a.role !== 'owner').map((acc) => {
              const roleInfo = ROLE_CONFIG[acc.role] || ROLE_CONFIG.member;
              return (
                <div
                  key={acc.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-zinc-900 border border-white/10 gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-10 h-10 rounded-xl object-cover border border-white/10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                        <span>{acc.name}</span>
                        <span className="font-mono text-zinc-300 text-xs">@{acc.username}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${roleInfo.bg} ${roleInfo.color} ${roleInfo.border}`}>
                          {roleInfo.badge}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 flex items-center gap-3 mt-0.5">
                        <span>{acc.email}</span>
                        <span>•</span>
                        <span>{acc.followersCount} متابع</span>
                        <span>•</span>
                        <span>{acc.totalLikesReceived} لايك</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => {
                        setTargetUsername(acc.username);
                        setSelectedRole(acc.role);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>

                    <button
                      onClick={() => handleRevokeRole(acc.username)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/20 transition-colors"
                      title="سحب الرتبة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>سحب الرتبة</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Pending Roles List */}
            {pendingRoles.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <h5 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>صلاحيات معلقة ليوزرات بانتظار التسجيل:</span>
                </h5>
                <div className="space-y-2">
                  {pendingRoles.map(({ username, role }) => (
                    <div
                      key={username}
                      className="flex items-center justify-between p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">@{username}</span>
                        <span className="text-zinc-400">ستفعل له رتبة:</span>
                        <span className={`px-2 py-0.5 rounded-full font-bold border ${ROLE_CONFIG[role].bg} ${ROLE_CONFIG[role].color} ${ROLE_CONFIG[role].border}`}>
                          {ROLE_CONFIG[role].badge}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemovePending(username)}
                        className="text-red-400 hover:text-red-300 text-xs font-semibold"
                      >
                        إلغاء الحجز
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 glass-panel text-center">
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <h4 className="text-base font-bold text-white">صلاحية منح الرتب محصورة بالمالك الأعلى</h4>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl mx-auto">
            بصفتك مشرفاً، يمكنك إضافة وتعديل وحذف الشروحات ومشاريع الـ XML والفيديوهات، أما إدارة وتعيين رتب المشرفين والمطورين فتخص المالك فقط ({OWNER_EMAIL} / @shanks95816).
          </p>
        </div>
      )}

    </section>
  );
};
