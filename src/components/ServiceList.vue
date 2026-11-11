<script setup>
defineProps({
  services: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="service-list">
    <li v-for="service in services" :key="service.href">
      <a :href="service.href" target="_blank" rel="noopener noreferrer">{{
        service.label
      }}</a>
    </li>
  </ul>
</template>
