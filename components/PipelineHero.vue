<script setup lang="ts">
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, ShieldCheck, Waves } from 'lucide-vue-next'

type Slide = { label: string; title: string; text: string; image: string; alt: string }
const mode = ref<'operator' | 'homeowner'>('operator')
const index = ref(0)
const paused = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const operatorSlides: Slide[] = [
  { label: '01 · INTAKE', title: 'One run in. Every anomaly ranked.', text: 'Drop an MFL, caliper or CCTV file. Vomtek normalises the run and screens every finding against ASME B31G.', image: 'pipeline-construction', alt: 'Large-diameter pipeline under construction' },
  { label: '02 · VERIFY', title: 'A signed answer, not a 12-week PDF.', text: 'Safe pressure, corrosion growth and remaining life are calculated on ingestion, with a full audit trail.', image: 'pipeline-welding', alt: 'Pipeline welding in the field' },
  { label: '03 · COMPARE', title: 'The asset, in four dimensions.', text: 'Align multi-year and multi-vendor runs in one digital twin. See what is actually growing before it fails.', image: 'compressor-station', alt: 'Gas compressor station asset' },
]
const homeownerSlides: Slide[] = [
  { label: '01 · CAPTURE', title: 'Know the line before you dig.', text: 'Upload a camera walkthrough from your phone or a rental kit. Vomtek maps every finding to distance and severity.', image: 'water-utility', alt: 'Water utility pipeline infrastructure' },
  { label: '02 · CERTIFY', title: 'A health report your contractor understands.', text: 'A plain-language certificate, repair scope and confidence score — ready to send for real bids.', image: 'inspection-robot', alt: 'Pipeline inspection camera robot' },
  { label: '03 · REPAIR', title: 'Verified bids. Milestone payments.', text: 'Local contractors bid on the same scope. Funds are released only after the repair is camera-verified.', image: 'control-room', alt: 'Control room monitoring infrastructure' },
]
const slides = computed(() => mode.value === 'operator' ? operatorSlides : homeownerSlides)
const slide = computed(() => slides.value[index.value])
const copy = computed(() => mode.value === 'operator' ? {
  kicker: 'Pipeline & utility intelligence',
  line1: 'See the line.',
  line2: 'Prove the asset.',
  body: 'Ingest inspection data, screen every anomaly against ASME B31G, and give your team a defensible integrity answer in hours — not another 12-week report backlog.',
  primary: 'Run a free diagnostic',
  secondary: 'Explore intelligence',
  stat: '99.1%',
  statLabel: 'anomaly coverage',
} : {
  kicker: 'Vomtek Home · for property owners',
  line1: 'Know the line.',
  line2: 'Before you dig.',
  body: 'Upload a camera walkthrough and get a plain-language health report, a repair scope and verified contractor bids — without a blind excavation.',
  primary: 'Diagnose my line',
  secondary: 'See how Home works',
  stat: '24 hr',
  statLabel: 'report turnaround',
})

function start() {
  stop()
  timer = setInterval(() => { if (!paused.value) index.value = (index.value + 1) % slides.value.length }, 6500)
}
function stop() { if (timer) clearInterval(timer); timer = null }
function go(next: number) { index.value = (next + slides.value.length) % slides.value.length; start() }
function toggle() { paused.value = !paused.value }
function setMode(next: 'operator' | 'homeowner') { mode.value = next; index.value = 0; paused.value = false; start() }
watch(() => slides.value.length, () => { index.value = 0; start() })
onMounted(start)
onUnmounted(stop)
</script>

