import type { LabGuideContent } from './types';
import { operacionesMatematicasGuide } from './operaciones-matematicas';
import { tecladoLcdGuide } from './teclado-lcd';
import { frecuencimetroGuide } from './frecuencimetro';
import { motorPasoAPasoGuide } from './motor-paso-a-paso';
import { convertidorAdGuide } from './convertidor-ad';
import { comunicacionSerialGuide } from './comunicacion-serial';
import { primerLedGuide } from './primer-led';

export type { LabTextItem, LabTextBlock, LabDesignContent, LabGuideContent } from './types';

export const labGuides: LabGuideContent[] = [
	operacionesMatematicasGuide,
	tecladoLcdGuide,
	frecuencimetroGuide,
	motorPasoAPasoGuide,
	convertidorAdGuide,
	comunicacionSerialGuide,
	primerLedGuide,
];

export function getLabGuide(practiceSlug: string): LabGuideContent | undefined {
	const normalized = practiceSlug.replace(/^\/+|\/+$/g, '').replace(/^en\//, '');
	return labGuides.find((g) => g.practiceSlug === normalized);
}
