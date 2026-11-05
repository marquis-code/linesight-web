<script setup lang="ts">
const posts = [
  { slug: 'b31g', tag: 'Standards', title: 'ASME B31G in plain English', text: 'What the remaining-strength equation actually tells you, and where operators get it wrong.', date: 'Oct 2026' },
  { slug: 'data-black-hole', tag: 'Operations', title: 'The 12-week report is a business risk', text: 'How inspection backlog turns into deferred maintenance, and what to measure instead.', date: 'Sep 2026' },
  { slug: 'dig-once', tag: 'Home', title: 'The case for camera-first home repair', text: 'Why a $149 scope can prevent a $5,000 blind dig.', date: 'Sep 2026' },
]
</script>
<template><div><section class="section-y bg-ink text-bone"><div class="wrap"><p class="label-mono text-mint">Field notes</p><h1 class="mt-4 max-w-[13ch] font-display text-[clamp(3rem,6vw,5.6rem)] leading-[.93] tracking-[-.05em]">Notes from the line.</h1></div></section><section class="section-y"><div class="wrap divide-y divide-ink/12 border-y border-ink/12"><NuxtLink v-for="p in posts" :key="p.slug" :to="`/insights/${p.slug}`" class="group grid gap-3 py-7 md:grid-cols-[140px_1fr_auto] md:items-center"><span class="label-mono text-ink/40">{{ p.tag }} · {{ p.date }}</span><div><h2 class="font-display text-[28px] tracking-[-.03em] group-hover:text-signal-deep">{{ p.title }}</h2><p class="mt-1 text-[13px] text-ink/50">{{ p.text }}</p></div><span class="font-mono text-[10px] uppercase tracking-[.1em] text-ink/35">Read →</span></NuxtLink></div></section></div></template>
