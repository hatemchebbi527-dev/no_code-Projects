// Manuvo - nomi paese localizzati (le etichette di categorie/urgenza sono nei messaggi i18n).

export function countryName(code: string, locale: string): string {
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}
