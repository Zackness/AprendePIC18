export type LessonType = 'theory' | 'practice' | 'lab' | 'exam' | 'tool' | 'reference';
export type StudyLevel = 'beginner' | 'intermediate' | 'advanced' | 'applied';

export interface StudyLesson {
	id: string;
	titleEs: string;
	titleEn: string;
	hrefEs: string;
	hrefEn: string;
	minutes: number;
	type: LessonType;
	/** PDF de referencia del curso UNEXPO (nombre del archivo) */
	sourceDoc?: string;
	optional?: boolean;
}

export interface StudyCourse {
	id: string;
	order: number;
	titleEs: string;
	titleEn: string;
	descriptionEs: string;
	descriptionEn: string;
	level: StudyLevel;
	outcomesEs: string[];
	outcomesEn: string[];
	sourceDocs?: string[];
	/** Marca bloques de preparacion de parcial intercalados */
	isParcialCheckpoint?: boolean;
	parcialNumber?: 1 | 2 | 3 | 4;
	lessons: StudyLesson[];
}

export const studyPathMeta = {
	titleEs: 'Ruta de estudio PIC18F4550',
	titleEn: 'PIC18F4550 Study Path',
	subtitleEs:
		'Secuencia guiada alineada al curso UNEXPO: estudias los temas, haces la practica de laboratorio y preparas cada parcial en el momento — no todo al final.',
	subtitleEn:
		'Guided sequence aligned with UNEXPO: study topics, complete the lab practice, and prepare each partial exam along the way — not everything at the end.',
};

