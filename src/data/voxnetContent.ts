export interface SolutionPillar {
  id: 'pbx' | 'sip-trunk' | 'numbering' | 'managed-services';
  number: string;
  title: string;
  summary: string;
  deploymentOptions: string[];
  architectureHighlight: string;
  specs: Array<{ label: string; value: string }>;
}

export interface CompetitiveAdvantage {
  number: string;
  title: string;
  description: string;
  evidenceTag: string;
}

export interface UseCaseProfile {
  id: 'bpo' | 'saas-ai' | 'global-telco';
  label: string;
  headline: string;
  description: string;
  recommendedPbx: 'cloud' | 'on-prem' | 'hybrid';
  recommendedNumbering: 'local-22' | '1500' | '0800';
  defaultDailyCalls: number;
  architectureNotes: string[];
  deliverables: string[];
}

export interface CoverageCity {
  city: string;
  areaCode: string;
  region: 'Jawa' | 'Sumatera' | 'Kalimantan' | 'Sulawesi' | 'Bali & Nusa Tenggara';
  province: string;
}

export const HERO_CONTENT = {
  eyebrow: 'Mitra Infrastruktur Komunikasi Bisnis & CPaaS',
  headline: 'Kelola Ribuan Panggilan Setiap Hari Tanpa Takut Sistem Tumbang',
  subheadline:
    'Solusi Telefoni dan SIP Trunk berkapasitas tinggi untuk kelancaran komunikasi perusahaan Anda. Mudah diintegrasikan, skalabel, dan patuh penuh terhadap regulasi Indonesia.',
  primaryCta: 'Jadwalkan Sesi Diskusi',
  secondaryCta: 'Pelajari Solusi Kami',
  trustItems: [
    'Jasa Call Center',
    'Penyelenggara Sistem Elektronik',
    'Internet Service Provider',
  ],
};

export const PROBLEM_CONTENT = {
  headline: 'Operasional Terhambat karena Kualitas Suara Tidak Stabil?',
  body: 'Panggilan pelanggan yang terputus, integrasi sistem yang rumit, dan celah keamanan data kerap menghambat kinerja tim Anda—terlebih jika infrastruktur belum memenuhi regulasi resmi. Voxnet membantu Anda membangun fondasi komunikasi yang stabil, aman, dan siap diaudit sejak hari pertama.',
  painPoints: [
    {
      number: '01',
      title: 'Trafik Padat Memicu Call Drop',
      detail: 'Lonjakan panggilan di jam sibuk membuat antrean macet hingga audio terputus.',
      imageAlt: 'Meja operasi contact center enterprise dengan telepon IP dan headset di ruang kantor modern',
      fallbackTitle: 'Stabilitas Trafik Suara Enterprise',
    },
    {
      number: '02',
      title: 'Integrasi Platform Masih Terpisah',
      detail: 'Koneksi CRM, Omnichannel, atau Voicebot ke jalur telko lokal sering memakan waktu.',
      imageAlt: 'Perangkat gateway jaringan fiber optik putih dengan kabel patch oranye di ruang server kaca',
      fallbackTitle: 'Interkoneksi Gateway & API Terbuka',
    },
    {
      number: '03',
      title: 'Risiko Kepatuhan & Kebocoran Data',
      detail: 'Sistem tanpa izin Kominfo serta proteksi lemah rentan terkena sanksi dan kebocoran.',
      imageAlt: 'Koridor keamanan ruang server enterprise dengan kontrol akses biometrik dan dinding kaca buram',
      fallbackTitle: 'Keamanan & Kepatuhan Regulasi Kominfo',
    },
  ],
};

