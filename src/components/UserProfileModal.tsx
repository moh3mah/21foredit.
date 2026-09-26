import React, { useState, useEffect } from 'react';
import { 
  User, Crown, Shield, Heart, Users, Sparkles, 
  Check, AlertTriangle, Camera, Upload, Edit3, Save, X, 
  Code, Film, UserPlus, UserCheck 
} from 'lucide-react';
import { OWNER_EMAIL, AdminUser } from '../data/editData';
import { 
  RegisteredAccount, 
  ROLE_CONFIG, 
  checkIsOwner 
} from '../services/authService';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { email: string; username: string; avatar: string; bio?: string; name?: string; role?: string };
  targetUser?: RegisteredAccount | null;
  onUpdateProfile?: (updated: { username: string; avatar: string; bio?: string; name?: string }) => void;
  totalLikesReceived: number;
  followersCount: number;
  followingCount: number;
  adminsList: AdminUser[];
  onOpenGrantRole?: (username: string) => void;
  isFollowing?: boolean;
  onToggleFollow?: (authorEmail: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  targetUser,
  onUpdateProfile,
  totalLikesReceived,
  followersCount,
  followingCount,
  adminsList,
  onOpenGrantRole,
  isFollowing = false,
  onToggleFollow,
}) => {
  const isViewingSelf = !targetUser || targetUser.email.toLowerCase() === currentUser.email.toLowerCase();

  const [name, setName] = useState(currentUser.name || currentUser.username);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio || 'مصمم وإيديتور في منصة 21foredit 🎬✨');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatar);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isViewingSelf) {
      setName(currentUser.name || currentUser.username);
      setUsername(currentUser.username);
      setBio(currentUser.bio || 'مصمم وإيديتور في منصة 21foredit 🎬✨');
      setSelectedAvatar(currentUser.avatar);
    }
  }, [currentUser, isViewingSelf]);

  if (!isOpen) return null;

  const isOwner = checkIsOwner(currentUser.email) || checkIsOwner(currentUser.username);
  const isAdmin = isOwner || currentUser.role === 'admin' || currentUser.role === 'developer' || adminsList.some(a => a.email.toLowerCase() === currentUser.email.toLowerCase());

  // Royal / King Avatars
  const kingAvatars = [
    {
      name: 'تاج الملك الأسود',
      url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'هيبة الملك الفضية',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'ملك السايبر 21',
      url: 'https://i.top4top.io/p_391173gui0.jpg',
    },
    {
      name: 'الملك المتوج الذهبي',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dark King Lord',
      url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    }
  ];

  const handleCustomAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanUsername = username.trim().replace(/^@+/, '').replace(/\s+/g, '_');

    // STRICT 3-LETTER USERNAME RULE
    // "وا يوزرات ثلاثية لا تقبل الا لل مطورين"
    if (cleanUsername.length === 3 && !isOwner && !isAdmin) {
      setErrorMessage('⚠️ اليوزرات الثلاثية (3 أحرف أو أرقام) محصورة حصرياً للمطورين والمالك وإدارة 21foredit 👑');
      return;
    }

    if (cleanUsername.length < 2) {
      setErrorMessage('يجب أن يتكون اسم المستخدم من حرفين على الأقل');
      return;
    }

    onUpdateProfile?.({
      name: name.trim(),
      username: cleanUsername,
      avatar: selectedAvatar,
      bio: bio.trim(),
    });

    setSuccessMessage('تم حفظ وتحديث بيانات حسابك وسيرتك الذاتية بنجاح!');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  // If viewing another user (from search or feed)
  if (!isViewingSelf && targetUser) {
    const roleConf = ROLE_CONFIG[targetUser.role] || ROLE_CONFIG.member;
    const isTargetOwner = checkIsOwner(targetUser.email) || checkIsOwner(targetUser.username);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
        <div className="relative w-full max-w-lg bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 glass-panel shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User Profile Card */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-3">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-white/30 p-1 bg-gradient-to-tr from-white/20 to-black shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                <img
                  src={targetUser.avatar}
                  alt={targetUser.name}
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
              {isTargetOwner && (
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-black p-1.5 rounded-full shadow-lg">
                  <Crown className="w-4 h-4 fill-current" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-2">
              <h3 className="text-2xl font-black text-white">{targetUser.name}</h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${roleConf.bg} ${roleConf.color} ${roleConf.border}`}>
                {roleConf.badge}
              </span>
            </div>

            <div className="text-sm font-mono text-zinc-400 mt-0.5 dir-ltr">
              @{targetUser.username}
            </div>

            {targetUser.bio && (
              <p className="text-xs text-zinc-300 max-w-md mx-auto mt-3 p-3 rounded-2xl bg-zinc-900/60 border border-white/5 leading-relaxed">
                {targetUser.bio}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-900/90 border border-white/10 text-center mb-6">
            <div>
              <div className="text-xs text-zinc-400 flex items-center justify-center gap-1 mb-1">
                <Heart className="w-3.5 h-3.5 text-red-400" />
                <span>اللايكات</span>
              </div>
              <div className="text-xl font-black text-white font-mono">{targetUser.totalLikesReceived}</div>
            </div>
            <div className="border-r border-l border-white/10">
              <div className="text-xs text-zinc-400 flex items-center justify-center gap-1 mb-1">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>المتابعون</span>
              </div>
              <div className="text-xl font-black text-white font-mono">{targetUser.followersCount}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 flex items-center justify-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>يتابع</span>
              </div>
              <div className="text-xl font-black text-white font-mono">{targetUser.followingCount}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {onToggleFollow && (
              <button
                onClick={() => onToggleFollow(targetUser.email)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all ${
                  isFollowing
                    ? 'bg-zinc-800 text-zinc-300 border border-white/10 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/20'
                    : 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>متابع بالفعل</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>متابعة المصمم</span>
                  </>
                )}
              </button>
            )}

            {isOwner && onOpenGrantRole && !isTargetOwner && (
              <button
                onClick={() => {
                  onClose();
                  onOpenGrantRole(targetUser.username);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-400/30 text-xs font-bold transition-all"
              >
                <Crown className="w-4 h-4" />
                <span>منح رتبة باليوزر</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Viewing / Editing Own Profile
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 glass-panel shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-2">
            <User className="w-3.5 h-3.5" />
            <span>الملف الشخصي وإعدادات الحساب</span>
          </div>
          <h3 className="text-2xl font-black text-white">معلومات حسابك</h3>
          <p className="text-xs text-zinc-400 mt-0.5">{currentUser.email}</p>
        </div>

        {/* User Stats Bar */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-900/90 border border-white/10 text-center mb-6">
          <div>
            <div className="text-xs text-zinc-400 flex items-center justify-center gap-1 mb-1">
              <Heart className="w-3.5 h-3.5 text-red-400" />
              <span>اللايكات</span>
            </div>
            <div className="text-xl font-black text-white font-mono">{totalLikesReceived}</div>
          </div>
          <div className="border-r border-l border-white/10">
            <div className="text-xs text-zinc-400 flex items-center justify-center gap-1 mb-1">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>المتابعون</span>
            </div>
            <div className="text-xl font-black text-white font-mono">{followersCount}</div>
          </div>
          <div>
            <div className="text-xs text-zinc-400 flex items-center justify-center gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>أتابع</span>
            </div>
            <div className="text-xl font-black text-white font-mono">{followingCount}</div>
          </div>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          
          {/* Avatar Preview & Selection */}
          <div className="text-center">
            <div className="relative inline-block mb-3">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 p-1 bg-gradient-to-tr from-amber-400 to-white/20 shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                <img
                  src={selectedAvatar}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {isOwner && (
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-black p-1.5 rounded-full shadow-lg border border-black">
                  <Crown className="w-4 h-4 fill-current" />
                </div>
              )}
            </div>

            {/* King Avatars Selection */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-zinc-300 flex items-center justify-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                <span>اختر صورة ملك (Royal King Avatars):</span>
              </span>
              
              <div className="flex items-center justify-center gap-3 overflow-x-auto py-2">
                {kingAvatars.map((king, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedAvatar(king.url)}
                    className={`relative cursor-pointer transition-all ${
                      selectedAvatar === king.url ? 'scale-110 ring-2 ring-amber-400 rounded-full' : 'opacity-70 hover:opacity-100'
                    }`}
                    title={king.name}
                  >
                    <img
                      src={king.url}
                      alt={king.name}
                      className="w-11 h-11 rounded-full object-cover border border-white/20"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Avatar Upload from Phone */}
            <div className="mt-2">
              <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 cursor-pointer transition-colors">
                <Camera className="w-3.5 h-3.5" />
                <span>أو ارفع صورتك من هاتفك</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              الاسم الكامل / اسم العرض *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسمك الكامل"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white font-semibold"
            />
          </div>

          {/* Username */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-zinc-300">
                اسم المستخدم (Username) *
              </label>
              {(isOwner || isAdmin) ? (
                <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  <span>مسموح لك باليوزرات الثلاثية المميزة 👑</span>
                </span>
              ) : (
                <span className="text-[10px] text-zinc-500">
                  اليوزرات الثلاثية (3 أحرف) محصورة للمطورين
                </span>
              )}
            </div>

            <div className="relative">
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-mono font-bold">@</span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="اسمك أو لقبك"
                className="w-full pr-8 pl-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-white font-semibold"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              السيرة الذاتية (Bio)
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="اكتب نبذة عنك، برامجك المفضلة، أو أسلوبك في الـ Edit..."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <Save className="w-4 h-4 text-black" />
            <span>حفظ التعديلات</span>
          </button>

        </form>

      </div>
    </div>
  );
};
