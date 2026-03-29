/**
 * ProductCard — Kaart met afbeelding, titel, categorie en save-knop
 *
 * Bron: 21st.dev (cards-1)
 * Type: Kaart / product listing
 * Stijl: Clean, e-commerce stijl, hover-zoom op afbeelding
 * Wanneer gebruiken: Diensten tonen, portfolio items, producten
 * Past bij niches: Alle niches — universeel voor diensten/producten
 *
 * Dependencies: lucide-react
 * Props: imageUrl, title, category, href, onSave?
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  category: string;
  href: string;
  onSave?: () => void;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, imageUrl, title, category, href, onSave, ...props }, ref) => {
    const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onSave?.();
    };

    return (
      <div ref={ref} className={cn("group relative block overflow-hidden rounded-lg border bg-bg transition-all duration-300 ease-in-out hover:shadow-lg", className)} {...props}>
        <a href={href} aria-label={title}>
          <div className="aspect-square overflow-hidden">
            <img src={imageUrl} alt={title} className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
          </div>
          <div className="p-4">
            <h3 className="font-semibold leading-tight truncate">{title}</h3>
            <p className="mt-1 text-sm text-text-muted">{category}</p>
          </div>
        </a>
        <button
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-bg/80 flex items-center justify-center opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-bg"
          onClick={handleSaveClick} aria-label="Opslaan"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
    );
  },
);
ProductCard.displayName = "ProductCard";

export { ProductCard };
