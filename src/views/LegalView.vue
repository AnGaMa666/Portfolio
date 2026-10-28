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
      <p class="legal-status">Noch unvollständig: Die markierten Anbieterangaben müssen vor einer öffentlichen App-Freigabe ergänzt werden.</p>
      <section>
        <h2>Anbieterkennzeichnung</h2>
        <p>Für byangama.de und das Social Media Management Center (SMMC) unter app.byangama.de.</p>
        <dl class="legal-facts">
          <div><dt>Name des Anbieters</dt><dd class="legal-missing">[DEINE ANGABE: gesetzlicher Name oder Firma]</dd></div>
          <div><dt>Ladungsfähige Anschrift</dt><dd class="legal-missing">[DEINE ANGABE: zulässige Anschrift des Impressumsservices mit vollständigem Namen und Zustellweg]</dd></div>
          <div><dt>Kontakt</dt><dd class="legal-missing">[DEINE ANGABE: öffentlich erreichbare E-Mail-Adresse und weiterer unmittelbarer Kommunikationsweg]</dd></div>
          <div><dt>Weitere Angaben, soweit zutreffend</dt><dd class="legal-missing">[PRÜFEN: Rechtsform, Vertretungsberechtigte, Register und Registernummer, Umsatzsteuer-ID oder Wirtschafts-ID, zuständige Aufsicht]</dd></div>
          <div><dt>Redaktionell verantwortlich, soweit erforderlich</dt><dd class="legal-missing">[PRÜFEN: Verantwortlicher für journalistisch-redaktionelle Inhalte nach § 18 Abs. 2 MStV]</dd></div>
        </dl>
      </section>
      <p>Ein Impressumsservice kann eine geeignete Zustellanschrift bereitstellen. Ob seine konkreten Angaben die gesetzlichen Anforderungen erfüllen, muss vor der Veröffentlichung geprüft werden.</p>
    </template>

    <template v-else-if="kind === 'datenschutz'">
      <p class="legal-status">Noch unvollständig: Die markierten Angaben zu Verantwortlichem, Dienstleistern, Drittstaaten und Fristen müssen vor einer öffentlichen App-Freigabe geprüft und ergänzt werden.</p>
      <section>
        <h2>1. Verantwortlicher und Geltungsbereich</h2>
        <p>Diese Informationen gelten für byangama.de, app.byangama.de und die zugehörige SMMC-API. Verantwortlich ist <strong class="legal-missing">[DEINE ANGABE: Name/Firma aus dem Impressum]</strong>. Kontakt: <strong class="legal-missing">[DEINE ANGABE: Datenschutz-E-Mail oder Postanschrift]</strong>. Die vollständige Anbieterkennzeichnung steht im <a href="/impressum">Impressum</a>.</p>
      </section>
      <section>
        <h2>2. Technischer Betrieb und Seitenaufrufe</h2>
        <p>Beim Abruf der Seiten und der API werden Verbindungsdaten wie IP-Adresse, Zeitpunkt, angeforderte Adresse und technische Browserdaten verarbeitet, um Seiten auszuliefern, Fehler zu erkennen und Angriffe abzuwehren. Portfolio und Web-App liegen auf STRATO-Webspace; API und Datenbank laufen auf einem Server. Das Portfolio lädt nach aktuellem Stand keine externen Schriften, Analyse- oder Werbeskripte. Externe Profilseiten werden erst beim Anklicken aufgerufen.</p>
        <p>Als Rechtsgrundlage für die technisch erforderliche Auslieferung und Sicherheit kommt Art. 6 Abs. 1 lit. f DSGVO in Betracht. <span class="legal-missing">[PRÜFEN: konkreter Serverbetreiber, Auftragsverarbeitungsvertrag, Log-Inhalte und Löschfrist]</span></p>
      </section>
      <section>
        <h2>3. SMMC-Konto und Workspace</h2>
        <p>Bei Registrierung und Anmeldung verarbeitet SMMC E-Mail-Adresse, Benutzername, Anzeigename, Passwort-Hash, Bestätigungsstatus und Sitzungsdaten. Für die Zusammenarbeit werden Workspace-Zugehörigkeit, Rollen, Einladungen und vom Team angelegte Einstellungen verarbeitet. E-Mail-Bestätigung, Passwort-Reset und Einladungen werden über einen konfigurierten SMTP-Dienst versendet. Diese Verarbeitung dient der Bereitstellung des angeforderten Kontos und der sicheren Zusammenarbeit (Art. 6 Abs. 1 lit. b und f DSGVO, soweit jeweils einschlägig).</p>
        <p>Eine Sitzung läuft standardmäßig spätestens nach sieben Tagen ab; die Serverkonfiguration kann diesen Wert ändern. Bestätigungslinks gelten standardmäßig 24 Stunden, Passwort-Reset-Links 15 Minuten. <span class="legal-missing">[PRÜFEN: tatsächliche Produktivwerte, Fristen für Konten, Einladungen, Sicherheitsprotokolle und Sicherungen]</span></p>
      </section>
      <section>
        <h2>4. Verbundene Plattformen und Inhalte</h2>
        <p>Wenn du Twitch, Spotify, Instagram oder TikTok aktiv verbindest, verarbeitet SMMC die für die gewählte Funktion nötigen Profilangaben, Berechtigungen und Zugangstoken. Eine Verbindung kann in SMMC unter „Verbindungen“ getrennt werden. Chat-Befehle, Musiksteuerung, Beiträge, Overlays und Automatisierungen verarbeiten die von dir eingegebenen Inhalte und benötigte Ereignisdaten. Veröffentlichungen und Nachrichten werden nur durch eine ausgelöste Funktion oder eine von dir aktivierte Automatisierung an die Zielplattform übermittelt.</p>
        <p>Für verbundene Dienste gelten zusätzlich deren Datenschutzhinweise. SMMC übermittelt an Meta oder TikTok keine allgemeinen Workspace- oder Einnahmendaten allein durch das Verbinden eines Kontos. <span class="legal-missing">[PRÜFEN: konkrete Plattformempfänger, OAuth-Berechtigungen, Speicherdauer von Tokens, Protokollen, Medien und Ereignissen]</span></p>
      </section>
      <section>
        <h2>5. Einnahmen und Steuerunterlagen</h2>
        <p>Im Einnahmenbereich können Herkunft, Betrag, Zweck, Buchungsdaten und importierte Plattformdaten gespeichert werden. Die von dir hochgeladene Twitch-Auszahlungsdatei wird für den Import verarbeitet; die Anwendung speichert ihren SHA-256-Fingerabdruck zur Erkennung doppelter Importe. Die Daten dienen deiner eigenen Übersicht und dem von dir gewünschten Export. SMMC erstellt keine verbindliche steuerliche Bewertung. <span class="legal-missing">[PRÜFEN: Aufbewahrungsfristen, Export- und Löschverfahren sowie steuerrechtliche Pflichten]</span></p>
      </section>
      <section>
        <h2>6. Cookies, lokaler Speicher und externe Einbettungen</h2>
        <p>Für Anmeldung und Schutz vor unerwünschten Änderungen verwendet SMMC die technisch notwendigen Cookies <code>smm_session</code> und <code>XSRF-TOKEN</code>. Sie sind auf HTTPS beschränkt; das Sitzungscookie ist nur serverseitig lesbar. Die Auswahl für optionale Inhalte wird unter <code>smmc.cookie-consent.v1</code> höchstens 180 Tage im Browser gespeichert. Lokale Entwürfe und Workspace-Einstellungen können beim Verwenden der entsprechenden Funktionen im Browser liegen.</p>
        <p>Der eingebettete Twitch-Chat wird erst nach deiner Zustimmung und dem Öffnen geladen. Dann baut dein Browser eine Verbindung zu Twitch auf, das eigene Daten speichern kann. Die Zustimmung lässt sich über „Cookie-Einstellungen“ ändern. SMMC setzt nach aktuellem Stand keine Analyse- oder Marketing-Cookies ein. Technisch notwendige Speicherungen richten sich nach § 25 Abs. 2 TDDDG; für die optionale Einbettung wird eine Einwilligung eingeholt.</p>
      </section>
      <section>
        <h2>7. Empfänger, Drittstaaten und Speicherdauer</h2>
        <p>Hosting- und E-Mail-Dienstleister erhalten Daten, soweit dies für den Betrieb nötig ist. Verbundene Plattformen erhalten nur Daten für die von dir genutzte Funktion. Bei Plattformen außerhalb des Europäischen Wirtschaftsraums kann eine Übermittlung in Drittstaaten stattfinden. Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweilige Funktion, Sicherheit, Nachweise oder gesetzliche Pflichten erforderlich ist.</p>
        <p class="legal-missing">[DEINE ANGABE/PRÜFEN: vollständige Dienstleisterliste mit Sitz, konkrete Drittland-Übermittlungen und Garantien, Löschfristen je Datenkategorie sowie Backup-Fristen]</p>
      </section>
      <section>
        <h2>8. Deine Rechte</h2>
        <p>Du kannst je nach Fall Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit oder Widerspruch verlangen. Eine Einwilligung kannst du jederzeit für die Zukunft widerrufen. Du kannst dich bei einer Datenschutzaufsichtsbehörde beschweren. Anfragen richtest du an <strong class="legal-missing">[DEINE ANGABE: erreichbare Datenschutz-Kontaktadresse]</strong>. Hinweise zu SMMC-Verbindungen und Löschanfragen stehen unter <a href="/datenloeschung">Datenlöschung</a>.</p>
      </section>
    </template>

    <template v-else-if="kind === 'nutzungsbedingungen'">
      <p class="legal-status">Zur Freigabe vorbereitet. Anbieter, Kontakt, Leistungsumfang und etwaige Bezahlbedingungen müssen vor Verwendung als endgültige Nutzungsbedingungen geprüft werden.</p>
      <section>
        <h2>1. Anbieter und Dienst</h2>
        <p>Vertragspartner ist <strong class="legal-missing">[DEINE ANGABE: Anbieter aus dem Impressum]</strong>. SMMC ist eine Webplattform für Creator und Teams zur Verwaltung von Stream-, Chat-, Musik-, Overlay- und Beitragsfunktionen. Es befindet sich derzeit in einer kontrollierten Testphase. Verfügbare Funktionen hängen von Workspace-Rolle und aktivierten Verbindungen ab.</p>
      </section>
      <section>
        <h2>2. Konto, Workspace und Zugang</h2>
        <p>Für SMMC benötigst du ein Konto. Bewahre deine Zugangsdaten sicher auf und nutze für Teammitglieder eigene Konten und passende Rollen. Workspace-Owner verwalten Mitglieder, Funktionen und verbundene Konten. Bei Verdacht auf missbräuchlichen Zugriff solltest du deine Sitzungen beenden und den Anbieter kontaktieren.</p>
      </section>
      <section>
        <h2>3. Plattformen, Inhalte und Automatisierungen</h2>
        <p>Du entscheidest, welche externen Konten du verbindest. Für Twitch, Spotify, Instagram und TikTok gelten zusätzlich deren eigene Regeln. Du bist für die Rechte an hochgeladenen Medien, Texte, Chatnachrichten und die von dir eingerichteten Automatisierungen verantwortlich. Prüfe vor dem Aktivieren Ziel, Auslöser und öffentliche Ausgabe. SMMC veröffentlicht Inhalte nur durch eine ausdrücklich ausgelöste Funktion oder eine aktivierte Automatisierung.</p>
      </section>
      <section>
        <h2>4. Testphase, Änderungen und Verfügbarkeit</h2>
        <p>Funktionen können während der Testphase angepasst oder zeitweise unterbrochen werden. Eine bestimmte Verfügbarkeit oder dauerhafte Bereitstellung einzelner Testfunktionen ist derzeit nicht zugesagt. <span class="legal-missing">[PRÜFEN: späterer Leistungsumfang, Supportweg, Sperrung bei Missbrauch, Änderungen und Haftungsregeln]</span></p>
      </section>
      <section>
        <h2>5. Entgelte und Beendigung</h2>
        <p>Derzeit werden auf dieser Seite keine kostenpflichtigen Tarife angeboten. Vor Einführung eines Abos müssen Preis, Abrechnung, Laufzeit, Kündigung, Widerruf und tarifliche Grenzen gesondert beschrieben werden. Externe Verbindungen kannst du im Bereich „Verbindungen“ trennen. <span class="legal-missing">[DEINE ANGABE/PRÜFEN: Vertragsbeendigung, Kontaktweg und Verfahren zur Kontolöschung]</span></p>
      </section>
      <section>
        <h2>6. Datenschutz</h2>
        <p>Informationen zur Verarbeitung personenbezogener Daten stehen unter <a href="/datenschutz">Datenschutz</a>. Das <a href="/impressum">Impressum</a> nennt den Anbieter. Weitere Hinweise stehen unter <a href="/datenloeschung">Datenlöschung</a>.</p>
      </section>
    </template>

    <template v-else>
      <p class="legal-status">Verbindungen kannst du selbst trennen. Für Konto- und Datenlöschung fehlt noch eine öffentliche Kontaktadresse.</p>
      <section>
        <h2>Verbindung trennen</h2>
        <p>Öffne in SMMC „Verbindungen“, wähle den Dienst und „Verbindung trennen“. Bereits auf einer externen Plattform veröffentlichte Inhalte bleiben dort bestehen. Du kannst die SMMC-Berechtigung zusätzlich in den Einstellungen der jeweiligen Plattform widerrufen.</p>
      </section>
      <section>
        <h2>Konto oder weitere Daten löschen lassen</h2>
        <p>Sende eine Anfrage von der E-Mail-Adresse deines SMMC-Kontos an <strong class="legal-missing">[DEINE ANGABE: Datenschutz-Kontaktadresse]</strong>. Nenne das betroffene Konto und welche Daten gelöscht werden sollen. Sende keine Passwörter, Zugangstoken oder Ausweiskopien. Der Anbieter prüft die Berechtigung der Anfrage und informiert über Löschung oder gesetzliche Aufbewahrungspflichten.</p>
        <p class="legal-missing">[PRÜFEN: internes Löschverfahren, Fristen, Backups und ggf. Daten aus Team-Workspaces]</p>
      </section>
    </template>

    <a class="back-link" href="/">Zur Startseite ↗</a>
  </article>
</template>
