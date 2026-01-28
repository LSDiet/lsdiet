import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

const cycleNodes = [
  { id: "wrong-foods", label: "Wrong foods", sublabel: "High-sugar, refined-starch", position: "top" },
  { id: "blood-sugar", label: "Blood sugar chaos", sublabel: "Glucose spike, insulin surge", position: "right" },
  { id: "hunger", label: "Hunger takes over", sublabel: "Snacking with low satiety", position: "bottom" },
  { id: "weight-regain", label: "Weight regain", sublabel: "Increased intake", position: "left" },
];

export function CircularHungerCycle() {
  const { ref, isVisible } = useScrollAnimation();
  const isMobile = useIsMobile();

  const getNodeClasses = (position: string) => {
    const base = "absolute px-3 py-2 md:px-4 md:py-3 rounded-xl text-center transition-all duration-500 z-10 min-w-[100px] md:min-w-[140px]";
    const highlight = position === "top" || position === "left"
      ? "bg-destructive/15 border-2 border-destructive/30"
      : "bg-muted/60 border border-border/50";
    return `${base} ${highlight}`;
  };

  const getPositionStyles = (position: string): React.CSSProperties => {
    if (isMobile) {
      // Vertical layout for mobile
      const positions: Record<string, React.CSSProperties> = {
        top: { top: "0%", left: "50%", transform: "translateX(-50%)" },
        right: { top: "25%", left: "50%", transform: "translateX(-50%)" },
        bottom: { top: "50%", left: "50%", transform: "translateX(-50%)" },
        left: { top: "75%", left: "50%", transform: "translateX(-50%)" },
      };
      return positions[position] || {};
    }
    
    // Circular layout for desktop - all nodes centered with consistent transforms
    const positions: Record<string, React.CSSProperties> = {
      top: { top: "0", left: "50%", transform: "translateX(-50%)" },
      right: { top: "50%", right: "0", transform: "translateY(-50%)" },
      bottom: { bottom: "0", left: "50%", transform: "translateX(-50%)" },
      left: { top: "50%", left: "0", transform: "translateY(-50%)" },
    };
    return positions[position] || {};
  };

  // SVG arrow paths for desktop circular layout (viewBox 0 0 400 260)
  // Nodes are at: top (200, 30), right (330, 130), bottom (200, 230), left (70, 130)
  const arrowPaths = [
    // Top to Right (clockwise curve)
    { d: "M 240 40 Q 320 40, 320 90", id: "top-right" },
    // Right to Bottom (clockwise curve)
    { d: "M 320 170 Q 320 220, 240 225", id: "right-bottom" },
    // Bottom to Left (clockwise curve)
    { d: "M 160 225 Q 80 220, 80 170", id: "bottom-left" },
    // Left to Top (clockwise curve - the loop back!)
    { d: "M 80 90 Q 80 40, 160 40", id: "left-top" },
  ];

  // Mobile vertical arrow paths
  const mobileArrowPaths = [
    { d: "M 100 35 L 100 65", id: "top-right" },
    { d: "M 100 110 L 100 140", id: "right-bottom" },
    { d: "M 100 185 L 100 215", id: "bottom-left" },
    // Loop back arrow on the side
    { d: "M 30 230 Q 10 150, 30 70", id: "left-top" },
  ];

  const currentPaths = isMobile ? mobileArrowPaths : arrowPaths;

  return (
    <div ref={ref} className="mb-8">
      <div className={`relative mx-auto ${isMobile ? "h-[320px] w-[200px]" : "h-[260px] w-[400px] md:h-[280px] md:w-[440px]"}`}>
        {/* SVG Arrows */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={isMobile ? "0 0 200 280" : "0 0 400 260"}
          fill="none"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <polygon
                points="0 0, 8 4, 0 8"
                className="fill-muted-foreground/40"
              />
            </marker>
          </defs>
          {currentPaths.map((path, index) => (
            <path
              key={path.id}
              d={path.d}
              className={`stroke-muted-foreground/40 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              strokeWidth="2"
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
              style={{ transitionDelay: `${index * 150 + 400}ms` }}
            />
          ))}
        </svg>

        {/* Nodes */}
        {cycleNodes.map((node, index) => (
          <div
            key={node.id}
            className={`${getNodeClasses(node.position)} ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{
              ...getPositionStyles(node.position),
              transitionDelay: `${index * 150}ms`,
            }}
          >
            <span className={`block text-xs md:text-sm font-medium ${
              node.position === "top" || node.position === "left"
                ? "text-destructive"
                : "text-foreground"
            }`}>
              {node.label}
            </span>
            <span className="block text-[10px] md:text-xs text-muted-foreground mt-0.5">
              {node.sublabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
