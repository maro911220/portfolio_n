"use client";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import type { HistoryListProps, HistoryBoxProps } from "@/types/about";

// Animation variants
const historyVariants: Variants = {
  view: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const historyBoxVariants: Variants = {
  init: { opacity: 0, y: 100, rotate: 10 },
  view: {
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

// HistoryList
export default function HistoryList({ history }: HistoryListProps) {
  return (
    <motion.div
      initial="init"
      whileInView="view"
      variants={historyVariants}
      viewport={{ amount: 0.5, once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8"
    >
      {history.map((sectionData) => (
        <HistoryBox key={sectionData._id} sectionData={sectionData} />
      ))}
    </motion.div>
  );
}

// HistoryBox
function HistoryBox({ sectionData }: HistoryBoxProps) {
  return (
    <motion.div
      variants={historyBoxVariants}
      className="space-y-2 text-center w-full bg-card py-10 rounded-2xl will-change-transform"
    >
      <Image
        width={72}
        height={72}
        loading="lazy"
        alt={`${sectionData.title} 아이콘`}
        src={`/img/icon/${sectionData.icon}.png`}
        className="mx-auto mt-4 mb-6"
      />
      <p className="text-xl lg:text-2xl fs-bungee font-bold mb-4">
        {sectionData.title}
      </p>
      {sectionData.list.map((detailItem) => (
        <div
          className="text-sm sm:text-base lg:text-lg font-semibold"
          key={detailItem.date}
        >
          <p>{detailItem.date}</p>
          <p>{detailItem.text}</p>
        </div>
      ))}
    </motion.div>
  );
}
