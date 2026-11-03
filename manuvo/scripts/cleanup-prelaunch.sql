-- Manuvo — Étape 16 : nettoyage de la base avant lancement
-- À exécuter dans l'éditeur SQL de Neon, branche de PRODUCTION.
--
-- CONSERVÉ : liste d'attente (Waitlist), packs de crédits (CreditPack),
--            comptes utilisateurs (à trier à la main, voir étape 3).
-- SUPPRIMÉ : toute l'activité de démonstration — demandes, déblocages,
--            transactions de crédits, avis, notifications, messages,
--            abonnements push, brouillons, codes de vérification,
--            jetons de réinitialisation.
--
-- Avant de lancer l'étape 2 : créer une branche de sauvegarde dans Neon
-- (Branches → Create branch, depuis main). Elle permet de tout restaurer.


-- ── ÉTAPE 1 · APERÇU (lecture seule) ────────────────────────────────
SELECT 'Lead' AS table_name, COUNT(*) FROM "Lead"
UNION ALL SELECT 'Unlock', COUNT(*) FROM "Unlock"
UNION ALL SELECT 'CreditTransaction', COUNT(*) FROM "CreditTransaction"
UNION ALL SELECT 'Review', COUNT(*) FROM "Review"
UNION ALL SELECT 'Notification', COUNT(*) FROM "Notification"
UNION ALL SELECT 'Message', COUNT(*) FROM "Message"
UNION ALL SELECT 'PushSubscription', COUNT(*) FROM "PushSubscription"
UNION ALL SELECT 'LeadDraft', COUNT(*) FROM "LeadDraft"
UNION ALL SELECT 'PhoneVerification', COUNT(*) FROM "PhoneVerification"
UNION ALL SELECT 'PasswordResetToken', COUNT(*) FROM "PasswordResetToken"
UNION ALL SELECT 'User', COUNT(*) FROM "User"
UNION ALL SELECT 'Waitlist (conservé)', COUNT(*) FROM "Waitlist"
UNION ALL SELECT 'CreditPack (conservé)', COUNT(*) FROM "CreditPack";


-- ── ÉTAPE 2 · SUPPRESSION DE L'ACTIVITÉ DE DÉMO ─────────────────────
BEGIN;

DELETE FROM "Unlock";
DELETE FROM "CreditTransaction";
DELETE FROM "Review";
DELETE FROM "Notification";
DELETE FROM "Message";
DELETE FROM "Lead";
DELETE FROM "LeadDraft";
DELETE FROM "PushSubscription";
DELETE FROM "PhoneVerification";
DELETE FROM "PasswordResetToken";

-- Les crédits de test accumulés sur les comptes repartent à zéro.
UPDATE "User" SET credits = 0 WHERE role <> 'ADMIN';

COMMIT;


-- ── ÉTAPE 3 · COMPTES À TRIER À LA MAIN ─────────────────────────────
-- Les comptes ne sont pas supprimés automatiquement : un vrai artisan
-- inscrit pendant la chauffe serait perdu. Repérer les comptes de test
-- (artigiano@manuvo.app, e-mails perso de test, « Cliente Test »…)
SELECT id, email, role, name, "createdAt"
FROM "User"
ORDER BY "createdAt";

-- puis les supprimer un par un (leurs données liées partent en cascade) :
-- DELETE FROM "User" WHERE email IN ('artigiano@manuvo.app', '...');


-- ── ÉTAPE 4 · VÉRIFICATION ──────────────────────────────────────────
-- Relancer l'aperçu de l'étape 1 : toutes les tables d'activité à 0,
-- Waitlist et CreditPack inchangés.
