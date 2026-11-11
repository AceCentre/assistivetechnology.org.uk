<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import navigation from "../data/navigation.json";

const route = useRoute();

const currentSection = computed(() => {
  if (route.path.startsWith("/ec-services")) {
    return "ec-services";
  }
  if (route.path.startsWith("/local-aac")) {
    return "local-aac";
  }
  return "aac-services";
});

const items = computed(
  () => navigation.secondary[currentSection.value] || []
);

const sectionNavLabel = computed(() => {
  if (currentSection.value === "ec-services") {
    return "EC Services pages";
  }
  if (currentSection.value === "local-aac") {
    return "Local AAC pages";
  }
  return "AAC Services pages";
});
</script>

<template>
  <nav class="tab-navigation" :aria-label="sectionNavLabel">
    <div class="tab-list" role="list">
      <router-link
        v-for="item in items"
        :key="item.to"
        class="navigation-tab"
        :to="item.to"
        active-class="navigation-tab--active"
      >
        {{ item.label }}
        <span
          v-if="item.icon === 'speech'"
          class="tab-icon"
          aria-hidden="true"
        >
          <svg
            width="18"
            height="18"
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
      </router-link>
    </div>
  </nav>
</template>