export const SOLUTION_PILLARS: SolutionPillar[] = [
  {
    id: 'pbx',
    number: '01',
    title: 'PBX Fleksibel Sesuai Kebutuhan',
    summary:
      'Terapkan sistem PBX berbasis Cloud, On-Premises, maupun Hybrid (perangkat lunak atau keras) sesuai topologi dan anggaran tim Anda.',
    deploymentOptions: ['Cloud PBX Multi-Tenant', 'On-Premises Appliance', 'Hybrid Software PBX'],
    architectureHighlight: 'Fleksibilitas topologi penuh tanpa penguncian vendor hardware atau skema lisensi kaku.',
    specs: [
      { label: 'Model Penerapan', value: 'Cloud / On-Premises / Hybrid' },
      { label: 'Skalabilitas Ekstensi', value: '50 hingga 10.000+ agen aktif' },
      { label: 'Integrasi CRM & API', value: 'REST Webhook & SIPREC siap pakai' },
    ],
  },
  {
    id: 'sip-trunk',
    number: '02',
    title: 'SIP Trunk Berkapasitas Tinggi',
    summary:
      'Hubungkan Contact Center, aplikasi, maupun Voicebot ke jaringan suara dua arah yang stabil, lengkap dengan proteksi IP Whitelisting.',
    deploymentOptions: ['Dedicated SBC Interconnect', 'TLS & SRTP Encryption', 'Strict IP Whitelisting'],
    architectureHighlight: 'Jalur dua arah simetris dengan failover otomatis multi-rute untuk trafik enterprise volume tinggi.',
    specs: [
      { label: 'Kapasitas Trafik', value: 'Ribuan kanal konkuren per node' },
      { label: 'Keamanan Akses', value: 'IP Whitelisting & Firewall SBC' },
      { label: 'Kualitas Audio', value: 'G.711 / Opus HD Voice routing' },
    ],
  },
  {
    id: 'numbering',
    number: '03',
    title: 'Penomoran Resmi Seluruh Indonesia',
    summary:
      'Bangun kredibilitas bisnis dengan nomor lokal resmi di 22 kota besar Indonesia, hingga nomor korporat 1500 dan bebas pulsa 0800.',
    deploymentOptions: ['Nomor Lokal 22 Kota', 'Access Number 1500', 'Toll-Free 0800'],
    architectureHighlight: 'Seluruh penomoran terdaftar legal melalui perizinan resmi operator di Indonesia.',
    specs: [
      { label: 'Cakupan Area Lokal', value: '22 Kota Besar Indonesia' },
      { label: 'Nomor Korporat Nasional', value: '1500 (5–6 Digit) & 0800' },
      { label: 'Kepatuhan Identitas', value: 'Caller ID terverifikasi operator' },
    ],
  },
  {
    id: 'managed-services',
    number: '04',
    title: 'Managed Services Terpadu',
    summary:
      'Percayakan pemeliharaan SIP Trunk, perekaman suara terpusat, dan proteksi kebocoran data (DLP) pada tim kami untuk pemantauan operasional satu pintu.',
    deploymentOptions: ['Pemeliharaan Jaringan 24/7', 'Centralized Voice Recording', 'Data Loss Prevention (DLP)'],
    architectureHighlight: 'Tim teknis terdedikasi memantau stabilitas, enkripsi rekaman suara, dan kepatuhan DLP dari satu pintu.',
    specs: [
      { label: 'Rekam Percakapan', value: 'Arsip terenkripsi & retensi terkelola' },
      { label: 'Proteksi Data', value: 'Kebijakan DLP & kontrol akses peran' },
      { label: 'Pemeliharaan Harian', value: 'Tim Engineering NOC 24/7 Terpusat' },
    ],
  },
];

export const COMPETITIVE_EDGES: CompetitiveAdvantage[] = [
  {
    number: '01',
    title: 'Netral dan Siap Integrasi',
    description:
      'Sebagai penyedia infrastruktur back-end murni, layanan Voxnet mudah dihubungkan ke platform Omnichannel maupun CRM pilihan Anda tanpa benturan kepentingan.',
    evidenceTag: 'Back-End Agnostik · Bebas Konflik CRM/Omnichannel',
  },
  {
    number: '02',
    title: 'Patuh Regulasi Operasional',
    description:
      'Didukung perizinan lengkap Kominfo RI (JCC, PSE, dan ISP), memastikan seluruh operasional komunikasi Anda berjalan aman sesuai regulasi nasional.',
    evidenceTag: 'Kominfo Resmi · JCC · PSE · ISP',
  },
  {
    number: '03',
    title: 'Jaminan Layanan Kritis',
    description:
      'Dirancang khusus untuk menopang trafik percakapan volume tinggi secara stabil bagi operasional Contact Center maupun BPO berskala besar.',
    evidenceTag: 'SBC Redundancy · Trafik Jutaan Menit',
  },
];

