import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="min-w-[72px] font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5 shadow-none rounded-lg"
      aria-label="Toggle language"
    >
      <Globe className="w-3.5 h-3.5 text-[#2ED100]" />
      <span>{language === "es" ? "EN" : "ES"}</span>
    </Button>
  );
};

export default LanguageToggle;
