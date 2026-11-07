<script setup lang="ts">
import { ArrowUpRight, FileUp, Package, Plus, Radar, Truck } from 'lucide-vue-next'
definePageMeta({ layout: 'app' })
const api = useApi()
const { data, pending } = await useAsyncData('portal-overview', () => api.request<any>('/portal/overview').catch(() => null))
const user = computed(() => api.user.value)
</script>
<template>
  <div>
    <PortalHeader><template #eyebrow>Your dashboard</template><template #title>Good morning, {{ user?.name?.split(' ')[0] || 'operator' }}.</template><template #subtitle>Your pipes, open problems and recent activity in one place.</template></PortalHeader>
    <div v-if="pending" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div v-for="i in 4" :key="i" class="h-28 animate-pulse rounded-xl bg-bone" /></div>
    <template v-else-if="data">
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Pipes tracked" :value="data.stats.assets" :note="`${data.stats.totalKm.toFixed(1)} km under management`" />
        <MetricCard label="Problems to review" :value="data.stats.critical" note="Need attention first" tone="dark" />
        <MetricCard label="Reports" :value="data.stats.reports" note="Most recent inspection checked" />
        <MetricCard label="Parts and rentals" :value="money(data.stats.spend)" note="Marketplace and rentals" tone="mint" />
      </div>
      <div class="mt-5 grid gap-5 xl:grid-cols-12">
        <div class="xl:col-span-8">
          <div class="rounded-xl border border-ink/12 bg-bone">
            <div class="flex items-center justify-between border-b border-ink/10 px-4 py-3"><p class="font-display text-[18px]">Pipe health</p><NuxtLink to="/app/assets" class="font-mono text-[9px] uppercase tracking-[.08em] text-ink/75 hover:text-ink">All assets →</NuxtLink></div>
            <div class="divide-y divide-ink/10">
              <NuxtLink v-for="asset in data.assets" :key="asset._id" to="/app/assets" class="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-paper">
                <span class="flex size-9 shrink-0 items-center justify-center rounded-lg" :class="asset.health < 70 ? 'bg-signal/15 text-signal-deep' : 'bg-mint/20 text-mint-deep'"><Radar :size="16" /></span>
                <div class="min-w-0 flex-1"><p class="truncate text-[13px] font-medium">{{ asset.name }}</p><p class="mt-0.5 font-mono text-[9px] uppercase tracking-[.06em] text-ink/75">{{ asset.location }} · {{ asset.diameterMm }} mm · {{ asset.lengthKm }} km</p></div>
                <div class="hidden w-28 sm:block"><div class="h-1.5 overflow-hidden rounded-full bg-ink/10"><div class="h-full rounded-full" :class="asset.health < 70 ? 'bg-signal' : 'bg-mint-deep'" :style="{ width: `${asset.health}%` }" /></div></div>
                <p class="w-9 text-right font-mono text-[12px]">{{ asset.health }}</p>
                <ArrowUpRight :size="13" class="text-ink/75 group-hover:text-signal" />
              </NuxtLink>
            </div>
          </div>
          <div class="mt-5 rounded-xl border border-ink/12 bg-bone">
            <div class="flex items-center justify-between border-b border-ink/10 px-4 py-3"><p class="font-display text-[18px]">Latest inspection reports</p><NuxtLink to="/app/inspections" class="font-mono text-[9px] uppercase tracking-[.08em] text-ink/75 hover:text-ink">All reports →</NuxtLink></div>
            <div v-if="data.reports.length" class="divide-y divide-ink/10"><NuxtLink v-for="r in data.reports.slice(0, 3)" :key="r._id" :to="`/app/reports/${r._id}`" class="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3.5 hover:bg-paper"><div><p class="font-mono text-[10px] text-ink/75">{{ r.ref }}</p><p class="mt-0.5 line-clamp-1 text-[12px]">{{ r.summary }}</p></div><StatusPill :status="r.risk" /></NuxtLink></div>
            <div v-else class="p-6 text-[12px] text-ink/75">No reports yet. Upload inspection to create one.</div>
          </div>
        </div>
        <div class="space-y-4 xl:col-span-4">
          <div class="rounded-xl bg-ink p-5 text-bone"><p class="label-mono text-mint">Fast actions</p><div class="mt-4 space-y-1"><NuxtLink v-for="a in [{l:'Upload inspection',to:'/app/inspections',i:FileUp},{l:'Buy parts',to:'/app/marketplace',i:Package},{l:'Rent a tool',to:'/app/rentals',i:Truck}]" :key="a.l" :to="a.to" class="flex items-center gap-3 rounded-lg border border-bone/10 px-3 py-2.5 text-[12px] text-bone/75 transition-colors hover:border-mint/40 hover:text-bone"><component :is="a.i" :size="14" class="text-mint" />{{ a.l }}<ArrowUpRight :size="12" class="ml-auto text-bone/75" /></NuxtLink></div></div>
          <div class="rounded-xl border border-ink/12 bg-bone p-5"><p class="label-mono text-ink/75">Subscription</p><template v-if="data.subscription"><p class="mt-2 font-display text-[25px] capitalize">{{ data.subscription.planSlug }} plan</p><p class="mt-1 text-[11.5px] text-ink/75">{{ data.subscription.miles }} miles · {{ money(data.subscription.annualValue) }}/yr</p><div class="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10"><div class="h-full w-2/3 rounded-full bg-mint-deep" /></div><p class="mt-2 font-mono text-[8px] uppercase tracking-[.08em] text-ink/75">Renews {{ shortDate(data.subscription.renewsAt) }}</p></template><p v-else class="mt-2 text-[12px] text-ink/75">No active plan.</p><NuxtLink to="/app/billing" class="mt-4 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[.08em] text-signal-deep">Manage billing <ArrowUpRight :size="11" /></NuxtLink></div>
          <div class="rounded-xl border border-ink/12 bg-mint/15 p-5"><p class="label-mono text-mint-deep">Need help?</p><p class="mt-2 text-[13px] leading-relaxed text-ink/75">An integrity engineer can review your first run and walk the findings with your team.</p><NuxtLink to="/contact" class="btn btn-dark mt-4 !min-h-9 !px-3 !text-[10px]">Ask for help</NuxtLink></div>
        </div>
      </div>
    </template>
    <div v-else class="rounded-xl border border-ink/12 bg-bone p-8"><p class="font-display text-[24px]">The workspace is ready.</p><p class="mt-2 text-[13px] text-ink/75">Sign in with a demo account to load seeded assets and reports.</p></div>
  </div>
</template>
