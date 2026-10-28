# Portfolio-Deploykopie

Der öffentliche Quellstand wird im eigenständigen Repository [AnGaMa666/Portfolio](https://github.com/AnGaMa666/Portfolio) gepflegt. Diese Kopie bleibt bis zum Umzug der STRATO-Secrets im Twitch-Repository, damit der vorhandene Produktions-Workflow `byangama.de` veröffentlichen kann. Änderungen am Portfolio müssen in beiden Repositories synchron gehalten werden.

Die sichtbaren Seiten sind Vue-3-Komponenten mit TypeScript. Vite verwendet nur `index.html` als technische Einstiegsschale; Startseite und Rechtsseiten werden anhand der URL durch Vue gerendert. Apache leitet `/impressum`, `/datenschutz`, `/nutzungsbedingungen` und `/datenloeschung` intern auf die Vue-App. Die Rechtsseiten kennzeichnen offene Pflichtangaben direkt mit `[DEINE ANGABE: ...]` und `[PRÜFEN: ...]`. Vor App-Reviews müssen insbesondere die Daten des Impressumsservices, Kontaktwege, Empfänger, Drittland-Übermittlungen, Speicherfristen und das Löschverfahren ergänzt und geprüft werden.

## Lokal prüfen

Im Repository-Stamm:

```bash
npm ci
npm test
npm run build
```

Der manuelle Workflow `.github/workflows/portfolio-deploy.yml` verwendet die vorhandenen STRATO-Secrets aus dem GitHub-Environment `production`. Er prüft vor dem Upload den Zielpfad `/portfolio`, legt beim ersten Veröffentlichen nur bei erkannter STRATO-Reservierungsseite eine neue `index.html` an und prüft danach Startseite, Assets, Impressum und Datenschutz live. Der Upload nutzt denselben Paramiko-SFTP-Client wie die Web-App, schreibt die Startseite zuletzt und hält vorherige Root-Dateien für einen Rollback bereit.
