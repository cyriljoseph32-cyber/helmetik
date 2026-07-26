import type { FeatureId, PlanId } from "@/content/pricing";
import type { FaqId } from "@/content/faq";
import type { Area } from "@/content/locations";
import type {
  HeroCycleStep,
  FullCycleStep,
  HelmetType,
} from "@/content/cycle";

export interface StepCopy {
  label: string;
  desc: string;
}

export interface Dictionary {
  /** Navigation labels. */
  nav: {
    home: string;
    howItWorks: string;
    locations: string;
    pricing: string;
    partners: string;
    about: string;
    contact: string;
    menu: string;
    close: string;
    language: string;
  };

  /** Reusable labels and actions. */
  common: {
    findNearest: string;
    howItWorksCta: string;
    getDirections: string;
    callUs: string;
    whatsapp: string;
    emailUs: string;
    selfService: string;
    minutes: string;
    minutesShort: string;
    from: string;
    baht: string;
    perWash: string;
    mostPopular: string;
    included: string;
    notIncluded: string;
    comingSoon: string;
    backHome: string;
    skipToContent: string;
    openMenu: string;
  };

  reassurance: {
    location: string;
    selfService: string;
    time: string;
    price: string;
  };

  footer: {
    tagline: string;
    explore: string;
    legalHeading: string;
    contactHeading: string;
    followHeading: string;
    socialSoon: string;
    privacy: string;
    terms: string;
    rights: string;
    builtIn: string;
    entityNote: string;
  };

  home: {
    heroKicker: string;
    heroTitle: string;
    heroTitleAccent: string;
    heroSubtitle: string;
    heroProblem: string;
    cycleHeading: string;
    cycleSub: string;
    plansHeading: string;
    plansSub: string;
    hostHeading: string;
    hostSub: string;
    hostCta: string;
    reviewsHeading: string;
    reviewsEmpty: string;
    finalHeading: string;
    finalSub: string;
  };

  howItWorks: {
    metaTitle: string;
    title: string;
    intro: string;
    stepsHeading: string;
    scopeHeading: string;
    cleansHeading: string;
    limitsHeading: string;
    compatHeading: string;
    compatIntro: string;
    faqHeading: string;
    claimNote: string;
  };

  locations: {
    metaTitle: string;
    title: string;
    intro: string;
    nearestBtn: string;
    locating: string;
    geoDenied: string;
    geoUnsupported: string;
    listHeading: string;
    emptyTitle: string;
    emptyBody: string;
    demoBadge: string;
    availabilityHostHours: string;
    availability247: string;
    away: string;
    hostCta: string;
    mapLabel: string;
    areaLabel: string;
  };

  pricing: {
    metaTitle: string;
    title: string;
    intro: string;
    compareHeading: string;
    featureCol: string;
    paymentHeading: string;
    paymentNote: string;
    ctaFind: string;
  };

  partners: {
    metaTitle: string;
    title: string;
    intro: string;
    whyHeading: string;
    why: { title: string; body: string }[];
    provideHeading: string;
    weProvide: string;
    weProvideItems: string[];
    youProvide: string;
    youProvideItems: string[];
    formHeading: string;
    formIntro: string;
  };

  about: {
    metaTitle: string;
    title: string;
    lead: string;
    body: string[];
    valuesHeading: string;
    values: { title: string; body: string }[];
    teamHeading: string;
    teamNote: string;
  };

  contact: {
    metaTitle: string;
    title: string;
    intro: string;
    hoursHeading: string;
    hoursBody: string;
    directHeading: string;
    formHeading: string;
    waPrefill: string;
  };

  form: {
    name: string;
    business: string;
    venueType: string;
    venueTypes: string[];
    area: string;
    selectArea: string;
    phone: string;
    email: string;
    message: string;
    messagePlaceholder: string;
    submitContact: string;
    submitHost: string;
    sending: string;
    successTitle: string;
    successBody: string;
    orWhatsapp: string;
    errorTitle: string;
    errorBody: string;
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    tooShort: string;
  };

  legal: {
    privacyTitle: string;
    termsTitle: string;
    lastUpdated: string;
    privacy: { heading: string; body: string }[];
    terms: { heading: string; body: string }[];
  };

  notFound: {
    code: string;
    title: string;
    body: string;
    findMachine: string;
    home: string;
  };

  reviewsModuleNote: string;

  /** Per-area display names. */
  areas: Record<Area, string>;

  /** Hero 4-step cycle copy. */
  heroCycle: Record<HeroCycleStep, StepCopy>;

  /** Full technical cycle copy. */
  fullCycle: Record<FullCycleStep, StepCopy>;

  /** Clean-scope item labels. */
  scope: {
    cleans: Record<"outerShell" | "innerFoam" | "strap" | "padding", string>;
    limits: Record<
      "removableLiner" | "visorSeparate" | "electronics",
      string
    >;
  };

  /** Helmet compatibility labels + notes. */
  helmetTypes: Record<HelmetType, { label: string; note: string }>;

  /** Plan display names + one-line summaries. */
  plans: Record<PlanId, { name: string; summary: string }>;

  /** Feature labels for the pricing comparison. */
  features: Record<FeatureId, string>;

  /** FAQ question/answer per id. */
  faq: Record<FaqId, { q: string; a: string }>;

  /** Payment method labels. */
  payments: Record<"cash" | "promptpay" | "card", string>;

  /** Page meta descriptions (SEO). */
  meta: {
    home: { title: string; description: string };
    howItWorks: { description: string };
    locations: { description: string };
    pricing: { description: string };
    partners: { description: string };
    about: { description: string };
    contact: { description: string };
    keywords: string[];
  };
}
