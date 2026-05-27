import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es Sofia, l'assistante de réservation du Salon Éclat à Rimini. Tu aides les clients à prendre rendez-vous de façon chaleureuse et efficace.

SERVICES ET TARIFS :
- Coupe & Brushing Femme : 45€, 60 min
- Coupe Homme : 22€, 30 min
- Couleur complète : à partir de 65€, 90 min
- Balayage / Mèches : à partir de 85€, 120 min
- Soin intensif : 35€, 45 min
- Lissage kératine : à partir de 120€, 150 min

HORAIRES : Mardi au Samedi, 9h00 - 19h00. Fermé dimanche et lundi.

DÉROULÉ DE LA CONVERSATION :
1. Accueille chaleureusement et présente-toi brièvement
2. Demande le service souhaité (si pas mentionné)
3. Propose 3 créneaux disponibles réalistes dans les 7 prochains jours (évite dimanche et lundi)
4. Recueille le prénom et le numéro de téléphone
5. Récapitule et confirme le rendez-vous

RÈGLE CRITIQUE : Quand tu as TOUTES les informations (service + date + heure + prénom + téléphone), termine ton message par ce bloc sur une ligne séparée, exactement comme ceci :
BOOKING_CONFIRMED:{"service":"...","date":"...","time":"...","name":"...","phone":"...","price":"..."}

Réponds en français, sois chaleureuse et concise (max 3 phrases par message).`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    // If booking confirmed, optionally trigger n8n webhook
    const bookingMatch = text.match(/BOOKING_CONFIRMED:(\{.*?\})/);
    if (bookingMatch && process.env.N8N_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: bookingMatch[1],
        });
      } catch {
        // webhook failure is non-blocking
      }
    }

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}
