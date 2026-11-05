<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{ name: string; alt: string; sizes?: string; eager?: boolean }>(), { sizes: '100vw', eager: false })
const srcset = (ext: string) => [480, 800, 1200, 1600].map(w => `/images/optimized/${props.name}-${w}.${ext} ${w}w`).join(', ')
</script>
<template>
  <picture>
    <source type="image/avif" :srcset="srcset('avif')" :sizes="sizes">
    <source type="image/webp" :srcset="srcset('webp')" :sizes="sizes">
    <img :src="`/images/optimized/${name}-1200.jpg`" :srcset="srcset('jpg')" :sizes="sizes" :alt="alt" :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : 'auto'" decoding="async" v-bind="$attrs">
  </picture>
</template>
