export type SkillLevel = 'basico' | 'intermedio' | 'avanzado';

export interface SkillTutorialStep {
	/** Slug URL del paso, ej. `1-tris-port-lat` */
	id: string;
	order: number;
	titleEs: string;
	titleEn: string;
	goalEs?: string;
	goalEn?: string;
	bodyEs: string;
	bodyEn: string;
	/** Pasos numerados tipo tutorial Astro (“haz esto, luego esto”) */
	instructionsEs?: string[];
	instructionsEn?: string[];
	/** Fragmento o archivo acumulado hasta este paso */
	cumulativeCode?: string;
	code?: string;
	/** Verificar antes de pulsar Siguiente */
	checklistEs?: string[];
	checklistEn?: string[];
	challengeEs?: string;
	challengeEn?: string;
	tipEs?: string;
	tipEn?: string;
	/** Slug del quiz en pageQuizzes (paso final) */
	quizSlug?: string;
}

export interface SkillTutorialSeries {
	/** Identificador interno, ej. `puertos` */
	id: string;
	titleEs: string;
	titleEn: string;
	descriptionEs: string;
	descriptionEn: string;
	/** Meta del programa que construye el alumno */
	projectGoalEs?: string;
	projectGoalEn?: string;
	projectHardwareEs?: string;
	projectHardwareEn?: string;
	level: SkillLevel;
	/** Otras series recomendadas antes */
	prerequisites?: string[];
	/** Docs teóricas relacionadas */
	relatedDocs?: { labelEs: string; labelEn: string; hrefEs: string; hrefEn: string }[];
	/** Tutoriales de practica que usan esta habilidad */
	preparesFor?: string[];
	steps: SkillTutorialStep[];
}
