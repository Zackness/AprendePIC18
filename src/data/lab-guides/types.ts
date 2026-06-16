/**
 * Pre/post laboratorio con respuestas desarrolladas (texto, no quiz).
 */

export interface LabTextItem {
	id: string;
	questionEs: string;
	questionEn: string;
	answerEs: string;
	answerEn: string;
}

export interface LabTextBlock {
	titleEs: string;
	titleEn: string;
	introEs: string;
	introEn: string;
	noteEs: string;
	noteEn: string;
	items: LabTextItem[];
}

export interface LabDesignContent {
	pseudocodeEs: string;
	pseudocodeEn: string;
	flowchartSrc: string;
	flowchartAltEs: string;
	flowchartAltEn: string;
	flowchartCaptionEs: string;
	flowchartCaptionEn: string;
	pseudoPlaceholderEs: string;
	pseudoPlaceholderEn: string;
	pseudoHintEs: string;
	pseudoHintEn: string;
	flowPlaceholderEs: string;
	flowPlaceholderEn: string;
	flowHintsEs: string[];
	flowHintsEn: string[];
}

export interface LabGuideContent {
	practiceSlug: string;
	pre: LabTextBlock;
	post: LabTextBlock;
	design: LabDesignContent;
}
