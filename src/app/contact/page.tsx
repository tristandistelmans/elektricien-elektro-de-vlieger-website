"use client";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function Contact() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative bg-bg-alt py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-6">Contact</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[4.5vw] font-black tracking-tight leading-[1.1] max-w-3xl">
              Vrijblijvend contact opnemen
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-text-muted text-lg leading-relaxed max-w-xl">
              Heeft u een vraag, wilt u een offerte of wilt u een afspraak maken?
              Neem gerust contact op. We reageren snel.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-bg py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Contact info */}
            <Reveal>
              <div className="space-y-8">
                <div className="space-y-6">
                  <a
                    href="tel:0478084740"
                    className="flex items-center gap-4 text-text hover:text-accent transition-colors group"
                  >
                    <div className="flex items-center justify-center w-14 h-14 rounded-full border border-border group-hover:border-accent/40 transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Telefoon / WhatsApp</p>
                      <p className="text-lg font-medium">0478 08 47 40</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@elektrodevlieger.be"
                    className="flex items-center gap-4 text-text hover:text-accent transition-colors group"
                  >
                    <div className="flex items-center justify-center w-14 h-14 rounded-full border border-border group-hover:border-accent/40 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">E-mail</p>
                      <p className="text-lg font-medium">info@elektrodevlieger.be</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 text-text">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full border border-border">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Adres</p>
                      <p className="text-lg font-medium">Canadezenlaan 20</p>
                      <p className="text-text-muted">9991 Maldegem (Adegem)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-text">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full border border-border">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Bereikbaar</p>
                      <p className="text-lg font-medium">Ma - Vr: 06:00 - 22:00</p>
                      <p className="text-text-muted">Za - Zo: 06:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex gap-4 pt-4">
                  <a href="https://www.facebook.com/profile.php?id=61554358655826" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-accent transition-colors">Facebook</a>
                  <a href="https://www.instagram.com/elektrodevlieger/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-accent transition-colors">Instagram</a>
                </div>
              </div>
            </Reveal>

            {/* Right - Form */}
            <Reveal delay={0.2} direction="right">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input type="text" placeholder="Uw naam" className="input-underline" required />
                </div>
                <div>
                  <input type="email" placeholder="Uw e-mailadres" className="input-underline" required />
                </div>
                <div>
                  <input type="tel" placeholder="Uw telefoonnummer" className="input-underline" />
                </div>
                <div>
                  <select className="input-underline bg-transparent" defaultValue="">
                    <option value="" disabled>Waar gaat uw vraag over?</option>
                    <option value="elektriciteit">Algemene elektriciteit</option>
                    <option value="zonnepanelen">Zonnepanelen</option>
                    <option value="thuisbatterij">Thuisbatterij</option>
                    <option value="laadpalen">Laadpalen</option>
                    <option value="domotica">Domotica</option>
                    <option value="ventilatie">Ventilatie</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>
                <div>
                  <textarea placeholder="Uw bericht" rows={4} className="input-underline resize-none" required />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-[#10113d] font-semibold px-8 py-4 rounded-full transition-colors duration-300"
                >
                  Verstuur
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </Reveal>
          </div>

          {/* Google Maps */}
          <Reveal delay={0.2} className="mt-20">
            <div className="relative w-full overflow-hidden rounded-xl border border-border aspect-[21/9]">
              <iframe
                title="Google Maps"
                src={`https://www.google.com/maps?q=${encodeURIComponent("Canadezenlaan 20, 9991 Maldegem, Belgium")}&output=embed`}
                className="absolute inset-0 h-full w-full opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
