<script setup>
defineProps({
  cards: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="resource-grid">
    <article class="resource-card" v-for="card in cards" :key="card.title">
      <div class="resource-content">
        <h3 class="resource-title">{{ card.title }}</h3>
        <p class="resource-description">{{ card.description }}</p>
        <a
          class="text-link"
          :href="card.href"
          target="_blank"
          rel="noopener noreferrer"
          >Read More</a
        >
      </div>
    </article>
  </div>
</template>
