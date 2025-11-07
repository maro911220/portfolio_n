import AnimeText from "@/components/ui/anime-text";
import type { SectionTitleProps } from "@/types/ui";

// SectionTitle
export default function SectionTitle({
  text,
  className = "",
  delay = 0.2,
  as: Tag = "h2",
}: SectionTitleProps) {
  return (
    <Tag className="text-4xl sm:text-5xl lg:text-6xl fs-bungee font-bold leading-none">
      <AnimeText text={text} className={className} delay={delay} />
    </Tag>
  );
}
