import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : Salon Éclat - Nouvelle Réservation Web
// Nodes   : 8  |  Connections: 8
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// NouvelleReservationWebhook         webhook
// FormatData                         code
// ChercherClient                     airtable                   [creds]
// ClientExiste                       if
// CreerClient                        airtable                   [creds]
// CreerRdv                           airtable                   [creds]
// EnvoyerSmsConfirmation             twilio                     [creds]
// RepondreWebhook                    respondToWebhook
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// NouvelleReservationWebhook
//    → FormatData
//      → ChercherClient
//        → ClientExiste
//          → CreerRdv (client trouvé)
//         .out(1) → CreerClient
//            → CreerRdv
//              → EnvoyerSmsConfirmation
//                → RepondreWebhook
// </workflow-map>

// =====================================================================
// PAYLOAD ATTENDU (envoyé par l'app Next.js)
// {
//   "service": "Coupe & Brushing Femme",
//   "date": "2026-05-30",
//   "time": "10:00",
//   "name": "Marie Dupont",
//   "phone": "+33612345678",
//   "price": "45€"
// }
// =====================================================================

@workflow({
    id: 'salon-nouvelle-reservation-web',
    name: 'Salon Éclat - Nouvelle Réservation Web',
    active: true,
    isArchived: false,
    settings: { executionOrder: 'v1', callerPolicy: 'workflowsFromSameOwner', availableInMCP: false },
})
export class SalonNouvelleReservationWebWorkflow {

    @node({
        id: 'a1b2c3d4-0001-0000-0000-000000000001',
        webhookId: 'nouvelle-reservation',
        name: 'Nouvelle Réservation Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 1,
        position: [0, 300],
    })
    NouvelleReservationWebhook = {
        httpMethod: 'POST',
        path: 'nouvelle-reservation',
        responseMode: 'responseNode',
        options: {},
    };

    @node({
        id: 'a1b2c3d4-0001-0000-0000-000000000002',
        name: 'Format Data',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [220, 300],
    })
    FormatData = {
        jsCode: `const body = $input.first().json.body || $input.first().json;

const service = body.service || '';
const date    = body.date    || '';
const time    = body.time    || '';
const name    = body.name    || '';
const phone   = body.phone   || '';
const price   = body.price   || '';

// Construit le datetime sans suffixe UTC pour respecter le fuseau local (Italie)
const datetime = date && time ? date + 'T' + time + ':00.000+02:00' : '';

return [{ json: { service, date, time, datetime, name, phone, price } }];`,
    };

    @node({
        id: 'a1b2c3d4-0001-0000-0000-000000000003',
        name: 'Chercher Client',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [440, 300],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
        alwaysOutputData: true,
    })
    ChercherClient = {
        resource: 'record',
        operation: 'search',
        base: { mode: 'id', value: 'appRtxgD6iF6ieNGQ' },
        table: { mode: 'id', value: 'tblGmzCHu9cltFHYl' },
        filterByFormula: "={Téléphone}='{{ $json.phone }}'",
        returnAll: false,
        limit: 1,
    };

    @node({
        id: 'a1b2c3d4-0001-0000-0000-000000000004',
        name: 'Client Existe ?',
        type: 'n8n-nodes-base.if',
        version: 2,
        position: [660, 300],
    })
    ClientExiste = {
        conditions: {
            options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 1 },
            conditions: [
                {
                    leftValue: '={{ $json.id }}',
                    operator: { type: 'string', operation: 'notEmpty', singleValue: true },
                },
            ],
            combinator: 'and',
        },
    };

    @node({
        id: 'a1b2c3d4-0001-0000-0000-000000000005',
        name: 'Créer Client',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [880, 440],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    CreerClient = {
        resource: 'record',
        operation: 'create',
        base: { mode: 'id', value: 'appRtxgD6iF6ieNGQ' },
        table: { mode: 'id', value: 'tblGmzCHu9cltFHYl' },
        columns: {
            mappingMode: 'defineBelow',
            value: {
                'Nom complet': "={{ $('Format Data').item.json.name }}",
                'Téléphone':   "={{ $('Format Data').item.json.phone }}",
                'Opt-in SMS':  true,
            },
        },
    };

    @node({
        id: 'a1b2c3d4-0001-0000-0000-000000000006',
        name: 'Créer RDV',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [1100, 300],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    CreerRdv = {
        resource: 'record',
        operation: 'create',
        base: { mode: 'id', value: 'appRtxgD6iF6ieNGQ' },
        table: { mode: 'id', value: 'tblCcvFAzh7P1k4N9' },
        columns: {
            mappingMode: 'defineBelow',
            value: {
                'Prestation':   "={{ $('Format Data').item.json.service }}",
                'Date et heure': "={{ $('Format Data').item.json.datetime }}",
                'Statut':       'Planifié',
                'Clients':      "={{ [$json.id] }}",
                'Prix':         "={{ $('Format Data').item.json.price }}",
            },
        },
    };

    @node({
        id: 'a1b2c3d4-0001-0000-0000-000000000007',
        name: 'Envoyer SMS Confirmation',
        type: 'n8n-nodes-base.twilio',
        version: 1,
        position: [1320, 300],
        credentials: { twilioApi: 'Twilio' },
    })
    EnvoyerSmsConfirmation = {
        resource: 'sms',
        operation: 'send',
        from: '+393000000000',
        to:   "={{ $('Format Data').item.json.phone }}",
        message: "=Bonjour {{ $('Format Data').item.json.name }}, votre RDV au Salon Éclat est confirmé : {{ $('Format Data').item.json.service }} le {{ $('Format Data').item.json.date }} à {{ $('Format Data').item.json.time }}. À bientôt !",
    };

    @node({
        id: 'a1b2c3d4-0001-0000-0000-000000000008',
        name: 'Répondre Webhook',
        type: 'n8n-nodes-base.respondToWebhook',
        version: 1,
        position: [1540, 300],
    })
    RepondreWebhook = {
        respondWith: 'json',
        responseBody: '={ "status": "ok", "message": "Réservation enregistrée" }',
        options: {},
    };

    @links()
    defineRouting() {
        this.NouvelleReservationWebhook.out(0).to(this.FormatData.in(0));
        this.FormatData.out(0).to(this.ChercherClient.in(0));
        this.ChercherClient.out(0).to(this.ClientExiste.in(0));
        this.ClientExiste.out(0).to(this.CreerRdv.in(0));       // client trouvé
        this.ClientExiste.out(1).to(this.CreerClient.in(0));    // client inconnu
        this.CreerClient.out(0).to(this.CreerRdv.in(0));
        this.CreerRdv.out(0).to(this.EnvoyerSmsConfirmation.in(0));
        this.EnvoyerSmsConfirmation.out(0).to(this.RepondreWebhook.in(0));
    }
}
