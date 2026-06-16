/**
 * Examenes por niveles para practicas de laboratorio.
 */

import type { PageQuiz, QuizQuestion } from '../quizzes';

export type { QuizQuestion };

export type ExamAuthMode = 'none' | 'login' | 'subscription';

export interface TieredExamTier extends PageQuiz {
	tierId: string;
	levelEs: string;
	levelEn: string;
	descriptionEs: string;
	descriptionEn: string;
	authMode: ExamAuthMode;
}

export interface TieredLabExam {
	practiceSlug: string;
	titleEs: string;
	titleEn: string;
	sourceDoc?: string;
	tiers: TieredExamTier[];
}
