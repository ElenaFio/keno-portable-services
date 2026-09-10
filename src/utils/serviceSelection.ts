/**
 * Utility to synchronize service / fleet buttons with the contact form
 */
export interface PreselectPayload {
  sector?: string;
  unit?: string;
}

export const selectContextAndScroll = (payload: PreselectPayload) => {
  if (typeof window !== "undefined") {
    // Dispatch custom event to notify Contact component
    window.dispatchEvent(
      new CustomEvent("keno:preselect-contact", {
        detail: payload,
      })
    );

    // Smooth scroll to #contacto
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
  }
};

export const selectSectorAndScroll = (sectorValue: string) => {
  selectContextAndScroll({ sector: sectorValue });
};

export const selectUnitAndScroll = (unitValue: string) => {
  selectContextAndScroll({ unit: unitValue });
};

// Legacy compatibility
export const selectServiceAndScroll = (serviceValue: string) => {
  // If it's a unit or sector, route appropriately
  if (
    [
      "trailer-vip",
      "trailer-lujo",
      "bano-estandar",
      "bano-ada",
      "estacion-lavado",
      "paquete-combinado",
    ].includes(serviceValue)
  ) {
    selectUnitAndScroll(serviceValue === "trailer-lujo" ? "trailer-vip" : serviceValue);
  } else {
    selectSectorAndScroll(serviceValue);
  }
};
