<script setup>
import PageShell from "../components/PageShell.vue";
</script>

<template>
  <PageShell show-secondary>
    <template #hero>
      <h1 class="hero-title">EC Services</h1>
      <p class="hero-description">
        Specialised Environmental Control services assess for and provide
        assistive technologies for people whose severe disability restricts
        independent use of standard controls for their environment and
        technology.
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
          View EC services
        </a>
      </div>
    </template>

    <router-view />
  </PageShell>
</template>
