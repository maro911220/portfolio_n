"use client";
import { motion, type Variants } from "motion/react";

// Animation variants
const footerVariants: Variants = {
  view: {
    transition: {
      when: "beforeChildren",
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const footerTextVariants: Variants = {
  init: {
    opacity: 0,
    y: 50,
  },
  view: {
    opacity: 1,
    y: 0,
  },
};

const CURRENT_YEAR = new Date().getFullYear();

// Footer
export default function Footer() {
  return (
    <footer>
      <motion.div
        initial="init"
        whileInView="view"
        variants={footerVariants}
        viewport={{ amount: 0.5, once: true }}
        className="container mx-auto px-4 text-center"
      >
        <motion.p
          variants={footerTextVariants}
          className="text-sm text-gray-500 mb-2"
        >
          © {CURRENT_YEAR}. maro911220 All rights reserved.
        </motion.p>
        <motion.p
          variants={footerTextVariants}
          className="text-xs text-gray-400"
        >
          Built with Next.js, React, Tailwind CSS, & MongoDB.
        </motion.p>
      </motion.div>
    </footer>
  );
}
