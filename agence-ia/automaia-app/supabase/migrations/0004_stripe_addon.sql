-- AutomaIA — add-on Presenza Online (site vitrine + publication social).
-- Ne fait pas partie de l'enum studio_plan (qui reste trial/studio_automatizzato/
-- studio_360) : c'est un abonnement Stripe indépendant, activable en plus de
-- n'importe quel plan.

alter table studios add column addon_presenza_online boolean not null default false;
