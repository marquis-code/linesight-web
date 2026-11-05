<script setup lang="ts">
import { ArrowUpRight, Check, LoaderCircle, ShoppingBag, X } from 'lucide-vue-next'
definePageMeta({ layout: 'app' })
const api = useApi(); const cart = useCart()
const { data: products } = await useAsyncData('portal-products', () => api.request<any[]>('/catalog/products').catch(() => []))
const open = ref(false); const loading = ref(false); const done = ref<any>(null)
onMounted(() => cart.init())
async function checkout() {
  loading.value = true
  try { done.value = await api.request('/portal/orders', { method: 'POST', body: { items: cart.items.value } }); cart.clear(); open.value = false }
  finally { loading.value = false }
}
</script>
<template>
  <div>
    <PortalHeader><template #eyebrow>Procurement</template><template #title>Marketplace.</template><template #subtitle>Verified tools and spares, with LineSight buyer protection and 8% platform fee included.</template><template #actions><button class="btn btn-dark !min-h-9 !px-3 !text-[10px]" @click="open = true"><ShoppingBag :size="13" /> Cart · {{ cart.count.value }}</button></template></PortalHeader>
    <div v-if="done" class="mb-4 flex items-center gap-3 rounded-xl border border-mint/40 bg-mint/15 p-4"><span class="flex size-8 items-center justify-center rounded-full bg-mint text-ink"><Check :size="15" /></span><div><p class="text-[12.5px] font-semibold">Order {{ done.ref }} placed.</p><p class="text-[11px] text-ink/50">Total {{ money(done.total) }} · the operations team has been notified.</p></div></div>
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><article v-for="p in products" :key="p._id" class="overflow-hidden rounded-xl border border-ink/12 bg-bone"><div class="relative h-36"><PhotoImage :name="p.image" :alt="p.name" sizes="(min-width:1280px) 30vw, 50vw" class="size-full object-cover" /><span class="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-1 font-mono text-[7.5px] uppercase tracking-[.08em] text-bone backdrop-blur">{{ p.category }}</span></div><div class="p-4"><h3 class="font-display text-[18px] leading-tight">{{ p.name }}</h3><div class="mt-3 flex items-center justify-between"><p class="font-mono text-[13px]">{{ money(p.priceUsd) }} <span class="text-[9px] text-ink/35">{{ p.unit }}</span></p><button class="btn btn-outline !min-h-8 !px-2.5 !text-[9px]" @click="cart.add(p)">Add</button></div></div></article></div>
    <div v-if="open" class="fixed inset-0 z-[70] flex justify-end bg-ink/45 backdrop-blur-sm" @click.self="open = false"><aside class="flex h-full w-full max-w-md flex-col bg-bone"><div class="flex items-center justify-between border-b border-ink/10 p-5"><div><p class="label-mono text-signal-deep">Cart</p><h2 class="mt-1 font-display text-[26px]">Order summary</h2></div><button @click="open = false"><X :size="18" /></button></div><div class="flex-1 overflow-auto p-5"><div v-if="!cart.items.value.length" class="py-16 text-center text-[13px] text-ink/40">Your cart is empty.</div><div v-else class="space-y-3"><div v-for="item in cart.items.value" :key="item.slug" class="flex items-center gap-3 rounded-lg border border-ink/12 p-3"><div class="size-12 shrink-0 overflow-hidden rounded-md"><PhotoImage :name="item.image" :alt="item.name" sizes="60px" class="size-full object-cover" /></div><div class="min-w-0 flex-1"><p class="truncate text-[12px] font-medium">{{ item.name }}</p><p class="font-mono text-[10px] text-ink/40">{{ item.qty }} × {{ money(item.priceUsd) }}</p></div><button class="text-[10px] text-ink/30" @click="cart.items.value.splice(cart.items.value.findIndex(i => i.slug === item.slug), 1)">Remove</button></div></div></div><div class="border-t border-ink/10 p-5"><div class="flex justify-between text-[13px]"><span class="text-ink/50">Subtotal</span><span>{{ money(cart.total.value) }}</span></div><p class="mt-1 text-[10px] text-ink/40">Tax and freight calculated by operations.</p><button class="btn btn-dark mt-4 w-full" :disabled="loading || !cart.items.value.length" @click="checkout"><LoaderCircle v-if="loading" :size="14" class="animate-spin" /> {{ loading ? 'Placing order…' : 'Place order' }} <ArrowUpRight v-if="!loading" :size="13" /></button></div></aside></div>
  </div>
</template>
