import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Resource {
  category: string;
  name: string;
  description: string;
  url: string;
}

const resources: Resource[] = [
  {
    category: "Government & Research",
    name: "CDC Adult Obesity Facts",
    description:
      "Current statistics and research on adult obesity in the United States from the Centers for Disease Control and Prevention.",
    url: "https://www.cdc.gov/obesity/adult-obesity-facts/index.html",
  },
  {
    category: "Government & Research",
    name: "Public Health Agency of Canada Obesity Statistics",
    description:
      "Canadian obesity statistics and public health information related to overweight and obesity trends across Canada.",
    url: "https://www.canada.ca/en/public-health/services/publications/healthy-living/obesity-statistics-canada.html",
  },
  {
    category: "Recommended Health Resources",
    name: "Site Promo Health Directory",
    description:
      "A directory of health related websites, articles, and wellness resources covering a variety of health topics.",
    url: "https://site-promo.com/health/",
  },
];

const categories = Array.from(new Set(resources.map((r) => r.category)));

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-[hsl(0_0%_14%)] bg-[hsl(0_0%_7%)] p-6 transition-all duration-500 hover:border-[hsl(38_90%_50%/0.4)] hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="text-base font-bold text-[hsl(0_0%_90%)] mb-2 leading-tight">
        {resource.name}
      </h3>
      <p className="text-sm text-[hsl(0_0%_56%)] leading-relaxed mb-4">
        {resource.description}
      </p>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-[hsl(38_90%_60%)] transition-colors"
      >
        Visit Resource
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Recommended Resources | LS Diet</title>
        <meta
          name="description"
          content="Curated health, obesity, and weight management resources selected by LS Diet. Government statistics, research, and trusted directories."
        />
        <link rel="canonical" href="https://lsdiet.com/resources" />
        <meta property="og:title" content="Recommended Resources | LS Diet" />
        <meta
          property="og:description"
          content="Curated health, obesity, and weight management resources selected by LS Diet."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lsdiet.com/resources" />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[hsl(0_0%_96%)] mb-4">
              Recommended Resources
            </h1>
            <p className="text-base md:text-lg text-[hsl(0_0%_56%)] leading-relaxed">
              LS Diet focuses on preventing weight regain through behaviour change, awareness,
              and practical action. Below are selected resources that may help you learn more
              about obesity, weight management, health, and long term behaviour change.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-14">
            {categories.map((category) => {
              const categoryResources = resources.filter(
                (r) => r.category === category
              );
              return (
                <section key={category}>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-6">
                    {category}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {categoryResources.map((resource, index) => (
                      <ResourceCard
                        key={resource.name}
                        resource={resource}
                        index={index}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="mt-16 pt-8 border-t border-[hsl(0_0%_14%)]">
            <p className="text-xs text-[hsl(0_0%_40%)] leading-relaxed max-w-3xl">
              LS Diet does not control or endorse all content found on external websites.
              Readers should use their own judgment when reviewing third-party resources.
            </p>
          </div>
        </div>
      </main>

      <FooterSimple />
    </div>
  );
}
