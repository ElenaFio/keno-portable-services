import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { teamFamily } from "@/assets/images";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const About = () => {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const element = document.getElementById("contacto") || document.getElementById("contact");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", "#contacto");
    }
  };

  return (
    <section id="about" className="py-16 md:py-20 bg-white border-t border-b border-slate-200/80">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (lg:col-span-7): Text hierarchy, story & action buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <span className="text-[#2ED100] font-semibold text-sm tracking-wide block mb-3">
              {t("about.eyebrow")}
            </span>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight font-['Poppins'] mb-5 leading-tight">
              {t("about.heading")}
            </h2>

            {/* Story Paragraphs */}
            <div className="text-slate-600 space-y-4 leading-relaxed text-base sm:text-lg">
              {/* Always visible initial paragraph */}
              <p>
                {t("about.paragraph1")}
              </p>

              {/* Collapsible remaining story */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden space-y-4 pt-1"
                  >
                    <p>
                      {t("about.paragraph2")}
                    </p>
                    <p className="font-medium text-slate-800">
                      {t("about.paragraph3")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtle "Leer más" / "Leer historia completa" Toggle Button */}
            <div>
              <button
                type="button"
                id="about-toggle-story-btn"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-slate-600 hover:text-[#2ED100] font-medium text-sm inline-flex items-center gap-1.5 cursor-pointer my-3 transition-colors select-none group"
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? t("about.readLess") : t("about.readMore")}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#2ED100] group-hover:-translate-y-0.5 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#2ED100] group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>
            </div>

            {/* Action Button: Clean capsule pill linking to #contacto */}
            <div className="mt-5 sm:mt-7">
              <a
                id="about-cta-btn"
                href="#contacto"
                onClick={scrollToContact}
                className="inline-flex items-center gap-3.5 pl-7 pr-3 py-2.5 rounded-full bg-slate-950 text-white font-semibold text-sm sm:text-base hover:bg-slate-800 transition-all duration-200 shadow-md group cursor-pointer"
              >
                <span>{t("about.pillCta")}</span>
                <span className="w-9 h-9 rounded-full bg-[#2ED100] text-slate-950 flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column (lg:col-span-5): Vertical Institutional Photo */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 group bg-slate-100">
              <img
                src={teamFamily}
                alt={t("about.imageAlt")}
                className="w-full h-[440px] sm:h-[480px] lg:h-[530px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Floating Badge in Bottom Corner */}
              <div className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 shadow-xl">
                <p className="font-bold text-base sm:text-lg font-['Poppins'] text-[#2ED100] flex items-center gap-2">
                  <span>Familia KENO</span>
                </p>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-snug">
                  {language === "es"
                    ? "Jorge, Santa, Raúl y equipo comprometidos con la excelencia"
                    : "Jorge, Santa, Raúl and team committed to excellence"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
