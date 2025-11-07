"use client";
import { motion } from "motion/react";

// AboutText
export default function AboutText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.5, once: true }}
      transition={{ duration: 1, type: "spring", delay: 0.3 }}
      className="max-w-2xl mx-auto space-y-4 text-base sm:text-lg text-center font-semibold break-keep"
    >
      <p>
        안녕하세요 저는 <span className="fs-bungee text-point">MARO</span>{" "}
        입니다.
      </p>
      <p>
        3D 모델러 및 애니메이터로 일한 경험이 있으며 현재는 웹퍼블리셔로 일하고
        있습니다.
      </p>
      <p>
        애니메이션 라이브러리를 사용해 애니메이션이 적용된 웹 페이지를 만드는 걸
        좋아하며 자연스러운 사용자 경험을 만드는 퍼블리셔/프론트엔드 개발자를
        목표로 공부하고 있습니다.
      </p>
    </motion.div>
  );
}
