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

// Synchronously decide whether boot screen should show. We can read
// sessionStorage in module scope on the client (it's a "use client" file),
// but during SSR sessionStorage doesn't exist — so we default to "show boot"
// on the server so the initial HTML covers the screen with the boot overlay.
function initialShowBoot(): boolean {
  if (typeof window === "undefined") return true; // SSR — render boot
  try {
    return !sessionStorage.getItem(BOOT_KEY);
  } catch {
    return false;
  }
}

export default function Page() {
  const [showBoot, setShowBoot] = useState<boolean>(initialShowBoot);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    // Once React owns the boot screen, remove the pre-paint overlay set by the
    // theme-bootstrap script in <head>.
    document.documentElement.classList.remove("booting");
    const pre = document.getElementById("boot-pre");
    if (pre) pre.remove();
    const preStyle = document.getElementById("boot-pre-style");
    if (preStyle) preStyle.remove();
  }, []);

  const finishBoot = () => {
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      // sessionStorage may be unavailable (e.g. privacy mode)
    }
    setShowBoot(false);
  };

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
