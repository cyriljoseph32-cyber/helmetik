/**
 * Global site facts — contact, entity, hours.
 * SINGLE SOURCE OF TRUTH. Editing values here updates the whole site
 * (footer, contact page, schema.org, tel/mailto/WhatsApp links).
 *
 * Fields marked `NEEDS CLIENT DATA` are editorial placeholders and are
 * surfaced in the final handover report. Never invent values for them.
 */

export const site = {
  name: "Helmetik",
  tagline: "Clean helmet. Clear head.",
  descriptor: "Automated Helmet Cleaning — UV-C + 3D Foam",
  city: "Koh Samui",
  region: "Surat Thani",
  country: "Thailand",
  countryCode: "TH",

  /**
   * Phone number. Displayed in local Thai format; `tel:` uses full E.164.
   * NEEDS CLIENT DATA: confirm the exact number — the old site showed a
   * mis-segmented number and a broken tel: link.
   */
  phone: {
    e164: "+66653959083",
    display: "065 395 9083",
    displayIntl: "+66 65 395 9083",
  },

  /** WhatsApp uses the international number without the leading +. */
  whatsapp: {
    number: "66653959083",
    link: "https://wa.me/66653959083",
  },

  email: "info@helmetik.com",

  /**
   * The bornes are self-service. We do NOT publish invented 24/7 or template
   * opening hours (a defect of the old site). Availability follows the host
   * venue. If a machine has confirmed dedicated hours, add them per-location.
   */
  hours: {
    model: "self-service" as const,
  },

  /**
   * Legal entity. NEEDS CLIENT DATA — the old footer showed "© Island"
   * (the WordPress theme name). Replace with the real registered entity.
   */
  legalEntity: {
    name: "Helmetik", // placeholder trading name until the registered entity is confirmed
    confirmed: false,
  },

  /**
   * Social accounts. None exist yet. Footer slots stay disabled until real
   * URLs are provided — we never publish fake links.
   */
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    tiktok: null as string | null,
    line: null as string | null,
  },

  /**
   * Approximate island centre used only to centre the map before a user
   * grants geolocation. This is a public geographic reference for Koh Samui,
   * not an invented machine address.
   */
  mapDefaultCenter: { lat: 9.512, lng: 100.013, zoom: 11 },
} as const;

export type Site = typeof site;
