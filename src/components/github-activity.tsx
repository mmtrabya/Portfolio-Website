"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, Flame, Folder, GitCommit, Github } from "lucide-react";
import { Section, SectionLabel, SectionPixelTitle } from "./section";
import { GITHUB_URL } from "@/lib/data";
import { cn } from "@/lib/utils";

const USERNAME = "mmtrabya";

// Public API that mirrors GitHub's contribution graph (no auth required).
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;
const USER_API = `https://api.github.com/users/${USERNAME}`;

// Platane/snk generates this SVG via a daily GitHub Action that runs in
// your Portfolio-Website repo. It produces a snake animation eating the
// contribution cells. See .github/workflows/snake.yml.
const SNAKE_SVG_URL = `https://raw.githubusercontent.com/${USERNAME}/Portfolio-Website/output/github-snake-dark.svg`;

type ApiDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionsApiResponse = {
  total: Record<string, number>;
  contributions: ApiDay[];
};

const LEVEL_CLASS: Record<ApiDay["level"], string> = {
  0: "bg-bg-elevated",
  1: "bg-accent-emerald/30",
  2: "bg-accent-emerald/55",
  3: "bg-accent-emerald/80",
  4: "bg-accent-emerald",
};

type StatProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  loading?: boolean;
};

function StatCard({ icon, value, label, loading }: StatProps) {
  return (
    <div className="glass-panel flex items-center gap-3 p-4 transition-transform hover:-translate-y-0.5 hover:shadow-glow">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
        {icon}
      </span>
      <div>
        <p
          className={cn(
            "text-2xl font-bold leading-none text-text-primary",
            loading && "animate-pulse text-text-secondary"
          )}
        >
          {loading ? "—" : value}
        </p>
        <p className="mt-1 text-xs text-text-secondary">{label}</p>
      </div>
    </div>
  );
}

export function GithubActivity() {
  const [days, setDays] = useState<ApiDay[] | null>(null);
  const [repoCount, setRepoCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"heatmap" | "snake">("heatmap");
  const [hovered, setHovered] = useState<ApiDay | null>(null);
  const [snakeOk, setSnakeOk] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [contribRes, userRes] = await Promise.all([
          fetch(CONTRIBUTIONS_API),
          fetch(USER_API),
        ]);
        if (!contribRes.ok) throw new Error(`Contributions: ${contribRes.status}`);
        const contribJson = (await contribRes.json()) as ContributionsApiResponse;
        if (cancelled) return;
        setDays(contribJson.contributions ?? []);

        if (userRes.ok) {
          const userJson = (await userRes.json()) as { public_repos?: number };
          if (!cancelled) setRepoCount(userJson.public_repos ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load");
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Group days into weeks (columns of 7).
  const weeks = useMemo(() => {
    if (!days) return [];
    // Pad so the first day of the array aligns with Sunday.
    const first = days[0];
    if (!first) return [];
    const firstDow = new Date(first.date).getDay(); // 0 = Sun
    const padded: (ApiDay | null)[] = Array(firstDow).fill(null).concat(days);
    const cols: (ApiDay | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      cols.push(padded.slice(i, i + 7));
    }
    return cols;
  }, [days]);

  const stats = useMemo(() => {
    if (!days) return null;
    const commits = days.reduce((s, d) => s + d.count, 0);
    const activeDays = days.filter((d) => d.count > 0).length;
    // Current streak: count back from most recent day until level === 0.
    let streak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) streak++;
      else break;
    }
    return { commits, streak, activeDays };
  }, [days]);

  const loading = !days && !error;

  return (
    <Section id="github" className="space-y-10">
      <SectionPixelTitle text="GITHUB" icon="github" palette="emerald" />
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

      {/* Stats row — derived from real GitHub data. */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<GitCommit className="h-5 w-5" />}
          value={stats ? stats.commits.toLocaleString() : ""}
          label="Contributions (last 12 mo)"
          loading={loading}
        />
        <StatCard
          icon={<Flame className="h-5 w-5" />}
          value={stats ? `${stats.streak}d` : ""}
          label="Current Streak"
          loading={loading}
        />
        <StatCard
          icon={<Calendar className="h-5 w-5" />}
          value={stats ? String(stats.activeDays) : ""}
          label="Active Days"
          loading={loading}
        />
        <StatCard
          icon={<Folder className="h-5 w-5" />}
          value={repoCount !== null ? String(repoCount) : ""}
          label="Public Repos"
          loading={repoCount === null && !error}
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
          onClick={() => setTab("snake")}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            tab === "snake"
              ? "bg-accent-emerald/15 text-accent-emerald"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          🐍 Snake
        </button>
      </div>

      <div className="glass-panel p-5">
        {tab === "heatmap" ? (
          loading ? (
            <div className="grid place-items-center py-10 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent-emerald" />
                Loading contributions…
              </div>
            </div>
          ) : error ? (
            <div className="py-6 text-center text-sm text-text-secondary">
              Couldn’t load live contributions ({error}). Head over to{" "}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="text-accent-cyan hover:underline"
              >
                @{USERNAME}
              </a>{" "}
              to see the graph directly.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <div className="flex gap-[3px] py-1">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((d, di) =>
                        d ? (
                          <div
                            key={d.date}
                            onMouseEnter={() => setHovered(d)}
                            onMouseLeave={() => setHovered(null)}
                            className={cn(
                              "h-2.5 w-2.5 rounded-[2px] transition-transform hover:scale-150",
                              LEVEL_CLASS[d.level]
                            )}
                            title={`${d.date} — ${d.count} contribution${d.count === 1 ? "" : "s"}`}
                          />
                        ) : (
                          <div
                            key={`pad-${wi}-${di}`}
                            className="h-2.5 w-2.5 rounded-[2px] opacity-0"
                          />
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-text-secondary">
                <span>
                  {stats?.activeDays} active days · last 12 months
                  {hovered ? (
                    <>
                      {" "}
                      · Hovering:{" "}
                      <span className="text-text-primary">
                        {hovered.date} ({hovered.count}{" "}
                        contribution{hovered.count === 1 ? "" : "s"})
                      </span>
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
          )
        ) : (
          // Snake tab: the SVG is generated daily by the snake workflow.
          <div className="space-y-3">
            {snakeOk ? (
              <div className="overflow-x-auto rounded-lg bg-bg-main/40 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SNAKE_SVG_URL}
                  alt={`Snake eating @${USERNAME}'s GitHub contributions`}
                  className="block w-full min-w-[640px]"
                  onError={() => setSnakeOk(false)}
                />
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border-subtle bg-bg-elevated p-6 text-sm text-text-secondary">
                <p className="font-medium text-text-primary">
                  🐍 Snake not generated yet.
                </p>
                <p className="mt-2">
                  Run the{" "}
                  <code className="rounded bg-bg-secondary px-1.5 py-0.5 text-xs">
                    Generate Snake
                  </code>{" "}
                  GitHub Action once in your repo (Actions tab → Generate Snake →
                  Run workflow) and it will commit{" "}
                  <code className="text-xs">github-snake-dark.svg</code> to the{" "}
                  <code className="text-xs">output</code> branch. After that,
                  this snake animates daily on its own.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
