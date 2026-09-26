import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BannerHero } from './components/BannerHero';
import { StylesSection } from './components/StylesSection';
import { SkillsSection } from './components/SkillsSection';
import { CategoriesSection } from './components/CategoriesSection';
import { TutorialsSection } from './components/TutorialsSection';
import { PresetsSection } from './components/PresetsSection';
import { VideoFeedSection } from './components/VideoFeedSection';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { TutorialModal } from './components/TutorialModal';
import { PresetModal } from './components/PresetModal';
import { UserProfileModal } from './components/UserProfileModal';
import { NotificationsModal } from './components/NotificationsModal';
import { UserSearchModal } from './components/UserSearchModal';
import { GrantRoleModal } from './components/GrantRoleModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';

import {
  OWNER_EMAIL,
  DISCORD_URL,
  MAIN_BANNER_IMAGE,
  INITIAL_STYLES,
  INITIAL_SKILLS,
  INITIAL_CATEGORIES,
  INITIAL_TUTORIALS,
  INITIAL_SHAKES,
  INITIAL_EFFECTS_COURSES,
  INITIAL_CC_FIVEM,
  INITIAL_USER_VIDEOS,
  INITIAL_NOTIFICATIONS,
  EditStyle,
  EditSkill,
  EditCategory,
  TutorialItem,
  PresetItem,
  UserVideo,
  AdminUser,
  AppNotification,
  VideoComment,
} from './data/editData';

import { 
  RegisteredAccount, 
  getAllAccounts, 
  checkIsOwner, 
  UserRole,
  ROLE_CONFIG 
} from './services/authService';

