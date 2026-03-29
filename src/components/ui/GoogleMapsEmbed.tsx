interface GoogleMapsEmbedProps {
  query: string;
}

export function GoogleMapsEmbed({ query }: GoogleMapsEmbedProps) {
  const encodedQuery = encodeURIComponent(query);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border aspect-video">
      <iframe
        title="Google Maps"
        src={`https://www.google.com/maps?q=${encodedQuery}&output=embed`}
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
