import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseRef = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Detect mouse device
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement | null;
        if (!target) {
          setIsHovered(false);
          return;
        }

        const tagName = typeof target.tagName === 'string' ? target.tagName.toUpperCase() : '';
        const hasClass = target.classList && typeof target.classList.contains === 'function'
          ? target.classList.contains('cursor-pointer')
          : false;

        let isInteractive = false;
        
        if (tagName === 'BUTTON' || tagName === 'A' || hasClass) {
          isInteractive = true;
        } else if (typeof target.closest === 'function') {
          try {
            if (target.closest('button') || target.closest('a') || target.closest('.interactive-card')) {
              isInteractive = true;
            }
          } catch (err) {
            // Silence selector exceptions
          }
        }

        setIsHovered(isInteractive);
      } catch (err) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    // Tick loop for drawing
    let reqId: number;
    let ringX = -100;
    let ringY = -100;

    const tick = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      // Smooth follow
      ringX += (targetX - ringX) * 0.14;
      ringY += (targetY - ringY) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      reqId = requestAnimationFrame(tick);
    };

    reqId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(reqId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div id="custom-cursor-container" className={isHovered ? 'cursor-hover' : ''}>
      <div
        id="cursor-dot"
        ref={dotRef}
        className="custom-cursor-dot hover:scale-150 transition-transform duration-200"
        style={{ position: 'fixed', top: 0, left: 0, transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 99999 }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ position: 'fixed', top: 0, left: 0, transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 99998 }}
      />
    </div>
  );
};
