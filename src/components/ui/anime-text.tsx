"use client";
import { motion, type Variants } from "motion/react";
import type { AnimeTextProps } from "@/types/ui";

// Animation variants
const containerVariants: Variants = {
  view: (delay: number = 0) => ({
    transition: {
      when: "beforeChildren",
      delayChildren: delay,
      staggerChildren: 0.1,
    },
  }),
};

const wordVariants: Variants = {
  initial: {
    opacity: 0,
    rotate: 10,
  },
  view: {
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

// AnimeText
export default function AnimeText({
  text,
  delay = 0,
  className = "",
}: AnimeTextProps) {
  const fullText = text.join(" ");

  return (
    <motion.span
      initial="initial"
      whileInView="view"
      custom={delay}
      aria-label={fullText}
      variants={containerVariants}
      viewport={{ once: true, amount: 0.5 }}
      className={`${className} flex flex-wrap`}
    >
      {text.map((word, index) => {
        return (
          <motion.span
            key={`${word}-${index}`}
            variants={wordVariants}
            aria-hidden="true"
            className="inline-flex origin-bottom-left will-change-transform"
          >
            {word}
            {index !== text.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
