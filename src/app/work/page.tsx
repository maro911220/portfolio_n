import SectionTitle from "@/components/ui/section-title";
import AnimeButton from "@/components/ui/anime-button";
import WorkContent from "./_components/work-content";

// Page
export default function Page() {
  return (
    <main className="pt-20 sm:pt-25">
      <h1 className="sr-only">MARO의 Work 페이지</h1>
      <section className="container space-y-10 sm:space-y-14 lg:space-y-16 overflow-hidden">
        <SectionTitle text={["Work"]} delay={0} />
        <WorkContent />
        <div className="text-center">
          <AnimeButton buttonType="link" text="Back Home" href="/" />
        </div>
      </section>
    </main>
  );
}
