<script setup>
import PageHero from "./PageHero.vue";
import SecondaryNavigation from "./SecondaryNavigation.vue";

defineProps({
  showSecondary: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div>
    <PageHero>
      <slot name="hero" />
    </PageHero>
    <SecondaryNavigation v-if="showSecondary" />
    <main id="main-content" class="page-content">
      <slot />
    </main>
  </div>
</template>
