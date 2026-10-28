<script setup lang="ts">
import { computed } from "vue";

type LegalPage = "impressum" | "datenschutz" | "nutzungsbedingungen" | "datenloeschung";
const props = defineProps<{ kind: LegalPage }>();
const title = computed(() => ({
  impressum: "Impressum",
  datenschutz: "Datenschutz",
  nutzungsbedingungen: "Nutzungsbedingungen",
  datenloeschung: "Datenlöschung",
})[props.kind]);
</script>

<template>
  <article class="simple-page wrap legal-page">
    <p class="section-kicker">AnGaMa / Rechtliches</p>
    <h1>{{ title }}.</h1>

    <template v-if="kind === 'impressum'">
      <p class="legal-status">Vorlage – noch unvollständig. Der Anbieter wird nach Auswahl eines Impressumsservices ergänzt.</p>
      <section>
        <h2>Anbieterkennzeichnung</h2>
        <dl class="legal-facts">
          <div><dt>Anbieter und vertretungsberechtigte Person</dt><dd>Wird nach Auswahl des Impressumsservices eingetragen.</dd></div>
          <div><dt>Ladungsfähige Anschrift</dt><dd>Wird nach Auswahl des Impressumsservices eingetragen.</dd></div>
          <div><dt>Kontakt-E-Mail</dt><dd>Wird nach Freigabe einer Kontaktadresse eingetragen.</dd></div>
          <div><dt>Weitere Pflichtangaben</dt><dd>Rechtsform, Registereintrag, Umsatzsteuer-ID und Aufsichtsbehörde werden ergänzt, soweit sie zutreffen.</dd></div>
        </dl>
      </section>
      <p>Dieses Impressum ist für byangama.de und SMMC unter app.byangama.de vorgesehen. Vor der öffentlichen App-Freigabe müssen die Angaben vervollständigt und geprüft werden.</p>
    </template>

    <template v-else-if="kind === 'datenschutz'">
      <p class="legal-status">Entwurf – Verantwortlicher, Empfänger und Speicherfristen müssen vor der Freigabe vervollständigt und geprüft werden.</p>
      <section>
        <h2>1. Verantwortlicher und Geltungsbereich</h2>
        <p>Diese Hinweise betreffen das Portfolio byangama.de und das Social Media Management Center (SMMC) unter app.byangama.de. Name, ladungsfähige Anschrift und Kontaktadresse des Verantwortlichen werden im <a href="/impressum.html">Impressum</a> ergänzt. Bis dahin sind diese Hinweise unvollständig.</p>
      </section>
      <section>
        <h2>2. Besuch des Portfolios</h2>
        <p>Beim Aufruf werden technisch erforderliche Verbindungsdaten wie IP-Adresse, Zeitpunkt, angeforderte Seite und Browserkennung an den Webhoster übermittelt. Sie dienen der Auslieferung und Sicherheit der Website. Das Portfolio lädt keine externen Schriften, Tracker oder Analyse-Skripte. Links zu sozialen Plattformen werden erst beim Anklicken aufgerufen. Die genaue Protokollspeicherung und der Hostingvertrag werden noch geprüft.</p>
      </section>
      <section>
        <h2>3. SMMC-Konto und Workspace</h2>
        <p>Für Anmeldung und Zusammenarbeit verarbeitet SMMC die bei Registrierung angegebenen Kontaktdaten, Benutzername, Passwort-Hash, Workspace-Zugehörigkeit und Rollen. Für die angemeldete Sitzung und den Schutz vor unerwünschten Änderungen setzt SMMC notwendige Cookies ein. Im Browser können gewählte Workspace-Einstellungen und Entwürfe gespeichert werden. Zweck ist die Bereitstellung des gewünschten Dienstes und dessen Absicherung; die Zuordnung zu konkreten Rechtsgrundlagen und Löschfristen wird noch geprüft.</p>
      </section>
      <section>
        <h2>4. Verbundene Dienste und Inhalte</h2>
        <p>Wenn du Twitch, Spotify, Instagram oder künftig TikTok selbst verbindest, verarbeitet SMMC die für die freigegebenen Funktionen nötigen Profilangaben, Berechtigungen und Zugangstoken. Verbindungen können im Bereich „Verbindungen“ getrennt werden. Beim Verwenden von Chat, Musik, Beiträgen, Overlays oder Einnahmen können eingegebene Inhalte und Ereignisdaten verarbeitet werden. Eine Übertragung an eine Plattform erfolgt erst, wenn die entsprechende Funktion aktiv genutzt wird. Daneben gelten die Datenschutzhinweise der jeweiligen Plattform.</p>
      </section>
      <section>
        <h2>5. Cookies und externe Einbettungen</h2>
        <p>SMMC nutzt ein Sitzungscookie und ein Cookie gegen unerwünschte Änderungen. Die Auswahl für optionale externe Inhalte wird im lokalen Browserspeicher höchstens 180 Tage gemerkt. Der eingebettete Twitch-Chat wird erst nach Zustimmung und Öffnen geladen; dann verbindet sich dein Browser direkt mit Twitch. SMMC setzt nach aktuellem Stand keine Analyse- oder Marketing-Cookies ein. Die Auswahl lässt sich in SMMC über „Cookie-Einstellungen“ ändern.</p>
      </section>
      <section>
        <h2>6. Empfänger, Drittstaaten und Speicherdauer</h2>
        <p>Technische Dienstleister für Hosting und E-Mail sowie ausdrücklich verbundene Plattformen können Daten erhalten, soweit dies für die jeweilige Funktion nötig ist. Bei Plattformen außerhalb des Europäischen Wirtschaftsraums kann eine Übermittlung in Drittstaaten erfolgen. Die konkreten Dienstleister, Übermittlungsgrundlagen und Speicherfristen müssen vor Freigabe ergänzt werden. Daten werden nur für die jeweilige Funktion, gesetzliche Aufbewahrungspflichten und nötige Sicherheitsnachweise vorgehalten.</p>
      </section>
      <section>
        <h2>7. Deine Rechte</h2>
        <p>Nach der DSGVO kannst du je nach Fall Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit oder Widerspruch verlangen. Eine erteilte Einwilligung kannst du für die Zukunft widerrufen. Außerdem kannst du dich bei einer Datenschutzaufsichtsbehörde beschweren. Hinweise zur Löschung stehen unter <a href="/datenloeschung.html">Datenlöschung</a>. Die Kontaktadresse des Verantwortlichen wird noch ergänzt.</p>
      </section>
    </template>

    <template v-else-if="kind === 'nutzungsbedingungen'">
      <p class="legal-status">Entwurf für die SMMC-Testphase – noch nicht als endgültige Vertragsbedingungen freigegeben.</p>
      <section>
        <h2>1. Dienst und Konten</h2>
        <p>SMMC ist eine Plattform zum Verwalten von Stream-, Chat-, Musik- und Beitragsfunktionen. Funktionen werden schrittweise in einer Testphase bereitgestellt. Du benötigst ein eigenes SMMC-Konto; welche Funktionen verfügbar sind, hängt von Workspace-Rolle und aktivierten Verbindungen ab. Du bist für die Zugangsdaten deines Kontos verantwortlich.</p>
      </section>
      <section>
        <h2>2. Verbundene Plattformen</h2>
        <p>Du entscheidest, welche externen Konten du verbindest. Die Nutzung von Twitch, Spotify, Instagram oder TikTok unterliegt zusätzlich deren eigenen Bedingungen und Berechtigungen. Eine getrennte Verbindung kann Funktionen in SMMC einschränken. SMMC veröffentlicht Inhalte nur über eine ausdrücklich ausgelöste oder von dir eingerichtete Automatisierung.</p>
      </section>
      <section>
        <h2>3. Inhalte und Automatisierungen</h2>
        <p>Du bleibst für deine hochgeladenen Medien, Beiträge, Chatnachrichten und eingerichteten Automatisierungen verantwortlich. Lade nur Inhalte hoch, für die du die nötigen Rechte hast, und beachte die Regeln der Zielplattformen. Vor dem Aktivieren einer Automatisierung solltest du Ziel, Auslöser und öffentliche Ausgabe prüfen.</p>
      </section>
      <section>
        <h2>4. Testphase und spätere Angebote</h2>
        <p>Ein Anspruch auf bestimmte Testfunktionen oder unterbrechungsfreie Verfügbarkeit wird hier nicht zugesagt. Kostenpflichtige Abos, Leistungsumfang und Grenzen sind derzeit nicht Bestandteil dieser Vorlage; sie benötigen vor Einführung gesonderte Angaben und Bedingungen.</p>
      </section>
      <section>
        <h2>5. Datenschutz und Beendigung</h2>
        <p>Informationen zum Umgang mit personenbezogenen Daten stehen unter <a href="/datenschutz.html">Datenschutz</a>. Externe Konten kannst du in SMMC unter „Verbindungen“ trennen. Hinweise zu weitergehenden Löschanfragen stehen unter <a href="/datenloeschung.html">Datenlöschung</a>.</p>
      </section>
      <p>Die rechtlichen Anbieterangaben und eine Kontaktmöglichkeit stehen künftig im <a href="/impressum.html">Impressum</a>.</p>
    </template>

    <template v-else>
      <p class="legal-status">Vorlage – eine verlässliche Kontaktadresse und das vollständige Löschverfahren werden noch ergänzt.</p>
      <section>
        <h2>Verbindung trennen</h2>
        <p>Öffne in SMMC den Bereich „Verbindungen“, wähle den betroffenen Dienst und dann „Verbindung trennen“. Damit wird die Verbindung in SMMC beendet. Bereits auf der externen Plattform veröffentlichte Inhalte werden dadurch nicht automatisch gelöscht.</p>
      </section>
      <section>
        <h2>Weitere Daten löschen lassen</h2>
        <p>Für eine Löschung deines SMMC-Kontos oder anderer gespeicherter personenbezogener Daten wird hier nach Freigabe eine Kontaktadresse und ein überprüfbarer Antragsweg eingetragen. Bis dahin ist diese Anleitung nicht vollständig. Du kannst außerdem in den Kontoeinstellungen der jeweiligen Plattform die SMMC-Berechtigung widerrufen.</p>
      </section>
    </template>

    <a class="back-link" href="/">Zur Startseite ↗</a>
  </article>
</template>
