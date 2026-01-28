import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Import journey images
import img201710 from "@/assets/journey/201710-graduation.jpg";
import img201908 from "@/assets/journey/201908-after-stress.jpg";
import img202012 from "@/assets/journey/202012-after-attempt1.jpg";
import img202204 from "@/assets/journey/202204-regain1.jpg";
import img202311 from "@/assets/journey/202311-after-attempt2.jpg";
import img202405 from "@/assets/journey/202405-regain2.jpg";

interface JourneyCard {
  id: number;
  date: string;
  label: string;
  weight: string;
  description: string;
  afterDescription: string;
  beforeImage: string;
  afterImage: string;
}

const journeyCards: JourneyCard[] = [
  {
    id: 1,
    date: "Oct 2017",
    label: "Stress",
    weight: "+60 lbs",
    description: "Graduation weight with a lean and mobile body",
    afterDescription: "Desk job and stress eating led to rapid weight gain",
    beforeImage: img201710,
    afterImage: img201908,
  },
  {
    id: 2,
    date: "Dec 2020",
    label: "Sustainability",
    weight: "+80 lbs",
    description: "Lost 60 lbs with veggie & smoothie cleanse",
    afterDescription: "Regained the weight once I returned to eating normally",
    beforeImage: img202012,
    afterImage: img202204,
  },
  {
    id: 3,
    date: "Nov 2023",
    label: "Disruption",
    weight: "+60 lbs",
    description: "Lost 60 lbs with carnivore, IF & daily exercise",
    afterDescription: "Regained the weight as frequent travel turned flexibility into old habits",
    beforeImage: img202311,
    afterImage: img202405,
  },
];

function JourneyCard({ card }: { card: JourneyCard }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onClick={() => setShowAfter(!showAfter)}
      onMouseEnter={() => setShowAfter(true)}
      onMouseLeave={() => setShowAfter(false)}
    >
      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary relative">
        {/* Render both images and toggle visibility for instant switching */}
        <img
          src={card.beforeImage}
          alt={card.description}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            showAfter ? "opacity-0" : "opacity-100"
          )}
        />
        <img
          src={card.afterImage}
          alt={card.afterDescription}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            showAfter ? "opacity-100" : "opacity-0"
          )}
        />
        
        {/* Weight badge */}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full z-10">
          <span className="text-sm font-semibold text-destructive">{card.weight}</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground mb-1">{card.date} • Tap to toggle</p>
        <h3 className="font-semibold text-primary">{card.label}</h3>
        <p className="text-sm text-muted-foreground mt-1 transition-opacity duration-300">
          {showAfter ? card.afterDescription : card.description}
        </p>
      </div>
    </div>
  );
}

function JourneyCardsGrid() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
      {journeyCards.map((card, index) => (
        <div
          key={card.id}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <JourneyCard card={card} />
        </div>
      ))}
    </div>
  );
}

export function JourneySection() {
  return (
    <section id="journey" className="py-7 bg-secondary/30">
      <div className="container">
        {/* Personal Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-6">
            <span className="text-sm font-medium text-accent">My Transformation Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-normal mb-6 text-primary">
            Lost 60 Pounds. <span className="text-accent">Three Times.</span>
          </h2>
          
          {/* Personal Story */}
          <div className="bg-card/50 backdrop-blur rounded-2xl p-6 md:p-8 border border-border/50 text-center">
            <p className="text-base md:text-lg text-primary font-medium mb-4">
              Hi, this is Oscar Poon from Vancouver, Canada.
            </p>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Over the last 10 years, I went through repeated and extreme weight transformations. Each cycle followed the same pattern: discipline, results, life disruption, and regain.
              </p>
              <p>
                Every time, something different derailed me — a stressful job, travel, emotional overwhelm. <span className="text-primary font-medium">The weight loss worked. Life just got in the way.</span>
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-6 italic">
              Hover or tap to see the transformations.
            </p>
          </div>
        </div>

        <JourneyCardsGrid />
      </div>
    </section>
  );
}
