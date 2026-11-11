<script setup>
import { computed } from "vue";
import { getResourceSection } from "../../utils/resources";
import ResourceCardGrid from "../../components/ResourceCardGrid.vue";

const titles = [
  "Ace Centre Resources",
  "Barnsley AT How-to Videos",
  "Communication Matters",
  "Assessment of Learning Process for AAC",
  "Understanding the virus and staying safe",
];

const cards = computed(() => {
  const section = getResourceSection("general-resources");
  return section.cards.filter((card) => titles.includes(card.title));
});
</script>

<template>
  <section class="tab-panel" aria-labelledby="have-aac-heading">
    <div class="section-heading">
      <h2 id="have-aac-heading" class="section-title">Have AAC</h2>
      <p class="section-summary">
        Resources for people who already use AAC, including practical guides,
        how-to videos, and organisations that can help you get the most from
        your communication aid.
      </p>
    </div>
    <ResourceCardGrid :cards="cards" />
  </section>
</template>
