export type HeroPerspective = 'elite' | 'stress-free' | 'growth';

export type NavigationPage = 'home' | 'about' | 'solutions' | 'pricing' | 'blog' | 'contact' | 'terms' | 'privacy' | 'hipaa';

export type MetricFocus = 'cashflow' | 'efficiency' | 'outcomes';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export interface SeoConfig {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  analyticsId: string;
  robots: string;
}

export interface HeaderNavItem {
  id: string;
  label: string;
  page: NavigationPage | string;
  href?: string;
  isExternal?: boolean;
  enabled: boolean;
  order: number;
}

export interface HeaderCmsConfig {
  showTopBar: boolean;
  topNotice: string;
  topNoticeBadge?: string;
  phoneLabel: string;
  auditButtonText: string;
  showAuditButton?: boolean;
  portalLinkText?: string;
  tickerMessages?: string[];
  navItems: HeaderNavItem[];
  logoUrl?: string;
  logoHeight?: number;
}

export interface HeroPerspectiveOption {
  id: HeroPerspective;
  tabLabel: string;
  badge: string;
  headline: string;
  highlightText?: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  highlightPills: string[];
}

export interface HeroOpsActivityItem {
  label: string;
  amountOrBadge: string;
}

export interface HeroCmsConfig {
  badge: string;
  headline: string;
  highlightText: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  phoneNotice: string;
  heroImage: string;
  mediaType?: 'image' | 'video';
  videoUrl?: string;
  videoPoster?: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  trustCardBadge: string;
  trustStripTitle?: string;
  trustStripSubtitle?: string;
  // Patient Viewpoint / Perspective Options (3 editable options)
  viewpointTitle?: string;
  perspectives?: Record<HeroPerspective, HeroPerspectiveOption>;
  // Live Operations Desk Card
  opsCardTitle?: string;
  opsCardLocation?: string;
  opsCardPms?: string;
  opsCardBadge?: string;
  opsCardClaimsProcessedToday?: string;
  opsCardAmountProcessedToday?: string;
  opsRecentActivity?: HeroOpsActivityItem[];
}

export interface SecondarySliderItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  iconName?: string;
}

export interface TopSlideItem {
  id: string;
  badge?: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: NavigationPage | string;
  image?: string;
  enabled: boolean;
  order: number;
}

export interface TopSliderConfig {
  enabled: boolean;
  autoplay: boolean;
  autoplayIntervalMs: number;
  slides: TopSlideItem[];
}

export interface TrustMetricItem {
  id: string;
  value: string;
  label: string;
  subtext: string;
}

export interface PhotoShowcaseItem {
  id: string;
  title: string;
  doctorName: string;
  role: string;
  clinic: string;
  location: string;
  image: string;
  tag: string;
}

export interface WhyChooseItem {
  id: string;
  num: string;
  title: string;
  description: string;
  benefit: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: 'heroes' | 'team' | 'showcase' | 'testimonials' | 'logos' | 'blog' | 'other';
  dimensions?: string;
  altText?: string;
  updatedAt?: string;
}

export interface PricingTierItem {
  name: string;
  tag: string;
  idealFor: string;
  price: string;
  unit: string;
  features: string[];
  highlight: boolean;
  cta: string;
  enabled?: boolean;
}

export interface ClaimStageItem {
  stageNumber: number;
  name: string;
  description: string;
  outcome: string;
}

export interface AboutLeadershipItem {
  name: string;
  role: string;
  credentials: string;
  experience: string;
  image: string;
  bio: string;
}

