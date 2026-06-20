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
	code?: string;
	challengeEs?: string;
	challengeEn?: string;
	tipEs?: string;
	tipEn?: string;
}

export interface SkillTutorialSeries {
	/** Identificador interno, ej. `puertos` */
	id: string;
	titleEs: string;
	titleEn: string;
	descriptionEs: string;
	descriptionEn: string;
	level: SkillLevel;
	/** Otras series recomendadas antes */
	prerequisites?: string[];
	/** Docs teóricas relacionadas */
	relatedDocs?: { labelEs: string; labelEn: string; hrefEs: string; hrefEn: string }[];
	/** Tutoriales de practica que usan esta habilidad */
	preparesFor?: string[];
	steps: SkillTutorialStep[];
}
