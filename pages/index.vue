<script setup lang="ts">
import { ArrowRight, ArrowUpRight, Boxes, CalendarClock, CircleDollarSign, FileCheck2, Gauge, Handshake, Home, Radar, ScanLine, ShieldCheck, Truck, Users } from 'lucide-vue-next'

const api = useApi()
const { data: products } = await useAsyncData('home-products', () => api.request<any[]>('/catalog/products').catch(() => []))
const { data: plans } = await useAsyncData('home-plans', () => api.request<any[]>('/plans').catch(() => []))
const { data: stats } = await useAsyncData('home-stats', () => api.request<any>('/public/stats').catch(() => ({ km: 0, reports: 0, products: 0 })))

const modules = [
  { icon: Radar, title: 'Pipeline answers', text: 'See what needs fixing, what can wait, and what to repair first.', to: '/intelligence', tone: 'mint' },
  { icon: Boxes, title: 'Parts store', text: 'Find the right tool, cups or tracking part for your pipe — then buy or rent it online.', to: '/marketplace', tone: 'signal' },
  { icon: Truck, title: 'Tool rentals', text: 'Rent cameras, listening gear and inspection tools by the week instead of buying them.', to: '/rentals', tone: 'mint' },
  { icon: Home, title: 'Home line checks', text: 'Upload a camera video and get a simple report, repair plan and real contractor prices.', to: '/homeowners', tone: 'signal' },
  { icon: Handshake, title: 'Trusted contractors', text: 'Verified local contractors quote the same job so you can compare price and timing.', to: '/contractors', tone: 'mint' },
  { icon: ShieldCheck, title: 'Protected payments', text: 'Money is released in stages only after the work is checked and approved.', to: '/security', tone: 'signal' },
]
const steps = [
  { n: '01', title: 'Upload the inspection', text: 'Send the file from your inspection. We accept the common formats and clean it up for you.' },
  { n: '02', title: 'See the problems', text: 'Every weak spot is listed by location, depth and urgency, with a suggested repair.' },
  { n: '03', title: 'Know what to do next', text: 'Your team gets a short, ranked to-do list instead of a 600-page report.' },
  { n: '04', title: 'Compare with the last visit', text: 'Line up this inspection with earlier ones to see what is getting worse.' },
]
const ticker = ['Works with your files', 'Safety-checked', 'Compare inspections', 'Buy parts online', 'Verified contractors', 'Protected payments', 'For companies & homes']
</script>

