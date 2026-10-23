# Activer les SMS de vérification (Twilio)

La vérification du téléphone du particulier sur `/pubblica` (anti-faux-leads) envoie un code par SMS.

Tant que Twilio n'est **pas** configuré, le flux tourne en **mode dev** : le code s'affiche à l'écran et dans les logs, aucun SMS réel n'est envoyé, et la protection **ne bloque donc pas encore les faux**. Une fois Twilio branché, de vrais SMS partent et la publication est réellement protégée.

> ⚠️ **Contrainte italienne découverte le 12 octobre 2026.** L'Italie impose la **pré-inscription du Sender ID alphanumérique** (code de conduite ALIAS, délibération AGCOM 42/13/CIR), avec des **données d'entreprise** à fournir. Autrement dit : **pas de Sender ID « Manuvo » sans la P.IVA**, et Twilio ne publie aucun délai de traitement pour cette vérification.
>
> Conséquence sur le planning de lancement : Twilio dépend de la P.IVA, exactement comme Stripe Live. Voir `../ROADMAP.md` section 5.
>
> **Chemin recommandé désormais : Twilio Verify** (section 2 bis ci-dessous), que Twilio recommande pour les OTP parce qu'il prend en charge automatiquement les enregistrements requis par pays. Un Sender ID non enregistré dégrade la délivrabilité et peut faire rejeter les messages (erreur Twilio 30018).

Le code lit trois variables d'environnement (voir `src/lib/sms.ts`) :

| Variable | Rôle |
| --- | --- |
| `TWILIO_ACCOUNT_SID` | Identifiant du compte (commence par `AC...`) |
| `TWILIO_AUTH_TOKEN` | Jeton d'authentification |
| `TWILIO_FROM` | Expéditeur : `Manuvo` (Sender ID alphanumérique) ou un numéro `+39...` |

## 1. Créer le compte Twilio

1. S'inscrire sur [twilio.com](https://www.twilio.com/). Vérifier email + numéro personnel.
2. Cas d'usage : « Verify users / OTP » ou « SMS ».

## 2. Choisir un expéditeur

**Option 1 : Sender ID alphanumérique « Manuvo »** — *demande la P.IVA, délai inconnu*
- Gratuit, aucun numéro à acheter. Le SMS s'affiche comme venant de **Manuvo**.
- **Pré-inscription obligatoire pour l'Italie**, avec documents d'entreprise. À soumettre dès que la P.IVA est active.
- Console Twilio : *Messaging → Sender IDs → Alphanumeric Sender IDs → Add* → `Manuvo`.
- Le client ne peut pas répondre au SMS (sans importance pour un code).
- `TWILIO_FROM` = `Manuvo`.

**Option alternative : acheter un numéro italien**
- *Phone Numbers → Buy a number* → Italie, capacité **SMS** (~1 €/mois).
- `TWILIO_FROM` = le numéro au format `+39...`.

## 2 bis. Option recommandée : Twilio Verify (évite le Sender ID)

Twilio Verify est un service dédié aux codes à usage unique. Il gère lui-même les
enregistrements réglementaires par pays, donc **il supprime la dépendance au Sender ID
italien** et à son délai de vérification.

Coût : facturé à la vérification réussie plutôt qu'au SMS. À comparer aux ~0,07 €/SMS de
l'envoi direct avant de basculer.

Ce que ça change dans le code : `src/lib/sms.ts` envoie aujourd'hui via l'API Messages avec
`TWILIO_FROM`. Avec Verify, on crée un *Verify Service* et on remplace l'envoi et la
validation du code par les endpoints Verify, en gardant les garde-fous existants de
`src/lib/phone-verification.ts` (5 codes/heure, cooldown 60 s, validité 10 min, 5 essais).

À vérifier avant de coder : si Verify exige lui aussi un compte entreprise vérifié pour
l'Italie, on retombe sur la dépendance P.IVA, et c'est la règle de communication de la
Porte 2 du roadmap qui s'applique (lancement sans l'argument SMS).

## 3. Récupérer les identifiants

Sur le tableau de bord Twilio :
- **Account SID** (`AC...`)
- **Auth Token** (cliquer pour révéler)

## 4. Configurer Vercel

Projet Vercel **`no-code-projects-y1yy`** (rootDirectory `manuvo`) → *Settings → Environment Variables*. Ajouter pour **Production** (et Preview si besoin de tester avant) :

```
TWILIO_ACCOUNT_SID = AC...
TWILIO_AUTH_TOKEN  = ...
TWILIO_FROM        = Manuvo   # ou +39...
```

Puis **redéployer** (*Deployments → Redeploy*) pour prendre en compte les variables.

## 5. Sortir du mode « trial »

Un compte d'essai Twilio :
- n'envoie qu'aux numéros **vérifiés** dans la console ;
- **préfixe** les messages par « Sent from your Twilio trial account ».

Pour la vraie production : **Upgrade** le compte (ajouter du crédit, ~20 €).

## 6. Tester

1. Ouvrir `https://manuvo.automa-ia.net/pubblica`.
2. Saisir un numéro → **Vérifier** → recevoir le SMS avec le code.
3. Saisir le code → **Vérifié** → la publication est débloquée.

## Coûts et garde-fous

- Environ **0,07 €/SMS** vers l'Italie (≈ 35 €/mois pour 500 demandes).
- Garde-fous intégrés (`src/lib/phone-verification.ts`) : max **5 codes/heure** par numéro, **cooldown 60 s** entre deux envois, code valable **10 min**, **5 essais** max, fenêtre de validité de la vérif **30 min**.
