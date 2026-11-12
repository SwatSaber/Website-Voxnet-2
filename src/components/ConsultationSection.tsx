import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CONVERSION_CONTENT } from '../data/voxnetContent';
import {
  ConsultationFormData,
  ConsultationFormErrors,
  validateConsultationForm,
} from '../utils/consultationLogic';
import { PAGE_CONTAINER_CLASS, SECTION_PADDING_Y_CLASS } from '../utils/goldenRatio';
import { VoxnetLogo } from './VoxnetLogo';
import { VoxnetSupergraphic } from './VoxnetSupergraphic';

interface ConsultationSectionProps {
  prefillNeed?: string;
  prefillNotes?: string;
}

const NEED_OPTIONS = [
  'PBX Fleksibel Sesuai Kebutuhan',
  'SIP Trunk Berkapasitas Tinggi',
  'Penomoran Resmi Seluruh Indonesia',
  'Managed Services Terpadu',
  'Solusi Call Center & BPO',
  'Terminasi Voice AI & SaaS',
];

const SESSION_EXPECTATIONS = [
  {
    number: '01',
    text: 'Audit kebutuhan volume panggilan harian dan skema konkurensi kanal SIP Trunk',
  },
  {
    number: '02',
    text: 'Pemilihan topologi Cloud, On-Premises, atau Hybrid PBX beserta kebijakan keamanan DLP',
  },
  {
    number: '03',
    text: 'Kesiapan alokasi nomor lokal 22 kota serta jalur khusus 1500 dan 0800',
  },
];

