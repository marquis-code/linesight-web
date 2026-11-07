<script setup lang="ts">
import { ArrowUpRight, Camera, Check, FileCheck2, HandCoins, ShieldCheck, UploadCloud } from 'lucide-vue-next'
const steps = [
  { n: '01', title: 'Rent or use your camera', text: 'A 100 ft camera kit ships next day, or upload footage from your own contractor.' },
  { n: '02', title: 'Upload the walkthrough', text: 'Drop the video in Vomtek Home. Our visual engine marks distance, defect type and severity.' },
  { n: '03', title: 'Get a health certificate', text: 'A plain-language report and repair scope you can send to any contractor.' },
  { n: '04', title: 'Compare verified bids', text: 'Local contractors bid on the scoped work. Fund through Vomtek Assure and release on completion.' },
]
</script>
<template>
  <div>
    <section class="relative overflow-hidden bg-paper">
      <div class="wrap grid min-h-[620px] items-center gap-10 py-14 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p class="label-mono text-signal-deep">Vomtek Home · B2C</p>
          <h1 class="type-page-hero mt-4 font-display leading-[.92] tracking-[-.055em]">Know your line.<br><span class="text-mint-deep">Before you dig.</span></h1>
          <p class="mt-5 max-w-lg text-[17px] leading-relaxed text-ink/60">A backed-up sewer or mystery leak should not start with a $5,000 blind excavation. Upload a camera walkthrough and get a health report, a repair scope and real bids.</p>
          <div class="mt-7 flex flex-wrap gap-2"><NuxtLink to="/login" class="btn btn-dark">Upload my footage <ArrowUpRight :size="14" /></NuxtLink><NuxtLink to="/rentals" class="btn btn-outline">Rent a camera kit</NuxtLink></div>
          <div class="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[11.5px] text-ink/55"><span class="flex items-center gap-2"><ShieldCheck :size="14" class="text-mint-deep" /> 24-hour report</span><span class="flex items-center gap-2"><FileCheck2 :size="14" class="text-mint-deep" /> Written certificate</span><span class="flex items-center gap-2"><HandCoins :size="14" class="text-mint-deep" /> Milestone escrow</span></div>
        </div>
        <div class="lg:col-span-5">
          <div class="relative ml-auto max-w-[560px]">
            <div class="overflow-hidden rounded-2xl border border-ink/15"><PhotoImage name="water-utility" alt="Water utility pipeline infrastructure" sizes="(min-width:1024px) 45vw, 100vw" eager class="aspect-[4/5] w-full object-cover" /></div>
            <div class="absolute -bottom-5 -left-4 w-64 rounded-xl border border-ink/12 bg-bone p-4 shadow-2xl sm:left-6"><p class="flex items-center gap-2 font-mono text-[8.5px] uppercase tracking-[.1em] text-ink/45"><Camera :size="12" class="text-signal" /> Footage reviewed</p><div class="mt-3 flex items-end justify-between"><div><p class="font-display text-[32px] leading-none">78 ft</p><p class="mt-1 text-[10px] text-ink/40">3 findings · 1 high priority</p></div><span class="rounded-full bg-signal px-2 py-1 font-mono text-[8px] uppercase text-ink">Repair</span></div></div>
          </div>
        </div>
      </div>
    </section>

    <section id="upload" class="section-y border-y border-ink/10 bg-bone">
      <div class="wrap"><SectionLabel index="01">How it works</SectionLabel><div class="mt-8 grid gap-px overflow-hidden rounded-xl border border-ink/12 bg-ink/12 md:grid-cols-4"><div v-for="s in steps" :key="s.n" class="bg-bone p-6"><span class="font-mono text-[10px] text-signal-deep">{{ s.n }}</span><h3 class="mt-8 font-display text-[22px] leading-tight">{{ s.title }}</h3><p class="mt-2 text-[13px] leading-relaxed text-ink/55">{{ s.text }}</p></div></div></div>
    </section>

    <section class="section-y">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5"><SectionLabel index="02">The certificate</SectionLabel><h2 class="mt-6 type-lg max-w-[13ch]">A report your contractor cannot wave away.</h2><p class="mt-5 text-[15px] leading-relaxed text-ink/60">Every finding is tied to footage distance, confidence and a recommended action. Contractors bid on the same scope, so you can compare like for like.</p><div class="mt-7 rounded-xl border border-ink/12 bg-bone p-5"><p class="font-mono text-[9px] uppercase tracking-[.1em] text-ink/40">Home health report</p><div class="mt-4 flex items-center justify-between"><div><p class="font-display text-[42px] leading-none">72<span class="text-[16px] text-ink/30">/100</span></p><p class="text-[11px] text-ink/45">Line health score</p></div><span class="rounded-full bg-signal px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.08em]">Repair recommended</span></div><div class="mt-5 space-y-2"><div v-for="d in [{t:'Root intrusion',s:'High',p:'22 ft'},{t:'Offset joint',s:'Medium',p:'41 ft'},{t:'Scale / debris',s:'Low',p:'58 ft'}]" :key="d.t" class="flex items-center justify-between border-t border-ink/10 pt-2 text-[12px]"><span>{{ d.t }}</span><span class="font-mono text-[9px] text-ink/40">{{ d.p }}</span><span :class="d.s === 'High' ? 'text-signal-deep' : d.s === 'Medium' ? 'text-[#a46800]' : 'text-mint-deep'">{{ d.s }}</span></div></div></div></div>
        <div class="lg:col-span-7">
          <div class="overflow-hidden rounded-2xl"><PhotoImage name="water-utility" alt="Residential utility line and water infrastructure" sizes="(min-width:1024px) 55vw, 100vw" class="aspect-[4/3] w-full object-cover" /></div>
          <div class="mt-4 grid gap-4 sm:grid-cols-2"><div class="rounded-xl bg-ink p-5 text-bone"><HandCoins :size="19" class="text-mint" /><h3 class="mt-4 font-display text-[22px]">Vomtek Assure escrow</h3><p class="mt-2 text-[12.5px] leading-relaxed text-bone/55">Fund the job, release on verified milestones. No full payment before the camera confirms the fix.</p></div><div class="rounded-xl border border-ink/12 bg-bone p-5"><ShieldCheck :size="19" class="text-signal-deep" /><h3 class="mt-4 font-display text-[22px]">Verified contractors</h3><p class="mt-2 text-[12.5px] leading-relaxed text-ink/55">Licensed, insured and reviewed. Every bid includes scope, timeline and warranty.</p></div></div>
        </div>
      </div>
    </section>

    <section class="bg-signal py-14 text-ink md:py-20"><div class="wrap grid gap-6 md:grid-cols-[1fr_auto] md:items-center"><div><p class="label-mono">From $149 · report in 24 hours</p><h2 class="mt-3 max-w-[17ch] font-display text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[.95] tracking-[-.05em]">Stop guessing. Start with the footage you already have.</h2></div><NuxtLink to="/login" class="btn btn-dark">Open Vomtek Home <ArrowUpRight :size="14" /></NuxtLink></div></section>
  </div>
</template>
