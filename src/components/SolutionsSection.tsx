import { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Globe2,
  Hash,
  Headphones,
  Network,
  PhoneForwarded,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import {
  COVERAGE_CITIES,
  INDONESIA_MOBILE_PREFIXES,
  INTELLIGENT_NETWORK_SERVICES,
  SOLUTION_PILLARS,
  SolutionPillar,
} from '../data/voxnetContent';
import komdigiData from '../data/komdigiCallCenterNumbers.json';
import {
  CallCenterFormat,
  filterCallCenterNumbers,
  filterCoverageCities,
  getCallCenterFormatLabel,
} from '../utils/consultationLogic';
import { PAGE_CONTAINER_CLASS, SECTION_PADDING_Y_CLASS } from '../utils/goldenRatio';

interface SolutionsSectionProps {
  onSelectSolutionForConsultation: (solutionTitle: string) => void;
}

const REGIONS = ['Semua', 'Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara'];

const PILLAR_ICONS: Record<SolutionPillar['id'], typeof Server> = {
  pbx: Server,
  'sip-trunk': Network,
  numbering: Hash,
  'managed-services': ShieldCheck,
};

const PILLAR_TARGETS: Record<SolutionPillar['id'], string> = {
  pbx: 'Contact Center, Kantor Pusat & Tim Hybrid / Remote',
  'sip-trunk': 'High-Volume Voicebot, Omnichannel & BPO Masif',
  numbering: 'Layanan Nasabah Nasional (1500/0800) & Brand 22 Kota',
  'managed-services': 'Perusahaan Kepatuhan Ketat & Tim IT Efisien',
};

export function SolutionsSection({ onSelectSolutionForConsultation }: SolutionsSectionProps) {
  // Modal state for "Pelajari Lebih Lanjut"
  const [detailPillar, setDetailPillar] = useState<SolutionPillar | null>(null);

  // Numbering Directory Categories: 'local' | 'mobile' | 'callcenter' | 'in'
  type DirectoryTab = 'local' | 'mobile' | 'callcenter' | 'in';
  const [activeDirectoryTab, setActiveDirectoryTab] = useState<DirectoryTab>('local');
  const [showDirectory, setShowDirectory] = useState(false);

  // Filters for Local 22 Kota
  const [selectedRegion, setSelectedRegion] = useState('Semua');
  const [cityQuery, setCityQuery] = useState('');

  // Call Center Data State (Pre-seeded with Komdigi, refreshed dynamically on button click)
  interface KomdigiState {
    total: number;
    count140: number;
    count150: number;
    count1500: number;
    sample140: string[];
    sample150: string[];
    sample1500: string[];
    allNumbers: string[];
    lastUpdated?: string;
    source?: string;
  }

  const [callCenterData, setCallCenterData] = useState<KomdigiState>({
    ...komdigiData,
    lastUpdated: (komdigiData as unknown as { lastUpdated?: string }).lastUpdated || '12 November 2026, 08:03 WIB',
    source: (komdigiData as unknown as { source?: string }).source || 'Direktorat Telekomunikasi Komdigi RI',
  });
  const [isSyncingKomdigi, setIsSyncingKomdigi] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Filters & Pagination for Call Center 140XY, 150XYZ, 1500XYZ (Komdigi data)
  const PAGE_SIZE = 48;
  const [callCenterSubTab, setCallCenterSubTab] = useState<CallCenterFormat>('all');
  const [callCenterQuery, setCallCenterQuery] = useState('');
  const [visibleCallCenterCount, setVisibleCallCenterCount] = useState(PAGE_SIZE);

  const handleCallCenterSubTabChange = (tab: CallCenterFormat) => {
    setCallCenterSubTab(tab);
    setVisibleCallCenterCount(PAGE_SIZE);
  };

  const handleCallCenterQueryChange = (value: string) => {
    setCallCenterQuery(value);
    setVisibleCallCenterCount(PAGE_SIZE);
  };

  // Handle dynamic refresh specifically on user button press
  const handleRefreshKomdigi = async () => {
    if (isSyncingKomdigi) return;
    setIsSyncingKomdigi(true);
    setSyncStatus('loading');
    setSyncFeedback('Menghubungkan ke portal Dittel Komdigi RI...');

    try {
      const res = await fetch('/api/komdigi-numbers/refresh', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal memulai sinkronisasi');

      setSyncFeedback('Mengambil alokasi data penomoran terbaru dari portal Dittel Komdigi RI...');

      // Poll periodically until finished or max 25 seconds
      const startTime = Date.now();
      const interval = setInterval(async () => {
        try {
          const statusRes = await fetch('/api/komdigi-numbers');
          const statusData = await statusRes.json();
          if (statusData.success && statusData.data) {
            if (!statusData.isRefreshing || Date.now() - startTime > 25000) {
              clearInterval(interval);
              setCallCenterData(statusData.data);
              setIsSyncingKomdigi(false);
              setSyncStatus('success');
              setSyncFeedback(
                `Data penomoran berhasil disinkronkan (${statusData.data.total.toLocaleString('id-ID')} nomor tersedia).`
              );
              setTimeout(() => {
                setSyncFeedback(null);
                setSyncStatus('idle');
              }, 4500);
            }
          }
        } catch {
          // ignore transient poll error
        }
      }, 2000);
    } catch {
      setIsSyncingKomdigi(false);
      setSyncStatus('error');
      setSyncFeedback('Gagal menghubungi layanan sinkronisasi. Menampilkan data resmi tersimpan.');
      setTimeout(() => {
        setSyncFeedback(null);
        setSyncStatus('idle');
      }, 4500);
    }
  };

  // Filtered Cities
  const filteredCities = useMemo(
    () => filterCoverageCities(COVERAGE_CITIES, selectedRegion, cityQuery),
    [selectedRegion, cityQuery]
  );

  // Filtered Komdigi Call Center Numbers (full filtered list + paginated slice)
  const filteredCallCenterNumbers = useMemo(
    () => filterCallCenterNumbers(callCenterData, callCenterSubTab, callCenterQuery),
    [callCenterData, callCenterSubTab, callCenterQuery]
  );

  const displayedCallCenterNumbers = useMemo(
    () => filteredCallCenterNumbers.slice(0, visibleCallCenterCount),
    [filteredCallCenterNumbers, visibleCallCenterCount]
  );

  return (
    <section id="solusi" className={`scroll-mt-[68px] bg-white border-b border-[#EBEBEB] ${SECTION_PADDING_Y_CLASS}`}>
      <div className={PAGE_CONTAINER_CLASS}>
        {/* Section Header: Clean & Focused without subheadings or variation switchers */}
        <div className="mb-[36px] sm:mb-[44px] pb-[20px] border-b border-[#F0F0F0]">
          <div className="space-y-[10px]">
            <span className="text-[13px] font-semibold tracking-wider text-[#B84408] uppercase block">
              Solusi &amp; Kapabilitas Inti
            </span>
            <h2 className="font-display text-[26px] sm:text-[34px] font-bold text-[#1A1A1A] tracking-[-0.02em] leading-[1.2] text-balance">
              Fondasi Komunikasi yang Menyesuaikan Skala Bisnis Anda
            </h2>
          </div>
        </div>

        {/* 4-Column Solutions Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-[24px]">
          {SOLUTION_PILLARS.map((pillar) => {
            const IconComp = PILLAR_ICONS[pillar.id];
            return (
              <div
                key={pillar.id}
                className="group rounded-2xl p-[24px] sm:p-[26px] bg-white border border-[#E5E5E5] hover:border-[#E7621B]/60 hover:shadow-[0_12px_30px_-10px_rgba(231,98,27,0.15)] transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-[16px]">
                  {/* Top Bar: Icon & Number Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#FFF5F0] group-hover:bg-[#E7621B] text-[#E7621B] group-hover:text-white flex items-center justify-center transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[14px] font-bold text-[#B84408] tabular-nums">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-[8px]">
                    <h3 className="font-display text-[18px] font-bold text-[#1A1A1A] leading-snug group-hover:text-[#E7621B] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-[13px] text-[#525252] leading-[1.6]">
                      {pillar.summary}
                    </p>
                  </div>
                </div>

                {/* Bottom Button: "Pelajari Lebih Lanjut" */}
                <div className="pt-[20px] mt-[24px] border-t border-[#EBEBEB]">
                  <button
                    type="button"
                    onClick={() => setDetailPillar(pillar)}
                    className="w-full py-[11px] px-[16px] min-h-[44px] rounded-lg bg-[#F8F9FA] hover:bg-[#E7621B] text-[#1A1A1A] hover:text-white border border-[#E0E0E0] hover:border-[#E7621B] text-[13.5px] font-semibold inline-flex items-center justify-center gap-[8px] transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B]"
                  >
                    <span>Pelajari Lebih Lanjut</span>
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>



        {/* Comprehensive Multi-Format Numbering Directory Accordion */}
        <div className="mt-[28px] bg-[#F8F9FA] border border-[#E5E5E5] rounded-[20px] p-[22px] sm:p-[28px] lg:p-[32px] transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-[20px]">
            <div className="space-y-[6px] max-w-[76ch]">
              <p className="text-[12.5px] font-semibold text-[#B84408]">
                Katalog Penomoran
              </p>
              <h3 className="font-display text-[20px] sm:text-[22px] font-bold text-[#1A1A1A] leading-[1.28] text-balance">
                Direktori Penomoran &amp; Kode Akses Telekomunikasi
              </h3>
              <p className="text-[13.5px] text-[#525252] leading-[1.6]">
                Telusuri cakupan nomor lokal 22 kota, rute operator seluler Indonesia, ketersediaan kode akses Pusat Panggilan Informasi (140XY, 150XYZ, 1500XYZ) dari Komdigi RI, serta layanan Intelligent Network (0800, 0804, 0807).
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowDirectory((prev) => !prev)}
              aria-expanded={showDirectory}
              aria-controls="voxnet-numbering-directory"
              className="inline-flex items-center justify-center gap-[8px] px-[20px] py-[11px] min-h-[44px] rounded-lg bg-white border border-[#D4D4D4] hover:border-[#1A1A1A] text-[13.5px] font-semibold text-[#1A1A1A] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B]"
            >
              <span>{showDirectory ? 'Tutup Direktori Penomoran' : 'Buka Direktori Penomoran'}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#525252] transition-transform duration-200 ${showDirectory ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {showDirectory && (
            <div id="voxnet-numbering-directory" className="mt-[24px] pt-[24px] border-t border-[#E5E5E5] space-y-[24px]">
              {/* Category Tab Bar: Minimalist Editorial Hairline Tabs with Group Dividers */}
              <div
                role="tablist"
                aria-label="Kategori Penomoran Telekomunikasi"
                className="grid grid-cols-1 sm:grid-cols-2 gap-[8px] lg:flex lg:flex-wrap xl:flex-nowrap lg:items-center lg:gap-x-[16px] xl:gap-x-[20px] lg:gap-y-[8px] lg:border-b lg:border-[#E5E5E5]"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeDirectoryTab === 'local'}
                  onClick={() => setActiveDirectoryTab('local')}
                  className={`group inline-flex items-center justify-between lg:justify-start gap-[6px] sm:gap-[8px] px-[12px] sm:px-[14px] py-[10px] rounded-xl border lg:rounded-none lg:border-0 lg:border-b-2 lg:px-0 lg:pt-[2px] lg:pb-[12px] lg:-mb-px text-[13px] sm:text-[13.5px] whitespace-nowrap transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B] ${
                    activeDirectoryTab === 'local'
                      ? 'bg-white border-[#FAD6C2] text-[#1A1A1A] font-bold lg:bg-transparent lg:border-b-[#E7621B]'
                      : 'bg-white/60 border-[#EBEBEB] text-[#525252] hover:text-[#1A1A1A] hover:bg-white font-medium lg:bg-transparent lg:border-b-transparent lg:hover:bg-transparent'
                  }`}
                >
                  <span className="inline-flex items-center gap-[8px]">
                    <Globe2
                      className={`w-[15px] h-[15px] shrink-0 transition-colors ${
                        activeDirectoryTab === 'local' ? 'text-[#E7621B]' : 'text-[#8A8A8A] group-hover:text-[#E7621B]'
                      }`}
                    />
                    <span>Penomoran Lokal</span>
                  </span>
                  <span aria-hidden="true" className="hidden lg:inline text-[#D4D4D4] font-normal">
                    ·
                  </span>
                  <span
                    className={`text-[12px] tabular-nums ${
                      activeDirectoryTab === 'local' ? 'text-[#B84408] font-semibold' : 'text-[#737373] font-normal'
                    }`}
                  >
                    22 Kota
                  </span>
                </button>

                <span aria-hidden="true" role="presentation" className="hidden lg:block w-px h-[16px] bg-[#E0E0E0] shrink-0 self-start mt-[4px]" />

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeDirectoryTab === 'mobile'}
                  onClick={() => setActiveDirectoryTab('mobile')}
                  className={`group inline-flex items-center justify-between lg:justify-start gap-[6px] sm:gap-[8px] px-[12px] sm:px-[14px] py-[10px] rounded-xl border lg:rounded-none lg:border-0 lg:border-b-2 lg:px-0 lg:pt-[2px] lg:pb-[12px] lg:-mb-px text-[13px] sm:text-[13.5px] whitespace-nowrap transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B] ${
                    activeDirectoryTab === 'mobile'
                      ? 'bg-white border-[#FAD6C2] text-[#1A1A1A] font-bold lg:bg-transparent lg:border-b-[#E7621B]'
                      : 'bg-white/60 border-[#EBEBEB] text-[#525252] hover:text-[#1A1A1A] hover:bg-white font-medium lg:bg-transparent lg:border-b-transparent lg:hover:bg-transparent'
                  }`}
                >
                  <span className="inline-flex items-center gap-[8px]">
                    <Smartphone
                      className={`w-[15px] h-[15px] shrink-0 transition-colors ${
                        activeDirectoryTab === 'mobile' ? 'text-[#E7621B]' : 'text-[#8A8A8A] group-hover:text-[#E7621B]'
                      }`}
                    />
                    <span>Mobile Indonesia</span>
                  </span>
                  <span aria-hidden="true" className="hidden lg:inline text-[#D4D4D4] font-normal">
                    ·
                  </span>
                  <span
                    className={`text-[12px] tabular-nums ${
                      activeDirectoryTab === 'mobile' ? 'text-[#B84408] font-semibold' : 'text-[#737373] font-normal'
                    }`}
                  >
                    {INDONESIA_MOBILE_PREFIXES.length} Operator
                  </span>
                </button>

                <span aria-hidden="true" role="presentation" className="hidden lg:block w-px h-[16px] bg-[#E0E0E0] shrink-0 self-start mt-[4px]" />

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeDirectoryTab === 'callcenter'}
                  onClick={() => setActiveDirectoryTab('callcenter')}
                  className={`group inline-flex items-center justify-between lg:justify-start gap-[6px] sm:gap-[8px] px-[12px] sm:px-[14px] py-[10px] rounded-xl border lg:rounded-none lg:border-0 lg:border-b-2 lg:px-0 lg:pt-[2px] lg:pb-[12px] lg:-mb-px text-[13px] sm:text-[13.5px] whitespace-nowrap transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B] ${
                    activeDirectoryTab === 'callcenter'
                      ? 'bg-white border-[#FAD6C2] text-[#1A1A1A] font-bold lg:bg-transparent lg:border-b-[#E7621B]'
                      : 'bg-white/60 border-[#EBEBEB] text-[#525252] hover:text-[#1A1A1A] hover:bg-white font-medium lg:bg-transparent lg:border-b-transparent lg:hover:bg-transparent'
                  }`}
                >
                  <span className="inline-flex items-center gap-[8px]">
                    <Headphones
                      className={`w-[15px] h-[15px] shrink-0 transition-colors ${
                        activeDirectoryTab === 'callcenter' ? 'text-[#E7621B]' : 'text-[#8A8A8A] group-hover:text-[#E7621B]'
                      }`}
                    />
                    <span>Pusat Panggilan (Call Center)</span>
                  </span>
                  <span aria-hidden="true" className="hidden lg:inline text-[#D4D4D4] font-normal">
                    ·
                  </span>
                  <span
                    className={`text-[12px] tabular-nums ${
                      activeDirectoryTab === 'callcenter' ? 'text-[#B84408] font-semibold' : 'text-[#737373] font-normal'
                    }`}
                  >
                    {callCenterData.total.toLocaleString('id-ID')}
                  </span>
                </button>

                <span aria-hidden="true" role="presentation" className="hidden lg:block w-px h-[16px] bg-[#E0E0E0] shrink-0 self-start mt-[4px]" />

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeDirectoryTab === 'in'}
                  onClick={() => setActiveDirectoryTab('in')}
                  className={`group inline-flex items-center justify-between lg:justify-start gap-[6px] sm:gap-[8px] px-[12px] sm:px-[14px] py-[10px] rounded-xl border lg:rounded-none lg:border-0 lg:border-b-2 lg:px-0 lg:pt-[2px] lg:pb-[12px] lg:-mb-px text-[13px] sm:text-[13.5px] whitespace-nowrap transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B] ${
                    activeDirectoryTab === 'in'
                      ? 'bg-white border-[#FAD6C2] text-[#1A1A1A] font-bold lg:bg-transparent lg:border-b-[#E7621B]'
                      : 'bg-white/60 border-[#EBEBEB] text-[#525252] hover:text-[#1A1A1A] hover:bg-white font-medium lg:bg-transparent lg:border-b-transparent lg:hover:bg-transparent'
                  }`}
                >
                  <span className="inline-flex items-center gap-[8px] min-w-0">
                    <PhoneForwarded
                      className={`w-[15px] h-[15px] shrink-0 transition-colors ${
                        activeDirectoryTab === 'in' ? 'text-[#E7621B]' : 'text-[#8A8A8A] group-hover:text-[#E7621B]'
                      }`}
                    />
                    <span className="truncate">Intelligent Network (IN)</span>
                  </span>
                  <span aria-hidden="true" className="hidden lg:inline text-[#D4D4D4] font-normal">
                    ·
                  </span>
                  <span
                    className={`text-[11.5px] font-mono tabular-nums shrink-0 ${
                      activeDirectoryTab === 'in' ? 'text-[#B84408] font-semibold' : 'text-[#737373] font-normal'
                    }`}
                  >
                    0800/0804/0807
                  </span>
                </button>
              </div>

              {/* TAB 1: Penomoran Lokal (22 Kota) */}
              {activeDirectoryTab === 'local' && (
                <div className="space-y-[18px]">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[14px]">
                    <div className="flex flex-wrap items-center gap-[8px]" role="group" aria-label="Filter wilayah Indonesia">
                      {REGIONS.map((region) => {
                        const selected = selectedRegion === region;
                        return (
                          <button
                            key={region}
                            type="button"
                            onClick={() => setSelectedRegion(region)}
                            className={`px-[14px] py-[8px] rounded-lg text-[12.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B] ${
                              selected
                                ? 'bg-[#1A1A1A] text-white'
                                : 'bg-white border border-[#E5E5E5] text-[#404040] hover:border-[#1A1A1A]'
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
                      <Search className="w-4 h-4 text-[#525252] absolute left-[14px] top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="city-search-input"
                        type="text"
                        value={cityQuery}
                        onChange={(e) => setCityQuery(e.target.value)}
                        placeholder="Cari kota atau kode (mis. 031)..."
                        className="w-full pl-[40px] pr-[14px] py-[9px] min-h-[42px] bg-white border border-[#E5E5E5] rounded-lg text-[13.5px] text-[#1A1A1A] placeholder:text-[#737373] focus:outline-none focus:border-[#E7621B]"
                      />
                    </div>
                  </div>

                  <div className="text-[12px] text-[#666666] tabular-nums">
                    <span>
                      Menampilkan <strong className="text-[#1A1A1A]">{filteredCities.length}</strong> dari {COVERAGE_CITIES.length} kota cakupan
                    </span>
                  </div>

                  {filteredCities.length === 0 ? (
                    <div className="bg-white border border-[#E5E5E5] rounded-xl p-[24px] text-center">
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
                        <button
                          key={`${item.city}-${item.areaCode}`}
                          type="button"
                          onClick={() => onSelectSolutionForConsultation(`Nomor Lokal ${item.city} (${item.areaCode})`)}
                          className="group bg-white border border-[#E5E5E5] rounded-xl p-[14px] text-left flex flex-col justify-between gap-[4px] hover:border-[#E7621B] hover:bg-[#FFF9F6] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B]"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-mono text-[12.5px] font-semibold text-[#B84408] tabular-nums">
                              ({item.areaCode})
                            </span>
                            <ArrowRight className="w-3 h-3 text-[#B84408] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <span className="font-display text-[14.5px] font-bold text-[#1A1A1A]">
                            {item.city}
                          </span>
                          <span className="text-[11.5px] text-[#525252]">{item.province}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Mobile Indonesia */}
              {activeDirectoryTab === 'mobile' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                  {INDONESIA_MOBILE_PREFIXES.map((op) => (
                    <button
                      key={op.operator}
                      type="button"
                      onClick={() => onSelectSolutionForConsultation(`Mobile Indonesia — ${op.operator}`)}
                      className="group bg-white rounded-xl p-[20px] border border-[#E5E5E5] hover:border-[#E7621B] hover:bg-[#FFF9F6] flex items-center justify-between gap-[12px] text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B]"
                    >
                      <div className="flex items-center gap-[12px]">
                        <div className="w-9 h-9 rounded-lg bg-[#FFF5F0] text-[#B84408] flex items-center justify-center shrink-0">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <h5 className="font-display text-[15.5px] font-bold text-[#1A1A1A] group-hover:text-[#B84408] transition-colors">
                          {op.operator}
                        </h5>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#B84408] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* TAB 3: Kode Akses Pusat Panggilan Informasi (Call Center 140XY, 150XYZ, 1500XYZ - Data Resmi Komdigi) */}
              {activeDirectoryTab === 'callcenter' && (
                <div className="space-y-[18px]">
                  {/* Official Komdigi Sync Banner with On-Demand Refresh (No Pill Clutter) */}
                  <div className="bg-white border border-[#FAD6C2] rounded-xl p-[18px] sm:p-[22px] flex flex-col lg:flex-row lg:items-center justify-between gap-[16px]">
                    <h4 className="font-display text-[17px] font-bold text-[#1A1A1A] leading-snug">
                      Ketersediaan Nomor Kode Akses Pusat Panggilan Informasi (Call Center)
                    </h4>

                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-[10px] shrink-0">
                      <button
                        type="button"
                        onClick={handleRefreshKomdigi}
                        disabled={isSyncingKomdigi}
                        className="inline-flex items-center justify-center gap-[8px] px-[16px] py-[10px] min-h-[42px] rounded-lg bg-[#E7621B] hover:bg-[#B84408] disabled:opacity-75 text-white text-[12.5px] font-bold transition-colors cursor-pointer disabled:cursor-not-allowed whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B]"
                        title="Ambil data ketersediaan nomor terbaru langsung dari portal Dittel Komdigi RI"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${isSyncingKomdigi ? 'animate-spin' : ''}`} />
                        <span>{isSyncingKomdigi ? 'Menyinkronkan...' : 'Segarkan Data'}</span>
                      </button>

                      <a
                        href="https://dittel.komdigi.go.id/informasi/data-perizinan/data-alokasi-penomoran-telekomunikasi-tersedia.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-[6px] px-[14px] py-[10px] min-h-[42px] rounded-lg bg-white border border-[#E0E0E0] hover:border-[#1A1A1A] text-[12.5px] font-semibold text-[#404040] hover:text-[#1A1A1A] whitespace-nowrap transition-colors"
                      >
                        <span>Portal Komdigi</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Semantic Sync Status Feedback (Loading = Amber, Success = Green, Error = Red) */}
                  {syncFeedback && (
                    <div
                      role="status"
                      aria-live="polite"
                      className={`flex items-center gap-[10px] px-[16px] py-[10px] rounded-xl border text-[12.5px] font-medium ${
                        syncStatus === 'loading'
                          ? 'bg-[#FFF8F5] border-[#FAD6C2] text-[#9A3412]'
                          : syncStatus === 'error'
                            ? 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
                            : 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
                      }`}
                    >
                      {syncStatus === 'loading' ? (
                        <RefreshCw className="w-4 h-4 shrink-0 animate-spin text-[#E7621B]" />
                      ) : syncStatus === 'error' ? (
                        <AlertCircle className="w-4 h-4 shrink-0 text-[#DC2626]" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
                      )}
                      <span>{syncFeedback}</span>
                    </div>
                  )}

                  {/* Format Sub-filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[14px]">
                    <div className="flex flex-wrap items-center gap-[6px]">
                      <button
                        type="button"
                        onClick={() => handleCallCenterSubTabChange('all')}
                        className={`px-[14px] py-[8px] rounded-lg text-[12.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                          callCenterSubTab === 'all'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-white border border-[#E5E5E5] text-[#525252] hover:border-[#1A1A1A]'
                        }`}
                      >
                        Semua ({callCenterData.total.toLocaleString('id-ID')})
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCallCenterSubTabChange('140')}
                        className={`px-[14px] py-[8px] rounded-lg text-[12.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                          callCenterSubTab === '140'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-white border border-[#E5E5E5] text-[#525252] hover:border-[#1A1A1A]'
                        }`}
                      >
                        140XY ({callCenterData.count140.toLocaleString('id-ID')})
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCallCenterSubTabChange('150')}
                        className={`px-[14px] py-[8px] rounded-lg text-[12.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                          callCenterSubTab === '150'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-white border border-[#E5E5E5] text-[#525252] hover:border-[#1A1A1A]'
                        }`}
                      >
                        150XYZ ({callCenterData.count150.toLocaleString('id-ID')})
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCallCenterSubTabChange('1500')}
                        className={`px-[14px] py-[8px] rounded-lg text-[12.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                          callCenterSubTab === '1500'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-white border border-[#E5E5E5] text-[#525252] hover:border-[#1A1A1A]'
                        }`}
                      >
                        1500XYZ ({callCenterData.count1500.toLocaleString('id-ID')})
                      </button>
                    </div>

                    <div className="relative w-full sm:w-[260px]">
                      <label htmlFor="callcenter-search-input" className="sr-only">
                        Cari nomor Call Center
                      </label>
                      <Search className="w-4 h-4 text-[#737373] absolute left-[14px] top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="callcenter-search-input"
                        type="text"
                        value={callCenterQuery}
                        onChange={(e) => handleCallCenterQueryChange(e.target.value)}
                        placeholder="Cari nomor (mis. 140, 1500)..."
                        className="w-full pl-[38px] pr-[14px] py-[8px] min-h-[40px] bg-white border border-[#E5E5E5] rounded-lg text-[13px] text-[#1A1A1A] placeholder:text-[#737373] focus:outline-none focus:border-[#E7621B]"
                      />
                    </div>
                  </div>

                  {/* Interactive Number Grid */}
                  <div className="bg-white rounded-xl border border-[#E5E5E5] p-[16px] sm:p-[20px]">
                    <div className="mb-[14px] text-[12px] text-[#666666] border-b border-[#F0F0F0] pb-[10px] tabular-nums">
                      <span>
                        Menampilkan <strong className="text-[#1A1A1A]">{displayedCallCenterNumbers.length.toLocaleString('id-ID')}</strong> dari{' '}
                        <strong className="text-[#1A1A1A]">{filteredCallCenterNumbers.length.toLocaleString('id-ID')}</strong> nomor tersedia
                      </span>
                    </div>

                    {displayedCallCenterNumbers.length === 0 ? (
                      <div className="py-[28px] text-center space-y-[8px]">
                        <p className="text-[13.5px] text-[#525252]">
                          Nomor tidak ditemukan untuk pencarian "{callCenterQuery}".
                        </p>
                        <button
                          type="button"
                          onClick={() => handleCallCenterQueryChange('')}
                          className="text-[13px] font-semibold text-[#B84408] hover:underline cursor-pointer"
                        >
                          Reset pencarian
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[8px]">
                          {displayedCallCenterNumbers.map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => onSelectSolutionForConsultation(`Pengajuan Nomor Call Center ${num}`)}
                              className="group px-[12px] py-[10px] rounded-lg border border-[#EBEBEB] hover:border-[#E7621B] hover:bg-[#FFF9F6] transition-colors flex items-center justify-between gap-[6px] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B]"
                            >
                              <span className="font-mono text-[14px] font-bold text-[#1A1A1A] group-hover:text-[#B84408] tracking-tight tabular-nums">
                                {num}
                              </span>
                              <span className="text-[10.5px] font-medium text-[#737373] group-hover:text-[#B84408] transition-colors">
                                {getCallCenterFormatLabel(num)}
                              </span>
                            </button>
                          ))}
                        </div>

                        {visibleCallCenterCount < filteredCallCenterNumbers.length && (
                          <div className="mt-[16px] flex justify-center">
                            <button
                              type="button"
                              onClick={() => setVisibleCallCenterCount((prev) => prev + PAGE_SIZE)}
                              className="inline-flex items-center gap-[8px] px-[18px] py-[9px] rounded-lg bg-[#F8F9FA] hover:bg-[#EFEFEF] border border-[#E0E0E0] text-[12.5px] font-semibold text-[#1A1A1A] transition-colors cursor-pointer tabular-nums"
                            >
                              <span>
                                Tampilkan Lebih Banyak (sisa {(filteredCallCenterNumbers.length - visibleCallCenterCount).toLocaleString('id-ID')} nomor)
                              </span>
                            </button>
                          </div>
                        )}
                      </>
                    )}

                  </div>
                </div>
              )}

              {/* TAB 4: Kode Akses Intelligent Network (IN) - Stok Eksklusif Non-Komdigi */}
              {activeDirectoryTab === 'in' && (
                <div className="space-y-[20px]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px] items-stretch">
                    {INTELLIGENT_NETWORK_SERVICES.map((inService) => (
                      <div
                        key={inService.prefix}
                        className="bg-white rounded-xl p-[22px] border border-[#E5E5E5] flex flex-col justify-between gap-[18px]"
                      >
                        <div className="space-y-[12px]">
                          <div className="space-y-[4px]">
                            <span className="text-[11.5px] font-semibold text-[#B84408] block">
                              {inService.type}
                            </span>
                            <div className="font-mono text-[19px] font-bold text-[#1A1A1A] tracking-tight tabular-nums">
                              {inService.prefix}
                            </div>
                          </div>

                          <div className="space-y-[6px]">
                            <h5 className="font-display text-[15px] font-bold text-[#1A1A1A] leading-snug">
                              {inService.name}
                            </h5>
                            <p className="text-[12.5px] text-[#525252] leading-[1.6]">
                              {inService.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-[14px] border-t border-[#F0F0F0]">
                          <button
                            type="button"
                            onClick={() => onSelectSolutionForConsultation(`Aktivasi Nomor ${inService.prefix}`)}
                            className="w-full py-[10px] px-[14px] min-h-[42px] rounded-lg bg-[#F8F9FA] hover:bg-[#E7621B] text-[#1A1A1A] hover:text-white border border-[#E0E0E0] hover:border-[#E7621B] text-[13px] font-semibold inline-flex items-center justify-center gap-[6px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B]"
                          >
                            <span>Konsultasikan {inService.prefix.split('-')[0]}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal Dialog for "Pelajari Lebih Lanjut" */}
      {detailPillar && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pillar-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setDetailPillar(null)}
        >
          <div
            className="w-full max-w-[620px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#EBEBEB] space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#F0F0F0] pb-4">
              <div className="space-y-1">
                <span className="font-mono text-[12px] font-bold text-[#B84408] uppercase tracking-wider block">
                  Pilar Solusi {detailPillar.number}
                </span>
                <h3 id="pillar-modal-title" className="font-display text-[22px] sm:text-[24px] font-bold text-[#1A1A1A]">
                  {detailPillar.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailPillar(null)}
                className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] flex items-center justify-center text-[#525252] font-bold transition-colors cursor-pointer"
                aria-label="Tutup jendela"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Architecture Highlight */}
            <div className="space-y-2">
              <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#737373] block">
                Ringkasan Arsitektur
              </span>
              <p className="text-[14px] text-[#1A1A1A] leading-relaxed bg-[#FFF8F5] p-3.5 rounded-xl border border-[#E7621B]/30 font-medium">
                {detailPillar.architectureHighlight}
              </p>
            </div>

            {/* Target Recommendation */}
            <div className="space-y-1 text-[13px]">
              <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#737373] block">
                Target Penggunaan:
              </span>
              <p className="text-[#333333] font-medium">
                {PILLAR_TARGETS[detailPillar.id]}
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-2.5">
              <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#737373] block">
                Spesifikasi Teknis
              </span>
              <div className="space-y-2 border border-[#EBEBEB] rounded-xl p-3.5 bg-[#FAFAFA]">
                {detailPillar.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-4 text-[13px] py-1 border-b border-[#F0F0F0] last:border-b-0"
                  >
                    <span className="text-[#595959]">{spec.label}</span>
                    <span className="font-semibold text-[#1A1A1A] text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deployment Options */}
            <div className="space-y-2">
              <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#737373] block">
                Opsi Penerapan Terverifikasi
              </span>
              <ul className="space-y-2">
                {detailPillar.deploymentOptions.map((opt) => (
                  <li key={opt} className="flex items-center gap-2 text-[13px] text-[#333333]">
                    <Check className="w-4 h-4 text-[#E7621B] shrink-0" />
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#F0F0F0] flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDetailPillar(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-[13.5px] font-semibold text-[#525252] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = detailPillar.title;
                  setDetailPillar(null);
                  onSelectSolutionForConsultation(title);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg vox-cta-gradient text-white text-[13.5px] font-bold shadow-xs hover:opacity-95 transition-all cursor-pointer"
              >
                <span>Konsultasikan Solusi Ini</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
