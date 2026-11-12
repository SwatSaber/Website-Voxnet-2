interface ClientLogosSectionProps {
  onExploreSolutions?: () => void;
}


interface MinimalLogo {
  id: string;
  name: string;
  sub?: string;
  render: () => React.ReactNode;
}

const MINIMAL_LOGOS: MinimalLogo[] = [
  {
    id: 'bca',
    name: 'BCA',
    sub: 'Bank Central Asia',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.15" />
          <path d="M7 8h6a3 3 0 0 1 0 6H7V8z" fill="currentColor" />
          <path d="M16 10h2v5h-2z" fill="currentColor" />
        </svg>
        <span className="font-display font-extrabold text-[15px] tracking-wider leading-none">
          BCA
        </span>
      </div>
    ),
  },
  {
    id: 'mandiri',
    name: 'Mandiri',
    sub: 'Bank Mandiri',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" />
          <path d="M6 11c2-2 5-3 8-2l-1 2c-2-.5-4 0-5 1.5l-2-1.5z" fill="currentColor" />
          <path d="M8 15c2-2 5-2 8 0l-1 2c-2-1-4-1-6 0l-1-2z" fill="currentColor" />
        </svg>
        <span className="font-display font-black text-[14.5px] tracking-tight leading-none">
          mandiri
        </span>
      </div>
    ),
  },
  {
    id: 'telkom',
    name: 'Infomedia',
    sub: 'Telkom Group',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.15" />
          <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
        <span className="font-display font-bold text-[14px] tracking-wider leading-none">
          INFOMEDIA
        </span>
      </div>
    ),
  },
  {
    id: 'vads',
    name: 'VADS',
    sub: 'Indonesia',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current" aria-hidden="true">
          <path d="M4 6l8 12 8-12h-4l-4 6-4-6H4z" fill="currentColor" />
        </svg>
        <span className="font-display font-extrabold text-[15px] tracking-widest leading-none">
          VADS
        </span>
      </div>
    ),
  },
  {
    id: 'transcosmos',
    name: 'transcosmos',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" />
          <path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <span className="font-display font-bold text-[13.5px] tracking-tight leading-none">
          transcosmos
        </span>
      </div>
    ),
  },
  {
    id: 'tokopedia',
    name: 'Tokopedia',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" />
          <circle cx="9" cy="11" r="2.2" fill="currentColor" />
          <circle cx="15" cy="11" r="2.2" fill="currentColor" />
          <path d="M10 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="font-display font-bold text-[14.5px] tracking-tight leading-none">
          tokopedia
        </span>
      </div>
    ),
  },
  {
    id: 'gojek',
    name: 'Gojek',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.15" />
          <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
        <span className="font-display font-extrabold text-[15px] tracking-tight leading-none">
          gojek
        </span>
      </div>
    ),
  },
  {
    id: 'traveloka',
    name: 'Traveloka',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" />
          <path d="M7 14c3-3 6-4 11-4-1 3-3 5-7 6l-4-2z" fill="currentColor" />
        </svg>
        <span className="font-display font-bold text-[14.5px] tracking-tight leading-none">
          traveloka
        </span>
      </div>
    ),
  },
  {
    id: 'halodoc',
    name: 'Halodoc',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.15" />
          <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span className="font-display font-black text-[14px] tracking-tight leading-none">
          halodoc
        </span>
      </div>
    ),
  },
  {
    id: 'jnt',
    name: 'J&T Express',
    render: () => (
      <div className="flex items-center gap-1.5">
        <span className="font-display font-black italic text-[15px] tracking-tight leading-none">
          J&amp;T
        </span>
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-75">
          EXPRESS
        </span>
      </div>
    ),
  },
  {
    id: 'sicepat',
    name: 'SiCepat',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-current" aria-hidden="true">
          <path d="M8 12l4-6 1 4h5l-6 8 1-4h-5z" fill="currentColor" />
        </svg>
        <span className="font-display font-extrabold italic text-[14px] tracking-wider leading-none">
          SICEPAT
        </span>
      </div>
    ),
  },
  {
    id: 'astra',
    name: 'Astra',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-current" aria-hidden="true">
          <path d="M12 5l2 4h5l-4 3 1.5 5-4.5-3-4.5 3 1.5-5-4-3h5z" fill="currentColor" />
        </svg>
        <span className="font-display font-bold text-[13.5px] tracking-widest leading-none">
          ASTRA
        </span>
      </div>
    ),
  },
];

export function ClientLogosSection(_props: ClientLogosSectionProps) {
  return (
    <section
      aria-label="Mitra Enterprise Voxnet"
      className="bg-white border-b border-[#EBEBEB] py-5 sm:py-6 overflow-hidden"
    >


      {/* Minimalist Marquee Row with subtle edge fade */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-[40px] sm:w-[80px] z-10 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-[40px] sm:w-[80px] z-10 bg-gradient-to-l from-white to-transparent"
        />

        <div className="animate-marquee-smooth flex items-center gap-10 sm:gap-14 px-4 select-none">
          {[...MINIMAL_LOGOS, ...MINIMAL_LOGOS].map((logo, idx) => (
            <div
              key={`${logo.id}-${idx}`}
              className="text-[#525252] hover:text-[#1A1A1A] opacity-65 hover:opacity-100 transition-all duration-200 shrink-0 cursor-default"
              title={logo.name}
            >
              {logo.render()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
