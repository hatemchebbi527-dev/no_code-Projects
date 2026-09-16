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
};
