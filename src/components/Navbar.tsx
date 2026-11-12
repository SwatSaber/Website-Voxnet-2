import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PAGE_CONTAINER_CLASS } from '../utils/goldenRatio';
import { VoxnetLogo } from './VoxnetLogo';

interface NavbarProps {
  onConsultClick: () => void;
}

const NAV_ITEMS = [
  { href: '#solusi', label: 'Solusi' },
  { href: '#keunggulan', label: 'Keunggulan' },
  { href: '#use-cases', label: 'Use Case' },
  { href: '#tentang', label: 'Tentang' },
];

export function Navbar({ onConsultClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileConsult = () => {
    setMobileMenuOpen(false);
    onConsultClick();
  };

  const useLightBar = isScrolled;

  return (
    <header
      data-scrolled={useLightBar ? 'true' : 'false'}
      className={`fixed top-0 left-0 right-0 z-40 border-b transition-colors duration-200 ${
        useLightBar
          ? 'bg-white border-[#EBEBEB]'
          : mobileMenuOpen
            ? 'bg-[#B84408] border-white/20'
            : 'bg-transparent border-white/15'
      }`}
    >
      <div className={`${PAGE_CONTAINER_CLASS} h-[64px] md:h-[68px] flex items-center justify-between gap-8`}>
        <a
          href="#top"
          aria-label="Beranda Voxnet"
          className={`rounded whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 ${
            useLightBar ? 'focus-visible:outline-[#E7621B]' : 'focus-visible:outline-white'
          }`}
        >
          <VoxnetLogo surface={useLightBar ? 'light' : 'orange-monochrome'} />
        </a>

        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-[26px] lg:gap-[42px]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[14px] font-medium transition-colors whitespace-nowrap shrink-0 underline-offset-8 hover:underline rounded focus-visible:outline-2 focus-visible:outline-offset-4 ${
                useLightBar
                  ? 'text-[#404040] hover:text-[#B84408] focus-visible:outline-[#E7621B]'
                  : 'text-white/95 hover:text-white focus-visible:outline-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[10px] shrink-0">
          <button
            type="button"
            onClick={onConsultClick}
            className={`hidden sm:inline-flex items-center justify-center px-[22px] py-[10px] min-h-[40px] rounded-lg text-[14px] font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
              useLightBar
                ? 'vox-cta-gradient text-white focus-visible:outline-[#1A1A1A]'
                : 'bg-white text-[#B84408] hover:bg-[#FFF5EE] focus-visible:outline-white'
            }`}
          >
            Jadwalkan Diskusi
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className={`md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border transition-colors cursor-pointer ${
              useLightBar
                ? 'border-[#EBEBEB] text-[#1A1A1A] hover:bg-[#F8F9FA]'
                : 'border-white/35 text-white bg-white/10 hover:bg-white/20'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className={`md:hidden border-t px-[26px] sm:px-[42px] py-[16px] space-y-[10px] ${
            useLightBar
              ? 'bg-white border-[#EBEBEB]'
              : 'bg-[#B84408] border-white/20'
          }`}
        >
          <nav aria-label="Navigasi Mobile" className="flex flex-col space-y-[6px]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-[10px] px-[10px] text-[16px] font-medium rounded-md ${
                  useLightBar
                    ? 'text-[#1A1A1A] hover:text-[#B84408]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className={`pt-[16px] border-t ${useLightBar ? 'border-[#EBEBEB]' : 'border-white/20'}`}>
            <button
              type="button"
              onClick={handleMobileConsult}
              className={`w-full py-[13px] px-[26px] min-h-[44px] rounded-lg text-[14px] font-semibold text-center cursor-pointer ${
                useLightBar
                  ? 'vox-cta-gradient text-white'
                  : 'bg-white text-[#B84408] hover:bg-[#FFF5EE]'
              }`}
            >
              Jadwalkan Sesi Diskusi
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