export const USE_CASES: UseCaseProfile[] = [
  {
    id: 'bpo',
    label: 'Call Center & BPO',
    headline: 'Kapasitas Interkoneksi SBC untuk Operasi Contact Center Skala Besar',
    description:
      'Tangani jutaan menit trafik percakapan secara lancar dengan dukungan interkoneksi Session Border Controller (SBC) yang sangat stabil.',
    recommendedPbx: 'hybrid',
    recommendedNumbering: '1500',
    defaultDailyCalls: 35000,
    architectureNotes: [
      'Interkoneksi langsung ke SBC aktif-aktif dengan pemisahan trafik inbound & outbound',
      'Dukungan rekaman suara terpusat serta proteksi cegah bocor data (DLP) untuk agen BPO',
      'Kompatibel penuh dengan platform dialer, Omnichannel, dan CRM perusahaan',
    ],
    deliverables: ['SIP Trunk Multi-Node', 'Nomor 1500 / 0800', 'Voice Recording & DLP'],
  },
  {
    id: 'saas-ai',
    label: 'Perusahaan SaaS & Voice AI',
    headline: 'Jembatan Terminasi Suara Lokal untuk Aplikasi dan Voicebot Modern',
    description:
      'Hubungkan aplikasi SaaS atau Voicebot AI Anda ke nomor resmi Indonesia dengan rute terminasi suara berlatensi rendah dan skalabilitas elastis.',
    recommendedPbx: 'cloud',
    recommendedNumbering: 'local-22',
    defaultDailyCalls: 12000,
    architectureNotes: [
      'Routing SIP dua arah latensi rendah untuk stream audio real-time ke engine Voice AI',
      'Penyediaan nomor lokal resmi di 22 kota untuk identitas panggilan bisnis yang terpercaya',
      'Keamanan IP Whitelisting dan autentikasi klaster cloud yang rapi untuk tim developer',
    ],
    deliverables: ['Elastic Cloud SIP Trunk', 'Nomor Lokal 22 Kota', 'API & Webhook Routing'],
  },
  {
    id: 'global-telco',
    label: 'Mitra Telekomunikasi Global',
    headline: 'Akses Infrastruktur Legal & Penomoran Lokal untuk Ekspansi Indonesia',
    description:
      'Dapatkan dukungan kepatuhan regulasi, interkoneksi POP lokal Jakarta, dan alokasi penomoran resmi untuk ekspansi klien global ke Indonesia.',
    recommendedPbx: 'on-prem',
    recommendedNumbering: '0800',
    defaultDailyCalls: 50000,
    architectureNotes: [
      'Kepatuhan penuh terhadap lisensi Kominfo (Jasa Call Center, PSE, dan ISP) tanpa hambatan birokrasi lokal',
      'Interkoneksi carrier-grade ke titik POP Jakarta untuk terminasi klien multinasional',
      'Alokasi nomor lokal 22 kota serta akses 1500/0800 untuk perusahaan multinasional',
    ],
    deliverables: ['Carrier SBC Interconnect', 'Kepatuhan Regulasi Kominfo', 'Penomoran Multi-Kota'],
  },
];

