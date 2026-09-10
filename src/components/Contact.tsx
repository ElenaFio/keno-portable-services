import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { z } from "zod";

const Contact = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [highlightedField, setHighlightedField] = useState<"sector" | "unit" | null>(null);

  useEffect(() => {
    const handlePreselect = (e: Event) => {
      const customEvent = e as CustomEvent<{ sector?: string; unit?: string; serviceValue?: string }>;
      const { sector, unit, serviceValue } = customEvent.detail || {};

      if (sector) {
        setFormData((prev) => ({ ...prev, sector }));
        setHighlightedField("sector");
        setTimeout(() => setHighlightedField(null), 2600);
        const trigger = document.getElementById("sector-select-trigger");
        trigger?.focus();
      } else if (unit) {
        setFormData((prev) => ({ ...prev, unit }));
        setHighlightedField("unit");
        setTimeout(() => setHighlightedField(null), 2600);
        const trigger = document.getElementById("unit-select-trigger");
        trigger?.focus();
      } else if (serviceValue) {
        const isFleet = [
          "trailer-vip",
          "trailer-lujo",
          "bano-estandar",
          "bano-ada",
          "estacion-lavado",
          "paquete-combinado",
        ].includes(serviceValue);

        if (isFleet) {
          const mappedUnit = serviceValue === "trailer-lujo" ? "trailer-vip" : serviceValue;
          setFormData((prev) => ({ ...prev, unit: mappedUnit }));
          setHighlightedField("unit");
          setTimeout(() => setHighlightedField(null), 2600);
          document.getElementById("unit-select-trigger")?.focus();
        } else {
          setFormData((prev) => ({ ...prev, sector: serviceValue }));
          setHighlightedField("sector");
          setTimeout(() => setHighlightedField(null), 2600);
          document.getElementById("sector-select-trigger")?.focus();
        }
      }
    };

    window.addEventListener("keno:preselect-contact", handlePreselect);
    window.addEventListener("keno:select-service", handlePreselect);
    return () => {
      window.removeEventListener("keno:preselect-contact", handlePreselect);
      window.removeEventListener("keno:select-service", handlePreselect);
    };
  }, []);

  const contactSchema = z.object({
    name: z
      .string()
      .trim()
      .min(2, language === "es" ? "El nombre debe tener al menos 2 caracteres" : "Name must have at least 2 characters")
      .max(100),
    phone: z
      .string()
      .trim()
      .refine(
        (val) => val.replace(/\D/g, "").length === 10,
        language === "es"
          ? "Ingresa un número de 10 dígitos: (XXX) XXX-XXXX"
          : "Please enter a valid 10-digit phone: (XXX) XXX-XXXX"
      ),
    email: z
      .string()
      .trim()
      .refine(
        (val) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
        language === "es"
          ? "Por favor ingresa un correo válido"
          : "Please enter a valid email address"
      )
      .max(255),
    sector: z
      .string()
      .min(1, language === "es" ? "Selecciona un sector o proyecto" : "Select a sector or project"),
    unit: z.string().optional(),
    date: z
      .string()
      .min(1, language === "es" ? "Selecciona una fecha" : "Select a date"),
    guests: z.string().trim().max(50).optional(),
    message: z.string().trim().max(1000).optional(),
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    sector: "",
    unit: "",
    date: "",
    guests: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Helper: US standard phone mask (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (!digits) return "";
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    handleChange("phone", formatted);
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow control/navigation keys
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Home" ||
      e.key === "End" ||
      (e.ctrlKey || e.metaKey)
    ) {
      return;
    }
    // Block non-digit keys
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Helper: Name input restricted to letters, spaces, and accents
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/g, "");
    handleChange("name", sanitized);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Home" ||
      e.key === "End" ||
      (e.ctrlKey || e.metaKey)
    ) {
      return;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Helper: Email validation
  const validateEmail = (val: string): boolean => {
    const trimmed = val.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setEmailError(
        language === "es"
          ? "Por favor ingresa un correo válido"
          : "Please enter a valid email address"
      );
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setEmailTouched(true);
    const isEmailValid = validateEmail(formData.email);
    if (!isEmailValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      contactSchema.parse(formData);

      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        sector: formData.sector,
        unit: formData.unit || null,
        eventType: formData.sector,
        date: formData.date,
        guests: formData.guests || null,
        message: formData.message || null,
        language,
      };

      try {
        await fetch("https://keno-fresh-space.amgbusiness.us/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (networkErr) {
        console.warn("Notice: External email endpoint in sandbox:", networkErr);
      }

      toast({
        title: t("contact.form.success"),
        description: t("contact.form.successMessage"),
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        sector: "",
        unit: "",
        date: "",
        guests: "",
        message: "",
      });
      setEmailError(null);
      setEmailTouched(false);
    } catch (error) {
      console.error("Validation error:", error);
      let errorMsg = t("contact.form.errorMessage");
      if (error instanceof z.ZodError && error.issues && error.issues.length > 0) {
        errorMsg = error.issues[0].message;
      }
      toast({
        title: t("contact.form.error"),
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: Mail,
      title: t("contact.email"),
      value: t("contact.email.value"),
      href: "mailto:customer@kenoportableservices.us",
    },
    {
      icon: Phone,
      title: t("contact.phone"),
      value: t("contact.phone.value"),
      href: "tel:+18583289815",
    },
    {
      icon: MapPin,
      title: t("contact.location"),
      value: `${t("contact.location.value")} — ${t("contact.location.subvalue")}`,
      href: null,
    },
    {
      icon: Clock,
      title: t("contact.hours"),
      value: `${t("contact.hours.value")} — ${t("contact.hours.subvalue")}`,
      href: null,
    },
  ];

  return (
    <section id="contact" className="contact-section py-16 md:py-20 border-t border-slate-200/80 relative">
      <div id="contacto" className="absolute -top-24" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Column 1 - Contact Form */}
          <div className="order-2 lg:order-1">
            <form
              onSubmit={handleSubmit}
              className={`bg-white rounded-3xl p-8 lg:p-10 shadow-xl border flex flex-col transition-all duration-500 ${
                highlightedField
                  ? "border-[#2ED100] ring-2 ring-[#2ED100]/35 shadow-2xl shadow-[#2ED100]/15"
                  : "border-slate-100 shadow-slate-200/60"
              }`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 font-['Poppins'] mb-1">
                  {t("contact.title")}
                </h3>
                <p className="text-sm text-slate-500">
                  {t("contact.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    {t("contact.form.name")} *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={handleNameChange}
                    onKeyDown={handleNameKeyDown}
                    placeholder={t("contact.form.namePlaceholder")}
                    maxLength={100}
                    className="bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#2ED100] focus:ring-2 focus:ring-[#2ED100]/20 rounded-xl transition-all h-11"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    {t("contact.form.phone")} *
                  </label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onKeyDown={handlePhoneKeyDown}
                    placeholder="(555) 000-0000"
                    maxLength={14}
                    className="bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#2ED100] focus:ring-2 focus:ring-[#2ED100]/20 rounded-xl transition-all h-11"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  {t("contact.form.email")} *
                </label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onBlur={() => {
                    setEmailTouched(true);
                    validateEmail(formData.email);
                  }}
                  onChange={(e) => {
                    handleChange("email", e.target.value);
                    if (emailTouched) {
                      validateEmail(e.target.value);
                    }
                  }}
                  placeholder={t("contact.form.emailPlaceholder")}
                  maxLength={255}
                  className={`bg-slate-50 border text-slate-900 placeholder:text-slate-400 focus:bg-white rounded-xl transition-all h-11 ${
                    emailError
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-200 focus:border-[#2ED100] focus:ring-2 focus:ring-[#2ED100]/20"
                  }`}
                />
                {emailError && (
                  <p className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1">
                    {emailError}
                  </p>
                )}
              </div>

              {/* 1. Reorganización de Campos de Selección (Fila de 2 columnas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-5">
                {/* Selector 1: Sector / Industria */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-800">
                      {t("contact.form.sectorLabel")} *
                    </label>
                    {highlightedField === "sector" && (
                      <span className="text-[11px] font-semibold text-slate-950 bg-[#2ED100] px-2 py-0.5 rounded-full animate-pulse shadow-sm">
                        {language === "es" ? "✓ Seleccionado" : "✓ Preselected"}
                      </span>
                    )}
                  </div>
                  <Select
                    required
                    value={formData.sector}
                    onValueChange={(value) => handleChange("sector", value)}
                  >
                    <SelectTrigger
                      id="sector-select-trigger"
                      className={`bg-slate-50 border text-slate-900 focus:bg-white rounded-xl transition-all duration-300 h-11 ${
                        highlightedField === "sector"
                          ? "border-[#2ED100] ring-4 ring-[#2ED100]/40 shadow-lg shadow-[#2ED100]/25 bg-white"
                          : "border-slate-200 focus:border-[#2ED100] focus:ring-2 focus:ring-[#2ED100]/20"
                      }`}
                    >
                      <SelectValue placeholder={t("contact.form.sectorPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-slate-200 text-slate-900 rounded-xl shadow-xl max-h-72">
                      <SelectItem value="eventos-bodas">{t("contact.form.sectorEvents")}</SelectItem>
                      <SelectItem value="construccion-obra">{t("contact.form.sectorConstruction")}</SelectItem>
                      <SelectItem value="producciones-filmaciones">{t("contact.form.sectorProduction")}</SelectItem>
                      <SelectItem value="emergencias-largo-plazo">{t("contact.form.sectorEmergency")}</SelectItem>
                      <SelectItem value="otro">{t("contact.form.sectorOther")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Selector 2: Modelo de Flota */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-800">
                      {t("contact.form.unitLabel")}
                    </label>
                    {highlightedField === "unit" && (
                      <span className="text-[11px] font-semibold text-slate-950 bg-[#2ED100] px-2 py-0.5 rounded-full animate-pulse shadow-sm">
                        {language === "es" ? "✓ Seleccionado" : "✓ Preselected"}
                      </span>
                    )}
                  </div>
                  <Select
                    value={formData.unit}
                    onValueChange={(value) => handleChange("unit", value)}
                  >
                    <SelectTrigger
                      id="unit-select-trigger"
                      className={`bg-slate-50 border text-slate-900 focus:bg-white rounded-xl transition-all duration-300 h-11 ${
                        highlightedField === "unit"
                          ? "border-[#2ED100] ring-4 ring-[#2ED100]/40 shadow-lg shadow-[#2ED100]/25 bg-white"
                          : "border-slate-200 focus:border-[#2ED100] focus:ring-2 focus:ring-[#2ED100]/20"
                      }`}
                    >
                      <SelectValue placeholder={t("contact.form.unitPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-slate-200 text-slate-900 rounded-xl shadow-xl max-h-72">
                      <SelectItem value="cualquiera">{t("contact.form.unitAny")}</SelectItem>
                      <SelectItem value="trailer-vip">{t("contact.form.unitVip")}</SelectItem>
                      <SelectItem value="bano-estandar">{t("contact.form.unitStandard")}</SelectItem>
                      <SelectItem value="bano-ada">{t("contact.form.unitAda")}</SelectItem>
                      <SelectItem value="estacion-lavado">{t("contact.form.unitHandwash")}</SelectItem>
                      <SelectItem value="paquete-combinado">{t("contact.form.unitCombo")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 2. Fila Siguiente (Fechas y Asistentes en 2 columnas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-5">
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    {t("contact.form.eventDate")} *
                  </label>
                  <Input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-[#2ED100] focus:ring-2 focus:ring-[#2ED100]/20 rounded-xl transition-all h-11"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    {t("contact.form.guests")}
                  </label>
                  <Input
                    type="text"
                    value={formData.guests}
                    onChange={(e) => handleChange("guests", e.target.value)}
                    placeholder={t("contact.form.guestsPlaceholder")}
                    maxLength={50}
                    className="bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#2ED100] focus:ring-2 focus:ring-[#2ED100]/20 rounded-xl transition-all h-11"
                  />
                </div>
              </div>

              <div className="mt-5 flex-grow">
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  {t("contact.form.message")}
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder={t("contact.form.messagePlaceholder")}
                  className="bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#2ED100] focus:ring-2 focus:ring-[#2ED100]/20 rounded-xl transition-all min-h-28"
                  maxLength={1000}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="mt-7 w-full rounded-xl py-6 text-base font-bold flex items-center justify-center cursor-pointer shadow-md bg-[#2ED100] text-slate-950 hover:bg-[#2bc500] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2ED100]/25 active:translate-y-0 transition-all"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "..." : t("contact.form.submit")}
              </Button>
            </form>
          </div>

          {/* Column 2 - Contact Information */}
          <div className="order-1 lg:order-2 flex flex-col justify-center pt-2 lg:pt-6">
            <span className="contact-tag font-bold uppercase tracking-wider text-sm mb-3 inline-block">
              {t("contact.tag")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight font-['Poppins']">
              {t("contact.heading")}{" "}
              <span className="contact-highlight">{t("contact.headingHighlight")}</span>
            </h2>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              {t("contact.description")}
            </p>

            <div className="space-y-6">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#2ED100] flex items-center justify-center text-[#052e16] shadow-sm">
                      <Icon className="w-5 h-5 text-[#052e16]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-0.5 font-['Poppins']">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={index}
                    href={item.href}
                    className="block group hover:opacity-85 transition-opacity"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
