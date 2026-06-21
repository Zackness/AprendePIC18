import { aluSeries } from './alu';
import { interrupcionesSeries } from './interrupciones';
import { puertosSeries } from './puertos';
import type { SkillTutorialSeries, SkillTutorialStep } from './types';

export type { SkillLevel, SkillTutorialSeries, SkillTutorialStep } from './types';

export const skillTutorialSeries: SkillTutorialSeries[] = [
	puertosSeries,
	aluSeries,
	interrupcionesSeries,
];

const byId = new Map(skillTutorialSeries.map((s) => [s.id, s]));

export function getSkillSeries(seriesId: string): SkillTutorialSeries | undefined {
	return byId.get(seriesId);
}

export function getSkillStep(
	seriesId: string,
	stepId: string,
): { series: SkillTutorialSeries; step: SkillTutorialStep; index: number } | undefined {
	const series = getSkillSeries(seriesId);
	if (!series) return undefined;
	const index = series.steps.findIndex((s) => s.id === stepId);
	if (index < 0) return undefined;
	return { series, step: series.steps[index], index };
}

export function skillGuidesBase(locale: 'es' | 'en'): string {
	return locale === 'en' ? '/en/tutoriales/guias' : '/tutoriales/guias';
}

export function skillSeriesHref(seriesId: string, locale: 'es' | 'en'): string {
	return `${skillGuidesBase(locale)}/${seriesId}/`;
}

export function skillStepHref(seriesId: string, stepId: string, locale: 'es' | 'en'): string {
	return `${skillGuidesBase(locale)}/${seriesId}/${stepId}/`;
}

export function getSkillStepNav(seriesId: string, stepId: string) {
	const found = getSkillStep(seriesId, stepId);
	if (!found) return null;
	const { series, index } = found;
	return {
		prev: index > 0 ? series.steps[index - 1] : null,
		next: index < series.steps.length - 1 ? series.steps[index + 1] : null,
		index,
		total: series.steps.length,
		series,
		step: found.step,
	};
}

/** Slug de pagina Starlight: tutoriales/guias/puertos/1-tris-direccion */
export function skillStepSlug(seriesId: string, stepId: string): string {
	return `tutoriales/guias/${seriesId}/${stepId}`;
}

export function skillSeriesIndexSlug(seriesId: string): string {
	return `tutoriales/guias/${seriesId}`;
}

/** Detecta pasos de guia practica desde la URL (p. ej. /tutoriales/guias/puertos/5-tris-direccion/). */
export function parseSkillTutorialStep(pathname: string): {
	seriesId: string;
	stepId: string;
	locale: 'es' | 'en';
} | null {
	const normalized = pathname.replace(/\/$/, '');
	const match = normalized.match(/^(?:\/en)?\/tutoriales\/guias\/([^/]+)\/([^/]+)$/);
	if (!match) return null;

	const [, seriesId, stepId] = match;
	if (!getSkillStep(seriesId, stepId)) return null;

	return {
		seriesId,
		stepId,
		locale: normalized.startsWith('/en/') ? 'en' : 'es',
	};
}
