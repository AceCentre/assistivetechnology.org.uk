import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import mockups from "../data/mockups.json";

const MOCKUP_IDS = mockups.map((mockup) => mockup.id);
const CONTRAST_KEY = "user-contrast";
const contrastState = ref("default");

const sectionFromPath = (path = "") => {
  if (path.startsWith("/aac-services")) {
    return "aac-services";
  }
  if (path.startsWith("/ec-services")) {
    return "ec-services";
  }
  if (path.startsWith("/local-aac")) {
    return "local-aac";
  }
  return "home";
};

const appearanceRoot = () =>
  document.getElementById("app") || document.documentElement;

const applyMockupToDocument = (id) => {
  const value = MOCKUP_IDS.includes(id) ? id : "current";
  appearanceRoot().dataset.mockup = value;
  return value;
};

const applySectionToDocument = (path) => {
  const value = sectionFromPath(path);
  appearanceRoot().dataset.section = value;
  return value;
};

const applyContrastToDocument = (id) => {
  const value = id === "high" ? "high" : "default";
  contrastState.value = value;
  appearanceRoot().dataset.contrast = value;
  window.localStorage.setItem(CONTRAST_KEY, value);
  return value;
};

export const restoreAppearanceFromUrlAndStorage = () => {
  const params = new URLSearchParams(window.location.search);
  applyMockupToDocument(params.get("mockup"));
  applySectionToDocument(window.location.pathname);
  applyContrastToDocument(window.localStorage.getItem(CONTRAST_KEY));
};

export const useAppearance = () => {
  const route = useRoute();
  const router = useRouter();

  const activeMockup = computed(() => {
    const fromQuery = route.query.mockup;
    return MOCKUP_IDS.includes(fromQuery) ? fromQuery : "current";
  });

  const setMockup = (id) => {
    const value = applyMockupToDocument(id);
    const query = { ...route.query };

    if (value === "current") {
      delete query.mockup;
    } else {
      query.mockup = value;
    }

    router.replace({ query });
  };

  const toggleContrast = () => {
    applyContrastToDocument(contrastState.value === "high" ? "default" : "high");
  };

  const shareUrl = computed(() => {
    const url = new URL(window.location.href);
    if (activeMockup.value === "current") {
      url.searchParams.delete("mockup");
    } else {
      url.searchParams.set("mockup", activeMockup.value);
    }
    return url.toString();
  });

  watch(
    activeMockup,
    (id) => {
      applyMockupToDocument(id);
    },
    { immediate: true }
  );

  watch(
    () => route.path,
    (path) => {
      applySectionToDocument(path);
    },
    { immediate: true }
  );

  return {
    mockups,
    activeMockup,
    setMockup,
    contrast: contrastState,
    toggleContrast,
    shareUrl,
  };
};
