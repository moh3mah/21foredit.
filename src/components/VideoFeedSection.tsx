import React, { useState, useMemo, useEffect } from 'react';
import { 
  Upload, Film, Heart, Eye, Share2, Play, 
  Trash2, Sparkles, Filter, Check, User, Video, 
  ExternalLink, Layers, CheckCircle, ShieldCheck, 
  MessageSquare, UserPlus, UserCheck, Flag, UserX, Crown, Lock, RefreshCw, Send, X, AlertCircle 
} from 'lucide-react';
import { UserVideo, VideoComment, OWNER_EMAIL } from '../data/editData';
import { saveVideoBlob, getVideoBlob } from '../services/videoStorage';

interface VideoFeedSectionProps {
  videos: UserVideo[];
  currentUser: { email: string; username: string; avatar: string; name?: string; role?: string } | null;
  isAdmin: boolean;
  isOwner?: boolean;
  bannedEmails: string[];
  followings: { [authorEmail: string]: boolean };
  onToggleFollow: (authorEmail: string) => void;
  onUploadVideo: (video: Omit<UserVideo, 'id' | 'likes' | 'views' | 'createdAt'>, fileBlob?: File | Blob, customId?: string) => void;
  onDeleteVideo: (id: string) => void;
  onAddComment: (videoId: string, comment: Omit<VideoComment, 'id' | 'createdAt'>) => void;
  onDeleteComment: (videoId: string, commentId: string) => void;
  onReportVideo: (videoId: string, videoTitle: string, reportedUserEmail: string, reportedUserName: string, reason: string) => void;
  onBanUser: (email: string) => void;
  onOpenAuth: () => void;
}

