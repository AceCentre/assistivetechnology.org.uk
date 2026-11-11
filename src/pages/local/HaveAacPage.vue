<script setup>
import { getResourceSection } from "../../utils/resources";
import ResourceCardGrid from "../../components/ResourceCardGrid.vue";

const section = getResourceSection("home-education");
</script>

<template>
  <section class="tab-panel" aria-labelledby="local-have-heading">
    <div class="section-heading">
      <h2 id="local-have-heading" class="section-title">Have AAC</h2>
      <p class="section-summary">
        Home learning and education resources for children and young people who
        already use AAC.
      </p>
    </div>
    <ResourceCardGrid :cards="section.cards" />
  </section>
</template>
