import { createApp } from "vue";
import App from "./App.vue";
import type { Page } from "./content";
import "./styles.css";

const root = document.querySelector<HTMLElement>("#app");
if (!root) throw new Error("Portfolio mount point is missing");

const pages: Record<string, Page> = {
  "/": "home",
  "/impressum": "impressum",
  "/datenschutz": "datenschutz",
  "/nutzungsbedingungen": "nutzungsbedingungen",
  "/datenloeschung": "datenloeschung",
};
const path = (window.location.pathname.replace(/\/+$/u, "") || "/").toLowerCase();
const page = pages[path] ?? "not-found";

if (page !== "home") {
  const titles: Record<Exclude<Page, "home">, string> = {
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    nutzungsbedingungen: "Nutzungsbedingungen",
    datenloeschung: "Datenlöschung",
    "not-found": "Seite nicht gefunden",
  };
  document.title = `${titles[page]} — AnGaMa`;
  document.querySelector('meta[name="robots"]')?.setAttribute("content", "noindex, follow");
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://byangama.de${path}`);
}

createApp(App, { page }).mount(root);
