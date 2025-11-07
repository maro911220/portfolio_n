"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, type Variants } from "motion/react";
import type { AnimeButtonProps } from "@/types/ui";

// Motion 컴포넌트
const MotionLink = motion.create(Link);
const MotionA = motion.a;
const MotionButton = motion.button;

// Animation variants
const buttonVariants: Variants = {
  view: {
    transition: {
      when: "beforeChildren",
      delayChildren: 0.2,
      staggerChildren: 0.3,
    },
  },
  hover: {
    scale: 1.02,
  },
};

const buttonBgVariants: Variants = {
  init: {
    opacity: 0,
    scaleX: 0.3,
    background: "var(--button-bg)",
    transition: {
      type: "spring",
      duration: 1,
    },
  },
  view: {
    opacity: 1,
    scaleX: 1,
  },
  hover: { background: "var(--button-point)" },
};

const buttonTextVariants: Variants = {
  init: {
    opacity: 0,
    y: 5,
  },
  view: {
    opacity: 1,
    y: 0,
  },
};

// AnimeButton
export default function AnimeButton({
  type,
  text,
  href,
  point,
  onClick,
  buttonType,
  className,
  disabled = false,
}: AnimeButtonProps) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // 공통 props
  const commonProps = {
    initial: "init",
    whileInView: "view",
    whileHover: isAnimationComplete ? "hover" : undefined,
    variants: buttonVariants,
    viewport: { once: true, amount: 0.5 },
    onAnimationComplete: () => setIsAnimationComplete(true),
    className: `relative inline-flex p-4 ${className} ${disabled ? "pointer-events-none" : "cursor-pointer"} ${!isAnimationComplete ? "pointer-events-none" : ""}`,
    disabled,
  };

  // CSS 변수 클래스
  const bgColorClass = point
    ? "[--button-bg:var(--point)] [--button-point:var(--point)]"
    : "[--button-bg:var(--foreground)] [--button-point:var(--point)]";

  const textColorClass = point ? "text-white" : "text-background";

  // 컴포넌트 내용
  const content = (
    <>
      <motion.span
        aria-hidden="true"
        variants={buttonBgVariants}
        className={`absolute top-0 left-0 w-full h-full rounded-2xl ${bgColorClass}`}
      />
      <motion.span
        variants={buttonTextVariants}
        className={`relative z-10 fs-bungee text-base sm:text-lg will-change-transform ${textColorClass}`}
      >
        {text}
      </motion.span>
    </>
  );

  // Link와 a
  if (buttonType === "link" || buttonType === "a") {
    const Component = buttonType === "link" ? MotionLink : MotionA;
    const linkProps =
      buttonType === "a"
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
      <Component {...commonProps} href={href!} {...linkProps}>
        {content}
      </Component>
    );
  }

  // button
  return (
    <MotionButton
      {...commonProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </MotionButton>
  );
}
