import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : CRM Salon - MAJ Client après RDV Terminé
// Nodes   : 4  |  Connections: 3
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// ChaqueJour20h00                    scheduleTrigger
// RdvTerminesAujourdHui              airtable                   [creds]
// RecupererClient                    airtable                   [creds]
// MettreAJourClient                  airtable                   [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// ChaqueJour20h00
//    → RdvTerminesAujourdHui
//      → RecupererClient
//        → MettreAJourClient
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'XEZ5t1tMnmH6Tx2L',
    name: 'CRM Salon - MAJ Client après RDV Terminé',
    active: false,
    isArchived: false,
    settings: { executionOrder: 'v1', callerPolicy: 'workflowsFromSameOwner', availableInMCP: false },
})
export class CrmSalonMajClientApresRdvTermineWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '7d82f1a2-09be-4d82-8d81-56cbf186a7e8',
        name: 'Chaque Jour 20h00',
        type: 'n8n-nodes-base.scheduleTrigger',
        version: 1.3,
        position: [0, 300],
    })
    ChaqueJour20h00 = {
        rule: {
            interval: [
                {
                    field: 'days',
                    triggerAtHour: 20,
                    triggerAtMinute: 0,
                },
            ],
        },
    };

    @node({
        id: '0ce133ad-0ad0-4590-af1e-e396f59eed18',
        name: "RDV Terminés Aujourd'hui",
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [260, 300],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    RdvTerminesAujourdHui = {
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
        filterByFormula: "AND({Statut}='Terminé', IS_SAME({Date et heure}, TODAY(), 'day'))",
        returnAll: true,
    };

    @node({
        id: '203c3191-38e7-447c-9838-f61f6bf46d54',
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
        id: '94d7427b-3515-424d-922c-d18bb64a62af',
        name: 'Mettre à Jour Client',
        type: 'n8n-nodes-base.airtable',
        version: 2,
        position: [780, 300],
        credentials: { airtableTokenApi: { id: 'gE3YZHWW6RxmDSpb', name: 'Airtable CRM Salon' } },
    })
    MettreAJourClient = {
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
                'Dernier RDV': '={{ $now.toISODate() }}',
                'Nb de visites': "={{ ($json['Nb de visites'] || 0) + 1 }}",
            },
        },
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.ChaqueJour20h00.out(0).to(this.RdvTerminesAujourdHui.in(0));
        this.RdvTerminesAujourdHui.out(0).to(this.RecupererClient.in(0));
        this.RecupererClient.out(0).to(this.MettreAJourClient.in(0));
    }
}
