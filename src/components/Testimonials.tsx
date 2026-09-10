import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "motion/react";

const Testimonials = () => {
  const { t, language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
    {
      id: "maria",
      name: "María G.",
      location: "San Diego",
      role: language === "es" ? "Novia" : "Bride",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80",
      text: {
        es: "Los trailers de lujo parecían baños de hotel. Perfectos para nuestra boda.",
        en: "The luxury trailers looked like hotel bathrooms. Perfect for our wedding.",
      },
      rating: 5,
    },
    {
      id: "carlos",
      name: "Carlos R.",
      location: "Los Ángeles",
      role: language === "es" ? "Contratista" : "Contractor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
      text: {
        es: "En la obra de Los Ángeles siempre estuvieron puntuales y limpios.",
        en: "On the Los Angeles site they were always punctual and clean.",
      },
      rating: 5,
    },
    {
      id: "james",
      name: "James T.",
      location: "Hollywood",
      role: language === "es" ? "Productor" : "Producer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
      text: {
        es: "Producción de cine en Hollywood: impecable servicio.",
        en: "Film production in Hollywood: impeccable service.",
      },
      rating: 5,
    },
    {
      id: "ana",
      name: "Ana P.",
      location: "San Francisco",
      role: language === "es" ? "Organizadora de Eventos" : "Event Planner",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80",
      text: {
        es: "Un festival con más de 2,000 personas y todo salió excelente gracias a KENO.",
        en: "A festival with over 2,000 people and everything went great thanks to KENO.",
      },
      rating: 5,
    },
    {
      id: "rosa",
      name: "Rosa M.",
      location: "Sacramento",
      role: language === "es" ? "Líder Comunitaria" : "Community Leader",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=300&q=80",
      text: {
        es: "Cuando hubo una emergencia en nuestra comunidad, respondieron en menos de 24 horas.",
        en: "When there was an emergency in our community, they responded in less than 24 hours.",
      },
      rating: 5,
    },
    {
      id: "david",
      name: "David K.",
      location: "Orange County",
      role: language === "es" ? "Director de Operaciones" : "Operations Director",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80",
      text: {
        es: "Excelente atención al cliente y unidades en perfecto estado higiénico. 100% recomendados.",
        en: "Excellent customer service and units in pristine sanitary condition. 100% recommended.",
      },
      rating: 5,
    },
  ];

  const totalPages = isDesktop ? Math.ceil(testimonials.length / 2) : testimonials.length;
  const activePage = Math.min(currentPage, totalPages - 1);

  const prevSlide = () => {
    setCurrentPage((prev) => (prev <= 0 ? totalPages - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentPage((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = isDesktop
    ? [
        testimonials[activePage * 2],
        testimonials[activePage * 2 + 1],
      ].filter(Boolean)
    : [testimonials[activePage]];

  // Handle touch swipes for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section id="testimonials" className="py-16 md:py-20 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header Structure */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[#2ED100] font-semibold text-sm tracking-wider uppercase inline-block mb-3">
            • TESTIMONIOS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4 font-['Poppins']">
            {t("testimonials.title")}
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* 2. Carousel Container */}
        <div
          className="relative w-full mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${isDesktop ? "desktop" : "mobile"}-${activePage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className={`grid gap-6 lg:gap-8 ${isDesktop ? "grid-cols-2" : "grid-cols-1"}`}
              >
                {visibleTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 lg:p-10 flex flex-row items-center gap-5 sm:gap-7 relative group min-h-[240px] sm:min-h-[260px]"
                  >
                    {/* Left: Prominent Profile Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={testimonial.avatar}
                        alt={`Foto de perfil de ${testimonial.name}`}
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Right: Testimonial Details */}
                    <div className="flex-1 min-w-0 pr-4 sm:pr-6">
                      {/* 5 Gold Stars */}
                      <div className="flex items-center gap-1.5 mb-2" aria-label="5 de 5 estrellas">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#F59E0B] text-[#F59E0B]" />
                        ))}
                      </div>

                      {/* Scaled Testimonial Quote */}
                      <p className="text-slate-600 text-base md:text-lg leading-relaxed my-2 sm:my-3 italic">
                        "{testimonial.text[language]}"
                      </p>

                      {/* Client Name & Details */}
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg md:text-xl font-['Poppins'] leading-tight">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">
                          {testimonial.role} • {testimonial.location}
                        </p>
                      </div>
                    </div>

                    {/* Brand Lime Green Quote Icon */}
                    <Quote className="absolute top-6 right-6 w-8 h-8 sm:w-9 sm:h-9 text-[#2ED100] pointer-events-none opacity-90 transition-transform group-hover:scale-110" />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. Bottom Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              id="testimonials-prev-btn"
              onClick={prevSlide}
              aria-label="Testimonio anterior"
              className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-700 hover:border-[#2ED100] hover:text-slate-950 hover:bg-[#2ED100] active:scale-95 transition-all duration-200 cursor-pointer group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 px-2" role="tablist" aria-label="Indicadores de página">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  aria-label={`Ir a página ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    activePage === index
                      ? "w-7 bg-[#2ED100]"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              id="testimonials-next-btn"
              onClick={nextSlide}
              aria-label="Siguiente testimonio"
              className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-700 hover:border-[#2ED100] hover:text-slate-950 hover:bg-[#2ED100] active:scale-95 transition-all duration-200 cursor-pointer group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
