"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

// constants
const SHOW_BUTTON_THRESHOLD = 400;

// ScrollToTop
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  const scrollToTop = () => {
    lenis?.scrollTo(0, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (e: any) => {
      setIsVisible(e.scroll > SHOW_BUTTON_THRESHOLD);
    };

    lenis.on("scroll", handleScroll);
    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 left-0 right-0 z-50 pointer-events-none">
          <div className="max-w-header mx-auto px-2 md:px-3 lg:px-5 flex justify-end">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={scrollToTop}
              aria-label="맨 위로 이동"
              className="pointer-events-auto p-3 bg-point text-white rounded-full cursor-pointer"
            >
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
