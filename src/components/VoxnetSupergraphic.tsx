interface VoxnetSupergraphicProps {
  tone?: 'orange' | 'white';
  className?: string;
}

const VOXNET_SUPERGRAPHIC_SRC = '/assets/aistudio/Supergraphic_a7678cbe.png';

export function VoxnetSupergraphic({ tone = 'orange', className = '' }: VoxnetSupergraphicProps) {
  const isWhite = tone === 'white';

  return (
    <img
      src={VOXNET_SUPERGRAPHIC_SRC}
      alt=""
      aria-hidden="true"
      referrerPolicy="no-referrer"
      className={`pointer-events-none select-none object-contain ${
        isWhite ? 'brightness-0 invert' : ''
      } ${className}`}
    />
  );
}
