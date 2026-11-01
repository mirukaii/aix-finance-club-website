export function PageHeader({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <section className="px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12">
      <div className="mx-auto max-w-[1400px] border-b border-[#141414] pb-10 sm:pb-14">
        <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">{label}</p>
        <h1 className="max-w-[18ch] font-serif text-[clamp(2.4rem,6vw,5.5rem)] font-normal leading-[1.04] tracking-tight text-[#141414]">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#4a4a46] sm:text-lg">{intro}</p>}
      </div>
    </section>
  )
}
