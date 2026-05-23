"use client";

import { useCallback, useEffect, useState } from "react";
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
  // We render nothing boot-related on SSR to keep server and client HTML in
  // sync. The inline boot-pre script in <head> covers the screen with a solid
  // black overlay on first visit until this effect decides what to do. For
  // return visitors there's no overlay and no boot screen.
  const [showBoot, setShowBoot] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(BOOT_KEY);
    } catch {
      /* ignore */
    }
    if (!seen) {
      // First visit — mount the React boot screen.
      setShowBoot(true);
    } else {
      // Return visit — remove the pre-paint overlay immediately.
      document.documentElement.classList.remove("booting");
      document.getElementById("boot-pre")?.remove();
      document.getElementById("boot-pre-style")?.remove();
    }
  }, []);

  // When React's BootScreen mounts, remove the pre-paint overlay so it
  // doesn't double-cover. Runs once boot is showing.
  useEffect(() => {
    if (showBoot) {
      document.documentElement.classList.remove("booting");
      document.getElementById("boot-pre")?.remove();
      document.getElementById("boot-pre-style")?.remove();
    }
  }, [showBoot]);

  // Stable reference so BootScreen's animation timers don't reset on
  // every Page re-render.
  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      /* ignore */
    }
    setShowBoot(false);
  }, []);

  return (
    <>
      {showBoot && <BootScreen onDone={finishBoot} />}
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
