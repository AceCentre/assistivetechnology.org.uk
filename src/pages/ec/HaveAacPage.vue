<script setup>
import ecServices from "../../data/ecServices.json";
import ServiceList from "../../components/ServiceList.vue";
</script>

<template>
  <section class="tab-panel" aria-labelledby="ec-have-heading">
    <div class="section-heading">
      <h2 id="ec-have-heading" class="section-title">Have AAC</h2>
      <p class="section-summary">
        Support for people who already use environmental control equipment,
        including follow-up from specialised EC services across England.
      </p>
    </div>
    <ServiceList :services="ecServices" />
  </section>
</template>
