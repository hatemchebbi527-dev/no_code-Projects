"use client";
// Manuvo - bottone di esportazione CSV dell'elenco artigiani (per il marketing dell'admin).
import { formatMatricule } from "@/lib/constants";

type Row = {
  matricule: number;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  country: string;
  credits: number;
  createdAt: string;
};

function csvCell(value: string): string {
  // Echappe les guillemets et entoure de guillemets pour gerer virgules et sauts de ligne.
  return `"${value.replace(/"/g, '""')}"`;
}

export function ExportButton({ rows, label }: { rows: Row[]; label: string }) {
  function handleExport() {
    const header = [
      "matricule",
      "nom",
      "email",
      "telephone",
      "ville",
      "pays",
      "credits",
      "inscription",
    ];
    const lines = rows.map((r) =>
      [
        formatMatricule(r.matricule),
        r.name,
        r.email,
        r.phone ?? "",
        r.city ?? "",
        r.country,
        String(r.credits),
        new Date(r.createdAt).toISOString().slice(0, 10),
      ]
        .map(csvCell)
        .join(",")
    );
    // BOM pour qu'Excel ouvre l'UTF-8 correctement.
    const csv = "﻿" + [header.map(csvCell).join(","), ...lines].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `manuvo-artigiani-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      disabled={rows.length === 0}
      className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
}
