/**
 * Recursos de CALETAS relacionados con Microcontroladores / PIC18.
 * Consumido desde AprendePIC18 via fetch (API publica en caleta.top).
 */

import { getCaletaApiOrigin } from './caleta-config';

export type CaletaMicroRecurso = {
	id: string;
	titulo: string;
	descripcion: string;
	tipo: string;
	tags: string;
	calificacion: number;
	numVistas: number;
	materia: { nombre: string; codigo: string } | null;
	href: string;
};

export type CaletaMicroRecursosResponse = {
	recursos: CaletaMicroRecurso[];
	total: number;
};

export async function fetchCaletaMicroRecursos(limit = 24): Promise<CaletaMicroRecursosResponse> {
	const params = new URLSearchParams({ limit: String(limit) });
	const res = await fetch(`${getCaletaApiOrigin()}/api/aprende-pic18/recursos?${params}`, {
		method: 'GET',
		headers: { Accept: 'application/json' },
	});

	if (!res.ok) {
		throw new Error(`CALETAS recursos: ${res.status}`);
	}

	return res.json();
}

const TIPO_LABELS_ES: Record<string, string> = {
	ANOTACION: 'Anotacion',
	RESUMEN: 'Resumen',
	GUIA_ESTUDIO: 'Guia',
	EJERCICIOS: 'Ejercicios',
	PRESENTACION: 'Presentacion',
	VIDEO: 'Video',
	AUDIO: 'Audio',
	DOCUMENTO: 'Documento',
	ENLACE: 'Enlace',
	TIP: 'Tip',
};

const TIPO_LABELS_EN: Record<string, string> = {
	ANOTACION: 'Notes',
	RESUMEN: 'Summary',
	GUIA_ESTUDIO: 'Study guide',
	EJERCICIOS: 'Exercises',
	PRESENTACION: 'Slides',
	VIDEO: 'Video',
	AUDIO: 'Audio',
	DOCUMENTO: 'Document',
	ENLACE: 'Link',
	TIP: 'Tip',
};

export function formatRecursoTipo(tipo: string, isEn = false): string {
	const map = isEn ? TIPO_LABELS_EN : TIPO_LABELS_ES;
	return map[tipo] || tipo.replace(/_/g, ' ').toLowerCase();
}

export function truncateText(text: string, max = 140): string {
	const clean = text.replace(/\s+/g, ' ').trim();
	if (clean.length <= max) return clean;
	return `${clean.slice(0, max - 1).trim()}…`;
}
