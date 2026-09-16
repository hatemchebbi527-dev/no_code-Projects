"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./contatti.module.css";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const tc = useTranslations("contatti");
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
    return <div className={styles.success}>{tc("successo")}</div>;
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label>
        {t("nome")}
        <input name="nome" value={form.nome} onChange={update} required />
      </label>
      <label>
        {t("email")}
        <input type="email" name="email" value={form.email} onChange={update} required />
      </label>
      <label>
        {t("studio")}
        <input name="studio" value={form.studio} onChange={update} />
      </label>
      <label>
        {t("messaggio")}
        <textarea name="messaggio" rows={4} value={form.messaggio} onChange={update} required />
      </label>

      <button type="submit" className="btn" disabled={status === "sending"}>
        {status === "sending" ? t("invioInCorso") : t("invia")}
      </button>

      {status === "error" && <p className={styles.error}>{tc("errore")}</p>}
    </form>
  );
}
