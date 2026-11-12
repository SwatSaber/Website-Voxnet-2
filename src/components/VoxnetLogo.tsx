interface VoxnetLogoProps {
  surface?: 'light' | 'orange' | 'orange-monochrome';
  className?: string;
}

const VOXNET_LOGO_SRC = '/assets/aistudio/10_Voxnet_Logo_Landscape_tanpa_tagline_-_color_22ed5c27.png';

export function VoxnetLogo({ surface = 'light', className = '' }: VoxnetLogoProps) {
  const isWhitePlate = surface === 'orange';
  const isMonochromeWhite = surface === 'orange-monochrome';

  return (
    <span
      className={`inline-flex items-center select-none whitespace-nowrap shrink-0 ${
        isWhitePlate ? 'bg-white px-[16px] py-[10px] rounded-[12px]' : ''
      } ${className}`}
    >
      <img
        src={VOXNET_LOGO_SRC}
        alt="VOXNET"
        referrerPolicy="no-referrer"
        className={`h-[26px] sm:h-[32px] w-auto object-contain shrink-0 transition-[filter] duration-200 ${
          isMonochromeWhite ? 'brightness-0 invert' : ''
        }`}
      />
    </span>
  );
}
