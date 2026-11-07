<script setup lang="ts">
import { Search, SlidersHorizontal, ArrowUpRight } from 'lucide-vue-next'
const api = useApi()
const { data: products } = await useAsyncData('market-products', () => api.request<any[]>('/catalog/products').catch(() => []))
const query = ref(''); const category = ref('All')
const categories = computed(() => ['All', ...Array.from(new Set((products.value || []).map(p => p.category)))])
const filtered = computed(() => (products.value || []).filter(p => (category.value === 'All' || p.category === category.value) && (!query.value || `${p.name} ${p.description}`.toLowerCase().includes(query.value.toLowerCase()))))
</script>
<template>
  <div>
    <section class="border-b border-ink/10 bg-white py-14 md:py-20">
      <div class="wrap grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div><p class="label-mono text-vomtek">Vomtek Market</p><h1 class="type-page-hero mt-4 max-w-[14ch]">The right part.<br><span class="text-vomtek">For your pipe.</span></h1><p class="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70">Find inspection tools, cleaning parts and camera kits. Search by size, compare prices and buy or rent online.</p></div>
        <NuxtLink to="/configurator" class="btn btn-brand">Find my size <ArrowUpRight :size="14" /></NuxtLink>
      </div>
    </section>
    <section class="section-y">
      <div class="wrap">
        <div class="flex flex-col gap-5 border-b border-ink/12 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-wrap gap-2"><button v-for="c in categories" :key="c" type="button" class="rounded-full border px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[.08em] transition-colors" :class="category === c ? 'border-ink bg-ink text-bone' : 'border-ink/15 text-ink/75 hover:border-ink/40'" @click="category = c">{{ c }}</button></div>
          <label class="flex items-center gap-2 border-b border-ink/20 pb-2 lg:w-72"><Search :size="14" class="text-ink/75" /><input v-model="query" class="w-full bg-transparent text-[13px] outline-none placeholder:text-ink/55" placeholder="Search parts and tools"></label>
        </div>
        <div class="mt-7 flex items-center justify-between"><p class="font-mono text-[10px] uppercase tracking-[.1em] text-ink/75">{{ filtered.length }} products</p><p class="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[.08em] text-ink/75 sm:flex"><SlidersHorizontal :size="12" /> Verified manufacturers only</p></div>
        <div v-if="filtered.length" class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><ProductCard v-for="product in filtered" :key="product._id" :product="product" /></div>
        <div v-else class="mt-8 rounded-xl border border-dashed border-ink/20 p-12 text-center"><p class="font-display text-[25px]">No parts match that search.</p><button class="mt-3 text-[12px] font-semibold text-signal-deep" @click="query = ''; category = 'All'">Clear search</button></div>
      </div>
    </section>
  </div>
</template>
