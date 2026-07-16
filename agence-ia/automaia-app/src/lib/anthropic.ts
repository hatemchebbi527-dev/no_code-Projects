import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY?.trim() });

export const CLAUDE_MODEL = "claude-opus-4-8";

// Un header HTTP n'accepte que des caractères Latin-1 (code <= 255). Un
// copier-coller depuis un clavier mobile peut substituer un trait d'union par
// un tiret Unicode et casser l'appel API avec une erreur ByteString peu
// explicite — appelée juste avant chaque appel Claude pour un diagnostic clair.
export function assertApiKeyIsClean() {
  const raw = process.env.ANTHROPIC_API_KEY;
  if (!raw) {
    throw new Error("ANTHROPIC_API_KEY non configurata.");
  }

  const trimmed = raw.trim();
  for (let i = 0; i < trimmed.length; i++) {
    const code = trimmed.charCodeAt(i);
    if (code > 255) {
      throw new Error(
        `ANTHROPIC_API_KEY contient un caractère invalide à la position ${i} ` +
          `(code Unicode ${code}). La clé a probablement été corrompue lors du ` +
          `copier-coller (ex. tiret transformé par l'auto-correction du clavier). ` +
          `Longueur de la clé reçue : ${trimmed.length} caractères.`
      );
    }
  }
}

// Ton adapté de agence-ia/marque/brand_voice.md : ici la voix n'est pas celle
// d'AutomaIA mais celle du professionnel (commercialista/avvocato) qui utilise
// la piattaforma pour parler à ses propres clienti.
const VOICE_GUIDELINES = `Scriva sempre in italiano, con il "Lei" quando ci si rivolge al lettore.
Il tono è professionale ma accessibile: chiaro, rassicurante, concreto, mai eccessivo o sensazionalistico.
Eviti gergo tecnico, promesse vaghe o superlativi ("rivoluzionario", "magico", "garantito al 100%").
Frasi brevi e dirette. Non usi mai trattini lunghi (—) nel testo.`;

export function contentGenerationSystemPrompt() {
  return `Lei è l'assistente di scrittura di un professionista italiano (commercialista o avvocato) che si rivolge ai propri clienti e potenziali clienti su LinkedIn.
${VOICE_GUIDELINES}

Tono professionale, paragrafi brevi, può concludere con una domanda per stimolare commenti. Lunghezza: 80-150 parole.

Scriva solo il testo del post, senza introduzioni tipo "Ecco il post:" e senza hashtag a meno che non siano naturali al testo.`;
}

export function emailDraftSystemPrompt() {
  return `Lei è l'assistente che aiuta un professionista italiano (commercialista o avvocato) a rispondere alle email dei propri clienti.
${VOICE_GUIDELINES}

Il suo compito: leggere l'email ricevuta dal cliente e scrivere una bozza di risposta pronta da rivedere e inviare.
Scriva solo il testo della risposta email (senza oggetto, senza "Gentile...," se non pertinente al contesto), pronta per essere corretta e inviata dal professionista.`;
}
