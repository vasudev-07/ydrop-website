import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TechMarquee from "./components/TechMarquee";
import WhatWeSolve from "./components/WhatWeSolve";
import MarketPain from "./components/MarketPain";
import BentoServices from "./components/BentoServices";
import GrowthOS from "./components/GrowthOS";
import ProcessRoadmap from "./components/ProcessRoadmap";
import SiteFixer from "./components/SiteFixer";
import FAQ from "./components/FAQ";
import GetInTouch from "./components/GetInTouch";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <HeroSection />
      <TechMarquee />
      <WhatWeSolve />
      <MarketPain />
      <BentoServices />
      <GrowthOS />
      <ProcessRoadmap />
      <SiteFixer />
      <FAQ />
      <GetInTouch />
    </main>
  );
}
