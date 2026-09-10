import { Award, Truck, Clock, HeadphonesIcon, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { whyChooseUsImage } from "@/assets/images";

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Award,
      title: t("why.experience.title"),
      description: t("why.experience.description"),
    },
    {
      icon: Truck,
      title: t("why.fleet.title"),
      description: t("why.fleet.description"),
    },
    {
      icon: Clock,
      title: t("why.delivery.title"),
      description: t("why.delivery.description"),
    },
    {
      icon: HeadphonesIcon,
      title: t("why.support.title"),
      description: t("why.support.description"),
    },
  ];

  return (
    <section id="why-choose-us" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200/70">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Eyebrow, Heading, Subtitle & 2x2 Benefits Grid */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8">
              <span className="text-[#2ED100] font-semibold text-sm tracking-wider uppercase inline-block mb-3">
                {t("why.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3 font-['Poppins']">
                {t("why.title")}
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">
                {t("why.subtitle")}
              </p>
            </div>

            {/* 4 Benefits Cards (2x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#2ED100]/40 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#2ED100]/10 flex items-center justify-center text-[#2ED100] mb-4 group-hover:bg-[#2ED100] group-hover:text-black transition-colors duration-200">
                      <feature.icon className="w-6 h-6 transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Poppins']">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Institutional Vertical Photography */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full h-full min-h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 group">
              <img
                src={whyChooseUsImage}
                alt="Personal técnico y servicio profesional Keno Portable Services"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Subtle gradient overlay at bottom for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Floating trust badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xl flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#2ED100]/15 flex items-center justify-center text-[#2ED100] flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#2ED100]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    KENO PRO TEAM
                  </p>
                  <p className="text-sm font-bold text-slate-900 leading-tight">
                    {t("why.imageBadge")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

