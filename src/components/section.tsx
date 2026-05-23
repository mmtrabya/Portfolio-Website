import { cn } from "@/lib/utils";
import { PixelText } from "./pixel-text";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "container-fluid scroll-mt-28 py-16 sm:py-24",
        className
      )}
    >
      {children}
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.25em] text-text-secondary">
      {children}
    </p>
  );
}

// Lucide SVG path data for the icons paired with each section heading.
// These are the same paths Lucide uses internally. The dots morph between
// the word shape and this icon shape based on viewport visibility.
export const SECTION_ICONS = {
  user: [
    "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
    "M12 11A4 4 0 1 0 12 3a4 4 0 0 0 0 8z",
  ],
  code: [
    "m16 18 6-6-6-6",
    "m8 6-6 6 6 6",
  ],
  briefcase: [
    "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z",
    "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
  ],
  folder: [
    "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
  ],
  github: [
    "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
    "M9 18c-4.51 2-5-2-7-2",
  ],
  graduation: [
    "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
    "M22 10v6",
    "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
  ],
  quote: [
    "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1Z",
    "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1Z",
  ],
  mail: [
    "M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z",
    "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
  ],
} as const;

export type SectionIconKey = keyof typeof SECTION_ICONS;

// Giant pixel-scatter section title with shape-shift to icon when out of view.
export function SectionPixelTitle({
  text,
  icon,
  palette = "default",
  height = 200,
  className = "",
}: {
  text: string;
  icon?: SectionIconKey;
  palette?: "default" | "cyan" | "emerald" | "warm";
  height?: number;
  className?: string;
}) {
  const iconPath = icon ? (SECTION_ICONS[icon] as unknown as string[]) : undefined;
  return (
    <div
      className={cn("relative mx-auto w-full select-none", className)}
      style={{ height }}
    >
      <PixelText
        text={text}
        iconPath={iconPath}
        height={height}
        palette={palette}
        density={6}
        dotSize={2.4}
      />
    </div>
  );
}
