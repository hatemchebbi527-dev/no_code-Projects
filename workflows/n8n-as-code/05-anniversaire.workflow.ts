import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : CRM Salon - Relance Anniversaire
// Nodes   : 8  |  Connections: 7
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// ChaqueJour09h00                    scheduleTrigger
// ClientsAnniversaireAujourdHui      airtable                   [creds]
// OptInEmail                         if
// EmailAnniversaire                  gmail                      [creds]
// OptInSms                           if
// SmsAnniversaire                    twilio                     [creds]
// LogRelanceEmail                    airtable                   [creds]
// LogRelanceSms                      airtable                   [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// ChaqueJour09h00
//    → ClientsAnniversaireAujourdHui
//      → OptInEmail
//        → EmailAnniversaire
//          → LogRelanceEmail
//       .out(1) → OptInSms
//          → SmsAnniversaire
//            → LogRelanceSms
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'TsBqYPYSgz53hr2v',
    name: 'CRM Salon - Relance Anniversaire',
    active: false,
    isArchived: false,
    settings: { executionOrder: 'v1', callerPolicy: 'workflowsFromSameOwner', availableInMCP: false },
})
export class CrmSalonRelanceAnniversaireWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '972f817d-2dba-4c67-9068-e46a3a8b47a9',
        name: 'Chaque Jour 09h00',
        type: 'n8n-nodes-base.scheduleTrigger',
        version: 1.3,
        position: [0, 300],
    })
    ChaqueJour09h00 = {
        rule: {
            interval: [
                {
                    field: 'days',
                    triggerAtHour: 9,
                    triggerAtMinute: 0,
                },
            ],
        },
    };

    @node({
        id: 'df884dae-60a7-4632-a3ad-31e584abd16b',
        name: "Clients Anniversaire Aujourd'hui",
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [260, 300],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    ClientsAnniversaireAujourdHui = {
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
        filterByFormula:
            "AND(OR({Statut}='Actif',{Statut}='VIP'), MONTH({Date de naissance})=MONTH(TODAY()), DAY({Date de naissance})=DAY(TODAY()))",
        returnAll: true,
    };

    @node({
        id: '4ee33bd5-d659-49b6-9dfa-20c08792531c',
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
        id: 'f0ac6162-456c-4f0e-a908-97805b028c5c',
        name: 'Email Anniversaire',
        type: 'n8n-nodes-base.gmail',
        version: 2,
        position: [780, 160],
        credentials: { gmailOAuth2: 'Gmail' },
    })
    EmailAnniversaire = {
        resource: 'message',
        operation: 'send',
        sendTo: "={{ $json['Email'] }}",
        subject: "Bon anniversaire {{ $json['Nom complet'] }} !",
        emailType: 'text',
        message: `=Bonjour {{ $json['Nom complet'] }},

Toute l'équipe du salon vous souhaite un très joyeux anniversaire !

Pour fêter ça, nous vous offrons -15% sur votre prochaine visite. Valable tout le mois de votre anniversaire.

Réservez votre créneau en nous appelant.

Avec toute notre affection,
L'équipe du salon`,
    };

    @node({
        id: '74bd21d1-da2a-4ed2-83dc-e6d739016729',
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
        id: 'dfe16909-b03d-4381-917c-2b14ca8aa4fa',
        name: 'SMS Anniversaire',
        type: 'n8n-nodes-base.twilio',
        version: 1,
        position: [1040, 440],
        credentials: { twilioApi: 'Twilio' },
    })
    SmsAnniversaire = {
        resource: 'sms',
        operation: 'send',
        from: '+393000000000',
        to: "={{ $json['Téléphone'] }}",
        message:
            "=Joyeux anniversaire {{ $json['Nom complet'] }} ! L'équipe du salon vous offre -15% ce mois-ci. Appelez-nous pour réserver !",
    };

    @node({
        id: 'ee216657-c29b-48d0-a0b3-2ab9b43fbb06',
        name: 'Log Relance Email',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [1040, 160],
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
                'Ref Relance': '=ANNIV-EMAIL-{{ $json.id }}-{{ $now.toISODate() }}',
                'Type de relance': 'Anniversaire',
                Canal: 'Email',
                Statut: 'Envoyé',
                "Date d'envoi réelle": '={{ $now.toISODate() }}',
                Message: "=Email anniversaire -15% envoyé à {{ $json['Nom complet'] }}",
            },
        },
    };

    @node({
        id: '00e480ad-0e24-4094-be51-98ad0a9d83aa',
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
                'Ref Relance': '=ANNIV-SMS-{{ $json.id }}-{{ $now.toISODate() }}',
                'Type de relance': 'Anniversaire',
                Canal: 'SMS',
                Statut: 'Envoyé',
                "Date d'envoi réelle": '={{ $now.toISODate() }}',
                Message: "=SMS anniversaire -15% envoyé à {{ $json['Nom complet'] }}",
            },
        },
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.ChaqueJour09h00.out(0).to(this.ClientsAnniversaireAujourdHui.in(0));
        this.ClientsAnniversaireAujourdHui.out(0).to(this.OptInEmail.in(0));
        this.OptInEmail.out(0).to(this.EmailAnniversaire.in(0));
        this.OptInEmail.out(1).to(this.OptInSms.in(0));
        this.EmailAnniversaire.out(0).to(this.LogRelanceEmail.in(0));
        this.OptInSms.out(0).to(this.SmsAnniversaire.in(0));
        this.SmsAnniversaire.out(0).to(this.LogRelanceSms.in(0));
    }
}
