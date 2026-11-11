<script setup>
import { useAppearance } from "../composables/useAppearance";

const { contrast, toggleContrast } = useAppearance();
</script>

<template>
  <div class="a11y-controls">
    <button
      type="button"
      class="a11y-controls-button"
      :aria-pressed="String(contrast === 'high')"
      @click="toggleContrast"
    >
      {{ contrast === "high" ? "Use default contrast" : "Use high contrast" }}
    </button>
  </div>
</template>
