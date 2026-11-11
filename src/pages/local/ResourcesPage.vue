<script setup>
import { getResourceSection } from "../../utils/resources";
import ResourceCardGrid from "../../components/ResourceCardGrid.vue";

const section = getResourceSection("home-education");
</script>

<template>
  <section class="tab-panel" aria-labelledby="local-resources-heading">
    <div class="section-heading">
      <h2 id="local-resources-heading" class="section-title">
        <span class="speech-bubble-icon" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
              fill="currentColor"
            />
          </svg>
        </span>
        Resources
      </h2>
      <p class="section-summary">
        Local AAC resources for home learning, education, and SEND support.
      </p>
    </div>
    <ResourceCardGrid :cards="section.cards" />
  </section>
</template>
