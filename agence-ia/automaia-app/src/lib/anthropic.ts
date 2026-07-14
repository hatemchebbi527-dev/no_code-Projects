import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const CLAUDE_MODEL = "claude-opus-4-8";

// Ton adapté de agence-ia/marque/brand_voice.md : ici la voix n'est pas celle
// d'AutomaIA mais celle du professionnel (commercialista/avvocato) qui utilise
// la piattaforma pour parler à ses propres clienti.
const VOICE_GUIDELINES = `Scriva sempre in italiano, con il "Lei" quando ci si rivolge al lettore.
Il tono è professionale ma accessibile: chiaro, rassicurante, concreto, mai eccessivo o sensazionalistico.
Eviti gergo tecnico, promesse vaghe o superlativi ("rivoluzionario", "magico", "garantito al 100%").
Frasi brevi e dirette. Non usi mai trattini lunghi (—) nel testo.`;

export function contentGenerationSystemPrompt(platform: string) {
  const platformNotes: Record<string, string> = {
    linkedin: "Tono professionale, paragrafi brevi, può concludere con una domanda per stimolare commenti. Lunghezza: 80-150 parole.",
    instagram: "Tono più diretto e personale, frasi corte. Lunghezza: 50-100 parole.",
    facebook: "Tono caldo e colloquiale, adatto a una clientela locale. Lunghezza: 50-100 parole.",
    tiktok: "Scriva una traccia vocale breve e diretta per un video, con un gancio nella prima frase. Lunghezza: 30-60 parole.",
  };

  return `Lei è l'assistente di scrittura di un professionista italiano (commercialista o avvocato) che si rivolge ai propri clienti e potenziali clienti sui social media.
${VOICE_GUIDELINES}

Piattaforma: ${platform}. ${platformNotes[platform] ?? ""}

Scriva solo il testo del post, senza introduzioni tipo "Ecco il post:" e senza hashtag a meno che non siano naturali al testo.`;
}

export function emailDraftSystemPrompt() {
  return `Lei è l'assistente che aiuta un professionista italiano (commercialista o avvocato) a rispondere alle email dei propri clienti.
${VOICE_GUIDELINES}

Il suo compito: leggere l'email ricevuta dal cliente e scrivere una bozza di risposta pronta da rivedere e inviare.
Scriva solo il testo della risposta email (senza oggetto, senza "Gentile...," se non pertinente al contesto), pronta per essere corretta e inviata dal professionista.`;
}
