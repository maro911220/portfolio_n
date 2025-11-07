"use client";
import { GithubIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import AnimeText from "@/components/ui/anime-text";

// constants
const ANIMATION_DELAYS = {
  TITLE_LINE_1: 0.2,
  TITLE_LINE_2: 0.4,
  SUB_TEXT: 0.5,
  GITHUB_LINK: 0.6,
} as const;

const TITLE_LINES = [
  {
    text: ["welcome", "to", "my"],
    className: `text-[7vw] md:text-[4.5vw] xl:text-6xl leading-none justify-center md:justify-start`,
    delay: ANIMATION_DELAYS.TITLE_LINE_1,
  },
  {
    text: ["portfolio"],
    className: `text-[12vw] md:text-[7vw] xl:text-8xl leading-none justify-center md:justify-start`,
    delay: ANIMATION_DELAYS.TITLE_LINE_2,
  },
];

const SUB_TEXT = ["안녕하세요 ", "MARO의", "포트폴리오 페이지 입니다."];

// HeroText
export default function HeroText() {
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <motion.div
      style={{ translateY }}
      className="flex-1 lg:flex-none w-full lg:w-auto space-y-6  sm:space-y-10 mb-10 text-center md:text-left lg:mb-20 will-change-transform"
    >
      <TextContent />
      <GithubLink />
    </motion.div>
  );
}

// TextContent
function TextContent() {
  return (
    <>
      <h2 className="uppercase font-bold fs-bungee">
        {TITLE_LINES.map((line) => (
          <AnimeText
            key={line.text.join("-")}
            text={line.text}
            delay={line.delay}
            className={line.className}
          />
        ))}
      </h2>
      <div>
        <AnimeText
          delay={ANIMATION_DELAYS.SUB_TEXT}
          text={SUB_TEXT}
          className="text-lg sm:text-xl xl:text-2xl font-semibold justify-center md:justify-start"
        />
      </div>
    </>
  );
}

// GithubLink
function GithubLink() {
  return (
    <motion.a
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        duration: 1,
        delay: ANIMATION_DELAYS.GITHUB_LINK,
      }}
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/maro911220"
      aria-label="GitHub 프로필 보기"
      className="inline-flex items-center gap-2"
    >
      <span className="inline-flex p-2 bg-foreground rounded-xl">
        <GithubIcon className="text-background w-4 h-4 md:w-6 md:h-6" />
      </span>
      <span className="text-base md:text-xl fs-bungee">github</span>
    </motion.a>
  );
}
