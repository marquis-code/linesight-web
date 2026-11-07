<script setup lang="ts">
import { ArrowUpRight, Check, LoaderCircle, Ruler, Waves } from 'lucide-vue-next'
const api = useApi()
const form = reactive({ odMm: 323.9, wallMm: 8.2, maopKpa: 6900, distanceKm: 24, product: 'Natural gas liquids' })
const result = ref<any>(null); const loading = ref(false); const requested = ref(false)
async function recommend() { loading.value = true; try { result.value = await api.request('/configurator', { method: 'POST', body: form }) } finally { loading.value = false } }
async function requestQuote() {
  if (!result.value) return
  await api.request('/leads', { method: 'POST', body: { name: 'Configurator request', email: 'demo@vomtek.com', company: 'Website visitor', type: 'operator', message: `Configurator: ${result.value.family}, ${form.odMm}mm OD, ${form.wallMm}mm wall, ${form.distanceKm}km, ${form.product}`, source: 'configurator' } })
  requested.value = true
}
onMounted(recommend)
</script>
<template>
  <div>
    <section class="border-b border-ink/10 bg-white py-14 md:py-20">
      <div class="wrap"><p class="label-mono text-vomtek">Tool size finder</p><h1 class="type-page-hero mt-4 max-w-[15ch]">Find the right tool.<br><span class="text-vomtek">See the price.</span></h1><p class="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70">Enter your pipe details. We recommend the right tool, the number of cups and an estimated price — without a sales call.</p></div>
    </section>
    <section class="section-y">
      <div class="wrap grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <form class="rounded-2xl border border-ink/12 bg-bone p-6 md:p-8" @submit.prevent="recommend">
            <div class="flex items-center justify-between border-b border-ink/12 pb-4"><p class="font-display text-[24px] tracking-[-.03em]">Your pipe details</p><span class="flex size-8 items-center justify-center rounded-full bg-mint/20 text-mint-deep"><Ruler :size="15" /></span></div>
            <div class="mt-6 grid gap-5 sm:grid-cols-2">
              <div><label class="field-label">Pipe width, outside (mm)</label><input v-model.number="form.odMm" type="number" step="0.1" class="field" /></div>
              <div><label class="field-label">Pipe wall thickness (mm)</label><input v-model.number="form.wallMm" type="number" step="0.1" class="field" /></div>
              <div><label class="field-label">Maximum pressure (kPa)</label><input v-model.number="form.maopKpa" type="number" class="field" /></div>
              <div><label class="field-label">How long is the pipe? (km)</label><input v-model.number="form.distanceKm" type="number" class="field" /></div>
              <div class="sm:col-span-2"><label class="field-label">What is inside?</label><AppSelect v-model="form.product" :options="['Crude oil','Natural gas liquids','Natural gas','Reclaimed water','Process water','Slurry']" placeholder="Select service" aria-label="Pipeline service" /></div>
            </div>
            <button type="submit" class="btn btn-dark mt-7 w-full" :disabled="loading"><LoaderCircle v-if="loading" :size="15" class="animate-spin" /> {{ loading ? 'Finding the right tool…' : 'Find my tool' }} <ArrowUpRight v-if="!loading" :size="14" /></button>
            <p class="mt-4 text-[11.5px] leading-relaxed text-ink/75">This is an estimate. Final pricing depends on bends, elevation, the product and travel. A Vomtek specialist reviews every setup.</p>
          </form>
        </div>
        <div class="lg:col-span-6">
          <div v-if="result" class="overflow-hidden rounded-2xl border border-ink/15 bg-ink text-bone">
            <div class="relative h-52 overflow-hidden"><PhotoImage name="six-inch-pig" alt="Configured pipeline pig" sizes="(min-width:1024px) 45vw, 100vw" class="size-full object-cover opacity-70" /><div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" /><div class="absolute bottom-4 left-5"><p class="label-mono text-mint">Recommended setup</p><h2 class="mt-1 font-display text-[31px] tracking-[-.04em]">{{ result.family }}</h2></div></div>
            <div class="p-5">
              <div class="flex items-end justify-between border-b border-bone/10 pb-4"><div><p class="font-mono text-[9px] uppercase tracking-[.08em] text-bone/75">Estimated run cost</p><p class="mt-1 font-display text-[38px]">{{ money(result.priceUsd) }}</p></div><span class="rounded-full bg-mint px-3 py-1.5 font-mono text-[8.5px] uppercase tracking-[.08em] text-ink">{{ result.leadTime }}</span></div>
              <div class="mt-4 grid grid-cols-2 gap-2"><div v-for="spec in result.specs" :key="spec.label" class="rounded-lg bg-bone/5 p-3"><p class="font-mono text-[8px] uppercase tracking-[.08em] text-bone/75">{{ spec.label }}</p><p class="mt-1 text-[14px] font-medium">{{ spec.value }}</p></div></div>
              <p class="mt-4 text-[12px] leading-relaxed text-bone/75">{{ result.notes }}</p>
              <div class="mt-5 flex gap-2"><button class="btn btn-mint flex-1" @click="requestQuote">{{ requested ? 'Request sent' : 'Ask us to check' }} <Check v-if="requested" :size="13" /></button><NuxtLink to="/marketplace" class="btn btn-outline-dark">Browse tools</NuxtLink></div>
            </div>
          </div>
          <div v-else class="flex h-80 items-center justify-center rounded-2xl border border-dashed border-ink/20"><LoaderCircle :size="20" class="animate-spin text-ink/75" /></div>
          <div class="mt-4 rounded-xl border border-ink/12 bg-bone p-5"><p class="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.1em] text-ink/75"><Waves :size="13" class="text-signal" /> Why this setup</p><p class="mt-2 text-[13px] leading-relaxed text-ink/75">We choose the tool, cup count and flow gap from your pipe size, wall and contents. You get a clear starting point in seconds instead of waiting for a callback.</p></div>
        </div>
      </div>
    </section>
  </div>
</template>
