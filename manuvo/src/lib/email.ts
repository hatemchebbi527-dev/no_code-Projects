// Manuvo - invio email (Resend). Se manca la chiave API, non blocca: logga e salta.
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
// Espedientore di test Resend finche non e configurato un dominio proprio.
const from = process.env.EMAIL_FROM ?? "Manuvo <onboarding@resend.dev>";

const resend = apiKey ? new Resend(apiKey) : null;

type SendArgs = { to: string; subject: string; html: string };

export async function sendEmail({ to, subject, html }: SendArgs): Promise<{ sent: boolean }> {
  if (!resend) {
    // Pas de cle en local / si non configuree : on ne casse pas le flux.
    console.warn(`[email] RESEND_API_KEY absente, email non envoye a ${to} (sujet: ${subject}).`);
    return { sent: false };
  }
  try {
    await resend.emails.send({ from, to, subject, html });
    return { sent: true };
  } catch (error) {
    console.error("[email] envoi echoue:", error);
    return { sent: false };
  }
}

// Gabarit minimal et lisible (inline styles pour compatibilite clients mail).
export function resetPasswordHtml(opts: {
  title: string;
  intro: string;
  button: string;
  url: string;
  ignore: string;
  expires: string;
}): string {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#faf8f4;font-family:Arial,Helvetica,sans-serif;color:#1b1e24;">
    <div style="max-width:480px;margin:0 auto;padding:32px 24px;">
      <div style="font-size:22px;font-weight:800;color:#dc2626;margin-bottom:24px;">Manuvo</div>
      <h1 style="font-size:20px;margin:0 0 12px;">${opts.title}</h1>
      <p style="font-size:15px;line-height:1.5;margin:0 0 24px;">${opts.intro}</p>
      <a href="${opts.url}" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:10px;">${opts.button}</a>
      <p style="font-size:13px;color:#6b7280;margin:24px 0 0;">${opts.expires}</p>
      <p style="font-size:13px;color:#6b7280;margin:8px 0 0;">${opts.ignore}</p>
    </div>
  </body>
</html>`;
}
