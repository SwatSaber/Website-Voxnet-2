import { useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import bpoCenterImg from '../assets/images/voxnet_bpo_center_1794368139266.jpg';
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

export function UseCasesSection({ onApplyConfiguration }: UseCasesSectionProps) {
  const [selectedSectorId, setSelectedSectorId] = useState<UseCaseProfile['id']>('bpo');
  const [dailyCalls, setDailyCalls] = useState<number>(35000);
  const [pbxMode, setPbxMode] = useState<PbxMode>('hybrid');
  const [numberingMode, setNumberingMode] = useState<NumberingMode>('1500');

  const activeUseCase = useMemo(
    () => USE_CASES.find((uc) => uc.id === selectedSectorId) ?? USE_CASES[0],
    [selectedSectorId]
  );

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
        <div className="flex flex-col min-[1440px]:flex-row min-[1440px]:items-end justify-between gap-[26px] mb-[42px]">
          <div className="max-w-[680px] min-[1440px]:max-w-[560px] space-y-[16px]">
            <p className="text-[13px] font-semibold tracking-wider text-[#B84408]">
              Segmen Bisnis & Use Case
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
                  className={`px-[16px] py-[10px] min-h-[42px] rounded-lg text-[13px] sm:text-[14px] font-semibold transition-colors duration-100 whitespace-nowrap shrink-0 text-left sm:text-center cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#1A1A1A] border border-[#EBEBEB]'
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-[26px] lg:gap-[42px] items-stretch">
          {/* Left: Selected Industry Showcase */}
          <div className="flex flex-col justify-between bg-[#F8F9FA] border border-[#EBEBEB] rounded-[16px] overflow-hidden">
            <div className="h-[260px] lg:h-[320px] xl:h-[340px] overflow-hidden border-b border-[#EBEBEB]">
              <ResilientImage
                src={bpoCenterImg}
                alt="Operasional Contact Center dan tim komunikasi bisnis modern berstandar enterprise"
                fallbackTitle={activeUseCase.label}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-[26px] lg:p-[34px] space-y-[26px] flex-1 flex flex-col justify-between">
              <div className="space-y-[10px]">
                <p className="text-[13px] font-semibold text-[#B84408]">{activeUseCase.label}</p>
                <h3 className="font-display text-[21px] font-bold text-[#1A1A1A] leading-[1.272]">
                  {activeUseCase.headline}
                </h3>
                <p className="text-[14px] text-[#4A4A4A] leading-[1.618]">
                  {activeUseCase.description}
                </p>
              </div>

              <div className="space-y-[16px] pt-[16px] border-t border-[#EBEBEB]">
                <ul className="space-y-[10px]">
                  {activeUseCase.architectureNotes.map((note) => (
                    <li key={note} className="flex items-start gap-[10px] text-[14px] text-[#333333] leading-[1.45]">
                      <Check className="w-4 h-4 text-[#E7621B] shrink-0 mt-[3px]" aria-hidden="true" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-[16px] border-t border-[#EBEBEB] text-[13px] font-medium text-[#525252]">
                  Komponen Utama: {activeUseCase.deliverables.join(' · ')}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Infrastructure Sizing Estimator */}
          <div className="bg-white border border-[#EBEBEB] rounded-[16px] p-[26px] sm:p-[42px] flex flex-col justify-between gap-[26px]">
            <div className="space-y-[26px]">
              <div className="space-y-[6px]">
                <p className="text-[13px] font-semibold text-[#B84408]">
                  Kalkulator Kebutuhan Infrastruktur
                </p>
                <h3 className="font-display text-[21px] font-bold text-[#1A1A1A] leading-[1.272]">
                  Simulasikan Kapasitas SIP Trunk & Topologi PBX Anda
                </h3>
              </div>

              {/* Daily Call Volume Slider */}
              <div className="space-y-[10px]">
                <div className="flex flex-wrap items-center justify-between gap-[10px]">
                  <label htmlFor="daily-calls-range" className="text-[14px] font-semibold text-[#1A1A1A]">
                    Estimasi Volume Panggilan Harian
                  </label>
                  <span className="font-mono text-[14px] font-semibold text-[#B84408] tabular-nums">
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
                <div className="flex justify-between text-[13px] text-[#525252] tabular-nums">
                  <span>1.000 / hari</span>
                  <span>50.000 / hari</span>
                  <span>100.000 / hari</span>
                </div>
              </div>

              {/* PBX Mode Selector */}
              <div className="space-y-[10px]">
                <p className="text-[14px] font-semibold text-[#1A1A1A]">Model Penerapan PBX</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
                  {[
                    { id: 'cloud' as const, label: 'Cloud PBX' },
                    { id: 'on-prem' as const, label: 'On-Premises' },
                    { id: 'hybrid' as const, label: 'Hybrid' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPbxMode(opt.id)}
                      className={`py-[10px] px-[16px] min-h-[44px] rounded-lg text-[13px] sm:text-[14px] font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        pbxMode === opt.id
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-[#F8F9FA] text-[#404040] border-[#EBEBEB] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Numbering Mode Selector */}
              <div className="space-y-[10px]">
                <p className="text-[14px] font-semibold text-[#1A1A1A]">Jenis Penomoran Resmi</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
                  {[
                    { id: 'local-22' as const, label: 'Lokal 22 Kota' },
                    { id: '1500' as const, label: 'Nomor 1500' },
                    { id: '0800' as const, label: 'Bebas Pulsa 0800' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setNumberingMode(opt.id)}
                      className={`py-[10px] px-[16px] min-h-[44px] rounded-lg text-[13px] sm:text-[14px] font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        numberingMode === opt.id
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-[#F8F9FA] text-[#404040] border-[#EBEBEB] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Recommendation Summary */}
              <div className="border-y border-[#EBEBEB] py-[26px] space-y-[16px]">
                <div className="flex flex-wrap items-baseline justify-between gap-[16px] pb-[16px] border-b border-[#EBEBEB]">
                  <span className="text-[13px] font-semibold text-[#525252]">
                    Rekomendasi Kapasitas Konkuren
                  </span>
                  <span
                    data-testid="recommended-channels-output"
                    className="font-display text-[26px] font-extrabold text-[#E7621B] tabular-nums leading-[1.2]"
                  >
                    {recommendation.recommendedChannels} Kanal SIP
                  </span>
                </div>

                <div className="space-y-[10px] text-[14px]">
                  <div className="flex flex-wrap items-baseline justify-between gap-[16px]">
                    <span className="text-[#525252]">Topologi SBC</span>
                    <span className="font-semibold text-[#1A1A1A] text-right">
                      {recommendation.sbcTopology}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-[16px]">
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
              className="w-full py-[13px] px-[26px] min-h-[44px] rounded-lg vox-cta-gradient text-white text-[14px] font-semibold inline-flex items-center justify-center gap-[10px] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
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
