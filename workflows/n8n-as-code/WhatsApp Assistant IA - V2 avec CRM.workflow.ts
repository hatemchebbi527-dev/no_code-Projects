import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : WhatsApp Assistant IA - V2 avec CRM
// Nodes   : 33  |  Connections: 37
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// WhatsappWebhook                    webhook
// ExtractData                        code
// IsAudio                            if
// TranscribeAudio                    httpRequest                [creds]
// ResponseTarifs                     openAi                     [creds]
// ResponseGeneral                    openAi                     [creds]
// SearchClient                       googleSheets               [creds] [alwaysOutput]
// ClientFound                        if
// ExtractName                        openAi                     [creds]
// InfoComplete                       if
// AskName                            httpRequest                [creds]
// CreateClient                       googleSheets               [creds]
// UpdateClient                       googleSheets               [creds]
// ExtractDatetime                    openAi                     [creds]
// CreateEvent                        googleCalendar             [creds]
// SaveRdv                            googleSheets               [creds]
// SendWhatsapp                       httpRequest
// ConfirmRdv                         httpRequest                [creds]
// WaitJ1                             wait
// Switch_                            switch
// ClassificationIa                   openAi                     [creds]
// ParseCategory                      code
// GetMediaUrl                        httpRequest                [creds]
// DownloadAudio                      httpRequest                [creds]
// NormalizeContent                   code
// GetMessageContent                  code
// NormalizeState                     code
// GetClientState                     googleSheets               [creds] [alwaysOutput]
// SwitchSurState                     switch
// UpdateRowInSheet                   googleSheets               [creds]
// CheckDatetime                      if
// AskDatetime                        httpRequest                [creds]
// SetStateWaitingDatetime            googleSheets               [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// WhatsappWebhook
//    → ExtractData
//      → GetClientState
//        → NormalizeState
//          → SwitchSurState
//            → ExtractName
//              → InfoComplete
//                → AskName
//                  → UpdateRowInSheet
//               .out(1) → CreateClient
//                  → ExtractDatetime
//                    → CheckDatetime
//                      → CreateEvent
//                        → SaveRdv
//                          → ConfirmRdv
//                            → WaitJ1
//                     .out(1) → AskDatetime
//                        → SetStateWaitingDatetime
//           .out(1) → ExtractDatetime (↩ loop)
//           .out(2) → IsAudio
//              → GetMediaUrl
//                → DownloadAudio
//                  → TranscribeAudio
//                    → NormalizeContent
//                      → ClassificationIa
//                        → GetMessageContent
//                          → ParseCategory
//                            → Switch_
//                              → ResponseTarifs
//                                → SendWhatsapp
//                             .out(1) → ResponseGeneral
//                                → SendWhatsapp (↩ loop)
//                             .out(2) → SearchClient
//                                → ClientFound
//                                  → ExtractName (↩ loop)
//                                 .out(1) → UpdateClient
//                                    → ExtractDatetime (↩ loop)
//             .out(1) → ClassificationIa (↩ loop)
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'xIv_1pwc7RvcB2DKs_o4k',
    name: 'WhatsApp Assistant IA - V2 avec CRM',
    active: true,
    isArchived: false,
    settings: { executionOrder: 'v1', availableInMCP: false, callerPolicy: 'workflowsFromSameOwner' },
})
export class WhatsappAssistantIaV2AvecCrmWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '15f530e4-fb5d-455f-a76c-b805f00c58ee',
        webhookId: 'whatsapp',
        name: 'WhatsApp Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 1,
        position: [-1984, 32],
    })
    WhatsappWebhook = {
        httpMethod: 'POST',
        path: '/webhook/whatsapp',
        responseMode: 'responseNode',
        options: {
            rawBody: true,
        },
    };

    @node({
        id: '7c90c2a9-854e-48bb-9ad2-ded0f911694a',
        name: 'Extract Data',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [-1792, 32],
    })
    ExtractData = {
        jsCode: `const input = $input.first().json;

// n8n peut placer le body a la racine ($json.entry) ou dans $json.body.entry selon la config rawBody
// On teste les deux chemins
const root  = (input?.body?.entry) ? input.body : input;
const entry  = root?.entry?.[0];
const change = entry?.changes?.[0];
const value  = change?.value;

// Ignorer les non-messages : status updates (delivered/read), challenges, errors
if (!value?.messages || value.messages.length === 0) {
  return [];
}

const message = value.messages[0];

let extractedData = {
  phoneNumber: message.from,
  messageId:   message.id,
  timestamp:   message.timestamp
};

if (message.type === 'text') {
  extractedData.messageType = 'text';
  extractedData.content     = message.text?.body ?? '';
} else if (message.type === 'audio' || message.type === 'voice') {
  extractedData.messageType = 'audio';
  extractedData.mediaId     = message.audio?.id ?? message.voice?.id;
} else {
  // Type non gere (image, document, reaction, sticker...)
  return [];
}

return [extractedData];`,
    };

    @node({
        id: 'cd06061e-f5d2-451d-ad1c-92a1f398fc88',
        name: 'Is Audio?',
        type: 'n8n-nodes-base.if',
        version: 2,
        position: [-1168, 80],
    })
    IsAudio = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
                version: 1,
            },
            conditions: [
                {
                    id: 'cond-1',
                    leftValue: '={{ $json.messageType }}',
                    rightValue: 'audio',
                    operator: {
                        type: 'string',
                        operation: 'equals',
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: '970f37f8-d7aa-4a3a-b5a3-275ea833ccf6',
        name: 'Transcribe Audio',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.1,
        position: [-400, -256],
        credentials: { openAiApi: { id: 'OH363lV78Lk5ICA4', name: 'OpenAi account 2' } },
    })
    TranscribeAudio = {
        method: 'POST',
        url: 'https://api.openai.com/v1/audio/transcriptions',
        authentication: 'predefinedCredentialType',
        nodeCredentialType: 'openAiApi',
        sendBody: true,
        contentType: 'multipart-form-data',
        bodyParameters: {
            parameters: [
                {
                    parameterType: 'formBinaryData',
                    name: 'file',
                    inputDataFieldName: 'data',
                },
                {
                    name: 'model',
                    value: 'whisper-1',
                },
                {
                    name: 'language',
                    value: 'fr',
                },
            ],
        },
        options: {},
    };

    @node({
        id: 'b99631a2-25a8-485a-b353-b1a5194b375e',
        name: 'Response Tarifs',
        type: 'n8n-nodes-base.openAi',
        version: 1,
        position: [-48, -80],
        credentials: { openAiApi: { id: 'OH363lV78Lk5ICA4', name: 'OpenAi account 2' } },
    })
    ResponseTarifs = {
        resource: 'chat',
        prompt: {
            messages: [
                {
                    role: 'system',
                    content:
                        "Tu es l'assistant virtuel d'un cabinet spécialisé en acupuncture et thérapie par ventouses. Un client te demande des informations sur les tarifs. Réponds de façon chaleureuse et professionnelle en français. Présente les prestations disponibles : Séance d'acupuncture (60 min) : 60€, Séance de ventouses (45 min) : 50€, Séance combinée acupuncture + ventouses (90 min) : 90€, Forfait 5 séances acupuncture : 270€ (économie de 30€), Forfait 5 séances ventouses : 225€ (économie de 25€). Invite le client à prendre rendez-vous pour une première consultation.",
                },
                {
                    content: "={{ $('Extract Data').item.json.content }}",
                },
            ],
        },
        options: {},
        requestOptions: {},
    };

    @node({
        id: 'b5255b9f-7a12-4518-b2a6-157d88d82695',
        name: 'Response General',
        type: 'n8n-nodes-base.openAi',
        version: 1,
        position: [-48, 160],
        credentials: { openAiApi: { id: 'LoQdge5T3y0Kj8mc', name: 'OpenAI UIK' } },
    })
    ResponseGeneral = {
        resource: 'chat',
        prompt: {
            messages: [
                {
                    role: 'system',
                    content:
                        "Tu es l'assistant virtuel d'un cabinet spécialisé en acupuncture et thérapie par ventouses. Tu réponds aux questions générales des clients en français, de façon chaleureuse, rassurante et professionnelle. Tu peux expliquer les bienfaits de l'acupuncture (douleurs chroniques, stress, troubles du sommeil, migraines, fertilité, etc.) et des ventouses (tensions musculaires, circulation, détox, récupération sportive). Tu peux aussi informer sur le déroulement d'une séance, les indications et contre-indications générales. Pour toute question médicale spécifique, oriente le client à en parler directement avec le praticien. Termine toujours en proposant de prendre rendez-vous si cela peut aider le client.",
                },
                {
                    content: "={{ $('Extract Data').item.json.content }}",
                },
            ],
        },
        options: {},
        requestOptions: {},
    };

    @node({
        id: '9bebd4ca-88aa-465d-9948-f84599d9d7a0',
        name: 'Search Client',
        type: 'n8n-nodes-base.googleSheets',
        version: 4,
        position: [-48, 320],
        credentials: { googleSheetsOAuth2Api: { id: 'LEbAAVV6EUswGNYs', name: 'Google Sheets account' } },
        alwaysOutputData: true,
    })
    SearchClient = {
        documentId: {
            __rl: true,
            value: '1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA',
            mode: 'id',
        },
        sheetName: {
            __rl: true,
            value: 1658398597,
            mode: 'list',
            cachedResultName: 'CRM_Clients - WhatsApp Acupuncture',
            cachedResultUrl:
                'https://docs.google.com/spreadsheets/d/1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA/edit#gid=1658398597',
        },
        filtersUI: {
            values: [
                {
                    lookupColumn: 'Phone',
                    lookupValue: "={{ $('Extract Data').item.json.phoneNumber }}",
                },
            ],
        },
        options: {
            returnAllMatches: false,
        },
    };

    @node({
        id: '5d3fba9e-072e-4ea7-bfe2-ae50cd0107ee',
        name: 'Client Found?',
        type: 'n8n-nodes-base.if',
        version: 2,
        position: [160, 320],
    })
    ClientFound = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
                version: 1,
            },
            conditions: [
                {
                    id: 'cond-1',
                    leftValue: '={{ $json.Phone }}',
                    rightValue: '',
                    operator: {
                        type: 'string',
                        operation: 'empty',
                        singleValue: true,
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: 'e1603ba2-7cbb-4e5a-8d9a-e1b72ce313b4',
        name: 'Extract Name',
        type: 'n8n-nodes-base.openAi',
        version: 1,
        position: [352, 224],
        credentials: { openAiApi: { id: 'OH363lV78Lk5ICA4', name: 'OpenAi account 2' } },
    })
    ExtractName = {
        resource: 'chat',
        prompt: {
            messages: [
                {
                    role: 'system',
                    content: `Ton rôle est d'extraire le prénom et le nom d'un message client.
Si tu trouves un prénom uniquement, retourne uniquement le prénom avec lastName vide.
Si tu ne trouves aucun nom dans le message, retourne exactement MISSING_INFO pour les deux champs.
Réponds UNIQUEMENT en JSON strict, sans explication, avec ce format :
{"firstName": "...", "lastName": "..."}
`,
                },
                {
                    content: `={{ $('Extract Data').item.json.content || '' }}
`,
                },
            ],
        },
        options: {},
        requestOptions: {},
    };

    @node({
        id: '9259bd7f-bfee-4c23-9837-4118f07831d2',
        name: 'Info Complete?',
        type: 'n8n-nodes-base.if',
        version: 2,
        position: [560, 224],
    })
    InfoComplete = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
                version: 1,
            },
            conditions: [
                {
                    id: 'cond-1',
                    leftValue: `={{ $json.message.content }}
`,
                    rightValue: 'MISSING_INFO',
                    operator: {
                        type: 'string',
                        operation: 'contains',
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: '619536e8-22fb-4341-98e6-1861bfbd53dc',
        name: 'Ask Name',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.1,
        position: [752, 128],
        credentials: {
            httpHeaderAuth: { id: 'tPPmr65dj8DzJvOz', name: 'Header Auth account 2' },
            httpBearerAuth: { id: 'zDQ12s37WACLtBc7', name: 'Bearer Auth account 2' },
        },
    })
    AskName = {
        method: 'POST',
        url: 'https://graph.facebook.com/v18.0/1114954498366451/messages',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "{{ $('Extract Data').item.json.phoneNumber }}",
  "type": "text",
  "text": {
    "body": "Bonjour ! Pour finaliser votre rendez-vous, pourriez-vous me donner votre prénom et votre nom ?"
  }
}
`,
        options: {},
    };

    @node({
        id: '986c5f15-dd04-4600-b39a-ad737f06a95f',
        name: 'Create Client',
        type: 'n8n-nodes-base.googleSheets',
        version: 4,
        position: [784, 304],
        credentials: { googleSheetsOAuth2Api: { id: 'LEbAAVV6EUswGNYs', name: 'Google Sheets account' } },
    })
    CreateClient = {
        operation: 'append',
        documentId: {
            __rl: true,
            mode: 'id',
            value: '1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA',
        },
        sheetName: {
            __rl: true,
            value: 1658398597,
            mode: 'list',
            cachedResultName: 'CRM_Clients - WhatsApp Acupuncture',
            cachedResultUrl:
                'https://docs.google.com/spreadsheets/d/1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA/edit#gid=1658398597',
        },
        columns: {
            mappingMode: 'defineBelow',
            value: {
                Phone: "={{ $('Extract Data').item.json.phoneNumber }}",
                FirstName: "={{ JSON.parse($('Extract Name').item.json.message.content).firstName }}",
                LastName: "={{ JSON.parse($('Extract Name').item.json.message.content).lastName }}",
                CreatedAt: '={{ $now }}',
                Source: 'WhatsApp',
                LastInteraction: '={{ $now }}',
                InteractionCount: 1,
            },
        },
        options: {},
    };

    @node({
        id: '6f6e4d75-81c1-48df-b25f-6db13a3964c1',
        name: 'Update Client',
        type: 'n8n-nodes-base.googleSheets',
        version: 4,
        position: [352, 432],
        credentials: { googleSheetsOAuth2Api: { id: 'LEbAAVV6EUswGNYs', name: 'Google Sheets account' } },
    })
    UpdateClient = {
        operation: 'appendOrUpdate',
        documentId: {
            __rl: true,
            value: '1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA',
            mode: 'id',
        },
        sheetName: {
            __rl: true,
            value: 1658398597,
            mode: 'list',
            cachedResultName: 'CRM_Clients - WhatsApp Acupuncture',
            cachedResultUrl:
                'https://docs.google.com/spreadsheets/d/1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA/edit#gid=1658398597',
        },
        columns: {
            mappingMode: 'defineBelow',
            value: {
                Phone: '={{ $json.Phone }}',
                FirstName: '={{ $json.FirstName }}',
                LastName: '={{ $json.LastName }}',
                CreatedAt: '={{ $json.CreatedAt }}',
                Source: '={{ $json.Source }}',
                LastInteraction: '={{ $json.LastInteraction }}',
                InteractionCount: '={{ $json.InteractionCount }}',
            },
            matchingColumns: ['Phone'],
            schema: [
                {
                    id: 'Phone',
                    displayName: 'Phone',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                    removed: false,
                },
                {
                    id: 'FirstName',
                    displayName: 'FirstName',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'LastName',
                    displayName: 'LastName',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'CreatedAt',
                    displayName: 'CreatedAt',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'Source',
                    displayName: 'Source',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'LastInteraction',
                    displayName: 'LastInteraction',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'InteractionCount',
                    displayName: 'InteractionCount',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
            ],
            attemptToConvertTypes: false,
            convertFieldsToString: false,
        },
        options: {},
    };

    @node({
        id: '4e07e106-c9a2-4449-93ea-736e44676df1',
        name: 'Extract DateTime',
        type: 'n8n-nodes-base.openAi',
        version: 1,
        position: [976, 432],
        credentials: { openAiApi: { id: 'OH363lV78Lk5ICA4', name: 'OpenAi account 2' } },
    })
    ExtractDatetime = {
        resource: 'chat',
        prompt: {
            messages: [
                {
                    role: 'system',
                    content: `=Ton rôle est d'extraire une date et une heure depuis un message de client souhaitant prendre rendez-vous.
La date doit être au format YYYY-MM-DD, l'heure au format HH:MM (24h).
Si une information est manquante ou imprécise, retourne null pour ce champ.
Interprète les expressions relatives comme 'demain', 'lundi prochain', 'la semaine prochaine' en tenant compte de la date actuelle.
Réponds UNIQUEMENT en JSON strict, sans explication, avec ce format :
{"date": "YYYY-MM-DD", "time": "HH:MM"}

`,
                },
                {
                    content: `={{ 'Date actuelle : ' + $now.toFormat('yyyy-MM-dd') + '. Message client : ' + ($('Normalize State').item.json.content || '') }}

`,
                },
            ],
        },
        options: {},
        requestOptions: {},
    };

    @node({
        id: '5060421e-73f4-482e-b52d-3ec654181dcb',
        name: 'Create Event',
        type: 'n8n-nodes-base.googleCalendar',
        version: 1,
        position: [1200, 432],
        credentials: { googleCalendarOAuth2Api: { id: 'TdIEDCO5ndbx1LsB', name: 'Google Calendar account' } },
    })
    CreateEvent = {
        calendar: 'primary',
        start: "={{ JSON.parse($('Extract DateTime').item.json.message.content).date + 'T' + JSON.parse($('Extract DateTime').item.json.message.content).time + ':00' }}",
        end: "={{ DateTime.fromISO(JSON.parse($('Extract DateTime').item.json.message.content).date + 'T' + JSON.parse($('Extract DateTime').item.json.message.content).time + ':00').plus({hours:1}).toISO() }}",
        additionalFields: {
            description: "={{ 'Rendez-vous WhatsApp - ' + $('Extract Data').item.json.phoneNumber }}",
        },
    };

    @node({
        id: '3ae6e6fb-d682-4d0f-84c4-e662c40560dd',
        name: 'Save RDV',
        type: 'n8n-nodes-base.googleSheets',
        version: 4,
        position: [1392, 432],
        credentials: { googleSheetsOAuth2Api: { id: 'LEbAAVV6EUswGNYs', name: 'Google Sheets account' } },
    })
    SaveRdv = {
        operation: 'append',
        documentId: {
            __rl: true,
            value: '11uWCTxqQUfdQC3YsU2Zm2vg1zleKW4BybWCkGHhqyWo',
            mode: 'id',
        },
        sheetName: {
            __rl: true,
            value: 751085454,
            mode: 'list',
            cachedResultName: 'CRM_RDV - WhatsApp Acupuncture',
            cachedResultUrl:
                'https://docs.google.com/spreadsheets/d/11uWCTxqQUfdQC3YsU2Zm2vg1zleKW4BybWCkGHhqyWo/edit#gid=751085454',
        },
        columns: {
            mappingMode: 'defineBelow',
            value: {
                ClientPhone: '={{ $("Extract Data").item.json.phoneNumber }}',
                Date: '={{ JSON.parse($("Extract DateTime").item.json.message.content).date }}',
                Heure: '={{ JSON.parse($("Extract DateTime").item.json.message.content).time }}',
                Status: 'Planifie',
                GoogleEventID: '={{ $json.id }}',
                ReminderSent: false,
            },
            matchingColumns: [],
            schema: [
                {
                    id: 'ClientPhone',
                    displayName: 'ClientPhone',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'Date',
                    displayName: 'Date',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'Heure',
                    displayName: 'Heure',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'Status',
                    displayName: 'Status',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'GoogleEventID',
                    displayName: 'GoogleEventID',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'ReminderSent',
                    displayName: 'ReminderSent',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
            ],
            attemptToConvertTypes: false,
            convertFieldsToString: false,
        },
        options: {},
    };

    @node({
        id: 'e5d78363-071b-460b-8309-4d6733a5b028',
        name: 'Send WhatsApp',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.1,
        position: [160, -80],
    })
    SendWhatsapp = {
        method: 'POST',
        url: 'https://graph.facebook.com/v18.0/1114954498366451/messages',
        sendQuery: true,
        queryParameters: {
            parameters: [
                {
                    name: 'access_token',
                    value: 'EAAOT37KAss8BRl3bGYn5df8xT4ZA570ZCMqckcZBfbCpkEvNl3ZAc7Oei9HLJI1zyZA5y6UFKtANZC6ayWpZANWOfb4vtS2WIW9vSLCL4oIivVbIJDW2dituoB27WfyV81NeCNgddZBxUcKPKKVjBi1lNhejJZAta4H1BAaoMpmBtSuBODeeDSTot0YVpaiHnvpPJuFo7EtyiRc8XOl8KxnycS8bsS8cmcAPTLtkPQoKzIeqZBPxM5IntNpW3ACw7IDwaz0OHHz1bZABhcGWlTa8OboB2JXgakLzYhX',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={{ JSON.stringify({
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": $("Extract Data").item.json.phoneNumber,
  "type": "text",
  "text": { "body": $json.message.content }
}) }}
`,
        options: {},
    };

    @node({
        id: '4c956a4c-3ffc-456d-ae78-d887bbb06fea',
        name: 'Confirm RDV',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.1,
        position: [1584, 432],
        credentials: {
            httpHeaderAuth: { id: 'tPPmr65dj8DzJvOz', name: 'Header Auth account 2' },
            httpBearerAuth: { id: 'zDQ12s37WACLtBc7', name: 'Bearer Auth account 2' },
        },
    })
    ConfirmRdv = {
        method: 'POST',
        url: '=https://graph.facebook.com/v19.0/1114954498366451/messages',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "{{ $('Extract Data').item.json.phoneNumber }}",
  "type": "text",
  "text": {
    "body": "Votre rendez-vous est confirmé ! Nous vous enverrons un rappel la veille. Merci et à  bientot !"
  }
}
`,
        options: {},
    };

    @node({
        id: '36f8881a-5d20-459d-ba50-9569ae235b2c',
        webhookId: 'a2d7fa92-7d90-45e5-a234-ad69262b1588',
        name: 'Wait J-1',
        type: 'n8n-nodes-base.wait',
        version: 1,
        position: [1840, 432],
    })
    WaitJ1 = {
        amount: 15,
        unit: 'seconds',
    };

    @node({
        id: '5002bfac-64ef-4ef5-96fb-e0111de2d745',
        name: 'Switch',
        type: 'n8n-nodes-base.switch',
        version: 3.4,
        position: [-320, 144],
    })
    Switch_ = {
        rules: {
            values: [
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'strict',
                            version: 3,
                        },
                        conditions: [
                            {
                                leftValue: '={{ $json.category }}',
                                rightValue: 'TARIFICATION',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                },
                                id: '910810b7-8eee-4a98-a13a-0942a13e5207',
                            },
                        ],
                        combinator: 'and',
                    },
                },
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'strict',
                            version: 3,
                        },
                        conditions: [
                            {
                                id: 'b8a08ab3-9c24-4ef0-8629-63ecb3799021',
                                leftValue: '={{ $json.category }}',
                                rightValue: 'GENERAL',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                },
                            },
                        ],
                        combinator: 'and',
                    },
                },
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'strict',
                            version: 3,
                        },
                        conditions: [
                            {
                                id: '86f50d0e-d0bf-461d-bcca-5fb5fd64b237',
                                leftValue: '={{ $json.category }}',
                                rightValue: 'RENDEZ_VOUS',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                },
                            },
                        ],
                        combinator: 'and',
                    },
                },
            ],
        },
        options: {},
    };

    @node({
        id: '0b501544-f723-4bff-8d38-387a9c10c16d',
        name: 'Classification IA',
        type: 'n8n-nodes-base.openAi',
        version: 1,
        position: [-976, 160],
        credentials: { openAiApi: { id: 'OH363lV78Lk5ICA4', name: 'OpenAi account 2' } },
    })
    ClassificationIa = {
        resource: 'chat',
        prompt: {
            messages: [
                {
                    role: 'system',
                    content:
                        'Tu es un assistant de classification pour une entreprise. Analyse le message client et classe-le dans UNE SEULE catégorie parmi : TARIFICATION, GENERAL, RENDEZ_VOUS. Réponds UNIQUEMENT par le nom de la catégorie en majuscules, sans explication.',
                },
                {
                    content: '={{ $json.content }}',
                },
            ],
        },
        options: {},
        requestOptions: {},
    };

    @node({
        id: 'eaadbc69-9567-48ee-98df-ea6e0ab7540d',
        name: 'Parse Category',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [-480, 160],
    })
    ParseCategory = {
        jsCode: `const raw = $input.first().json;
