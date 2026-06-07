import { useEffect, useRef, useCallback } from 'react';

interface Props {
  mobile?: boolean;
}

export default function UnderConstructionSign({ mobile = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollY = useRef(0);
  const isAnimating = useRef(false);

  const animate = useCallback(() => {
    // Pendulum physics constants
    const gravity = 0.01;
    const damping = 0.99;
    const stopThreshold = 0.0005;

    // Apply gravity (restoring force toward vertical)
    const acceleration = -gravity * Math.sin(angleRef.current * (Math.PI / 180));
    velocityRef.current += acceleration;
    
    // Apply damping (air resistance)
    velocityRef.current *= damping;

    // Apply velocity
    angleRef.current += velocityRef.current;

    // Stop when energy is negligible
    if (Math.abs(velocityRef.current) < stopThreshold && Math.abs(angleRef.current) < 0.1) {
      velocityRef.current = 0;
      angleRef.current = 0;
      isAnimating.current = false;
    }

    // Apply rotation to the element
    if (containerRef.current) {
      containerRef.current.style.transform = `rotate(${angleRef.current}deg)`;
    }

    // Continue animation if still moving
    if (isAnimating.current) {
      requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Only react if there's actual scroll movement
      if (Math.abs(scrollDelta) > 0) {
        // Random direction
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        // Push strength proportional to scroll speed
        const pushStrength = Math.min(Math.abs(scrollDelta) * 0.005, 0.04) * direction;
        
        // Add to existing velocity
        velocityRef.current += pushStrength;
        
        // Clamp max velocity
        const maxVelocity = 1.5;
        velocityRef.current = Math.max(Math.min(velocityRef.current, maxVelocity), -maxVelocity);
        
        // Start animation if not already running
        if (!isAnimating.current) {
          isAnimating.current = true;
          requestAnimationFrame(animate);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animate]);

  // Grommet component
  const Grommet = () => (
    <div className="relative h-4 w-4">
      <div className="absolute inset-0 rounded-full border-2 border-gray-500 bg-gray-400 shadow-sm" />
      <div className="absolute inset-1 rounded-full bg-gray-800" />
    </div>
  );

  // The sign content
  const SignContent = () => (
    <div className="relative overflow-hidden rounded-sm bg-[#FFD700] shadow-xl">
      {/* Outer boundary - thin black border */}
      <div className="absolute inset-0 rounded-sm border border-black" />
      
      {/* Hazard stripes - top edge */}
      <div className="h-4 w-full overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            background: 'repeating-linear-gradient(45deg, #000, #000 8px, #FFD700 8px, #FFD700 16px)',
          }}
        />
      </div>

      {/* Top border separation line */}
      <div className="h-1 w-full bg-black" />

      {/* Main content area */}
      <div className="px-3 py-2">
        {/* CAUTION - black block with yellow text */}
        <div className="bg-black px-4 py-2">
          <p className="text-center text-3xl font-black uppercase tracking-tighter text-[#FFD700] leading-none">
            CAUTION
          </p>
        </div>
        
        {/* UNDER CONSTRUCTION - split into two lines */}
        <div className="mt-2 space-y-0">
          <p className="text-center text-lg font-black uppercase tracking-widest text-black leading-none">
            SITE UNDER
          </p>
          <p className="text-center text-base font-black uppercase tracking-widest text-black leading-none">
            CONSTRUCTION
          </p>
        </div>
      </div>

      {/* Bottom border separation line */}
      <div className="h-1 w-full bg-black" />

      {/* Hazard stripes - bottom edge */}
      <div className="h-4 w-full overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            background: 'repeating-linear-gradient(45deg, #000, #000 8px, #FFD700 8px, #FFD700 16px)',
          }}
        />
      </div>

      {/* Corner grommets for hanging variant - overlapping top hazard stripes */}
      <div className="absolute top-2 left-3">
        <Grommet />
      </div>
      <div className="absolute top-2 right-3">
        <Grommet />
      </div>
    </div>
  );

  // Wire loop component
  const WireLoop = () => (
    <div className="relative" style={{ width: '140px', height: '40px' }}>
      <svg
        width="140"
        height="40"
        viewBox="0 0 140 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wire path: left hole → up to nail → down to right hole */}
        <path
          d="M 12 38 L 70 2 L 128 38"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Wire loop over the nail */}
        <path
          d="M 60 2 Q 70 8 80 2"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );

  if (mobile) {
    return (
      <div className="flex flex-col items-center scale-75">
        {/* Mobile: static, centered, smaller */}
        <div className="flex flex-col items-center">
          <SignContent />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hanging sign - scroll-triggered physics swing */}
      <div
        ref={containerRef}
        className="flex flex-col items-center origin-top"
        style={{ transform: 'rotate(0deg)' }}
      >
        {/* Nail */}
        <div className="relative flex flex-col items-center">
          <div className="h-2 w-2 rounded-full bg-gray-400 shadow-sm" />
          <div className="h-1 w-1 rounded-full bg-gray-600" style={{ marginTop: '-4px' }} />
        </div>

        {/* Wire */}
        <WireLoop />

        {/* Sign */}
        <div className="-mt-1">
          <SignContent />
        </div>
      </div>
    </div>
  );
}
