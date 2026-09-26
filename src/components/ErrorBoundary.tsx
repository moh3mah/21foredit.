import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('21foredit Uncaught Error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    try {
      // Clear any corrupted large video cache if causing crash
      localStorage.removeItem('21foredit_videos');
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-950 border border-white/15 glass-panel shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-black mb-2">تم استعادة الموقع بنجاح</h2>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              حدث خطأ مؤقت أثناء معالجة أحد الملفات أو الفيديوهات. تم حماية بياناتك وتأمين النظام.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة تحديث الصفحة</span>
              </button>

              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-semibold transition-all border border-white/10"
              >
                <span>إصلاح البيانات واستئناف العمل</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
