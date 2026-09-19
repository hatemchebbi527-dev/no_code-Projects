// Manuvo - pagina pubblica di recensione (aperta dal cliente via link SMS).
import { getTranslations } from "next-intl/server";
import { LogoWordmark } from "@/components/LogoWordmark";
import { getReviewByToken } from "@/lib/reviews";
import { ReviewForm } from "./ReviewForm";

export const metadata = { title: "Manuvo" };

export default async function RecensionePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const t = await getTranslations("recensione");
  const review = await getReviewByToken(token);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF8F4] px-4 py-10">
      <div className="mb-8 flex items-center">
        <LogoWordmark className="h-9 w-auto" />
      </div>
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
        {!review ? (
          <p className="text-center text-sm text-neutral-500">{t("invalid")}</p>
        ) : review.submittedAt ? (
          <div className="text-center">
            <h2 className="text-lg font-bold text-neutral-800">{t("already_title")}</h2>
            <p className="mt-2 text-sm text-neutral-500">{t("already_text")}</p>
          </div>
        ) : (
          <ReviewForm token={token} artisanName={review.artisan.name} />
        )}
      </div>
    </div>
  );
}
