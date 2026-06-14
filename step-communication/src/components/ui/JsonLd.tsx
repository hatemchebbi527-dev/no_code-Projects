import { jsonLdScript } from "@/lib/jsonld";

/** Inietta uno o più schemi JSON-LD nella pagina. */
export function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
    />
  );
}
