// ─── Niche & Theme ───────────────────────────────────────────────

export type Niche =
  | 'elektricien'
  | 'kapper'
  | 'restaurant'
  | 'loodgieter'
  | 'schilder'
  | 'advocaat'
  | 'trainer'
  | 'kinesist';

export type ThemeStyle =
  | 'minimalist'
  | 'warm'
  | 'luxe'
  | 'zakelijk'
  | 'ambachtelijk'
  | 'creatief';

export interface Theme {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  font: 'Inter' | 'Plus Jakarta Sans' | 'DM Sans';
  style: ThemeStyle;
}

// ─── Business Info ───────────────────────────────────────────────

export interface Owner {
  firstName: string;
  lastName: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
}

export interface Socials {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
}

export interface BusinessInfo {
  name: string;
  owner: Owner;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: Address;
  region: string;
  btw?: string;
  socials?: Socials;
}

// ─── Section Data Types ──────────────────────────────────────────

export interface HeroData {
  headline: string;
  subline: string;
  cta: {
    text: string;
    href: string;
  };
  image?: string;
}

export interface Service {
  title: string;
  description: string;
  icon?: string;
}

export interface ServicesData {
  services: Service[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutData {
  title: string;
  text: string;
  image?: string;
  stats?: Stat[];
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface HowItWorksData {
  steps: Step[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryData {
  images: GalleryImage[];
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  role?: string;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
}

export interface ContactData {
  title?: string;
  subtitle?: string;
  showForm?: boolean;
  showMap?: boolean;
  mapQuery?: string;
}

export interface PricingItem {
  name: string;
  price: string;
  description?: string;
}

export interface PricingCategory {
  name: string;
  items: PricingItem[];
}

export interface PricingData {
  categories: PricingCategory[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  items: FAQItem[];
}

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
}

// ─── Section Types ───────────────────────────────────────────────

export type SectionType =
  | 'hero'
  | 'services'
  | 'about'
  | 'howItWorks'
  | 'gallery'
  | 'testimonials'
  | 'contact'
  | 'pricing'
  | 'faq'
  | 'menu';

type SectionDataMap = {
  hero: HeroData;
  services: ServicesData;
  about: AboutData;
  howItWorks: HowItWorksData;
  gallery: GalleryData;
  testimonials: TestimonialsData;
  contact: ContactData;
  pricing: PricingData;
  faq: FAQData;
  menu: MenuData;
};

export interface Section<T extends SectionType = SectionType> {
  type: T;
  variant: string;
  data: SectionDataMap[T];
}

// ─── SEO ─────────────────────────────────────────────────────────

export interface SEO {
  title: string;
  description: string;
}

// ─── Client Config (root type) ───────────────────────────────────

export interface ClientConfig {
  business: BusinessInfo;
  niche: Niche;
  theme: Theme;
  sections: Section[];
  seo: SEO;
}
