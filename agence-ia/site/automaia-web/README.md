# AutomaIA — site (Next.js)

Site de l'agence AutomaIA. Next.js (App Router), 4 pages : Home, Servizi, Chi sono, Contatti.
Charte : bleu nuit `#0F2A4A` + teal `#16B8A6`, polices Montserrat + Inter.

## Lancer en local

```bash
npm install
npm run dev
```
Le site tourne sur http://localhost:3000

## Modifier les textes

Tout le contenu est centralisé dans `lib/content.js`. Édite ce fichier pour changer les textes, sans toucher au code des pages.

## Formulaire de contact (lead → n8n)

Le formulaire de la page Contatti envoie les données (nome, email, studio, messaggio) en POST vers ton webhook n8n.

1. Crée un fichier `.env.local` (copie de `.env.example`)
2. Renseigne `NEXT_PUBLIC_N8N_WEBHOOK_URL` avec l'URL de production de ton webhook n8n
3. Les données arrivent dans n8n sous `body` (ex : `{{ $json.body.nome }}`)

## Déployer sur Vercel

1. Pousse le code sur GitHub
2. Sur Vercel : "New Project" → importe le repo → racine du projet = ce dossier
3. Ajoute la variable d'environnement `NEXT_PUBLIC_N8N_WEBHOOK_URL`
4. Deploy

## Structure

```
app/
  layout.js          en-tête, pied de page, polices, métadonnées
  page.js            Home
  servizi/           page Servizi (3 offres)
  chi-sono/          page Chi sono + méthode
  contatti/          page Contatti + formulaire (client)
components/          Header, Footer
lib/content.js       tous les textes du site
public/logo.png      logo AutomaIA
```
