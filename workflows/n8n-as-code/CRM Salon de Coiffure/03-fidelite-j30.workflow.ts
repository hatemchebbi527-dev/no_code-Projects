import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : CRM Salon - Fidélité J+30
// Nodes   : 8  |  Connections: 7
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// ChaqueJour11h00                    scheduleTrigger
// ClientsJ30                         airtable                   [creds]
// OptInSms                           if
// EnvoyerSmsFidelite                 twilio                     [creds]
// OptInEmail                         if
// EnvoyerEmailFidelite               gmail                      [creds]
// LogRelanceSms                      airtable                   [creds]
// LogRelanceEmail                    airtable                   [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// ChaqueJour11h00
//    → ClientsJ30
//      → OptInSms
//        → EnvoyerSmsFidelite
//          → LogRelanceSms
//       .out(1) → OptInEmail
//          → EnvoyerEmailFidelite
//            → LogRelanceEmail
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'TftMKsaFagbJWB5M',
    name: 'CRM Salon - Fidélité J+30',
    active: false,
    isArchived: false,
    settings: { executionOrder: 'v1', callerPolicy: 'workflowsFromSameOwner', availableInMCP: false },
})
export class CrmSalonFideliteJ30Workflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '42b58f14-bafe-4fcf-846f-0e7118545827',
        name: 'Chaque Jour 11h00',
        type: 'n8n-nodes-base.scheduleTrigger',
        version: 1.3,
        position: [0, 300],
    })
    ChaqueJour11h00 = {
        rule: {
            interval: [
                {
                    field: 'days',
                    triggerAtHour: 11,
                    triggerAtMinute: 0,
                },
            ],
        },
    };

    @node({
        id: '52708dfb-10ea-4117-b3ef-91c5063421aa',
        name: 'Clients J+30',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [260, 300],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    ClientsJ30 = {
        resource: 'record',
        operation: 'search',
        base: {
            mode: 'id',
            value: 'appRtxgD6iF6ieNGQ',
        },
        table: {
            mode: 'id',
            value: 'tblGmzCHu9cltFHYl',
        },
        filterByFormula: "AND(OR({Statut}='Actif',{Statut}='VIP'), {Jours depuis dernier RDV}=30)",
        returnAll: true,
    };

    @node({
        id: '4e629967-c755-41fb-89e8-af0d7ed8a777',
        name: 'Opt-in SMS ?',
        type: 'n8n-nodes-base.if',
        version: 2,
        position: [520, 300],
    })
    OptInSms = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
                version: 1,
            },
            conditions: [
                {
                    leftValue: "={{ $json['Opt-in SMS'] }}",
                    operator: {
                        type: 'boolean',
                        operation: 'true',
                    },
                },
            ],
            combinator: 'and',
        },
    };

    @node({
        id: 'e86be242-9bb9-4991-93b4-052fa384a4bc',
        name: 'Envoyer SMS Fidélité',
        type: 'n8n-nodes-base.twilio',
        version: 1,
        position: [780, 160],
        credentials: { twilioApi: 'Twilio' },
    })
    EnvoyerSmsFidelite = {
        resource: 'sms',
        operation: 'send',
        from: '+393000000000',
        to: "={{ $json['Téléphone'] }}",
        message:
            "=Bonjour {{ $json['Nom complet'] }}, ça fait un mois ! On serait ravis de vous revoir au salon. Prenez RDV facilement en nous appelant. À bientôt !",
    };

    @node({
        id: 'c858e2ec-87d3-410b-bf27-15cb3ec96fa5',
        name: 'Opt-in Email ?',
        type: 'n8n-nodes-base.if',
        version: 2,
        position: [780, 440],
    })
    OptInEmail = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
                version: 1,
            },
            conditions: [
                {
                    leftValue: "={{ $json['Opt-in Email'] }}",
                    operator: {
                        type: 'boolean',
                        operation: 'true',
                    },
                },
            ],
            combinator: 'and',
        },
    };

    @node({
        id: '6285e13a-4e55-4436-b1a1-6331993f604b',
        name: 'Envoyer Email Fidélité',
        type: 'n8n-nodes-base.gmail',
        version: 2,
        position: [1040, 440],
        credentials: { gmailOAuth2: 'Gmail' },
    })
    EnvoyerEmailFidelite = {
        resource: 'message',
        operation: 'send',
        sendTo: "={{ $json['Email'] }}",
        subject: 'Cela fait un mois, on pense à vous !',
        emailType: 'text',
        message: `=Bonjour {{ $json['Nom complet'] }},

Cela fait un mois depuis votre dernière visite au salon et nous espérons que vous allez bien !

Votre prochain rendez-vous vous attend. N'hésitez pas à nous appeler pour réserver votre créneau.

À très bientôt,
L'équipe du salon`,
    };

    @node({
        id: 'f34eda99-cabf-4558-a2e1-bbf3ee8f538b',
        name: 'Log Relance SMS',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [1040, 160],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    LogRelanceSms = {
        resource: 'record',
        operation: 'create',
        base: {
            mode: 'id',
            value: 'appRtxgD6iF6ieNGQ',
        },
        table: {
            mode: 'id',
            value: 'tbla5qvlWpQc3M1sw',
        },
        columns: {
            mappingMode: 'defineBelow',
            value: {
                'Ref Relance': '=FIDELITE-SMS-{{ $json.id }}-{{ $now.toISODate() }}',
                'Type de relance': 'Fidélité J+30',
                Canal: 'SMS',
                Statut: 'Envoyé',
                "Date d'envoi réelle": '={{ $now.toISODate() }}',
                Message: "=SMS fidélité J+30 envoyé à {{ $json['Nom complet'] }}",
            },
        },
    };

    @node({
        id: 'eb70b675-0554-4600-9cf3-d36a5d9b1081',
        name: 'Log Relance Email',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [1300, 440],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    LogRelanceEmail = {
        resource: 'record',
        operation: 'create',
        base: {
            mode: 'id',
            value: 'appRtxgD6iF6ieNGQ',
        },
        table: {
            mode: 'id',
            value: 'tbla5qvlWpQc3M1sw',
        },
        columns: {
            mappingMode: 'defineBelow',
            value: {
                'Ref Relance': '=FIDELITE-EMAIL-{{ $json.id }}-{{ $now.toISODate() }}',
                'Type de relance': 'Fidélité J+30',
                Canal: 'Email',
                Statut: 'Envoyé',
                "Date d'envoi réelle": '={{ $now.toISODate() }}',
                Message: "=Email fidélité J+30 envoyé à {{ $json['Nom complet'] }}",
            },
        },
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.ChaqueJour11h00.out(0).to(this.ClientsJ30.in(0));
        this.ClientsJ30.out(0).to(this.OptInSms.in(0));
        this.OptInSms.out(0).to(this.EnvoyerSmsFidelite.in(0));
        this.OptInSms.out(1).to(this.OptInEmail.in(0));
        this.EnvoyerSmsFidelite.out(0).to(this.LogRelanceSms.in(0));
        this.OptInEmail.out(0).to(this.EnvoyerEmailFidelite.in(0));
        this.EnvoyerEmailFidelite.out(0).to(this.LogRelanceEmail.in(0));
    }
}
