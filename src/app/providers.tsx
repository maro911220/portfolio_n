"use client";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

// Lenis 스크롤 설정
const LENIS_OPTIONS = {
  lerp: 0.1,
  duration: 1.2,
} as const;

// 페이지 이동 시 스크롤 리셋
function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

// Providers
export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ScrollReset />
      <ReactLenis root options={LENIS_OPTIONS}>
        {children}
      </ReactLenis>
    </ThemeProvider>
  );
}
