import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Hash,
  Network,
  Search,
  Server,
  ShieldCheck,
  X,
} from 'lucide-react';
import { COVERAGE_CITIES, SOLUTION_PILLARS, SolutionPillar } from '../data/voxnetContent';
import { filterCoverageCities } from '../utils/consultationLogic';
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
  // Modal state for "Pelajari Lebih Lanjut"
  const [detailPillar, setDetailPillar] = useState<SolutionPillar | null>(null);

  // State for City Directory
  const [showCityExplorer, setShowCityExplorer] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Semua');
  const [cityQuery, setCityQuery] = useState('');

  // State for Comparison Matrix Table
  const [showFullMatrix, setShowFullMatrix] = useState(false);

  const filteredCities = useMemo(
    () => filterCoverageCities(COVERAGE_CITIES, selectedRegion, cityQuery),
    [selectedRegion, cityQuery]
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

        {/* Collapsible Architecture Comparison Matrix */}
        <div className="mt-[36px] bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl overflow-hidden">
          <div className="p-[20px] sm:p-[24px] flex items-center justify-between border-b border-[#EBEBEB] bg-white">
            <div className="space-y-[2px]">
              <h4 className="font-display text-[17px] font-bold text-[#1A1A1A]">
                Matriks Perbandingan Kapabilitas Arsitektur
              </h4>
              <p className="text-[13px] text-[#595959]">
                Komparasi langsung parameter teknis, skalabilitas, dan integrasi antar 4 pilar Voxnet.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowFullMatrix((prev) => !prev)}
              className="inline-flex items-center gap-[6px] px-3.5 py-1.5 rounded-lg border border-[#E0E0E0] bg-white text-[13px] font-semibold text-[#B84408] hover:bg-[#FFF8F5] transition-colors cursor-pointer"
            >
              <span>{showFullMatrix ? 'Sembunyikan Matriks' : 'Buka Matriks Perbandingan'}</span>
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

        {/* 22-City Numbering Directory Accordion */}
        <div className="mt-[24px] bg-[#F8F9FA] border border-[#EBEBEB] rounded-[16px] p-[24px] lg:p-[32px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-[20px]">
            <div className="space-y-[6px]">
              <div className="flex items-center gap-[8px]">
                <Hash className="w-4 h-4 text-[#B84408]" />
                <h3 className="font-display text-[19px] sm:text-[21px] font-bold text-[#1A1A1A] leading-[1.272]">
                  Direktori Penomoran Resmi 22 Kota &amp; Nomor 1500 / 0800
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
