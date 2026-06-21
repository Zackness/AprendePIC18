import { studyPathCourses, type StudyLesson } from './study-path';
import {
	skillSeriesIndexSlug,
	skillStepSlug,
	skillTutorialSeries,
} from './skill-tutorials';
import type { PaginationLinks, SidebarLink } from '@astrojs/starlight/utils/routing/types';

export interface StudyNavEntry {
	slug: string;
	titleEs: string;
	titleEn: string;
	type: StudyLesson['type'];
	optional?: boolean;
}

const ONBOARDING: StudyNavEntry[] = [
	{
		slug: 'ruta-de-estudio',
		titleEs: 'Ruta de estudio',
		titleEn: 'Study path',
		type: 'reference',
	},
	{
		slug: 'sobre/ecosistema',
		titleEs: 'Ecosistema CALETAS y StartupVen',
		titleEn: 'CALETAS ecosystem and StartupVen',
		type: 'reference',
	},
];

/** Slug Starlight sin prefijo de locale ni barras finales. */
export function hrefToSlug(href: string): string {
	return href.replace(/^\/en\//, '/').replace(/^\//, '').replace(/\/$/, '');
}

export function pathnameToSlug(pathname: string): string {
	const normalized = pathname.replace(/\/$/, '') || '/';
	if (normalized === '/') return 'index';
	if (normalized.startsWith('/en/')) return normalized.slice(4);
	return normalized.startsWith('/') ? normalized.slice(1) : normalized;
}

function expandLesson(lesson: StudyLesson): StudyNavEntry[] {
	if (lesson.autoSkillSeries) {
		const series = skillTutorialSeries.find((s) => s.id === lesson.autoSkillSeries);
		if (series) {
			return series.steps.map((step) => ({
				slug: skillStepSlug(series.id, step.id),
				titleEs: step.titleEs,
				titleEn: step.titleEn,
				type: 'guide' as const,
				optional: lesson.optional,
			}));
		}
	}

	return [
		{
			slug: hrefToSlug(lesson.hrefEs),
			titleEs: lesson.titleEs,
			titleEn: lesson.titleEn,
			type: lesson.type,
			optional: lesson.optional,
		},
	];
}

/** Orden plano de la ruta de estudio (fuente unica para Siguiente / Anterior). */
export function getStudyPathNavEntries(): StudyNavEntry[] {
	const seen = new Set<string>();
	const entries: StudyNavEntry[] = [];

	const pushUnique = (entry: StudyNavEntry) => {
		if (seen.has(entry.slug)) return;
		seen.add(entry.slug);
		entries.push(entry);
	};

	for (const entry of ONBOARDING) pushUnique(entry);

	const sortedCourses = [...studyPathCourses].sort((a, b) => a.order - b.order);
	for (const course of sortedCourses) {
		for (const lesson of course.lessons) {
			for (const entry of expandLesson(lesson)) pushUnique(entry);
		}
	}

	return entries;
}

/** Indice de pagina indice de guia → primer paso (para paginacion desde el indice). */
export function getGuideIndexFirstStep(): Map<string, string> {
	const map = new Map<string, string>();
	for (const series of skillTutorialSeries) {
		const first = series.steps[0];
		if (first) {
			map.set(skillSeriesIndexSlug(series.id), skillStepSlug(series.id, first.id));
		}
	}
	return map;
}

function slugToHref(slug: string, locale: string | undefined): string {
	const prefix = locale === 'en' ? '/en/' : '/';
	return `${prefix}${slug}/`;
}

function entryToLink(entry: StudyNavEntry, locale: string | undefined): SidebarLink {
	return {
		type: 'link',
		label: locale === 'en' ? entry.titleEn : entry.titleEs,
		href: slugToHref(entry.slug, locale),
		isCurrent: false,
		badge: undefined,
		attrs: {},
	};
}

function resolveNavIndex(slug: string, entries: StudyNavEntry[]): number {
	const direct = entries.findIndex((entry) => entry.slug === slug);
	if (direct >= 0) return direct;

	const firstStep = getGuideIndexFirstStep().get(slug);
	if (firstStep) {
		const stepIndex = entries.findIndex((entry) => entry.slug === firstStep);
		if (stepIndex > 0) return stepIndex - 1;
		if (stepIndex === 0) return -1;
	}

	return -1;
}

/** Paginacion segun ruta de estudio; null = dejar la de Starlight. */
export function getStudyPathPagination(
	pathname: string,
	locale: string | undefined,
	paginationEnabled: boolean,
): PaginationLinks | null {
	if (!paginationEnabled) return null;

	const slug = pathnameToSlug(pathname);
	const entries = getStudyPathNavEntries();
	const index = resolveNavIndex(slug, entries);
	if (index < 0) return null;

	return {
		prev: index > 0 ? entryToLink(entries[index - 1], locale) : undefined,
		next: index < entries.length - 1 ? entryToLink(entries[index + 1], locale) : undefined,
	};
}

function buildSidebarItem(lesson: StudyLesson): { slug: string } | SidebarNestedGroup {
	if (lesson.autoSkillSeries) {
		const series = skillTutorialSeries.find((s) => s.id === lesson.autoSkillSeries);
		if (series) {
			return {
				label: series.titleEs,
				translations: { en: series.titleEn },
				items: series.steps.map((step) => ({
					slug: skillStepSlug(series.id, step.id),
				})),
			};
		}
	}

	return { slug: hrefToSlug(lesson.hrefEs) };
}

interface SidebarNestedGroup {
	label: string;
	translations?: { en: string };
	collapsed?: boolean;
	items: Array<{ slug: string }>;
}

type SidebarSectionKey =
	| 'start'
	| 'fundamentos'
	| 'primer-programa'
	| 'parcial-1'
	| 'gpio'
	| 'practica-1'
	| 'parcial-2'
	| 'interrupciones'
	| 'lcd'
	| 'timers'
	| 'pwm'
	| 'parcial-3'
	| 'adc'
	| 'comunicacion'
	| 'parcial-4'
	| 'referencia';

const SIDEBAR_SECTIONS: Array<{
	key: SidebarSectionKey;
	labelEs: string;
	labelEn: string;
}> = [
	{ key: 'start', labelEs: 'Comienza aqui', labelEn: 'Start here' },
	{ key: 'fundamentos', labelEs: 'Fundamentos', labelEn: 'Foundations' },
	{ key: 'primer-programa', labelEs: 'Primer programa', labelEn: 'First program' },
	{ key: 'parcial-1', labelEs: 'Preparacion parcial I', labelEn: 'Partial I prep' },
	{ key: 'gpio', labelEs: 'GPIO', labelEn: 'GPIO' },
	{ key: 'practica-1', labelEs: 'Practica 1 — ALU', labelEn: 'Practice 1 — ALU' },
	{ key: 'parcial-2', labelEs: 'Preparacion parcial II', labelEn: 'Partial II prep' },
	{ key: 'interrupciones', labelEs: 'Interrupciones', labelEn: 'Interrupts' },
	{ key: 'lcd', labelEs: 'LCD y teclado', labelEn: 'LCD and keyboard' },
	{ key: 'timers', labelEs: 'Timers', labelEn: 'Timers' },
	{ key: 'pwm', labelEs: 'PWM / CCP', labelEn: 'PWM / CCP' },
	{ key: 'parcial-3', labelEs: 'Preparacion parcial III', labelEn: 'Partial III prep' },
	{ key: 'adc', labelEs: 'ADC', labelEn: 'ADC' },
	{ key: 'comunicacion', labelEs: 'Comunicacion', labelEn: 'Communication' },
	{ key: 'parcial-4', labelEs: 'Preparacion parcial IV', labelEn: 'Partial IV prep' },
	{ key: 'referencia', labelEs: 'Referencia y repaso', labelEn: 'Reference and review' },
];

function getSidebarSectionKey(courseId: string, lesson: StudyLesson): SidebarSectionKey {
	if (courseId === 'c01') return 'start';
	if (courseId === 'c02') return 'fundamentos';
	if (courseId === 'c03') {
		if (lesson.autoSkillSeries || lesson.autoPracticeSlug === 'primer-led') {
			return 'primer-programa';
		}
		return 'fundamentos';
	}
	if (courseId === 'c04') return 'parcial-1';
	if (courseId === 'c05') return 'gpio';
	if (courseId === 'c06') return 'practica-1';
	if (courseId === 'c07') return 'parcial-2';
	if (courseId === 'c08') return 'interrupciones';
	if (courseId === 'c09') return 'lcd';
	if (courseId === 'c10') return 'timers';
	if (courseId === 'c11') return 'pwm';
	if (courseId === 'c12') return 'parcial-3';
	if (courseId === 'c13') return 'adc';
	if (courseId === 'c14') return 'comunicacion';
	if (courseId === 'c15') return 'parcial-4';
	return 'referencia';
}

/** Sidebar agrupada por tema; el orden interno sigue la ruta de estudio. Siguiente usa getStudyPathNavEntries(). */
export function buildStudyPathSidebar() {
	const buckets = new Map<SidebarSectionKey, Array<{ slug: string } | SidebarNestedGroup>>();

	for (const section of SIDEBAR_SECTIONS) {
		buckets.set(section.key, []);
	}

	for (const entry of ONBOARDING) {
		buckets.get('start')!.push({ slug: entry.slug });
	}

	const sortedCourses = [...studyPathCourses].sort((a, b) => a.order - b.order);
	for (const course of sortedCourses) {
		for (const lesson of course.lessons) {
			const key = getSidebarSectionKey(course.id, lesson);
			buckets.get(key)!.push(buildSidebarItem(lesson));
		}
	}

	const groups = SIDEBAR_SECTIONS.flatMap((section) => {
		const items = buckets.get(section.key)!;
		if (items.length === 0) return [];

		return [
			{
				label: section.labelEs,
				translations: { en: section.labelEn },
				items,
			},
		];
	});

	groups.push(
		{
			label: 'Proyectos extra',
			translations: { en: 'Extra projects' },
			collapsed: true,
			items: [{ slug: 'proyectos/semaforo' }, { slug: 'proyectos/control-nivel' }],
		},
		{
			label: 'Indice de tutoriales',
			translations: { en: 'Tutorial index' },
			collapsed: true,
			items: [
				{ slug: 'tutoriales' },
				{ slug: 'tutoriales/guias' },
				{ slug: 'tutoriales/guias/puertos' },
				{ slug: 'tutoriales/guias/alu' },
				{ slug: 'tutoriales/guias/interrupciones' },
				{ slug: 'tutoriales/ejercicios' },
			],
		},
	);

	return groups;
}
