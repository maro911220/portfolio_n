"use client";
import AnimeButton from "@/components/ui/anime-button";
import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import SectionTitle from "@/components/ui/section-title";
import Alert from "@/components/ui/alert";
import type { SendStatus, FormField, ContactFormData } from "@/types/contact";

// constants
const AUTO_HIDE_DELAY = 3000;
const FORM_FIELDS: FormField[] = [
  {
    id: "name",
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "이름을 입력해주세요",
  },
  {
    id: "email",
    name: "email",
    label: "E-mail",
    type: "email",
    placeholder: "이메일을 입력해주세요",
  },
  {
    id: "message",
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "내용을 입력해주세요",
    rows: 5,
  },
];

// Animation variants
const contentVariants = {
  init: { opacity: 0, y: 50 },
  view: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const formVariants = {
  init: { opacity: 0, y: 50 },
  view: { opacity: 1, y: 0 },
};

// ContactContent
export default function ContactContent() {
  const [status, setStatus] = useState<SendStatus>("idle");
  const [resultMessage, setResultMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Alert 처리
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        setStatus("idle");
        setResultMessage("");
      }, AUTO_HIDE_DELAY);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 전송 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    // 검증 로직
    if (!data.name.trim()) {
      setStatus("error");
      setResultMessage("이름을 입력해주세요.");
      return;
    }

    if (!data.email.trim() || !isValidEmail(data.email)) {
      setStatus("error");
      setResultMessage("올바른 이메일을 입력해주세요.");
      return;
    }

    if (!data.message.trim()) {
      setStatus("error");
      setResultMessage("메시지를 입력해주세요.");
      return;
    }

    setStatus("loading");
    setResultMessage("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        formRef.current?.reset();
        setResultMessage("메시지가 성공적으로 전송되었습니다!");
      } else {
        setStatus("error");
        setResultMessage(result.error || "전송에 실패했습니다.");
      }
    } catch (error) {
      setStatus("error");
      setResultMessage("네트워크 오류가 발생했습니다.");
    }
  };

  const isLoading = status === "loading";
  const showAlert = status === "success" || status === "error";

  return (
    <motion.div
      initial="init"
      whileInView="view"
      variants={contentVariants}
      viewport={{ amount: 0.2, once: true }}
      className="bg-foreground rounded-4xl px-6 py-12 sm:px-12 sm:py-20 md:p-26"
    >
      <SectionTitle
        text={["Contact"]}
        className="text-background justify-center"
      />
      <motion.div
        variants={formVariants}
        className="max-w-xl mx-auto mt-8 sm:mt-16"
      >
        <form
          noValidate
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 sm:space-y-8"
        >
          {/* 반복문으로 필드 렌더링 */}
          {FORM_FIELDS.map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block font-medium text-xs sm:text-sm md:text-base text-background mb-2 fs-bungee"
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  name={field.name}
                  required
                  rows={field.rows}
                  disabled={isLoading}
                  className="w-full p-3 text-sm sm:text-base md:text-lg bg-card rounded-xl disabled:opacity-50 resize-none"
                  placeholder={field.placeholder}
                  aria-label={field.label}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  required
                  disabled={isLoading}
                  className="w-full text-sm sm:text-base md:text-lg p-3 bg-card rounded-xl disabled:opacity-50"
                  placeholder={field.placeholder}
                  aria-label={field.label}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <AnimeButton
              point
              type="submit"
              buttonType="button"
              disabled={isLoading}
              className="w-full justify-center"
              text={isLoading ? "Sending..." : "Send"}
            />
          </div>
        </form>
        {/* Alert */}
        <Alert visible={showAlert} type={status} text={resultMessage} />
      </motion.div>
    </motion.div>
  );
}
