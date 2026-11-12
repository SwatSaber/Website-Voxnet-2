import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Search,
  Server,
  Network,
  Hash,
  ShieldCheck,
  LayoutGrid,
  Layers,
  TableProperties,
  Activity,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { COVERAGE_CITIES, SOLUTION_PILLARS, SolutionPillar } from '../data/voxnetContent';
import { filterCoverageCities } from '../utils/consultationLogic';
import { PAGE_CONTAINER_CLASS, SECTION_PADDING_Y_CLASS } from '../utils/goldenRatio';

interface SolutionsSectionProps {
  onSelectSolutionForConsultation: (solutionTitle: string) => void;
}

type DesignVariation = 'bento' | 'tabbed' | 'matrix';

const REGIONS = ['Semua', 'Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara'];

const PILLAR_ICONS: Record<SolutionPillar['id'], typeof Server> = {
  pbx: Server,
  'sip-trunk': Network,
  numbering: Hash,
  'managed-services': ShieldCheck,
};

const PILLAR_TARGETS: Record<SolutionPillar['id'], string> = {
  pbx: 'Contact Center, Kantor Pusat, & Tim Remote',
  'sip-trunk': 'High-Volume Voicebot, Omnichannel & BPO',
  numbering: 'Layanan Nasabah Nasional & Brand Regional',
  'managed-services': 'Perusahaan Kepatuhan Ketat & Tim IT Efisien',
};

const COMPARISON_ROWS = [
  {
    feature: 'Topologi & Penempatan',
    pbx: 'Cloud, On-Premises, atau Hybrid',
    'sip-trunk': 'Direct SBC Interconnect (Carrier-grade)',
    numbering: 'Penomoran Virtual & PSTN Interconnect',
    'managed-services': 'Dedicated Managed NOC & Managed Server',
  },
  {
    feature: 'Kapasitas Skalabilitas',
    pbx: '50 s/d 10.000+ Ekstensi aktif',
    'sip-trunk': 'Ribuan kanal panggilan konkuren per node',
    numbering: '22 Kota + Alokasi 1500/0800',
    'managed-services': 'Skalabilitas tanpa batas (Enterprise NOC)',
  },
  {
    feature: 'Enkripsi & Keamanan',
    pbx: 'TLS / SRTP & VPN Tunneling',
    'sip-trunk': 'Strict IP Whitelisting & Firewall SBC',
    numbering: 'Legalitas Operator Resmi Kominfo',
    'managed-services': 'DLP, Enkripsi Rekaman & Audit Trail',
  },
  {
    feature: 'Integrasi Sistem',
    pbx: 'REST API, Webhook, SIPREC CRM',
    'sip-trunk': 'SIP Standard RFC 3261 / FreePBX / Asterisk',
    numbering: 'Mapping Caller ID & DID Dinamis',
    'managed-services': 'Dashboard Monitoring & Alert Real-time',
  },
  {
    feature: 'SLA Dukungan Teknis',
    pbx: '99.9% Uptime dengan Backup',
    'sip-trunk': '99.99% Uptime Active-Active Dual SBC',
    numbering: 'Registrasi Resmi & Garansi Jalur Telko',
    'managed-services': 'Engineering Support 24/7 Response <15 Menit',
  },
];

