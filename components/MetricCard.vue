<script setup lang="ts">
defineProps<{ label: string; value: string | number; note?: string; tone?: 'dark' | 'mint' | 'plain' }>()
</script>
<template>
  <div class="rounded-xl border p-4" :class="tone === 'dark' ? 'border-ink bg-ink text-bone' : tone === 'mint' ? 'border-mint/40 bg-mint/15' : 'border-ink/12 bg-bone'">
    <p class="font-mono text-[8.5px] uppercase tracking-[.1em]" :class="tone === 'dark' ? 'text-bone/40' : 'text-ink/40'">{{ label }}</p>
    <p class="mt-2 font-display text-[30px] leading-none tracking-[-.03em]" :class="tone === 'mint' ? 'text-mint-deep' : ''">{{ value }}</p>
    <p v-if="note" class="mt-2 text-[10.5px]" :class="tone === 'dark' ? 'text-bone/40' : 'text-ink/40'">{{ note }}</p>
  </div>
</template>
