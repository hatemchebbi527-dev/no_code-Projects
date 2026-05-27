import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : CRM Salon - Rappel RDV J-1
// Nodes   : 11  |  Connections: 10
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// ChaqueJour10h00                    scheduleTrigger
// RdvDemainPlanifies                 airtable                   [creds]
// RecupererClient                    airtable                   [creds]
// OptInSms                           if
// EnvoyerSmsRappel                   twilio                     [creds]
// OptInEmail                         if
// EnvoyerEmailRappel                 gmail                      [creds]
// MarquerRappelEnvoyeSms             airtable                   [creds]
// LogRelanceSms                      airtable                   [creds]
// MarquerRappelEnvoyeEmail           airtable                   [creds]
// LogRelanceEmail                    airtable                   [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// ChaqueJour10h00
//    → RdvDemainPlanifies
//      → RecupererClient
//        → OptInSms
//          → EnvoyerSmsRappel
//            → MarquerRappelEnvoyeSms
//              → LogRelanceSms
//         .out(1) → OptInEmail
//            → EnvoyerEmailRappel
//              → MarquerRappelEnvoyeEmail
//                → LogRelanceEmail
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'fCGLZi6V8b2YFfiB',
    name: 'CRM Salon - Rappel RDV J-1',
    active: false,
    isArchived: false,
    settings: { executionOrder: 'v1', callerPolicy: 'workflowsFromSameOwner', availableInMCP: false },
})
export class CrmSalonRappelRdvJ1Workflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '42a90739-e9c3-4848-8e06-eee895aaec1a',
        name: 'Chaque Jour 10h00',
        type: 'n8n-nodes-base.scheduleTrigger',
        version: 1.3,
        position: [0, 300],
    })
    ChaqueJour10h00 = {
        rule: {
            interval: [
                {
                    field: 'days',
                    triggerAtHour: 10,
                    triggerAtMinute: 0,
                },
            ],
        },
    };

    @node({
        id: 'fb18b5c0-695a-4b55-a925-211a6ba0a941',
        name: 'RDV Demain Planifiés',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [260, 300],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    RdvDemainPlanifies = {
        resource: 'record',
        operation: 'search',
        base: {
            mode: 'id',
            value: 'appRtxgD6iF6ieNGQ',
        },
        table: {
            mode: 'id',
            value: 'tblCcvFAzh7P1k4N9',
        },
        filterByFormula:
            "AND({Statut}='Planifié', NOT({fldcGP9Dw5JxXv20d}), IS_SAME({Date et heure}, DATEADD(TODAY(), 1, 'days'), 'day'))",
        returnAll: true,
    };

    @node({
        id: 'f0e7ea0d-59ad-4b8f-91dc-cb8e02e37609',
        name: 'Récupérer Client',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [520, 300],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    RecupererClient = {
        resource: 'record',
        operation: 'get',
        base: {
            mode: 'id',
            value: 'appRtxgD6iF6ieNGQ',
        },
        table: {
            mode: 'id',
            value: 'tblGmzCHu9cltFHYl',
        },
        id: "={{ $json['Clients'][0] }}",
    };

    @node({
        id: '382ff541-c8ed-447a-8174-d393b3f684d9',
        name: 'Opt-in SMS ?',
        type: 'n8n-nodes-base.if',
        version: 2,
        position: [780, 300],
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
        id: '6638f90b-ab8b-47fe-8c8a-b3bd0c3201ae',
        name: 'Envoyer SMS Rappel',
        type: 'n8n-nodes-base.twilio',
        version: 1,
        position: [1040, 160],
        credentials: { twilioApi: 'Twilio' },
    })
    EnvoyerSmsRappel = {
        resource: 'sms',
        operation: 'send',
        from: '+393000000000',
        to: "={{ $json['Téléphone'] }}",
        message:
            "=Bonjour {{ $json['Nom complet'] }}, rappel de votre RDV demain à {{ $('RDV Demain Planifiés').item.json['Date et heure'].substring(11,16) }} chez le salon. À demain !",
    };

    @node({
        id: 'f455c750-fa5d-4c4f-a328-d5e495310fa2',
        name: 'Opt-in Email ?',
        type: 'n8n-nodes-base.if',
        version: 2,
        position: [1040, 440],
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
        id: '4ec79b07-3c2d-4d57-a792-e0e2b9702768',
        name: 'Envoyer Email Rappel',
        type: 'n8n-nodes-base.gmail',
        version: 2,
        position: [1300, 440],
        credentials: { gmailOAuth2: 'Gmail' },
    })
    EnvoyerEmailRappel = {
        resource: 'message',
        operation: 'send',
        sendTo: "={{ $json['Email'] }}",
        subject: 'Rappel de votre rendez-vous demain',
        emailType: 'text',
        message: `=Bonjour {{ $json['Nom complet'] }},

Rappel de votre rendez-vous prévu demain à {{ $('RDV Demain Planifiés').item.json['Date et heure'].substring(11,16) }} au salon.

À demain !
L'équipe du salon`,
    };

    @node({
        id: '74be621e-510c-4113-88c5-fa99be8f1959',
        name: 'Marquer Rappel Envoyé SMS',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [1300, 160],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    MarquerRappelEnvoyeSms = {
        resource: 'record',
        operation: 'update',
        base: {
            mode: 'id',
            value: 'appRtxgD6iF6ieNGQ',
        },
        table: {
            mode: 'id',
            value: 'tblCcvFAzh7P1k4N9',
        },
        id: "={{ $('RDV Demain Planifiés').item.json.id }}",
        columns: {
            mappingMode: 'defineBelow',
            value: {
                'Rappel J-1 envoyé': true,
            },
        },
    };

    @node({
        id: 'b7a223cb-5921-474d-bd64-5a9f8412f5c4',
        name: 'Log Relance SMS',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [1560, 160],
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
                'Ref Relance': "=RAPPEL-SMS-{{ $('RDV Demain Planifiés').item.json.id }}",
                'Type de relance': 'Rappel J-1',
                Canal: 'SMS',
                Statut: 'Envoyé',
                "Date d'envoi réelle": '={{ $now.toISODate() }}',
                Message: "=SMS rappel envoyé à {{ $('Récupérer Client').item.json['Nom complet'] }}",
            },
        },
    };

    @node({
        id: '12ac4b01-f551-4a24-8beb-9fbee30a4b03',
        name: 'Marquer Rappel Envoyé Email',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [1560, 440],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    MarquerRappelEnvoyeEmail = {
        resource: 'record',
        operation: 'update',
        base: {
            mode: 'id',
            value: 'appRtxgD6iF6ieNGQ',
        },
        table: {
            mode: 'id',
            value: 'tblCcvFAzh7P1k4N9',
        },
        id: "={{ $('RDV Demain Planifiés').item.json.id }}",
        columns: {
            mappingMode: 'defineBelow',
            value: {
                'Rappel J-1 envoyé': true,
            },
        },
    };

    @node({
        id: '4f933043-7374-4693-a863-f1c0717bf5ad',
        name: 'Log Relance Email',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [1820, 440],
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
                'Ref Relance': "=RAPPEL-EMAIL-{{ $('RDV Demain Planifiés').item.json.id }}",
                'Type de relance': 'Rappel J-1',
                Canal: 'Email',
                Statut: 'Envoyé',
                "Date d'envoi réelle": '={{ $now.toISODate() }}',
                Message: "=Email rappel envoyé à {{ $('Récupérer Client').item.json['Nom complet'] }}",
            },
        },
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.ChaqueJour10h00.out(0).to(this.RdvDemainPlanifies.in(0));
        this.RdvDemainPlanifies.out(0).to(this.RecupererClient.in(0));
        this.RecupererClient.out(0).to(this.OptInSms.in(0));
        this.OptInSms.out(0).to(this.EnvoyerSmsRappel.in(0));
        this.OptInSms.out(1).to(this.OptInEmail.in(0));
        this.EnvoyerSmsRappel.out(0).to(this.MarquerRappelEnvoyeSms.in(0));
        this.MarquerRappelEnvoyeSms.out(0).to(this.LogRelanceSms.in(0));
        this.OptInEmail.out(0).to(this.EnvoyerEmailRappel.in(0));
        this.EnvoyerEmailRappel.out(0).to(this.MarquerRappelEnvoyeEmail.in(0));
        this.MarquerRappelEnvoyeEmail.out(0).to(this.LogRelanceEmail.in(0));
    }
}
