"use client";
import { motion } from "motion/react";
import HeaderLogo from "./header-logo";
import ThemeToggle from "@/components/theme-toggle";

// Header
export default function Header() {
  return (
    <header className="fixed z-50 top-0 w-full h-20 sm:h-25 bg-background/20 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="max-w-header mx-auto px-4 md:px-6 lg:px-10 h-full flex items-center justify-between"
      >
        <HeaderLogo />
        <ThemeToggle />
      </motion.div>
    </header>
  );
}