export const VideoFeedSection: React.FC<VideoFeedSectionProps> = ({
  videos = [],
  currentUser,
  isAdmin,
  isOwner = false,
  bannedEmails = [],
  followings = {},
  onToggleFollow,
  onUploadVideo,
  onDeleteVideo,
  onAddComment,
  onDeleteComment,
  onReportVideo,
  onBanUser,
  onOpenAuth,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'my-media'>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [sharedVideo, setSharedVideo] = useState<UserVideo | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const [likedMap, setLikedMap] = useState<{ [id: string]: boolean }>({});

  // Active Comments Drawer
  const [activeCommentsVideo, setActiveCommentsVideo] = useState<UserVideo | null>(null);
  const [commentInput, setCommentInput] = useState('');

  // Report Modal
  const [reportingVideo, setReportingVideo] = useState<UserVideo | null>(null);
  const [reportReason, setReportReason] = useState('سرقة حقوق مونتاج وتصميم');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resolution, setResolution] = useState<'1080p' | '2K' | '4K'>('4K');
  const [fps, setFps] = useState<'30' | '60' | '120'>('120');
  const [software, setSoftware] = useState('Alight Motion');
  const [style, setStyle] = useState('Velocity & Smooth');
  const [category, setCategory] = useState('Flex Edit Official');
  const [xmlDownloadUrl, setXmlDownloadUrl] = useState('');
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Local object URLs mapping for IndexedDB restored videos
  const [resolvedVideoUrls, setResolvedVideoUrls] = useState<{ [id: string]: string }>({});

  const currentUserEmail = (currentUser?.email || '').toLowerCase();
  const isCurrentUserBanned = currentUser ? bannedEmails.includes(currentUserEmail) : false;

  // Restore any local indexedDB videos on mount
  useEffect(() => {
    let isMounted = true;
    const loadBlobs = async () => {
      const newUrls: { [id: string]: string } = {};
      for (const v of videos) {
        if (!v.videoUrl || v.videoUrl.includes('[offline_stored]') || v.videoUrl.startsWith('blob:')) {
          try {
            const blob = await getVideoBlob(v.id);
            if (blob && isMounted) {
              newUrls[v.id] = URL.createObjectURL(blob);
            }
          } catch {}
        }
      }
      if (isMounted && Object.keys(newUrls).length > 0) {
        setResolvedVideoUrls(prev => ({ ...prev, ...newUrls }));
      }
    };
    loadBlobs();
    return () => {
      isMounted = false;
    };
  }, [videos]);

  // Calculate total likes per author with full null-safety
  const authorLikesMap = useMemo(() => {
    const map: { [email: string]: number } = {};
    (videos || []).forEach(v => {
      const email = (v.authorEmail || '').toLowerCase();
      if (email) {
        map[email] = (map[email] || 0) + (v.likes || 0);
      }
    });
    return map;
  }, [videos]);

  // Fast, instant and safe File Upload using URL.createObjectURL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|mov|webm|mkv)$/i)) {
        setUploadError('يرجى اختيار ملف فيديو صالح (MP4, MOV, WEBM)');
        return;
      }

      setUploadFileLoading(true);
      try {
        // Fast instant local Object URL without high memory usage
        const objectUrl = URL.createObjectURL(file);
        setVideoUrl(objectUrl);
        setSelectedFile(file);
        setUploadFileLoading(false);
      } catch (err) {
        console.error('File preview error:', err);
        setUploadError('تعذر قراءة ملف الفيديو، يرجى المحاولة مرة أخرى');
        setUploadFileLoading(false);
      }
    }
  };

  const handleOpenUploadModal = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (isCurrentUserBanned) {
      alert('⚠️ تم تبنيد حسابك من قبل إدارة الموقع بسبب مخالفة القوانين. لا يمكنك النشر.');
      return;
    }
    setUploadError(null);
    setIsUploadModalOpen(true);
  };

  const handleSubmitUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (isCurrentUserBanned) return;
    if (!title.trim() || !videoUrl.trim()) {
      setUploadError('يرجى إدخال عنوان الإيدت واختيار أو إدخال رابط الفيديو');
      return;
    }

    try {
      const generatedId = `vid-${Date.now()}`;

      // If user uploaded a physical file, store blob permanently in IndexedDB
      if (selectedFile) {
        try {
          await saveVideoBlob(generatedId, selectedFile);
        } catch (dbErr) {
          console.warn('Could not cache file in IndexedDB:', dbErr);
        }
      }

      onUploadVideo(
        {
          title: title.trim(),
          description: description.trim(),
          videoUrl: videoUrl,
          resolution,
          fps,
          software,
          style: style.trim() || 'Velocity & Smooth',
          category: category.trim() || 'Flex Edit Official',
          xmlDownloadUrl: xmlDownloadUrl.trim() || undefined,
          authorName: currentUser.name || currentUser.username,
          authorEmail: currentUser.email,
          authorAvatar: currentUser.avatar,
          isOwnerPost: currentUser.email.toLowerCase() === OWNER_EMAIL.toLowerCase(),
          comments: []
        },
        selectedFile || undefined,
        generatedId
      );

      // Reset
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setSelectedFile(null);
      setXmlDownloadUrl('');
      setIsUploadModalOpen(false);
    } catch (err) {
      console.error('Upload submit error:', err);
      setUploadError('حدث خطأ أثناء معالجة ونشر الفيديو، يرجى المحاولة مرة أخرى');
    }
  };

  const handleToggleLike = (id: string) => {
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenShare = (video: UserVideo) => {
    setSharedVideo(video);
    setCopiedShare(false);
  };

  const handleCopyShareLink = () => {
    if (!sharedVideo) return;
    const shareText = `شاهد إيدت: "${sharedVideo.title}" بجودة ${sharedVideo.resolution} @ ${sharedVideo.fps} FPS على منصة 21foredit!\nالرابط: https://21foredit.vip/watch?id=${sharedVideo.id}\nجميع الحقوق محفوظة لمنصة 21foredit ©`;
    try {
      navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 3000);
    } catch {}
  };

  const handleAddCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (isCurrentUserBanned) {
      alert('⚠️ حسابك مبند من التعليق.');
      return;
    }
    if (!activeCommentsVideo || !commentInput.trim()) return;

    onAddComment(activeCommentsVideo.id, {
      videoId: activeCommentsVideo.id,
      authorEmail: currentUser.email,
      authorName: currentUser.name || currentUser.username,
      authorAvatar: currentUser.avatar,
      text: commentInput.trim(),
      isOwner: currentUser.email.toLowerCase() === OWNER_EMAIL.toLowerCase(),
      isAdmin: isAdmin,
    });

    setCommentInput('');
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingVideo) return;

    onReportVideo(
      reportingVideo.id,
      reportingVideo.title,
      reportingVideo.authorEmail,
      reportingVideo.authorName,
      reportReason
    );

    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setReportingVideo(null);
    }, 1500);
  };

  const safeVideos = videos || [];
  const displayedVideos = activeTab === 'all' 
    ? safeVideos 
    : safeVideos.filter(v => (v.authorEmail || '').toLowerCase() === currentUserEmail);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-zinc-300 mb-3">
            <Film className="w-3.5 h-3.5 text-white" />
            <span>مجتمع الإيديتورز • 4K UHD & 120 FPS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            نشر ومشاركة الفيديوهات
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            انشر إيدتاتك ومقاطعك الخاصة بدقة تصل إلى 4K ومعدل إطارات 120 FPS مع علامة وحقوق موقع 21foredit، تابع المصممين، وعلق على أعمالهم.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleOpenUploadModal}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105"
          >
            {currentUser ? <Upload className="w-4 h-4 text-black" /> : <Lock className="w-4 h-4 text-black" />}
            <span>نشر فيديو جديد (4K / 120fps)</span>
          </button>
        </div>
      </div>

      {/* Tabs: All Videos vs My Media */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-black font-bold shadow-md'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white'
            }`}
          >
            استكشاف كل الفيديوهات ({safeVideos.length})
          </button>

          <button
            onClick={() => {
              if (!currentUser) onOpenAuth();
              else setActiveTab('my-media');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'my-media'
                ? 'bg-white text-black font-bold shadow-md'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>قائمة صوري وفيديوهاتي</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>تشغيل فيديو مستقر وبدون تقطيع</span>
        </div>
      </div>

      {/* Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedVideos.map((video) => {
          const videoAuthorEmail = (video.authorEmail || '').toLowerCase();
          const isLiked = !!likedMap[video.id];
          const isFollowing = !!followings[videoAuthorEmail];
          const authorTotalLikes = authorLikesMap[videoAuthorEmail] || video.likes || 0;
          const isAuthorOwner = videoAuthorEmail === OWNER_EMAIL.toLowerCase();
          const isAuthorBanned = bannedEmails.includes(videoAuthorEmail);
          const commentsCount = (video.comments || []).length;
          const canDelete = isAdmin || (currentUser && currentUserEmail === videoAuthorEmail);

          // Get active playback URL (supporting IndexedDB restored blob URLs)
          const activeSrc = resolvedVideoUrls[video.id] || video.videoUrl;

          return (
            <div
              key={video.id}
              className={`rounded-3xl border overflow-hidden glass-panel-hover flex flex-col justify-between shadow-2xl transition-all ${
                isAuthorBanned ? 'border-red-500/40 bg-red-950/20 opacity-80' : 'border-white/10 bg-zinc-950/90'
              }`}
            >
              {/* Video Player */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden border-b border-white/10">
                {activeSrc && !activeSrc.includes('[offline_stored]') ? (
                  <video
                    key={activeSrc}
                    src={activeSrc}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain"
                  >
                    متصفحك لا يدعم تشغيل الفيديو.
                  </video>
                ) : (
                  <div className="p-4 text-center text-zinc-500 text-xs">
                    <Film className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
                    <span>فيديو محلي محفوظ</span>
                  </div>
                )}

                {/* Quality Badges */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 pointer-events-none z-10">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 font-mono">
                    {video.resolution || '4K'}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 font-mono">
                    {video.fps || '120'} FPS
                  </span>
                </div>

                {/* Watermark Branding */}
                <div className="absolute bottom-2 left-2 pointer-events-none text-[9px] text-white/50 font-mono tracking-widest bg-black/60 px-2 py-0.5 rounded">
                  21foredit VIP
                </div>
              </div>

              {/* Card Meta & Author */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  
                  {/* Author Header Row with Follow and Likes */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={video.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                        alt={video.authorName || 'المصمم'}
                        className="w-9 h-9 rounded-full border border-white/20 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold text-white max-w-[110px] truncate">
                            {video.authorName || 'مصمم 21'}
                          </span>
                          {isAuthorOwner && (
                            <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1 rounded font-bold">
                              👑 المالك
                            </span>
                          )}
                          {isAuthorBanned && (
                            <span className="text-[9px] bg-red-500/20 text-red-300 border border-red-500/30 px-1 rounded font-bold">
                              🚫 محظور
                            </span>
                          )}
                        </div>

                        {/* Author Total Likes Count Display */}
                        <div className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                          <Heart className="w-3 h-3 text-red-400 fill-current" />
                          <span>{authorTotalLikes} لايك على منشوراته</span>
                        </div>
                      </div>
                    </div>

                    {/* Follow button */}
                    {currentUserEmail !== videoAuthorEmail && (
                      <button
                        onClick={() => onToggleFollow(video.authorEmail)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                          isFollowing
                            ? 'bg-zinc-800 text-zinc-300 border border-white/10 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/20'
                            : 'bg-white text-black hover:bg-zinc-200 shadow-md'
                        }`}
                      >
                        {isFollowing ? (
                          <>
                            <UserCheck className="w-3 h-3" />
                            <span>متابع</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3 h-3" />
                            <span>متابعة</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-black text-white mb-1.5 tracking-tight line-clamp-1">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                      {video.description}
                    </p>
                  )}

                  {/* Tags & Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-mono">
                      {video.software}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                      {video.style}
                    </span>
                    {video.category && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-400">
                        {video.category}
                      </span>
                    )}
                  </div>

                  {/* XML Download Link if attached */}
                  {video.xmlDownloadUrl && (
                    <a
                      href={video.xmlDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-200 transition-colors mb-4 group"
                    >
                      <span className="font-semibold">تنزيل مشروع الـ XML المستخدم</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                    </a>
                  )}

                </div>

                {/* Footer Controls: Like, Comment, Share, Report, Delete */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Like Button */}
                    <button
                      onClick={() => handleToggleLike(video.id)}
                      className={`flex items-center gap-1 text-xs font-bold transition-transform active:scale-125 ${
                        isLiked ? 'text-red-400' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      <span className="font-mono">{video.likes + (isLiked ? 1 : 0)}</span>
                    </button>

                    {/* Comments Button */}
                    <button
                      onClick={() => setActiveCommentsVideo(video)}
                      className="flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="font-mono">{commentsCount}</span>
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={() => handleOpenShare(video)}
                      className="text-zinc-400 hover:text-white p-1"
                      title="مشاركة الفيديو"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Report Button */}
                    {currentUserEmail !== videoAuthorEmail && (
                      <button
                        onClick={() => setReportingVideo(video)}
                        className="text-zinc-500 hover:text-amber-400 p-1"
                        title="إبلاغ الإدارة عن هذا الفيديو"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Delete Button */}
                    {canDelete && (
                      <button
                        onClick={() => onDeleteVideo(video.id)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        title="حذف هذا الفيديو"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {displayedVideos.length === 0 && (
        <div className="text-center py-20 border border-dashed border-white/15 rounded-3xl bg-zinc-950/40">
          <Film className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">لا توجد فيديوهات في هذا القسم حالياً</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
            كن أول من ينشر إيدته بجودة 4K و 120 FPS في مجتمع 21foredit!
          </p>
          <button
            onClick={handleOpenUploadModal}
            className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all shadow-md"
          >
            نشر فيديو الآن
          </button>
        </div>
      )}

      {/* Comments Drawer / Modal */}
      {activeCommentsVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col bg-zinc-950 border border-white/20 rounded-3xl p-6 glass-panel shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-white" />
                <h4 className="text-base font-bold text-white">التعليقات على: {activeCommentsVideo.title}</h4>
              </div>
              <button
                onClick={() => setActiveCommentsVideo(null)}
                className="p-1.5 rounded-xl bg-white/5 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
              {(activeCommentsVideo.comments && activeCommentsVideo.comments.length > 0) ? (
                activeCommentsVideo.comments.map((comm) => {
                  const canDeleteComm = isAdmin || (currentUser && currentUserEmail === (comm.authorEmail || '').toLowerCase());
                  return (
                    <div key={comm.id} className="p-3 rounded-2xl bg-zinc-900 border border-white/5 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <img
                          src={comm.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                          alt={comm.authorName}
                          className="w-7 h-7 rounded-full border border-white/20 object-cover mt-0.5"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">{comm.authorName}</span>
                            {comm.isOwner && <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1 rounded font-bold">👑 مالك</span>}
                            {comm.isAdmin && !comm.isOwner && <span className="text-[9px] bg-blue-400/20 text-blue-300 px-1 rounded font-bold">مشرف</span>}
                            <span className="text-[10px] text-zinc-500 font-mono">{comm.createdAt}</span>
                          </div>
                          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{comm.text}</p>
                        </div>
                      </div>

                      {canDeleteComm && (
                        <button
                          onClick={() => onDeleteComment(activeCommentsVideo.id, comm.id)}
                          className="text-zinc-500 hover:text-red-400 p-1"
                          title="حذف التعليق"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-zinc-500 text-xs">
                  لا توجد تعليقات بعد. كن أول من يكتب تعليقاً!
                </div>
              )}
            </div>

            {/* Add Comment Input Form */}
            {currentUser ? (
              <form onSubmit={handleAddCommentSubmit} className="flex items-center gap-2 pt-3 border-t border-white/10">
                <input
                  type="text"
                  required
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="اكتب تعليقك هنا..."
                  className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center pt-3 border-t border-white/10">
                <button
                  onClick={onOpenAuth}
                  className="text-xs text-amber-300 hover:underline font-bold"
                >
                  سجل دخولك لكتابة تعليق
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-zinc-950 border border-white/20 rounded-3xl p-6 glass-panel shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-amber-400" />
                <h4 className="text-base font-bold text-white">إرسال بلاغ لإدارة الموقع</h4>
              </div>
              <button
                onClick={() => setReportingVideo(null)}
                className="p-1 rounded-xl bg-white/5 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="text-center py-6 text-emerald-400 text-sm font-bold">
                ✓ تم إرسال البلاغ بنجاح إلى قائمة تنبيهات المالك والمشرفين!
              </div>
            ) : (
              <form onSubmit={handleSendReport} className="space-y-4">
                <div className="text-xs text-zinc-300">
                  أنت تبلّغ عن الفيديو: <strong className="text-white">{reportingVideo.title}</strong> للمصمم: <strong className="text-white">{reportingVideo.authorName}</strong>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5">سبب البلاغ:</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white"
                  >
                    <option value="سرقة حقوق مونتاج وتصميم">سرقة حقوق مونتاج وتصميم بدون إذن</option>
                    <option value="محتوى مخل أو غير لائق">محتوى مخل أو غير لائق</option>
                    <option value="سب وشتم وإساءة في العنوان أو الوصف">سب وشتم وإساءة في العنوان أو الوصف</option>
                    <option value="احتيال أو روابط ضارة">احتيال أو روابط ضارة</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors"
                >
                  تأكيد وإرسال البلاغ للتنبيهات
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Upload Video Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 glass-panel shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
                  <Upload className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">نشر إيدت جديد (4K / 120 FPS)</h3>
                  <p className="text-xs text-zinc-400">انشر عملك في منصة 21foredit مع الحفاظ على حقوقك وحقوق الموقع</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 text-zinc-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            {uploadError && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitUpload} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  عنوان الإيدت *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: Gojo Satoru - Smooth Velocity 4K Flow"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  وصف الإيدت والموسيقى المستخدمة
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اكتب نبذة عن الإيقاع، التقنيات المستخدمة، أو اسم الأغنية..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
                />
              </div>

              {/* Video Source: URL or File */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    رابط الفيديو المباشر (URL / CDN)
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => {
                      setVideoUrl(e.target.value);
                      setSelectedFile(null);
                    }}
                    placeholder="https://...mp4 or mov"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    أو اختر ملف الفيديو من جهازك / هاتفك مباشرة
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer"
                  />
                  {selectedFile && (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                      <Check className="w-3 h-3" /> تم تحديد: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
                    </span>
                  )}
                  {uploadFileLoading && (
                    <span className="text-[10px] text-amber-300 flex items-center gap-1 mt-1 font-mono">
                      <RefreshCw className="w-3 h-3 animate-spin" /> جاري تجهيز الفيديو...
                    </span>
                  )}
                </div>
              </div>

              {/* Resolution & FPS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    الدقة (Resolution)
                  </label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
                  >
                    <option value="4K">4K Ultra HD (موصى به)</option>
                    <option value="2K">2K QHD (1440p)</option>
                    <option value="1080p">1080p Full HD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    معدل الإطارات (Framerate)
                  </label>
                  <select
                    value={fps}
                    onChange={(e) => setFps(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
                  >
                    <option value="120">120 FPS (فائق السلاسة)</option>
                    <option value="60">60 FPS (سلس)</option>
                    <option value="30">30 FPS (قياسي)</option>
                  </select>
                </div>
              </div>

              {/* Software, Style, Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    البرنامج المستخدم
                  </label>
                  <select
                    value={software}
                    onChange={(e) => setSoftware(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
                  >
                    <option value="Alight Motion">Alight Motion</option>
                    <option value="After Effects">After Effects</option>
                    <option value="CapCut">CapCut</option>
                    <option value="Premiere Pro">Premiere Pro</option>
                    <option value="DaVinci Resolve">DaVinci Resolve</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    الستايل
                  </label>
                  <input
                    type="text"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    placeholder="مثال: Velocity, Glitch, Manga..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    التصنيف
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="مثال: Flex Edit, Purposeful..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Optional Project / XML link */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  رابط تحميل مشروع الـ XML (اختياري)
                </label>
                <input
                  type="url"
                  value={xmlDownloadUrl}
                  onChange={(e) => setXmlDownloadUrl(e.target.value)}
                  placeholder="https://... (رابط ملف XML لمشاركته مع المصممين)"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white font-mono"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 text-sm font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={!videoUrl.trim() || !title.trim()}
                  className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-sm disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  نشر الفيديو الآن
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Share Modal */}
      {sharedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-white/20 rounded-3xl p-6 glass-panel shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-white" />
                <h4 className="text-lg font-bold text-white">مشاركة الفيديو مع حقوق الموقع</h4>
              </div>
              <button
                onClick={() => setSharedVideo(null)}
                className="p-1.5 rounded-xl bg-white/10 text-zinc-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 font-mono text-xs text-zinc-300 leading-relaxed break-all">
                <p className="font-bold text-white mb-1">{sharedVideo.title}</p>
                <p className="text-zinc-400 mb-2">الدقة: {sharedVideo.resolution} • الإطارات: {sharedVideo.fps} FPS</p>
                <p className="text-zinc-200">
                  https://21foredit.vip/watch?id={sharedVideo.id}
                </p>
                <p className="text-zinc-500 mt-2 text-[11px]">
                  © جميع حقوق النشر والعرض محفوظة لمنصة 21foredit الرسمية للمونتاج.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyShareLink}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  {copiedShare ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>تم نسخ الرابط والحقوق!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-black" />
                      <span>نسخ الرابط مع حقوق الموقع</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
