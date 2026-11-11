<script setup>
import ecServices from "../../data/ecServices.json";
import { getResourceSection } from "../../utils/resources";
import ServiceList from "../../components/ServiceList.vue";

const section = getResourceSection("ec-services");
</script>

<template>
  <section class="tab-panel" aria-labelledby="ec-need-heading">
    <div class="section-heading">
      <h2 id="ec-need-heading" class="section-title">Need AAC</h2>
      <p v-if="section.description" class="section-summary">
        {{ section.description }}
      </p>
    </div>
    <ServiceList :services="ecServices" />
  </section>
</template>
