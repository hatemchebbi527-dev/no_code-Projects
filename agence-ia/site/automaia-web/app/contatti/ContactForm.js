"use client";

import { useState } from "react";
import { contatti } from "@/lib/content";
import styles from "./contatti.module.css";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";

export default function ContactForm() {
  const [form, setForm] = useState({ nome: "", email: "", studio: "", messaggio: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      if (!WEBHOOK_URL) throw new Error("Webhook non configurato");
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Errore di rete");
      setStatus("ok");
      setForm({ nome: "", email: "", studio: "", messaggio: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return <div className={styles.success}>{contatti.successo}</div>;
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label>
        Nome e cognome
        <input name="nome" value={form.nome} onChange={update} required />
      </label>
      <label>
        Email
        <input type="email" name="email" value={form.email} onChange={update} required />
      </label>
      <label>
        Nome dello studio
        <input name="studio" value={form.studio} onChange={update} />
      </label>
      <label>
        Messaggio
        <textarea name="messaggio" rows={4} value={form.messaggio} onChange={update} required />
      </label>

      <button type="submit" className="btn" disabled={status === "sending"}>
        {status === "sending" ? "Invio in corso..." : "Prenoti il Suo audit gratuito"}
      </button>

      {status === "error" && <p className={styles.error}>{contatti.errore}</p>}
    </form>
  );
}
