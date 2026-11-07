<script setup lang="ts">
import { ArrowUpRight, BadgeCheck, HandCoins, Radar, ShieldCheck } from 'lucide-vue-next'
</script>
<template>
  <div>
    <section class="border-b border-ink/10 bg-white py-16 md:py-24">
      <div class="wrap grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p class="label-mono text-vomtek">For contractors</p>
          <h1 class="type-page-hero mt-4 max-w-[13ch]">Good work.<br><span class="text-vomtek">Paid fairly.</span></h1>
          <p class="mt-5 max-w-lg text-[16px] leading-relaxed text-ink/70">Get clear repair jobs, quote a fixed price, and get paid once the work is checked and approved.</p>
          <div class="mt-7 flex gap-2"><NuxtLink to="/login" class="btn btn-brand">Join the network <ArrowUpRight :size="14" /></NuxtLink><NuxtLink to="/contact" class="btn btn-outline">Talk to partnerships</NuxtLink></div>
        </div>
        <div class="grid grid-cols-2 gap-3 lg:col-span-5">
          <div v-for="s in [{v:'6%',l:'service fee'},{v:'48h',l:'quote window'},{v:'Protected',l:'repair payments'},{v:'4.8/5',l:'contractor rating'}]" :key="s.l" class="rounded-xl border border-ink/12 bg-bone p-5"><p class="font-display text-[30px] font-semibold">{{ s.v }}</p><p class="label-mono mt-2 text-ink/65">{{ s.l }}</p></div>
        </div>
      </div>
    </section>
    <section class="section-y"><div class="wrap grid gap-10 lg:grid-cols-3"><div v-for="i in [{icon:Radar,t:'Scoped work, not leads',d:'Every job arrives with a camera report and clear findings, so you quote the actual repair.'},{icon:HandCoins,t:'Money before mobilisation',d:'The homeowner funds the job. You see the payment stages before you start.'},{icon:ShieldCheck,t:'A reputation you can keep',d:'Your licence, insurance and finished work build a score you can take to the next job.'}]" :key="i.t"><component :is="i.icon" :size="22" class="text-signal-deep" /><h2 class="mt-6 font-display text-[27px]">{{ i.t }}</h2><p class="mt-2 text-[14px] leading-relaxed text-ink/75">{{ i.d }}</p></div></div></section>
    <section class="border-t border-ink/10 bg-bone section-y"><div class="wrap"><div class="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><SectionLabel index="01">What you need</SectionLabel><h2 class="mt-5 type-lg">Licensed, insured and ready to work.</h2></div><NuxtLink to="/login" class="btn btn-dark">Open contractor demo <ArrowUpRight :size="13" /></NuxtLink></div><div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div v-for="r in ['Plumbing or trenchless licence','Liability and workers compensation cover','A camera to show the finished repair','Service area in the Houston metro']" :key="r" class="flex gap-3 rounded-lg border border-ink/12 p-4 text-[13px] text-ink/75"><BadgeCheck :size="15" class="mt-0.5 shrink-0 text-mint-deep" />{{ r }}</div></div></div></section>
  </div>
</template>