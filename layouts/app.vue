<script setup lang="ts">
import { Activity, ArrowUpRight, Bell, Boxes, ClipboardList, CreditCard, FileText, Gauge, Home, LayoutDashboard, LogOut, Menu, Package, Radar, Truck, Users, X } from 'lucide-vue-next'
const api = useApi(); const router = useRouter(); const open = ref(false)
const nav = [
  { label: 'Overview', to: '/app', icon: LayoutDashboard },
  { label: 'Assets', to: '/app/assets', icon: Gauge },
  { label: 'Inspections', to: '/app/inspections', icon: Radar },
  { label: 'Marketplace', to: '/app/marketplace', icon: Boxes },
  { label: 'Orders', to: '/app/orders', icon: Package },
  { label: 'Rentals', to: '/app/rentals', icon: Truck },
  { label: 'Home jobs', to: '/app/home', icon: Home },
  { label: 'Contractor', to: '/app/contractor', icon: Users },
  { label: 'Partner catalog', to: '/app/partner', icon: Boxes },
  { label: 'Billing', to: '/app/billing', icon: CreditCard },
  { label: 'Notifications', to: '/app/notifications', icon: Bell },
]
onMounted(async () => {
  api.init()
  if (!api.token.value) { router.replace('/login'); return }
  const user = await api.me()
  if (!user) router.replace('/login')
})
function logout() { api.clear(); router.push('/login') }
</script>
<template>
  <div class="min-h-screen bg-paper lg:grid lg:grid-cols-[250px_1fr]">
    <aside class="fixed inset-y-0 left-0 z-50 w-[250px] -translate-x-full border-r border-bone/10 bg-ink text-bone transition-transform lg:static lg:translate-x-0" :class="open ? 'translate-x-0' : ''">
      <div class="flex h-[72px] items-center justify-between border-b border-bone/10 px-5"><BrandMark tone="light" /><button class="lg:hidden" aria-label="Close menu" @click="open = false"><X :size="18" /></button></div>
      <div class="px-4 py-5">
        <div class="rounded-lg border border-bone/10 bg-bone/5 p-3"><p class="font-mono text-[8px] uppercase tracking-[.1em] text-bone/35">Workspace</p><p class="mt-1 truncate text-[12.5px] font-medium">{{ api.user.value?.orgName || 'Vomtek' }}</p><span class="mt-2 inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[.08em] text-mint"><span class="status-dot" /> Live</span></div>
      </div>
      <nav class="space-y-0.5 px-3">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[12.5px] text-bone/55 transition-colors hover:bg-bone/5 hover:text-bone" active-class="!bg-bone/10 !text-bone">
          <component :is="item.icon" :size="16" :stroke-width="1.7" />{{ item.label }}
        </NuxtLink>
      </nav>
      <div class="absolute inset-x-0 bottom-0 border-t border-bone/10 p-3">
        <div class="flex items-center gap-2.5 rounded-lg px-2 py-2"><span class="flex size-8 items-center justify-center rounded-full bg-mint font-mono text-[10px] text-ink">{{ (api.user.value?.name || 'LS').slice(0,2).toUpperCase() }}</span><div class="min-w-0 flex-1"><p class="truncate text-[11.5px] font-medium">{{ api.user.value?.name }}</p><p class="truncate font-mono text-[8px] uppercase text-bone/35">{{ api.user.value?.role }}</p></div><button class="text-bone/40 hover:text-signal" aria-label="Sign out" @click="logout"><LogOut :size="15" /></button></div>
        <NuxtLink to="/" class="mt-1 flex items-center justify-between rounded-lg px-2 py-2 font-mono text-[8.5px] uppercase tracking-[.08em] text-bone/35 hover:text-bone">Back to website <ArrowUpRight :size="11" /></NuxtLink>
      </div>
    </aside>
    <div v-if="open" class="fixed inset-0 z-40 bg-ink/40 lg:hidden" @click="open = false" />
    <div class="min-w-0">
      <header class="sticky top-0 z-30 flex h-[64px] items-center justify-between border-b border-ink/10 bg-paper/90 px-4 backdrop-blur lg:px-8"><div class="flex items-center gap-3"><button class="lg:hidden" aria-label="Open menu" @click="open = true"><Menu :size="19" /></button><p class="font-mono text-[9px] uppercase tracking-[.1em] text-ink/40">{{ $route.path }}</p></div><div class="flex items-center gap-3"><NuxtLink to="/app/inspections" class="btn btn-dark !min-h-9 !px-3 !text-[10px]">New inspection <ArrowUpRight :size="12" /></NuxtLink></div></header>
      <main class="px-4 py-6 lg:px-8 lg:py-8"><slot /></main>
    </div>
  </div>
</template>
