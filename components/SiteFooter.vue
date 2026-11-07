<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
const year = new Date().getFullYear()
const groups = [
  { title: 'Platform', links: [['Pipeline answers', '/intelligence'], ['Vomtek Home', '/homeowners'], ['Marketplace', '/marketplace'], ['Rentals', '/rentals'], ['Pricing', '/pricing']] },
  { title: 'Company', links: [['About', '/about'], ['Contact', '/contact'], ['Security', '/security'], ['Careers', '/careers']] },
  { title: 'Resources', links: [['Helpful guides', '/insights'], ['Pipe safety guide', '/insights/b31g'], ['Find a contractor', '/contractors'], ['System status', '/security']] },
]
</script>
<template>
  <footer class="relative overflow-hidden bg-ink text-bone">
    <div class="wrap relative border-b border-bone/10 py-16 md:py-24">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <p class="label-mono text-signal">No more guesswork.</p>
          <h2 class="mt-5 max-w-[12ch] font-display text-[clamp(2.6rem,5vw,4.7rem)] font-medium leading-[.94] tracking-[-.05em]">Know your pipes.<br><span class="text-mint">Sleep at night.</span></h2>
          <div class="mt-8 flex flex-wrap gap-2">
            <NuxtLink to="/contact" class="btn btn-primary">Talk to our team <ArrowUpRight :size="14" /></NuxtLink>
            <NuxtLink to="/app" class="btn btn-outline-dark">Open the demo</NuxtLink>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
          <div v-for="group in groups" :key="group.title">
            <p class="label-mono text-bone/75">{{ group.title }}</p>
            <ul class="mt-5 space-y-2.5">
              <li v-for="[label, to] in group.links" :key="label"><NuxtLink :to="to" class="text-[14px] text-bone/75 transition-colors hover:text-mint">{{ label }}</NuxtLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-4"><BrandMark tone="light" /><span class="hidden h-5 w-px bg-bone/15 sm:block" /><span class="font-mono text-[10px] uppercase tracking-[.1em] text-bone/75">Houston, TX · Built for the field</span></div>
      <div class="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[.1em] text-bone/75">
        <span>© {{ year }} Vomtek Inc.</span><NuxtLink to="/privacy" class="hover:text-bone/75">Privacy</NuxtLink><NuxtLink to="/terms" class="hover:text-bone/75">Terms</NuxtLink><span>ISO 27001 roadmap</span>
      </div>
    </div>
  </footer>
</template>
