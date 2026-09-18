// Manuvo - pagina profilo artigiano: modifica dati di contatto e mestieri.
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isCategory } from "@/lib/constants";
import { ProfileForm } from "./ProfileForm";

export const metadata = { title: "Manuvo" };

export default async function ProfiloPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const t = await getTranslations("profilo");
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      city: true,
      country: true,
      piva: true,
      categories: true,
    },
  });
  if (!user) redirect("/login");

  const categories = user.categories
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c.length > 0 && isCategory(c));

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-neutral-500">{t("subtitle")}</p>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <ProfileForm
          defaults={{
            name: user.name,
            email: user.email,
            phone: user.phone ?? "",
            city: user.city ?? "",
            country: user.country,
            piva: user.piva,
            categories,
          }}
        />
      </div>
    </div>
  );
}
