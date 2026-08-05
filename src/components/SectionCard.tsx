type SectionCardProps = {
  title: string
  description: string
  icon: React.ReactNode
}

export function SectionCard({ title, description, icon }: SectionCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
    </div>
  )
}
