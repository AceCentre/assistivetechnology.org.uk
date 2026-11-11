<script setup>
import { getResourceSection } from "../../utils/resources";
import ResourceCardGrid from "../../components/ResourceCardGrid.vue";

const section = getResourceSection("home-education");
</script>

<template>
  <section class="tab-panel" aria-labelledby="local-need-heading">
    <div class="section-heading">
      <h2 id="local-need-heading" class="section-title">Need AAC</h2>
      <p class="section-summary">
        Local resources to help children, young people, and families who need
        AAC support at home and in education.
      </p>
    </div>
    <ResourceCardGrid :cards="section.cards" />
  </section>
</template>
