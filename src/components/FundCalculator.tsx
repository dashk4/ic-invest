"use client";

import { useId, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { Counter } from "./ui/Counter";
import { useLocale, pick, type Locale } from "@/lib/locale";

export type FundCalculatorContext = {
  name: string;
  code: string;
  nav?: number | null;
};

/* ---------- math ---------- */

type Frequency = "daily" | "monthly" | "quarterly" | "semiannual";

const PERIODS_PER_YEAR: Record<Frequency, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  semiannual: 2,
};

type SimPoint = { months: number; total: number; own: number };

function simulate(
  initial: number,
  contribution: number,
  ratePct: number,
  frequency: Frequency,
  termMonths: number
): SimPoint[] {
  const periodsPerYear = PERIODS_PER_YEAR[frequency];
  const numPeriods = Math.max(1, Math.round((termMonths * periodsPerYear) / 12));
  const ratePerPeriod = ratePct / 100 / periodsPerYear;

  const raw: SimPoint[] = [{ months: 0, total: initial, own: initial }];
  let total = initial;
  let own = initial;
  for (let i = 1; i <= numPeriods; i++) {
    total = total * (1 + ratePerPeriod) + contribution;
    own = own + contribution;
    raw.push({ months: (i * 12) / periodsPerYear, total, own });
  }

  // downsample for a smooth, cheap-to-render path — the endpoints and the
  // exact final tally are always preserved, only the intermediate curve is thinned
  const MAX_POINTS = 60;
  if (raw.length <= MAX_POINTS) return raw;
  const step = (raw.length - 1) / (MAX_POINTS - 1);
  const sampled: SimPoint[] = [];
  for (let i = 0; i < MAX_POINTS; i++) {
    sampled.push(raw[Math.round(i * step)]);
  }
  sampled[sampled.length - 1] = raw[raw.length - 1];
  return sampled;
}

/* ---------- number formatting ---------- */

function formatInt(n: number) {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function niceNum(range: number, round: boolean) {
  if (range <= 0) return 1;
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / Math.pow(10, exponent);
  let niceFraction: number;
  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }
  return niceFraction * Math.pow(10, exponent);
}

function niceTicks(max: number, targetCount = 6): number[] {
  if (max <= 0) return [0];
  const step = niceNum(max / targetCount, true);
  const niceMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= niceMax + 1e-9; v += step) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

/* ---------- small inputs ---------- */

