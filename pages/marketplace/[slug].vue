<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck, Truck } from 'lucide-vue-next'
const route = useRoute(); const api = useApi(); const cart = useCart()
const { data: product } = await useAsyncData(`product-${route.params.slug}`, () => api.request<any>(`/catalog/products/${route.params.slug}`).catch(() => null))
if (!product.value) throw createError({ statusCode: 404, statusMessage: 'Product not found' })
const added = ref(false)
function add() { cart.add(product.value); added.value = true; setTimeout(() => added.value = false, 1800) }
</script>
<template>
  <div v-if="product">
    <div class="wrap pt-7"><NuxtLink to="/marketplace" class="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.1em] text-ink/45 hover:text-ink"><ArrowLeft :size="13" /> Marketplace</NuxtLink></div>
    <section class="wrap grid gap-10 py-8 lg:grid-cols-12 lg:gap-14 lg:py-12">
      <div class="lg:col-span-7">
        <div class="overflow-hidden rounded-2xl bg-ink/5"><PhotoImage :name="product.image || 'six-inch-pig'" :alt="product.name" sizes="(min-width:1024px) 55vw, 100vw" eager class="aspect-[4/3] w-full object-cover" /></div>
        <div class="mt-5 grid gap-4 sm:grid-cols-2"><div v-for="s in product.specs" :key="s.label" class="rounded-lg border border-ink/12 p-4"><p class="label-mono text-ink/40">{{ s.label }}</p><p class="mt-1 font-display text-[21px] tracking-[-.02em]">{{ s.value }}</p></div></div>
      </div>
      <div class="lg:col-span-5">
        <p class="label-mono text-signal-deep">{{ product.category }}</p>
        <h1 class="mt-3 font-display text-[clamp(2.5rem,4vw,3.6rem)] leading-[.98] tracking-[-.045em]">{{ product.name }}</h1>
        <p class="mt-4 text-[15px] leading-relaxed text-ink/60">{{ product.description }}</p>
        <div class="mt-7 flex items-end justify-between border-y border-ink/12 py-5"><div><p class="font-display text-[38px]">{{ money(product.priceUsd) }}</p><p class="font-mono text-[9px] uppercase tracking-[.08em] text-ink/40">{{ product.unit }} · {{ product.leadTime }}</p></div><span class="rounded-full bg-mint/25 px-3 py-1.5 font-mono text-[8.5px] uppercase tracking-[.08em] text-mint-deep">In stock · {{ product.stock }}</span></div>
        <div class="mt-5 flex flex-col gap-2"><button class="btn btn-dark w-full" @click="add">{{ added ? 'Added to cart' : 'Add to cart' }} <Check v-if="added" :size="14" /><ArrowUpRight v-else :size="14" /></button><NuxtLink to="/app/marketplace" class="btn btn-outline w-full">Buy in the portal</NuxtLink></div>
        <div class="mt-6 space-y-3 border-t border-ink/12 pt-5 text-[12px] text-ink/55"><p class="flex items-center gap-2"><ShieldCheck :size="14" class="text-mint-deep" /> Vendor-verified listing · LineSight buyer protection</p><p class="flex items-center gap-2"><Truck :size="14" class="text-mint-deep" /> Ships from {{ product.vendor }} · {{ product.leadTime }}</p></div>
      </div>
    </section>
  </div>
</template>
