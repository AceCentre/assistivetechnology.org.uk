<script setup>
import { getResourceSection } from "../../utils/resources";
import ResourceCardGrid from "../../components/ResourceCardGrid.vue";

const section = getResourceSection("home-education");
</script>

<template>
  <section class="tab-panel" aria-labelledby="local-work-heading">
    <div class="section-heading">
      <h2 id="local-work-heading" class="section-title">Work with AAC</h2>
      <p class="section-summary">
        Materials for teachers, therapists, and other professionals supporting
        AAC in local education and home-learning settings.
      </p>
    </div>
    <ResourceCardGrid :cards="section.cards" />
  </section>
</template>