<template>
  <div>
    <PipelineHero />

    <section class="border-b border-ink/10 bg-bone">
      <div class="wrap flex flex-wrap items-center justify-between gap-4 py-4">
        <p class="label-mono text-ink/75">One platform · for companies and homes</p>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <span v-for="item in ticker" :key="item" class="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.1em] text-ink/75"><span class="size-1 rounded-full bg-signal" />{{ item }}</span>
        </div>
      </div>
    </section>

    <section class="section-y">
      <div class="wrap">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <SectionLabel index="01">One platform, two kinds of customers</SectionLabel>
            <h2 class="mt-7 type-lg max-w-[13ch]">Pipeline problems are hard to see. Answers take too long.</h2>
          </div>
          <div class="lg:col-span-7 lg:pl-10">
            <p class="max-w-2xl text-[18px] leading-relaxed text-ink/75">Plant and pipeline teams wait months for a report. Homeowners are told to dig first and ask questions later. Vomtek connects the inspection, the answer and the repair in one place.</p>
            <div class="mt-5 flex gap-6"><div><p class="font-display text-[27px]">{{ (stats?.km || 0).toLocaleString() }} km</p><p class="label-mono mt-1 text-ink/75">kilometres tracked</p></div><div><p class="font-display text-[27px]">{{ stats?.reports || 2 }}</p><p class="label-mono mt-1 text-ink/75">reports ready</p></div><div><p class="font-display text-[27px]">{{ stats?.products || 8 }}</p><p class="label-mono mt-1 text-ink/75">products listed</p></div></div>
          </div>
        </div>

        <div class="mt-12 grid gap-4 lg:grid-cols-2">
          <NuxtLink to="/intelligence" class="group relative min-h-[430px] overflow-hidden rounded-2xl bg-ink text-bone">
            <PhotoImage name="pipeline-construction" alt="Large-diameter pipeline under construction" sizes="(min-width:1024px) 50vw, 100vw" class="absolute inset-0 size-full object-cover opacity-65 transition-transform duration-700 group-hover:scale-[1.03]" />
            <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
            <div class="relative flex h-full flex-col justify-between p-6 md:p-8">
              <div class="flex items-center justify-between"><span class="rounded-full border border-bone/25 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.12em]">For pipeline & utility teams</span><span class="flex size-10 items-center justify-center rounded-full border border-bone/25 bg-bone/10 backdrop-blur"><ArrowUpRight :size="17" /></span></div>
              <div><p class="label-mono text-mint">Pipeline checks</p><h3 class="mt-2 max-w-[13ch] font-display text-[32px] leading-[1.02] tracking-[-.04em] md:text-[40px]">Know what needs fixing before the meeting.</h3><p class="mt-3 max-w-md text-[14px] leading-relaxed text-bone/75">Upload your inspection data, see every problem ranked, and compare this visit with the last one. Built for teams responsible for many kilometres.</p><span class="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-mint">See how it works <ArrowRight :size="13" /></span></div>
            </div>
          </NuxtLink>
          <NuxtLink to="/homeowners" class="group relative min-h-[430px] overflow-hidden rounded-2xl bg-bone-2">
            <PhotoImage name="water-utility" alt="Water utility pipeline infrastructure" sizes="(min-width:1024px) 50vw, 100vw" class="absolute inset-0 size-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]" />
            <div class="absolute inset-0 bg-gradient-to-t from-bone via-bone/40 to-transparent" />
            <div class="relative flex h-full flex-col justify-between p-6 md:p-8">
              <div class="flex items-center justify-between"><span class="rounded-full border border-ink/20 bg-bone/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.12em] backdrop-blur">For homeowners & property teams</span><span class="flex size-10 items-center justify-center rounded-full bg-ink text-bone"><ArrowUpRight :size="17" /></span></div>
              <div><p class="label-mono text-signal-deep">Vomtek Home</p><h3 class="mt-2 max-w-[13ch] font-display text-[32px] leading-[1.02] tracking-[-.04em] md:text-[40px]">Know your line. Before you dig.</h3><p class="mt-3 max-w-md text-[14px] leading-relaxed text-ink/75">Rent a camera or use your own. Upload the video and get a simple health report, a repair plan and real prices from local contractors.</p><span class="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-signal-deep">See how Home works <ArrowRight :size="13" /></span></div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section-y border-y border-ink/10 bg-bone">
      <div class="wrap">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><SectionLabel index="02">Everything in one place</SectionLabel><h2 class="mt-6 type-lg max-w-[14ch]">From inspection to repair, without the runaround.</h2></div>
          <p class="max-w-sm text-[15px] leading-relaxed text-ink/75">One shared record for the pipe, its condition and the work that keeps it running.</p>
        </div>
        <div class="mt-10 grid gap-px overflow-hidden rounded-xl border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink v-for="(m, i) in modules" :key="m.title" :to="m.to" class="group relative bg-bone p-6 transition-colors hover:bg-paper">
            <div class="flex items-start justify-between"><span class="flex size-10 items-center justify-center rounded-lg" :class="m.tone === 'mint' ? 'bg-mint/25 text-mint-deep' : 'bg-signal/15 text-signal-deep'"><component :is="m.icon" :size="19" :stroke-width="1.7" /></span><span class="font-mono text-[9px] text-ink/75">0{{ i + 1 }}</span></div>
            <h3 class="mt-8 font-display text-[23px] tracking-[-.03em]">{{ m.title }}</h3>
            <p class="mt-2 max-w-[28ch] text-[13.5px] leading-relaxed text-ink/75">{{ m.text }}</p>
            <span class="mt-6 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[.1em] text-ink/75 transition-colors group-hover:text-signal-deep">Open <ArrowUpRight :size="12" /></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-ink text-bone">
      <div class="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <SectionLabel index="03" tone="light">No more waiting room</SectionLabel>
          <h2 class="mt-7 type-lg max-w-[12ch]">From inspection file to a clear decision.</h2>
          <p class="mt-5 max-w-md text-[15px] leading-relaxed text-bone/75">Most reports take weeks and arrive as a huge PDF. Vomtek sorts the findings as soon as you upload, so your team can decide the same day.</p>
          <NuxtLink to="/intelligence" class="btn btn-mint mt-7">See how it works <ArrowUpRight :size="13" /></NuxtLink>
        </div>
        <div class="lg:col-span-7">
          <div class="divide-y divide-bone/10 border-y border-bone/10">
            <div v-for="(s, i) in steps" :key="s.n" class="group grid grid-cols-[48px_1fr] gap-4 py-6 md:grid-cols-[80px_1fr_auto] md:items-start">
              <span class="font-mono text-[11px] text-mint">{{ s.n }}</span>
              <div><h3 class="font-display text-[25px] tracking-[-.03em]">{{ s.title }}</h3><p class="mt-2 max-w-lg text-[13.5px] leading-relaxed text-bone/75">{{ s.text }}</p></div>
              <span class="hidden size-9 items-center justify-center rounded-full border border-bone/15 text-bone/75 transition-colors group-hover:border-mint group-hover:text-mint md:flex"><ArrowUpRight :size="14" /></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-y overflow-hidden">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <SectionLabel index="04">The report</SectionLabel>
          <h2 class="mt-6 type-lg max-w-[12ch]">A short to-do list. Not a data dump.</h2>
          <p class="mt-5 max-w-md text-[15px] leading-relaxed text-ink/75">Every problem is sorted by how deep it is, how fast it is growing and how soon it needs attention. The map, the safety check and the repair advice sit on one screen.</p>
          <ul class="mt-7 space-y-3 border-t border-ink/12 pt-5">
            <li v-for="line in ['A safety check against the industry safety standard', 'How much the problem grew since the last inspection', 'How long the pipe can safely stay in service', 'Photos, location and a full record of every finding']" :key="line" class="flex items-start gap-3 text-[13.5px] text-ink/75"><span class="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />{{ line }}</li>
          </ul>
          <NuxtLink to="/login" class="btn btn-dark mt-7">See a sample report <ArrowUpRight :size="13" /></NuxtLink>
        </div>
        <div class="lg:col-span-7">
          <div class="overflow-hidden rounded-2xl border border-ink/15 bg-ink text-bone shadow-[0_35px_80px_-55px_rgba(7,16,14,.8)]">
            <div class="flex items-center justify-between border-b border-bone/10 px-4 py-3"><div class="flex items-center gap-2"><span class="size-2 rounded-full bg-signal" /><span class="font-mono text-[9px] uppercase tracking-[.1em] text-bone/75">Safety report · VTK-2026-1048</span></div><span class="rounded-full bg-mint/15 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[.08em] text-mint">High risk</span></div>
            <div class="p-4">
              <AnomalyCanvas :anomalies="[{distanceM:4800,depthPct:18,severity:'low'},{distanceM:12800,depthPct:28,severity:'medium'},{distanceM:21400,depthPct:68,severity:'critical'},{distanceM:30200,depthPct:42,severity:'high'},{distanceM:39800,depthPct:16,severity:'low'}]" :length-km="48.2" :height="220" />
              <div class="mt-3 grid grid-cols-3 gap-2">
                <div class="rounded-lg bg-bone/5 p-3"><p class="font-mono text-[8px] uppercase tracking-[.08em] text-bone/75">Deepest damage</p><p class="mt-1 font-display text-[26px]">68.0<span class="text-[12px] text-bone/75">%</span></p></div>
                <div class="rounded-lg bg-bone/5 p-3"><p class="font-mono text-[8px] uppercase tracking-[.08em] text-bone/75">Growth / year</p><p class="mt-1 font-display text-[26px]">0.65<span class="text-[12px] text-bone/75"> mm/y</span></p></div>
                <div class="rounded-lg bg-bone/5 p-3"><p class="font-mono text-[8px] uppercase tracking-[.08em] text-bone/75">Safe pressure</p><p class="mt-1 font-display text-[26px]">5.7<span class="text-[12px] text-bone/75"> MPa</span></p></div>
              </div>
              <div class="mt-3 overflow-hidden rounded-lg border border-bone/10">
                <div class="grid grid-cols-[1fr_70px_70px_80px] bg-bone/5 px-3 py-2 font-mono text-[8px] uppercase tracking-[.08em] text-bone/75"><span>Problem</span><span>Depth</span><span>Safe life</span><span>Action</span></div>
                <div v-for="(a, i) in [{id:'A-014',d:'68.0%',life:'1.8 y',action:'Repair',sev:'critical'},{id:'A-022',d:'42.0%',life:'4.2 y',action:'Monitor',sev:'high'},{id:'A-031',d:'28.0%',life:'7.9 y',action:'Review',sev:'medium'}]" :key="a.id" class="grid grid-cols-[1fr_70px_70px_80px] items-center border-t border-bone/10 px-3 py-2.5 text-[10.5px]"><span class="font-mono text-bone/75">{{ a.id }}</span><span>{{ a.d }}</span><span class="text-bone/75">{{ a.life }}</span><span :class="a.sev === 'critical' ? 'text-signal' : a.sev === 'high' ? 'text-[#ffb27d]' : 'text-mint'">{{ a.action }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-ink/10 bg-bone section-y">
      <div class="wrap">
        <div class="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><SectionLabel index="05">Parts and tools, on demand</SectionLabel><h2 class="mt-6 type-lg max-w-[13ch]">Find the right tool for your pipe.</h2></div><NuxtLink to="/configurator" class="btn btn-outline">Find my size <ArrowUpRight :size="13" /></NuxtLink></div>
        <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard v-for="product in (products || []).filter(p => p.featured).slice(0, 4)" :key="product._id" :product="product" />
        </div>
        <div class="mt-5 flex justify-end"><NuxtLink to="/marketplace" class="inline-flex items-center gap-2 text-[12px] font-semibold text-signal-deep">Browse all {{ products?.length || 8 }} products <ArrowRight :size="13" /></NuxtLink></div>
      </div>
    </section>

    <section class="section-y">
      <div class="wrap grid items-center gap-12 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <SectionLabel index="06">Made for real job sites</SectionLabel>
          <h2 class="mt-6 type-lg max-w-[13ch]">Built around the pipe, not the paperwork.</h2>
          <p class="mt-5 max-w-lg text-[16px] leading-relaxed text-ink/75">One record connects the inspection, the parts, the contractor and the payment. Every step is logged, so every decision can be checked later.</p>
          <div class="mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
            <div v-for="item in [{n:'Side by side',l:'inspection comparisons'},{n:'Any file',l:'common inspection formats'},{n:'8%',l:'marketplace fee'},{n:'24 hr',l:'home report turnaround'}]" :key="item.l"><p class="font-display text-[30px]">{{ item.n }}</p><p class="label-mono mt-1 text-ink/75">{{ item.l }}</p></div>
          </div>
        </div>
        <div class="relative lg:col-span-6">
          <div class="overflow-hidden rounded-2xl"><PhotoImage name="control-room" alt="Pipeline control room monitoring pipe data" sizes="(min-width:1024px) 50vw, 100vw" class="aspect-[4/3] w-full object-cover" /></div>
          <div class="absolute -bottom-4 left-4 right-4 rounded-xl border border-ink/12 bg-bone p-4 shadow-xl sm:left-8 sm:right-8"><div class="flex items-center gap-3"><span class="flex size-9 items-center justify-center rounded-full bg-mint/25 text-mint-deep"><Gauge :size="17" /></span><div class="flex-1"><p class="text-[12.5px] font-semibold">Live pipe health</p><p class="font-mono text-[9px] uppercase tracking-[.07em] text-ink/75">Gulf Coast Trunk 12 · updated 2 min ago</p></div><span class="font-display text-[25px]">78<span class="text-[11px] text-ink/75">/100</span></span></div></div>
        </div>
      </div>
    </section>

    <section class="bg-ink text-bone section-y">
      <div class="wrap">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-5"><SectionLabel index="07" tone="light">Simple plans</SectionLabel><h2 class="mt-6 type-lg max-w-[12ch]">Pay for the pipe you look after.</h2><p class="mt-5 max-w-md text-[15px] leading-relaxed text-bone/75">Choose the plan that fits your network, buy parts when you need them, rent tools for short jobs and order a home check when something goes wrong.</p><NuxtLink to="/pricing" class="btn btn-mint mt-7">See pricing <ArrowUpRight :size="13" /></NuxtLink></div>
          <div class="grid gap-3 sm:grid-cols-3 lg:col-span-7">
            <div v-for="(plan, i) in (plans || [])" :key="plan.slug" class="flex flex-col rounded-xl border p-5" :class="i === 1 ? 'border-mint bg-mint/10' : 'border-bone/15 bg-bone/5'"><div class="flex items-center justify-between"><p class="font-mono text-[9px] uppercase tracking-[.1em] text-bone/75">{{ plan.name }}</p><span v-if="i === 1" class="rounded-full bg-mint px-2 py-0.5 font-mono text-[8px] uppercase text-ink">Popular</span></div><p class="mt-6 font-display text-[36px]">${{ plan.pricePerMile }}<span class="text-[11px] text-bone/75">/mile</span></p><p class="mt-1 text-[11px] text-bone/75">from {{ money(plan.minMonthly) }}/mo</p><ul class="mt-5 flex-1 space-y-2 border-t border-bone/10 pt-4"><li v-for="f in plan.features.slice(0, 3)" :key="f" class="flex gap-2 text-[11.5px] leading-relaxed text-bone/75"><span class="mt-1.5 size-1 shrink-0 rounded-full bg-mint" />{{ f }}</li></ul><NuxtLink to="/pricing" class="mt-5 font-mono text-[9px] uppercase tracking-[.1em] text-mint">Choose plan →</NuxtLink></div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-signal text-ink">
      <div class="wrap grid items-center gap-8 py-14 md:grid-cols-[1fr_auto] md:py-20">
        <div><p class="label-mono">Start with one pipe</p><h2 class="mt-3 max-w-[17ch] font-display text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[.95] tracking-[-.05em]">Send us an inspection. We will show you what it found.</h2></div>
        <div class="flex flex-wrap gap-2 md:justify-end"><NuxtLink to="/contact" class="btn btn-dark">Talk to our team <ArrowUpRight :size="14" /></NuxtLink><NuxtLink to="/login" class="btn bg-bone text-ink">Try the demo</NuxtLink></div>
      </div>
    </section>
  </div>
</template>
