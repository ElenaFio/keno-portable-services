import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { heroImage } from "@/assets/images";

const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background Image with Dark & Radial Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Trailer de lujo KENO Portable Services"
          className="w-full h-full object-cover object-center md:object-right"
          referrerPolicy="no-referrer"
        />
        {/* Mobile: Uniform darkening for clear vertical readability */}
        <div className="absolute inset-0 bg-black/60 md:hidden" />

        {/* Desktop: Horizontal gradient from left to right for optimal text contrast while preserving illuminated trailer on the right */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

        {/* Subtle bottom vignette to blend smoothly into subsequent sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#85e600]/15 border border-[#85e600]/30 text-[#a3ff1a] text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#85e600]" />
            <span>California Premier Portable Sanitation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.12] tracking-tight font-['Poppins']">
            {t("hero.title")}
          </h1>

          <p className="text-xl sm:text-2xl text-[#85e600] font-semibold mb-4 tracking-tight">
            {t("hero.subtitle")}
          </p>

          <p className="text-base sm:text-lg text-slate-200/90 mb-9 max-w-2xl leading-relaxed">
            {t("hero.description")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="gradient-cta text-black font-bold text-base px-8 py-6 rounded-xl hover-lift group shadow-lg shadow-[#85e600]/25"
            >
              {t("hero.cta")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base px-8 py-6 rounded-xl bg-white/10 border-white/25 text-white hover:bg-white/20 hover:text-white backdrop-blur-md transition-colors"
            >
              <a href="tel:+18583289815" className="flex items-center">
                <Phone className="mr-2.5 w-5 h-5 text-[#85e600]" />
                {t("hero.call")}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <button
          onClick={() => scrollToSection("about")}
          aria-label="Scroll to About section"
          className="cursor-pointer group flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1 group-hover:border-[#85e600] transition-colors">
            <div className="w-1.5 h-3 bg-[#85e600] rounded-full animate-bounce mt-1" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
