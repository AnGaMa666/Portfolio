/* One-time asset generator: npm install --no-save playwright, then node scripts/create-privacy-video.cjs. */
const { writeFile } = require("node:fs/promises");
const { resolve } = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

const edge = process.env.EDGE_EXECUTABLE || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const output = resolve(__dirname, "../public/privacy-explainer.webm");

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: edge });
  try {
    const page = await browser.newPage();
    const dataUrl = await page.evaluate(async () => {
      const slides = [
        ["Datenschutz bei SMMC", "Kurz erklärt · Stand Oktober 2026"],
        ["Dein Konto", "Für den Zugang verarbeitet SMMC E-Mail-Adresse, Benutzernamen, Anzeigenamen, Passwort-Hash und Sitzungsdaten."],
        ["Externe Konten", "Du verbindest Plattformen aktiv. YouTube liefert mit Lesezugriff Kanal- und Live-Daten; SMMC veröffentlicht dort nichts."],
        ["Cookies und Twitch-Chat", "Notwendige Cookies schützen die Anmeldung. Der eingebettete Twitch-Chat lädt erst nach deiner Zustimmung."],
        ["Du entscheidest", "Verbindungen und Cookie-Auswahl kannst du ändern. Vollständige Hinweise und noch offene Angaben stehen auf der Datenschutzseite."],
      ];
      const canvas = document.createElement("canvas");
      canvas.width = 1280;
      canvas.height = 720;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      const mimeType = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"]
        .find(type => MediaRecorder.isTypeSupported(type));
      if (!mimeType) throw new Error("WebM recording unavailable");
      const stream = canvas.captureStream(12);
      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 900_000 });
      const chunks = [];
      recorder.addEventListener("dataavailable", event => { if (event.data.size) chunks.push(event.data); });
      const stopped = new Promise(resolve => recorder.addEventListener("stop", resolve, { once: true }));
      const wrap = (value, maxWidth) => {
        const lines = [];
        let line = "";
        for (const word of value.split(" ")) {
          const next = line ? `${line} ${word}` : word;
          if (context.measureText(next).width > maxWidth && line) { lines.push(line); line = word; }
          else line = next;
        }
        if (line) lines.push(line);
        return lines;
      };
      const draw = (index) => {
        const [title, body] = slides[index];
        context.fillStyle = "#f4f1e9";
        context.fillRect(0, 0, 1280, 720);
        context.fillStyle = "#242521";
        context.font = "700 26px Arial";
        context.fillText("AnGaMa / SMMC", 92, 102);
        context.fillStyle = "#d75638";
        context.fillRect(92, 168, 84, 8);
        context.fillStyle = "#242521";
        context.font = "58px Georgia";
        wrap(title, 1080).forEach((line, row) => context.fillText(line, 92, 275 + row * 75));
        context.font = "32px Arial";
        wrap(body, 1050).forEach((line, row) => context.fillText(line, 92, 390 + row * 46));
        context.font = "22px Arial";
        context.fillStyle = "#5d5f58";
        context.fillText(`Datenschutz · ${index + 1} / ${slides.length}`, 92, 654);
        context.fillStyle = "#d75638";
        context.fillRect(92, 675, (1096 * (index + 1)) / slides.length, 5);
      };
      draw(0);
      recorder.start(200);
      for (let index = 0; index < slides.length; index++) {
        draw(index);
        await new Promise(resolve => setTimeout(resolve, 4000));
      }
      recorder.stop();
      await stopped;
      stream.getTracks().forEach(track => track.stop());
      const blob = new Blob(chunks, { type: mimeType });
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
      });
    });
    await writeFile(output, Buffer.from(dataUrl.split(",", 2)[1], "base64"));
    process.stdout.write(`Wrote ${output}\n`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
