import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Sparkles, Layers, Wand2, BookOpen, 
  Video, Download, Palette, Upload, ShieldCheck, 
  ExternalLink, User, LogIn, LogOut, CheckCircle, Disc, Bell, Settings,
  Search, Users, Heart, ChevronRight, UserPlus, UserCheck, Crown
} from 'lucide-react';
import { OWNER_EMAIL, DISCORD_URL, MAIN_BANNER_IMAGE, AdminUser } from '../data/editData';
import { 
  RegisteredAccount, 
  searchAccounts, 
  ROLE_CONFIG, 
  checkIsOwner 
} from '../services/authService';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: { email: string; username: string; avatar: string; name?: string; role?: string } | null;
  adminsList: AdminUser[];
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenProfile?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationsCount?: number;
  onSelectUser?: (user: RegisteredAccount) => void;
  onOpenUserExplorer?: () => void;
  onOpenGrantRole?: (username: string) => void;
  followings?: { [email: string]: boolean };
  onToggleFollow?: (authorEmail: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  adminsList,
  onOpenAuth,
  onLogout,
  onOpenProfile,
  onOpenNotifications,
  unreadNotificationsCount = 0,
  onSelectUser,
  onOpenUserExplorer,
  onOpenGrantRole,
  followings = {},
  onToggleFollow,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RegisteredAccount[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const isOwner = currentUser ? checkIsOwner(currentUser.email) || checkIsOwner(currentUser.username) : false;
  const isAdmin = isOwner || (currentUser?.role === 'admin' || currentUser?.role === 'developer' || adminsList.some(a => a.email.toLowerCase() === currentUser?.email.toLowerCase()));

  // Live Auto-Suggestion as soon as the user types (even 1 letter!)
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchAccounts(searchQuery, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Sparkles },
    { id: 'styles', label: 'ستايل ادت', icon: Layers },
    { id: 'skills', label: 'سكيل ادت', icon: Wand2 },
    { id: 'categories', label: 'تصانيف الادت', icon: BookOpen },
    { id: 'tutorials', label: 'شروحات', icon: Video },
    { id: 'shakes', label: 'شيكات XML', icon: Download },
    { id: 'effects', label: 'افكتات وكورسات', icon: Disc },
    { id: 'cc', label: 'CC FiveM', icon: Palette },
    { id: 'community', label: 'نشر الفيديوهات', icon: Upload },
    ...(isAdmin ? [{ id: 'admin', label: isOwner ? 'لوحة المالك 👑' : 'لوحة المشرف ⭐', icon: ShieldCheck }] : []),
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/20 p-0.5 bg-gradient-to-br from-white/20 to-black group-hover:border-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              <img 
                src={MAIN_BANNER_IMAGE} 
                alt="21foredit Logo" 
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-wider text-white font-['Space_Grotesk']">
                  21<span className="text-zinc-400 font-light">for</span>edit
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20 font-mono tracking-widest uppercase">
                  VIP
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium hidden sm:inline">
                ملتقى محترفي المونتاج والتصميم
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden 2xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* USER SEARCH INPUT WITH INSTANT AUTOCOMPLETE */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xs xl:max-w-sm hidden md:block">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="ابحث باليوزر (@shanks, talon...)"
                className="w-full pr-9 pl-8 py-2 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Suggestions Dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-zinc-950/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
                <div className="p-2 border-b border-white/10 flex items-center justify-between text-[11px] text-zinc-400 px-3">
                  <span>اقتراحات الحسابات الفورية</span>
                  {searchQuery && (
                    <span className="font-mono text-zinc-500">"{searchQuery}"</span>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                  {searchResults.length > 0 ? (
                    searchResults.map((acc) => {
                      const roleConf = ROLE_CONFIG[acc.role] || ROLE_CONFIG.member;
                      const isFollowing = !!followings[acc.email.toLowerCase()];

                      return (
                        <div
                          key={acc.id}
                          onClick={() => {
                            onSelectUser?.(acc);
                            setIsSearchOpen(false);
                          }}
                          className="flex items-center justify-between p-2.5 hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="relative">
                              <img
                                src={acc.avatar}
                                alt={acc.name}
                                className="w-8 h-8 rounded-xl object-cover border border-white/10 group-hover:border-white transition-colors"
                              />
                              {acc.role === 'owner' && (
                                <span className="absolute -bottom-1 -right-1 text-[9px]">👑</span>
                              )}
                              {acc.role === 'developer' && (
                                <span className="absolute -bottom-1 -right-1 text-[9px]">💻</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                                  {acc.name}
                                </span>
                                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold border ${roleConf.bg} ${roleConf.color} ${roleConf.border}`}>
                                  {roleConf.badge}
                                </span>
                              </div>
                              <div className="text-[10px] font-mono text-zinc-400 dir-ltr flex items-center gap-2">
                                <span>@{acc.username}</span>
                                <span>•</span>
                                <span className="font-sans text-zinc-500">{acc.followersCount} متابع</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            {isOwner && onOpenGrantRole && acc.role !== 'owner' && (
                              <button
                                onClick={() => {
                                  onOpenGrantRole(acc.username);
                                  setIsSearchOpen(false);
                                }}
                                className="p-1 rounded-lg text-amber-300 hover:bg-amber-400/20 text-[10px] flex items-center gap-1 font-semibold"
                                title="منح رتبة باليوزر"
                              >
                                <Crown className="w-3 h-3" />
                                <span className="hidden lg:inline">ترقية</span>
                              </button>
                            )}

                            {onToggleFollow && currentUser?.email.toLowerCase() !== acc.email.toLowerCase() && (
                              <button
                                onClick={() => onToggleFollow(acc.email)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                  isFollowing
                                    ? 'bg-zinc-800 text-zinc-400'
                                    : 'bg-white text-black hover:bg-zinc-200'
                                }`}
                              >
                                {isFollowing ? 'متابع' : 'متابعة'}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-xs text-zinc-400">
                      {searchQuery ? (
                        <span>لا يوجد يوزر مطابق لـ "{searchQuery}"</span>
                      ) : (
                        <span>اكتب أول حرف من اليوزر لتظهر الاقتراحات فوراً</span>
                      )}
                    </div>
                  )}
                </div>

                {onOpenUserExplorer && (
                  <button
                    onClick={() => {
                      onOpenUserExplorer();
                      setIsSearchOpen(false);
                    }}
                    className="w-full p-2 text-center text-xs font-bold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border-t border-white/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>استعراض جميع المصممين والمستخدمين ←</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Actions & User Profile */}
          <div className="flex items-center gap-2.5">
            
            {/* User Search Icon (Opens Modal on mobile/tablet) */}
            {onOpenUserExplorer && (
              <button
                onClick={onOpenUserExplorer}
                className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-all md:hidden"
                title="بحث المستخدمين"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Notification Bell Button (OWNER ONLY) */}
            {isOwner && onOpenNotifications && (
              <button
                onClick={onOpenNotifications}
                className="relative p-2 rounded-xl bg-zinc-900 border border-amber-400/20 text-amber-300 hover:text-amber-200 hover:border-amber-400/50 transition-all"
                title="مركز تنبيهات وبلاغات المالك الأعلى"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            )}

            {/* User Account / Profile */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-zinc-900/90 border border-white/10 rounded-xl p-1.5 pl-3">
                <button
                  onClick={onOpenProfile}
                  className="flex items-center gap-2 text-right hover:opacity-90 transition-opacity"
                  title="تعديل حسابك والسيرة الذاتية"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="w-8 h-8 rounded-full border border-white/20 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white max-w-[100px] truncate">
                        {currentUser.name || currentUser.username}
                      </span>
                      {isOwner && (
                        <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1 rounded font-bold">
                          👑
                        </span>
                      )}
                      {!isOwner && isAdmin && (
                        <span className="text-[10px] bg-blue-400/20 text-blue-300 border border-blue-400/30 px-1 rounded font-bold">
                          ⭐
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 truncate max-w-[110px] font-mono">
                      @{currentUser.username}
                    </span>
                  </div>
                </button>

                <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1">
                  <button
                    onClick={onOpenProfile}
                    title="تعديل الملف الشخصي"
                    className="p-1.5 text-zinc-400 hover:text-white rounded-lg transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onLogout}
                    title="تسجيل الخروج"
                    className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white text-black hover:bg-zinc-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <LogIn className="w-4 h-4" />
                <span>تسجيل الدخول</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white bg-white/5 border border-white/10 2xl:hidden"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="2xl:hidden bg-zinc-950/98 border-b border-white/15 px-4 pt-3 pb-6 backdrop-blur-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          {/* Mobile Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن يوزر مصمم..."
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-sm"
              />
            </div>

            {searchQuery && searchResults.length > 0 && (
              <div className="mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5">
                {searchResults.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => {
                      onSelectUser?.(acc);
                      setMobileMenuOpen(false);
                    }}
                    className="p-3 flex items-center justify-between hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={acc.avatar} alt={acc.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <div className="text-xs font-bold text-white">{acc.name}</div>
                        <div className="text-[10px] font-mono text-zinc-400">@{acc.username}</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-bold">
                      {ROLE_CONFIG[acc.role]?.badge || 'عضو'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {onOpenUserExplorer && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenUserExplorer();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold bg-zinc-900 border border-white/15 text-white text-sm"
              >
                <Users className="w-4 h-4 text-amber-300" />
                <span>استكشاف وبحث المصممين باليوزر</span>
              </button>
            )}

            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold bg-[#5865F2] text-white"
            >
              <span>انضم لسيرفر الديسكورد الرسمي</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {currentUser ? (
              <div className="flex items-center justify-between bg-zinc-900 border border-white/10 p-3 rounded-xl">
                <div 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenProfile?.();
                  }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="w-10 h-10 rounded-full border border-white/20 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      {currentUser.name || currentUser.username}
                      {isOwner && <span className="text-xs text-amber-300">👑 المالك</span>}
                    </div>
                    <div className="text-xs font-mono text-zinc-400">@{currentUser.username}</div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 text-xs text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-3 rounded-xl font-bold bg-white text-black text-center"
              >
                تسجيل الدخول / إنشاء حساب
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
