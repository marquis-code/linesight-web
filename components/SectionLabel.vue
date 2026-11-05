<script setup lang="ts">
withDefaults(defineProps<{ index?: string; tone?: 'dark' | 'light'; line?: boolean }>(), { tone: 'dark', line: true })
</script>
<template>
  <div class="flex items-center gap-3 label-mono" :class="tone === 'dark' ? 'text-ink/55' : 'text-bone/50'">
    <span v-if="index" class="inline-flex size-5 items-center justify-center rounded-full border text-[9px]" :class="tone === 'dark' ? 'border-ink/20' : 'border-bone/20'">{{ index }}</span>
    <span><slot /></span>
    <span v-if="line" class="h-px flex-1" :class="tone === 'dark' ? 'bg-ink/15' : 'bg-bone/15'" />
  </div>
</template>
