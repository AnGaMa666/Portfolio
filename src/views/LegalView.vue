<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ kind: "impressum" | "datenschutz" }>();
const imprint = computed(() => props.kind === "impressum");
</script>

<template>
  <div class="simple-page wrap">
    <p class="section-kicker">Rechtliches / {{ imprint ? "01" : "02" }}</p>
    <h1>{{ imprint ? "Impressum." : "Datenschutz." }}</h1>
    <p v-if="imprint">Die Angaben für das Impressum werden ergänzt. Diese Seite ist noch unvollständig.</p>
    <p v-else>Die Datenschutzhinweise werden ergänzt. Diese Seite ist noch unvollständig.</p>
    <a class="back-link" href="/">Zur Startseite ↗</a>
  </div>
</template>
