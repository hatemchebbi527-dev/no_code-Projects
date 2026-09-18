// Manuvo - percorsi SVG per le icone dei mestieri (usati nella landing).
import type { Category } from "./constants";

export const CATEGORY_ICON: Record<Category, string> = {
  idraulica: '<path d="M3 12h4l2-8 4 16 2-8h6"/>',
  elettricista: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>',
  imbianchino:
    '<path d="M19 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM10 11v4a2 2 0 0 0 2 2v0a2 2 0 0 1 2 2v2"/>',
  falegname:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  condizionamento:
    '<rect x="2" y="4" width="20" height="8" rx="2"/><path d="M6 16v.01M10 16v.01M14 16v.01M18 16v.01"/>',
  giardinaggio:
    '<path d="M12 22V8M12 8C12 5 9 2 4 2c0 5 3 6 8 6zM12 8c0-3 3-6 8-6 0 5-3 6-8 6z"/>',
  muratura:
    '<path d="M2 8h20M2 12h20M2 16h20M6 8v4M14 8v4M10 12v4M18 12v4"/>',
  pulizie: '<path d="M8 3 4 7v6l4 4M8 3l4 4M12 21l8-8-4-4-8 8z"/>',
  trasporti:
    '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7M5.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>',
  spazzacamino: '<path d="M8 2h8v6H8zM6 8h12l-1 14H7zM12 8v14"/>',
  elettrodomestici:
    '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M4 8h16M8 5h.01M8 14a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"/>',
  meccanico:
    '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  ristrutturazione:
    '<path d="M15 12l-8.5 8.5a2.12 2.12 0 0 1-3-3L12 9M14 5l5 5M18.5 5.5 20 7l2-2-1.5-1.5a2 2 0 0 0-3 0z"/>',
  caldaia:
    '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M12 11c-1.5 1.5-1.5 4 0 5 1.5-1 2-3 0-5z"/>',
  telecamere:
    '<path d="M14.5 4.5 21 7l-1 3-9-3zM11 6.5 3 9l1 3 9-2M5 12v4a2 2 0 0 0 2 2h1"/><circle cx="8" cy="20" r="1"/>',
  antennista:
    '<path d="M12 20v-8M9 15a4 4 0 0 1 6 0M6.5 12a8 8 0 0 1 11 0M4 9a12 12 0 0 1 16 0"/>',
  serrature:
    '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1"/>',
  lavaggio_tappeti:
    '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 8h18M3 16h18M7 4v16M17 4v16"/>',
  pulizia_cantiere:
    '<path d="M2 18h20M4 18v-2a8 8 0 0 1 16 0v2M9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>',
  colf:
    '<path d="M3 12l9-8 9 8M5 10v10h14V10M10 20v-5h4v5"/><path d="M15 3l.4 1.2L17 4.5l-1.6.4L15 6.5l-.4-1.6L13 4.5l1.6-.3z"/>',
  derattizzazione:
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  disinfestazione:
    '<path d="M8 2l1.5 1.5M16 2l-1.5 1.5M12 20v-9M12 11a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0v-1a4 4 0 0 0-4-4zM4 13H2M4 17H2M20 13h2M20 17h2M6 20l-2 2M18 20l2 2"/>',
  estetista:
    '<path d="m12 3 1.9 4.6L18.5 9l-4.6 1.9L12 15l-1.9-4.1L5.5 9l4.6-1.4z"/><path d="M18 15l.7 1.7L20.5 17l-1.8.6L18 19l-.7-1.4-1.8-.6 1.8-.6z"/>',
  massaggio:
    '<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8v-1a2 2 0 0 0-4 0"/>',
  personal_trainer:
    '<path d="M14.4 14.4 9.6 9.6M18.7 21.5a2 2 0 1 1-2.8-2.9l-1.8 1.8a2 2 0 1 1-2.8-2.8l6.3-6.4a2 2 0 1 1 2.9 2.8l1.7-1.7a2 2 0 1 1 2.8 2.8z"/>',
  pilates:
    '<circle cx="12" cy="4" r="2"/><path d="M12 6v6l-4 8M12 12l4 8M6 10l6 2 6-2"/>',
  ripetizioni:
    '<path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5M22 10v6"/>',
  fotografo:
    '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  videomaker:
    '<path d="m23 7-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
  dj:
    '<path d="M3 14v-2a9 9 0 0 1 18 0v2M3 14a2 2 0 0 0 2 2h1v-4H5a2 2 0 0 0-2 2zM21 14a2 2 0 0 0-2-2h-1v4h1a2 2 0 0 0 2-2z"/>',
  autista:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v7M4.5 9 10 12M19.5 9 14 12M8 20l2-6M16 20l-2-6"/>',
  sviluppo_web:
    '<path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 7l-2 10"/>',
};
