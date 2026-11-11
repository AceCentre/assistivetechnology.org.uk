import { createRouter, createWebHistory } from "vue-router";
import SiteLayout from "../layouts/SiteLayout.vue";
import AacLayout from "../layouts/AacLayout.vue";
import EcLayout from "../layouts/EcLayout.vue";
import LocalAacLayout from "../layouts/LocalAacLayout.vue";
import HomePage from "../pages/HomePage.vue";
import AacNeedAacPage from "../pages/aac/NeedAacPage.vue";
import AacHaveAacPage from "../pages/aac/HaveAacPage.vue";
import AacWorkWithAacPage from "../pages/aac/WorkWithAacPage.vue";
import AacResourcesPage from "../pages/aac/AacResourcesPage.vue";
import EcNeedAacPage from "../pages/ec/NeedAacPage.vue";
import EcHaveAacPage from "../pages/ec/HaveAacPage.vue";
import EcWorkWithAacPage from "../pages/ec/WorkWithAacPage.vue";
import EcResourcesPage from "../pages/ec/ResourcesPage.vue";
import LocalNeedAacPage from "../pages/local/NeedAacPage.vue";
import LocalHaveAacPage from "../pages/local/HaveAacPage.vue";
import LocalWorkWithAacPage from "../pages/local/WorkWithAacPage.vue";
import LocalResourcesPage from "../pages/local/ResourcesPage.vue";

const SITE_TITLE = "Specialised Assistive Technology Services";

const sectionOf = (path = "") => {
  if (path.startsWith("/aac-services")) {
    return "aac-services";
  }
  if (path.startsWith("/ec-services")) {
    return "ec-services";
  }
  if (path.startsWith("/local-aac")) {
    return "local-aac";
  }
  return null;
};

const titleForRoute = (route) => {
  const titles = {
    home: SITE_TITLE,
    "aac-need-aac": `Need AAC – AAC Services – ${SITE_TITLE}`,
    "aac-have-aac": `Have AAC – AAC Services – ${SITE_TITLE}`,
    "aac-work-with-aac": `Work with AAC – AAC Services – ${SITE_TITLE}`,
    "aac-resources": `Resources – AAC Services – ${SITE_TITLE}`,
    "ec-need-aac": `Need AAC – EC Services – ${SITE_TITLE}`,
    "ec-have-aac": `Have AAC – EC Services – ${SITE_TITLE}`,
    "ec-work-with-aac": `Work with AAC – EC Services – ${SITE_TITLE}`,
    "ec-resources": `Resources – EC Services – ${SITE_TITLE}`,
    "local-need-aac": `Need AAC – Local AAC – ${SITE_TITLE}`,
    "local-have-aac": `Have AAC – Local AAC – ${SITE_TITLE}`,
    "local-work-with-aac": `Work with AAC – Local AAC – ${SITE_TITLE}`,
    "local-resources": `Resources – Local AAC – ${SITE_TITLE}`,
  };

  return titles[route.name] || SITE_TITLE;
};

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (sectionOf(to.path) && sectionOf(to.path) === sectionOf(from.path)) {
      return false;
    }

    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      component: SiteLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomePage,
        },
        {
          path: "aac-services",
          component: AacLayout,
          children: [
            { path: "", redirect: { name: "aac-need-aac" } },
            {
              path: "need-aac",
              name: "aac-need-aac",
              component: AacNeedAacPage,
            },
            {
              path: "have-aac",
              name: "aac-have-aac",
              component: AacHaveAacPage,
            },
            {
              path: "work-with-aac",
              name: "aac-work-with-aac",
              component: AacWorkWithAacPage,
            },
            {
              path: "resources",
              name: "aac-resources",
              component: AacResourcesPage,
            },
          ],
        },
        {
          path: "ec-services",
          component: EcLayout,
          children: [
            { path: "", redirect: { name: "ec-need-aac" } },
            {
              path: "need-aac",
              name: "ec-need-aac",
              component: EcNeedAacPage,
            },
            {
              path: "have-aac",
              name: "ec-have-aac",
              component: EcHaveAacPage,
            },
            {
              path: "work-with-aac",
              name: "ec-work-with-aac",
              component: EcWorkWithAacPage,
            },
            {
              path: "resources",
              name: "ec-resources",
              component: EcResourcesPage,
            },
          ],
        },
        {
          path: "local-aac",
          component: LocalAacLayout,
          children: [
            { path: "", redirect: { name: "local-need-aac" } },
            {
              path: "need-aac",
              name: "local-need-aac",
              component: LocalNeedAacPage,
            },
            {
              path: "have-aac",
              name: "local-have-aac",
              component: LocalHaveAacPage,
            },
            {
              path: "work-with-aac",
              name: "local-work-with-aac",
              component: LocalWorkWithAacPage,
            },
            {
              path: "resources",
              name: "local-resources",
              component: LocalResourcesPage,
            },
          ],
        },
        {
          path: "specialised-aac-services",
          redirect: { name: "aac-resources" },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

router.beforeEach((to, from) => {
  if (from.query.mockup && !to.query.mockup) {
    return {
      path: to.path,
      query: { ...to.query, mockup: from.query.mockup },
      hash: to.hash,
      replace: true,
    };
  }

  return true;
});

router.afterEach((to) => {
  document.title = titleForRoute(to);
});

export default router;