import { 
  safeGetStorage, 
  safeGetString, 
  safeSetStorage, 
  safeSetString, 
  safeRemoveStorage 
} from './utils/storage';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');

  // Main Banner State (Editable by Owner from phone)
  const [bannerImage, setBannerImage] = useState<string>(() => {
    return safeGetString('21foredit_banner', MAIN_BANNER_IMAGE);
  });

  // Authentication State (Email, Password, Name & @Username)
  const [currentUser, setCurrentUser] = useState<{ 
    email: string; 
    username: string; 
    avatar: string; 
    name?: string; 
    role?: string;
    bio?: string;
  } | null>(() => {
    const defaultOwner = {
      email: OWNER_EMAIL,
      username: 'shanks95816',
      name: 'أحمد (Shanks)',
      avatar: 'https://i.top4top.io/p_391173gui0.jpg',
      role: 'owner',
      bio: 'مؤسس ومالك منصة 21foredit 👑 | محترف مونتاج الأفتر إيفكتس ولايت موشن',
    };
    return safeGetStorage('21foredit_user', defaultOwner);
  });

  // Admins List State
  const [adminsList, setAdminsList] = useState<AdminUser[]>(() => {
    const defaultAdmins = [
      {
        email: 'talon@21foredit.vip',
        username: 'talon',
        role: 'admin' as const,
        addedAt: '2026-09-20'
      }
    ];
    return safeGetStorage('21foredit_admins', defaultAdmins);
  });

  // Content States with LocalStorage Persistence
  const [styles, setStyles] = useState<EditStyle[]>(() => {
    return safeGetStorage('21foredit_styles', INITIAL_STYLES);
  });

  const [skills, setSkills] = useState<EditSkill[]>(() => {
    return safeGetStorage('21foredit_skills', INITIAL_SKILLS);
  });

  const [categories, setCategories] = useState<EditCategory[]>(() => {
    return safeGetStorage('21foredit_categories', INITIAL_CATEGORIES);
  });

  const [tutorials, setTutorials] = useState<TutorialItem[]>(() => {
    return safeGetStorage('21foredit_tutorials', INITIAL_TUTORIALS);
  });

  const [allPresets, setAllPresets] = useState<PresetItem[]>(() => {
    return safeGetStorage('21foredit_presets', [...INITIAL_SHAKES, ...INITIAL_EFFECTS_COURSES, ...INITIAL_CC_FIVEM]);
  });

  const [userVideos, setUserVideos] = useState<UserVideo[]>(() => {
    return safeGetStorage('21foredit_videos', INITIAL_USER_VIDEOS);
  });

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<RegisteredAccount | null>(null);

  const [grantRoleState, setGrantRoleState] = useState<{ isOpen: boolean; username: string }>({
    isOpen: false,
    username: '',
  });

  const [tutorialModalState, setTutorialModalState] = useState<{ isOpen: boolean; data: TutorialItem | null }>({
    isOpen: false,
    data: null,
  });
  const [presetModalState, setPresetModalState] = useState<{ isOpen: boolean; data: PresetItem | null }>({
    isOpen: false,
    data: null,
  });

  // Banned Users State
  const [bannedEmails, setBannedEmails] = useState<string[]>(() => {
    return safeGetStorage('21foredit_banned', []);
  });

  // Followings State
  const [followings, setFollowings] = useState<{ [email: string]: boolean }>(() => {
    return safeGetStorage('21foredit_followings', {});
  });

  // Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    return safeGetStorage('21foredit_notifications', INITIAL_NOTIFICATIONS);
  });

  const [, setForceUpdate] = useState(0);

  // Save to LocalStorage safely
  useEffect(() => {
    if (currentUser) safeSetStorage('21foredit_user', currentUser);
    else safeRemoveStorage('21foredit_user');
  }, [currentUser]);

  useEffect(() => {
    safeSetStorage('21foredit_admins', adminsList);
  }, [adminsList]);

  useEffect(() => {
    safeSetStorage('21foredit_styles', styles);
  }, [styles]);

  useEffect(() => {
    safeSetStorage('21foredit_skills', skills);
  }, [skills]);

  useEffect(() => {
    safeSetStorage('21foredit_categories', categories);
  }, [categories]);

  useEffect(() => {
    safeSetStorage('21foredit_tutorials', tutorials);
  }, [tutorials]);

  useEffect(() => {
    safeSetStorage('21foredit_presets', allPresets);
  }, [allPresets]);

  useEffect(() => {
    try {
      const safeVideos = userVideos.map(v => {
        if (v.videoUrl && (v.videoUrl.startsWith('data:') || v.videoUrl.startsWith('blob:')) && v.videoUrl.length > 50000) {
          return { ...v, videoUrl: '[offline_stored]' };
        }
        return v;
      });
      safeSetStorage('21foredit_videos', safeVideos);
    } catch (e) {
      console.warn('Could not save videos to localStorage:', e);
    }
  }, [userVideos]);

  useEffect(() => {
    safeSetString('21foredit_banner', bannerImage);
  }, [bannerImage]);

  useEffect(() => {
    safeSetStorage('21foredit_banned', bannedEmails);
  }, [bannedEmails]);

  useEffect(() => {
    safeSetStorage('21foredit_followings', followings);
  }, [followings]);

  useEffect(() => {
    safeSetStorage('21foredit_notifications', notifications);
  }, [notifications]);

  // Permissions Check
  const isOwner = currentUser 
    ? checkIsOwner(currentUser.email) || checkIsOwner(currentUser.username)
    : false;

  const isAdmin = isOwner || (
    currentUser?.role === 'admin' || 
    currentUser?.role === 'developer' || 
    adminsList.some(a => a.email.toLowerCase() === currentUser?.email.toLowerCase())
  );

  // User Actions
  const handleLogin = (user: { email: string; username: string; avatar: string; name?: string; role?: string }) => {
    setCurrentUser(user);
    const welcomeNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'upload',
      title: 'تسجيل دخول ناجح',
      message: `مرحباً بك يا ${user.name || user.username} في 21foredit!`,
      timestamp: 'الآن',
      read: false,
    };
    setNotifications(prev => [welcomeNotif, ...prev]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Follow Handler
  const handleToggleFollow = (authorEmail: string) => {
    const key = authorEmail.toLowerCase();
    const isNowFollowing = !followings[key];
    setFollowings(prev => ({ ...prev, [key]: isNowFollowing }));

    if (isNowFollowing && currentUser) {
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        type: 'follow',
        title: 'متابع جديد',
        message: `قام المصمم ${currentUser.name || currentUser.username} بمتابعتك!`,
        timestamp: 'الآن',
        read: false,
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  // Comments Handlers
  const handleAddComment = (videoId: string, commentData: Omit<VideoComment, 'id' | 'createdAt'>) => {
    const newComment: VideoComment = {
      ...commentData,
      id: `comm-${Date.now()}`,
      createdAt: 'الآن',
    };

    setUserVideos(prev =>
      prev.map(v => {
        if (v.id === videoId) {
          const updatedComments = [...(v.comments || []), newComment];
          return { ...v, comments: updatedComments };
        }
        return v;
      })
    );

    const targetVideo = userVideos.find(v => v.id === videoId);
    if (targetVideo && currentUser) {
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        type: 'comment',
        title: `تعليق جديد على ${targetVideo.title}`,
        message: `${currentUser.name || currentUser.username}: "${commentData.text}"`,
        timestamp: 'الآن',
        read: false,
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const handleDeleteComment = (videoId: string, commentId: string) => {
    setUserVideos(prev =>
      prev.map(v => {
        if (v.id === videoId && v.comments) {
          return { ...v, comments: v.comments.filter(c => c.id !== commentId) };
        }
        return v;
      })
    );
  };

  // Report & Ban Handlers
  const handleReportVideo = (
    videoId: string,
    videoTitle: string,
    reportedUserEmail: string,
    reportedUserName: string,
    reason: string
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'report',
      title: `⚠️ بلاغ عن فيديو: ${videoTitle}`,
      message: `أبلغ مستخدم عن المصمم ${reportedUserName} (${reportedUserEmail}) بسبب: ${reason}`,
      timestamp: 'الآن',
      read: false,
      reportedUserEmail,
      reportedVideoId: videoId,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleBanUser = (email: string) => {
    const cleanEmail = email.toLowerCase();
    if (cleanEmail === OWNER_EMAIL.toLowerCase()) return;
    if (!bannedEmails.includes(cleanEmail)) {
      setBannedEmails(prev => [...prev, cleanEmail]);
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        type: 'ban',
        title: '🚫 تم تبنيد مستخدم',
        message: `تم حظر المستخدم ${cleanEmail} من النشر والتعليق في الموقع.`,
        timestamp: 'الآن',
        read: false,
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const handleDeleteReportedVideo = (videoId: string) => {
    setUserVideos(prev => prev.filter(v => v.id !== videoId));
  };

  const handleUpdateProfile = (updated: { username: string; avatar: string; bio?: string; name?: string }) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      name: updated.name || currentUser.name,
      username: updated.username,
      avatar: updated.avatar,
      bio: updated.bio,
    };
    setCurrentUser(updatedUser);
  };

  const handleSelectUserFromSearch = (user: RegisteredAccount) => {
    setViewingUser(user);
    setIsProfileOpen(true);
  };

  const handleRoleGranted = (username: string, role: UserRole) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'upload',
      title: `👑 تعيين صلاحيات لـ @${username}`,
      message: `تم منح اليوزر @${username} رتبة ${ROLE_CONFIG[role].label} بنجاح.`,
      timestamp: 'الآن',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
    setForceUpdate(p => p + 1);

    // If granted to current user, update role in state
    if (currentUser && currentUser.username.toLowerCase() === username.toLowerCase()) {
      setCurrentUser(prev => prev ? { ...prev, role } : null);
    }
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const currentUserTotalLikes = currentUser
    ? userVideos
        .filter(v => v.authorEmail.toLowerCase() === currentUser.email.toLowerCase())
        .reduce((sum, v) => sum + v.likes, 0)
    : 0;

  const followingCount = Object.values(followings).filter(Boolean).length;

  // Tutorial CRUD
  const handleSaveTutorial = (tut: TutorialItem) => {
    setTutorials(prev => {
      const exists = prev.some(t => t.id === tut.id);
      if (exists) return prev.map(t => t.id === tut.id ? tut : t);
      return [tut, ...prev];
    });
  };

  const handleDeleteTutorial = (id: string) => {
    setTutorials(prev => prev.filter(t => t.id !== id));
  };

  // Preset CRUD
  const handleSavePreset = (preset: PresetItem) => {
    setAllPresets(prev => {
      const exists = prev.some(p => p.id === preset.id);
      if (exists) return prev.map(p => p.id === preset.id ? preset : p);
      return [preset, ...prev];
    });
  };

  const handleDeletePreset = (id: string) => {
    setAllPresets(prev => prev.filter(p => p.id !== id));
  };

  // Video CRUD
  const handleUploadVideo = (
    newVidData: Omit<UserVideo, 'id' | 'likes' | 'views' | 'createdAt'>,
    _fileBlob?: File | Blob,
    customId?: string
  ) => {
    const newVideo: UserVideo = {
      ...newVidData,
      id: customId || `vid-${Date.now()}`,
      likes: 1,
      views: 12,
      createdAt: 'الآن',
    };
    setUserVideos(prev => [newVideo, ...prev]);
  };

  const handleDeleteVideo = (id: string) => {
    setUserVideos(prev => prev.filter(v => v.id !== id));
  };

  // Style CRUD
  const handleDeleteStyle = (id: string) => {
    setStyles(prev => prev.filter(s => s.id !== id));
  };

  // Skill CRUD
  const handleDeleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  // Category CRUD
  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#050505] text-[#f3f4f6] flex flex-col bg-noise relative">
      
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-zinc-500/[0.03] rounded-full blur-[140px]" />
      </div>

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        adminsList={adminsList}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenProfile={() => {
          setViewingUser(null);
          setIsProfileOpen(true);
        }}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadNotificationsCount={notifications.filter(n => !n.read).length}
        onSelectUser={handleSelectUserFromSearch}
        onOpenUserExplorer={() => setIsUserSearchOpen(true)}
        onOpenGrantRole={(u) => setGrantRoleState({ isOpen: true, username: u })}
        followings={followings}
        onToggleFollow={handleToggleFollow}
      />

      {/* Dynamic Content Views */}
      <main className="flex-1 relative z-10">
        
        {activeTab === 'home' && (
          <div className="space-y-12">
            <BannerHero
              onNavigate={setActiveTab}
              bannerImage={bannerImage}
              onUpdateBanner={setBannerImage}
              isOwner={isOwner}
              onOpenUpload={() => {
                if (!currentUser) setIsAuthOpen(true);
                else setActiveTab('community');
              }}
            />

            {/* Quick Teaser for Styles */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <StylesSection
                styles={styles.slice(0, 6)}
                isAdmin={isAdmin}
                onDeleteStyle={handleDeleteStyle}
              />
              <div className="text-center pb-8">
                <button
                  onClick={() => setActiveTab('styles')}
                  className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all hover:scale-105"
                >
                  استعراض جميع ستايلات الـ Edit (+12 ستايل) ←
                </button>
              </div>
            </div>

            {/* Quick Teaser for Tutorials */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-12">
              <TutorialsSection
                tutorials={tutorials}
                isAdmin={isAdmin}
                isOwner={isOwner}
                onEditTutorial={(t) => setTutorialModalState({ isOpen: true, data: t })}
                onDeleteTutorial={handleDeleteTutorial}
                onAddTutorial={() => setTutorialModalState({ isOpen: true, data: null })}
              />
            </div>

            {/* Quick Teaser for Shakes & CC */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-12">
              <PresetsSection
                title="أبرز شيكات الـ XML وتصحيح ألوان FiveM"
                subtitle="مشاريع جاهزة للتنزيل المباشر والاستيراد في لايت موشن وأفتر إيفكتس"
                initialType="all"
                items={allPresets.slice(0, 8)}
                isAdmin={isAdmin}
                isOwner={isOwner}
                onEditPreset={(p) => setPresetModalState({ isOpen: true, data: p })}
                onDeletePreset={handleDeletePreset}
                onAddPreset={() => setPresetModalState({ isOpen: true, data: null })}
              />
            </div>
          </div>
        )}

        {activeTab === 'styles' && (
          <StylesSection
            styles={styles}
            isAdmin={isAdmin}
            onDeleteStyle={handleDeleteStyle}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsSection
            skills={skills}
            isAdmin={isAdmin}
            onDeleteSkill={handleDeleteSkill}
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesSection
            categories={categories}
            isAdmin={isAdmin}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        {activeTab === 'tutorials' && (
          <TutorialsSection
            tutorials={tutorials}
            isAdmin={isAdmin}
            isOwner={isOwner}
            onEditTutorial={(t) => setTutorialModalState({ isOpen: true, data: t })}
            onDeleteTutorial={handleDeleteTutorial}
            onAddTutorial={() => setTutorialModalState({ isOpen: true, data: null })}
          />
        )}

        {activeTab === 'shakes' && (
          <PresetsSection
            title="شيكات الـ XML الاحترافية"
            subtitle="شيكات سموذ، هارد، دبل شيك، وشيكات ديناميكية جاهزة للتحميل"
            initialType="shake"
            items={allPresets.filter(p => p.type === 'shake')}
            isAdmin={isAdmin}
            isOwner={isOwner}
            onEditPreset={(p) => setPresetModalState({ isOpen: true, data: p })}
            onDeletePreset={handleDeletePreset}
            onAddPreset={() => setPresetModalState({ isOpen: true, data: null })}
          />
        )}

        {activeTab === 'effects' && (
          <PresetsSection
            title="افكتات وكورسات إيدت متقدمة"
            subtitle="مؤثرات تكست مع شيك، إفكتات بصرية VFX، وكورسات مشاريع مقدمات جاهزة"
            initialType="effect"
            items={allPresets.filter(p => p.type === 'effect' || p.type === 'course')}
            isAdmin={isAdmin}
            isOwner={isOwner}
            onEditPreset={(p) => setPresetModalState({ isOpen: true, data: p })}
            onDeletePreset={handleDeletePreset}
            onAddPreset={() => setPresetModalState({ isOpen: true, data: null })}
          />
        )}

        {activeTab === 'cc' && (
          <PresetsSection
            title="تصحيح ألوان FiveM & CC Dark"
            subtitle="تونات ليلية وسينمائية داكنة مخصصة لمقاطع FiveM، GTA V، والأنمي"
            initialType="cc"
            items={allPresets.filter(p => p.type === 'cc')}
            isAdmin={isAdmin}
            isOwner={isOwner}
            onEditPreset={(p) => setPresetModalState({ isOpen: true, data: p })}
            onDeletePreset={handleDeletePreset}
            onAddPreset={() => setPresetModalState({ isOpen: true, data: null })}
          />
        )}

        {activeTab === 'community' && (
          <VideoFeedSection
            videos={userVideos}
            currentUser={currentUser}
            isAdmin={isAdmin}
            isOwner={isOwner}
            bannedEmails={bannedEmails}
            followings={followings}
            onToggleFollow={handleToggleFollow}
            onUploadVideo={handleUploadVideo}
            onDeleteVideo={handleDeleteVideo}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onReportVideo={handleReportVideo}
            onBanUser={handleBanUser}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeTab === 'admin' && isAdmin && currentUser && (
          <AdminPanel
            currentUser={currentUser}
            onOpenAddTutorial={() => setTutorialModalState({ isOpen: true, data: null })}
            onOpenAddPreset={() => setPresetModalState({ isOpen: true, data: null })}
            onOpenUserSearch={() => setIsUserSearchOpen(true)}
            tutorialsCount={tutorials.length}
            presetsCount={allPresets.length}
            videosCount={userVideos.length}
            onRefreshUsers={() => setForceUpdate(p => p + 1)}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Authentication Modal (Email, Password, Name, @Username) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />

      {/* Grant Role By Username Modal */}
      <GrantRoleModal
        isOpen={grantRoleState.isOpen}
        initialUsername={grantRoleState.username}
        onClose={() => setGrantRoleState({ isOpen: false, username: '' })}
        onRoleGranted={handleRoleGranted}
      />

      {/* User Search & Explorer Modal */}
      <UserSearchModal
        isOpen={isUserSearchOpen}
        onClose={() => setIsUserSearchOpen(false)}
        currentUser={currentUser}
        onSelectUser={handleSelectUserFromSearch}
        onGrantRole={(u) => setGrantRoleState({ isOpen: true, username: u })}
        followings={followings}
        onToggleFollow={handleToggleFollow}
        isOwner={isOwner}
      />

      <TutorialModal
        isOpen={tutorialModalState.isOpen}
        initialData={tutorialModalState.data}
        isOwner={isOwner}
        onClose={() => setTutorialModalState({ isOpen: false, data: null })}
        onSave={handleSaveTutorial}
      />

      <PresetModal
        isOpen={presetModalState.isOpen}
        initialData={presetModalState.data}
        isOwner={isOwner}
        onClose={() => setPresetModalState({ isOpen: false, data: null })}
        onSave={handleSavePreset}
      />

      {currentUser && (
        <UserProfileModal
          isOpen={isProfileOpen}
          onClose={() => {
            setIsProfileOpen(false);
            setViewingUser(null);
          }}
          currentUser={currentUser}
          targetUser={viewingUser}
          onUpdateProfile={handleUpdateProfile}
          totalLikesReceived={viewingUser ? viewingUser.totalLikesReceived : currentUserTotalLikes}
          followersCount={viewingUser ? viewingUser.followersCount : Math.floor(currentUserTotalLikes * 0.4) + 12}
          followingCount={viewingUser ? viewingUser.followingCount : followingCount}
          adminsList={adminsList}
          onOpenGrantRole={(u) => setGrantRoleState({ isOpen: true, username: u })}
          isFollowing={viewingUser ? !!followings[viewingUser.email.toLowerCase()] : false}
          onToggleFollow={handleToggleFollow}
        />
      )}

      {isOwner && (
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkNotificationAsRead}
          onClearAll={handleClearAllNotifications}
          onBanUser={handleBanUser}
          onDeleteReportedVideo={handleDeleteReportedVideo}
          isOwner={isOwner}
        />
      )}

      </div>
    </ErrorBoundary>
  );
}
