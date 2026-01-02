import React, { useEffect, useRef } from "react";

const OuraRing: React.FC = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ringRef.current;
    if (!el) return;

    const move = (e: PointerEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={ringRef}
      className={[
        "oura-ring",
        "pointer-events-none fixed left-0 top-0 z-[9999]",
        "h-7 w-7 rounded-full border-2",
        "border-coco-purple-light",
        "bg-transparent",
      ].join(" ")}
    />
  );
};

export default OuraRing;
