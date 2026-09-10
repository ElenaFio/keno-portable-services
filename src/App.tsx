import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";

export default function App() {
  return (
    <LanguageProvider>
      <Index />
      <Toaster />
    </LanguageProvider>
  );
}
