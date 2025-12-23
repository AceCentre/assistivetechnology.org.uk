<template>
  <div>
    <a class="skip-link" href="#overview">Skip to main content</a>
    <header class="hero">
      <div class="hero-overlay">
        <nav class="top-navigation" aria-label="Primary">
          <ul class="primary-links">
            <li v-for="tab in tabs" :key="tab.id">
              <a
                class="primary-link"
                :href="`#${tab.id}`"
                @click.prevent="setTab(tab.id)"
              >
                {{ tab.label }}
                <span
                  v-if="tab.id === 'general-resources'"
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
              </a>
            </li>
            <li>
              <a
                class="primary-link"
                href="https://forum.assistivetechnology.org.uk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Staff Login
              </a>
            </li>
          </ul>
        </nav>
        <div class="hero-content">
          <div class="brand-mark">
            <img :src="heroImage" alt="NHS England logo" class="brand-logo" />
          </div>
          <h1 class="hero-title">Specialised AAC and EC Services</h1>
          <p class="hero-description">
            NHS England commission Specialised Assistive Technology Services for
            people of all ages in England. These are provided through a number
            of organisations, some of which only provide Augmentative and
            Alternative Communication (AAC) services, some only Environmental
            Control (EC) Services, and some both.
          </p>
          <div class="hero-actions">
            <a
              class="action-button"
              href="https://servicefinder.acecentre.net/"
              target="_blank"
              rel="noopener noreferrer"
              >Service Finder</a
            >
            <a
              class="action-button action-button-secondary"
              href="#general-resources"
              @click.prevent="setTab('general-resources')"
            >
              Other Resources
            </a>
          </div>
        </div>
      </div>
    </header>

    <nav class="tab-navigation" aria-label="Content sections">
      <div class="tab-list" role="tablist" aria-label="Homepage sections">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.id"
          type="button"
          role="tab"
          class="navigation-tab"
          :id="`${tab.id}-tab`"
          :aria-controls="tab.id"
          :aria-selected="String(isActive(tab.id))"
          :tabindex="isActive(tab.id) ? 0 : -1"
          @click="setTab(tab.id)"
          @keydown="handleKeyNavigation($event, index)"
          :ref="(el) => setTabButtonRef(el, index)"
        >
          {{ tab.label }}
          <span
            v-if="tab.id === 'general-resources'"
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
        </button>
      </div>
    </nav>

    <main class="page-content">
      <section
        id="overview"
        class="tab-panel"
        role="tabpanel"
        tabindex="0"
        aria-labelledby="overview-tab"
        :hidden="!isActive('overview')"
      >
        <div class="section-intro">
          <h2 class="section-title">
            Specialised Assistive Technology Services in England
          </h2>
          <p class="section-summary">
            Specialised AAC and EC services assess for and provide assistive
            technologies that help people across England communicate and control
            their environments. Explore the tabs to find specialised AAC
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
              <a
                v-else
                class="service-button"
                :class="
                  index % 2 === 0 ? 'service-button--aac' : 'service-button--ec'
                "
                :href="'#' + highlight.target"
                @click.prevent="setTab(highlight.target)"
              >
                View
                {{
                  highlight.target.includes("services")
                    ? "services"
                    : "resources"
                }}
              </a>
            </div>
          </article>
        </div>
      </section>

      <section
        v-for="section in resourceSections"
        :key="section.id"
        class="tab-panel"
        role="tabpanel"
        tabindex="0"
        :id="section.id"
        :aria-labelledby="`${section.id}-tab`"
        :hidden="!isActive(section.id)"
      >
        <div class="section-heading">
          <h2 class="section-title">
            <span
              v-if="section.id === 'general-resources'"
              class="speech-bubble-icon"
              aria-hidden="true"
            >
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
            {{ section.title }}
          </h2>
          <p v-if="section.description" class="section-summary">
            {{ section.description }}
          </p>
        </div>
        <div v-if="section.cards" class="resource-grid">
          <article
            class="resource-card"
            v-for="card in section.cards"
            :key="card.title"
          >
            <div class="resource-image" v-if="card.image">
              <img :src="card.image" :alt="card.alt" />
            </div>
            <div class="resource-content">
              <h3 class="resource-title">{{ card.title }}</h3>
              <p class="resource-description">{{ card.description }}</p>
              <a
                class="text-link"
                :href="card.href"
                target="_blank"
                rel="noopener noreferrer"
                >Read More</a
              >
            </div>
          </article>
        </div>
        <template v-else-if="section.id === 'aac-services'">
          <ul class="service-list">
            <li v-for="service in aacServices" :key="service.href">
              <a
                :href="service.href"
                target="_blank"
                rel="noopener noreferrer"
                >{{ service.label }}</a
              >
            </li>
          </ul>
        </template>
        <template v-else-if="section.id === 'ec-services'">
          <ul class="service-list">
            <li v-for="service in ecServices" :key="service.href">
              <a
                :href="service.href"
                target="_blank"
                rel="noopener noreferrer"
                >{{ service.label }}</a
              >
            </li>
          </ul>
        </template>
      </section>
    </main>

    <footer class="site-footer">
      <p class="footer-text">
        &copy; 2025 Specialised Assistive Technology Services.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue";
