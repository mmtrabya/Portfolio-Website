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
        "mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24 lg:px-8",
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

// Giant pixel-scatter section title.
export function SectionPixelTitle({
  text,
  palette = "default",
  height = 200,
  className = "",
}: {
  text: string;
  palette?: "default" | "cyan" | "emerald" | "warm";
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full select-none",
        className
      )}
      style={{ height }}
    >
      <PixelText
        text={text}
        height={height}
        palette={palette}
        density={6}
        dotSize={2.4}
      />
    </div>
  );
}