export const COVERAGE_CITIES: CoverageCity[] = [
  { city: 'Jakarta', areaCode: '021', region: 'Jawa', province: 'DKI Jakarta' },
  { city: 'Bogor', areaCode: '0251', region: 'Jawa', province: 'Jawa Barat' },
  { city: 'Tangerang', areaCode: '021', region: 'Jawa', province: 'Banten' },
  { city: 'Bekasi', areaCode: '021', region: 'Jawa', province: 'Jawa Barat' },
  { city: 'Bandung', areaCode: '022', region: 'Jawa', province: 'Jawa Barat' },
  { city: 'Cirebon', areaCode: '0231', region: 'Jawa', province: 'Jawa Barat' },
  { city: 'Semarang', areaCode: '024', region: 'Jawa', province: 'Jawa Tengah' },
  { city: 'Solo', areaCode: '0271', region: 'Jawa', province: 'Jawa Tengah' },
  { city: 'Yogyakarta', areaCode: '0274', region: 'Jawa', province: 'DI Yogyakarta' },
  { city: 'Surabaya', areaCode: '031', region: 'Jawa', province: 'Jawa Timur' },
  { city: 'Malang', areaCode: '0341', region: 'Jawa', province: 'Jawa Timur' },
  { city: 'Medan', areaCode: '061', region: 'Sumatera', province: 'Sumatera Utara' },
  { city: 'Batam', areaCode: '0778', region: 'Sumatera', province: 'Kepulauan Riau' },
  { city: 'Pekanbaru', areaCode: '0761', region: 'Sumatera', province: 'Riau' },
  { city: 'Padang', areaCode: '0751', region: 'Sumatera', province: 'Sumatera Barat' },
  { city: 'Palembang', areaCode: '0711', region: 'Sumatera', province: 'Sumatera Selatan' },
  { city: 'Bandar Lampung', areaCode: '0721', region: 'Sumatera', province: 'Lampung' },
  { city: 'Denpasar', areaCode: '0361', region: 'Bali & Nusa Tenggara', province: 'Bali' },
  { city: 'Balikpapan', areaCode: '0542', region: 'Kalimantan', province: 'Kalimantan Timur' },
  { city: 'Banjarmasin', areaCode: '0511', region: 'Kalimantan', province: 'Kalimantan Selatan' },
  { city: 'Pontianak', areaCode: '0561', region: 'Kalimantan', province: 'Kalimantan Barat' },
  { city: 'Makassar', areaCode: '0411', region: 'Sulawesi', province: 'Sulawesi Selatan' },
];

export const CREDIBILITY_CONTENT = {
  headline: 'Mendukung Pertumbuhan Bisnis Melalui Komunikasi',
  body: 'Selama lebih dari 10 tahun, PT Lima Satu Tiga Global Tel-Access (Voxnet) dipercaya berbagai lini enterprise di Indonesia untuk menghadirkan layanan cloud telephony dan perpesanan bisnis yang andal serta berdampak nyata.',
  tagline: 'Connecting People. Empowering Business. Enabling Growth.',
  brandIdentity: {
    legalEntity: 'PT Lima Satu Tiga Global Tel-Access (Voxnet)',
    vision: 'To be a leading communications service-enabling platform provider in Indonesia.',
    mission: 'To provide a cloud-based telephony and messaging platform for business communication.',
    primaryTagline: 'Just Call. Clearer, Closer.',
    supportingMessages: [
      'Everytime. Everywhere.',
      'Future freedom of communication is here.',
    ],
  },
  licenses: [
    {
      code: 'JCC',
      name: 'Berlisensi Penyelenggara Jasa Call Center',
      issuer: 'Kominfo RI',
      scope: 'Legalitas resmi operasional layanan pusat panggilan enterprise berkapasitas tinggi.',
    },
    {
      code: 'PSE',
      name: 'Berlisensi Penyelenggara Sistem Elektronik',
      issuer: 'Kominfo RI',
      scope: 'Kepatuhan sistem elektronik dan pengelolaan data suara di yurisdiksi Indonesia.',
    },
    {
      code: 'ISP',
      name: 'Berlisensi Penyelenggara Internet Service Provider',
      issuer: 'Kominfo RI',
      scope: 'Izin penyelenggaraan akses internet dan interkoneksi jaringan terdedikasi.',
    },
  ],
};

export const CONVERSION_CONTENT = {
  headline: 'Siap Perkuat Infrastruktur Komunikasi Perusahaan Anda?',
  body: 'Jangan biarkan gangguan kualitas suara menghambat layanan pelanggan Anda. Diskusikan kebutuhan kapasitas dan topologi komunikasi perusahaan bersama tim konsultan teknis kami.',
  ctaLabel: 'Bicara dengan Tim Solusi Kami',
  microcopy: 'Tim ahli kami akan merespons permintaan Anda dalam 1x24 jam kerja.',
};

