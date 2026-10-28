import { createApp } from "vue";
import App from "./App.vue";
import type { Page } from "./content";
import "./styles.css";

const root = document.querySelector<HTMLElement>("#app");
if (!root) throw new Error("Portfolio mount point is missing");

const allowedPages: readonly Page[] = ["home", "impressum", "datenschutz", "nutzungsbedingungen", "datenloeschung", "not-found"];
const requestedPage = root.dataset.page;
const page: Page = allowedPages.includes(requestedPage as Page) ? requestedPage as Page : "not-found";

createApp(App, { page }).mount(root);
