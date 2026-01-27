import { useState } from "react";
import { cn } from "@/lib/utils";

interface JourneyCard {
  id: number;
  date: string;
  label: string;
  weight: string;
  description: string;
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
    beforeImage: "https://freedom-weight-triangle.lovable.app/assets/201710-graduation-D0y4bW6y.jpg",
    afterImage: "https://freedom-weight-triangle.lovable.app/assets/201908-before1-B0sQ-8SM.jpg",
  },
  {
    id: 2,
    date: "Dec 2020",
    label: "Attempt #1",
    weight: "+80 lbs",
    description: "Lost 60 lbs with veggie & smoothie cleanse",
    beforeImage: "https://freedom-weight-triangle.lovable.app/assets/202012-after1-CIoyoFRh.jpg",
    afterImage: "https://freedom-weight-triangle.lovable.app/assets/202204-before2-BGRKYuZM.jpg",
  },
  {
    id: 3,
    date: "Nov 2023",
    label: "Attempt #2",
    weight: "+60 lbs",
    description: "Lost 60 lbs with carnivore, IF & daily exercise",
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
        <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
      </div>
    </div>
  );
}

export function JourneySection() {
  return (
    <section id="journey" className="py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-6">
            <span className="text-sm font-medium text-accent">My Transformation Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 text-primary">
            Lost 60 Pounds. <span className="text-accent">Three Times.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each journey taught me something new. The third time, I discovered the method that made it permanent. Hover or tap to see the transformations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {journeyCards.map((card) => (
            <JourneyCard key={card.id} card={card} />
          ))}
        </div>

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
