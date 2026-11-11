<script setup>
import { ref } from "vue";
import { useAppearance } from "../composables/useAppearance";

const { mockups, activeMockup, setMockup, shareUrl } = useAppearance();
const copied = ref(false);

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    copied.value = true;
    window.setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    copied.value = false;
  }
};
</script>

<template>
  <div class="preview-bar" role="region" aria-label="Design mock-up switcher">
    <p class="preview-bar-label">
      Team preview — colour and font mock-ups. Switch AAC, EC, or Local AAC to
      see each NHS palette, then copy a link to share.
    </p>
    <div class="preview-bar-options">
      <button
        v-for="mockup in mockups"
        :key="mockup.id"
        type="button"
        class="preview-bar-button"
        :class="{ 'preview-bar-button--active': activeMockup === mockup.id }"
        :aria-pressed="String(activeMockup === mockup.id)"
        @click="setMockup(mockup.id)"
      >
        {{ mockup.label }}
      </button>
      <button type="button" class="preview-bar-copy" @click="copyLink">
        {{ copied ? "Link copied" : "Copy link to this look" }}
      </button>
    </div>
    <p class="preview-bar-summary">
      {{ mockups.find((mockup) => mockup.id === activeMockup)?.summary }}
    </p>
  </div>
</template>