// OpenAI node v1.1 Simplify=true → message.content ; fallback sur text
const text = (raw?.message?.content ?? raw?.text ?? "").trim().toUpperCase();
return [{ json: { category: text, messageContent: raw?.messageContent || "" } }];`,
    };

    @node({
        id: 'a0bbae55-c599-46cc-9a28-ba6a4cf7c702',
        name: 'Get Media URL',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.1,
        position: [-880, -256],
        credentials: { httpBearerAuth: { id: 'zDQ12s37WACLtBc7', name: 'Bearer Auth account 2' } },
    })
    GetMediaUrl = {
        url: '={{ "https://graph.facebook.com/v19.0/" + $json.mediaId }}',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        options: {},
    };

    @node({
        id: 'c48dc383-6a4a-4fb4-b323-8c44f7be17b4',
        name: 'Download Audio',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.1,
        position: [-640, -256],
        credentials: { httpBearerAuth: { id: 'zDQ12s37WACLtBc7', name: 'Bearer Auth account 2' } },
    })
    DownloadAudio = {
        url: '={{ $json.url }}',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        options: {
            response: {
                response: {
                    responseFormat: 'file',
                },
            },
        },
    };

    @node({
        id: '8529b2f9-122c-4936-b224-e4df067839f8',
        name: 'Normalize Content',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [-160, -256],
    })
    NormalizeContent = {
        jsCode: `const transcription = $input.first().json.text || "";