import tabs from "./data/tabs.json";
import resourceSections from "./data/resourceSections.json";
import aacServices from "./data/aacServices.json";
import ecServices from "./data/ecServices.json";

const heroImage =
  "https://www.england.nhs.uk/wp-content/themes/nhsengland/static/img/nhs-england-white.svg";

// Service Finder highlight card (external link, not a tab)
const serviceFinderHighlight = {
  id: "service-finder-highlight",
  title: "Service Finder",
  description:
    "Find and access specialized assistive technology services across England.",
  href: "https://servicefinder.acecentre.net/",
};

// Convert tabs (excluding overview) to highlight cards format
const tabHighlights = computed(() => {
  return tabs
    .filter((tab) => tab.id !== "overview" && tab.description)
    .map((tab) => {
      const card = {
        id: `${tab.id}-highlight`,
        title: tab.label,
        description: tab.description,
        target: tab.id,
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

// Combine service finder with tab highlights
const allHighlights = computed(() => {
  return [serviceFinderHighlight, ...tabHighlights.value];
});

const activeTab = ref("overview");
const tabButtonRefs = ref([]);

const setTabButtonRef = (el, index) => {
  if (el) {
    tabButtonRefs.value[index] = el;
  }
};

const isActive = (id) => activeTab.value === id;

const focusTabButton = (id) => {
  const index = tabs.findIndex((tab) => tab.id === id);
  if (index > -1) {
    nextTick(() => {
      const target = tabButtonRefs.value[index];
      target?.focus();
    });
  }
};

const setTab = (id, { focus = true } = {}) => {
  if (!tabs.some((tab) => tab.id === id)) {
    return;
  }
  activeTab.value = id;
  window.history.replaceState(null, "", `#${id}`);
  if (focus) {
    focusTabButton(id);
  }
};

const handleKeyNavigation = (event, index) => {
  const { key } = event;
  if (
    ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(
      key
    )
  ) {
    event.preventDefault();
  }

  if (key === "ArrowRight" || key === "ArrowDown") {
    const nextIndex = (index + 1) % tabs.length;
    setTab(tabs[nextIndex].id);
  } else if (key === "ArrowLeft" || key === "ArrowUp") {
    const prevIndex = (index - 1 + tabs.length) % tabs.length;
    setTab(tabs[prevIndex].id);
  } else if (key === "Home") {
    setTab(tabs[0].id);
  } else if (key === "End") {
    setTab(tabs[tabs.length - 1].id);
  }
};

const applyHash = () => {
  const hash = window.location.hash.replace("#", "");
  if (hash && tabs.some((tab) => tab.id === hash)) {
    setTab(hash, { focus: false });
  }
};

onMounted(() => {
  applyHash();
  window.addEventListener("hashchange", applyHash);
});

onBeforeUnmount(() => {
  window.removeEventListener("hashchange", applyHash);
});
</script>
