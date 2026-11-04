// Manuvo - invio SMS.
// Usa Twilio se le variabili d'ambiente sono presenti (TWILIO_ACCOUNT_SID,
// TWILIO_AUTH_TOKEN, TWILIO_FROM), altrimenti modalita dev : nessun invio reale,
// il messaggio viene solo loggato. Cosi il flusso funziona anche senza provider.
export type SmsResult = { ok: true; dev: boolean } | { ok: false };

export async function sendSms(to: string, body: string): Promise<SmsResult> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;

  if (!sid || !token || !from) {
    // Modalita dev : provider non configurato. Utile per testare senza SMS reale.
    console.info(`[sms:dev] -> ${to} : ${body}`);
    return { ok: true, dev: true };
  }

  try {
    const params = new URLSearchParams({ To: to, From: from, Body: body });
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      },
    );
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[sms] Twilio errore:", res.status, detail.slice(0, 300));
      return { ok: false };
    }
    return { ok: true, dev: false };
  } catch (e) {
    console.error("[sms] invio fallito:", e);
    return { ok: false };
  }
}

// Vero solo se il provider SMS e configurato in questo ambiente.
// Le variabili sono lette a ogni chiamata, quindi il giorno in cui Twilio e
// attivo su Vercel il badge "Contatto verificato" torna da solo, senza
// toccare il codice (tappa 16b della roadmap).
export function isSmsProviderLive(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_FROM,
  );
}
