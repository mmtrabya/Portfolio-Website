"use client";

import { useMemo, useState } from "react";
import { Calendar, Flame, Folder, GitCommit, Github } from "lucide-react";
import { Section, SectionLabel, SectionPixelTitle } from "./section";
import { GITHUB_URL } from "@/lib/data";
import { cn } from "@/lib/utils";

const USERNAME = "mmtrabya";

type Day = { date: string; level: 0 | 1 | 2 | 3 | 4 };

function generatePlaceholder(): Day[] {
  const days: Day[] = [];
  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() - 364);
  while (start.getDay() !== 0) {
    start.setDate(start.getDate() - 1);
  }
  const cursor = new Date(start);
  const hash = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  };
  while (cursor <= today) {
    const iso = cursor.toISOString().slice(0, 10);
    const v = (hash(iso) % 100) / 100;
    const dow = cursor.getDay();
    const boost = dow === 0 || dow === 6 ? -0.18 : 0.12;
    const score = Math.max(0, Math.min(1, v + boost));
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (score > 0.82) level = 4;
    else if (score > 0.62) level = 3;
    else if (score > 0.42) level = 2;
    else if (score > 0.22) level = 1;
    days.push({ date: iso, level });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

const LEVEL_CLASS: Record<Day["level"], string> = {
  0: "bg-bg-elevated",
  1: "bg-accent-emerald/30",
  2: "bg-accent-emerald/50",
  3: "bg-accent-emerald/75",
  4: "bg-accent-emerald",
};

type StatProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

function StatCard({ icon, value, label }: StatProps) {
  return (
    <div className="glass-panel flex items-center gap-3 p-4 transition-transform hover:-translate-y-0.5 hover:shadow-glow">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
        {icon}
      </span>
      <div>
        <p className="text-2xl font-bold leading-none text-text-primary">
          {value}
        </p>
        <p className="mt-1 text-xs text-text-secondary">{label}</p>
      </div>
    </div>
  );
}

export function GithubActivity() {
  const days = useMemo(() => generatePlaceholder(), []);
  const [tab, setTab] = useState<"heatmap" | "commits">("heatmap");
  const [hovered, setHovered] = useState<Day | null>(null);

  const weeks = useMemo(() => {
    const cols: Day[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      cols.push(days.slice(i, i + 7));
    }
    return cols;
  }, [days]);

  // Derive headline stats from the placeholder data.
  const stats = useMemo(() => {
    const commits = days.reduce((s, d) => s + d.level * 6, 0);
    const activeDays = days.filter((d) => d.level > 0).length;
    let streak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].level > 0) streak++;
      else break;
    }
    return {
      commits,
      streak,
      activeDays,
      repos: 29,
    };
  }, [days]);

  return (
    <Section id="github" className="space-y-10">
      <SectionPixelTitle text="GITHUB" palette="emerald" />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-3">
          <SectionLabel>GitHub Activity</SectionLabel>
          <h2>Contribution tracker</h2>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-1.5 text-sm text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
        >
          <Github className="h-4 w-4" /> @{USERNAME}
        </a>
      </div>

      {/* Stats row */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<GitCommit className="h-5 w-5" />}
          value={stats.commits.toLocaleString()}
          label="Commits"
        />
        <StatCard
          icon={<Flame className="h-5 w-5" />}
          value={`${stats.streak}d`}
          label="Streak"
        />
        <StatCard
          icon={<Calendar className="h-5 w-5" />}
          value={String(stats.activeDays)}
          label="Active Days"
        />
        <StatCard
          icon={<Folder className="h-5 w-5" />}
          value={String(stats.repos)}
          label="Repos"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-lg border border-border-subtle bg-bg-elevated p-1 w-fit">
        <button
          onClick={() => setTab("heatmap")}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            tab === "heatmap"
              ? "bg-accent-emerald/15 text-accent-emerald"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          Heatmap
        </button>
        <button
          onClick={() => setTab("commits")}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            tab === "commits"
              ? "bg-accent-emerald/15 text-accent-emerald"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          Recent Commits
        </button>
      </div>

      <div className="glass-panel p-5">
        {tab === "heatmap" ? (
          <>
            <div className="overflow-x-auto">
              <div className="flex gap-[3px] py-1">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((d) => (
                      <div
                        key={d.date}
                        onMouseEnter={() => setHovered(d)}
                        onMouseLeave={() => setHovered(null)}
                        className={cn(
                          "h-2.5 w-2.5 rounded-[2px] transition-transform hover:scale-150",
                          LEVEL_CLASS[d.level]
                        )}
                        title={`${d.date} — level ${d.level}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-text-secondary">
              <span>
                {stats.activeDays} active days · 53-week snapshot
                {hovered ? (
                  <>
                    {" "}
                    · Hovering:{" "}
                    <span className="text-text-primary">{hovered.date}</span>
                  </>
                ) : null}
              </span>
              <div className="flex items-center gap-2">
                <span>Less</span>
                <span className={cn("h-2.5 w-2.5 rounded-[2px]", LEVEL_CLASS[0])} />
                <span className={cn("h-2.5 w-2.5 rounded-[2px]", LEVEL_CLASS[1])} />
                <span className={cn("h-2.5 w-2.5 rounded-[2px]", LEVEL_CLASS[2])} />
                <span className={cn("h-2.5 w-2.5 rounded-[2px]", LEVEL_CLASS[3])} />
                <span className={cn("h-2.5 w-2.5 rounded-[2px]", LEVEL_CLASS[4])} />
                <span>More</span>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Live commits stream isn&apos;t wired yet — pop over to{" "}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="text-accent-cyan hover:underline"
              >
                @{USERNAME}
              </a>{" "}
              to see the latest activity, pinned repos, and contribution graph.
            </p>
            <p className="text-xs">
              When wired to the GitHub API, this tab streams recent commit
              messages, repo names, and timestamps.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
