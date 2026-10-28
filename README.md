# AnGaMa Portfolio

Das Portfolio für [byangama.de](https://byangama.de/) ist eine Vue-3-Anwendung mit TypeScript und Vite. Die sichtbaren Seiten liegen in `src/`; die sechs HTML-Dateien im Projektstamm sind lediglich die Einstiege für Startseite, Impressum, Datenschutz, Nutzungsbedingungen, Datenlöschung und 404.

## Lokal

Node.js 24 oder neuer:

```bash
npm ci
npm test
npm run build
npm run preview
```

Vite erzeugt die statischen Dateien in `dist/`. Die Gestaltung lädt keine fremden Schriften, Bilder, Tracker oder optionalen Cookies. Die rechtlichen Seiten sind sichtbar als Entwürfe markiert; vor App-Reviews müssen Anbieterangaben, Kontakt, Datenverarbeitung und Löschverfahren geprüft und vervollständigt werden. Persönliche Angaben gehören nicht ohne Freigabe in dieses öffentliche Repository.

## Veröffentlichung

Bis zum vollständigen Umzug bleibt das Twitch-Repository die Quelle für das STRATO-Deployment. Der gleiche Vue-/TypeScript-Quellstand wird dort unter `apps/portfolio` gehalten. Dieses Repository besitzt noch keine STRATO-Secrets und keinen Deployment-Workflow. Beim späteren Wechsel werden die Secrets eingerichtet, der Workflow auf dieses Repository umgestellt und die Live-Seite danach geprüft.
