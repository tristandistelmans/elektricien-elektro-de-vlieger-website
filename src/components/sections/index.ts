import type { ComponentType } from "react";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { About } from "./About";
import { HowItWorks } from "./HowItWorks";
import { Gallery } from "./Gallery";
import { Testimonials } from "./Testimonials";
import { Contact } from "./Contact";
import { Pricing } from "./Pricing";
import { FAQ } from "./FAQ";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const sectionComponents: Record<string, ComponentType<any>> = {
  hero: Hero,
  services: Services,
  about: About,
  howItWorks: HowItWorks,
  gallery: Gallery,
  testimonials: Testimonials,
  contact: Contact,
  pricing: Pricing,
  faq: FAQ,
};

export { Hero, Services, About, HowItWorks, Gallery, Testimonials, Contact, Pricing, FAQ };