export function ConsultationSection({ prefillNeed, prefillNotes }: ConsultationSectionProps) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    companyName: '',
    corporateEmail: '',
    phoneNumber: '',
    primaryNeed: NEED_OPTIONS[1],
    technicalNotes: '',
  });
  const [errors, setErrors] = useState<ConsultationFormErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<ConsultationFormData | null>(null);

  useEffect(() => {
    if (prefillNeed || prefillNotes) {
      setSubmittedRecord(null);
      setFormData((prev) => ({
        ...prev,
        primaryNeed: prefillNeed || prev.primaryNeed,
        technicalNotes: prefillNotes || prev.technicalNotes,
      }));
    }
  }, [prefillNeed, prefillNotes]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateConsultationForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    setSubmittedRecord({ ...formData });
  };

  const updateField = <K extends keyof ConsultationFormData>(
    key: K,
    value: ConsultationFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key in errors) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  return (
    <section
      id="konsultasi"
      className={`scroll-mt-[68px] relative overflow-hidden vox-conversion-gradient ${SECTION_PADDING_Y_CLASS} text-white`}
    >
      {/* Subtle white supergraphic behind left open lower region */}
      <VoxnetSupergraphic
        tone="white"
        className="hidden md:block absolute -left-24 -bottom-28 w-[400px] h-auto opacity-[0.07]"
      />

      <div className={`relative ${PAGE_CONTAINER_CLASS}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-[26px] lg:gap-[42px] items-stretch">
          {/* Left Narrative on Orange Surface */}
          <div className="flex flex-col justify-between space-y-[26px] py-[6px]">
            <div className="space-y-[26px]">
              <VoxnetLogo surface="orange" />

              <div className="space-y-[16px]">
                <h2 className="font-display text-[26px] sm:text-[34px] font-extrabold text-white tracking-[-0.025em] leading-[1.18] text-balance">
                  {CONVERSION_CONTENT.headline}
                </h2>

                <p className="text-[16px] text-white/95 leading-[1.618] max-w-[54ch]">
                  {CONVERSION_CONTENT.body}
                </p>
              </div>
            </div>

            <div className="space-y-[26px]">
              <div className="pt-[26px] border-t border-white/25 space-y-[16px]">
                <p className="text-[13px] font-semibold text-white/95">
                  Cakupan Sesi Konsultasi Teknis
                </p>
                <div className="space-y-[10px]">
                  {SESSION_EXPECTATIONS.map((item) => (
                    <div key={item.number} className="flex items-start gap-[10px] text-[14px] text-white/90 leading-[1.5]">
                      <span className="font-mono text-[13px] font-semibold text-white/80 tabular-nums shrink-0 pt-[1px]">
                        {item.number}.
                      </span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-[16px] border-t border-white/25 space-y-[6px]">
                <p className="text-[14px] font-semibold text-white leading-[1.618]">
                  {CONVERSION_CONTENT.microcopy}
                </p>
                <p className="text-[13px] text-white/90">
                  PT Lima Satu Tiga Global Tel-Access · Solusi Enterprise Berlisensi Kominfo
                </p>
              </div>
            </div>
          </div>

          {/* Right High-Contrast White Enterprise Consultation Form */}
          <div className="bg-white text-[#1A1A1A] border border-[#EBEBEB] rounded-[16px] p-[26px] sm:p-[42px] flex flex-col justify-center">
            {submittedRecord ? (
              <div
                data-testid="consultation-confirmation"
                className="py-[26px] space-y-[26px]"
                role="status"
                aria-live="polite"
              >
                <div className="w-[42px] h-[42px] rounded-xl vox-orange-gradient flex items-center justify-center text-white">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-[10px]">
                  <h3 className="font-display text-[21px] sm:text-[26px] font-bold text-[#1A1A1A] leading-[1.2]">
                    Permintaan Diskusi Diterima
                  </h3>
                  <p className="text-[14px] text-[#4A4A4A] leading-[1.618]">
                    Terima kasih, <span className="font-semibold text-[#1A1A1A]">{submittedRecord.fullName}</span>. Tim ahli Voxnet telah mencatat kebutuhan untuk{' '}
                    <span className="font-semibold text-[#1A1A1A]">{submittedRecord.companyName}</span> dan akan menghubungi Anda ke{' '}
                    <span className="font-semibold text-[#1A1A1A]">{submittedRecord.corporateEmail}</span> dalam 1x24 jam kerja.
                  </p>
                </div>

                <div className="border-y border-[#EBEBEB] py-[16px] space-y-[10px] text-[13px] text-[#4A4A4A]">
                  <div>
                    <span className="font-semibold text-[#1A1A1A]">Fokus Solusi: </span>
                    {submittedRecord.primaryNeed}
                  </div>
                  {submittedRecord.technicalNotes && (
                    <div>
                      <span className="font-semibold text-[#1A1A1A]">Catatan Kebutuhan: </span>
                      {submittedRecord.technicalNotes}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedRecord(null)}
                  className="px-[26px] py-[10px] min-h-[44px] rounded-lg border border-[#EBEBEB] hover:border-[#1A1A1A] text-[14px] font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  Kirim Permintaan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-[16px]">
                <div className="space-y-[6px] pb-[16px] border-b border-[#EBEBEB]">
                  <h3 className="font-display text-[21px] font-bold text-[#1A1A1A] leading-[1.272]">
                    Formulir Sesi Diskusi Infrastruktur
                  </h3>
                  <p className="text-[13px] text-[#525252]">
                    {CONVERSION_CONTENT.microcopy}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  <div className="space-y-[6px]">
                    <label htmlFor="consult-fullName" className="block text-[13px] font-semibold text-[#1A1A1A]">
                      Nama Lengkap
                    </label>
                    <input
                      id="consult-fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="Budi Santoso"
                      aria-invalid={Boolean(errors.fullName)}
                      className={`w-full px-[16px] py-[10px] min-h-[44px] rounded-lg border text-[14px] text-[#1A1A1A] bg-white focus:outline-none ${
                        errors.fullName
                          ? 'border-[#C82333] focus:border-[#C82333]'
                          : 'border-[#EBEBEB] focus:border-[#E7621B]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[13px] font-medium text-[#C82333]">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-[6px]">
                    <label htmlFor="consult-companyName" className="block text-[13px] font-semibold text-[#1A1A1A]">
                      Nama Perusahaan
                    </label>
                    <input
                      id="consult-companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      placeholder="PT Nusantara Enterprise"
                      aria-invalid={Boolean(errors.companyName)}
                      className={`w-full px-[16px] py-[10px] min-h-[44px] rounded-lg border text-[14px] text-[#1A1A1A] bg-white focus:outline-none ${
                        errors.companyName
                          ? 'border-[#C82333] focus:border-[#C82333]'
                          : 'border-[#EBEBEB] focus:border-[#E7621B]'
                      }`}
                    />
                    {errors.companyName && (
                      <p className="text-[13px] font-medium text-[#C82333]">{errors.companyName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  <div className="space-y-[6px]">
                    <label htmlFor="consult-corporateEmail" className="block text-[13px] font-semibold text-[#1A1A1A]">
                      Email Korporat
                    </label>
                    <input
                      id="consult-corporateEmail"
                      type="email"
                      value={formData.corporateEmail}
                      onChange={(e) => updateField('corporateEmail', e.target.value)}
                      placeholder="nama@perusahaan.co.id"
                      aria-invalid={Boolean(errors.corporateEmail)}
                      className={`w-full px-[16px] py-[10px] min-h-[44px] rounded-lg border text-[14px] text-[#1A1A1A] bg-white focus:outline-none ${
                        errors.corporateEmail
                          ? 'border-[#C82333] focus:border-[#C82333]'
                          : 'border-[#EBEBEB] focus:border-[#E7621B]'
                      }`}
                    />
                    {errors.corporateEmail && (
                      <p className="text-[13px] font-medium text-[#C82333]">{errors.corporateEmail}</p>
                    )}
                  </div>

                  <div className="space-y-[6px]">
                    <label htmlFor="consult-phoneNumber" className="block text-[13px] font-semibold text-[#1A1A1A]">
                      Nomor Telepon / WhatsApp
                    </label>
                    <input
                      id="consult-phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => updateField('phoneNumber', e.target.value)}
                      placeholder="+62 812 8899 7766"
                      aria-invalid={Boolean(errors.phoneNumber)}
                      className={`w-full px-[16px] py-[10px] min-h-[44px] rounded-lg border text-[14px] text-[#1A1A1A] bg-white focus:outline-none ${
                        errors.phoneNumber
                          ? 'border-[#C82333] focus:border-[#C82333]'
                          : 'border-[#EBEBEB] focus:border-[#E7621B]'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-[13px] font-medium text-[#C82333]">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-[6px]">
                  <label htmlFor="consult-primaryNeed" className="block text-[13px] font-semibold text-[#1A1A1A]">
                    Fokus Infrastruktur
                  </label>
                  <select
                    id="consult-primaryNeed"
                    value={formData.primaryNeed}
                    onChange={(e) => updateField('primaryNeed', e.target.value)}
                    aria-invalid={Boolean(errors.primaryNeed)}
                    className="w-full px-[16px] py-[10px] min-h-[44px] rounded-lg border border-[#EBEBEB] bg-white text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#E7621B]"
                  >
                    {NEED_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.primaryNeed && (
                    <p className="text-[13px] font-medium text-[#C82333]">{errors.primaryNeed}</p>
                  )}
                </div>

                <div className="space-y-[6px]">
                  <label htmlFor="consult-technicalNotes" className="block text-[13px] font-semibold text-[#1A1A1A]">
                    Catatan Teknis atau Estimasi Kapasitas (Opsional)
                  </label>
                  <textarea
                    id="consult-technicalNotes"
                    rows={3}
                    value={formData.technicalNotes}
                    onChange={(e) => updateField('technicalNotes', e.target.value)}
                    placeholder="Contoh: Kebutuhan 200 kanal SIP Trunk untuk integrasi CRM & nomor 1500"
                    className="w-full px-[16px] py-[10px] rounded-lg border border-[#EBEBEB] bg-white text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#E7621B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-[13px] px-[26px] min-h-[44px] rounded-lg vox-cta-gradient text-white text-[14px] font-semibold inline-flex items-center justify-center gap-[10px] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
                >
                  <span>{CONVERSION_CONTENT.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
