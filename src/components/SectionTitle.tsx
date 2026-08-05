type SectionTitleProps = {
  eyebrow: string
  title: string
  description: string
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm uppercase tracking-[0.35em] text-orange-400/80">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-slate-400">{description}</p>
    </div>
  )
}
