<script setup>
import PreviewBar from "../components/PreviewBar.vue";
import AccessibilityControls from "../components/AccessibilityControls.vue";
import { useAppearance } from "../composables/useAppearance";

useAppearance();
</script>

<template>
  <div>
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <PreviewBar />
    <AccessibilityControls />

    <router-view />

    <footer class="site-footer">
      <p class="footer-text">
        &copy; 2025 Specialised Assistive Technology Services.
      </p>
    </footer>
  </div>
</template>
