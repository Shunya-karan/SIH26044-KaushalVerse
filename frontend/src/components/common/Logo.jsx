import { Link } from 'react-router-dom';
import { Network } from 'lucide-react';

export default function Logo({ size = 'md', to = '/', showText = true }) {
  const sizes = {
    sm: { icon: 'w-7 h-7', text: 'text-lg' },
    md: { icon: 'w-9 h-9', text: 'text-xl' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <Link to={to} className="flex items-center gap-2.5 group">
      <div className={`${s.icon} rounded-lg bg-primary flex items-center justify-center text-white shrink-0 transition-transform group-hover:scale-105`}>
        <Network className="w-1/2 h-1/2" strokeWidth={2.5} />
      </div>
      {showText && (
        <span className={`${s.text} font-bold text-main tracking-tight`}>
          Kaushal<span className="text-primary">Verse</span>
        </span>
      )}
    </Link>
  );
}
