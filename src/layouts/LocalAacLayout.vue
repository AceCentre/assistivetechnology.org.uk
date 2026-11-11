<script setup>
import PageShell from "../components/PageShell.vue";
</script>

<template>
  <PageShell show-secondary>
    <template #hero>
      <h1 class="hero-title">Local AAC</h1>
      <p class="hero-description">
        Resources designed to support home learning and education for children
        and young people with special educational needs and disabilities (SEND).
      </p>
      <div class="hero-actions">
        <a class="action-button" href="#main-content">View local resources</a>
        <router-link
          class="action-button action-button-secondary"
          to="/aac-services/need-aac"
        >
          Specialised AAC services
        </router-link>
      </div>
    </template>

    <router-view />
  </PageShell>
</template>
