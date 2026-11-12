import { useState } from 'react';
import { ArrowRight, ChevronRight, FileBadge2, RadioTower } from 'lucide-react';
import { HERO_CONTENT } from '../data/voxnetContent';
import { PAGE_CONTAINER_CLASS } from '../utils/goldenRatio';
import { VoxnetSupergraphic } from './VoxnetSupergraphic';

interface HeroSectionProps {
  onScheduleClick: () => void;
}

const HERO_SPOKESPERSON_IMG =
  '/assets/aistudio/Gemini_Generated_Image_lc0zo1lc0zo1lc0z-tanpa-latar__1__9b351feb.png';

const ENTERPRISE_METRICS = [
  { value: '30+', label: 'Pelanggan Enterprise' },
  { value: '22 Kota', label: 'Penomoran Lokal Resmi Indonesia' },
  { value: '6 Format', label: 'Penomoran Pusat Panggilan' },
  { value: '10+ Tahun', label: 'Pengalaman Infrastruktur Telko' },
];

export function HeroSection({ onScheduleClick }: HeroSectionProps) {
  const [portraitFailed, setPortraitFailed] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden vox-hero-radiant text-white border-b border-white/15"
    >
      {/* 1. Subtle Telco Grid */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.035] select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-symmetrical-grid" width="40" height="40" patternUnits="userSpaceOnUse" x="50%">
              <circle cx="20" cy="20" r="1.2" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-symmetrical-grid)" />
        </svg>
      </div>

      {/* 2. Soft Ambient Radial Glow concentrated on right side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8%] lg:right-[4%] top-[40%] -translate-y-1/2 w-[550px] sm:w-[700px] lg:w-[900px] h-[550px] lg:h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14)_0%,rgba(255,185,120,0.08)_45%,transparent_72%)] blur-3xl select-none"
      />

      {/* 3. Mirrored Voxnet Supergraphic framing the right side behind spokesperson */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-[40px] sm:-right-[60px] lg:-right-[70px] xl:-right-[80px] top-[6%] sm:top-[4%] lg:top-[2%] w-[460px] sm:w-[580px] lg:w-[720px] xl:w-[820px] opacity-[0.085] scale-x-[-1]"
      >
        <VoxnetSupergraphic
          tone="white"
          className="w-full h-auto object-contain"
        />
      </div>


      <div
        className={`relative z-10 w-full ${PAGE_CONTAINER_CLASS} pt-[94px] pb-[44px] sm:pt-[104px] sm:pb-[50px] lg:pt-[110px] lg:pb-[54px] xl:pt-[122px] xl:pb-[64px]`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.98fr] gap-[18px] lg:gap-[32px] xl:gap-[44px] items-end">
          {/* Left Narrative & Conversion Column */}
          <div className="space-y-[22px] lg:space-y-[26px] pb-[10px] sm:pb-[16px] lg:pb-[44px] xl:pb-[52px] self-center">
            <div className="space-y-[14px] lg:space-y-[18px]">
              <p className="text-[12.5px] sm:text-[13px] font-semibold tracking-wide text-white/95 leading-[1.618]">
                {HERO_CONTENT.eyebrow}
              </p>

              <h1 className="font-display font-bold text-white tracking-[-0.03em] leading-[1.1] text-[clamp(2.5rem,3.85vw,4.25rem)] text-balance">
                {HERO_CONTENT.headline}
              </h1>

              <p className="text-[15.5px] lg:text-[16.5px] xl:text-[17.5px] text-white/95 leading-[1.62] max-w-[56ch]">
                {HERO_CONTENT.subheadline}
              </p>
            </div>

            <div className="space-y-[20px]">
              <div className="flex flex-col sm:flex-row sm:items-center gap-[14px]">
                <button
                  type="button"
                  onClick={onScheduleClick}
                  className="inline-flex items-center justify-center gap-[10px] px-[28px] py-[14px] min-h-[48px] rounded-lg bg-white hover:bg-[#FFF5EE] hover:-translate-y-0.5 text-[#B84408] text-[15px] font-bold shadow-[0_14px_30px_-10px_rgba(95,25,0,0.45)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>{HERO_CONTENT.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <a
                  href="#solusi"
                  className="inline-flex items-center justify-center gap-[6px] px-[28px] py-[14px] min-h-[48px] rounded-lg bg-white/12 hover:bg-white/22 border border-white/45 text-white text-[15px] font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>{HERO_CONTENT.secondaryCta}</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </a>
              </div>

              <div className="pt-[18px] border-t border-white/25">
                <ul
                  aria-label="Lisensi Resmi Kominfo"
                  className="flex flex-col items-start gap-[8px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-[12px] sm:gap-y-[8px] text-[12.5px] xl:text-[13px] font-medium text-white/95 leading-[1.4]"
                >
                  {HERO_CONTENT.trustItems.map((item, idx) => (
                    <li key={item} className="inline-flex items-center gap-[12px]">
                      <span className="inline-flex items-center gap-[6px] whitespace-nowrap">
                        <FileBadge2
                          className="w-[15px] h-[15px] text-white shrink-0"
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </span>
                      {idx < HERO_CONTENT.trustItems.length - 1 && (
                        <span aria-hidden="true" className="hidden sm:inline text-white/45 select-none">
                          |
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Frameless Cutout Portrait: losslessly cropped on empty margins and anchored flush onto proof strip */}
          <div className="relative self-end w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none mx-auto">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-[10%] top-[4%] bottom-0 bg-[radial-gradient(ellipse_62%_64%_at_56%_48%,rgba(255,214,178,0.36)_0%,rgba(255,152,92,0.14)_48%,rgba(231,98,27,0)_76%)]"
            />
            {portraitFailed ? (
              <div
                className="relative aspect-square flex flex-col items-center justify-center rounded-2xl bg-white/10 border border-white/25 p-6 text-center"
                role="img"
                aria-label="Konsultan solusi enterprise Voxnet mengenakan headset dan blazer resmi Voxnet"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white mb-3">
                  <RadioTower className="w-6 h-6" />
                </div>
                <p className="font-display text-sm font-bold text-white">
                  Solusi Infrastruktur Komunikasi Voxnet
                </p>
              </div>
            ) : (
              <svg
                viewBox="396 32 1708 1698"
                preserveAspectRatio="xMidYMax meet"
                role="img"
                aria-label="Konsultan solusi enterprise Voxnet mengenakan headset dan blazer resmi Voxnet"
                className="relative block w-full h-auto overflow-hidden select-none pointer-events-none"
              >
                <image
                  href={HERO_SPOKESPERSON_IMG}
                  x="0"
                  y="0"
                  width="2400"
                  height="1792"
                  onError={() => setPortraitFailed(true)}
                />
              </svg>
            )}
          </div>
        </div>

        {/* Full-Width Corporate Proof Strip */}
        <div className="pt-[26px] lg:pt-[32px] border-t border-white/25 grid grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-0 lg:divide-x lg:divide-white/20">
          {ENTERPRISE_METRICS.map((item, idx) => (
            <div
              key={item.label}
              className={`space-y-[4px] ${idx === 0 ? 'lg:pr-[26px]' : idx === ENTERPRISE_METRICS.length - 1 ? 'lg:pl-[26px]' : 'lg:px-[26px]'}`}
            >
              <p className="font-display text-[28px] lg:text-[32px] xl:text-[36px] font-bold text-white tabular-nums tracking-tight leading-[1.15]">
                {item.value}
              </p>
              <p className="text-[13px] xl:text-[13.5px] text-white/90 leading-[1.45]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

