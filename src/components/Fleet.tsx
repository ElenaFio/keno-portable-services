import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { standardImage, adaImage, handwashImage, luxuryTrailerImage } from "@/assets/images";
import { Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { selectUnitAndScroll } from "@/utils/serviceSelection";

type TabId = "luxury" | "standard" | "ada" | "handwash";

const Fleet = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>("luxury");

  const tabsConfig = [
    {
      id: "luxury" as TabId,
      label: t("fleet.tab.luxury"),
      title: t("fleet.luxury.title"),
      badge: t("fleet.luxury.badge"),
      description: t("fleet.luxury.description"),
      image: luxuryTrailerImage,
      alt: "Trailer de Lujo KENO Portable Services",
      bullets: [
        t("fleet.luxury.bullet1"),
        t("fleet.luxury.bullet2"),
        t("fleet.luxury.bullet3"),
      ],
    },
    {
      id: "standard" as TabId,
      label: t("fleet.tab.standard"),
      title: t("fleet.standard.title"),
      badge: t("fleet.standard.badge"),
      description: t("fleet.standard.description"),
      image: standardImage,
      alt: "Baño Estándar KENO Portable Services",
      bullets: [
        t("fleet.standard.bullet1"),
        t("fleet.standard.bullet2"),
        t("fleet.standard.bullet3"),
      ],
    },
    {
      id: "ada" as TabId,
      label: t("fleet.tab.ada"),
      title: t("fleet.ada.title"),
      badge: t("fleet.ada.badge"),
      description: t("fleet.ada.description"),
      image: adaImage,
      alt: "Baño ADA Accesible KENO Portable Services",
      bullets: [
        t("fleet.ada.bullet1"),
        t("fleet.ada.bullet2"),
        t("fleet.ada.bullet3"),
      ],
    },
    {
      id: "handwash" as TabId,
      label: t("fleet.tab.handwash"),
      title: t("fleet.handwash.title"),
      badge: t("fleet.handwash.badge"),
      description: t("fleet.handwash.description"),
      image: handwashImage,
      alt: "Estación de Lavado KENO Portable Services",
      bullets: [
        t("fleet.handwash.bullet1"),
        t("fleet.handwash.bullet2"),
        t("fleet.handwash.bullet3"),
      ],
    },
  ];

  const currentUnit = tabsConfig.find((u) => u.id === activeTab) || tabsConfig[0];

  const modelUnitMap: Record<TabId, string> = {
    luxury: "trailer-vip",
    standard: "bano-estandar",
    ada: "bano-ada",
    handwash: "estacion-lavado",
  };

  const handleQuoteClick = () => {
    const unitValue = modelUnitMap[activeTab] || "trailer-vip";
    selectUnitAndScroll(unitValue);
  };

  return (
    <section id="fleet" className="py-20 md:py-28 bg-[#0C2317] border-t border-b border-white/10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header Structure */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-['Poppins']">
            {language === "es" ? (
              <>
                Equipamiento de primer nivel para{" "}
                <span className="text-white font-extrabold">cada exigencia</span>
              </>
            ) : (
              <>
                Top-tier equipment for{" "}
                <span className="text-white font-extrabold">every demand</span>
              </>
            )}
          </h2>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t("fleet.subtitle")}
          </p>
        </div>

        {/* 2. Interactive Tabs Bar */}
        {/* Mobile View: 2x2 Grid Layout (< md) */}
        <div className="md:hidden w-full max-w-sm mx-auto mb-6">
          <div
            id="fleet-tabs-mobile"
            className="grid grid-cols-2 gap-2 w-full p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden"
            role="tablist"
            aria-label="Selección de modelo de flota móvil"
          >
            {tabsConfig.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`fleet-tab-m-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`fleet-panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full py-2.5 px-3 text-center text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#2ED100] text-slate-950 font-bold shadow-lg shadow-[#2ED100]/20"
                      : "text-slate-300 hover:text-white font-medium hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop View: Horizontal Tab Bar (md+) */}
        <div className="hidden md:flex justify-center mb-8 md:mb-10">
          <div
            id="fleet-tabs-bar"
            className="inline-flex items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm shadow-xl"
            role="tablist"
            aria-label="Selección de modelo de flota"
          >
            {tabsConfig.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`fleet-tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`fleet-panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm md:text-base transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                    isActive
                      ? "bg-[#2ED100] text-slate-950 font-bold shadow-lg shadow-[#2ED100]/20"
                      : "text-slate-300 hover:text-white font-medium hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Main 50/50 Showcase Container with Elegant Deep Surface */}
        <div
          id="fleet-showcase-card"
          className="w-full rounded-3xl p-6 sm:p-8 lg:p-10 bg-[#123020] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentUnit.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              id={`fleet-panel-${currentUnit.id}`}
              role="tabpanel"
              aria-labelledby={`fleet-tab-${currentUnit.id}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10"
            >
              {/* Left Column: Dynamic High-Quality Image */}
              <div className="lg:col-span-6 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-[#0C2317] group">
                  <img
                    src={currentUnit.image}
                    alt={currentUnit.alt}
                    className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Information, Key Specs & CTA */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="mb-2">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-['Poppins'] tracking-tight mb-3">
                    {currentUnit.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                    {currentUnit.description}
                  </p>
                </div>

                {/* Vertical list of key specs */}
                <div className="space-y-3.5 mb-8">
                  {currentUnit.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-slate-200 text-sm sm:text-base font-medium"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#2ED100]/15 border border-[#2ED100]/40 flex items-center justify-center text-[#2ED100] shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-snug text-slate-200">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Call to action button */}
                <div>
                  <button
                    id="fleet-quote-btn"
                    onClick={handleQuoteClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#2ED100] text-slate-950 font-bold text-base hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#2ED100]/20 cursor-pointer group"
                  >
                    <span>{t("fleet.quoteBtn")}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Fleet;

