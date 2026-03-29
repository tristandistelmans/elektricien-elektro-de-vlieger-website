"use client";

import { Container, SectionHeading, FadeInOnScroll } from "@/components/ui";
import type { ClientConfig, PricingData } from "@/types/client";

interface PricingProps {
  data: PricingData;
  variant: string;
  config: ClientConfig;
}

export function Pricing({ data }: PricingProps) {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <Container>
        <SectionHeading title="Prijzen" />

        <div className="mt-12 max-w-3xl space-y-12">
          {data.categories.map((category, ci) => (
            <FadeInOnScroll key={ci} delay={ci * 0.1}>
              <div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
                  {category.name}
                </h3>
                <div className="divide-y divide-border">
                  {category.items.map((item, ii) => (
                    <div
                      key={ii}
                      className="flex items-start justify-between py-4 gap-4"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-text">{item.name}</p>
                        {item.description && (
                          <p className="mt-1 text-sm text-text-muted">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <p className="shrink-0 text-lg font-semibold text-text tabular-nums">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
