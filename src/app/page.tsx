"use client";

import { useEffect, useState } from "react";
import { About } from "@/components/about";
import { BackToTop } from "@/components/back-to-top";
import { BootScreen } from "@/components/boot-screen";
import { CommandPalette } from "@/components/command-palette";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { GithubActivity } from "@/components/github-activity";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Testimonials } from "@/components/testimonials";

const BOOT_KEY = "boot-seen";

export default function Page() {
  const [showBoot, setShowBoot] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const seen = sessionStorage.getItem(BOOT_KEY);
    if (!seen) setShowBoot(true);
  }, []);

  const finishBoot = () => {
    sessionStorage.setItem(BOOT_KEY, "1");
    setShowBoot(false);
  };

  return (
    <>
      {hydrated && showBoot && <BootScreen onDone={finishBoot} />}
      <Header onOpenCommand={() => setPaletteOpen(true)} />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GithubActivity />
        <Education />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
