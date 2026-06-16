import type { TieredExamTier, TieredLabExam } from './types';
import { operacionesMatematicasExam } from './operaciones-matematicas';
import {
	tecladoLcdExam,
	frecuencimetroExam,
	motorPasoAPasoExam,
	convertidorAdExam,
	comunicacionSerialExam,
	primerLedExam,
} from './practices';

export type { ExamAuthMode, TieredExamTier, TieredLabExam, QuizQuestion } from './types';

export const tieredLabExams: TieredLabExam[] = [
	operacionesMatematicasExam,
	tecladoLcdExam,
	frecuencimetroExam,
	motorPasoAPasoExam,
	convertidorAdExam,
	comunicacionSerialExam,
	primerLedExam,
];

export function getTieredLabExam(practiceSlug: string): TieredLabExam | undefined {
	const normalized = practiceSlug.replace(/^\/+|\/+$/g, '').replace(/^en\//, '');
	return tieredLabExams.find((e) => e.practiceSlug === normalized);
}

export function getTieredExamTier(slug: string): TieredExamTier | undefined {
	const normalized = slug.replace(/^\/+|\/+$/g, '').replace(/^en\//, '');
	for (const exam of tieredLabExams) {
		const tier = exam.tiers.find((t) => t.slug === normalized);
		if (tier) return tier;
	}
	return undefined;
}
