import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : CRM Salon - Réactivation Inactifs 60j
// Nodes   : 9  |  Connections: 8
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// ChaqueLundi14h00                   scheduleTrigger
// ClientsInactifs60j                 airtable                   [creds]
// OptInEmail                         if
// EmailReactivation                  gmail                      [creds]
// OptInSms                           if
// SmsReactivation                    twilio                     [creds]
// MarquerClientInactif               airtable                   [creds]
// LogRelanceEmail                    airtable                   [creds]
// LogRelanceSms                      airtable                   [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// ChaqueLundi14h00
//    → ClientsInactifs60j
//      → OptInEmail
//        → EmailReactivation
//          → MarquerClientInactif
//            → LogRelanceEmail
//       .out(1) → OptInSms
//          → SmsReactivation
//            → LogRelanceSms
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'CIjei8BvOci6ef3W',
    name: 'CRM Salon - Réactivation Inactifs 60j',
    active: false,
    isArchived: false,
    settings: { executionOrder: 'v1', callerPolicy: 'workflowsFromSameOwner', availableInMCP: false },
})
export class CrmSalonReactivationInactifs60jWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '667d209e-efa0-41e6-9615-8451b783ba59',
        name: 'Chaque Lundi 14h00',
        type: 'n8n-nodes-base.scheduleTrigger',
        version: 1.3,
        position: [0, 300],
    })
    ChaqueLundi14h00 = {
        rule: {
            interval: [
                {
                    field: 'weeks',
                    triggerAtDay: '1',
                    triggerAtHour: 14,
                    triggerAtMinute: 0,
                },
            ],
        },
    };

    @node({
        id: 'f4baa273-f2d4-4c5d-a0f0-efe9cb4f00c2',
        name: 'Clients Inactifs 60j',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [260, 300],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    ClientsInactifs60j = {
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
        filterByFormula: "AND({Statut}='Actif', {Jours depuis dernier RDV}>60)",
        returnAll: true,
    };

    @node({
        id: '3537d4b7-b6cc-4134-9381-0b9e45916bc9',
        name: 'Opt-in Email ?',
        type: 'n8n-nodes-base.if',
        version: 2,
        position: [520, 300],
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
        id: 'b49827df-506d-4049-8c88-1f5b55f97915',
        name: 'Email Réactivation',
        type: 'n8n-nodes-base.gmail',
        version: 2,
        position: [780, 160],
        credentials: { gmailOAuth2: 'Gmail' },
    })
    EmailReactivation = {
        resource: 'message',
        operation: 'send',
        sendTo: "={{ $json['Email'] }}",
        subject: 'On ne vous a pas vu depuis un moment...',
        emailType: 'text',
        message: `=Bonjour {{ $json['Nom complet'] }},

Cela fait un moment que nous n'avons pas eu le plaisir de vous accueillir au salon.

Nous espérons que vous allez bien et nous serions ravis de vous retrouver pour prendre soin de vous.

N'hésitez pas à nous contacter pour reprendre un rendez-vous.

À très bientôt,
L'équipe du salon`,
    };

    @node({
        id: 'a08cd6ba-9fb9-4daa-969b-db4d0b7234d6',
        name: 'Opt-in SMS ?',
        type: 'n8n-nodes-base.if',
        version: 2,
        position: [780, 440],
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
        id: 'e00d39b7-c378-4e07-bef8-781168d7de66',
        name: 'SMS Réactivation',
        type: 'n8n-nodes-base.twilio',
        version: 1,
        position: [1040, 440],
        credentials: { twilioApi: 'Twilio' },
    })
    SmsReactivation = {
        resource: 'sms',
        operation: 'send',
        from: '+393000000000',
        to: "={{ $json['Téléphone'] }}",
        message:
            "=Bonjour {{ $json['Nom complet'] }}, on ne vous a pas vu depuis longtemps ! Le salon vous attend. Appelez-nous pour reprendre RDV.",
    };

    @node({
        id: '8ce8c842-1e6c-42e7-a4c2-69f0c9c58f77',
        name: 'Marquer Client Inactif',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [1040, 160],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    MarquerClientInactif = {
        resource: 'record',
        operation: 'update',
        base: {
            mode: 'id',
            value: 'appRtxgD6iF6ieNGQ',
        },
        table: {
            mode: 'id',
            value: 'tblGmzCHu9cltFHYl',
        },
        id: '={{ $json.id }}',
        columns: {
            mappingMode: 'defineBelow',
            value: {
                Statut: 'Inactif',
            },
        },
    };

    @node({
        id: '3721a76c-ca3a-45f2-85fb-503888296d0c',
        name: 'Log Relance Email',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [1300, 160],
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
                'Ref Relance': "=INACTIF-EMAIL-{{ $('Clients Inactifs 60j').item.json.id }}-{{ $now.toISODate() }}",
                'Type de relance': 'Inactif 60j',
                Canal: 'Email',
                Statut: 'Envoyé',
                "Date d'envoi réelle": '={{ $now.toISODate() }}',
                Message:
                    "=Email réactivation inactif 60j envoyé à {{ $('Clients Inactifs 60j').item.json['Nom complet'] }}",
            },
        },
    };

    @node({
        id: '2350d14c-5243-4214-b315-a75098854ccc',
        name: 'Log Relance SMS',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [1300, 440],
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
                'Ref Relance': "=INACTIF-SMS-{{ $('Clients Inactifs 60j').item.json.id }}-{{ $now.toISODate() }}",
                'Type de relance': 'Inactif 60j',
                Canal: 'SMS',
                Statut: 'Envoyé',
                "Date d'envoi réelle": '={{ $now.toISODate() }}',
                Message:
                    "=SMS réactivation inactif 60j envoyé à {{ $('Clients Inactifs 60j').item.json['Nom complet'] }}",
            },
        },
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.ChaqueLundi14h00.out(0).to(this.ClientsInactifs60j.in(0));
        this.ClientsInactifs60j.out(0).to(this.OptInEmail.in(0));
        this.OptInEmail.out(0).to(this.EmailReactivation.in(0));
        this.OptInEmail.out(1).to(this.OptInSms.in(0));
        this.EmailReactivation.out(0).to(this.MarquerClientInactif.in(0));
        this.MarquerClientInactif.out(0).to(this.LogRelanceEmail.in(0));
        this.OptInSms.out(0).to(this.SmsReactivation.in(0));
        this.SmsReactivation.out(0).to(this.LogRelanceSms.in(0));
    }
}
