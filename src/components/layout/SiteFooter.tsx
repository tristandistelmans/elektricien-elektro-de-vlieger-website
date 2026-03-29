import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[#10113d] text-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <p className="text-2xl lg:text-3xl font-black tracking-tight">
              Elektro De Vlieger
            </p>
            <p className="mt-4 text-white/50 leading-relaxed max-w-sm">
              Uw elektricien in Maldegem en heel Oost- & West-Vlaanderen
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#FFC736] font-semibold mb-4">Pagina&apos;s</p>
            <div className="space-y-3 text-sm text-white/60">
              <p><Link href="/over-ons" className="hover:text-white transition-colors">Over ons</Link></p>
              <p><Link href="/diensten" className="hover:text-white transition-colors">Diensten</Link></p>
              <p><Link href="/realisaties" className="hover:text-white transition-colors">Realisaties</Link></p>
              <p><Link href="/recensies" className="hover:text-white transition-colors">Recensies</Link></p>
              <p><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></p>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#FFC736] font-semibold mb-4">Contact</p>
            <div className="space-y-3 text-sm text-white/60">
              <p>
                <a href="tel:0478084740" className="hover:text-white transition-colors">
                  0478 08 47 40
                </a>
              </p>
              <p>
                <a href="mailto:info@elektrodevlieger.be" className="hover:text-white transition-colors">
                  info@elektrodevlieger.be
                </a>
              </p>
              <p className="text-white/40">
                Canadezenlaan 20<br />
                9991 Maldegem (Adegem)
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://www.facebook.com/profile.php?id=61554358655826" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">Facebook</a>
                <a href="https://www.instagram.com/elektrodevlieger/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Elektro De Vlieger BV</p>
          <p>BTW BE 1020.550.559</p>
        </div>
      </div>
    </footer>
  );
}
