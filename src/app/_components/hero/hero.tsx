import HeroText from "./hero-text";
import HeroImg from "./hero-img";

// Hero
export default function Hero() {
  return (
    <section className="container flex items-center justify-between gap-5 flex-col-reverse md:flex-row">
      <HeroText />
      <HeroImg />
    </section>
  );
}
