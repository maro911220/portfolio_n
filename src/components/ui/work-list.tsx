"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { WorkListProps, WorkCardProps } from "@/types/work";

// constants
const GRID_DELAY_OFFSET = 0.2;
const EAGER_LOAD_COUNT = 4;

// WorkList
export default function WorkList({ workData, useFilter }: WorkListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const uniqueCategories = Array.from(
    new Set(workData.map((work) => work.category).filter(Boolean))
  );
  const categories = ["all", ...uniqueCategories];
  const filteredWorks =
    selectedCategory === "all"
      ? workData
      : workData.filter((work) => work.category === selectedCategory);

  return (
    <>
      {/* 필터 UI */}
      {useFilter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap items-end justify-between gap-2"
        >
          <p>
            <span className="fs-bungee">{selectedCategory}</span>
            <span className="mx-1">/</span>
            <span className="font-bold text-point">{filteredWorks.length}</span>
            개의 프로젝트
          </p>
          {/* 카테고리 셀렉트박스 */}
          <div className="min-w-32 relative ml-auto">
            <label htmlFor="category-select" className="sr-only">
              카테고리 선택
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="fs-bungee appearance-none w-full pt-3 pb-2.5 px-3 bg-card rounded-lg cursor-pointer leading-none foucs:outline-2"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2 pointer-events-none" />
          </div>
        </motion.div>
      )}
      {/* 리스트 */}
      <AnimatePresence>
        {filteredWorks.length > 0 ? (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8"
          >
            {filteredWorks.map((data, index) => (
              <WorkCard workData={data} index={index} key={data._id} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <p className="text-xl font-semibold text-foreground/60">
              해당 카테고리에 프로젝트가 없습니다
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// WorkCard
function WorkCard({ workData, index }: WorkCardProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const delay = isDesktop ? (index % 2) * GRID_DELAY_OFFSET : 0;

  return (
    <motion.a
      initial={{ opacity: 0, rotate: 15, y: 100 }}
      whileHover={{ scale: 1.04 }}
      viewport={{ amount: 0.3, once: true }}
      transition={{ duration: 0.5, type: "spring" }}
      whileInView={{
        opacity: 1,
        rotate: 0,
        y: 0,
        transition: { delay },
      }}
      href={workData.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${workData.name} 프로젝트 보기`}
      className="bg-card p-4 flex flex-col justify-between rounded-2xl"
    >
      <div className="relative flex-none w-full h-auto rounded-2xl overflow-hidden">
        <Image
          width={720}
          height={540}
          src={workData.src}
          className="object-cover"
          alt={`${workData.name} poster`}
          loading={index < EAGER_LOAD_COUNT ? "eager" : "lazy"}
        />
      </div>
      <div className="p-4 flex-1">
        <p className="font-bold text-2xl lg:text-3xl mb-2">{workData.name}</p>
        <p className="text-base lg:text-lg font-semibold">
          {workData.category === "study" && "[개인 프로젝트] "}
          {workData.sub}
        </p>
      </div>
      <div className="p-4 pt-0 flex-none flex flex-wrap gap-1">
        {workData.type.map((item, index) => {
          return (
            <span
              className="px-4 py-1 text-sm rounded-2xl border"
              key={item + index}
            >
              {item}
            </span>
          );
        })}
      </div>
    </motion.a>
  );
}
