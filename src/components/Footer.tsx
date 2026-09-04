import { footer } from '@/data/portfolio';

export function Footer() {
  return (
    <footer className="relative border-t border-coffee/15 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="font-display text-sm font-medium text-espresso">
          {footer.name}
        </span>
        <p className="label-tech text-coffee">© {footer.year}</p>
        <p className="font-mono text-xs text-ink-low">{footer.signature}</p>
      </div>
    </footer>
  );
}
