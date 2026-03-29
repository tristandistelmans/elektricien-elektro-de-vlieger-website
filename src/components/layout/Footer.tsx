import { Container } from "@/components/ui";
import type { ClientConfig } from "@/types/client";

interface FooterProps {
  config: ClientConfig;
}

export function Footer({ config }: FooterProps) {
  const { business } = config;
  const year = new Date().getFullYear();

  const socialLabels: Record<string, string> = {
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    tiktok: "TikTok",
  };

  const socialEntries = business.socials
    ? Object.entries(business.socials).filter(([, url]) => url)
    : [];

  return (
    <footer className="bg-text text-bg py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Left column — brand + tagline */}
          <div>
            <p className="font-serif text-2xl lg:text-3xl text-bg tracking-tight">
              {business.name}
            </p>
            {business.tagline && (
              <p className="mt-4 text-bg/50 leading-relaxed max-w-sm">
                {business.tagline}
              </p>
            )}
          </div>

          {/* Right column — contact info */}
          <div className="space-y-6">
            <div className="space-y-3 text-sm text-bg/70">
              {business.phone && (
                <p>
                  <a
                    href={`tel:${business.phone.replace(/\s/g, "")}`}
                    className="hover:text-bg transition-colors duration-300"
                  >
                    {business.phone}
                  </a>
                </p>
              )}
              {business.email && (
                <p>
                  <a
                    href={`mailto:${business.email}`}
                    className="hover:text-bg transition-colors duration-300"
                  >
                    {business.email}
                  </a>
                </p>
              )}
              <p className="text-bg/40">
                {business.address.street}
                <br />
                {business.address.postalCode} {business.address.city}
              </p>
            </div>

            {/* Social links as text */}
            {socialEntries.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {socialEntries.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bg/40 hover:text-bg transition-colors duration-300"
                  >
                    {socialLabels[key] || key}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 lg:mt-24 pt-6 border-t border-bg/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-bg/30">
          <p>
            &copy; {year} {business.name}
          </p>
          {business.btw && <p>{business.btw}</p>}
        </div>
      </Container>
    </footer>
  );
}
