import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { profile, socialLinks } from '@/data/portfolio';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

// Contact: a quiet visual ending — the journey settles back to simplicity.
export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal className="mb-12 flex items-center gap-4">
          <span className="label-tech text-coffee">/ 04 — Contact</span>
          <span className="h-px flex-1 bg-gradient-to-r from-ember/30 to-transparent" />
        </Reveal>

        <Reveal>
          <p className="label-tech mb-6 text-coffee">Let's connect</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="font-display font-normal leading-[1.05] tracking-tight text-espresso"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Open to ideas,
            <br />
            <span className="text-ember">collaboration, and good problems.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-ink-mid">
            Whether it's a project, a question, or something worth building —
            my inbox is open.
          </p>
        </Reveal>

        {/* Links */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap] ?? Mail;
              const isMail = link.icon === 'mail';
              const resolved = link.href
                ? link.href
                : isMail
                  ? 'mailto:pranavsaraswat565@gmail.com'
                  : null;

              return (
                <a
                  key={link.label}
                  href={resolved ?? undefined}
                  target={resolved && !isMail ? '_blank' : undefined}
                  rel={resolved && !isMail ? 'noopener noreferrer' : undefined}
                  aria-label={`${link.label} (${isMail ? 'Send email' : 'Opens in new tab'})`}
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-coffee/20 bg-stone/20 px-5 py-3 text-sm text-ink-mid backdrop-blur-sm transition-all duration-300 hover:border-ember/45 hover:bg-ember/10 hover:text-espresso"
                >
                  <Icon size={16} className="text-ink-mid transition-colors group-hover:text-ember" />
                  <span className="font-display font-medium">{link.label}</span>
                  <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              );
            })}
          </div>
        </Reveal>

        {/* Subtle closing mark */}
        <Reveal delay={0.2}>
          <div className="mt-20 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-ember/40" />
            <span className="font-mono text-xs text-ink-low">{profile.name}</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-ember/40" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
