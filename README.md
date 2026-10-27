# AnGaMa Portfolio

Die statische Startseite für [byangama.de](https://byangama.de/). Sie zeigt ausschließlich die öffentliche Online-Identität AnGaMa und verlinkt Pokédex, SMMC und die bekannten Profile. Es werden keine externen Skripte, Schriftarten, Bilder, Tracker oder optionalen Cookies geladen.

## Entwicklung

Node.js 24 oder neuer:

```bash
npm test
npm run build
npm run preview
```

Der Build liegt in `dist/`. `src/` enthält die veröffentlichbaren Dateien. Die rechtlichen Seiten sind derzeit sichtbar als unvollständig markiert und nicht indexiert. Sie müssen später mit geprüften Angaben ergänzt werden; persönliche Daten gehören nicht ohne Freigabe in dieses öffentliche Repository.

## Veröffentlichung

Die produktive Veröffentlichung läuft vorerst noch über das Twitch-Repository aus `apps/portfolio`. Dieses Repository enthält denselben Quellstand als Vorbereitung für den späteren Umzug. Hier sind noch keine STRATO-Secrets und kein Deployment-Workflow eingerichtet. Beim endgültigen Wechsel werden zuerst die Secrets und der Zielpfad geprüft, dann der Deployment-Workflow umgestellt und anschließend die Live-Seite verifiziert.
