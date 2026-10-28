<script setup lang="ts">
import HomeView from "./views/HomeView.vue";
import LegalView from "./views/LegalView.vue";
import NotFoundView from "./views/NotFoundView.vue";
import { twitchUrl } from "./content";
import type { Page } from "./content";

defineProps<{ page: Page }>();
const year = new Date().getFullYear();
</script>

<template>
  <a class="skip-link" href="#inhalt">Direkt zum Inhalt</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="wordmark" href="/" aria-label="AnGaMa — Startseite">AnGaMa<span aria-hidden="true">/</span></a>
      <nav v-if="page === 'home'" class="main-nav" aria-label="Hauptnavigation">
        <a href="#projekte">Projekte</a>
        <a href="#profile">Profile</a>
        <a class="nav-twitch" :href="twitchUrl" target="_blank" rel="me noopener noreferrer">Twitch <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>

  <main id="inhalt">
    <HomeView v-if="page === 'home'" />
    <LegalView v-else-if="page === 'impressum' || page === 'datenschutz' || page === 'nutzungsbedingungen' || page === 'datenloeschung'" :kind="page" />
    <NotFoundView v-else />
  </main>

  <footer v-if="page === 'home'" class="site-footer">
    <div class="wrap footer-top">
      <p>Bis bald<br /><strong>im Stream.</strong></p>
      <a :href="twitchUrl" target="_blank" rel="me noopener noreferrer">Zum Twitch-Kanal <span aria-hidden="true">↗</span></a>
    </div>
    <div class="wrap footer-bottom">
      <span>© {{ year }} AnGaMa</span>
      <nav aria-label="Rechtliches">
        <a href="/impressum.html">Impressum</a>
        <a href="/datenschutz.html">Datenschutz</a>
        <a href="/nutzungsbedingungen.html">Nutzungsbedingungen</a>
        <a href="/datenloeschung.html">Datenlöschung</a>
        <a href="#inhalt">Nach oben ↑</a>
      </nav>
    </div>
  </footer>
  <footer v-else-if="page !== 'not-found'" class="legal-footer wrap">
    <a v-if="page !== 'impressum'" href="/impressum.html">Impressum</a>
    <a v-if="page !== 'datenschutz'" href="/datenschutz.html">Datenschutz</a>
    <a v-if="page !== 'nutzungsbedingungen'" href="/nutzungsbedingungen.html">Nutzungsbedingungen</a>
    <a v-if="page !== 'datenloeschung'" href="/datenloeschung.html">Datenlöschung</a>
    <a href="/">Startseite</a>
  </footer>
</template>
