<script setup lang="ts">
import { ArrowUpRight, LoaderCircle } from 'lucide-vue-next'
const api = useApi(); const router = useRouter()
const form = reactive({ name: '', email: '', password: '', orgName: '', type: 'operator' })
const loading = ref(false); const error = ref('')
async function submit() {
  loading.value = true; error.value = ''
  try { await api.request('/auth/register', { method: 'POST', body: form }); await api.login(form.email, form.password); router.push('/app') }
  catch (e: any) { error.value = e?.data?.message || 'Could not create the account' }
  finally { loading.value = false }
}
</script>
<template>
  <section class="grid min-h-[calc(100svh-72px)] lg:grid-cols-2">
    <div class="relative hidden overflow-hidden bg-ink lg:block"><PhotoImage name="pipeline-construction" alt="Pipeline construction" sizes="50vw" class="absolute inset-0 size-full object-cover opacity-40" /><div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" /><div class="relative flex h-full flex-col justify-between p-10 text-bone"><BrandMark tone="light" /><div><p class="label-mono text-mint">Create a workspace</p><h2 class="mt-3 max-w-[11ch] font-display text-[44px] leading-[.96] tracking-[-.04em]">Bring your line into focus.</h2><p class="mt-4 max-w-sm text-[13px] leading-relaxed text-bone/55">Operators, utilities, contractors, manufacturers and homeowners get a purpose-built workspace.</p></div><p class="font-mono text-[8px] uppercase tracking-[.1em] text-bone/30">Vomtek · account creation</p></div></div>
    <div class="flex items-center justify-center px-5 py-12"><div class="w-full max-w-md"><p class="label-mono text-signal-deep">Start free</p><h1 class="type-product-hero mt-2">Create your account.</h1><p class="mt-2 text-[12px] text-ink/45">No card required. The demo workspace is seeded with sample data.</p><form class="mt-7 space-y-4" @submit.prevent="submit"><div class="grid grid-cols-2 gap-3"><div><label class="field-label">Your name</label><input v-model="form.name" required class="field"></div><div><label class="field-label">Account type</label><AppSelect v-model="form.type" :options="[{value:'operator',label:'Operator / utility'},{value:'homeowner',label:'Homeowner'},{value:'contractor',label:'Contractor'},{value:'manufacturer',label:'Manufacturer'}]" placeholder="Select type" aria-label="Account type" /></div></div><div><label class="field-label">Organisation</label><input v-model="form.orgName" required class="field" placeholder="Company or property name"></div><div><label class="field-label">Email</label><input v-model="form.email" type="email" required class="field"></div><div><label class="field-label">Password</label><input v-model="form.password" type="password" minlength="8" required class="field"></div><button class="btn btn-dark w-full" :disabled="loading"><LoaderCircle v-if="loading" :size="14" class="animate-spin"/> {{ loading ? 'Creating…' : 'Create account' }} <ArrowUpRight v-if="!loading" :size="13"/></button><p v-if="error" class="text-[11px] text-signal-deep">{{ error }}</p></form><p class="mt-5 text-center text-[12px] text-ink/45">Already have an account? <NuxtLink to="/login" class="font-semibold text-signal-deep">Sign in</NuxtLink></p></div></div>
  </section>
</template>
