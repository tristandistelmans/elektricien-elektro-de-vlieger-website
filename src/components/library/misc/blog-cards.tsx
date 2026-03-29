/**
 * BlogCards — Blog/nieuws sectie met 3-kolom card grid
 *
 * Bron: 21st.dev (Blog7)
 * Type: Content sectie
 * Stijl: Clean, informatief, professioneel
 * Wanneer gebruiken: Blog/nieuws sectie, tips & tricks, artikelen
 * Past bij niches: Consultants, advocaten, accountants, kennisgerichte bedrijven
 * Niet geschikt voor: Simpele vakmannen-sites (te content-heavy)
 *
 * Dependencies: lucide-react
 * Props: tagline, heading, description, posts [{id, title, summary, author, published, url, image}]
 */
import { ArrowRight } from "lucide-react";
import { ShadcnBadge } from "@/components/ui/shadcn-badge";
import { ShadcnCard, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn-card";

interface Post {
  id: string;
  title: string;
  summary: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface BlogCardsProps {
  tagline: string;
  heading: string;
  description: string;
  posts: Post[];
}

export function BlogCards({ tagline, heading, description, posts }: BlogCardsProps) {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <ShadcnBadge variant="secondary" className="mb-6">{tagline}</ShadcnBadge>
          <h2 className="mb-3 text-pretty text-3xl font-semibold md:text-4xl lg:text-5xl">{heading}</h2>
          <p className="mb-8 text-text-muted md:text-base lg:max-w-2xl lg:text-lg">{description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <ShadcnCard key={post.id} className="grid grid-rows-[auto_auto_1fr_auto]">
              <div className="aspect-[16/9] w-full">
                <a href={post.url} className="transition-opacity duration-200 hover:opacity-70">
                  <img src={post.image} alt={post.title} className="h-full w-full rounded-t-lg object-cover object-center" />
                </a>
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                  <a href={post.url}>{post.title}</a>
                </h3>
              </CardHeader>
              <CardContent><p className="text-text-muted">{post.summary}</p></CardContent>
              <CardFooter>
                <a href={post.url} className="flex items-center hover:underline">
                  Lees meer <ArrowRight className="ml-2 size-4" />
                </a>
              </CardFooter>
            </ShadcnCard>
          ))}
        </div>
      </div>
    </section>
  );
}
