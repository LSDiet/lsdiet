// Recurring "About the author" footer block. Appears under every blog post
// and entity hub so the Oscar Poon entity is reinforced site-wide.
import oscarPhoto from "@/assets/oscar-photo.jpeg";

export function AboutAuthorBlock() {
  return (
    <aside className="mt-14 p-6 rounded-xl border border-border bg-card">
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <img
          src={oscarPhoto}
          alt="Oscar Poon, founder of LS Diet"
          className="w-20 h-20 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">About the author</p>
          <h3 className="text-lg font-bold text-foreground mb-2">
            <a href="/oscar-poon" className="hover:text-accent transition-colors">
              Oscar Poon
            </a>
          </h3>
          <p className="text-sm text-zinc-700 leading-relaxed">
            Founder of LS Diet and creator of the Weight Permanence Training™. Psychology
            background from{" "}
            <a
              href="https://www.sfu.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Simon Fraser University
            </a>
            . Oscar has lost 80+ lbs three times — and built LS Diet from what those restarts
            taught him.{" "}
            <a
              href="https://www.linkedin.com/in/oscarpoon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline whitespace-nowrap"
            >
              LinkedIn
            </a>{" "}
            ·{" "}
            <a href="/oscar-poon" className="text-accent hover:underline whitespace-nowrap">
              Read his story →
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}