function AmountField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-on-strong-subtle">{label}</span>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-[color:var(--c-line-strong)] bg-white/[0.035] px-4 py-3.5 transition-all duration-300 focus-within:border-accent-on-dark/60 focus-within:bg-accent-on-dark/[0.05]">
        <input
          type="text"
          inputMode="numeric"
          value={formatInt(value)}
          onChange={(e) => {
            const digits = e.target.value.replace(/[^\d]/g, "");
            onChange(digits === "" ? 0 : Math.min(Number(digits), 999_999_999));
          }}
          className="t-numeral w-full bg-transparent text-lg text-on-strong outline-none"
        />
        <span className="text-on-strong-subtle">₮</span>
      </div>
    </label>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const gridCols = options.length >= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2";

  return (
    <div className={`grid gap-2 ${gridCols}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`eyebrow rounded-lg border px-3 py-3 text-center transition-all duration-300 ${
            value === opt.value
              ? "border-accent-on-dark bg-accent-on-dark text-[color:var(--ink-900)] shadow-[0_8px_24px_rgba(111,191,163,0.16)]"
              : "border-[color:var(--c-line-strong)] text-on-strong-subtle hover:-translate-y-0.5 hover:border-accent-on-dark/50 hover:bg-white/[0.06] hover:text-on-strong"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Slider({
  min,
  max,
  step,
  value,
  onChange,
  minLabel,
  maxLabel,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  minLabel: string;
  maxLabel: string;
}) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          accentColor: "var(--jade-400)",
          background: `linear-gradient(to right, var(--jade-400) ${progress}%, rgba(255,255,255,0.14) ${progress}%)`,
        }}
        className="h-2 w-full cursor-pointer appearance-none rounded-full"
      />
      <div className="eyebrow mt-2 flex justify-between text-on-strong-subtle">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

/* ---------- chart ---------- */

const W = 720;
const H = 360;
const MARGIN = { top: 20, right: 16, bottom: 32, left: 62 };
const PLOT_W = W - MARGIN.left - MARGIN.right;
const PLOT_H = H - MARGIN.top - MARGIN.bottom;

function Chart({
  points,
  xMax,
  unit,
  locale,
}: {
  points: SimPoint[];
  xMax: number;
  unit: "months" | "years";
  locale: Locale;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const gradId = useId();

  const displayPoints = useMemo(
    () => points.map((p) => ({ ...p, x: unit === "years" ? p.months / 12 : p.months })),
    [points, unit]
  );

  const yMaxRaw = Math.max(...points.map((p) => p.total), 1);
  const yTicks = niceTicks(yMaxRaw, 5);
  const yMax = yTicks[yTicks.length - 1];

  const xTicks =
    xMax <= 15
      ? Array.from({ length: Math.ceil(xMax) + 1 }, (_, i) => i)
      : niceTicks(xMax, 6);

  const scaleX = (v: number) => MARGIN.left + (v / xMax) * PLOT_W;
  const scaleY = (v: number) => H - MARGIN.bottom - (v / yMax) * PLOT_H;

  const linePath = (key: "total" | "own") =>
    "M " + displayPoints.map((p) => `${scaleX(p.x)},${scaleY(p[key])}`).join(" L ");

  const areaPath =
    linePath("total") +
    ` L ${scaleX(displayPoints[displayPoints.length - 1].x)},${scaleY(0)}` +
    ` L ${scaleX(displayPoints[0].x)},${scaleY(0)} Z`;

  function handleMove(e: React.PointerEvent<SVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const svgX = relX * W;
    const dataX = ((svgX - MARGIN.left) / PLOT_W) * xMax;
    let nearest = 0;
    let bestDist = Infinity;
    displayPoints.forEach((p, i) => {
      const d = Math.abs(p.x - dataX);
      if (d < bestDist) {
        bestDist = d;
        nearest = i;
      }
    });
    setHover(nearest);
  }

  const hp = hover != null ? displayPoints[hover] : null;
  const hoverPxFrac = hp ? scaleX(hp.x) / W : 0;
  const tooltipTransform =
    hoverPxFrac < 0.14 ? "translateX(0%)" : hoverPxFrac > 0.86 ? "translateX(-100%)" : "translateX(-50%)";

  const periodLabel = (p: SimPoint) => {
    if (unit === "years") {
      const years = p.months / 12;
      const rounded = Math.round(years * 10) / 10;
      return `${rounded} ${pick(locale, "жил", "yr")}`;
    }
    return `${Math.round(p.months)} ${pick(locale, "сар", "mo")}`;
  };

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none"
        onPointerMove={handleMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`area-${gradId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--jade-400)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--jade-400)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={MARGIN.left}
              x2={W - MARGIN.right}
              y1={scaleY(t)}
              y2={scaleY(t)}
              stroke="var(--c-line-strong)"
              strokeWidth={1}
            />
            <text
              x={MARGIN.left - 10}
              y={scaleY(t)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-[color:var(--c-on-strong-subtle)]"
              fontSize={11}
            >
              {formatInt(t)}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text
            key={t}
            x={scaleX(t)}
            y={H - MARGIN.bottom + 20}
            textAnchor="middle"
            className="fill-[color:var(--c-on-strong-subtle)]"
            fontSize={11}
          >
            {t}
          </text>
        ))}

        {/* area + total line */}
        <path d={areaPath} fill={`url(#area-${gradId})`} stroke="none" />
        <motion.path
          initial={{ pathLength: 0, opacity: 0.35 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          d={linePath("total")}
          fill="none"
          stroke="var(--jade-400)"
          strokeWidth={3}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 7px rgba(111,191,163,0.35))" }}
        />
        {/* own-contribution line */}
        <path
          d={linePath("own")}
          fill="none"
          stroke="var(--c-on-strong-muted)"
          strokeWidth={2}
          strokeDasharray="7 6"
          strokeLinecap="round"
        />

        {/* crosshair + markers */}
        {hp && (
          <g>
            <line
              x1={scaleX(hp.x)}
              x2={scaleX(hp.x)}
              y1={MARGIN.top}
              y2={H - MARGIN.bottom}
              stroke="var(--c-line-strong)"
              strokeWidth={1}
            />
            <circle
              cx={scaleX(hp.x)}
              cy={scaleY(hp.total)}
              r={5}
              fill="var(--jade-400)"
              stroke="var(--c-surface-strong)"
              strokeWidth={2}
            />
            <circle
              cx={scaleX(hp.x)}
              cy={scaleY(hp.own)}
              r={5}
              fill="var(--c-on-strong-muted)"
              stroke="var(--c-surface-strong)"
              strokeWidth={2}
            />
          </g>
        )}

        {/* transparent hit layer, covers the full plot so hover works everywhere */}
        <rect
          x={MARGIN.left}
          y={MARGIN.top}
          width={PLOT_W}
          height={PLOT_H}
          fill="transparent"
          onPointerMove={handleMove}
          onPointerLeave={() => setHover(null)}
        />
      </svg>

      {hp && (
        <div
          className="pointer-events-none absolute top-2 z-10 min-w-[11rem] rounded-xl p-4 shadow-2xl"
          style={{
            left: `${hoverPxFrac * 100}%`,
            transform: tooltipTransform,
            background: "var(--bone-100)",
            color: "var(--ink-800)",
          }}
        >
          <p className="eyebrow text-[color:var(--ink-800)] opacity-60">{periodLabel(hp)}</p>
          <div className="mt-2 space-y-1.5">
            <p className="flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-1.5 opacity-70">
                <span className="h-2 w-2 rounded-full" style={{ background: "var(--jade-500)" }} />
                {pick(locale, "Нийт үр дүн", "Total value")}
              </span>
              <span className="t-numeral font-semibold">{formatInt(hp.total)}₮</span>
            </p>
            <p className="flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-1.5 opacity-70">
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                  <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth={2} strokeDasharray="3 2.5" />
                </svg>
                {pick(locale, "Өөрийн оруулсан", "Contributed")}
              </span>
              <span className="t-numeral font-semibold">{formatInt(hp.own)}₮</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- main section ---------- */

export function FundCalculator({ fund }: { fund?: FundCalculatorContext }) {
  const { locale } = useLocale();

  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [initial, setInitial] = useState(10000);
  const [contribution, setContribution] = useState(10000);
  // Keep the estimate neutral by default. This is a user assumption, not a
  // published or guaranteed return for the selected fund.
  const [ratePct, setRatePct] = useState(0);
  const [unit, setUnit] = useState<"months" | "years">("years");
  const [termMonths, setTermMonths] = useState(144); // 12 years

  const termDisplay = unit === "years" ? Math.round(termMonths / 12) : termMonths;

  const points = useMemo(
    () => simulate(initial, contribution, ratePct, frequency, termMonths),
    [initial, contribution, ratePct, frequency, termMonths]
  );

  const last = points[points.length - 1];
  const finalTotal = last.total;
  const finalOwn = last.own;
  const profit = finalTotal - finalOwn;

  const xMax = unit === "years" ? termMonths / 12 : termMonths;

  const FREQ_OPTIONS: { value: Frequency; label: string }[] = [
    { value: "daily", label: pick(locale, "Өдөр бүр", "Daily") },
    { value: "monthly", label: pick(locale, "Сар бүр", "Monthly") },
    { value: "quarterly", label: pick(locale, "Улирал", "Quarterly") },
    { value: "semiannual", label: pick(locale, "Хагас жил", "Semi-annual") },
  ];

  return (
    <section
      id="calculator"
      className="theme-fade section-y relative overflow-hidden bg-surface-strong text-on-strong"
    >
      <div className="grain pointer-events-none absolute inset-0">
        <div
          className="drift-slow absolute right-[-10%] top-[10%] h-[55vh] w-[55vh] rounded-full opacity-[0.10] blur-[140px]"
          style={{ background: "var(--jade-500)" }}
        />
        <div
          className="drift absolute bottom-[-15%] left-[-5%] h-[40vh] w-[40vh] rounded-full opacity-[0.08] blur-[120px]"
          style={{ background: "var(--jade-400)" }}
        />
      </div>

      <div className="container-page relative">
        <div className="mx-auto flex max-w-5xl flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow flex items-center gap-2 text-accent-on-dark">
                <Calculator className="h-3.5 w-3.5" strokeWidth={1.8} />
                {pick(locale, "Тооцоолуур", "Calculator")}
              </p>
            </Reveal>
            {fund && (
              <Reveal delay={0.03} className="mt-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent-on-dark/30 bg-accent-on-dark/[0.08] px-4 py-2 text-sm text-accent-on-dark">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-on-dark" />
                  {fund.code} · {fund.name}
                </span>
              </Reveal>
            )}
            <h2 className="t-h2 mt-5 text-balance text-on-strong md:mt-4">
              <SplitReveal
                text={pick(
                  locale,
                  fund
                    ? `${fund.name} сангийн тооцоолуур`
                    : "Хөрөнгө оруулалтын сангийн тооцоолол",
                  fund ? `${fund.name} fund calculator` : "Investment fund calculator"
                )}
              />
            </h2>
          </div>
          <Reveal delay={0.1} className="max-w-md md:pb-1">
            <p className="t-body text-pretty text-on-strong-muted">
              {pick(
                locale,
                fund
                  ? "Энэ сангийн хүрээнд өөрийн оруулах дүн, хугацаа болон таамагласан өгөөжөө тохируулж жишээ тооцоолол хийнэ үү."
                  : "Өөрийн санхүүгийн зорилгодоо тохируулан тогтмол хуримтлалын ирээдүйн өгөөжийг ойролцоогоор тооцоолж үзээрэй.",
                fund
                  ? "Adjust your contribution, term and assumed return to explore an illustrative projection for this fund."
                  : "Estimate the future value of a regular savings plan, tailored to your own goals."
              )}
            </p>
          </Reveal>
        </div>

        {/* controls + chart */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Reveal delay={0.08} className="lg:col-span-4">
            <div className="relative flex h-full flex-col gap-7 overflow-hidden rounded-xl border border-[color:var(--c-line-strong)] bg-black/10 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.14)] before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-gradient-to-b before:from-accent-on-dark before:via-accent-on-dark/40 before:to-transparent">
              <div>
                <p className="eyebrow text-on-strong-subtle">{pick(locale, "Давтамж", "Frequency")}</p>
                <div className="mt-3">
                  <Segmented options={FREQ_OPTIONS} value={frequency} onChange={setFrequency} />
                </div>
              </div>

              <AmountField
                label={pick(locale, "Эхний дүн", "Initial amount")}
                value={initial}
                onChange={setInitial}
              />
              <AmountField
                label={pick(locale, "Тогтмол оруулах дүн", "Regular contribution")}
                value={contribution}
                onChange={setContribution}
              />

              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-on-strong-subtle">
                    {pick(locale, "Таамагласан жилийн өгөөж", "Assumed annual return")}
                  </span>
                  <span className="font-display text-xl tabular-nums text-accent-on-dark">
                    {ratePct}%
                  </span>
                </div>
                <div className="mt-3">
                  <Slider
                    min={0}
                    max={30}
                    step={0.5}
                    value={ratePct}
                    onChange={setRatePct}
                    minLabel="0%"
                    maxLabel="30%"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="eyebrow text-on-strong-subtle">{pick(locale, "Хугацаа", "Term")}</span>
                  <span className="font-display text-xl tabular-nums text-accent-on-dark">
                    {termDisplay} {pick(locale, unit === "years" ? "жил" : "сар", unit === "years" ? "yr" : "mo")}
                  </span>
                </div>
                <div className="mt-3 w-32 shrink-0">
                  <Segmented
                    options={[
                      { value: "months" as const, label: pick(locale, "сар", "mo") },
                      { value: "years" as const, label: pick(locale, "жил", "yr") },
                    ]}
                    value={unit}
                    onChange={(v) => {
                      setUnit(v);
                      setTermMonths(v === "years" ? Math.round(termMonths / 12) * 12 : termMonths);
                    }}
                  />
                </div>
                <div className="mt-4">
                  {unit === "years" ? (
                    <Slider
                      min={1}
                      max={30}
                      step={1}
                      value={Math.round(termMonths / 12)}
                      onChange={(v) => setTermMonths(v * 12)}
                      minLabel={pick(locale, "1 жил", "1 yr")}
                      maxLabel={pick(locale, "30 жил", "30 yr")}
                    />
                  ) : (
                    <Slider
                      min={1}
                      max={360}
                      step={1}
                      value={termMonths}
                      onChange={setTermMonths}
                      minLabel={pick(locale, "1 сар", "1 mo")}
                      maxLabel={pick(locale, "360 сар", "360 mo")}
                    />
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="lg:col-span-8">
            <div className="flex h-full flex-col rounded-xl border border-accent-on-dark/25 bg-gradient-to-br from-white/[0.08] to-white/[0.015] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
              <div className="grid grid-cols-1 gap-5 border-b border-white/[0.09] pb-6 sm:grid-cols-3">
                <div>
                  <p className="eyebrow text-accent-on-dark">{pick(locale, "Ирээдүйн дүн", "Future value")}</p>
                  <p className="t-numeral mt-2 text-3xl leading-none text-on-strong md:text-4xl">
                    <Counter value={finalTotal} decimals={0} suffix="₮" />
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-on-strong-subtle">{pick(locale, "Оруулсан дүн", "Contributed")}</p>
                  <p className="t-numeral mt-2 text-3xl leading-none text-on-strong md:text-4xl">
                    <Counter value={finalOwn} decimals={0} suffix="₮" />
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-[color:var(--bronze-300)]">{pick(locale, "Өгөөжийн дүн", "Estimated gain")}</p>
                  <p className="t-numeral mt-2 text-3xl leading-none text-[color:var(--bronze-200)] md:text-4xl">
                    <Counter value={profit} decimals={0} suffix="₮" />
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-5">
                  <span className="flex items-center gap-2 text-sm text-on-strong-subtle">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--jade-400)" }} />
                    {pick(locale, "Нийт үр дүн", "Total value")}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-on-strong-subtle">
                    <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden>
                      <line
                        x1="0"
                        y1="5"
                        x2="16"
                        y2="5"
                        stroke="var(--c-on-strong-muted)"
                        strokeWidth={2}
                        strokeDasharray="5 4"
                      />
                    </svg>
                    {pick(locale, "Өөрийн оруулсан дүн", "Your contributions")}
                  </span>
                </div>
                <span className="font-display text-lg tabular-nums text-accent-on-dark">
                  {pick(locale, "Таамагласан өгөөж", "Assumed return")}: {ratePct}%
                </span>
              </div>

              <div className="mt-6 flex-1 rounded-lg border border-white/[0.06] bg-black/[0.12] px-2 py-4 sm:px-4">
                <Chart points={points} xMax={xMax} unit={unit} locale={locale} />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mx-auto mt-6 max-w-3xl text-center">
          <p className="t-small text-pretty text-on-strong-subtle">
            {pick(
              locale,
              "Энэхүү тооцоолол зөвхөн ойролцоо жишээ бөгөөд таны сонгосон жилийн өгөөжид үндэслэсэн болно. Сангийн бодит өгөөж ирээдүйд өөр байж болох бөгөөд баталгаажаагүй болно.",
              "This calculator is an illustrative estimate based on the annual return rate you enter — it is not a guarantee of actual fund performance."
            )}
          </p>
          {fund?.nav != null && (
            <p className="mt-3 text-xs text-on-strong-subtle">
              {pick(locale, `Одоогийн NAV: ${formatInt(fund.nav)}₮`, `Current NAV: ${formatInt(fund.nav)}₮`)}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
