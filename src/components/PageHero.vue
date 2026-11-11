<script setup>
import { useRoute } from "vue-router";
import navigation from "../data/navigation.json";

const heroImage =
  "https://www.england.nhs.uk/wp-content/themes/nhsengland/static/img/nhs-england-white.svg";

const route = useRoute();

const isPrimaryActive = (item) => {
  if (item.href) {
    return false;
  }
  return route.path === item.to || route.path.startsWith(`${item.to}/`);
};
</script>

<template>
  <header class="hero">
    <div class="hero-overlay">
      <nav class="top-navigation" aria-label="Primary">
        <ul class="primary-links">
          <li v-for="item in navigation.primary" :key="item.id">
            <a
              v-if="item.href"
              class="primary-link"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.label }}
              <span class="visually-hidden"> (opens in a new tab)</span>
            </a>
            <router-link
              v-else
              class="primary-link"
              :to="item.to"
              :class="{ 'primary-link--active': isPrimaryActive(item) }"
              active-class=""
            >
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="hero-content">
        <div class="brand-mark">
          <router-link to="/" aria-label="Specialised AAC and EC Services home">
            <img :src="heroImage" alt="NHS England logo" class="brand-logo" />
          </router-link>
        </div>
        <slot />
      </div>
    </div>
  </header>
</template>
