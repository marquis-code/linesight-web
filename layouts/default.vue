<template>
  <div>
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[.14em] focus:text-bone">Skip to content</a>
    <SiteHeader />
    <main id="main"><slot /></main>
    <SiteFooter />
  </div>
</template>
