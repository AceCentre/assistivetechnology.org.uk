<script setup>
import PageShell from "../components/PageShell.vue";
</script>

<template>
  <PageShell show-secondary>
    <template #hero>
      <h1 class="hero-title">AAC Services</h1>
      <p class="hero-description">
        Specialised AAC services assess for and provide assistive technologies
        for people with a severe or complex communication difficulty, and a
        clear discrepancy between their level of understanding and their ability
        to speak.
      </p>
      <div class="hero-actions">
        <a
          class="action-button"
          href="https://servicefinder.acecentre.net/"
          target="_blank"
          rel="noopener noreferrer"
          >Find a service<span class="visually-hidden"> (opens in a new tab)</span></a
        >
        <a class="action-button action-button-secondary" href="#main-content">
          View AAC services
        </a>
      </div>
    </template>

    <router-view />
  </PageShell>
</template>
