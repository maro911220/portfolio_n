import Hero from "./_components/hero/hero";
import About from "./_components/about/about";
import Work from "./_components/work/work";
import Contact from "./_components/contact/contact";

// Home
export default function Home() {
  return (
    <main className="pt-20 sm:pt-25">
      <h1 className="sr-only">MARO의 포트폴리오 페이지</h1>
      <Hero />
      <About />
      <Work />
      <Contact />
    </main>
  );
}