export const studyPathCourses: StudyCourse[] = [
	{
		id: 'c01',
		order: 1,
		titleEs: 'Tema 1 — Conceptos del PIC18F4550',
		titleEn: 'Topic 1 — PIC18F4550 concepts',
		descriptionEs:
			'Que es un microcontrolador, diferencias con Arduino/ESP32 y vision general del PIC18F4550.',
		descriptionEn:
			'What a microcontroller is, differences from Arduino/ESP32, and PIC18F4550 overview.',
		level: 'beginner',
		sourceDocs: ['Tema 1. Conceptos Básicos (1).pdf'],
		outcomesEs: [
			'Diferenciar microcontrolador y microprocesador',
			'Describir bloques internos del PIC18F4550',
			'Relacionar el Tema 1 con las clases de la ruta',
		],
		outcomesEn: [
			'Distinguish microcontroller from microprocessor',
			'Describe PIC18F4550 internal blocks',
			'Relate Topic 1 to the lessons on the study path',
		],
		lessons: [
			{
				id: 'c01-l1',
				titleEs: 'Que es el PIC18F4550',
				titleEn: 'What is the PIC18F4550',
				hrefEs: '/introduccion/pic18f4550/',
				hrefEn: '/en/introduccion/pic18f4550/',
				minutes: 20,
				type: 'theory',
				sourceDoc: 'Tema 1. Conceptos Básicos (1).pdf',
			},
			{
				id: 'c01-l2',
				titleEs: 'Comparar con Arduino, ESP32 y Raspberry Pi',
				titleEn: 'Compare with Arduino, ESP32, and Raspberry Pi',
				hrefEs: '/introduccion/comparaciones/',
				hrefEn: '/en/introduccion/comparaciones/',
				minutes: 15,
				type: 'theory',
				sourceDoc: 'Tema 1. Conceptos Básicos (1).pdf',
			},
		],
	},
	{
		id: 'c02',
		order: 2,
		titleEs: 'Temas 2 y 3 — Arquitectura, registros y bits',
		titleEn: 'Topics 2 and 3 — Architecture, registers, and bits',
		descriptionEs:
			'Arquitectura Harvard, memoria Flash/RAM/EEPROM, registros SFR/GPR, bancos y operaciones con bits/hex.',
		descriptionEn:
			'Harvard architecture, Flash/RAM/EEPROM, SFR/GPR registers, banks, and bit/hex operations.',
		level: 'beginner',
		sourceDocs: ['Clase Tema 2 y 3 (1).pdf'],
		outcomesEs: [
			'Explicar arquitectura Harvard del PIC18',
			'Identificar SFR, GPR y bancos de memoria',
			'Usar mascaras y hexadecimal en codigo',
		],
		outcomesEn: [
			'Explain PIC18 Harvard architecture',
			'Identify SFR, GPR, and memory banks',
			'Use masks and hexadecimal in code',
		],
		lessons: [
			{
				id: 'c02-l1',
				titleEs: 'Arquitectura Harvard y sistema minimo',
				titleEn: 'Harvard architecture and minimum system',
				hrefEs: '/fundamentos/arquitectura/',
				hrefEn: '/en/fundamentos/arquitectura/',
				minutes: 35,
				type: 'theory',
				sourceDoc: 'Clase Tema 2 y 3 (1).pdf',
			},
			{
				id: 'c02-l2',
				titleEs: 'Registros SFR, GPR y bancos',
				titleEn: 'SFR, GPR registers and banks',
				hrefEs: '/fundamentos/registros/',
				hrefEn: '/en/fundamentos/registros/',
				minutes: 30,
				type: 'theory',
				sourceDoc: 'Clase Tema 2 y 3 (1).pdf',
			},
			{
				id: 'c02-l3',
				titleEs: 'Bits, hexadecimal y mascaras',
				titleEn: 'Bits, hexadecimal, and masks',
				hrefEs: '/fundamentos/bits-hex/',
				hrefEn: '/en/fundamentos/bits-hex/',
				minutes: 25,
				type: 'practice',
				sourceDoc: 'Clase Tema 2 y 3 (1).pdf',
			},
		],
	},
	{
		id: 'c03',
		order: 3,
		titleEs: 'Temas 2 y 3 — Ensamblador MPASM',
		titleEn: 'Topics 2 and 3 — MPASM assembly',
		descriptionEs:
			'Lenguaje ensamblador del PIC18: directivas, etiquetas, instrucciones y config bits.',
		descriptionEn:
			'PIC18 assembly: directives, labels, instructions, and config bits.',
		level: 'beginner',
		sourceDocs: ['instrucciones pic.pdf', 'Clase Tema 2 y 3 (1).pdf'],
		outcomesEs: [
			'Leer y escribir programas .ASM basicos',
			'Usar operaciones ALU del PIC18',
			'Configurar palabra CONFIG y cristal 20 MHz',
		],
		outcomesEn: [
			'Read and write basic .ASM programs',
			'Use PIC18 ALU operations',
			'Configure CONFIG word and 20 MHz crystal',
		],
		lessons: [
			{
				id: 'c03-l1',
				titleEs: 'Ensamblador MPASM: estructura de un programa',
				titleEn: 'MPASM assembly: program structure',
				hrefEs: '/fundamentos/ensamblador/',
				hrefEn: '/en/fundamentos/ensamblador/',
				minutes: 40,
				type: 'theory',
				sourceDoc: 'instrucciones pic.pdf',
			},
			{
				id: 'c03-l2',
				titleEs: 'Config bits y cristal 20 MHz',
				titleEn: 'Config bits and 20 MHz crystal',
				hrefEs: '/fundamentos/config-bits/',
				hrefEn: '/en/fundamentos/config-bits/',
				minutes: 25,
				type: 'theory',
				sourceDoc: 'PIC18LF4455-I-PT.PDF',
			},
		],
	},
	{
		id: 'c04',
		order: 4,
		titleEs: 'Preparacion Parcial I (Temas 1, 2 y 3)',
		titleEn: 'Partial I preparation (Topics 1, 2, and 3)',
		descriptionEs:
			'Repasa conceptos, arquitectura, registros y ensamblador. Presenta el examen interactivo del Parcial I.',
		descriptionEn:
			'Review concepts, architecture, registers, and assembly. Take the interactive Partial I exam.',
		level: 'applied',
		isParcialCheckpoint: true,
		parcialNumber: 1,
		sourceDocs: ['Tema 1. Conceptos Básicos (1).pdf', 'Clase Tema 2 y 3 (1).pdf'],
		outcomesEs: [
			'Explicar arquitectura Harvard sin mirar apuntes',
			'Describir funcion de WREG, STATUS y BSR',
			'Aprobar el examen interactivo del Parcial I',
		],
		outcomesEn: [
			'Explain Harvard architecture without notes',
			'Describe WREG, STATUS, and BSR roles',
			'Pass the interactive Partial I exam',
		],
		lessons: [
			{
				id: 'c04-l1',
				titleEs: 'Guia de repaso Parcial I',
				titleEn: 'Partial I review guide',
				hrefEs: '/parcial/parcial-1/',
				hrefEn: '/en/parcial/parcial-1/',
				minutes: 45,
				type: 'exam',
			},
			{
				id: 'c04-l2',
				titleEs: 'Guia teorica general (consulta)',
				titleEn: 'General theory guide (reference)',
				hrefEs: '/parcial/guia-teorica/',
				hrefEn: '/en/parcial/guia-teorica/',
				minutes: 30,
				type: 'reference',
				optional: true,
			},
		],
	},
	{
		id: 'c05',
		order: 5,
		titleEs: 'Temas 4 y 5 — MPLAB, GPIO y primer contacto',
		titleEn: 'Topics 4 and 5 — MPLAB, GPIO, and first hands-on',
		descriptionEs:
			'Herramientas del laboratorio, GPIO (TRIS/PORT/LAT), botones y primer LED en Proteus/placa.',
		descriptionEn:
			'Lab tools, GPIO (TRIS/PORT/LAT), buttons, and first LED in Proteus/board.',
		level: 'beginner',
		outcomesEs: [
			'Crear proyecto MPLAB para PIC18F4550',
			'Simular en Proteus con cristal y MCLR',
			'Configurar entradas y salidas digitales',
		],
		outcomesEn: [
			'Create MPLAB project for PIC18F4550',
			'Simulate in Proteus with crystal and MCLR',
			'Configure digital inputs and outputs',
		],
		lessons: [
			{
				id: 'c05-l1',
				titleEs: 'MPLAB v8, MPLAB X y Proteus',
				titleEn: 'MPLAB v8, MPLAB X, and Proteus',
				hrefEs: '/fundamentos/mplab-proteus/',
				hrefEn: '/en/fundamentos/mplab-proteus/',
				minutes: 30,
				type: 'tool',
			},
			{
				id: 'c05-l2',
				titleEs: 'GPIO: TRIS, PORT y LAT',
				titleEn: 'GPIO: TRIS, PORT, and LAT',
				hrefEs: '/gpio/',
				hrefEn: '/en/gpio/',
				minutes: 30,
				type: 'theory',
				sourceDoc: 'Clase Tema 2 y 3 (1).pdf',
			},
			{
				id: 'c05-l3',
				titleEs: 'Practica 0 — Primer LED',
				titleEn: 'Practice 0 — First LED',
				hrefEs: '/practicas/primer-led/',
				hrefEn: '/en/practicas/primer-led/',
				minutes: 45,
				type: 'lab',
			},
			{
				id: 'c05-l4',
				titleEs: 'Tutorial paso a paso: Primer LED',
				titleEn: 'Step-by-step tutorial: First LED',
				hrefEs: '/tutoriales/primer-led/',
				hrefEn: '/en/tutoriales/primer-led/',
				minutes: 30,
				type: 'lab',
			},
			{
				id: 'c05-l5',
				titleEs: 'Botones, pull-up y antirrebote',
				titleEn: 'Buttons, pull-up, and debounce',
				hrefEs: '/gpio/botones/',
				hrefEn: '/en/gpio/botones/',
				minutes: 25,
				type: 'theory',
			},
		],
	},
	{
		id: 'c06',
		order: 6,
		titleEs: 'Tema 5 — Practica 1: operaciones matematicas',
		titleEn: 'Topic 5 — Practice 1: math operations',
		descriptionEs:
			'Laboratorio oficial de operaciones ALU en ensamblador segun Practica 1 del curso.',
		descriptionEn:
			'Official lab for ALU operations in assembly per course Practice 1.',
		level: 'applied',
		sourceDocs: ['Practica 1  Operacion matematia.pdf'],
		outcomesEs: [
			'Implementar suma, resta y operaciones logicas en .ASM',
			'Montar diagrama en Proteus y placa',
			'Explicar oralmente el codigo del laboratorio',
		],
		outcomesEn: [
			'Implement add, subtract, and logic ops in .ASM',
			'Build schematic in Proteus and hardware',
			'Orally explain the lab code',
		],
		lessons: [
			{
				id: 'c06-l1',
				titleEs: 'Practica 1 — Operaciones matematicas',
				titleEn: 'Practice 1 — Math operations',
				hrefEs: '/practicas/operaciones-matematicas/',
				hrefEn: '/en/practicas/operaciones-matematicas/',
				minutes: 180,
				type: 'lab',
				sourceDoc: 'Practica 1  Operacion matematia.pdf',
			},
			{
				id: 'c06-l2',
				titleEs: 'Tutorial practica 1',
				titleEn: 'Practice 1 tutorial',
				hrefEs: '/tutoriales/practica-1/',
				hrefEn: '/en/tutoriales/practica-1/',
				minutes: 40,
				type: 'lab',
			},
		],
	},
	{
		id: 'c07',
		order: 7,
		titleEs: 'Preparacion Parcial II (Temas 4 y 5)',
		titleEn: 'Partial II preparation (Topics 4 and 5)',
		descriptionEs:
			'Repasa MPLAB, GPIO, botones y Practica 1. Presenta el examen interactivo del Parcial II.',
		descriptionEn:
			'Review MPLAB, GPIO, buttons, and Practice 1. Take the interactive Partial II exam.',
		level: 'applied',
		isParcialCheckpoint: true,
		parcialNumber: 2,
		sourceDocs: ['Practica 1  Operacion matematia.pdf'],
		outcomesEs: [
			'Configurar TRIS/PORT/LAT sin confundirlos',
			'Resolver ejercicios tipo Practica 1',
			'Aprobar el examen interactivo del Parcial II',
		],
		outcomesEn: [
			'Configure TRIS/PORT/LAT without confusing them',
			'Solve Practice 1 style exercises',
			'Pass the interactive Partial II exam',
		],
		lessons: [
			{
				id: 'c07-l1',
				titleEs: 'Guia de repaso Parcial II',
				titleEn: 'Partial II review guide',
				hrefEs: '/parcial/parcial-2/',
				hrefEn: '/en/parcial/parcial-2/',
				minutes: 45,
				type: 'exam',
			},
			{
				id: 'c07-l2',
				titleEs: 'Banco de ejercicios (consulta)',
				titleEn: 'Exercise bank (reference)',
				hrefEs: '/parcial/ejercicios/',
				hrefEn: '/en/parcial/ejercicios/',
				minutes: 30,
				type: 'practice',
				sourceDoc: 'Ejercicios II parcial 20252.pdf',
				optional: true,
			},
		],
	},
	{
		id: 'c08',
		order: 8,
		titleEs: 'Tema 6 — Interrupciones',
		titleEn: 'Topic 6 — Interrupts',
		descriptionEs:
			'Fuentes de interrupcion, INTCON, prioridades, ISR y buenas practicas (guardar contexto).',
		descriptionEn:
			'Interrupt sources, INTCON, priorities, ISR, and best practices (save context).',
		level: 'intermediate',
		sourceDocs: ['Clase Tema 6. Interrupciones.pdf'],
		outcomesEs: [
			'Listar fuentes de interrupcion del PIC18F4550',
			'Escribir una ISR correcta',
			'Limpiar banderas antes de RETFIE',
		],
		outcomesEn: [
			'List PIC18F4550 interrupt sources',
			'Write a correct ISR',
			'Clear flags before RETFIE',
		],
		lessons: [
			{
				id: 'c08-l1',
				titleEs: 'Interrupciones: concepto y registros',
				titleEn: 'Interrupts: concept and registers',
				hrefEs: '/interrupciones/',
				hrefEn: '/en/interrupciones/',
				minutes: 40,
				type: 'theory',
				sourceDoc: 'Clase Tema 6. Interrupciones.pdf',
			},
			{
				id: 'c08-l2',
				titleEs: 'Tutorial: Timers e interrupciones (practica 5)',
				titleEn: 'Tutorial: Timers and interrupts (practice 5)',
				hrefEs: '/tutoriales/practica-5/',
				hrefEn: '/en/tutoriales/practica-5/',
				minutes: 50,
				type: 'lab',
				optional: true,
			},
		],
	},
	{
		id: 'c09',
		order: 9,
		titleEs: 'Tema 7 — LCD y teclado matricial',
		titleEn: 'Topic 7 — LCD and matrix keyboard',
		descriptionEs:
			'Modulo LCD HD44780, teclado matricial y Practica 2 de laboratorio.',
		descriptionEn:
			'HD44780 LCD module, matrix keyboard, and lab Practice 2.',
		level: 'intermediate',
		sourceDocs: [
			'Clase Tema 7.1 Modulo LCD y 7.2 Teclado.pdf',
			'Practica 2  Teclado y  LCD.pdf',
		],
		outcomesEs: [
			'Inicializar LCD en modo 4 bits',
			'Escanear teclado matricial por filas/columnas',
			'Completar Practica 2 en Proteus y placa',
		],
		outcomesEn: [
			'Initialize LCD in 4-bit mode',
			'Scan matrix keyboard by rows/columns',
			'Complete Practice 2 in Proteus and hardware',
		],
		lessons: [
			{
				id: 'c09-l1',
				titleEs: 'LCD HD44780 y teclado matricial',
				titleEn: 'HD44780 LCD and matrix keyboard',
				hrefEs: '/comunicacion/lcd-teclado/',
				hrefEn: '/en/comunicacion/lcd-teclado/',
				minutes: 45,
				type: 'theory',
				sourceDoc: 'Clase Tema 7.1 Modulo LCD y 7.2 Teclado.pdf',
			},
			{
				id: 'c09-l2',
				titleEs: 'Practica 2 — Teclado y LCD',
				titleEn: 'Practice 2 — Keyboard and LCD',
				hrefEs: '/practicas/teclado-lcd/',
				hrefEn: '/en/practicas/teclado-lcd/',
				minutes: 180,
				type: 'lab',
				sourceDoc: 'Practica 2  Teclado y  LCD.pdf',
			},
			{
				id: 'c09-l3',
				titleEs: 'Tutorial practica 2',
				titleEn: 'Practice 2 tutorial',
				hrefEs: '/tutoriales/practica-2/',
				hrefEn: '/en/tutoriales/practica-2/',
				minutes: 40,
				type: 'lab',
			},
		],
	},
	{
		id: 'c10',
		order: 10,
		titleEs: 'Tema 8 — Timers',
		titleEn: 'Topic 8 — Timers',
		descriptionEs:
			'Timer0, Timer1 y Timer2: prescalers, retardo preciso, contador de pulsos y Practica 3.',
		descriptionEn:
			'Timer0, Timer1, and Timer2: prescalers, precise delay, pulse counter, and Practice 3.',
		level: 'intermediate',
		sourceDocs: [
			'Clase Tema 8. Timer.pdf',
			'Practica 3  Frecuencimetro con  Displays Multiplexado.pdf',
		],
		outcomesEs: [
			'Configurar T0CON, T1CON y PR2',
			'Calcular overflow para un retardo dado',
			'Completar Practica 3 frecuencimetro',
		],
		outcomesEn: [
			'Configure T0CON, T1CON, and PR2',
			'Calculate overflow for a given delay',
			'Complete Practice 3 frequency meter',
		],
		lessons: [
			{
				id: 'c10-l1',
				titleEs: 'Timer 0: retardo y contador',
				titleEn: 'Timer 0: delay and counter',
				hrefEs: '/timers/timer0/',
				hrefEn: '/en/timers/timer0/',
				minutes: 40,
				type: 'theory',
				sourceDoc: 'Clase Tema 8. Timer.pdf',
			},
			{
				id: 'c10-l2',
				titleEs: 'Timer 1 y Timer 2',
				titleEn: 'Timer 1 and Timer 2',
				hrefEs: '/timers/timer1-timer2/',
				hrefEn: '/en/timers/timer1-timer2/',
				minutes: 35,
				type: 'theory',
				sourceDoc: 'Clase Tema 8. Timer.pdf',
			},
			{
				id: 'c10-l3',
				titleEs: 'Practica 3 — Frecuencimetro',
				titleEn: 'Practice 3 — Frequency meter',
				hrefEs: '/practicas/frecuencimetro/',
				hrefEn: '/en/practicas/frecuencimetro/',
				minutes: 180,
				type: 'lab',
				sourceDoc: 'Practica 3  Frecuencimetro con  Displays Multiplexado.pdf',
			},
			{
				id: 'c10-l4',
				titleEs: 'Tutorial practica 3',
				titleEn: 'Practice 3 tutorial',
				hrefEs: '/tutoriales/practica-3/',
				hrefEn: '/en/tutoriales/practica-3/',
				minutes: 40,
				type: 'lab',
			},
		],
	},
	{
		id: 'c11',
		order: 11,
		titleEs: 'Tema 9 — PWM y modulo CCP',
		titleEn: 'Topic 9 — PWM and CCP module',
		descriptionEs:
			'Modo PWM con Timer2, duty cycle, CCP1 en RC2, practicas 4 y 6.',
		descriptionEn:
			'PWM mode with Timer2, duty cycle, CCP1 on RC2, practices 4 and 6.',
		level: 'intermediate',
		sourceDocs: [
			'Clase Tema 9. Modulo CCP (PWM).pdf',
			'Practica 6 Motor Paso a Paso.pdf',
		],
		outcomesEs: [
			'Calcular PR2 y CCPR1L para un duty dado',
			'Configurar CCP1CON en modo PWM',
			'Controlar motor paso a paso (Practica 6)',
		],
		outcomesEn: [
			'Calculate PR2 and CCPR1L for a given duty',
			'Configure CCP1CON in PWM mode',
			'Control stepper motor (Practice 6)',
		],
		lessons: [
			{
				id: 'c11-l1',
				titleEs: 'PWM / CCP: teoria y registros',
				titleEn: 'PWM / CCP: theory and registers',
				hrefEs: '/pwm/',
				hrefEn: '/en/pwm/',
				minutes: 35,
				type: 'theory',
				sourceDoc: 'Clase Tema 9. Modulo CCP (PWM).pdf',
			},
			{
				id: 'c11-l2',
				titleEs: 'Tutorial: PWM (practica 4)',
				titleEn: 'Tutorial: PWM (practice 4)',
				hrefEs: '/tutoriales/practica-4/',
				hrefEn: '/en/tutoriales/practica-4/',
				minutes: 50,
				type: 'lab',
			},
			{
				id: 'c11-l3',
				titleEs: 'Practica 6 — Motor paso a paso',
				titleEn: 'Practice 6 — Stepper motor',
				hrefEs: '/practicas/motor-paso-a-paso/',
				hrefEn: '/en/practicas/motor-paso-a-paso/',
				minutes: 180,
				type: 'lab',
				sourceDoc: 'Practica 6 Motor Paso a Paso.pdf',
			},
			{
				id: 'c11-l4',
				titleEs: 'Tutorial practica 6',
				titleEn: 'Practice 6 tutorial',
				hrefEs: '/tutoriales/practica-6/',
				hrefEn: '/en/tutoriales/practica-6/',
				minutes: 40,
				type: 'lab',
			},
		],
	},
	{
		id: 'c12',
		order: 12,
		titleEs: 'Preparacion Parcial III (Temas 6, 7, 8 y 9 PWM)',
		titleEn: 'Partial III preparation (Topics 6, 7, 8, and 9 PWM)',
		descriptionEs:
			'Repasa interrupciones, LCD/teclado, timers, PWM y practicas 2, 3 y 6. Examen del Parcial III.',
		descriptionEn:
			'Review interrupts, LCD/keyboard, timers, PWM, and practices 2, 3, and 6. Partial III exam.',
		level: 'applied',
		isParcialCheckpoint: true,
		parcialNumber: 3,
		outcomesEs: [
			'Resolver ejercicios de timers e interrupciones',
			'Explicar PWM con PR2 y CCPR1L',
			'Aprobar el examen interactivo del Parcial III',
		],
		outcomesEn: [
			'Solve timer and interrupt exercises',
			'Explain PWM with PR2 and CCPR1L',
			'Pass the interactive Partial III exam',
		],
		lessons: [
			{
				id: 'c12-l1',
				titleEs: 'Guia de repaso Parcial III',
				titleEn: 'Partial III review guide',
				hrefEs: '/parcial/parcial-3/',
				hrefEn: '/en/parcial/parcial-3/',
				minutes: 60,
				type: 'exam',
			},
			{
				id: 'c12-l2',
				titleEs: 'Banco de ejercicios II parcial',
				titleEn: 'Midterm II exercise bank',
				hrefEs: '/parcial/ejercicios/',
				hrefEn: '/en/parcial/ejercicios/',
				minutes: 60,
				type: 'practice',
				sourceDoc: 'Ejercicios II parcial 20252.pdf',
			},
		],
	},
	{
		id: 'c13',
		order: 13,
		titleEs: 'Tema 9 — Convertidor A/D (ADC)',
		titleEn: 'Topic 9 — A/D converter (ADC)',
		descriptionEs:
			'Modulo ADC de 10 bits: ADCON0/1/2, canales analogicos y Practica 7.',
		descriptionEn:
			'10-bit ADC module: ADCON0/1/2, analog channels, and Practice 7.',
		level: 'intermediate',
		sourceDocs: ['Tema 9. CAD.pdf', 'Practica 7 Convertidor AD.pdf'],
		outcomesEs: [
			'Configurar ADCON1 para canal analogico',
			'Leer potenciometro en AN0',
			'Completar Practica 7 en laboratorio',
		],
		outcomesEn: [
			'Configure ADCON1 for analog channel',
			'Read potentiometer on AN0',
			'Complete Practice 7 in the lab',
		],
		lessons: [
			{
				id: 'c13-l1',
				titleEs: 'ADC de 10 bits en PIC18F4550',
				titleEn: '10-bit ADC on PIC18F4550',
				hrefEs: '/adc/',
				hrefEn: '/en/adc/',
				minutes: 40,
				type: 'theory',
				sourceDoc: 'Tema 9. CAD.pdf',
			},
			{
				id: 'c13-l2',
				titleEs: 'Practica 7 — Convertidor AD',
				titleEn: 'Practice 7 — A/D converter',
				hrefEs: '/practicas/convertidor-ad/',
				hrefEn: '/en/practicas/convertidor-ad/',
				minutes: 120,
				type: 'lab',
				sourceDoc: 'Practica 7 Convertidor AD.pdf',
			},
			{
				id: 'c13-l3',
				titleEs: 'Tutorial paso a paso: Practica 7',
				titleEn: 'Step-by-step tutorial: Practice 7',
				hrefEs: '/tutoriales/practica-7/',
				hrefEn: '/en/tutoriales/practica-7/',
				minutes: 45,
				type: 'lab',
			},
		],
	},
	{
		id: 'c14',
		order: 14,
		titleEs: 'Tema 10 — Comunicacion serial',
		titleEn: 'Topic 10 — Serial communication',
		descriptionEs:
			'EUSART/UART, SPI/I2C, USB opcional y Practica 8 de comunicacion serial.',
		descriptionEn:
			'EUSART/UART, SPI/I2C, optional USB, and Practice 8 serial communication.',
		level: 'advanced',
		sourceDocs: [
			'Tema 10. Comunicación serial.pdf',
			'Practica 8  Comunicacion serial_M3.pdf',
		],
		outcomesEs: [
			'Configurar UART a 9600 baud @ 20 MHz',
			'Explicar trama asincrona NRZ',
			'Completar Practica 8 con MAX232',
		],
		outcomesEn: [
			'Configure UART at 9600 baud @ 20 MHz',
			'Explain NRZ async frame',
			'Complete Practice 8 with MAX232',
		],
		lessons: [
			{
				id: 'c14-l1',
				titleEs: 'UART / EUSART',
				titleEn: 'UART / EUSART',
				hrefEs: '/comunicacion/uart/',
				hrefEn: '/en/comunicacion/uart/',
				minutes: 40,
				type: 'theory',
				sourceDoc: 'Tema 10. Comunicación serial.pdf',
			},
			{
				id: 'c14-l2',
				titleEs: 'SPI e I2C (MSSP)',
				titleEn: 'SPI and I2C (MSSP)',
				hrefEs: '/comunicacion/spi-i2c/',
				hrefEn: '/en/comunicacion/spi-i2c/',
				minutes: 35,
				type: 'theory',
				sourceDoc: 'PIC18LF4455-I-PT.PDF',
			},
			{
				id: 'c14-l3',
				titleEs: 'USB del PIC18F4550',
				titleEn: 'PIC18F4550 USB',
				hrefEs: '/comunicacion/usb/',
				hrefEn: '/en/comunicacion/usb/',
				minutes: 25,
				type: 'theory',
				optional: true,
			},
			{
				id: 'c14-l4',
				titleEs: 'Practica 8 — Comunicacion serial',
				titleEn: 'Practice 8 — Serial communication',
				hrefEs: '/practicas/comunicacion-serial/',
				hrefEn: '/en/practicas/comunicacion-serial/',
				minutes: 150,
				type: 'lab',
				sourceDoc: 'Practica 8  Comunicacion serial_M3.pdf',
			},
			{
				id: 'c14-l5',
				titleEs: 'Tutorial practica 8',
				titleEn: 'Practice 8 tutorial',
				hrefEs: '/tutoriales/practica-8/',
				hrefEn: '/en/tutoriales/practica-8/',
				minutes: 40,
				type: 'lab',
			},
		],
	},
	{
		id: 'c15',
		order: 15,
		titleEs: 'Preparacion Parcial IV (ADC, serial y cierre)',
		titleEn: 'Partial IV preparation (ADC, serial, and wrap-up)',
		descriptionEs:
			'Repasa ADC, UART, practicas 7 y 8, proyecto integrador y examen del Parcial IV.',
		descriptionEn:
			'Review ADC, UART, practices 7 and 8, integrator project, and Partial IV exam.',
		level: 'applied',
		isParcialCheckpoint: true,
		parcialNumber: 4,
		sourceDocs: ['Ejercicios II parcial 20252.pdf'],
		outcomesEs: [
			'Integrar ADC + UART en un mismo proyecto',
			'Plantear proyecto que combine 3+ modulos',
			'Aprobar el examen interactivo del Parcial IV',
		],
		outcomesEn: [
			'Integrate ADC + UART in one project',
			'Design project combining 3+ modules',
			'Pass the interactive Partial IV exam',
		],
		lessons: [
			{
				id: 'c15-l1',
				titleEs: 'Guia de repaso Parcial IV',
				titleEn: 'Partial IV review guide',
				hrefEs: '/parcial/parcial-4/',
				hrefEn: '/en/parcial/parcial-4/',
				minutes: 60,
				type: 'exam',
			},
			{
				id: 'c15-l2',
				titleEs: 'Proyecto final tipo parcial',
				titleEn: 'Final partial-style project',
				hrefEs: '/parcial/proyecto-final/',
				hrefEn: '/en/parcial/proyecto-final/',
				minutes: 120,
				type: 'exam',
			},
			{
				id: 'c15-l3',
				titleEs: 'Tutorial proyecto integrador (practica 9)',
				titleEn: 'Integrator project tutorial (practice 9)',
				hrefEs: '/tutoriales/practica-9/',
				hrefEn: '/en/tutoriales/practica-9/',
				minutes: 50,
				type: 'lab',
			},
		],
	},
	{
		id: 'c16',
		order: 16,
		titleEs: 'Referencia y repaso general',
		titleEn: 'Reference and general review',
		descriptionEs:
			'Glosario, guia de registros y ejercicios interactivos para consulta durante todo el semestre.',
		descriptionEn:
			'Glossary, register guide, and interactive exercises for use throughout the semester.',
		level: 'applied',
		outcomesEs: [
			'Consultar registros clave sin memorizar el datasheet',
			'Repasar terminos antes de cualquier parcial',
		],
		outcomesEn: [
			'Look up key registers without memorizing the datasheet',
			'Review terms before any partial exam',
		],
		lessons: [
			{
				id: 'c16-l1',
				titleEs: 'Glosario y guia rapida de registros',
				titleEn: 'Glossary and quick register guide',
				hrefEs: '/referencia/glosario/',
				hrefEn: '/en/referencia/glosario/',
				minutes: 30,
				type: 'reference',
				sourceDoc: 'PIC18LF4455-I-PT.PDF',
			},
			{
				id: 'c16-l2',
				titleEs: 'Guia de registros (referencia)',
				titleEn: 'Register guide (reference)',
				hrefEs: '/referencia/guia-registros/',
				hrefEn: '/en/referencia/guia-registros/',
				minutes: 25,
				type: 'reference',
				sourceDoc: 'PIC18LF4455-I-PT.PDF',
			},
			{
				id: 'c16-l3',
				titleEs: 'Ejercicios interactivos con checklist',
				titleEn: 'Interactive exercises with checklist',
				hrefEs: '/tutoriales/ejercicios/',
				hrefEn: '/en/tutoriales/ejercicios/',
				minutes: 45,
				type: 'practice',
			},
		],
	},
];

