<script setup lang="ts">
import { ArrowUpRight, Check, CircleDot, FileUp, Gauge, GitCompareArrows, ShieldCheck } from 'lucide-vue-next'
const features = [
  { icon: FileUp, title: 'Use the files you have', text: 'Send inspection, camera or sound files. We clean them up and put every finding in one list.' },
  { icon: CircleDot, title: 'Check every problem', text: 'Each finding is checked for depth, pressure safety and how quickly it is growing — automatically.' },
  { icon: GitCompareArrows, title: 'Compare visits', text: 'Line up this inspection with earlier ones. See what got worse, what stayed the same and what was repaired.' },
  { icon: ShieldCheck, title: 'Easy to audit', text: 'Every number keeps its source, method and reviewer, so you can defend the decision later.' },
]
</script>
<template>
  <div>
    <section class="relative overflow-hidden border-b border-ink/10 bg-white">
      <div class="wrap relative grid items-center gap-10 py-16 md:py-20 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p class="label-mono text-vomtek">For pipeline and utility teams</p>
          <h1 class="type-page-hero mt-5 max-w-[13ch]">Know what needs fixing.<br><span class="text-vomtek">Before it fails.</span></h1>
          <p class="mt-6 max-w-xl text-[17px] leading-relaxed text-ink/70">Upload the inspection you already have. We show you what is damaged, what can wait, and what to repair first — without another long report backlog.</p>
          <div class="mt-8 flex flex-wrap gap-2"><NuxtLink to="/login" class="btn btn-brand">Try it with one inspection <ArrowUpRight :size="14" /></NuxtLink><NuxtLink to="/contact" class="btn btn-outline">Talk to our team</NuxtLink></div>
          <div class="mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-ink/10 pt-6 sm:grid-cols-4"><div v-for="s in [{n:'Minutes',l:'to first findings'},{n:'99.1%',l:'of findings checked'},{n:'Side by side',l:'inspection comparison'},{n:'Safety',l:'industry check'}]" :key="s.l"><p class="font-display text-[22px] font-semibold">{{ s.n }}</p><p class="label-mono mt-1 text-ink/65">{{ s.l }}</p></div></div>
        </div>
        <div class="lg:col-span-5">
          <div class="overflow-hidden rounded-2xl border border-ink/12 bg-white shadow-[0_30px_70px_-45px_rgba(7,16,14,.35)]">
            <PhotoImage name="pipeline-welding" alt="Pipeline welding in the field" sizes="(min-width:1024px) 38vw, 100vw" eager class="aspect-[4/3] w-full object-cover" />
            <div class="p-5"><p class="label-mono text-vomtek">What you get</p><p class="mt-2 font-display text-[22px] font-semibold">A short list of what to fix first.</p><p class="mt-1 text-[12.5px] leading-relaxed text-ink/65">Ranked by risk, with the evidence your team needs to sign off.</p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-y">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5"><SectionLabel index="01">The problem</SectionLabel><h2 class="mt-6 type-lg max-w-[12ch]">Stop waiting weeks for an answer.</h2></div>
        <div class="lg:col-span-7"><p class="text-[18px] leading-relaxed text-ink/75">Most inspection reports sit in a queue. A crew runs the tool, sends the file away, and weeks pass before anyone sees the findings. By then, the pipe may have changed again.</p><p class="mt-4 text-[15px] leading-relaxed text-ink/75">Vomtek does the sorting for you. Upload the file, see the findings in order, and compare it with the last visit. Your team makes the call; the platform keeps the record.</p></div>
      </div>
      <div class="wrap mt-12 grid gap-px overflow-hidden rounded-xl border border-ink/12 bg-ink/12 sm:grid-cols-2">
        <div v-for="f in features" :key="f.title" class="bg-bone p-7"><component :is="f.icon" :size="20" class="text-signal-deep" :stroke-width="1.6" /><h3 class="mt-7 font-display text-[24px] tracking-[-.03em]">{{ f.title }}</h3><p class="mt-2 max-w-md text-[13.5px] leading-relaxed text-ink/75">{{ f.text }}</p></div>
      </div>
    </section>

    <section class="section-y border-y border-ink/10 bg-bone">
      <div class="wrap grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-6"><div class="overflow-hidden rounded-2xl border border-ink/15 bg-ink p-4 text-bone"><AnomalyCanvas :anomalies="[{distanceM:4800,depthPct:18,severity:'low'},{distanceM:12800,depthPct:28,severity:'medium'},{distanceM:21400,depthPct:68,severity:'critical'},{distanceM:30200,depthPct:42,severity:'high'},{distanceM:39800,depthPct:16,severity:'low'}]" :length-km="48.2" :height="300" /></div></div>
        <div class="lg:col-span-6 lg:pl-8"><SectionLabel index="02">What you get</SectionLabel><h2 class="mt-6 type-lg max-w-[12ch]">A clear list of what to fix first.</h2><ul class="mt-6 space-y-4"><li v-for="item in ['Where the problem is and how big it is','Whether the pipe is still safe at its current pressure','How much the problem grew since the last inspection','How long the pipe can safely stay in service','Whether to repair, watch or inspect again']" :key="item" class="flex items-start gap-3 border-b border-ink/10 pb-3 text-[14px] text-ink/75"><Check :size="15" class="mt-0.5 shrink-0 text-mint-deep" />{{ item }}</li></ul><NuxtLink to="/login" class="btn btn-dark mt-7">Open a live report <ArrowUpRight :size="13" /></NuxtLink></div>
      </div>
    </section>

    <section class="section-y">
      <div class="wrap"><SectionLabel index="03">Made for the people who run the line</SectionLabel><div class="mt-8 grid gap-8 md:grid-cols-3"><div v-for="s in [{icon:Gauge,title:'Pipeline engineers',text:'A clear to-do list, not a data dump. Export the evidence in one click.'},{icon:ShieldCheck,title:'Operations leaders',text:'See risk and plan spend before the next budget cycle.'},{icon:GitCompareArrows,title:'Field teams',text:'Repair instructions and problem locations on mobile, with photos and map coordinates.'}]" :key="s.title"><component :is="s.icon" :size="20" class="text-signal-deep" /><h3 class="mt-5 font-display text-[23px]">{{ s.title }}</h3><p class="mt-2 text-[13.5px] leading-relaxed text-ink/75">{{ s.text }}</p></div></div></div>
      <div class="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl bg-ink p-7 text-bone md:flex-row md:items-center md:p-10"><div><p class="label-mono text-mint">Start with one inspection</p><h2 class="mt-2 max-w-[18ch] font-display text-[30px] leading-[1.02] tracking-[-.04em] md:text-[38px]">Send one inspection. We will send back the first report.</h2></div><NuxtLink to="/contact" class="btn btn-brand">Send an inspection <ArrowUpRight :size="14" /></NuxtLink></div>
    </section>
  </div>
</template>
