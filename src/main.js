import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { restoreAppearanceFromUrlAndStorage } from "./composables/useAppearance";
import "./assets/main.css";

restoreAppearanceFromUrlAndStorage();

createApp(App).use(router).mount("#app");