export interface ClientPartner {
  id: string;
  name: string;
  shortName: string;
  category: 'banking' | 'bpo' | 'tech' | 'logistics';
  categoryLabel: string;
  useCase: string;
  highlight: string;
}

export const CLIENT_PARTNERS: ClientPartner[] = [
  {
    id: 'bca',
    name: 'Bank Central Asia',
    shortName: 'BCA',
    category: 'banking',
    categoryLabel: 'Perbankan & Finansial',
    useCase: 'Dedicated SIP Trunk & Nomor Korporat 1500',
    highlight: 'Kanal redundan SLA 99.98%',
  },
  {
    id: 'mandiri',
    name: 'Bank Mandiri',
    shortName: 'Mandiri',
    category: 'banking',
    categoryLabel: 'Perbankan & Finansial',
    useCase: 'Interkoneksi SBC Ganda & Penomoran Resmi',
    highlight: 'Failover otomatis multi-rute',
  },
  {
    id: 'infomedia',
    name: 'Infomedia Nusantara',
    shortName: 'Infomedia',
    category: 'bpo',
    categoryLabel: 'BPO & Contact Center',
    useCase: 'Ribuan Kanal Konkuren untuk BPO Skala Besar',
    highlight: 'Jalur simetris trafik padat',
  },
  {
    id: 'vads',
    name: 'VADS Indonesia',
    shortName: 'VADS',
    category: 'bpo',
    categoryLabel: 'BPO & Contact Center',
    useCase: 'Centralized Voice Recording & Proteksi DLP',
    highlight: 'Audit & kepatuhan penuh',
  },
  {
    id: 'transcosmos',
    name: 'Transcosmos Indonesia',
    shortName: 'Transcosmos',
    category: 'bpo',
    categoryLabel: 'BPO & Contact Center',
    useCase: 'Hybrid PBX & Dedicated Trunking Antar Cabang',
    highlight: 'Zero-downtime transition',
  },
  {
    id: 'tokopedia',
    name: 'Tokopedia',
    shortName: 'Tokopedia',
    category: 'tech',
    categoryLabel: 'E-commerce & Platform',
    useCase: 'Elastic SIP API & Penomoran Lokal 22 Kota',
    highlight: 'Rute latensi ultra-rendah',
  },
  {
    id: 'gojek',
    name: 'Gojek',
    shortName: 'Gojek',
    category: 'tech',
    categoryLabel: 'Ekosistem Digital',
    useCase: 'Low-Latency SIP Routing Dua Arah',
    highlight: 'Jutaan panggilan customer care',
  },
  {
    id: 'traveloka',
    name: 'Traveloka',
    shortName: 'Traveloka',
    category: 'tech',
    categoryLabel: 'Layanan Digital & Travel',
    useCase: 'Nomor Toll-Free 0800 & 1500 Korporat',
    highlight: 'Identitas caller ID terverifikasi',
  },
  {
    id: 'halodoc',
    name: 'Halodoc',
    shortName: 'Halodoc',
    category: 'tech',
    categoryLabel: 'Telehealth & Konsultasi',
    useCase: 'High-Availability 24/7 Telephony Hotline',
    highlight: 'Routing medis prioritas tinggi',
  },
  {
    id: 'jnt',
    name: 'J&T Express',
    shortName: 'J&T Express',
    category: 'logistics',
    categoryLabel: 'Logistik & Distribusi',
    useCase: 'Nomor Kontak Nasional & Gateway Pusat',
    highlight: 'Interkoneksi ratusan hub logistik',
  },
  {
    id: 'sicepat',
    name: 'SiCepat Ekspres',
    shortName: 'SiCepat',
    category: 'logistics',
    categoryLabel: 'Logistik & Kurir',
    useCase: 'Cloud PBX & Dispatch Dispatcher Hotline',
    highlight: 'Monitoring terpusat 24/7',
  },
  {
    id: 'astra',
    name: 'Astra International',
    shortName: 'Astra',
    category: 'logistics',
    categoryLabel: 'Konglomerasi & Otomotif',
    useCase: 'Infrastruktur Dedicated Gateway Call Center',
    highlight: 'Integrasi CRM & multi-brand',
  },
];

