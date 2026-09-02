// Manuvo - configurazione i18n (senza routing URL: locale da cookie NEXT_LOCALE).
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/constants";

export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieLocale = store.get("NEXT_LOCALE")?.value ?? "";
  const locale = (LOCALES as readonly string[]).includes(cookieLocale)
    ? cookieLocale
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
