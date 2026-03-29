"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Button, FadeInOnScroll, GoogleMapsEmbed } from "@/components/ui";
import type { ClientConfig, ContactData } from "@/types/client";

interface ContactProps {
  data: ContactData;
  variant: string;
  config: ClientConfig;
}

function SplitForm({ data, config }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { business } = config;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!data.showForm) return;
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses =
    "w-full bg-transparent border-0 border-b border-border py-4 text-text placeholder:text-text-muted/40 focus:outline-none focus:border-primary transition-colors duration-300 text-base";

  return (
    <section id="contact" className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Form — 7 columns */}
          <div className="lg:col-span-7">
            <FadeInOnScroll direction="none">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">
                Contact
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll direction="none" delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[1.05] mb-12">
                Laten we{" "}
                <span className="font-serif italic font-normal">
                  samenwerken
                </span>
              </h2>
            </FadeInOnScroll>

            {submitted ? (
              <FadeInOnScroll direction="up">
                <div className="py-20 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <svg
                      className="w-7 h-7 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </motion.div>
                  <p className="text-2xl font-semibold text-text">
                    Bericht verzonden
                  </p>
                  <p className="mt-3 text-text-muted">
                    {business.owner.firstName} neemt zo snel mogelijk contact
                    op.
                  </p>
                </div>
              </FadeInOnScroll>
            ) : (
              <FadeInOnScroll direction="none" delay={0.2}>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                          focusedField === "name"
                            ? "text-xs text-primary -top-1"
                            : "text-sm text-text-muted top-4"
                        }`}
                      >
                        Naam
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className={inputClasses}
                        onFocus={() => setFocusedField("name")}
                        onBlur={(e) =>
                          !e.target.value && setFocusedField(null)
                        }
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                          focusedField === "email"
                            ? "text-xs text-primary -top-1"
                            : "text-sm text-text-muted top-4"
                        }`}
                      >
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={inputClasses}
                        onFocus={() => setFocusedField("email")}
                        onBlur={(e) =>
                          !e.target.value && setFocusedField(null)
                        }
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="phone"
                      className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                        focusedField === "phone"
                          ? "text-xs text-primary -top-1"
                          : "text-sm text-text-muted top-4"
                      }`}
                    >
                      Telefoon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={inputClasses}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={(e) =>
                        !e.target.value && setFocusedField(null)
                      }
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="message"
                      className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                        focusedField === "message"
                          ? "text-xs text-primary -top-1"
                          : "text-sm text-text-muted top-4"
                      }`}
                    >
                      Bericht
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className={`${inputClasses} resize-none`}
                      onFocus={() => setFocusedField("message")}
                      onBlur={(e) =>
                        !e.target.value && setFocusedField(null)
                      }
                    />
                  </div>

                  <div className="pt-8">
                    <Button type="submit" size="lg" className="w-full">
                      Verstuur bericht
                    </Button>
                  </div>
                </form>
              </FadeInOnScroll>
            )}
          </div>

          {/* Contact info — 5 columns */}
          <div className="lg:col-span-5 lg:pt-24">
            <FadeInOnScroll direction="none" delay={0.3}>
              <div className="space-y-10">
                {/* Phone */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-3">
                    Telefoon
                  </p>
                  <a
                    href={`tel:${business.phone.replace(/\s/g, "")}`}
                    className="text-xl font-medium text-text hover:text-primary transition-colors duration-200"
                  >
                    {business.phone}
                  </a>
                </div>

                {/* Email */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-3">
                    E-mail
                  </p>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-xl font-medium text-text hover:text-primary transition-colors duration-200"
                  >
                    {business.email}
                  </a>
                </div>

                {/* Address */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-3">
                    Adres
                  </p>
                  <p className="text-text leading-relaxed">
                    {business.address.street}
                    <br />
                    {business.address.postalCode} {business.address.city}
                  </p>
                </div>

                {/* Map */}
                {data.showMap && data.mapQuery && (
                  <div className="pt-4">
                    <GoogleMapsEmbed query={data.mapQuery} />
                  </div>
                )}
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Minimal({ data, config }: ContactProps) {
  const { business } = config;

  return (
    <section id="contact" className="py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <FadeInOnScroll direction="none">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">
              Contact
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll direction="none" delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[1.05]">
              Laten we{" "}
              <span className="font-serif italic font-normal">
                samenwerken
              </span>
            </h2>
          </FadeInOnScroll>

          <FadeInOnScroll direction="none" delay={0.2}>
            <div className="mt-12">
              <a
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-text hover:text-primary transition-colors duration-300 tracking-tight"
              >
                {business.phone}
              </a>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll direction="none" delay={0.3}>
            <div className="mt-6">
              <a
                href={`mailto:${business.email}`}
                className="text-lg text-text-muted hover:text-primary transition-colors duration-200"
              >
                {business.email}
              </a>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll direction="none" delay={0.35}>
            <p className="mt-4 text-sm text-text-muted">
              {business.address.street}, {business.address.postalCode}{" "}
              {business.address.city}
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll direction="none" delay={0.4}>
            <div className="mt-10">
              <Button
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                size="lg"
              >
                Bel {business.owner.firstName}
              </Button>
            </div>
          </FadeInOnScroll>

          {data.showMap && data.mapQuery && (
            <FadeInOnScroll direction="up" delay={0.5}>
              <div className="mt-16">
                <GoogleMapsEmbed query={data.mapQuery} />
              </div>
            </FadeInOnScroll>
          )}
        </div>
      </Container>
    </section>
  );
}

export function Contact(props: ContactProps) {
  switch (props.variant) {
    case "minimal":
      return <Minimal {...props} />;
    case "split-form":
    default:
      return <SplitForm {...props} />;
  }
}
