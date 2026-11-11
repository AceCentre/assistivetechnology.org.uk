<script setup>
import ecServices from "../../data/ecServices.json";
import ServiceList from "../../components/ServiceList.vue";
</script>

<template>
  <section class="tab-panel" aria-labelledby="ec-work-heading">
    <div class="section-heading">
      <h2 id="ec-work-heading" class="section-title">Work with AAC</h2>
      <p class="section-summary">
        Information for professionals who assess for, provide, or support
        environmental control alongside AAC and other assistive technologies.
      </p>
    </div>
    <ServiceList :services="ecServices" />
  </section>
</template>
