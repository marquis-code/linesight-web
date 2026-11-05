<script setup lang="ts">
import { ArrowUpRight, Check, CircleDot, FileUp, Gauge, GitCompareArrows, ShieldCheck } from 'lucide-vue-next'
const features = [
  { icon: FileUp, title: 'Any file in', text: 'MFL, caliper, IMU, CCTV or acoustic. Vendor-agnostic ingestion normalises runs into one anomaly schema.' },
  { icon: CircleDot, title: 'Screen every anomaly', text: 'ASME B31G remaining strength, depth, burst pressure, corrosion growth and remaining life — automatically.' },
  { icon: GitCompareArrows, title: '4D digital twin', text: 'Align multi-year and multi-vendor runs on distance. See what grows, what stalls and what was repaired.' },
  { icon: ShieldCheck, title: 'Auditable by design', text: 'Every number carries its inputs, method and reviewer. Export the evidence package your regulator expects.' },
]
</script>
<template>
  <div>
    <section class="relative overflow-hidden bg-ink text-bone">
      <div class="absolute inset-0"><PhotoImage name="pipeline-welding" alt="Pipeline welding in the field" sizes="100vw" eager class="size-full object-cover opacity-30" /><div class="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" /></div>
      <div class="wrap relative py-20 md:py-28">
        <p class="label-mono text-mint">LineSight Intelligence · B2B</p>
        <h1 class="mt-5 max-w-[13ch] font-display text-[clamp(3.2rem,6.6vw,6.4rem)] leading-[.92] tracking-[-.055em]">Your integrity answer.<br><span class="text-mint">Before the meeting.</span></h1>
        <p class="mt-6 max-w-xl text-[17px] leading-relaxed text-bone/60">The unified workspace for pipeline and utility operators. Ingest a run, screen it against B31G, compare the last five years and leave with a signed work list — in hours.</p>
        <div class="mt-8 flex flex-wrap gap-2"><NuxtLink to="/login" class="btn btn-primary">Open the demo workspace <ArrowUpRight :size="14" /></NuxtLink><NuxtLink to="/contact" class="btn btn-outline-dark">Talk to an engineer</NuxtLink></div>
        <div class="mt-14 grid max-w-3xl grid-cols-2 gap-6 border-t border-bone/15 pt-6 sm:grid-cols-4"><div v-for="s in [{n:'<5 min',l:'run to first screen'},{n:'99.1%',l:'anomaly coverage'},{n:'4D',l:'multi-run twin'},{n:'ASME',l:'B31G screening'}]" :key="s.l"><p class="font-display text-[26px]">{{ s.n }}</p><p class="label-mono mt-1 text-bone/35">{{ s.l }}</p></div></div>
      </div>
    </section>

    <section class="section-y">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5"><SectionLabel index="01">The work</SectionLabel><h2 class="mt-6 type-lg max-w-[12ch]">Stop paying analysts to reformat spreadsheets.</h2></div>
        <div class="lg:col-span-7"><p class="text-[18px] leading-relaxed text-ink/60">Legacy inspection economics are built around backlog: a vendor runs the tool, ships a drive, and a proprietary team spends weeks turning it into a static PDF. By the time the report lands, the asset has changed.</p><p class="mt-4 text-[15px] leading-relaxed text-ink/55">LineSight separates the tool from the interpretation. Any run can be ingested, screened and compared. Your engineers stay in control of the decision — the platform does the arithmetic and keeps the audit trail.</p></div>
      </div>
      <div class="wrap mt-12 grid gap-px overflow-hidden rounded-xl border border-ink/12 bg-ink/12 sm:grid-cols-2">
        <div v-for="f in features" :key="f.title" class="bg-bone p-7"><component :is="f.icon" :size="20" class="text-signal-deep" :stroke-width="1.6" /><h3 class="mt-7 font-display text-[24px] tracking-[-.03em]">{{ f.title }}</h3><p class="mt-2 max-w-md text-[13.5px] leading-relaxed text-ink/55">{{ f.text }}</p></div>
      </div>
    </section>

    <section class="section-y border-y border-ink/10 bg-bone">
      <div class="wrap grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-6"><div class="overflow-hidden rounded-2xl border border-ink/15 bg-ink p-4 text-bone"><AnomalyCanvas :anomalies="[{distanceM:4800,depthPct:18,severity:'low'},{distanceM:12800,depthPct:28,severity:'medium'},{distanceM:21400,depthPct:68,severity:'critical'},{distanceM:30200,depthPct:42,severity:'high'},{distanceM:39800,depthPct:16,severity:'low'}]" :length-km="48.2" :height="300" /></div></div>
        <div class="lg:col-span-6 lg:pl-8"><SectionLabel index="02">The output</SectionLabel><h2 class="mt-6 type-lg max-w-[12ch]">One ranked work list. Full evidence.</h2><ul class="mt-6 space-y-4"><li v-for="item in ['Anomaly depth, length and width on the line','B31G safe pressure vs MAOP','Corrosion growth rate between runs','Remaining life and reassessment interval','Repair, monitor or re-inspect recommendation']" :key="item" class="flex items-start gap-3 border-b border-ink/10 pb-3 text-[14px] text-ink/65"><Check :size="15" class="mt-0.5 shrink-0 text-mint-deep" />{{ item }}</li></ul><NuxtLink to="/login" class="btn btn-dark mt-7">Open a live report <ArrowUpRight :size="13" /></NuxtLink></div>
      </div>
    </section>

    <section class="section-y">
      <div class="wrap"><SectionLabel index="03">Built for the operating reality</SectionLabel><div class="mt-8 grid gap-8 md:grid-cols-3"><div v-for="s in [{icon:Gauge,title:'Integrity engineers',text:'A defensible work list, not a data dump. Export the evidence package in one click.'},{icon:ShieldCheck,title:'Operations leaders',text:'See risk and spend against every asset before the next budget cycle.'},{icon:GitCompareArrows,title:'Field teams',text:'Repair scopes and anomaly locations on mobile, with photos and GIS coordinates.'}]" :key="s.title"><component :is="s.icon" :size="20" class="text-signal-deep" /><h3 class="mt-5 font-display text-[23px]">{{ s.title }}</h3><p class="mt-2 text-[13.5px] leading-relaxed text-ink/55">{{ s.text }}</p></div></div></div>
      <div class="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl bg-ink p-7 text-bone md:flex-row md:items-center md:p-10"><div><p class="label-mono text-mint">Free diagnostic</p><h2 class="mt-2 max-w-[18ch] font-display text-[30px] leading-[1.02] tracking-[-.04em] md:text-[38px]">Send one run. We will return the first report.</h2></div><NuxtLink to="/contact" class="btn btn-primary">Start a diagnostic <ArrowUpRight :size="14" /></NuxtLink></div>
    </section>
  </div>
</template>
