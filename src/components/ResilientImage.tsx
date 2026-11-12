import { useState } from 'react';
import { RadioTower } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({ src, alt, fallbackTitle, className = '' }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#F8F9FA] via-[#FFFFFF] to-[#EBEBEB] border border-[#EBEBEB] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-xl vox-orange-gradient flex items-center justify-center text-white mb-3">
          <RadioTower className="w-6 h-6" />
        </div>
        <p className="font-display text-sm font-bold text-[#1A1A1A]">{fallbackTitle}</p>
        <p className="text-xs text-[#525252] mt-1">Infrastruktur Telekomunikasi Enterprise Voxnet</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
