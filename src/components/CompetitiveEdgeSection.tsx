import datacenterNodeImg from '../assets/images/voxnet_datacenter_node_1794368139770.jpg';
import { COMPETITIVE_EDGES } from '../data/voxnetContent';
import { PAGE_CONTAINER_CLASS, SECTION_PADDING_Y_CLASS } from '../utils/goldenRatio';
import { ResilientImage } from './ResilientImage';

export function CompetitiveEdgeSection() {
  return (
    <section id="keunggulan" className={`scroll-mt-[68px] bg-[#F8F9FA] border-b border-[#EBEBEB] ${SECTION_PADDING_Y_CLASS}`}>
      <div className={PAGE_CONTAINER_CLASS}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-[26px] lg:gap-[42px] items-stretch">
          {/* Left Editorial Image & Headline Anchor */}
          <div className="flex flex-col justify-between space-y-[26px]">
            <div className="space-y-[16px]">
              <p className="text-[13px] font-semibold tracking-wider text-[#B84408]">
                Keunggulan Kompetitif
              </p>
              <h2 className="font-display text-[26px] sm:text-[34px] font-bold text-[#1A1A1A] tracking-[-0.02em] leading-[1.18] text-balance">
                Mengapa Perusahaan Enterprise Memilih Voxnet?
              </h2>
            </div>

            <div className="relative flex-1 min-h-[280px] lg:min-h-[360px] rounded-[16px] overflow-hidden border border-[#EBEBEB] bg-white">
              <ResilientImage
                src={datacenterNodeImg}
                alt="Perangkat keras jaringan fiber optik dan Session Border Controller Voxnet berwarna putih dan oranye"
                fallbackTitle="Arsitektur SBC & Fiber Optik Enterprise"
                className="w-full h-full lg:h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent"
              />
              <div className="absolute bottom-[26px] left-[26px] right-[26px] text-white">
                <p className="text-[13px] font-medium text-white/85">
                  Arsitektur Back-End Netral & Berlisensi
                </p>
                <p className="font-display text-[16px] font-bold mt-[4px] leading-[1.272]">
                  Siap terhubung ke Omnichannel & CRM perusahaan Anda
                </p>
              </div>
            </div>
          </div>

          {/* Right Editorial Pillar List (Structured whitespace & hairline dividers) */}
          <div className="bg-white border border-[#EBEBEB] rounded-[16px] p-[26px] sm:p-[42px] flex flex-col justify-between divide-y divide-[#EBEBEB]">
            {COMPETITIVE_EDGES.map((edge, idx) => (
              <div
                key={edge.number}
                className={`${idx === 0 ? 'pb-[26px]' : idx === COMPETITIVE_EDGES.length - 1 ? 'pt-[26px]' : 'py-[26px]'} space-y-[10px]`}
              >
                <div className="flex flex-wrap items-center justify-between gap-[10px]">
                  <span className="font-mono text-[13px] font-semibold text-[#B84408] tabular-nums">
                    {edge.number}.
                  </span>
                  <span className="text-[13px] font-medium text-[#525252]">
                    {edge.evidenceTag}
                  </span>
                </div>
                <h3 className="font-display text-[21px] font-bold text-[#1A1A1A] leading-[1.272]">
                  {edge.title}
                </h3>
                <p className="text-[16px] text-[#4A4A4A] leading-[1.618]">
                  {edge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
