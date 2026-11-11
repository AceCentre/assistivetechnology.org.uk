<script setup>
import aacServices from "../../data/aacServices.json";
import { getResourceSection } from "../../utils/resources";
import ServiceList from "../../components/ServiceList.vue";

const section = getResourceSection("aac-services");
</script>

<template>
  <section class="tab-panel" aria-labelledby="need-aac-heading">
    <div class="section-heading">
      <h2 id="need-aac-heading" class="section-title">Need AAC</h2>
      <p v-if="section.description" class="section-summary">
        {{ section.description }}
      </p>
    </div>
    <ServiceList :services="aacServices" />
  </section>
</template>
