<script setup lang="ts">
import { profiles, projects } from "../content";
</script>

<template>
  <section class="hero wrap" aria-labelledby="titel">
    <div class="hero-topline"><span>Persönliche Startseite</span><span>Streams / Software / Community</span></div>
    <h1 id="titel">Hey, ich bin<br /><em>AnGaMa.</em></h1>
    <div class="hero-bottom">
      <p>Ich streame auf Twitch und baue eigene Software. Hier sind meine Projekte und die Wege, auf denen du mich online findest.</p>
      <a class="round-link" href="#projekte" aria-label="Zu meinen Projekten"><span aria-hidden="true">↓</span></a>
    </div>
  </section>

  <section id="projekte" class="projects-band" aria-labelledby="projekte-titel">
    <div class="wrap">
      <div class="section-head">
        <p class="section-kicker">01 / Projekte</p>
        <h2 id="projekte-titel">Was gerade online ist.</h2>
      </div>
      <div class="project-list">
        <a v-for="project in projects" :key="project.url" class="project-row" :href="project.url">
          <span class="project-number">{{ project.number }}</span>
          <span class="project-main"><strong>{{ project.name }}</strong><small>{{ project.description }}</small></span>
          <span class="project-tag">{{ project.category }}</span>
          <span class="project-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </section>

  <section id="profile" class="profiles wrap" aria-labelledby="profile-titel">
    <div class="section-head">
      <p class="section-kicker">02 / Im Netz</p>
      <h2 id="profile-titel">Anderswo unterwegs.</h2>
    </div>
    <div class="profile-links">
      <a v-for="profile in profiles" :key="profile.url" :href="profile.url" target="_blank" rel="me noopener noreferrer">
        <span>{{ profile.name }}</span><small>{{ profile.detail }}</small><b aria-hidden="true">↗</b>
      </a>
    </div>
  </section>
</template>
