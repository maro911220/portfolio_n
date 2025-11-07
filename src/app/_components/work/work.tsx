import SectionTitle from "@/components/ui/section-title";
import WorkContent from "./work-content";

// Work
export default function Work() {
  return (
    <section className="container space-y-10 sm:space-y-14 lg:space-y-16 overflow-hidden">
      <SectionTitle text={["Work"]} className="mt-10 sm:mt-20" />
      <WorkContent />
    </section>
  );
}
