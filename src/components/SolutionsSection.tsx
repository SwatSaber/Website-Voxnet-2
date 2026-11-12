import { useMemo, useState } from 'react';
import { ArrowRight, Check, Search } from 'lucide-react';
import { COVERAGE_CITIES, SOLUTION_PILLARS, SolutionPillar } from '../data/voxnetContent';
import { filterCoverageCities } from '../utils/consultationLogic';
import { PAGE_CONTAINER_CLASS, SECTION_PADDING_Y_CLASS } from '../utils/goldenRatio';

interface SolutionsSectionProps {
  onSelectSolutionForConsultation: (solutionTitle: string) => void;
}

const REGIONS = ['Semua', 'Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara'];

export function SolutionsSection({ onSelectSolutionForConsultation }: SolutionsSectionProps) {
  const [activePillarId, setActivePillarId] = useState<SolutionPillar['id']>('pbx');
  const [showCityExplorer, setShowCityExplorer] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Semua');
  const [cityQuery, setCityQuery] = useState('');

  const activePillar = useMemo(
    () => SOLUTION_PILLARS.find((item) => item.id === activePillarId) ?? SOLUTION_PILLARS[0],
    [activePillarId]
  );

  const filteredCities = useMemo(
    () => filterCoverageCities(COVERAGE_CITIES, selectedRegion, cityQuery),
    [selectedRegion, cityQuery]
  );

  const handlePillarSelect = (id: SolutionPillar['id']) => {
    setActivePillarId(id);
    if (id === 'numbering') {
      setShowCityExplorer(true);
    }
  };

  return (
    <section id="solusi" className={`scroll-mt-[68px] bg-white border-b border-[#EBEBEB] ${SECTION_PADDING_Y_CLASS}`}>
      <div className={PAGE_CONTAINER_CLASS}>
        <div className="max-w-[740px] space-y-[16px] mb-[42px]">
          <p className="text-[13px] font-semibold tracking-wider text-[#B84408]">
            Solusi & Kapabilitas Inti
          </p>
          <h2 className="font-display text-[26px] sm:text-[34px] font-bold text-[#1A1A1A] tracking-[-0.02em] leading-[1.18] text-balance">
            Fondasi Komunikasi yang Menyesuaikan Skala Bisnis Anda
          </h2>
        </div>

        {/* Asymmetric Golden Ratio Bento Grid: 4 Pillars (61.8%) + Specification Drawer (38.2%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-[26px] lg:gap-[42px] items-stretch">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] lg:gap-[26px]">
            {SOLUTION_PILLARS.map((pillar) => {
              const isActive = pillar.id === activePillarId;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => handlePillarSelect(pillar.id)}
                  aria-pressed={isActive}
                  className={`text-left rounded-[16px] p-[26px] border transition-all duration-200 flex flex-col justify-between gap-[22px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B] ${
                    isActive
                      ? 'bg-[#FFF8F5] border-[#E7621B]'
                      : 'bg-white border-[#EBEBEB] hover:border-[#C7C7C7]'
                  }`}
                >
                  <div className="space-y-[10px]">
                    <div className="flex items-center justify-between gap-[10px]">
                      <span className="font-mono text-[13px] font-semibold text-[#B84408] tabular-nums">
                        {pillar.number}.
                      </span>
                      <span
                        className={`text-[13px] font-semibold ${
                          isActive ? 'text-[#B84408]' : 'text-[#525252]'
                        }`}
                      >
                        {isActive ? 'Sedang Ditampilkan' : 'Lihat Spesifikasi'}
                      </span>
                    </div>

                    <h3 className="font-display text-[18px] font-bold text-[#1A1A1A] leading-[1.272]">
                      {pillar.title}
                    </h3>

                    <p className="text-[14px] text-[#4A4A4A] leading-[1.618]">
                      {pillar.summary}
                    </p>
                  </div>

                  {/* Aligned footer metadata */}
                  <div className="pt-[16px] border-t border-[#EBEBEB] text-[13px] font-medium text-[#525252] min-h-[58px] flex items-start">
                    <span>{pillar.deploymentOptions.join(' · ')}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Selected Pillar Architecture Details */}
          <div className="bg-[#F8F9FA] border border-[#EBEBEB] rounded-[16px] p-[26px] lg:p-[42px] flex flex-col justify-between gap-[26px]">
            <div className="space-y-[26px]">
              <div className="space-y-[10px]">
                <p className="font-mono text-[13px] font-semibold text-[#B84408] tabular-nums">
                  Pilar {activePillar.number}
                </p>
                <h3 className="font-display text-[21px] font-bold text-[#1A1A1A] leading-[1.272]">
                  {activePillar.title}
                </h3>
                <p className="text-[14px] text-[#4A4A4A] leading-[1.618]">
                  {activePillar.architectureHighlight}
                </p>
              </div>

              <div className="border-t border-[#EBEBEB] pt-[16px] space-y-[10px]">
                {activePillar.specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-[16px] text-[14px]">
                    <span className="text-[#525252]">{spec.label}</span>
                    <span className="font-semibold text-[#1A1A1A] text-right tabular-nums">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#EBEBEB] pt-[16px] space-y-[10px]">
                <p className="text-[13px] font-semibold text-[#1A1A1A]">Opsi Implementasi Tersedia</p>
                <ul className="space-y-[10px]">
                  {activePillar.deploymentOptions.map((opt) => (
                    <li key={opt} className="flex items-center gap-[10px] text-[14px] text-[#333333]">
                      <Check className="w-4 h-4 text-[#E7621B] shrink-0" aria-hidden="true" />
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-[16px] border-t border-[#EBEBEB]">
              <button
                type="button"
                onClick={() => onSelectSolutionForConsultation(activePillar.title)}
                className="w-full py-[13px] px-[26px] min-h-[44px] rounded-lg vox-cta-gradient text-white text-[14px] font-semibold inline-flex items-center justify-center gap-[8px] transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
              >
                <span>Diskusikan Solusi Ini</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive 22-City Coverage Directory */}
        <div className="mt-[42px] bg-[#F8F9FA] border border-[#EBEBEB] rounded-[16px] p-[26px] lg:p-[42px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-[26px]">
            <div className="space-y-[6px]">
              <h3 className="font-display text-[21px] font-bold text-[#1A1A1A] leading-[1.272]">
                Direktori Penomoran Lokal Resmi 22 Kota & Nomor 1500 / 0800
              </h3>
              <p className="text-[14px] text-[#525252] leading-[1.618]">
                Cek kode area lokal yang siap diaktifkan untuk kehadiran bisnis regional perusahaan Anda.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCityExplorer((prev) => !prev)}
              aria-expanded={showCityExplorer}
              aria-controls="voxnet-city-directory"
              className="inline-flex items-center justify-center px-[26px] py-[13px] min-h-[44px] rounded-lg bg-white border border-[#EBEBEB] hover:border-[#1A1A1A] text-[14px] font-semibold text-[#1A1A1A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {showCityExplorer ? 'Tutup Direktori Kota' : 'Buka Daftar 22 Kota'}
            </button>
          </div>

          {showCityExplorer && (
            <div id="voxnet-city-directory" className="mt-[26px] pt-[26px] border-t border-[#EBEBEB] space-y-[26px]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[16px]">
                <div className="flex flex-wrap items-center gap-[10px]" role="group" aria-label="Filter wilayah Indonesia">
                  {REGIONS.map((region) => {
                    const selected = selectedRegion === region;
                    return (
                      <button
                        key={region}
                        type="button"
                        onClick={() => setSelectedRegion(region)}
                        className={`px-[16px] py-[10px] rounded-lg text-[13px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          selected
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-white border border-[#EBEBEB] text-[#404040] hover:border-[#1A1A1A]'
                        }`}
                      >
                        {region}
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full lg:w-[276px]">
                  <label htmlFor="city-search-input" className="sr-only">
                    Cari kota atau kode area
                  </label>
                  <Search className="w-4 h-4 text-[#525252] absolute left-[16px] top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="city-search-input"
                    type="text"
                    value={cityQuery}
                    onChange={(e) => setCityQuery(e.target.value)}
                    placeholder="Cari kota atau kode (mis. 031)..."
                    className="w-full pl-[42px] pr-[16px] py-[10px] min-h-[44px] bg-white border border-[#EBEBEB] rounded-lg text-[14px] text-[#1A1A1A] placeholder:text-[#737373] focus:outline-none focus:border-[#E7621B]"
                  />
                </div>
              </div>

              {filteredCities.length === 0 ? (
                <div className="bg-white border border-[#EBEBEB] rounded-[12px] p-[26px] text-center">
                  <p className="text-[14px] font-medium text-[#1A1A1A]">
                    Kota atau kode area tidak ditemukan untuk kata kunci "{cityQuery}".
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRegion('Semua');
                      setCityQuery('');
                    }}
                    className="mt-[10px] text-[13px] font-semibold text-[#B84408] hover:underline cursor-pointer"
                  >
                    Tampilkan semua 22 kota
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[10px]">
                  {filteredCities.map((item) => (
                    <div
                      key={`${item.city}-${item.areaCode}`}
                      className="bg-white border border-[#EBEBEB] rounded-[12px] p-[16px] flex flex-col justify-between gap-[6px]"
                    >
                      <span className="font-mono text-[13px] font-semibold text-[#B84408] tabular-nums">
                        ({item.areaCode})
                      </span>
                      <span className="font-display text-[15px] font-bold text-[#1A1A1A]">
                        {item.city}
                      </span>
                      <span className="text-[12px] text-[#525252]">{item.province}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
