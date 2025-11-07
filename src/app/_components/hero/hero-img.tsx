"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "motion/react";

// Motion 컴포넌트
const MotionImage = motion.create(Image);

// Animation variants
const imgVariants: Variants = {
  view: {
    transition: {
      when: "beforeChildren",
      delayChildren: 0.2,
    },
  },
};

const mainImgVariants: Variants = {
  initial: {
    scale: 0.9,
    opacity: 0,
    zIndex: 20,
  },
  view: {
    scale: 1,
    opacity: 1,
    zIndex: 20,
    transition: {
      duration: 0.6,
    },
  },
};

const imgBgVariants: Variants = {
  initial: {
    x: -15,
    opacity: 0,
    zIndex: -1,
  },
  view: {
    x: 0,
    opacity: 1,
    zIndex: -1,
    transition: {
      delay: 0.6,
      duration: 0.6,
    },
  },
};

// HeroImg
export default function HeroImg() {
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      style={{ translateY }}
      initial="initial"
      whileInView="view"
      variants={imgVariants}
      viewport={{ once: true }}
      className="relative flex-1 will-change-transform"
    >
      <motion.span
        variants={imgBgVariants}
        aria-hidden="true"
        className="absolute z-[-1] bottom-1/5 right-0 bg-foreground w-3/5 h-3/4 rounded-4xl will-change-transform"
        style={{
          WebkitTransformStyle: "preserve-3d",
          transformStyle: "preserve-3d",
        }}
      />
      <MotionImage
        priority
        width={720}
        height={815}
        variants={mainImgVariants}
        alt="포트폴리오 사이트 메인 이미지"
        src="/img/main.webp"
        className="relative origin-bottom z-10 w-full h-auto will-change-transform"
      />
    </motion.div>
  );
}
