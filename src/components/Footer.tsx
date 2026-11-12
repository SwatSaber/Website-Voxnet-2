import { PAGE_CONTAINER_CLASS } from '../utils/goldenRatio';
import { VoxnetLogo } from './VoxnetLogo';

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#EBEBEB] py-[42px] md:py-[68px]">
      <div className={`${PAGE_CONTAINER_CLASS} space-y-[26px] md:space-y-[42px]`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-[26px]">
          <div className="space-y-[10px]">
            <VoxnetLogo surface="light" />
            <p className="text-[13px] font-medium text-[#525252]">
              PT Lima Satu Tiga Global Tel-Access · Just Call. Clearer, Closer.
            </p>
          </div>

          <nav aria-label="Navigasi Footer" className="flex flex-wrap items-center gap-[26px] text-[14px] text-[#404040]">
            <a href="#solusi" className="hover:text-[#B84408] transition-colors">
              Solusi
            </a>
            <a href="#keunggulan" className="hover:text-[#B84408] transition-colors">
              Keunggulan
            </a>
            <a href="#use-cases" className="hover:text-[#B84408] transition-colors">
              Use Case
            </a>
            <a href="#tentang" className="hover:text-[#B84408] transition-colors">
              Tentang
            </a>
            <a href="#konsultasi" className="hover:text-[#B84408] transition-colors">
              Konsultasi
            </a>
          </nav>
        </div>

        <div className="pt-[26px] border-t border-[#EBEBEB] flex flex-col sm:flex-row sm:items-center justify-between gap-[16px] text-[13px] text-[#525252]">
          <p>
            © {new Date().getFullYear()} PT Lima Satu Tiga Global Tel-Access (Voxnet). Seluruh hak cipta dilindungi.
          </p>
          <p>
            Berlisensi Resmi Kominfo: Jasa Call Center · PSE · Internet Service Provider
          </p>
        </div>
      </div>
    </footer>
  );
}
