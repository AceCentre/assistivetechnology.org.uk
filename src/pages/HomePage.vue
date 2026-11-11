<script setup>
import { computed } from "vue";
import tabs from "../data/tabs.json";
import PageShell from "../components/PageShell.vue";

const serviceFinderHighlight = {
  id: "service-finder-highlight",
  title: "Service Finder",
  description:
    "Find and access specialized assistive technology services across England.",
  href: "https://servicefinder.acecentre.net/",
};

const routeForTab = {
  "general-resources": "/aac-services/resources",
  "home-education": "/local-aac",
  "aac-services": "/aac-services",
  "ec-services": "/ec-services",
};

const tabHighlights = computed(() => {
  return tabs
    .filter((tab) => tab.id !== "overview" && tab.description)
    .map((tab) => {
      const card = {
        id: `${tab.id}-highlight`,
        title: tab.label,
        description: tab.description,
        to: routeForTab[tab.id],
      };

      if (tab.id === "aac-services") {
        card.title = "AAC SERVICES";
        card.subtitle = "(AUGMENTATIVE AND ALTERNATIVE COMMUNICATION)";
        card.description =
          "Specialised AAC services assess for and provide appropriate assistive technologies for people with a severe or complex communication difficulty associated with a range of physical, cognitive, learning, or sensory deficits and a clear discrepancy between their level of understanding and ability to speak.";
      } else if (tab.id === "ec-services") {
        card.title = "EC SERVICES";
        card.subtitle = "(ENVIRONMENTAL CONTROL)";
        card.description =
          "Specialised EC services assess for and provide appropriate assistive technologies for people who have a severe disability which restricts their ability to independently operate standard handsets for control of the environment and access to computer technology.";
      }

      return card;
    });
});

const allHighlights = computed(() => {
  return [serviceFinderHighlight, ...tabHighlights.value];
});
</script>

<template>
  <PageShell>
    <template #hero>
      <h1 class="hero-title">Specialised AAC and EC Services</h1>
      <p class="hero-description">
        NHS England commission Specialised Assistive Technology Services for
        people of all ages in England. These are provided through a number of
        organisations, some of which only provide Augmentative and Alternative
        Communication (AAC) services, some only Environmental Control (EC)
        Services, and some both.
      </p>
      <div class="hero-actions">
        <a
          class="action-button"
          href="https://servicefinder.acecentre.net/"
          target="_blank"
          rel="noopener noreferrer"
          >Service Finder<span class="visually-hidden"> (opens in a new tab)</span></a
        >
        <router-link
          class="action-button action-button-secondary"
          to="/aac-services/resources"
        >
          Other Resources
        </router-link>
      </div>
    </template>

    <section class="tab-panel" aria-labelledby="overview-heading">
      <div class="section-intro">
        <h2 id="overview-heading" class="section-title">
          Specialised Assistive Technology Services in England
        </h2>
        <p class="section-summary">
          Specialised AAC and EC services assess for and provide assistive
          technologies that help people across England communicate and control
          their environments. Explore the pages to find specialised AAC
          services, local AAC resources, and complete listings of AAC and EC
          services.
        </p>
      </div>
      <div class="service-highlights">
        <article
          class="service-card"
          :class="index % 2 === 0 ? 'service-card--aac' : 'service-card--ec'"
          v-for="(highlight, index) in allHighlights"
          :key="highlight.id"
        >
          <div class="service-card-content">
            <h3 class="service-title">{{ highlight.title }}</h3>
            <p class="service-subtitle" v-if="highlight.subtitle">
              {{ highlight.subtitle }}
            </p>
            <p class="service-description">{{ highlight.description }}</p>
            <a
              v-if="highlight.href"
              class="service-button"
              :class="
                index % 2 === 0 ? 'service-button--aac' : 'service-button--ec'
              "
              :href="highlight.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Service Finder
            </a>
            <router-link
              v-else
              class="service-button"
              :class="
                index % 2 === 0 ? 'service-button--aac' : 'service-button--ec'
              "
              :to="highlight.to"
            >
              View
              {{
                highlight.to?.includes("services") ? "services" : "resources"
              }}
            </router-link>
          </div>
        </article>
      </div>
    </section>
  </PageShell>
</template>
