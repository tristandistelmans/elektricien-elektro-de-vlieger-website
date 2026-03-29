import type { ClientConfig } from "./src/types/client";

const config: ClientConfig = {
  business: {
    name: "Elektro De Vlieger",
    owner: {
      firstName: "Robbe",
      lastName: "De Vlieger",
    },
    tagline: "Uw elektricien in Maldegem en omstreken",
    description: "Elektro De Vlieger staat voor vakmanschap, betrouwbaarheid en persoonlijke service. Van algemene elektriciteitswerken tot zonnepanelen, domotica en laadpalen.",
    phone: "0478084740",
    email: "info@elektrodevlieger.be",
    address: {
      street: "Canadezenlaan 20",
      city: "Maldegem",
      postalCode: "9991",
    },
    region: "Oost- & West-Vlaanderen",
    btw: "BE 1020.550.559",
    socials: {
      facebook: "https://www.facebook.com/profile.php?id=61554358655826",
      instagram: "https://www.instagram.com/elektrodevlieger/",
    },
  },

  niche: "elektricien",

  theme: {
    primaryColor: "#10113d",
    accentColor: "#FFC736",
    backgroundColor: "#FFFFFF",
    textColor: "#10113d",
    font: "DM Sans",
    style: "zakelijk",
  },

  sections: [],

  seo: {
    title: "Elektro De Vlieger | Elektricien Maldegem - Zonnepanelen, Domotica & Laadpalen",
    description: "Elektro De Vlieger - uw betrouwbare elektricien in Maldegem en heel Oost- & West-Vlaanderen. Specialist in zonnepanelen, thuisbatterijen, laadpalen, domotica en algemene elektriciteitswerken. RESCert gecertificeerd.",
  },
};

export default config;
