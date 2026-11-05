<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
definePageMeta({ layout: 'app' })
const api = useApi()
const { data: notifications, refresh } = await useAsyncData('portal-notifications', () => api.request<any[]>('/portal/notifications').catch(() => []))
async function read(id: string) { await api.request(`/portal/notifications/${id}/read`, { method: 'POST' }); await refresh() }
</script>
<template><div><PortalHeader><template #eyebrow>Inbox</template><template #title>Notifications.</template><template #subtitle>Report releases, payment receipts, contractor updates and verification events.</template></PortalHeader><div class="rounded-xl border border-ink/12 bg-bone"><div class="divide-y divide-ink/10"><div v-for="n in notifications" :key="n._id" class="flex items-start gap-3 px-4 py-4" :class="!n.readAt ? 'bg-mint/5' : ''"><span class="flex size-8 shrink-0 items-center justify-center rounded-full" :class="n.readAt ? 'bg-ink/5 text-ink/35' : 'bg-mint/20 text-mint-deep'"><Bell :size="14"/></span><div class="min-w-0 flex-1"><p class="text-[12px] font-medium">{{ n.subject }}</p><p class="mt-0.5 text-[11px] text-ink/50">{{ n.body }}</p><p class="mt-1 font-mono text-[7.5px] uppercase tracking-[.06em] text-ink/30">{{ shortDate(n.createdAt) }} · {{ n.channel }}</p></div><button v-if="!n.readAt" class="font-mono text-[8px] uppercase text-signal-deep" @click="read(n._id)">Mark read</button></div><div v-if="!notifications?.length" class="p-8 text-center text-[12px] text-ink/40">No notifications yet.</div></div></div></div></template>
