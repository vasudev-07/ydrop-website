import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WhatWeSolve from "./components/WhatWeSolve";
import MarketPain from "./components/MarketPain";
import WhatWeDo from "./components/WhatWeDo";
import OurProcess from "./components/OurProcess";
import GetInTouch from "./components/GetInTouch";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <HeroSection />
      <WhatWeSolve />
      <MarketPain />
      <WhatWeDo />
      <OurProcess />
      <GetInTouch />
    </main>
  );
}
