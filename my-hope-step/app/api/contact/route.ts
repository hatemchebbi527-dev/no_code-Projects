import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const RECIPIENT = "contact@myhope-step.com"

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 })
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { type, name, email, phone, from, to, departDate, returnDate, passengers, notes, subject } = body

  if (!name || !email || !type) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const resend = new Resend(apiKey)

  const formattedSubject = subject ?? `Demande ${type} – ${name}`

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #0891b2; margin-bottom: 4px;">${formattedSubject}</h2>
      <p style="color: #6b7280; font-size: 14px; margin-bottom: 24px;">Reçu via le formulaire My Hope Step</p>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${row("Type de demande", type)}
        ${row("Nom", name)}
        ${row("Email", email)}
        ${phone ? row("Téléphone / WhatsApp", phone) : ""}
        ${from ? row("Départ", from) : ""}
        ${to ? row("Destination", to) : ""}
        ${departDate ? row("Date de départ", departDate) : ""}
        ${returnDate ? row("Date de retour", returnDate) : ""}
        ${passengers ? row("Nombre de passagers", passengers) : ""}
        ${notes ? row("Informations complémentaires", notes) : ""}
      </table>

      <p style="color: #9ca3af; font-size: 12px; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
        My Hope Step – formulaire de demande
      </p>
    </div>
  `

  try {
    await resend.emails.send({
      from: "My Hope Step <noreply@myhope-step.com>",
      to: RECIPIENT,
      replyTo: email,
      subject: formattedSubject,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Resend error:", err)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 8px 12px 8px 0; color: #6b7280; width: 40%; vertical-align: top; border-bottom: 1px solid #f3f4f6;">
        ${label}
      </td>
      <td style="padding: 8px 0; color: #111827; border-bottom: 1px solid #f3f4f6;">
        ${value}
      </td>
    </tr>
  `
}
