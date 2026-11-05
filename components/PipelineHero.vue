<script setup lang="ts">
import { ArrowUpRight, Play, ShieldCheck, Waves } from 'lucide-vue-next'
const mode = ref<'operator' | 'homeowner'>('operator')
const copy = computed(() => mode.value === 'operator' ? {
  kicker: 'For pipeline & utility operators',
  headline: ['See the line.', 'Prove the asset.'],
  body: 'Ingest inspection data, screen every anomaly against ASME B31G, and hand your team a signed integrity answer in hours — not another 12-week PDF backlog.',
  primary: 'Run a free diagnostic',
  secondary: 'Explore intelligence',
  stat: '99.1%', statLabel: 'anomaly coverage',
  micro: 'Gulf Coast Trunk 12 · 48.2 km',
} : {
  kicker: 'For homeowners & property teams',
  headline: ['Know the line.', 'Before you dig.'],
  body: 'Rent a camera kit, upload the footage, and get a plain-language health report with a repair scope and verified contractor bids. No blind excavation.',
  primary: 'Diagnose my line',
  secondary: 'See how Home works',
  stat: '24 hr', statLabel: 'report turnaround',
  micro: 'Cedar Ridge lateral · 78 ft reviewed',
})
</script>
<template>
  <section class="relative overflow-hidden bg-ink text-bone">
    <div class="grid-dark absolute inset-0 opacity-50" />
    <div class="absolute -left-40 top-24 size-[520px] rounded-full bg-mint/10 blur-[120px]" />
    <div class="wrap relative grid min-h-[calc(100svh-72px)] items-center gap-12 py-14 lg:grid-cols-12 lg:gap-8 lg:py-20">
      <div class="relative z-10 lg:col-span-7">
        <div class="inline-flex rounded-full border border-bone/15 bg-bone/5 p-1">
          <button type="button" class="rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[.1em] transition-colors" :class="mode === 'operator' ? 'bg-bone text-ink' : 'text-bone/55 hover:text-bone'" @click="mode = 'operator'">B2B · Operators</button>
          <button type="button" class="rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[.1em] transition-colors" :class="mode === 'homeowner' ? 'bg-bone text-ink' : 'text-bone/55 hover:text-bone'" @click="mode = 'homeowner'">B2C · Homeowners</button>
        </div>
        <p class="mt-8 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[.12em] text-mint"><span class="status-dot" /> {{ copy.kicker }}</p>
        <h1 class="mt-4 font-display text-[clamp(3.3rem,6.8vw,6.6rem)] font-medium leading-[.9] tracking-[-.055em]">
          {{ copy.headline[0] }}<br><span class="text-mint">{{ copy.headline[1] }}</span>
        </h1>
        <p class="mt-6 max-w-[34rem] text-[16.5px] leading-relaxed text-bone/65">{{ copy.body }}</p>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <NuxtLink :to="mode === 'operator' ? '/intelligence#diagnostic' : '/homeowners#upload'" class="btn btn-primary">{{ copy.primary }} <ArrowUpRight :size="14" /></NuxtLink>
          <NuxtLink :to="mode === 'operator' ? '/intelligence' : '/homeowners'" class="btn btn-outline-dark">{{ copy.secondary }}</NuxtLink>
        </div>
        <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-bone/10 pt-6">
          <div><p class="font-display text-[30px] leading-none text-bone">{{ copy.stat }}</p><p class="mt-1 font-mono text-[9px] uppercase tracking-[.1em] text-bone/40">{{ copy.statLabel }}</p></div>
          <div><p class="flex items-center gap-2 text-[12px] text-bone/65"><ShieldCheck :size="14" class="text-mint" /> ASME B31G screened</p><p class="mt-1 flex items-center gap-2 text-[12px] text-bone/65"><Waves :size="14" class="text-mint" /> Vendor-agnostic ingestion</p></div>
        </div>
      </div>

      <div class="relative lg:col-span-5">
        <div class="relative ml-auto max-w-[640px]">
          <div class="relative overflow-hidden rounded-2xl border border-bone/15 bg-ink-2 shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)]">
            <div class="relative h-[320px] sm:h-[390px] lg:h-[430px]">
              <PhotoImage name="pipeline-construction" alt="Large-diameter pipeline under construction" sizes="(min-width:1024px) 45vw, 90vw" eager class="absolute inset-0 size-full object-cover opacity-90" />
              <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
              <div class="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-bone/20 bg-ink/60 px-3 py-1.5 backdrop-blur"><span class="status-dot text-mint" /><span class="font-mono text-[9px] uppercase tracking-[.12em] text-bone/75">{{ mode === 'operator' ? 'RUN 2026-10 · COMPLETE' : 'CCTV REVIEW · COMPLETE' }}</span></div>
              <div class="absolute right-4 top-4 rounded-full bg-mint px-3 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[.1em] text-ink">{{ mode === 'operator' ? 'B31G screened' : 'Health certified' }}</div>
            </div>
            <div class="relative -mt-16 px-4 pb-4 sm:px-5 sm:pb-5">
              <div class="rounded-xl border border-bone/15 bg-ink-2/95 p-4 backdrop-blur-xl sm:p-5">
                <div class="flex items-start justify-between gap-4">
                  <div><p class="label-mono text-[9px] text-bone/40">{{ mode === 'operator' ? 'ASSET' : 'PROPERTY' }}</p><h3 class="mt-1 font-display text-[21px] tracking-[-.03em]">{{ mode === 'operator' ? 'Gulf Coast Trunk 12' : 'Cedar Ridge lateral' }}</h3><p class="mt-0.5 font-mono text-[9px] text-bone/40">{{ copy.micro }}</p></div>
                  <div class="text-right"><p class="font-display text-[32px] leading-none" :class="mode === 'operator' ? 'text-mint' : 'text-signal'">{{ mode === 'operator' ? '78' : '72' }}<span class="text-[14px] text-bone/35">/100</span></p><p class="mt-1 font-mono text-[8px] uppercase tracking-[.1em] text-bone/40">{{ mode === 'operator' ? 'Integrity score' : 'Line health' }}</p></div>
                </div>
                <div class="mt-4 grid grid-cols-3 gap-2">
                  <div class="rounded-lg bg-bone/5 p-2.5"><p class="font-mono text-[8px] uppercase tracking-[.08em] text-bone/40">Risk</p><p class="mt-1 text-[12px] font-medium" :class="mode === 'operator' ? 'text-signal' : 'text-mint'">{{ mode === 'operator' ? 'High' : 'Repair' }}</p></div>
                  <div class="rounded-lg bg-bone/5 p-2.5"><p class="font-mono text-[8px] uppercase tracking-[.08em] text-bone/40">{{ mode === 'operator' ? 'Deepest' : 'Findings' }}</p><p class="mt-1 text-[12px] font-medium">{{ mode === 'operator' ? '68.0%' : '3' }}</p></div>
                  <div class="rounded-lg bg-bone/5 p-2.5"><p class="font-mono text-[8px] uppercase tracking-[.08em] text-bone/40">{{ mode === 'operator' ? 'CGR' : 'Reviewed' }}</p><p class="mt-1 text-[12px] font-medium">{{ mode === 'operator' ? '0.65 mm/y' : '78 ft' }}</p></div>
                </div>
                <div class="mt-4"><AnomalyCanvas :anomalies="[{distanceM:4800,depthPct:18,severity:'low'},{distanceM:12800,depthPct:34,severity:'medium'},{distanceM:21400,depthPct:68,severity:'critical'},{distanceM:30200,depthPct:42,severity:'high'},{distanceM:39800,depthPct:16,severity:'low'}]" :length-km="48.2" :height="90" compact /></div>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-xl border border-bone/15 bg-bone px-4 py-3 text-ink shadow-xl sm:flex">
            <span class="flex size-9 items-center justify-center rounded-full bg-ink text-mint"><Play :size="14" fill="currentColor" /></span>
            <div><p class="text-[12px] font-semibold">From run to answer</p><p class="font-mono text-[9px] uppercase tracking-[.08em] opacity-50">Under 5 minutes · demo</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
