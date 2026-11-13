import { FileBadge2 } from 'lucide-react';
import { CREDIBILITY_CONTENT } from '../data/voxnetContent';
import { PAGE_CONTAINER_CLASS, SECTION_PADDING_Y_CLASS } from '../utils/goldenRatio';
import { VoxnetSupergraphic } from './VoxnetSupergraphic';

export function CredibilitySection() {
  return (
    <section id="tentang" className={`scroll-mt-[68px] relative overflow-hidden bg-[#F8F9FA] border-b border-[#EBEBEB] ${SECTION_PADDING_Y_CLASS}`}>
      <VoxnetSupergraphic
        tone="orange"
        className="hidden lg:block absolute -left-24 -bottom-24 w-[360px] h-auto opacity-[0.045] rotate-180"
      />

      <div className={`relative ${PAGE_CONTAINER_CLASS} space-y-[32px] lg:space-y-[42px]`}>
        <div className="max-w-[800px] space-y-[16px]">
          <p className="text-[13px] font-semibold tracking-wider text-[#B84408]">
            Profil Perusahaan & Kredibilitas
          </p>
          <h2 className="font-display text-[26px] sm:text-[34px] font-bold text-[#1A1A1A] tracking-[-0.02em] leading-[1.18] text-balance">
            {CREDIBILITY_CONTENT.headline}
          </h2>
          <p className="text-[16px] text-[#4A4A4A] leading-[1.618]">
            {CREDIBILITY_CONTENT.body}
          </p>
        </div>

        {/* Dedicated Full-Width Legal Certification Showcase */}
        <div className="space-y-[18px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[8px]">
            <h3 className="font-display text-[17px] font-bold text-[#1A1A1A]">
              Perizinan & Lisensi Pemerintah Republik Indonesia
            </h3>
            <p className="text-[13px] font-medium text-[#525252]">
              Terdaftar dan Diawasi Kominfo RI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
            {CREDIBILITY_CONTENT.licenses.map((lic) => (
              <div
                key={lic.code}
                className="bg-white border border-[#EBEBEB] rounded-[16px] p-[24px] lg:p-[26px] flex flex-col justify-between gap-[16px]"
              >
                <div className="flex items-center justify-between gap-[12px]">
                  <div className="w-[40px] h-[40px] rounded-[10px] bg-[#FFF5EE] border border-[#FF8848]/30 flex items-center justify-center text-[#B84408] shrink-0">
                    <FileBadge2 className="w-5 h-5" strokeWidth={1.85} aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[12px] font-semibold text-[#525252] tabular-nums">
                    {lic.code} · {lic.issuer}
                  </span>
                </div>

                <div className="space-y-[6px]">
                  <p className="font-display text-[16px] font-bold text-[#1A1A1A] leading-[1.35]">
                    {lic.name}
                  </p>
                  <p className="text-[13.5px] text-[#525252] leading-[1.55]">
                    {lic.scope}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
