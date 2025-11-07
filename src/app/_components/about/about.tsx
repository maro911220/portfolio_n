import AboutText from "./about-text";
import AboutHistory from "./about-history";
import SectionTitle from "@/components/ui/section-title";

// About
export default function About() {
  return (
    <section className="container space-y-10 sm:space-y-14 lg:space-y-16 overflow-hidden">
      <SectionTitle
        text={["About"]}
        className="justify-center mt-10 sm:mt-20"
      />
      <AboutText />
      <AboutHistory />
    </section>
  );
}
