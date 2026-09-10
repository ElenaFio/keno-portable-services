import { Facebook, Instagram, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Logo from "@/components/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#141414] text-white border-t border-white/10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-5">
              <Logo variant="dark" />
            </div>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#85e600] hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#85e600] hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-4 font-['Poppins'] text-white">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-slate-400 hover:text-[#85e600] transition-colors cursor-pointer"
                >
                  {t("nav.home")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-slate-400 hover:text-[#85e600] transition-colors cursor-pointer"
                >
                  {t("nav.about")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-slate-400 hover:text-[#85e600] transition-colors cursor-pointer"
                >
                  {t("nav.services")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("fleet")}
                  className="text-slate-400 hover:text-[#85e600] transition-colors cursor-pointer"
                >
                  {t("nav.fleet")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-slate-400 hover:text-[#85e600] transition-colors cursor-pointer"
                >
                  {t("nav.testimonials")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-slate-400 hover:text-[#85e600] transition-colors cursor-pointer"
                >
                  {t("nav.contact")}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-base mb-4 font-['Poppins'] text-white">
              {t("footer.services")}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>{t("footer.eventsWeddings")}</li>
              <li>{t("footer.construction")}</li>
              <li>{t("footer.productions")}</li>
              <li>{t("footer.emergencies")}</li>
              <li>{t("footer.longTerm")}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-4 font-['Poppins'] text-white">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2.5 mt-1 shrink-0 text-[#85e600]" />
                <span className="text-slate-400">California, USA</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2.5 shrink-0 text-[#85e600]" />
                <a
                  href="tel:+18583289815"
                  className="text-slate-400 hover:text-[#85e600] transition-colors"
                >
                  (858) 328-9815
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2.5 shrink-0 text-[#85e600]" />
                <a
                  href="mailto:customer@kenoportableservices.us"
                  className="text-slate-400 hover:text-[#85e600] transition-colors"
                >
                  customer@kenoportableservices.us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            © {currentYear} KENO Portable Services LLC. {t("footer.rights")}
          </p>

          <div className="flex items-center space-x-6">
            <button className="text-slate-500 hover:text-[#85e600] text-xs transition-colors cursor-pointer">
              {t("footer.privacy")}
            </button>
            <button className="text-slate-500 hover:text-[#85e600] text-xs transition-colors cursor-pointer">
              {t("footer.terms")}
            </button>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-slate-400 hover:text-black hover:bg-[#85e600] transition-all"
              title="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
