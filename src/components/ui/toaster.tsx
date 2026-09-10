import { useToast } from "@/hooks/use-toast";
import { X, CheckCircle, AlertTriangle } from "lucide-react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start justify-between p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
            t.variant === "destructive"
              ? "bg-red-950/90 text-red-100 border-red-800"
              : "bg-slate-900/95 text-white border-[#85e600]/40"
          }`}
        >
          <div className="flex items-start gap-3">
            {t.variant === "destructive" ? (
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-[#85e600] shrink-0 mt-0.5" />
            )}
            <div>
              {t.title && <div className="font-semibold text-sm">{t.title}</div>}
              {t.description && <div className="text-xs opacity-90 mt-0.5">{t.description}</div>}
            </div>
          </div>
          <button
            onClick={() => t.id && dismiss(t.id)}
            className="text-white/60 hover:text-white ml-3 p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toaster;
