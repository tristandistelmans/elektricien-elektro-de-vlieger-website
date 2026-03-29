import { services } from "@/lib/data";
import DienstDetailClient from "./DienstDetailClient";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function DienstPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DienstDetailClient slug={slug} />;
}