const original = $("Extract Data").first().json;
return [{ json: { ...original, content: transcription } }];`,
    };

    @node({
        id: 'd8c418ce-27bc-4032-ba9c-89389fa85de3',
        name: 'Get Message Content',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [-656, 160],
    })
    GetMessageContent = {
        jsCode: `const messageType = $('Extract Data').item.json.messageType;
let content;

if (messageType === 'audio') {
  content = $('Normalize Content').item.json.content;
} else {
  content = $('Extract Data').item.json.content;
}

return [{ 
  json: { 
    ...$input.item.json, 
    messageContent: content 
  } 
}];
`,
    };

    @node({
        id: 'a1b2c3d4-e5f6-7890-abcd-normalize001',
        name: 'Normalize State',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [-1720, 32],
    })
    NormalizeState = {
        jsCode: `const extractData = $('Extract Data').item.json;
const clientData = $input.first()?.json || {};

return [{
  json: {
    phoneNumber: extractData.phoneNumber,
    messageType: extractData.messageType,
    mediaId: extractData.mediaId || null,
    content: extractData.content || '',
    state: clientData.state || '',
    FirstName: clientData.FirstName || '',
    LastName: clientData.LastName || '',
  }
}];`,
    };

    @node({
        id: 'f5375e31-82eb-436c-9def-8d00dcf14004',
        name: 'Get Client State',
        type: 'n8n-nodes-base.googleSheets',
        version: 4.7,
        position: [-1600, 32],
        credentials: { googleSheetsOAuth2Api: { id: 'INO6Rk0IHokN9FBt', name: 'hatemchebbi527@gmail.com' } },
        alwaysOutputData: true,
    })
    GetClientState = {
        documentId: {
            __rl: true,
            value: '1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA',
            mode: 'list',
            cachedResultName: 'CRM_Clients - WhatsApp Acupuncture',
            cachedResultUrl:
                'https://docs.google.com/spreadsheets/d/1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA/edit?usp=drivesdk',
        },
        sheetName: {
            __rl: true,
            value: 1658398597,
            mode: 'list',
            cachedResultName: 'CRM_Clients - WhatsApp Acupuncture',
            cachedResultUrl:
                'https://docs.google.com/spreadsheets/d/1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA/edit#gid=1658398597',
        },
        filtersUI: {
            values: [
                {
                    lookupColumn: 'Phone',
                    lookupValue: "={{ $('Extract Data').item.json.phoneNumber }}",
                },
            ],
        },
        options: {},
    };

    @node({
        id: 'f5acdb26-1eff-4ba4-9ebd-35df10fb5543',
        name: 'Switch sur State',
        type: 'n8n-nodes-base.switch',
        version: 3.4,
        position: [-1424, 16],
    })
    SwitchSurState = {
        rules: {
            values: [
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'strict',
                            version: 3,
                        },
                        conditions: [
                            {
                                leftValue: '={{ $json.state }}',
                                rightValue: 'waiting_name',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                },
                                id: 'a6b33a93-4a14-41b0-b379-584f7c814d49',
                            },
                        ],
                        combinator: 'and',
                    },
                },
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'strict',
                            version: 3,
                        },
                        conditions: [
                            {
                                id: '30c961c2-4879-48be-9dd1-9cec7ba85ac8',
                                leftValue: '={{ $json.state }}',
                                rightValue: 'waiting_datetime',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                    name: 'filter.operator.equals',
                                },
                            },
                        ],
                        combinator: 'and',
                    },
                },
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'loose',
                            version: 3,
                        },
                        conditions: [
                            {
                                id: 'c1a2b3d4-e5f6-7890-abcd-ef1234567890',
                                leftValue: '={{ $json.messageType }}',
                                operator: {
                                    type: 'string',
                                    operation: 'notEmpty',
                                },
                            },
                        ],
                        combinator: 'and',
                    },
                },
            ],
        },
        options: {},
    };

    @node({
        id: '55fde18a-fec4-4467-be32-83e489146ac0',
        name: 'Update row in sheet',
        type: 'n8n-nodes-base.googleSheets',
        version: 4.7,
        position: [960, 128],
        credentials: { googleSheetsOAuth2Api: { id: 'INO6Rk0IHokN9FBt', name: 'hatemchebbi527@gmail.com' } },
    })
    UpdateRowInSheet = {
        operation: 'update',
        documentId: {
            __rl: true,
            value: '1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA',
            mode: 'list',
            cachedResultName: 'CRM_Clients - WhatsApp Acupuncture',
            cachedResultUrl:
                'https://docs.google.com/spreadsheets/d/1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA/edit?usp=drivesdk',
        },
        sheetName: {
            __rl: true,
            value: 1658398597,
            mode: 'list',
            cachedResultName: 'CRM_Clients - WhatsApp Acupuncture',
            cachedResultUrl:
                'https://docs.google.com/spreadsheets/d/1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA/edit#gid=1658398597',
        },
        columns: {
            mappingMode: 'defineBelow',
            value: {
                Phone: "={{ $('Extract Data').item.json.phoneNumber }}",
                State: 'waiting_name',
            },
            matchingColumns: ['Phone'],
            schema: [
                {
                    id: 'Phone',
                    displayName: 'Phone',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                    removed: false,
                },
                {
                    id: 'State',
                    displayName: 'State',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'FirstName',
                    displayName: 'FirstName',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'LastName',
                    displayName: 'LastName',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'CreatedAt',
                    displayName: 'CreatedAt',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'Source',
                    displayName: 'Source',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'LastInteraction',
                    displayName: 'LastInteraction',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'InteractionCount',
                    displayName: 'InteractionCount',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                },
                {
                    id: 'row_number',
                    displayName: 'row_number',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'number',
                    canBeUsedToMatch: true,
                    readOnly: true,
                    removed: true,
                },
            ],
            attemptToConvertTypes: false,
            convertFieldsToString: false,
        },
        options: {},
    };

    @node({
        id: 'c1d2e3f4-a5b6-7890-cdef-checkdt001',
        name: 'Check DateTime',
        type: 'n8n-nodes-base.if',
        version: 2,
        position: [1200, 304],
    })
    CheckDatetime = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'loose',
                version: 1,
            },
            conditions: [
                {
                    id: 'dt-check-date',
                    leftValue: "={{ JSON.parse($('Extract DateTime').item.json.message.content).date }}",
                    operator: {
                        type: 'string',
                        operation: 'notEmpty',
                    },
                },
                {
                    id: 'dt-check-time',
                    leftValue: "={{ JSON.parse($('Extract DateTime').item.json.message.content).time }}",
                    operator: {
                        type: 'string',
                        operation: 'notEmpty',
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: 'c2d3e4f5-a6b7-8901-cdef-askdt001',
        name: 'Ask Datetime',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.1,
        position: [1400, 400],
        credentials: { httpBearerAuth: { id: 'zDQ12s37WACLtBc7', name: 'Bearer Auth account 2' } },
    })
    AskDatetime = {
        method: 'POST',
        url: 'https://graph.facebook.com/v18.0/1114954498366451/messages',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "{{ $('Extract Data').item.json.phoneNumber }}",
  "type": "text",
  "text": {
    "body": "Pour quel date et heure souhaitez-vous votre rendez-vous ? Merci de préciser, par exemple : mardi 2 juin à 14h00."
  }
}
`,
        options: {},
    };

    @node({
        id: 'c3d4e5f6-a7b8-9012-cdef-setsdt001',
        name: 'Set State Waiting Datetime',
        type: 'n8n-nodes-base.googleSheets',
        version: 4.7,
        position: [1600, 400],
        credentials: { googleSheetsOAuth2Api: { id: 'INO6Rk0IHokN9FBt', name: 'hatemchebbi527@gmail.com' } },
    })
    SetStateWaitingDatetime = {
        operation: 'update',
        documentId: {
            __rl: true,
            value: '1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA',
            mode: 'list',
            cachedResultName: 'CRM_Clients - WhatsApp Acupuncture',
            cachedResultUrl:
                'https://docs.google.com/spreadsheets/d/1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA/edit?usp=drivesdk',
        },
        sheetName: {
            __rl: true,
            value: 1658398597,
            mode: 'list',
            cachedResultName: 'CRM_Clients - WhatsApp Acupuncture',
            cachedResultUrl:
                'https://docs.google.com/spreadsheets/d/1vtn6jF6LaDeJkJk57eAlD2qSgesc6Bm-BY5weFa3EyA/edit#gid=1658398597',
        },
        columns: {
            mappingMode: 'defineBelow',
            value: {
                Phone: "={{ $('Extract Data').item.json.phoneNumber }}",
                State: 'waiting_datetime',
            },
            matchingColumns: ['Phone'],
            schema: [
                {
                    id: 'Phone',
                    displayName: 'Phone',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                    removed: false,
                },
                {
                    id: 'State',
                    displayName: 'State',
                    required: false,
                    defaultMatch: false,
                    display: true,
                    type: 'string',
                    canBeUsedToMatch: true,
                    removed: false,
                },
            ],
        },
        options: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.WhatsappWebhook.out(0).to(this.ExtractData.in(0));
        this.ExtractData.out(0).to(this.GetClientState.in(0));
        this.IsAudio.out(0).to(this.GetMediaUrl.in(0));
        this.IsAudio.out(1).to(this.ClassificationIa.in(0));
        this.TranscribeAudio.out(0).to(this.NormalizeContent.in(0));
        this.ResponseTarifs.out(0).to(this.SendWhatsapp.in(0));
        this.ResponseGeneral.out(0).to(this.SendWhatsapp.in(0));
        this.SearchClient.out(0).to(this.ClientFound.in(0));
        this.ClientFound.out(0).to(this.ExtractName.in(0));
        this.ClientFound.out(1).to(this.UpdateClient.in(0));
        this.ExtractName.out(0).to(this.InfoComplete.in(0));
        this.InfoComplete.out(0).to(this.AskName.in(0));
        this.InfoComplete.out(1).to(this.CreateClient.in(0));
        this.CreateClient.out(0).to(this.ExtractDatetime.in(0));
        this.UpdateClient.out(0).to(this.ExtractDatetime.in(0));
        this.ExtractDatetime.out(0).to(this.CheckDatetime.in(0));
        this.CheckDatetime.out(0).to(this.CreateEvent.in(0));
        this.CheckDatetime.out(1).to(this.AskDatetime.in(0));
        this.AskDatetime.out(0).to(this.SetStateWaitingDatetime.in(0));
        this.CreateEvent.out(0).to(this.SaveRdv.in(0));
        this.SaveRdv.out(0).to(this.ConfirmRdv.in(0));
        this.ConfirmRdv.out(0).to(this.WaitJ1.in(0));
        this.Switch_.out(0).to(this.ResponseTarifs.in(0));
        this.Switch_.out(1).to(this.ResponseGeneral.in(0));
        this.Switch_.out(2).to(this.SearchClient.in(0));
        this.ClassificationIa.out(0).to(this.GetMessageContent.in(0));
        this.ParseCategory.out(0).to(this.Switch_.in(0));
        this.GetMediaUrl.out(0).to(this.DownloadAudio.in(0));
        this.DownloadAudio.out(0).to(this.TranscribeAudio.in(0));
        this.NormalizeContent.out(0).to(this.ClassificationIa.in(0));
        this.GetMessageContent.out(0).to(this.ParseCategory.in(0));
        this.GetClientState.out(0).to(this.NormalizeState.in(0));
        this.NormalizeState.out(0).to(this.SwitchSurState.in(0));
        this.SwitchSurState.out(0).to(this.ExtractName.in(0));
        this.SwitchSurState.out(1).to(this.ExtractDatetime.in(0));
        this.SwitchSurState.out(2).to(this.IsAudio.in(0));
        this.AskName.out(0).to(this.UpdateRowInSheet.in(0));
    }
}
