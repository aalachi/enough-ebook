import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Empathy from "@/components/sections/Empathy";
import Reframe from "@/components/sections/Reframe";
import Chapters from "@/components/sections/Chapters";
import RealWomen from "@/components/sections/RealWomen";
import Offer from "@/components/sections/Offer";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Empathy />
        <Reframe />
        <Chapters />
        <RealWomen />
        <Offer />
      </main>
      <Footer />
    </>
  );
}
