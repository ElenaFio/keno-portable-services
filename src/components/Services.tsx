import React, { useRef, useState } from "react";
import { Heart, HardHat, Film, AlertCircle, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { weddingImage, constructionImage, filmProductionImage, emergencyImage } from "@/assets/images";
import { selectSectorAndScroll } from "@/utils/serviceSelection";

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string;
  serviceValue: string;
  features: string[];
}

const Services = () => {
  const { t, language } = useLanguage();
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const services: ServiceItem[] = [
    {
      icon: Heart,
      title: t("services.events.title"),
      description: t("services.events.description"),
      image: weddingImage,
      serviceValue: "eventos-bodas",
      features: [
        t("services.events.feature1"),
        t("services.events.feature2"),
        t("services.events.feature3"),
      ],
    },
    {
      icon: HardHat,
      title: t("services.construction.title"),
      description: t("services.construction.description"),
      image: constructionImage,
      serviceValue: "construccion-obra",
      features: [
        t("services.construction.feature1"),
        t("services.construction.feature2"),
        t("services.construction.feature3"),
      ],
    },
    {
      icon: Film,
      title: t("services.production.title"),
      description: t("services.production.description"),
      image: filmProductionImage,
      serviceValue: "producciones-filmaciones",
      features: [
        t("services.production.feature1"),
        t("services.production.feature2"),
        t("services.production.feature3"),
      ],
    },
    {
      icon: AlertCircle,
      title: t("services.emergency.title"),
      description: t("services.emergency.description"),
      image: emergencyImage,
      serviceValue: "emergencias-largo-plazo",
      features: [
        t("services.emergency.feature1"),
        t("services.emergency.feature2"),
        t("services.emergency.feature3"),
      ],
    },
  ];

  const handlePrev = () => {
    const newPage = Math.max(0, currentPage - 1);
    setCurrentPage(newPage);
    if (mobileScrollRef.current) {
      const card = mobileScrollRef.current.firstElementChild as HTMLElement;
      const width = card ? card.offsetWidth + 16 : 320;
      mobileScrollRef.current.scrollBy({ left: -width, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    const newPage = Math.min(1, currentPage + 1);
    setCurrentPage(newPage);
    if (mobileScrollRef.current) {
      const card = mobileScrollRef.current.firstElementChild as HTMLElement;
      const width = card ? card.offsetWidth + 16 : 320;
      mobileScrollRef.current.scrollBy({ left: width, behavior: "smooth" });
    }
  };

  const handleGoToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    if (mobileScrollRef.current) {
      const cards = mobileScrollRef.current.children;
      const targetCardIndex = pageIndex === 0 ? 0 : 2;
      if (cards[targetCardIndex]) {
        (cards[targetCardIndex] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  };

  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setCurrentPage(0);
      return;
    }
    const scrollFraction = el.scrollLeft / maxScroll;
    setCurrentPage(scrollFraction > 0.4 ? 1 : 0);
  };

  const renderCard = (service: ServiceItem) => (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
      {service.image && (
        <div className="h-64 sm:h-72 lg:h-80 w-full overflow-hidden relative bg-slate-100 rounded-t-3xl">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-50 pointer-events-none" />
        </div>
      )}

      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Contenedor del Ícono */}
          <div className="bg-[#2ED100]/10 text-[#2ED100] p-2.5 rounded-xl inline-flex mb-3">
            <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ED100] stroke-[2.2]" />
          </div>

          {/* Jerarquía y Legibilidad */}
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 font-['Poppins'] leading-snug">
            {service.title}
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
            {service.description}
          </p>

          {/* Lista limpia con checks verdes (#2ED100) */}
          <ul className="space-y-2.5 mb-6">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <Check className="w-4 h-4 text-[#2ED100] shrink-0 stroke-[2.5]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botón de Acción (CTA) por Tarjeta */}
        <div className="pt-4 border-t border-slate-100 mt-auto">
          <button
            type="button"
            onClick={() => selectSectorAndScroll(service.serviceValue)}
            className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-slate-900 hover:text-[#2ED100] transition-colors group/link cursor-pointer"
          >
            <span>{language === "es" ? "Cotizar para este sector" : "Get quote for this sector"}</span>
            <span className="text-[#2ED100] font-bold text-base transition-transform group-hover/link:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="services" className="py-16 md:py-20 bg-slate-50/70 border-t border-slate-200/80 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Upper Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <span className="text-[#2ED100] font-semibold text-sm tracking-wider uppercase inline-block mb-2">
              • {t("nav.services")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Poppins'] tracking-tight">
              {t("services.title")}
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mt-2 leading-relaxed">
              {t("services.subtitle")}
            </p>
          </div>

          {/* Upper Circular Arrow Controls (Desktop and Tablet) */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 0}
              aria-label="Vista anterior"
              className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-slate-950 hover:border-[#2ED100] hover:bg-[#2ED100]/10 disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer select-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === 1}
              aria-label="Siguiente vista"
              className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-slate-950 hover:border-[#2ED100] hover:bg-[#2ED100]/10 disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer select-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Carousel (Exact 2 in 2 Layout in 2 Pages) */}
        <div className="hidden md:block overflow-hidden py-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {/* Vista 1: Eventos & Bodas + Construcción & Industrial */}
            <div className="w-full shrink-0 grid grid-cols-2 gap-8">
              <div>{renderCard(services[0])}</div>
              <div>{renderCard(services[1])}</div>
            </div>

            {/* Vista 2: Producciones & Filmaciones + Emergencias & Largo Plazo */}
            <div className="w-full shrink-0 grid grid-cols-2 gap-8">
              <div>{renderCard(services[2])}</div>
              <div>{renderCard(services[3])}</div>
            </div>
          </div>
        </div>

        {/* Mobile View: 1 Card per view with peek swipe */}
        <div className="md:hidden py-2">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service, idx) => (
              <div key={idx} className="w-[86%] shrink-0 snap-start">
                {renderCard(service)}
              </div>
            ))}
          </div>
        </div>

        {/* 2 Navigation Dots (One for each pair of cards / view) */}
        <div className="flex items-center justify-center gap-2.5 mt-8 md:mt-10">
          {[0, 1].map((pageIdx) => (
            <button
              key={pageIdx}
              type="button"
              onClick={() => handleGoToPage(pageIdx)}
              aria-label={`Ir a la vista ${pageIdx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === pageIdx
                  ? "w-9 bg-[#2ED100] shadow-sm shadow-[#2ED100]/40"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
