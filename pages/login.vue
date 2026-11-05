<script setup lang="ts">
import { ArrowUpRight, LoaderCircle, ShieldCheck } from 'lucide-vue-next'
const api = useApi(); const router = useRouter(); const route = useRoute(); const config = useRuntimeConfig()
const form = reactive({ email: 'demo@linesight.io', password: 'LineSightDemo!2026' })
const loading = ref(false); const error = ref('')
const demos = [
  { label: 'Operator', email: 'demo@linesight.io', note: 'Northstar Midstream · owner' },
  { label: 'Utility', email: 'utility@linesight.io', note: 'Harris County Water · engineer' },
  { label: 'Homeowner', email: 'homeowner@linesight.io', note: 'Cedar Ridge HOA' },
  { label: 'Contractor', email: 'contractor@linesight.io', note: 'Precision Trenchless' },
]
function pick(email: string) { form.email = email; form.password = 'LineSightDemo!2026' }
async function submit() {
  loading.value = true; error.value = ''
  try {
    const data = await api.login(form.email, form.password)
    if (data.user?.role === 'admin' || data.user?.role === 'ops') window.location.href = config.public.adminUrl
    else router.push(String(route.query.redirect || '/app'))
  } catch (e: any) { error.value = e?.data?.message || 'Invalid email or password' }
  finally { loading.value = false }
}
</script>
<template>
  <section class="grid min-h-[calc(100svh-72px)] lg:grid-cols-2">
    <div class="relative hidden overflow-hidden bg-ink lg:block"><PhotoImage name="smart-pig" alt="Inline inspection tool" sizes="50vw" eager class="absolute inset-0 size-full object-cover opacity-45" /><div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" /><div class="relative flex h-full flex-col justify-between p-10 text-bone"><BrandMark tone="light" /><div><p class="label-mono text-mint">Operator workspace</p><h2 class="mt-3 max-w-[11ch] font-display text-[46px] leading-[.96] tracking-[-.05em]">See the line. Prove the asset.</h2><p class="mt-4 max-w-sm text-[13.5px] leading-relaxed text-bone/55">The demo is seeded with two operators, a live B31G report, a homeowner job, marketplace orders and contractor bids.</p></div><p class="font-mono text-[9px] uppercase tracking-[.1em] text-bone/35">LineSight demo environment · v1.0</p></div></div>
    <div class="flex items-center justify-center px-5 py-14"><div class="w-full max-w-md"><p class="label-mono text-signal-deep">Welcome back</p><h1 class="mt-3 font-display text-[42px] leading-none tracking-[-.045em]">Sign in to LineSight.</h1><p class="mt-3 text-[13.5px] text-ink/55">Use a demo account below or your own credentials.</p>
      <form class="mt-7 space-y-5" @submit.prevent="submit"><div><label class="field-label">Email</label><input v-model="form.email" type="email" required class="field" /></div><div><label class="field-label">Password</label><input v-model="form.password" type="password" required class="field" /></div><button class="btn btn-dark w-full" :disabled="loading"><LoaderCircle v-if="loading" :size="15" class="animate-spin" /> {{ loading ? 'Signing in…' : 'Sign in' }} <ArrowUpRight v-if="!loading" :size="14" /></button><p v-if="error" class="text-[12px] text-signal-deep">{{ error }}</p></form>
      <div class="mt-7 border-t border-ink/12 pt-5"><p class="font-mono text-[9px] uppercase tracking-[.1em] text-ink/40">Instant demo accounts</p><div class="mt-3 grid grid-cols-2 gap-2"><button v-for="d in demos" :key="d.email" class="rounded-lg border border-ink/12 p-3 text-left transition-colors hover:border-ink/35" @click="pick(d.email)"><span class="block text-[12.5px] font-semibold">{{ d.label }}</span><span class="mt-0.5 block text-[10px] leading-tight text-ink/40">{{ d.note }}</span></button></div><p class="mt-3 flex items-center gap-2 text-[10.5px] text-ink/40"><ShieldCheck :size="12" /> Password for demo accounts: <code class="font-mono text-[10px] text-ink/60">LineSightDemo!2026</code></p></div>
      <div class="mt-4 flex justify-between text-[11px]"><NuxtLink to="/forgot" class="text-ink/45 hover:text-ink">Forgot password?</NuxtLink><NuxtLink to="/signup" class="font-semibold text-signal-deep">Create an account →</NuxtLink></div>
      <p class="mt-3 text-center font-mono text-[9px] uppercase tracking-[.08em] text-ink/30">Studio demo: ops@linesight.io · LineSightOps!2026</p>
    </div></div>
  </section>
</template>
