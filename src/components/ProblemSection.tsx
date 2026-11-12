import callTrafficImg from '../assets/images/problem_call_traffic_1794386341885.jpg';
import platformIntegrationImg from '../assets/images/problem_platform_integration_1794386341598.jpg';
import complianceSecurityImg from '../assets/images/problem_compliance_security_1794386342580.jpg';
import { PROBLEM_CONTENT } from '../data/voxnetContent';
import { PAGE_CONTAINER_CLASS, SECTION_PADDING_Y_CLASS } from '../utils/goldenRatio';
import { ResilientImage } from './ResilientImage';

const PROBLEM_CARD_IMAGES: Record<string, string> = {
  '01': callTrafficImg,
  '02': platformIntegrationImg,
  '03': complianceSecurityImg,
};

export function ProblemSection() {
  return (
    <section className={`bg-[#F8F9FA] border-b border-[#EBEBEB] ${SECTION_PADDING_Y_CLASS}`}>
      <div className={`${PAGE_CONTAINER_CLASS} space-y-[44px] lg:space-y-[60px]`}>
        {/* Editorial Asymmetric Split Narrative Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-[26px] lg:gap-[48px] items-end">
          <div className="space-y-[16px]">
            <p className="text-[13px] font-semibold tracking-wider text-[#B84408]">
              Realitas Operasional Enterprise
            </p>
            <h2 className="font-display text-[26px] sm:text-[34px] font-bold text-[#1A1A1A] tracking-[-0.02em] leading-[1.2] text-balance">
              {PROBLEM_CONTENT.headline}
            </h2>
          </div>

          <p className="text-[16px] text-[#4A4A4A] leading-[1.68] max-w-[64ch]">
            {PROBLEM_CONTENT.body}
          </p>
        </div>

        {/* 3 Visual Bottleneck Cards with upright 4:3 photo, tight text stack, and 2-line description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px] lg:gap-[32px]">
          {PROBLEM_CONTENT.painPoints.map((point) => (
            <div
              key={point.number}
              className="bg-white border border-[#EBEBEB] rounded-[16px] overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden border-b border-[#EBEBEB] bg-[#F8F9FA]">
                <ResilientImage
                  src={PROBLEM_CARD_IMAGES[point.number] ?? callTrafficImg}
                  alt={point.imageAlt}
                  fallbackTitle={point.fallbackTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-[26px] lg:p-[30px] space-y-[12px]">
                <span className="font-mono text-[13px] font-semibold text-[#B84408] tabular-nums block leading-none">
                  {point.number}.
                </span>
                <h3 className="font-display text-[18.5px] font-bold text-[#1A1A1A] leading-[1.3]">
                  {point.title}
                </h3>
                <p className="text-[14.5px] text-[#525252] leading-[1.6] line-clamp-2">
                  {point.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
