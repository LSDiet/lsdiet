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
  label: string;
  weight: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
}

const journeyCards: JourneyCard[] = [
  {
    id: 1,
    label: "Stress Eating",
    weight: "+100 lbs",
    beforeLabel: "2018",
    afterLabel: "",
    beforeImage: img201710,
    afterImage: img201908,
  },
  {
    id: 2,
    label: "Ultra Processed Food",
    weight: "+80 lbs",
    beforeLabel: "2021",
    afterLabel: "",
    beforeImage: img202012,
    afterImage: img202204,
  },
  {
    id: 3,
    label: "Unsustainable Method",
    weight: "+80 lbs",
    beforeLabel: "2024",
    afterLabel: "",
    beforeImage: img202311,
    afterImage: img202405,
  },
];

function JourneyCard({ card }: { card: JourneyCard }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Weight badge */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
          {card.label}
        </span>
        <span className="text-sm font-extrabold text-destructive">
          {card.weight}
        </span>
      </div>

      {/* Side-by-side images */}
      <div className="grid grid-cols-2 gap-2">
        <div className="relative group">
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-black">
            <img
              loading="lazy"
              src={card.beforeImage}
              alt="Before"
              className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-[hsl(0_0%_6%/0.75)] backdrop-blur-sm text-[hsl(0_0%_96%)] px-2 py-0.5 rounded">
            Before
          </span>
        </div>

        <div className="relative group">
          <div className="aspect-[3/4] rounded-lg overflow-hidden">
            <img
              src={card.afterImage}
              alt="After"
              className={`block w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${card.id === 1 ? 'object-[center_15%]' : ''}`}
            />
          </div>
          <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-[hsl(0_0%_6%/0.75)] backdrop-blur-sm text-[hsl(0_0%_96%)] px-2 py-0.5 rounded">
            After
          </span>
        </div>
      </div>

      {/* Year caption */}
      <p className="text-center text-lg font-bold text-[hsl(0_0%_70%)]">
        {card.beforeLabel}
      </p>
    </div>
  );
}

function JourneyCardsGrid() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
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
    <section id="journey" className="section-dark py-14 md:py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            How It All Started
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            Lost 80+ Pounds.{" "}
            <span className="text-accent">Three Times.</span>
          </h2>
        </div>

        <JourneyCardsGrid />
      </div>
    </section>
  );
}
