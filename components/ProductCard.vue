<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
defineProps<{ product: any; compact?: boolean }>()
</script>
<template>
  <NuxtLink :to="`/marketplace/${product.slug}`" class="group block overflow-hidden rounded-xl border border-ink/12 bg-bone transition-all hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_20px_40px_-30px_rgba(7,16,14,.5)]">
    <div class="relative overflow-hidden bg-ink/5" :class="compact ? 'h-36' : 'h-52'">
      <PhotoImage :name="product.image || 'six-inch-pig'" :alt="product.name" sizes="(min-width:1024px) 25vw, 50vw" class="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      <span class="absolute left-3 top-3 rounded-full bg-ink/75 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[.1em] text-bone backdrop-blur">{{ product.category }}</span>
    </div>
    <div class="p-4">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-display text-[18px] leading-tight tracking-[-.025em]">{{ product.name }}</h3>
        <ArrowUpRight :size="15" class="mt-1 shrink-0 text-ink/75 transition-colors group-hover:text-signal" />
      </div>
      <p class="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink/75">{{ product.description }}</p>
      <div class="mt-4 flex items-center justify-between border-t border-ink/10 pt-3">
        <span class="font-mono text-[12px] font-medium">{{ money(product.priceUsd) }} <span class="text-[9px] font-normal text-ink/75">{{ product.unit }}</span></span>
        <span class="font-mono text-[9px] uppercase tracking-[.08em] text-ink/75">{{ product.leadTime }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
