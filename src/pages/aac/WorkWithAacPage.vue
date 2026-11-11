<script setup>
import { computed } from "vue";
import { getResourceSection } from "../../utils/resources";
import ResourceCardGrid from "../../components/ResourceCardGrid.vue";

const titles = [
  "Compass Assistive and Rehabilitation Technology Resources",
  "ACT (Birmingham) Resources",
  "Ace Centre Resources",
  "Assessment of Learning Process for AAC",
  "Communication Matters",
];

const cards = computed(() => {
  const section = getResourceSection("general-resources");
  return section.cards.filter((card) => titles.includes(card.title));
});
</script>

<template>
  <section class="tab-panel" aria-labelledby="work-with-aac-heading">
    <div class="section-heading">
      <h2 id="work-with-aac-heading" class="section-title">Work with AAC</h2>
      <p class="section-summary">
        Guidance and materials for professionals who assess for, provide, or
        support AAC across specialised and local services.
      </p>
    </div>
    <ResourceCardGrid :cards="cards" />
  </section>
</template>