export function SolutionsSection({ onSelectSolutionForConsultation }: SolutionsSectionProps) {
  // State for Design Variations
  const [activeVariation, setActiveVariation] = useState<DesignVariation>('bento');

  // State for Pillar Selection
  const [activePillarId, setActivePillarId] = useState<SolutionPillar['id']>('pbx');

  // State for City Directory
  const [showCityExplorer, setShowCityExplorer] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Semua');
  const [cityQuery, setCityQuery] = useState('');

  // State for Matrix Table Toggle
  const [showFullMatrix, setShowFullMatrix] = useState(true);

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
        {/* Section Header with Design Variation Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[24px] mb-[36px] pb-[24px] border-b border-[#F0F0F0]">
          <div className="max-w-[700px] space-y-[12px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[13px] font-semibold tracking-wider text-[#B84408] uppercase">
                Solusi & Kapabilitas Inti
              </span>
              <span className="text-[12px] text-[#8C8C8C]">·</span>
              <span className="text-[12px] font-medium text-[#737373]">
                Infrastruktur Suara Siap Skala
              </span>
            </div>
            <h2 className="font-display text-[26px] sm:text-[34px] font-bold text-[#1A1A1A] tracking-[-0.02em] leading-[1.18] text-balance">
              Fondasi Komunikasi yang Menyesuaikan Skala Bisnis Anda
            </h2>
            <p className="text-[14px] text-[#525252] leading-[1.6]">
              Pilih dari 4 pilar arsitektur komunikasi suara enterprise yang dirancang untuk performa tinggi,
              stabilitas panggilan masif, dan kepatuhan telko Indonesia.
            </p>
          </div>

          {/* Interactive Variation Selector Controls */}
          <div className="flex flex-col items-start lg:items-end gap-[8px] shrink-0">
            <span className="text-[11px] font-semibold text-[#737373] tracking-wide uppercase">
              Variasi Tampilan Bagian Ini
            </span>
            <div
              className="inline-flex items-center p-1 bg-[#F5F5F5] rounded-xl border border-[#E5E5E5] gap-1"
              role="group"
              aria-label="Pilihan variasi desain solusi"
            >
              <button
                type="button"
                onClick={() => setActiveVariation('bento')}
                aria-pressed={activeVariation === 'bento'}
                className={`inline-flex items-center gap-[6px] px-[12px] py-[8px] rounded-lg text-[13px] font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  activeVariation === 'bento'
                    ? 'bg-white text-[#1A1A1A] shadow-xs border border-[#E0E0E0]'
                    : 'text-[#595959] hover:text-[#1A1A1A] hover:bg-black/[0.03]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-[#E7621B]" />
                <span>1. Bento Detail</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveVariation('tabbed')}
                aria-pressed={activeVariation === 'tabbed'}
                className={`inline-flex items-center gap-[6px] px-[12px] py-[8px] rounded-lg text-[13px] font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  activeVariation === 'tabbed'
                    ? 'bg-white text-[#1A1A1A] shadow-xs border border-[#E0E0E0]'
                    : 'text-[#595959] hover:text-[#1A1A1A] hover:bg-black/[0.03]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#E7621B]" />
                <span>2. Tab Showcase</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveVariation('matrix')}
                aria-pressed={activeVariation === 'matrix'}
                className={`inline-flex items-center gap-[6px] px-[12px] py-[8px] rounded-lg text-[13px] font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  activeVariation === 'matrix'
                    ? 'bg-white text-[#1A1A1A] shadow-xs border border-[#E0E0E0]'
                    : 'text-[#595959] hover:text-[#1A1A1A] hover:bg-black/[0.03]'
                }`}
              >
                <TableProperties className="w-3.5 h-3.5 text-[#E7621B]" />
                <span>3. Matriks 4-Kolom</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            VARIASI 1: BENTO MASTER-DETAIL (Asymmetric Golden Ratio)
            ======================================================== */}
        {activeVariation === 'bento' && (
          <div className="space-y-[32px] transition-opacity duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-[26px] lg:gap-[42px] items-stretch">
              {/* 4 Clickable Bento Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] lg:gap-[24px]">
                {SOLUTION_PILLARS.map((pillar) => {
                  const isActive = pillar.id === activePillarId;
                  const IconComp = PILLAR_ICONS[pillar.id];
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => handlePillarSelect(pillar.id)}
                      aria-pressed={isActive}
                      className={`text-left rounded-[16px] p-[24px] border transition-all duration-200 flex flex-col justify-between gap-[20px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7621B] ${
                        isActive
                          ? 'bg-[#FFF8F5] border-[#E7621B] shadow-xs ring-1 ring-[#E7621B]/30'
                          : 'bg-white border-[#EBEBEB] hover:border-[#C7C7C7] hover:shadow-xs'
                      }`}
                    >
                      <div className="space-y-[12px]">
                        <div className="flex items-center justify-between gap-[10px]">
                          <div className="flex items-center gap-[8px]">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                isActive ? 'bg-[#E7621B] text-white' : 'bg-[#F5F5F5] text-[#525252]'
                              }`}
                            >
                              <IconComp className="w-4 h-4" />
                            </div>
                            <span className="font-mono text-[13px] font-semibold text-[#B84408] tabular-nums">
                              {pillar.number}.
                            </span>
                          </div>
                          <span
                            className={`text-[12px] font-semibold px-2 py-0.5 rounded ${
                              isActive
                                ? 'bg-[#FFE8DC] text-[#B84408]'
                                : 'text-[#737373] bg-[#F5F5F5]'
                            }`}
                          >
                            {isActive ? 'Aktif' : 'Lihat Detail'}
                          </span>
                        </div>

                        <h3 className="font-display text-[18px] font-bold text-[#1A1A1A] leading-[1.25]">
                          {pillar.title}
                        </h3>

                        <p className="text-[13px] text-[#4A4A4A] leading-[1.6]">
                          {pillar.summary}
                        </p>
                      </div>

                      {/* Metadata tag strip */}
                      <div className="pt-[14px] border-t border-[#EBEBEB] text-[12px] font-medium text-[#525252] flex flex-col gap-1">
                        <span className="text-[11px] text-[#8C8C8C] uppercase font-semibold">
                          Opsi Deployment:
                        </span>
                        <span className="line-clamp-1">{pillar.deploymentOptions.join(' · ')}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Panel: Selected Pillar Architecture Details */}
              <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-[16px] p-[28px] lg:p-[36px] flex flex-col justify-between gap-[26px]">
                <div className="space-y-[22px]">
                  <div className="space-y-[8px]">
                    <div className="flex items-center gap-[8px]">
                      <span className="font-mono text-[12px] font-bold text-[#B84408] uppercase tracking-wider tabular-nums">
                        Pilar Arsitektur {activePillar.number}
                      </span>
                    </div>
                    <h3 className="font-display text-[22px] font-bold text-[#1A1A1A] leading-[1.25]">
                      {activePillar.title}
                    </h3>
                    <p className="text-[13.5px] text-[#4A4A4A] leading-[1.6]">
                      {activePillar.architectureHighlight}
                    </p>
                  </div>

                  {/* Specifications list */}
                  <div className="border-t border-[#EAEAEA] pt-[16px] space-y-[10px]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373]">
                      Spesifikasi Teknis
                    </span>
                    <div className="space-y-[8px]">
                      {activePillar.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-baseline justify-between gap-[16px] text-[13.5px] py-1 border-b border-[#F0F0F0] last:border-b-0"
                        >
                          <span className="text-[#595959]">{spec.label}</span>
                          <span className="font-semibold text-[#1A1A1A] text-right tabular-nums">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deployment options checklist */}
                  <div className="border-t border-[#EAEAEA] pt-[16px] space-y-[10px]">
                    <p className="text-[12px] font-bold uppercase tracking-wider text-[#737373]">
                      Opsi Implementasi Terverifikasi
                    </p>
                    <ul className="space-y-[8px]">
                      {activePillar.deploymentOptions.map((opt) => (
                        <li key={opt} className="flex items-center gap-[10px] text-[13.5px] text-[#333333]">
                          <Check className="w-4 h-4 text-[#E7621B] shrink-0" aria-hidden="true" />
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-[16px] border-t border-[#EAEAEA]">
                  <button
                    type="button"
                    onClick={() => onSelectSolutionForConsultation(activePillar.title)}
                    className="w-full py-[13px] px-[24px] min-h-[44px] rounded-lg vox-cta-gradient text-white text-[14px] font-semibold inline-flex items-center justify-center gap-[8px] transition-all duration-200 whitespace-nowrap cursor-pointer hover:opacity-95 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
                  >
                    <span>Diskusikan Solusi Ini</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            VARIASI 2: TABBED SHOWCASE WITH TOPOLOGY PREVIEW
            ======================================================== */}
        {activeVariation === 'tabbed' && (
          <div className="space-y-[28px] transition-opacity duration-200">
            {/* Horizontal Segmented Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[8px] bg-[#F5F5F5] p-[6px] rounded-2xl border border-[#E5E5E5]">
              {SOLUTION_PILLARS.map((pillar) => {
                const isActive = pillar.id === activePillarId;
                const IconComp = PILLAR_ICONS[pillar.id];
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => handlePillarSelect(pillar.id)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-[12px] p-[12px] sm:p-[16px] rounded-xl text-left transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-white shadow-xs text-[#1A1A1A] border border-[#E0E0E0]'
                        : 'text-[#595959] hover:text-[#1A1A1A] hover:bg-black/[0.02]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? 'bg-[#E7621B] text-white' : 'bg-[#EBEBEB] text-[#595959]'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] text-[#B84408] font-semibold tabular-nums">
                        {pillar.number}.
                      </div>
                      <div className="text-[13px] sm:text-[14px] font-bold leading-tight truncate">
                        {pillar.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stage Showcase: 2-Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-[24px] sm:p-[36px]">
              {/* Left Column: Solution Detail & Specs Grid (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-[24px]">
                <div className="space-y-[20px]">
                  <div className="space-y-[8px]">
                    <div className="inline-flex items-center gap-2 text-[12px] font-mono text-[#B84408] font-semibold">
                      <span>SOLUSI REKOMENDASI #{activePillar.number}</span>
                      <span>·</span>
                      <span className="text-[#595959] font-sans font-medium">
                        {PILLAR_TARGETS[activePillar.id]}
                      </span>
                    </div>
                    <h3 className="font-display text-[24px] sm:text-[28px] font-bold text-[#1A1A1A] leading-[1.2]">
                      {activePillar.title}
                    </h3>
                    <p className="text-[14.5px] text-[#4A4A4A] leading-[1.6]">
                      {activePillar.summary}
                    </p>
                  </div>

                  {/* Architecture Highlight Box */}
                  <div className="p-[16px] rounded-xl bg-white border border-[#E5E5E5] space-y-[6px]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#737373]">
                      Keunggulan Arsitektur Sistem
                    </div>
                    <p className="text-[13.5px] text-[#1A1A1A] font-medium leading-[1.5]">
                      {activePillar.architectureHighlight}
                    </p>
                  </div>

                  {/* 2x2 Specs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-[12px]">
                    {activePillar.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="bg-white border border-[#EAEAEA] rounded-xl p-[14px] space-y-[4px]"
                      >
                        <div className="text-[11px] font-medium text-[#737373]">
                          {spec.label}
                        </div>
                        <div className="text-[13px] font-bold text-[#1A1A1A] tabular-nums">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-[16px] border-t border-[#EAEAEA] flex flex-wrap items-center justify-between gap-[16px]">
                  <div className="text-[12px] text-[#595959] space-x-1">
                    <span className="font-semibold text-[#1A1A1A]">Penerapan:</span>
                    <span>{activePillar.deploymentOptions.join(' · ')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectSolutionForConsultation(activePillar.title)}
                    className="py-[11px] px-[22px] min-h-[44px] rounded-lg vox-cta-gradient text-white text-[13.5px] font-semibold inline-flex items-center gap-[8px] cursor-pointer hover:opacity-95 shadow-xs"
                  >
                    <span>Ajukan Konsultasi Solusi Ini</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Interconnect Topology Diagram (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-[#E5E5E5] rounded-xl p-[20px] flex flex-col justify-between gap-[16px]">
                <div className="space-y-[14px]">
                  <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-[10px]">
                    <div className="flex items-center gap-[8px]">
                      <Activity className="w-4 h-4 text-[#E7621B]" />
                      <span className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-wide">
                        Topologi Alur Interkoneksi
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#00875A] font-semibold">
                      SLA: 99.99%
                    </span>
                  </div>

                  {/* Flow Diagram Stack */}
                  <div className="space-y-[10px]">
                    {/* Layer 1 */}
                    <div className="p-[12px] rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-mono text-[#8C8C8C] font-medium">LAYER 1 · SISI KLIEN</div>
                        <div className="text-[13px] font-bold text-[#1A1A1A]">Platform / CRM / Agent Core</div>
                      </div>
                      <span className="text-[11px] font-mono bg-[#EBEBEB] text-[#525252] px-2 py-0.5 rounded">
                        REST / SIP
                      </span>
                    </div>

                    <div className="flex justify-center -my-1 text-[#C7C7C7]">
                      ↓
                    </div>

                    {/* Layer 2 */}
                    <div className="p-[12px] rounded-lg bg-[#FFF8F5] border border-[#E7621B]/40 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-mono text-[#B84408] font-bold">LAYER 2 · VOXNET CORE</div>
                        <div className="text-[13px] font-bold text-[#1A1A1A]">Dual-Active SBC & Firewall</div>
                      </div>
                      <span className="text-[11px] font-mono bg-[#E7621B] text-white px-2 py-0.5 rounded">
                        Whitelisted IP
                      </span>
                    </div>

                    <div className="flex justify-center -my-1 text-[#C7C7C7]">
                      ↓
                    </div>

                    {/* Layer 3 */}
                    <div className="p-[12px] rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-mono text-[#8C8C8C] font-medium">LAYER 3 · JARINGAN TELKO</div>
                        <div className="text-[13px] font-bold text-[#1A1A1A]">Backbone 22 Kota & PSTN Nasional</div>
                      </div>
                      <span className="text-[11px] font-mono bg-[#EBEBEB] text-[#525252] px-2 py-0.5 rounded">
                        Kominfo Certified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Network Metrics Strip */}
                <div className="pt-[14px] border-t border-[#F0F0F0] grid grid-cols-2 gap-[10px] text-center">
                  <div className="p-[8px] bg-[#F5F5F5] rounded-lg">
                    <div className="text-[11px] text-[#737373]">Rute Domestik</div>
                    <div className="text-[14px] font-mono font-bold text-[#1A1A1A] tabular-nums">&lt; 20 ms</div>
                  </div>
                  <div className="p-[8px] bg-[#F5F5F5] rounded-lg">
                    <div className="text-[11px] text-[#737373]">Failover SBC</div>
                    <div className="text-[14px] font-mono font-bold text-[#00875A] tabular-nums">Otomatis</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick KPI Bar for Variation 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[16px] pt-[8px]">
              <div className="p-[16px] rounded-xl border border-[#EBEBEB] bg-white">
                <div className="text-[20px] font-bold font-mono text-[#1A1A1A] tabular-nums">99.99%</div>
                <div className="text-[12px] text-[#595959]">Jaminan SLA Uptime Suara</div>
              </div>
              <div className="p-[16px] rounded-xl border border-[#EBEBEB] bg-white">
                <div className="text-[20px] font-bold font-mono text-[#1A1A1A] tabular-nums">10.000+</div>
                <div className="text-[12px] text-[#595959]">Kanal Konkuren Simultan</div>
              </div>
              <div className="p-[16px] rounded-xl border border-[#EBEBEB] bg-white">
                <div className="text-[20px] font-bold font-mono text-[#1A1A1A] tabular-nums">22 Kota</div>
                <div className="text-[12px] text-[#595959]">Cakupan Area Lokal Resmi</div>
              </div>
              <div className="p-[16px] rounded-xl border border-[#EBEBEB] bg-white">
                <div className="text-[20px] font-bold font-mono text-[#1A1A1A] tabular-nums">24/7/365</div>
                <div className="text-[12px] text-[#595959]">Dukungan NOC & Pemeliharaan</div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            VARIASI 3: MODULAR COMPARISON MATRIX (4 Columns Grid)
            ======================================================== */}
        {activeVariation === 'matrix' && (
          <div className="space-y-[32px] transition-opacity duration-200">
            {/* 4 Cards Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
              {SOLUTION_PILLARS.map((pillar) => {
                const IconComp = PILLAR_ICONS[pillar.id];
                const isSelected = pillar.id === activePillarId;
                return (
                  <div
                    key={pillar.id}
                    className={`rounded-2xl p-[22px] border flex flex-col justify-between gap-[20px] transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#FFF8F5] border-[#E7621B] shadow-xs ring-1 ring-[#E7621B]/40'
                        : 'bg-white border-[#EBEBEB] hover:border-[#C7C7C7] hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-[14px]">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#E7621B] text-white' : 'bg-[#F5F5F5] text-[#525252]'
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-[13px] font-bold text-[#B84408] tabular-nums">
                          {pillar.number}
                        </span>
                      </div>

                      <div className="space-y-[6px]">
                        <h3 className="font-display text-[17px] font-bold text-[#1A1A1A] leading-snug">
                          {pillar.title}
                        </h3>
                        <p className="text-[12.5px] text-[#595959] leading-[1.5]">
                          {pillar.summary}
                        </p>
                      </div>

                      <div className="pt-[12px] border-t border-[#F0F0F0] space-y-[6px]">
                        <span className="text-[11px] font-semibold text-[#8C8C8C] uppercase tracking-wide">
                          Spesifikasi Utama:
                        </span>
                        <ul className="space-y-[4px]">
                          {pillar.specs.slice(0, 2).map((s) => (
                            <li key={s.label} className="text-[12px] text-[#333] flex items-center gap-[6px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00875A] shrink-0" />
                              <span className="truncate">{s.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-[14px] border-t border-[#EBEBEB] space-y-[8px]">
                      <button
                        type="button"
                        onClick={() => {
                          handlePillarSelect(pillar.id);
                          onSelectSolutionForConsultation(pillar.title);
                        }}
                        className={`w-full py-[10px] px-[16px] min-h-[40px] rounded-lg text-[13px] font-semibold inline-flex items-center justify-center gap-[6px] transition-colors cursor-pointer ${
                          isSelected
                            ? 'vox-cta-gradient text-white'
                            : 'bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#1A1A1A]'
                        }`}
                      >
                        <span>Pilih Solusi Ini</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expandable Side-by-Side Comparison Matrix */}
            <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl overflow-hidden">
              <div className="p-[20px] sm:p-[24px] flex items-center justify-between border-b border-[#EBEBEB] bg-white">
                <div className="space-y-[2px]">
                  <h4 className="font-display text-[17px] font-bold text-[#1A1A1A]">
                    Matriks Perbandingan Kapabilitas Arsitektur
                  </h4>
                  <p className="text-[13px] text-[#595959]">
                    Komparasi langsung parameter teknis, skalabilitas, dan integrasi antar pilar Voxnet.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFullMatrix((prev) => !prev)}
                  className="inline-flex items-center gap-[6px] text-[13px] font-semibold text-[#B84408] hover:text-[#9A3412] cursor-pointer"
                >
                  <span>{showFullMatrix ? 'Sembunyikan Matriks' : 'Buka Matriks'}</span>
                  {showFullMatrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {showFullMatrix && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b border-[#EBEBEB] bg-[#F7F7F7]">
                        <th className="py-[12px] px-[20px] font-bold text-[#1A1A1A] w-[200px]">
                          Parameter
                        </th>
                        <th className="py-[12px] px-[16px] font-bold text-[#1A1A1A]">
                          01. PBX Fleksibel
                        </th>
                        <th className="py-[12px] px-[16px] font-bold text-[#1A1A1A]">
                          02. SIP Trunk Masif
                        </th>
                        <th className="py-[12px] px-[16px] font-bold text-[#1A1A1A]">
                          03. Penomoran 22 Kota
                        </th>
                        <th className="py-[12px] px-[16px] font-bold text-[#1A1A1A]">
                          04. Managed Services
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBEBEB]">
                      {COMPARISON_ROWS.map((row) => (
                        <tr key={row.feature} className="hover:bg-white transition-colors">
                          <td className="py-[12px] px-[20px] font-semibold text-[#1A1A1A]">
                            {row.feature}
                          </td>
                          <td className="py-[12px] px-[16px] text-[#4A4A4A]">{row.pbx}</td>
                          <td className="py-[12px] px-[16px] text-[#4A4A4A]">{row['sip-trunk']}</td>
                          <td className="py-[12px] px-[16px] text-[#4A4A4A]">{row.numbering}</td>
                          <td className="py-[12px] px-[16px] text-[#4A4A4A]">{row['managed-services']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            INTERACTIVE 22-CITY COVERAGE DIRECTORY (Shared Anchor)
            ======================================================== */}
        <div className="mt-[36px] bg-[#F8F9FA] border border-[#EBEBEB] rounded-[16px] p-[24px] lg:p-[36px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-[20px]">
            <div className="space-y-[6px]">
              <div className="flex items-center gap-[8px]">
                <Hash className="w-4 h-4 text-[#B84408]" />
                <h3 className="font-display text-[19px] sm:text-[21px] font-bold text-[#1A1A1A] leading-[1.272]">
                  Direktori Penomoran Resmi 22 Kota & Nomor 1500 / 0800
                </h3>
              </div>
              <p className="text-[13.5px] text-[#525252] leading-[1.6]">
                Cek kode area lokal yang siap diaktifkan untuk kehadiran bisnis regional perusahaan Anda.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCityExplorer((prev) => !prev)}
              aria-expanded={showCityExplorer}
              aria-controls="voxnet-city-directory"
              className="inline-flex items-center justify-center px-[22px] py-[11px] min-h-[44px] rounded-lg bg-white border border-[#EBEBEB] hover:border-[#1A1A1A] text-[13.5px] font-semibold text-[#1A1A1A] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
            >
              {showCityExplorer ? 'Tutup Direktori Kota' : 'Buka Daftar 22 Kota'}
            </button>
          </div>

          {showCityExplorer && (
            <div id="voxnet-city-directory" className="mt-[24px] pt-[24px] border-t border-[#EBEBEB] space-y-[22px]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[16px]">
                <div className="flex flex-wrap items-center gap-[8px]" role="group" aria-label="Filter wilayah Indonesia">
                  {REGIONS.map((region) => {
                    const selected = selectedRegion === region;
                    return (
                      <button
                        key={region}
                        type="button"
                        onClick={() => setSelectedRegion(region)}
                        className={`px-[14px] py-[8px] rounded-lg text-[12.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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
                    className="w-full pl-[42px] pr-[16px] py-[9px] min-h-[42px] bg-white border border-[#EBEBEB] rounded-lg text-[13.5px] text-[#1A1A1A] placeholder:text-[#737373] focus:outline-none focus:border-[#E7621B]"
                  />
                </div>
              </div>

              {filteredCities.length === 0 ? (
                <div className="bg-white border border-[#EBEBEB] rounded-[12px] p-[24px] text-center">
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
                      className="bg-white border border-[#EBEBEB] rounded-[12px] p-[14px] flex flex-col justify-between gap-[4px] hover:border-[#C7C7C7] transition-colors"
                    >
                      <span className="font-mono text-[12.5px] font-semibold text-[#B84408] tabular-nums">
                        ({item.areaCode})
                      </span>
                      <span className="font-display text-[14.5px] font-bold text-[#1A1A1A]">
                        {item.city}
                      </span>
                      <span className="text-[11.5px] text-[#525252]">{item.province}</span>
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