export interface CmsData {
  brand: {
    name: string;
    legalEntityName?: string;
    tagline: string;
    contactEmail: string;
    inquiriesEmail: string;
    phone: string;
    phoneDirect: string;
    address: string;
    usBusinessAddress?: string;
    mailingAddress?: string;
    billingAddress?: string;
    businessSetupType?: string;
    einTaxIdNotice?: string;
    hours: string;
  };
  header: HeaderCmsConfig;
  topSlider?: TopSliderConfig;
  topTickerItems: { category: string; title: string; badge?: string }[];
  hero: HeroCmsConfig;
  secondarySlider: SecondarySliderItem[];
  trustMetrics: TrustMetricItem[];
  photoShowcase: {
    title: string;
    subtitle: string;
    items: PhotoShowcaseItem[];
  };
  whyChoose: {
    badge: string;
    title: string;
    subtitle: string;
    items: WhyChooseItem[];
  };
  services: {
    title: string;
    subtitle: string;
    pillars: ServicePillar[];
  };
  pricing: {
    title: string;
    subtitle: string;
    guaranteeText: string;
    tiers: PricingTierItem[];
  };
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  footer: {
    aboutText: string;
    disclaimer: string;
    copyright: string;
    agencyCredit?: string;
    pmsList: string[];
    logoUrl?: string;
    logoHeight?: number;
  };
  branding?: {
    headerLogoUrl?: string;
    footerLogoUrl?: string;
    headerLogoHeight?: number;
    footerLogoHeight?: number;
    googleDriveLogoUrl?: string;
    googleDriveFaviconUrl?: string;
    customLogoUrl?: string;
    customFaviconUrl?: string;
    agencyCredit?: string;
    showLogoImage?: boolean;
  };
  aboutPage: {
    heroTitle: string;
    heroSubtitle: string;
    missionTitle: string;
    missionText: string;
    storyTitle: string;
    storyText: string;
    stats: { label: string; value: string }[];
    leadership: AboutLeadershipItem[];
  };
  solutionsPage: {
    heroTitle: string;
    heroSubtitle: string;
    claimCycleStages: ClaimStageItem[];
  };
  blog: ResourceArticle[];
  legal: {
    terms: LegalDocument;
    privacy: LegalDocument;
    hipaa: LegalDocument;
  };
  seo: SeoConfig;
  mediaLibrary?: MediaItem[];
}

export interface LeadSubmission {
  id: string;
  doctorName: string;
  practiceName: string;
  email: string;
  phone: string;
  pmsSoftware: string;
  locationsCount: number;
  monthlyProduction: string;
  primaryChallenge: string;
  servicesInterested: string[];
  submissionDate: string;
  status: 'New' | 'Contacted' | 'Audit Scheduled' | 'Proposal Sent' | 'Closed Won' | 'Closed Lost';
  preferredDate?: string;
  preferredTime?: string;
  source?: string;
  notes?: string;
}

export interface RoiInputs {
  monthlyProduction: number;
  denialRate: number; // e.g. 12%
  arOver90Days: number;
  frontDeskHoursWeeklyOnBilling: number;
}

export interface RoiResults {
  annualLostRevenueRecovered: number;
  monthlyCashBoost: number;
  hoursReclaimedMonthly: number;
  daysInArReduction: number;
  totalAnnualFinancialGain: number;
}

export interface ServicePillar {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  deliverables: string[];
  metricsImpact: string;
  workflowDetail: string;
  badge: string;
  enabled?: boolean;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Security & Tech' | 'Pricing' | 'Onboarding' | 'Billing & Claims';
  question: string;
  answer: string;
  enabled?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  actionLink?: {
    label: string;
    action: 'audit' | 'consultation' | 'calculator' | 'pricing' | 'brochure';
  };
}

export interface ResourceArticle {
  id: string;
  title: string;
  slug?: string;
  category: string;
  readTime: string;
  snippet: string;
  content: string[];
  author: string;
  date: string;
  downloadableChecklist?: string;
  featuredImage?: string;
  status?: 'Published' | 'Draft';
  tags?: string[];
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface TestimonialItem {
  id: string;
  doctorName: string;
  role: string;
  practiceName: string;
  location: string;
  pms: string;
  quote: string;
  metricsResult: string;
  image: string;
  rating?: number;
  enabled?: boolean;
}
