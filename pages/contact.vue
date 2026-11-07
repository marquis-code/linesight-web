<script setup lang="ts">
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-vue-next'
const api = useApi()
const form = reactive({ name: '', email: '', company: '', type: 'operator', message: '' })
const sent = ref(false); const loading = ref(false); const error = ref('')
async function submit() {
  loading.value = true; error.value = ''
  try { await api.request('/leads', { method: 'POST', body: { ...form, source: 'website' } }); sent.value = true }
  catch (e: any) { error.value = e?.data?.message || 'Could not send. Email hello@vomtek.com.' }
  finally { loading.value = false }
}
</script>
<template>
  <div>
    <section class="border-b border-ink/10 bg-white py-16 md:py-24">
      <div class="wrap grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <p class="label-mono text-vomtek">Talk to Vomtek</p>
          <h1 class="type-page-hero mt-4 max-w-[12ch]">Tell us<br><span class="text-vomtek">what is wrong.</span></h1>
          <p class="mt-5 max-w-md text-[16px] leading-relaxed text-ink/70">A real person will reply within one business day. No sales script, no runaround.</p>
          <div class="mt-10 space-y-5 border-t border-ink/10 pt-6">
            <div><p class="label-mono text-ink/65">Email</p><a href="mailto:hello@vomtek.com" class="mt-1 block text-[17px] font-medium text-ink hover:text-vomtek">hello@vomtek.com</a></div>
            <div><p class="label-mono text-ink/65">Office</p><p class="mt-1 text-[15px] text-ink/75">Houston, TX · Mon–Fri, 8:00–17:00 CT</p></div>
            <div><p class="label-mono text-ink/65">Urgent problem?</p><p class="mt-1 text-[15px] text-ink/75">+1 713 555 0199 · 24/7 field response</p></div>
          </div>
        </div>
        <div class="lg:col-span-6">
          <div v-if="sent" class="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-vomtek/30 bg-vomtek/5 p-8 text-center"><span class="flex size-12 items-center justify-center rounded-full bg-vomtek text-white"><Check :size="22" /></span><h2 class="mt-5 font-display text-[32px]">Message received.</h2><p class="mt-2 max-w-sm text-[14px] leading-relaxed text-ink/75">Someone from our team will reply within one business day. For urgent work, call the 24/7 line.</p><NuxtLink to="/" class="btn btn-outline mt-6">Back to Vomtek</NuxtLink></div>
          <form v-else class="rounded-2xl border border-ink/12 bg-bone p-6 text-ink md:p-8" @submit.prevent="submit"><p class="font-display text-[27px] tracking-[-.03em]">Send us a message</p><div class="mt-6 grid gap-5 sm:grid-cols-2"><div><label class="field-label">Your name</label><input v-model="form.name" required class="field" placeholder="Your name"></div><div><label class="field-label">Email</label><input v-model="form.email" required type="email" class="field" placeholder="you@company.com"></div><div><label class="field-label">Company</label><input v-model="form.company" class="field" placeholder="Company or property"></div><div><label class="field-label">I am a</label><AppSelect v-model="form.type" :options="[{value:'operator',label:'Pipeline or plant team'},{value:'utility',label:'Water or utility team'},{value:'homeowner',label:'Homeowner or property manager'},{value:'contractor',label:'Contractor'},{value:'manufacturer',label:'Parts supplier'}]" placeholder="Select your role" aria-label="Your role" /></div><div class="sm:col-span-2"><label class="field-label">How can we help?</label><textarea v-model="form.message" required rows="4" class="field resize-none" placeholder="Tell us what is happening, the pipe size, or the question you need answered." /></div></div><button class="btn btn-brand mt-6 w-full" :disabled="loading"><LoaderCircle v-if="loading" :size="15" class="animate-spin" /> {{ loading ? 'Sending…' : 'Send message' }} <ArrowUpRight v-if="!loading" :size="14" /></button><p v-if="error" class="mt-3 text-[12px] text-signal-deep">{{ error }}</p><p class="mt-4 text-[11px] leading-relaxed text-ink/65">We use your details only to reply. We do not sell contact data.</p></form>
        </div>
      </div>
    </section>
    <section class="section-y"><div class="wrap grid gap-4 md:grid-cols-3"><div v-for="r in [{t:'Pipeline check',d:'Send an inspection file and get a first report.',to:'/intelligence'},{t:'Home drain check',d:'Upload a video and get a simple report and repair plan.',to:'/homeowners'},{t:'Parts and tool help',d:'Help choosing the right part or becoming a supplier.',to:'/marketplace'}]" :key="r.t" class="rounded-xl border border-ink/12 bg-bone p-5"><h3 class="font-display text-[22px]">{{ r.t }}</h3><p class="mt-2 text-[13px] leading-relaxed text-ink/75">{{ r.d }}</p><NuxtLink :to="r.to" class="mt-4 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.1em] text-signal-deep">Open <ArrowUpRight :size="12" /></NuxtLink></div></div></section>
  </div>
</template>