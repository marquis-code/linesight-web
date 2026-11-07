<script setup lang="ts">
import { ArrowUpRight, Menu, X } from 'lucide-vue-next'
const open = ref(false)
const route = useRoute()
const links = [
  { label: 'Intelligence', to: '/intelligence' },
  { label: 'Homeowners', to: '/homeowners' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Rentals', to: '/rentals' },
  { label: 'Pricing', to: '/pricing' },
]
watch(() => route.fullPath, () => { open.value = false })
</script>
<template>
  <header class="sticky top-0 z-50 border-b border-ink/10 bg-white/90 backdrop-blur-xl">
    <div class="wrap flex h-[72px] items-center justify-between gap-5">
      <BrandMark />
      <nav class="hidden items-center gap-7 lg:flex">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="font-sans text-[14px] text-ink/65 transition-colors hover:text-ink">{{ link.label }}</NuxtLink>
      </nav>
      <div class="hidden items-center gap-2 lg:flex">
        <NuxtLink to="/login" class="btn btn-outline !min-h-10 !px-4">Sign in</NuxtLink>
        <NuxtLink to="/app" class="btn btn-dark !min-h-10 !px-4">Open platform <ArrowUpRight :size="13" /></NuxtLink>
      </div>
      <button type="button" class="flex size-10 items-center justify-center rounded-full border border-ink/15 lg:hidden" :aria-expanded="open" aria-label="Toggle menu" @click="open = !open">
        <X v-if="open" :size="18" /><Menu v-else :size="18" />
      </button>
    </div>
    <Transition enter-active-class="transition duration-200" enter-from-class="-translate-y-2 opacity-0" leave-active-class="transition duration-150" leave-to-class="-translate-y-2 opacity-0">
      <div v-if="open" class="border-t border-ink/10 bg-paper px-5 pb-6 pt-4 lg:hidden">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="flex items-center justify-between border-b border-ink/10 py-3 font-display text-[22px]">{{ link.label }} <ArrowUpRight :size="16" /></NuxtLink>
        <div class="mt-5 grid grid-cols-2 gap-2"><NuxtLink to="/login" class="btn btn-outline">Sign in</NuxtLink><NuxtLink to="/app" class="btn btn-dark">Open platform</NuxtLink></div>
      </div>
    </Transition>
  </header>
</template>
