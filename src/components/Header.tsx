import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import Logo from "@/components/Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: t("nav.home"), id: "hero" },
    { label: t("nav.about"), id: "about" },
    { label: t("nav.services"), id: "services" },
    { label: t("nav.fleet"), id: "fleet" },
    { label: t("nav.testimonials"), id: "testimonials" },
    { label: t("nav.contact"), id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm"
          : "bg-white border-b border-slate-100 shadow-sm"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center cursor-pointer text-left focus:outline-none"
            aria-label="KENO Portable Services - Inicio"
          >
            <Logo variant="light" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-700 hover:text-[#2ED100] transition-colors font-medium text-[15px] cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageToggle />
            <a
              href="tel:+18583289815"
              className="flex items-center text-slate-800 hover:text-[#2ED100] transition-colors group font-medium text-sm"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 text-slate-800 group-hover:bg-[#2ED100] group-hover:text-black transition-colors">
                <Phone className="w-4 h-4 text-slate-800 group-hover:text-black transition-colors" />
              </div>
              <span className="font-semibold text-sm">(858) 328-9815</span>
            </a>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-[#2ED100] hover:bg-[#2bc500] text-black font-bold px-6 py-2.5 rounded-xl hover-lift cursor-pointer shadow-sm"
            >
              {t("header.cta")}
            </Button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageToggle />
            <button
              className="p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <nav className="lg:hidden py-5 px-4 bg-white border-b border-slate-200 shadow-xl backdrop-blur-md rounded-b-2xl">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-slate-700 hover:text-[#2ED100] hover:bg-slate-50 px-3 py-2.5 rounded-lg transition-colors font-medium text-base"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href="tel:+18583289815"
                  className="flex items-center text-slate-800 hover:text-[#2ED100] py-2 px-3 rounded-lg font-medium"
                >
                  <Phone className="w-5 h-5 mr-3 text-[#2ED100]" />
                  <span className="font-semibold">(858) 328-9815</span>
                </a>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-[#2ED100] hover:bg-[#2bc500] text-black font-bold py-3 w-full rounded-xl hover-lift"
                >
                  {t("header.cta")}
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
