import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
    label: "The Gain",
    weight: "+60 lbs",
    description: "Graduation weight with a lean and mobile body",
    afterDescription: "Desk job and stress eating led to rapid weight gain",
    beforeImage: "https://freedom-weight-triangle.lovable.app/assets/201710-graduation-D0y4bW6y.jpg",
    afterImage: "https://freedom-weight-triangle.lovable.app/assets/201908-before1-B0sQ-8SM.jpg",
  },
  {
    id: 2,
    date: "Dec 2020",
    label: "Attempt #1",
    weight: "+80 lbs",
    description: "Lost 60 lbs with veggie & smoothie cleanse",
    afterDescription: "Regained the weight once I returned to eating normally",
    beforeImage: "https://freedom-weight-triangle.lovable.app/assets/202012-after1-CIoyoFRh.jpg",
    afterImage: "https://freedom-weight-triangle.lovable.app/assets/202204-before2-BGRKYuZM.jpg",
  },
  {
    id: 3,
    date: "Nov 2023",
    label: "Attempt #2",
    weight: "+60 lbs",
    description: "Lost 60 lbs with carnivore, IF & daily exercise",
    afterDescription: "Regained the weight as frequent travel turned flexibility into old habits",
    beforeImage: "https://freedom-weight-triangle.lovable.app/assets/202311-after2-dLU-qBSC.jpg",
    afterImage: "https://freedom-weight-triangle.lovable.app/assets/202405-before3-CziVz2Hi.jpg",
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
        <img
          src={showAfter ? card.afterImage : card.beforeImage}
          alt={card.description}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {/* Weight badge */}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full">
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
    <section id="journey" className="py-16 bg-secondary/30">
      <div className="container">
        {/* Personal Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-6">
            <span className="text-sm font-medium text-accent">My Transformation Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-normal mb-6 text-primary">
            Lost 60 Pounds. <span className="text-accent">Three Times.</span>
          </h2>
          
          {/* Personal Story */}
          <div className="bg-card/50 backdrop-blur rounded-2xl p-6 md:p-8 border border-border/50 text-center">
            <p className="text-lg md:text-xl text-primary font-medium mb-4">
              Hi, this is Oscar Poon from Vancouver, Canada.
            </p>
            <div className="space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
              <p>
                Over the last 10 years, I went through repeated and extreme weight transformations. Each cycle followed the same pattern: discipline, results, life disruption, and regain.
              </p>
              <p>
                It wasn't the weight loss that failed. <span className="text-primary font-medium">It was what happened after.</span>
              </p>
              <p>
                By the third time, I stopped chasing the scale and started studying why weight always came back. That shift led to the method that finally made change hold.
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-6 italic">
              Hover or tap to see the transformations.
            </p>
          </div>
        </div>

        <JourneyCardsGrid />

        {/* Quote */}
        <blockquote className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-muted-foreground italic leading-relaxed">
            "Veggie cleanses, carnivore, intermittent fasting, and daily exercise - I tried everything. Each time I lost the weight, I could not keep it off. That changed when I understood my relationship with food and my real reasons for losing weight. From there, weight loss became a functional achievement rather than a number I rebounded from."
          </p>
        </blockquote>
      </div>
    </section>
  );
}