<template>
  <section class="relative overflow-hidden border-b border-ink/10 bg-white text-ink">
    <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(7,16,14,.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(7,16,14,.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
    <div class="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full bg-vomtek/10 blur-[120px]" />
    <div class="pointer-events-none absolute -left-40 bottom-0 size-[420px] rounded-full bg-signal/5 blur-[100px]" />

    <div class="wrap relative grid min-h-[calc(100svh-72px)] items-center gap-12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
      <div class="relative z-10 lg:col-span-7">
        <div class="inline-flex rounded-full border border-ink/15 bg-white p-1 shadow-sm">
          <button type="button" class="rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[.1em] transition-colors" :class="mode === 'operator' ? 'bg-ink text-white' : 'text-ink/50 hover:text-ink'" @click="setMode('operator')">B2B · Operators</button>
          <button type="button" class="rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[.1em] transition-colors" :class="mode === 'homeowner' ? 'bg-ink text-white' : 'text-ink/50 hover:text-ink'" @click="setMode('homeowner')">B2C · Homeowners</button>
        </div>

        <p class="mt-8 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[.12em] text-vomtek"><span class="status-dot" /> {{ copy.kicker }}</p>
        <h1 class="type-hero mt-4">
          {{ copy.line1 }}<br><span class="text-vomtek">{{ copy.line2 }}</span>
        </h1>
        <p class="mt-6 max-w-[35rem] text-[17px] leading-relaxed text-ink/65 md:text-[18px]">{{ copy.body }}</p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <NuxtLink :to="mode === 'operator' ? '/login' : '/login'" class="btn btn-brand">{{ copy.primary }} <ArrowUpRight :size="14" /></NuxtLink>
          <NuxtLink :to="mode === 'operator' ? '/intelligence' : '/homeowners'" class="btn btn-outline">{{ copy.secondary }}</NuxtLink>
        </div>

        <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/10 pt-6">
          <div><p class="font-display text-[30px] font-semibold leading-none">{{ copy.stat }}</p><p class="mt-1 font-mono text-[9px] uppercase tracking-[.1em] text-ink/40">{{ copy.statLabel }}</p></div>
          <div class="space-y-1.5"><p class="flex items-center gap-2 text-[12.5px] text-ink/60"><ShieldCheck :size="14" class="text-vomtek" /> ASME B31G screened</p><p class="flex items-center gap-2 text-[12.5px] text-ink/60"><Waves :size="14" class="text-vomtek" /> Vendor-agnostic ingestion</p></div>
          <div class="hidden h-8 w-px bg-ink/10 sm:block" />
          <p class="max-w-[13rem] font-mono text-[9px] uppercase leading-relaxed tracking-[.08em] text-ink/35">Houston-built. Audit-ready. Built for the field.</p>
        </div>
      </div>

      <div class="relative z-10 lg:col-span-5" @mouseenter="paused = true" @mouseleave="paused = false" @focusin="paused = true" @focusout="paused = false">
        <div class="overflow-hidden rounded-2xl border border-ink/15 bg-white shadow-[0_35px_80px_-45px_rgba(7,16,14,.35)]">
          <div class="relative aspect-[4/3] overflow-hidden bg-ink/5 sm:aspect-[5/4]">
            <Transition name="hero-fade" mode="out-in">
              <PhotoImage :key="slide.image" :name="slide.image" :alt="slide.alt" sizes="(min-width:1024px) 40vw, 100vw" :eager="index === 0" class="absolute inset-0 size-full object-cover" />
            </Transition>
            <div class="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
            <div class="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/25 bg-ink/55 px-3 py-1.5 backdrop-blur"><span class="status-dot text-mint" /><span class="font-mono text-[9px] uppercase tracking-[.12em] text-white/80">{{ slide.label }}</span></div>
            <div class="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[.1em] text-vomtek">Vomtek verified</div>
          </div>

          <div class="p-5 sm:p-6">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0"><p class="font-mono text-[8.5px] uppercase tracking-[.1em] text-ink/35">{{ mode === 'operator' ? 'Integrity workflow' : 'Vomtek Home' }}</p><h2 class="mt-1.5 font-display text-[clamp(1.45rem,2vw,1.9rem)] font-semibold leading-[1.02] tracking-[-.035em]">{{ slide.title }}</h2></div>
              <span class="shrink-0 rounded-full border border-ink/10 bg-paper px-2.5 py-1 font-mono text-[9px] text-ink/50">{{ String(index + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</span>
            </div>
            <p class="mt-3 max-w-[31rem] text-[12.5px] leading-relaxed text-ink/55">{{ slide.text }}</p>

            <div class="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
              <div class="flex items-center gap-2">
                <button type="button" class="flex size-8 items-center justify-center rounded-full border border-ink/15 text-ink/55 transition-colors hover:border-ink hover:text-ink" aria-label="Previous slide" @click="go(index - 1)"><ArrowLeft :size="14" /></button>
                <button type="button" class="flex size-8 items-center justify-center rounded-full border border-ink/15 text-ink/55 transition-colors hover:border-ink hover:text-ink" aria-label="Next slide" @click="go(index + 1)"><ArrowRight :size="14" /></button>
                <button type="button" class="ml-1 flex size-8 items-center justify-center rounded-full border border-ink/15 text-ink/55 transition-colors hover:border-ink hover:text-ink" :aria-label="paused ? 'Play carousel' : 'Pause carousel'" @click="toggle"><Play v-if="paused" :size="12" fill="currentColor" /><Pause v-else :size="12" /></button>
              </div>
              <div class="flex items-center gap-1.5">
                <button v-for="(s, i) in slides" :key="s.label" type="button" class="h-1.5 rounded-full transition-all duration-300" :class="i === index ? 'w-7 bg-vomtek' : 'w-2.5 bg-ink/15 hover:bg-ink/30'" :aria-label="`Go to slide ${i + 1}`" @click="go(i)" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-between px-1">
          <p class="font-mono text-[8.5px] uppercase tracking-[.08em] text-ink/35">Live operational view · demo data</p>
          <p class="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[.08em] text-vomtek"><span class="size-1.5 rounded-full bg-vomtek" /> {{ paused ? 'Paused' : 'Auto-advancing' }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-fade-enter-active, .hero-fade-leave-active { transition: opacity .45s ease, transform .55s cubic-bezier(.16,1,.3,1); }
.hero-fade-enter-from { opacity: 0; transform: scale(1.03); }
.hero-fade-leave-to { opacity: 0; transform: scale(.98); }
</style>
