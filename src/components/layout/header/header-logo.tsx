"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";

// Motion 컴포넌트
const MotionLink = motion.create(Link);

// Animation variants
const logoBounceVariants: Variants = {
  init: { scale: 1 },
  hover: {
    scale: [1, 0.8, 1.1, 1],
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const logoLinkVariants: Variants = {
  init: { y: 0, scale: 1 },
  hover: {
    y: [0, -5, 2, 0],
    scale: [1, 1.2, 0.9, 1],
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// HeaderLogo
export default function HeaderLogo() {
  return (
    <motion.div
      initial="init"
      whileHover="hover"
      className="relative w-12 h-12 sm:w-14 sm:h-14"
    >
      <motion.div
        aria-hidden="true"
        variants={logoBounceVariants}
        className="absolute inset-0 bg-point rounded-xl pointer-events-none"
      />
      <MotionLink
        href="/"
        aria-label="홈으로 이동"
        variants={logoLinkVariants}
        className="flex p-1 will-change-transform"
      >
        <Image
          alt="my-logo"
          priority
          width={48}
          height={48}
          src="/img/logo.png"
          className="w-full h-full"
        />
      </MotionLink>
    </motion.div>
  );
}
