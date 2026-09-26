import React, { useState, useMemo } from 'react';
import { 
  Search, X, User, Crown, Shield, Code, Sparkles, Film, 
  UserPlus, UserCheck, Heart, Users, ExternalLink, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { 
  RegisteredAccount, 
  UserRole, 
  ROLE_CONFIG, 
  searchAccounts, 
  getAllAccounts 
} from '../services/authService';

interface UserSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { email: string; username: string; avatar: string } | null;
  onSelectUser: (user: RegisteredAccount) => void;
  onGrantRole?: (username: string) => void;
  followings: { [email: string]: boolean };
  onToggleFollow: (authorEmail: string) => void;
  isOwner: boolean;
}

export const UserSearchModal: React.FC<UserSearchModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
  onGrantRole,
  followings,
  onToggleFollow,
  isOwner,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'devs' | 'admins' | 'vips'>('all');

  const filteredAccounts = useMemo(() => {
    let list = searchAccounts(searchQuery, 20);

    if (selectedFilter === 'devs') {
      list = list.filter(a => a.role === 'developer');
    } else if (selectedFilter === 'admins') {
      list = list.filter(a => a.role === 'admin' || a.role === 'owner');
    } else if (selectedFilter === 'vips') {
      list = list.filter(a => a.role === 'vip');
    }

    return list;
  }, [searchQuery, selectedFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl glass-panel flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">استكشاف وبحث مصممي ومستخدمي 21foredit</h3>
              <p className="text-xs text-zinc-400">ابحث باليوزر أو الاسم — تظهر الاقتراحات من أول حرف تكتبه</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 bg-zinc-900/50">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="اكتب يوزر المصمم (مثال: shanks, talon, sora, k...)"
              className="w-full pr-12 pl-10 py-3.5 rounded-2xl bg-zinc-900 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-white text-black font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              الجميع
            </button>
            <button
              onClick={() => setSelectedFilter('devs')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedFilter === 'devs'
                  ? 'bg-purple-500 text-white font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>المطورين (3 حروف) 💻</span>
            </button>
            <button
              onClick={() => setSelectedFilter('admins')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedFilter === 'admins'
                  ? 'bg-blue-500 text-white font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>الإدارة والمشرفين 👑</span>
            </button>
            <button
              onClick={() => setSelectedFilter('vips')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedFilter === 'vips'
                  ? 'bg-emerald-500 text-white font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>صناع VIP موثقين ✨</span>
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-white/5">
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account) => {
              const roleInfo = ROLE_CONFIG[account.role] || ROLE_CONFIG.member;
              const isFollowing = !!followings[account.email.toLowerCase()];
              const isSelf = currentUser?.email.toLowerCase() === account.email.toLowerCase();

              return (
                <div
                  key={account.id}
                  className="pt-2.5 first:pt-0 flex items-center justify-between p-3 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900 border border-white/5 hover:border-white/20 transition-all group cursor-pointer"
                  onClick={() => {
                    onSelectUser(account);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={account.avatar}
                        alt={account.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-white/15 group-hover:border-white transition-all shadow-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
                        }}
                      />
                      {account.role === 'owner' && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] font-bold shadow">
                          👑
                        </div>
                      )}
                      {account.role === 'developer' && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-bold shadow">
                          💻
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors truncate">
                          {account.name}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${roleInfo.bg} ${roleInfo.color} ${roleInfo.border}`}>
                          {roleInfo.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-400">
                        <span className="font-mono text-zinc-300 dir-ltr">@{account.username}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-zinc-500" />
                          <span>{account.followersCount} متابع</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-red-400/80">
                          <Heart className="w-3 h-3 fill-current" />
                          <span>{account.totalLikesReceived}</span>
                        </span>
                      </div>

                      {account.bio && (
                        <p className="text-[11px] text-zinc-400 truncate max-w-sm sm:max-w-md mt-1">
                          {account.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    {/* Grant permissions button for Owner */}
                    {isOwner && onGrantRole && account.role !== 'owner' && (
                      <button
                        onClick={() => {
                          onGrantRole(account.username);
                          onClose();
                        }}
                        className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-400/20 text-xs font-semibold transition-all"
                        title="منح أو تعديل الصلاحيات"
                      >
                        <Crown className="w-3 h-3" />
                        <span>منح صلاحيات</span>
                      </button>
                    )}

                    {/* Follow button */}
                    {!isSelf && (
                      <button
                        onClick={() => onToggleFollow(account.email)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isFollowing
                            ? 'bg-zinc-800 text-zinc-300 border border-white/10 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/20'
                            : 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                        }`}
                      >
                        {isFollowing ? (
                          <>
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>متابع</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>متابعة</span>
                          </>
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onSelectUser(account);
                        onClose();
                      }}
                      className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      title="عرض الملف الكامل"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <Search className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <p className="text-base font-bold text-white">لم يتم العثور على يوزر مطابق</p>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                جرب كتابة حرف آخر، أو اسم مختلف. تظهر اقتراحات فورية بمجرد كتابة أول حرف من اليوزر.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-zinc-900/60 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 px-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>البحث التلقائي المباشر مفعل (Autocomplete)</span>
          </div>
          <span className="font-mono text-[11px] text-zinc-500">
            {filteredAccounts.length} نتيجة مقترحة
          </span>
        </div>
      </div>
    </div>
  );
};
