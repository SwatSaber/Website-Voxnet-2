import { CoverageCity } from '../data/voxnetContent';

export type SectorId = 'bpo' | 'saas-ai' | 'global-telco';
export type PbxMode = 'cloud' | 'on-prem' | 'hybrid';
export type NumberingMode = 'local-22' | '1500' | '0800';

export interface SizingInput {
  sector: SectorId;
  dailyCalls: number;
  pbxMode: PbxMode;
  numbering: NumberingMode;
}

export interface SizingRecommendation {
  recommendedChannels: number;
  sbcTopology: string;
  pbxLabel: string;
  numberingLabel: string;
  securityLayer: string;
  summaryText: string;
}

export interface ConsultationFormData {
  fullName: string;
  companyName: string;
  corporateEmail: string;
  phoneNumber: string;
  primaryNeed: string;
  technicalNotes: string;
}

export interface ConsultationFormErrors {
  fullName?: string;
  companyName?: string;
  corporateEmail?: string;
  phoneNumber?: string;
  primaryNeed?: string;
}

const PBX_LABELS: Record<PbxMode, string> = {
  cloud: 'Cloud PBX Multi-Region',
  'on-prem': 'On-Premises PBX Terdedikasi',
  hybrid: 'Hybrid PBX (Cloud + On-Premises)',
};

const NUMBERING_LABELS: Record<NumberingMode, string> = {
  'local-22': 'Nomor Lokal Resmi (22 Kota)',
  '1500': 'Nomor Pusat Panggilan 1500',
  '0800': 'Nomor Bebas Pulsa 0800',
};

export function calculateInfrastructureRecommendation(input: SizingInput): SizingRecommendation {
  const safeCalls = Math.max(500, Math.min(250000, Math.round(input.dailyCalls)));

  // Calculate peak concurrent SIP channels using conservative 3.5-minute average handle time
  // concentrated into an 8-hour business window with 2.4x peak-hour burst buffer and minimum 30-channel block.
  const callsPerHourAvg = safeCalls / 8;
  const peakCallsPerHour = callsPerHourAvg * 2.4;
  const erlangLoad = (peakCallsPerHour * 3.5) / 60;
  const rawChannels = Math.ceil((erlangLoad * 1.25) / 10) * 10;
  const recommendedChannels = Math.max(30, rawChannels);

  const sbcTopology =
    recommendedChannels >= 250 || input.sector === 'bpo' || input.sector === 'global-telco'
      ? 'Active-Active Geo-Redundant SBC'
      : 'Dual-Node High-Availability SBC';

  const securityLayer =
    input.sector === 'bpo'
      ? 'IP Whitelisting + Enkripsi TLS/SRTP + DLP Suara'
      : 'IP Whitelisting + Proteksi Firewall SBC';

  const pbxLabel = PBX_LABELS[input.pbxMode];
  const numberingLabel = NUMBERING_LABELS[input.numbering];

  const summaryText = `Estimasi kebutuhan: ~${recommendedChannels} kanal SIP konkuren (${safeCalls.toLocaleString('id-ID')} panggilan/hari) dengan arsitektur ${pbxLabel}, ${sbcTopology}, dan ${numberingLabel}.`;

  return {
    recommendedChannels,
    sbcTopology,
    pbxLabel,
    numberingLabel,
    securityLayer,
    summaryText,
  };
}

export function filterCoverageCities(
  cities: CoverageCity[],
  region: string,
  searchQuery: string
): CoverageCity[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return cities.filter((item) => {
    const matchesRegion = region === 'Semua' || item.region === region;
    if (!matchesRegion) return false;
    if (!normalizedQuery) return true;

    return (
      item.city.toLowerCase().includes(normalizedQuery) ||
      item.areaCode.toLowerCase().includes(normalizedQuery) ||
      item.province.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function validateConsultationForm(data: ConsultationFormData): {
  isValid: boolean;
  errors: ConsultationFormErrors;
} {
  const errors: ConsultationFormErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Mohon masukkan nama lengkap Anda.';
  }

  if (!data.companyName.trim() || data.companyName.trim().length < 2) {
    errors.companyName = 'Mohon masukkan nama perusahaan atau institusi.';
  }

  const email = data.corporateEmail.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email || !emailPattern.test(email)) {
    errors.corporateEmail = 'Mohon masukkan alamat email korporat yang valid.';
  }

  const digitsOnly = data.phoneNumber.replace(/[^0-9]/g, '');
  if (!data.phoneNumber.trim() || digitsOnly.length < 9 || digitsOnly.length > 15) {
    errors.phoneNumber = 'Mohon masukkan nomor telepon atau WhatsApp aktif (9–15 digit).';
  }

  if (!data.primaryNeed.trim()) {
    errors.primaryNeed = 'Mohon pilih fokus infrastruktur yang dibutuhkan.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
