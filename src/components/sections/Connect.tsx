import { site } from '@/data/site';

export default function Connect() {
  return (
    <section id="connect" tabIndex={-1} className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Let's connect</h2>

        <p className="text-muted-foreground mt-4">
          Currently open for collaborations and new opportunities
        </p>

        <a href={`mailto:${site.email}`} className="cta-primary mt-8">
          Say hello
        </a>

        <div className="mt-10 flex items-center justify-center gap-8">
          {site.socials.github && (
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              GitHub
            </a>
          )}
          {site.socials.linkedin && (
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              LinkedIn
            </a>
          )}
          {site.socials.behance && (
            <a
              href={site.socials.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Behance
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
