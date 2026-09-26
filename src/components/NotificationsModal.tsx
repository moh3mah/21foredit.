import React from 'react';
import { 
  Bell, AlertTriangle, Film, Heart, MessageSquare, 
  Trash2, UserX, CheckCircle, ShieldCheck, X, Crown, ExternalLink 
} from 'lucide-react';
import { AppNotification } from '../data/editData';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onBanUser?: (email: string) => void;
  onDeleteReportedVideo?: (videoId: string) => void;
  isOwner?: boolean;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll,
  onBanUser,
  onDeleteReportedVideo,
  isOwner = false,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden glass-panel shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
              <Bell className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">مركز التنبيهات والبلاغات</h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] bg-red-500 text-white font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} جديد
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400">تنبيهات البلاغات، النشر الجديد، والتفاعلات</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                مسح الكل
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onMarkAsRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all ${
                notif.read
                  ? 'bg-zinc-950/60 border-white/5'
                  : 'bg-zinc-900 border-white/15 shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  {notif.type === 'report' ? (
                    <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                  ) : notif.type === 'upload' ? (
                    <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      <Film className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <MessageSquare className="w-4 h-4" />
                    </span>
                  )}
                  <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">{notif.timestamp}</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                {notif.message}
              </p>

              {/* Special Owner Actions for Reports */}
              {notif.type === 'report' && (
                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2">
                  {notif.reportedUserEmail && onBanUser && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBanUser(notif.reportedUserEmail!);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-bold transition-colors"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>تبنيد هذا المستخدم 🚫</span>
                    </button>
                  )}

                  {notif.reportedVideoId && onDeleteReportedVideo && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteReportedVideo(notif.reportedVideoId!);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span>حذف الفيديو المخالف</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-16">
              <Bell className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
              <p className="text-zinc-400 text-sm font-semibold">لا توجد تنبيهات جديدة</p>
              <p className="text-zinc-600 text-xs mt-0.5">ستصلك هنا كافة البلاغات ومشاركات المجتمع</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
