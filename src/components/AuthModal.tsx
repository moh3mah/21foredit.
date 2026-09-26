import React, { useState } from 'react';
import { 
  LogIn, UserPlus, User, Lock, Mail, Crown, Shield, 
  Sparkles, Check, AlertCircle, Eye, EyeOff, Camera, Upload, X 
} from 'lucide-react';
import { 
  registerAccount, 
  loginAccount, 
  RegisteredAccount, 
  ROLE_CONFIG,
  checkIsOwner 
} from '../services/authService';
import { OWNER_EMAIL } from '../data/editData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { email: string; username: string; avatar: string; name?: string; role?: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAvatar, setRegAvatar] = useState(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  );

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // King & Elite avatar options
  const avatarPresets = [
    {
      name: 'افتار الملك',
      url: 'https://i.top4top.io/p_391173gui0.jpg',
    },
    {
      name: 'تاج الملك الأسود',
      url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'ستايل النيون 21',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'مصمم غوجو',
      url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dark Knight',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    }
  ];

  if (!isOpen) return null;

  const handleCustomAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setRegAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const result = loginAccount({
      identifier: loginIdentifier,
      password: loginPassword,
    });

    if (result.success && result.account) {
      setSuccessMsg(`أهلاً بك مجدداً يا ${result.account.name}!`);
      setTimeout(() => {
        onLogin({
          email: result.account!.email,
          username: result.account!.username,
          avatar: result.account!.avatar,
          name: result.account!.name,
          role: result.account!.role,
        });
        onClose();
      }, 500);
    } else {
      setErrorMsg(result.error || 'فشل تسجيل الدخول، تحقق من البيانات');
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const result = registerAccount({
      name: regName,
      username: regUsername,
      email: regEmail,
      password: regPassword,
      avatar: regAvatar,
    });

    if (result.success && result.account) {
      setSuccessMsg(`تم إنشاء حسابك بنجاح! مرحباً بك يا ${result.account.name} في 21foredit`);
      setTimeout(() => {
        onLogin({
          email: result.account!.email,
          username: result.account!.username,
          avatar: result.account!.avatar,
          name: result.account!.name,
          role: result.account!.role,
        });
        onClose();
      }, 600);
    } else {
      setErrorMsg(result.error || 'فشل إنشاء الحساب، يرجى مراجعة البيانات');
    }
  };

  // Quick fill for Owner Account
  const handleQuickOwnerFill = () => {
    setMode('login');
    setLoginIdentifier('shanks95816');
    setLoginPassword('password123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl glass-panel relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 border border-white/20 p-2 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            <span className="font-black text-2xl text-white font-['Space_Grotesk']">21</span>
          </div>
          <h3 className="text-xl font-black text-white">
            {mode === 'login' ? 'تسجيل الدخول إلى 21foredit' : 'إنشاء حساب مصمم جديد'}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            {mode === 'login' 
              ? 'سجل دخولك بالبريد أو اسم المستخدم وكلمة المرور' 
              : 'انضم لمجتمع المصممين وانشر إيدتاتك وحمل مشاريع الـ XML'}
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex rounded-2xl bg-zinc-900 border border-white/10 p-1 mt-4">
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'login'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>تسجيل الدخول</span>
            </button>
            <button
              onClick={() => {
                setMode('register');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'register'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>إنشاء حساب</span>
            </button>
          </div>
        </div>

        {/* Feedback message */}
        <div className="px-6 pt-4">
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* Forms Content */}
        <div className="p-6">
          {mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  البريد الإلكتروني أو اسم المستخدم (اليوزر) *
                </label>
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="shanks95816 أو editor@gmail.com"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-zinc-300">
                    كلمة المرور *
                  </label>
                </div>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-10 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white text-black font-black text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] mt-2"
              >
                تسجيل الدخول
              </button>

              {/* Quick shortcut for owner */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleQuickOwnerFill}
                  className="text-xs text-amber-300/80 hover:text-amber-300 flex items-center gap-1 transition-colors"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>دخول تجريبي بحساب المالك (shanks95816)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  ليس لديك حساب؟ سجل الآن
                </button>
              </div>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  الاسم الكامل / اسم العرض *
                </label>
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="مثال: أحمد الشمري"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-zinc-300">
                    اسم المستخدم / اليوزر (@username) *
                  </label>
                  <span className="text-[10px] text-amber-400">
                    اليوزرات الـ 3 حروف للمطورين 👑
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-mono font-bold">@</span>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="shanks, talon, cool_editor..."
                    className="w-full pr-8 pl-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  البريد الإلكتروني *
                </label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="your-name@gmail.com"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  كلمة المرور *
                </label>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="4 خانات على الأقل"
                    className="w-full pr-10 pl-10 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  اختر صورة حسابك أو ارفع من جهازك:
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {avatarPresets.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRegAvatar(av.url)}
                      className={`relative w-10 h-10 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        regAvatar === av.url ? 'border-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      title={av.name}
                    >
                      <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                    </button>
                  ))}

                  <label className="w-10 h-10 rounded-xl border border-dashed border-white/30 flex items-center justify-center cursor-pointer hover:border-white transition-colors flex-shrink-0 bg-zinc-900 text-zinc-400 hover:text-white">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white text-black font-black text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] mt-2"
              >
                إنشاء الحساب وبدء الإيدت
              </button>

              <div className="text-center pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  لديك حساب بالفعل؟ سجل دخولك الآن
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
