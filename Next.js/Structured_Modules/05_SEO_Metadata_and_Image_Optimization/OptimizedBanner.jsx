import Image from 'next/image';

/**
 * OptimizedBanner Component
 * Demonstrates:
 * - next/image responsive attributes
 * - priority flag for Above-The-Fold LCP optimization
 * - placeholder="blur" for zero Cumulative Layout Shift (CLS)
 */
export default function OptimizedBanner() {
  return (
    <div className="relative w-full h-80 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <Image
        src="/assets/banner-hero.webp"
        alt="Next.js Full Stack Engineering Hero"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        className="object-cover transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-8">
        <h2 className="text-3xl font-extrabold text-white">Next.js High-Performance Image Optimization</h2>
        <p className="text-slate-300 text-sm mt-2 max-w-xl">
          Powered by next/image: automatic AVIF generation, viewport sizing, and zero layout shift.
        </p>
      </div>
    </div>
  );
}
