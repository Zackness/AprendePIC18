/** Parciales del curso Microcontroladores UNEXPO — alineacion por temas de clase */

export interface ParcialBlock {
	id: string;
	order: number;
	number: number;
	titleEs: string;
	titleEn: string;
	topicsEs: string;
	topicsEn: string;
	descriptionEs: string;
	descriptionEn: string;
	hrefEs: string;
	hrefEn: string;
	sourceDocs?: string[];
	/** Slugs de paginas clave a repasar antes del parcial */
	reviewSlugs: string[];
	/** Practicas de laboratorio asociadas (hacer antes o despues del bloque teorico) */
	practiceSlugs?: string[];
}

export const parcialesMeta = {
	titleEs: 'Preparacion por parcial',
	titleEn: 'Exam preparation by partial',
	subtitleEs:
		'Cada parcial se prepara justo despues de estudiar sus temas y practicas relacionadas — no todo al final del semestre.',
	subtitleEn:
		'Each exam is prepared right after studying its topics and related labs — not everything at the end of the semester.',
};

export const parcialesBlocks: ParcialBlock[] = [
	{
		id: 'p1',
		order: 1,
		number: 1,
		titleEs: 'Parcial I',
		titleEn: 'Partial I',
		topicsEs: 'Tema 1, 2 y 3',
		topicsEn: 'Topics 1, 2 and 3',
		descriptionEs:
			'Conceptos del PIC18F4550, arquitectura Harvard, memoria, registros SFR/GPR, bits/hex y ensamblador MPASM.',
		descriptionEn:
			'PIC18F4550 concepts, Harvard architecture, memory, SFR/GPR registers, bits/hex, and MPASM assembly.',
		hrefEs: '/parcial/parcial-1/',
		hrefEn: '/en/parcial/parcial-1/',
		sourceDocs: [
			'Tema 1. Conceptos Básicos (1).pdf',
			'Clase Tema 2 y 3 (1).pdf',
			'instrucciones pic.pdf',
		],
		reviewSlugs: [
			'introduccion/pic18f4550',
			'introduccion/comparaciones',
			'fundamentos/arquitectura',
			'fundamentos/registros',
			'fundamentos/bits-hex',
			'fundamentos/ensamblador',
			'fundamentos/config-bits',
		],
	},
	{
		id: 'p2',
		order: 2,
		number: 2,
		titleEs: 'Parcial II',
		titleEn: 'Partial II',
		topicsEs: 'Retardos, comparaciones y GPIO',
		topicsEn: 'Delays, comparisons, and GPIO',
		descriptionEs:
			'Retardos por software, comparacion de registros, GPIO, botones y Practica 1.',
		descriptionEn:
			'Software delays, register comparisons, GPIO, buttons, and Practice 1.',
		hrefEs: '/parcial/parcial-2/',
		hrefEn: '/en/parcial/parcial-2/',
		sourceDocs: [
			'Clase Tema 4 y 5.pdf',
			'Practica 1  Operacion matematia.pdf',
		],
		reviewSlugs: [
			'retardos',
			'retardos/ciclos-maquina',
			'retardos/bucles',
			'retardos/calculo-y-aplicaciones',
			'comparaciones',
			'comparaciones/banderas-c-z',
			'comparaciones/igual-cero',
			'comparaciones/entre-registros',
			'gpio',
			'gpio/botones',
			'practicas/primer-led',
		],
		practiceSlugs: ['practicas/operaciones-matematicas'],
	},
	{
		id: 'p3',
		order: 3,
		number: 3,
		titleEs: 'Parcial III',
		titleEn: 'Partial III',
		topicsEs: 'Tema 6, 7, 8 y 9 (PWM)',
		topicsEn: 'Topics 6, 7, 8 and 9 (PWM)',
		descriptionEs:
			'Interrupciones, LCD/teclado, timers, PWM/CCP y practicas 2, 3, 4 y 6 relacionadas.',
		descriptionEn:
			'Interrupts, LCD/keyboard, timers, PWM/CCP, and related practices 2, 3, 4 and 6.',
		hrefEs: '/parcial/parcial-3/',
		hrefEn: '/en/parcial/parcial-3/',
		sourceDocs: [
			'Clase Tema 6. Interrupciones.pdf',
			'Clase Tema 7.1 Modulo LCD y 7.2 Teclado.pdf',
			'Clase Tema 8. Timer.pdf',
			'Clase Tema 9. Modulo CCP (PWM).pdf',
		],
		reviewSlugs: [
			'interrupciones',
			'comunicacion/lcd-teclado',
			'timers/timer0',
			'timers/timer1-timer2',
			'pwm',
		],
		practiceSlugs: [
			'practicas/teclado-lcd',
			'practicas/frecuencimetro',
			'practicas/motor-paso-a-paso',
		],
	},
	{
		id: 'p4',
		order: 4,
		number: 4,
		titleEs: 'Parcial IV',
		titleEn: 'Partial IV',
		topicsEs: 'Tema 9 (ADC), Tema 10 y cierre',
		topicsEn: 'Topic 9 (ADC), Topic 10 and wrap-up',
		descriptionEs:
			'Convertidor A/D, comunicacion serial UART, practicas 7 y 8, y proyecto integrador tipo parcial.',
		descriptionEn:
			'A/D converter, UART serial communication, practices 7 and 8, and integrator project.',
		hrefEs: '/parcial/parcial-4/',
		hrefEn: '/en/parcial/parcial-4/',
		sourceDocs: [
			'Tema 9. CAD.pdf',
			'Tema 10. Comunicación serial.pdf',
			'Practica 7 Convertidor AD.pdf',
			'Practica 8  Comunicacion serial_M3.pdf',
			'Ejercicios II parcial 20252.pdf',
		],
		reviewSlugs: [
			'adc',
			'comunicacion/uart',
			'comunicacion/spi-i2c',
			'comunicacion/usb',
		],
		practiceSlugs: ['practicas/convertidor-ad', 'practicas/comunicacion-serial'],
	},
];

export function getParcialById(id: string): ParcialBlock | undefined {
	return parcialesBlocks.find((p) => p.id === id);
}
