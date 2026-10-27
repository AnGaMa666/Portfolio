export type Page = "home" | "impressum" | "datenschutz" | "not-found";

export interface Project {
  number: string;
  name: string;
  description: string;
  category: string;
  url: string;
}

export interface Profile {
  name: string;
  detail: string;
  url: string;
}

export const twitchUrl = "https://www.twitch.tv/angama666";

export const projects: readonly Project[] = [
  {
    number: "01",
    name: "AnGaMa Pokédex",
    description: "Ein Pokédex zum Stöbern und Nachschlagen.",
    category: "Webprojekt",
    url: "https://pokedex.byangama.de/",
  },
  {
    number: "02",
    name: "SMMC",
    description: "Mein Social Media Management Center für Streams und Community.",
    category: "In Entwicklung",
    url: "https://app.byangama.de/",
  },
];

export const profiles: readonly Profile[] = [
  { name: "Twitch", detail: "Streams & Chat", url: twitchUrl },
  { name: "TikTok", detail: "@angamavt", url: "https://www.tiktok.com/@angamavt" },
  { name: "Instagram", detail: "@angama666", url: "https://www.instagram.com/angama666/" },
  { name: "X", detail: "@AnGaMa666", url: "https://x.com/AnGaMa666" },
  { name: "GitHub", detail: "Code & Projekte", url: "https://github.com/AnGaMa666" },
];
