import { useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import bpoCenterImg from '../assets/images/voxnet_bpo_center_1794368139266.jpg';
import saasIntegrationImg from '../assets/images/problem_platform_integration_1794386341598.jpg';
import globalTelcoImg from '../assets/images/voxnet_hero_infra_1794368138668.jpg';
import { USE_CASES, UseCaseProfile } from '../data/voxnetContent';
import {
  calculateInfrastructureRecommendation,
  NumberingMode,
  PbxMode,
  SizingRecommendation,
} from '../utils/consultationLogic';
import { PAGE_CONTAINER_CLASS, SECTION_PADDING_Y_CLASS } from '../utils/goldenRatio';
import { ResilientImage } from './ResilientImage';

interface UseCasesSectionProps {
  onApplyConfiguration: (summary: string, sectorLabel: string, rec: SizingRecommendation) => void;
}

const SECTOR_MEDIA: Record<UseCaseProfile['id'], { src: string; alt: string }> = {
  bpo: {
    src: bpoCenterImg,
    alt: 'Operasional Contact Center dan tim komunikasi bisnis modern berstandar enterprise',
  },
  'saas-ai': {
    src: saasIntegrationImg,
    alt: 'Perangkat gateway fiber optik putih dengan kabel patch oranye untuk integrasi API Voice AI dan SaaS',
  },
  'global-telco': {
    src: globalTelcoImg,
    alt: 'Koridor data center enterprise modern dengan rak server interkoneksi POP Voxnet',
  },
};

export function UseCasesSection({ onApplyConfiguration }: UseCasesSectionProps) {
  const [selectedSectorId, setSelectedSectorId] = useState<UseCaseProfile['id']>('bpo');
  const [dailyCalls, setDailyCalls] = useState<number>(35000);
  const [pbxMode, setPbxMode] = useState<PbxMode>('hybrid');
  const [numberingMode, setNumberingMode] = useState<NumberingMode>('1500');

  const activeUseCase = useMemo(
    () => USE_CASES.find((uc) => uc.id === selectedSectorId) ?? USE_CASES[0],
    [selectedSectorId]
  );

  const activeMedia = SECTOR_MEDIA[activeUseCase.id];

  const recommendation = useMemo(
    () =>
      calculateInfrastructureRecommendation({
        sector: selectedSectorId,
        dailyCalls,
        pbxMode,
        numbering: numberingMode,
      }),
    [selectedSectorId, dailyCalls, pbxMode, numberingMode]
  );

  const handleSectorChange = (useCase: UseCaseProfile) => {
    setSelectedSectorId(useCase.id);
    setDailyCalls(useCase.defaultDailyCalls);
    setPbxMode(useCase.recommendedPbx);
    setNumberingMode(useCase.recommendedNumbering);
  };

  return (
    <section id="use-cases" className={`scroll-mt-[68px] bg-white border-b border-[#EBEBEB] ${SECTION_PADDING_Y_CLASS}`}>
      <div className={PAGE_CONTAINER_CLASS}>
        <div className="flex flex-col min-[1440px]:flex-row min-[1440px]:items-end justify-between gap-[26px] mb-[36px]">
          <div className="max-w-[680px] min-[1440px]:max-w-[560px] space-y-[12px]">
            <p className="text-[13px] font-semibold tracking-wider text-[#B84408] uppercase">
              Segmen Bisnis &amp; Use Case
            </p>
            <h2 className="font-display text-[26px] sm:text-[34px] font-bold text-[#1A1A1A] tracking-[-0.02em] leading-[1.18] text-balance">
              Infrastruktur Suara yang Tepat untuk Setiap Model Bisnis
            </h2>
          </div>

          {/* Interactive Use Case Segmented Control */}
          <div
            role="tablist"
            aria-label="Pilih model bisnis Voxnet"
            className="flex flex-col sm:inline-flex sm:flex-row items-stretch sm:items-center gap-[6px] p-[6px] bg-[#F8F9FA] border border-[#EBEBEB] rounded-[12px] w-full sm:w-fit max-w-full shrink-0"
          >
            {USE_CASES.map((uc) => {
              const isSelected = uc.id === selectedSectorId;
              return (
                <button
                  key={uc.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSectorChange(uc)}
                  className={`px-[16px] py-[10px] min-h-[42px] rounded-lg text-[13px] sm:text-[14px] font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 text-left sm:text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B] ${
                    isSelected
                      ? 'bg-white text-[#1A1A1A] border border-[#E5E5E5] shadow-2xs'
                      : 'text-[#525252] hover:text-[#1A1A1A] border border-transparent'
                  }`}
                >
                  {uc.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Use Case Detail (38.2%) + Live Capacity Estimator (61.8%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.52fr] gap-[24px] lg:gap-[32px] items-stretch">
          {/* Left: Selected Industry Showcase */}
          <div className="flex flex-col justify-between bg-[#F8F9FA] border border-[#E5E5E5] rounded-[18px] overflow-hidden">
            <div className="relative h-[220px] sm:h-[250px] overflow-hidden border-b border-[#E5E5E5]">
              <ResilientImage
                src={activeMedia.src}
                alt={activeMedia.alt}
                fallbackTitle={activeUseCase.label}
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/65 via-transparent to-transparent"
              />
              <p className="absolute bottom-[16px] left-[24px] right-[24px] text-[12.5px] font-semibold text-white tracking-wide">
                {activeUseCase.label}
              </p>
            </div>

            <div className="p-[24px] lg:p-[30px] space-y-[20px] flex-1 flex flex-col justify-between">
              <div className="space-y-[10px]">
                <h3 className="font-display text-[20px] font-bold text-[#1A1A1A] leading-[1.28] text-balance">
                  {activeUseCase.headline}
                </h3>
                <p className="text-[14px] text-[#4A4A4A] leading-[1.6]">
                  {activeUseCase.description}
                </p>
              </div>

              <div className="space-y-[16px] pt-[16px] border-t border-[#E5E5E5]">
                <ul className="space-y-[10px]">
                  {activeUseCase.architectureNotes.map((note) => (
                    <li key={note} className="flex items-start gap-[10px] text-[13.5px] text-[#333333] leading-[1.5]">
                      <Check className="w-4 h-4 text-[#E7621B] shrink-0 mt-[3px]" aria-hidden="true" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-[14px] border-t border-[#E5E5E5] text-[12.5px] text-[#525252] leading-[1.5]">
                  <span className="font-semibold text-[#1A1A1A]">Komponen Utama: </span>
                  {activeUseCase.deliverables.join(' · ')}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Infrastructure Sizing Estimator */}
          <div className="bg-white border border-[#E5E5E5] rounded-[18px] p-[24px] sm:p-[32px] flex flex-col justify-between gap-[22px]">
            <div className="space-y-[22px]">
              <div className="space-y-[4px]">
                <p className="text-[12.5px] font-semibold text-[#B84408]">
                  Kalkulator Kebutuhan Infrastruktur
                </p>
                <h3 className="font-display text-[20px] font-bold text-[#1A1A1A] leading-[1.28]">
                  Simulasikan Kapasitas SIP Trunk &amp; Topologi PBX Anda
                </h3>
              </div>

              {/* Daily Call Volume Slider */}
              <div className="space-y-[8px]">
                <div className="flex flex-wrap items-center justify-between gap-[10px]">
                  <label htmlFor="daily-calls-range" className="text-[13.5px] font-semibold text-[#1A1A1A]">
                    Estimasi Volume Panggilan Harian
                  </label>
                  <span className="font-mono text-[14px] font-bold text-[#B84408] tabular-nums">
                    {dailyCalls.toLocaleString('id-ID')} panggilan / hari
                  </span>
                </div>
                <input
                  id="daily-calls-range"
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={dailyCalls}
                  onChange={(e) => setDailyCalls(Number(e.target.value))}
                  className="w-full accent-[#E7621B] cursor-pointer"
                />
                <div className="flex justify-between text-[12px] text-[#666666] tabular-nums">
                  <span>1.000 / hari</span>
                  <span>50.000 / hari</span>
                  <span>100.000 / hari</span>
                </div>
              </div>

              {/* PBX Mode Selector */}
              <div className="space-y-[8px]">
                <p className="text-[13.5px] font-semibold text-[#1A1A1A]">Model Penerapan PBX</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[8px]">
                  {[
                    { id: 'cloud' as const, label: 'Cloud PBX' },
                    { id: 'on-prem' as const, label: 'On-Premises' },
                    { id: 'hybrid' as const, label: 'Hybrid' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPbxMode(opt.id)}
                      className={`py-[10px] px-[14px] min-h-[42px] rounded-lg text-[13px] font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B] ${
                        pbxMode === opt.id
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-[#F8F9FA] text-[#404040] border-[#E5E5E5] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Numbering Mode Selector (Aligned with Official Voxnet Catalog) */}
              <div className="space-y-[8px]">
                <p className="text-[13.5px] font-semibold text-[#1A1A1A]">Skema Penomoran</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[8px]">
                  {[
                    { id: 'local-22' as const, label: 'Lokal 22 Kota' },
                    { id: '1500' as const, label: 'Call Center (140/1500)' },
                    { id: '0800' as const, label: 'IN (0800/0804/0807)' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setNumberingMode(opt.id)}
                      className={`py-[10px] px-[12px] min-h-[42px] rounded-lg text-[12.5px] sm:text-[13px] font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B] ${
                        numberingMode === opt.id
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-[#F8F9FA] text-[#404040] border-[#E5E5E5] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Recommendation Summary */}
              <div className="border-y border-[#E5E5E5] py-[18px] space-y-[14px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] pb-[14px] border-b border-[#EBEBEB]">
                  <div className="space-y-[2px]">
                    <span className="text-[12px] font-medium text-[#525252] block">
                      Rekomendasi Kapasitas Konkuren
                    </span>
                    <span
                      data-testid="recommended-channels-output"
                      className="font-display text-[24px] font-extrabold text-[#B84408] tabular-nums leading-[1.2]"
                    >
                      {recommendation.recommendedChannels} Kanal SIP
                    </span>
                  </div>
                  <div className="space-y-[2px] sm:text-right">
                    <span className="text-[12px] font-medium text-[#525252] block">
                      Estimasi Trafik (22 Hari Kerja)
                    </span>
                    <span className="font-display text-[19px] font-bold text-[#1A1A1A] tabular-nums leading-[1.2]">
                      ~{recommendation.estimatedMonthlyMinutes.toLocaleString('id-ID')} menit/bln
                    </span>
                  </div>
                </div>

                <div className="space-y-[8px] text-[13px]">
                  <div className="flex flex-wrap items-baseline justify-between gap-[12px]">
                    <span className="text-[#525252]">Model PBX</span>
                    <span className="font-semibold text-[#1A1A1A] text-right">
                      {recommendation.pbxLabel}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-[12px]">
                    <span className="text-[#525252]">Penomoran Terpilih</span>
                    <span className="font-semibold text-[#1A1A1A] text-right">
                      {recommendation.numberingLabel}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-[12px]">
                    <span className="text-[#525252]">Topologi SBC</span>
                    <span className="font-semibold text-[#1A1A1A] text-right">
                      {recommendation.sbcTopology}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-[12px]">
                    <span className="text-[#525252]">Lapisan Keamanan</span>
                    <span className="font-semibold text-[#1A1A1A] text-right">
                      {recommendation.securityLayer}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onApplyConfiguration(recommendation.summaryText, activeUseCase.label, recommendation)
              }
              className="w-full py-[13px] px-[24px] min-h-[46px] rounded-lg vox-cta-gradient text-white text-[14px] font-semibold inline-flex items-center justify-center gap-[10px] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
            >
              <span className="truncate">Gunakan Konfigurasi Ini untuk Konsultasi</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