export function getStudyPathStats() {
	const courses = studyPathCourses.length;
	const lessons = studyPathCourses.reduce((n, c) => n + c.lessons.length, 0);
	const minutes = studyPathCourses.reduce(
		(n, c) => n + c.lessons.reduce((m, l) => m + l.minutes, 0),
		0,
	);
	const hours = Math.round(minutes / 60);
	const parciales = studyPathCourses.filter((c) => c.isParcialCheckpoint).length;
	return { courses, lessons, minutes, hours, parciales };
}

export const levelLabels: Record<
	StudyLevel,
	{ es: string; en: string }
> = {
	beginner: { es: 'Principiante', en: 'Beginner' },
	intermediate: { es: 'Intermedio', en: 'Intermediate' },
	advanced: { es: 'Avanzado', en: 'Advanced' },
	applied: { es: 'Aplicado', en: 'Applied' },
};

export const lessonTypeLabels: Record<
	LessonType,
	{ es: string; en: string; icon: string }
> = {
	theory: { es: 'Clase', en: 'Class', icon: 'document' },
	practice: { es: 'Ejercicio', en: 'Exercise', icon: 'pencil' },
	lab: { es: 'Laboratorio', en: 'Lab', icon: 'rocket' },
	exam: { es: 'Parcial', en: 'Exam', icon: 'approve-check' },
	tool: { es: 'Herramienta', en: 'Tool', icon: 'setting' },
	reference: { es: 'Referencia', en: 'Reference', icon: 'open-book' },
};
