export function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div data-reveal className="mb-12">
      <div className="mb-3 flex items-center gap-3 font-mono text-xs text-muted">
        <span>{index}</span>
        <span className="h-px w-8 bg-border" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </div>
  );
}
