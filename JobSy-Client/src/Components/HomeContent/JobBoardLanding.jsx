import React, { useState, useEffect, useRef } from "react";

// Custom hook for counting animation
const useCountUp = (endValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const requestRef = useRef();
  const startTimeRef = useRef();

  useEffect(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    const animateCount = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const progress = (currentTime - startTimeRef.current) / duration;

      if (progress < 1) {
        const currentValue = Math.min(endValue, Math.floor(progress * endValue));
        setCount(currentValue);
        requestRef.current = requestAnimationFrame(animateCount);
      } else {
        setCount(endValue);
      }
    };

    if (typeof endValue === 'number' && endValue > 0) {
      requestRef.current = requestAnimationFrame(animateCount);
    } else {
      setCount(endValue);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [endValue, duration]);

  return count;
};

export default function JobBoardLanding() {
  const statsData = [
    { value: "1,930", label: "Candidates" },
    { value: "54", label: "Jobs Posted" },
    { value: "120", label: "Jobs Filled" },
    { value: "550", label: "Companies" },
  ];

  return (
    <div className="bg-white">
      <section
        className="py-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #8BC34A 0%, #689F38 100%)",
          
        }}
      >
       
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.3 }}
        >
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white transform rotate-45"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-white transform rotate-12"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border-4 border-white transform -rotate-12"></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 border-4 border-white transform rotate-45"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              JobBoard Site Stats
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-16 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Expedita unde officiis recusandae sequi excepturi corrupti.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              {statsData.map((stat) => {
                const endValueNum = parseInt(stat.value.replace(/,/g, ''), 10);
                const animatedCount = useCountUp(endValueNum, 2000);

                return (
                  <div key={stat.label} className="text-center">
                    <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
                      {animatedCount.toLocaleString()}
                    </div>
                    <div className="text-lg sm:text-xl text-white/90 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
