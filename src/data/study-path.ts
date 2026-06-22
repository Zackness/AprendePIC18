export type LessonType =
	| 'theory'
	| 'practice'
	| 'lab'
	| 'exam'
	| 'tool'
	| 'reference'
	| 'guide';
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
	/** Marca la leccion al completar todos los pasos de una guia practica (puertos, alu, …) */
	autoSkillSeries?: string;
	/** Marca la leccion al completar todos los pasos del tutorial interactivo */
	autoPracticeSlug?: string;
}

export type StudyPhaseId = 'comienzo' | 'fundamentos' | 'curso' | 'parcial' | 'referencia';

export interface StudyPhaseMeta {
	id: StudyPhaseId;
	titleEs: string;
	titleEn: string;
	introEs: string;
	introEn: string;
}

export const studyPathPhases: StudyPhaseMeta[] = [
	{
		id: 'comienzo',
		titleEs: 'Comienzo',
		titleEn: 'Getting started',
		introEs:
			'Que es el PIC18F4550 y como se compara con otras plataformas. Lee esto antes de tocar registros o MPLAB.',
		introEn:
			'What the PIC18F4550 is and how it compares to other platforms. Read this before registers or MPLAB.',
	},
	{
		id: 'fundamentos',
		titleEs: 'Fundamentos (Temas 2 y 3)',
		titleEn: 'Foundations (Topics 2 and 3)',
		introEs:
			'Arquitectura, registros, ensamblador y tu primer programa. La teoria va seguida de MPLAB, una guia practica y el tutorial del Primer LED.',
		introEn:
			'Architecture, registers, assembly, and your first program. Theory is followed by MPLAB, a practical guide, and the First LED tutorial.',
	},
	{
		id: 'parcial',
		titleEs: 'Preparacion de parcial',
		titleEn: 'Exam preparation',
		introEs: 'Repaso y examen interactivo justo despues de los temas que evalua cada parcial.',
		introEn: 'Review and interactive exam right after the topics each partial covers.',
	},
	{
		id: 'curso',
		titleEs: 'Curso — teoria y laboratorio',
		titleEn: 'Course — theory and lab',
		introEs:
			'Perifericos, practicas UNEXPO y guias intercaladas. Sigue el orden: clase → guia (si aplica) → laboratorio.',
		introEn:
			'Peripherals, UNEXPO labs, and interleaved guides. Follow: class → guide (if any) → lab.',
	},
	{
		id: 'referencia',
		titleEs: 'Referencia y repaso',
		titleEn: 'Reference and review',
		introEs: 'Consulta rapida durante todo el semestre. No forma parte del flujo obligatorio inicial.',
		introEn: 'Quick lookup throughout the semester. Not part of the mandatory initial flow.',
	},
];

export interface StudyCourse {
	id: string;
	order: number;
	phase: StudyPhaseId;
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
		'Sigue el orden del curso UNEXPO: Comienzo → Fundamentos → teoria con tutoriales intercalados. Un solo progreso para clases, guias y laboratorios.',
	subtitleEn:
		'Follow the UNEXPO course order: Getting started → Foundations → theory with interleaved tutorials. One progress bar for classes, guides, and labs.',
};

export const studyPathCourses: StudyCourse[] = [
	{
		id: 'c01',
		order: 1,
		phase: 'comienzo',
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
			'Clasificar memorias ROM, Flash, RAM y EEPROM',
			'Distinguir perifericos internos y externos',
			'Describir bloques internos del PIC18F4550',
		],
		outcomesEn: [
			'Distinguish microcontroller from microprocessor',
			'Classify ROM, Flash, RAM, and EEPROM memories',
			'Tell internal peripherals from external ones',
			'Describe PIC18F4550 internal blocks',
		],
		lessons: [
			{
				id: 'c01-l0',
				titleEs: 'Conceptos basicos del microcontrolador',
				titleEn: 'Basic microcontroller concepts',
				hrefEs: '/introduccion/conceptos-basicos/',
				hrefEn: '/en/introduccion/conceptos-basicos/',
				minutes: 35,
				type: 'theory',
				sourceDoc: 'Tema 1. Conceptos Básicos (1).pdf',
			},
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
		phase: 'fundamentos',
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
				minutes: 50,
				type: 'theory',
				sourceDoc: 'Clase Tema 2 y 3 (1).pdf',
			},
			{
				id: 'c02-l2',
				titleEs: 'Registros SFR, GPR y bancos',
				titleEn: 'SFR, GPR registers and banks',
				hrefEs: '/fundamentos/registros/',
				hrefEn: '/en/fundamentos/registros/',
				minutes: 45,
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
		phase: 'fundamentos',
		titleEs: 'Temas 2 y 3 — Ensamblador y primer programa',
		titleEn: 'Topics 2 and 3 — Assembly and first program',
		descriptionEs:
			'Lenguaje ensamblador, config bits, herramientas MPLAB/Proteus y tu primer .ASM que enciende un LED.',
		descriptionEn:
			'Assembly language, config bits, MPLAB/Proteus tools, and your first .ASM that turns on an LED.',
		level: 'beginner',
		sourceDocs: ['instrucciones pic.pdf', 'Clase Tema 2 y 3 (1).pdf'],
		outcomesEs: [
			'Leer y escribir programas .ASM basicos',
			'Configurar MPLAB y simular en Proteus',
			'Encender un LED aplicando TRIS y LAT (Primer LED)',
		],
		outcomesEn: [
			'Read and write basic .ASM programs',
			'Set up MPLAB and simulate in Proteus',
			'Turn on an LED using TRIS and LAT (First LED)',
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
			{
				id: 'c03-l3',
				titleEs: 'MPLAB v8, MPLAB X y Proteus',
				titleEn: 'MPLAB v8, MPLAB X, and Proteus',
				hrefEs: '/fundamentos/mplab-proteus/',
				hrefEn: '/en/fundamentos/mplab-proteus/',
				minutes: 45,
				type: 'tool',
			},
			{
				id: 'c03-l4g',
				titleEs: 'Guia practica — Puertos GPIO',
				titleEn: 'Practical guide — GPIO ports',
				hrefEs: '/tutoriales/guias/puertos/',
				hrefEn: '/en/tutoriales/guias/puertos/',
				minutes: 60,
				type: 'guide',
				autoSkillSeries: 'puertos',
			},
			{
				id: 'c03-l5',
				titleEs: 'Tutorial — Primer LED (primer programa)',
				titleEn: 'Tutorial — First LED (first program)',
				hrefEs: '/tutoriales/primer-led/',
				hrefEn: '/en/tutoriales/primer-led/',
				minutes: 90,
				type: 'lab',
				autoPracticeSlug: 'primer-led',
			},
		],
	},
	{
		id: 'c04',
		order: 4,
		phase: 'parcial',
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
		phase: 'curso',
		titleEs: 'Retardos por software',
		titleEn: 'Software delays',
		descriptionEs:
			'Ciclos de maquina, bucles anidados, calculo CM × Σ CI, NOP y BRA vs GOTO.',
		descriptionEn:
			'Machine cycles, nested loops, CM × Σ CI math, NOP, and BRA vs GOTO.',
		level: 'beginner',
		sourceDocs: ['Clase Tema 4 y 5.pdf'],
		outcomesEs: [
			'Calcular CM y retardo con CM × Σ CI',
			'Implementar retardos de 1, 2 y 3 bucles',
			'Resolver el retardo de 3 ms @ 20 MHz del parcial',
		],
		outcomesEn: [
			'Calculate CM and delay with CM × Σ CI',
			'Implement 1-, 2-, and 3-loop delays',
			'Solve the partial exam 3 ms delay @ 20 MHz',
		],
		lessons: [
			{
				id: 'c05-l1',
				titleEs: 'Introduccion a retardos',
				titleEn: 'Introduction to delays',
				hrefEs: '/retardos/',
				hrefEn: '/en/retardos/',
				minutes: 35,
				type: 'theory',
				sourceDoc: 'Clase Tema 4 y 5.pdf',
			},
			{
				id: 'c05-l2',
				titleEs: 'Ciclos de maquina e instruccion',
				titleEn: 'Machine and instruction cycles',
				hrefEs: '/retardos/ciclos-maquina/',
				hrefEn: '/en/retardos/ciclos-maquina/',
				minutes: 40,
				type: 'theory',
				sourceDoc: 'Clase Tema 4 y 5.pdf',
			},
			{
				id: 'c05-l3',
				titleEs: 'Bucles de retardo',
				titleEn: 'Delay loops',
				hrefEs: '/retardos/bucles/',
				hrefEn: '/en/retardos/bucles/',
				minutes: 45,
				type: 'theory',
				sourceDoc: 'Clase Tema 4 y 5.pdf',
			},
			{
				id: 'c05-l4',
				titleEs: 'Calculo y aplicaciones',
				titleEn: 'Calculation and applications',
				hrefEs: '/retardos/calculo-y-aplicaciones/',
				hrefEn: '/en/retardos/calculo-y-aplicaciones/',
				minutes: 55,
				type: 'theory',
				sourceDoc: 'Clase Tema 4 y 5.pdf',
			},
		],
	},
	{
		id: 'c06',
		order: 6,
		phase: 'curso',
		titleEs: 'GPIO — TRIS, PORT y LAT',
		titleEn: 'GPIO — TRIS, PORT, and LAT',
		descriptionEs:
			'Puertos digitales, entradas, salidas, botones y antirrebote para problemas del parcial.',
		descriptionEn:
			'Digital ports, inputs, outputs, buttons, and debounce for partial exam problems.',
		level: 'beginner',
		outcomesEs: [
			'Explicar diferencia entre PORT y LAT',
			'Configurar entradas con pull-up interno',
			'Implementar antirrebote basico',
		],
		outcomesEn: [
			'Explain PORT vs LAT difference',
			'Configure inputs with internal pull-up',
			'Implement basic debounce',
		],
		lessons: [
			{
				id: 'c06-l1',
				titleEs: 'GPIO: TRIS, PORT y LAT',
				titleEn: 'GPIO: TRIS, PORT, and LAT',
				hrefEs: '/gpio/',
				hrefEn: '/en/gpio/',
				minutes: 30,
				type: 'theory',
				sourceDoc: 'Clase Tema 2 y 3 (1).pdf',
			},
			{
				id: 'c06-l2',
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
		id: 'c07',
		order: 7,
		phase: 'curso',
		titleEs: 'Comparacion de registros',
		titleEn: 'Register comparisons',
		descriptionEs:
			'MOVF vs SUBWF, banderas C y Z, igual a cero, mayor/menor y subrutinas tipo parcial.',
		descriptionEn:
			'MOVF vs SUBWF, C and Z flags, zero compare, greater/less, and partial-style subroutines.',
		level: 'applied',
		sourceDocs: ['Clase Tema 4 y 5.pdf'],
		outcomesEs: [
			'Comparar registro con cero usando Z',
			'Implementar igual, menor y mayor con SUBWF',
			'Resolver ejercicios REG1 > REG2 y tabla C/Z',
		],
		outcomesEn: [
			'Compare register to zero using Z',
			'Implement equal, less, and greater with SUBWF',
			'Solve REG1 > REG2 and C/Z table exercises',
		],
		lessons: [
			{
				id: 'c07-l1',
				titleEs: 'Introduccion a comparaciones',
				titleEn: 'Introduction to comparisons',
				hrefEs: '/comparaciones/',
				hrefEn: '/en/comparaciones/',
				minutes: 20,
				type: 'theory',
				sourceDoc: 'Clase Tema 4 y 5.pdf',
			},
			{
				id: 'c07-l2',
				titleEs: 'Banderas C y Z',
				titleEn: 'C and Z flags',
				hrefEs: '/comparaciones/banderas-c-z/',
				hrefEn: '/en/comparaciones/banderas-c-z/',
				minutes: 35,
				type: 'theory',
				sourceDoc: 'Clase Tema 4 y 5.pdf',
			},
			{
				id: 'c07-l3',
				titleEs: 'Comparar con cero',
				titleEn: 'Compare to zero',
				hrefEs: '/comparaciones/igual-cero/',
				hrefEn: '/en/comparaciones/igual-cero/',
				minutes: 25,
				type: 'theory',
				sourceDoc: 'Clase Tema 4 y 5.pdf',
			},
			{
				id: 'c07-l4',
				titleEs: 'Comparar dos registros',
				titleEn: 'Compare two registers',
				hrefEs: '/comparaciones/entre-registros/',
				hrefEn: '/en/comparaciones/entre-registros/',
				minutes: 50,
				type: 'theory',
				sourceDoc: 'Clase Tema 4 y 5.pdf',
			},
		],
	},
	{
		id: 'c08',
		order: 8,
		phase: 'curso',
		titleEs: 'Practica 1 — Operaciones matematicas',
		titleEn: 'Practice 1 — Math operations',
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
				id: 'c08-l0g',
				titleEs: 'Guia practica — Operaciones ALU',
				titleEn: 'Practical guide — ALU operations',
				hrefEs: '/tutoriales/guias/alu/',
				hrefEn: '/en/tutoriales/guias/alu/',
				minutes: 55,
				type: 'guide',
				autoSkillSeries: 'alu',
			},
			{
				id: 'c08-l1',
				titleEs: 'Tutorial — Práctica 1: operaciones matemáticas',
				titleEn: 'Tutorial — Practice 1: math operations',
				hrefEs: '/tutoriales/practica-1/',
				hrefEn: '/en/tutoriales/practica-1/',
				minutes: 240,
				type: 'lab',
				sourceDoc: 'Practica 1  Operacion matematia.pdf',
				autoPracticeSlug: 'practica-1',
			},
		],
	},
	{
		id: 'c09',
		order: 9,
		phase: 'parcial',
		titleEs: 'Preparacion Parcial II',
		titleEn: 'Partial II preparation',
		descriptionEs:
			'Repasa retardos, comparaciones, GPIO y Practica 1. Presenta el examen interactivo al nivel del parcial real.',
		descriptionEn:
			'Review delays, comparisons, GPIO, and Practice 1. Take the interactive exam at real partial level.',
		level: 'applied',
		isParcialCheckpoint: true,
		parcialNumber: 2,
		sourceDocs: ['Clase Tema 4 y 5.pdf', 'Practica 1  Operacion matematia.pdf'],
		outcomesEs: [
			'Calcular retardos de ms con cristal 20 MHz',
			'Completar subrutinas de comparacion y tabla C/Z',
			'Resolver problemas con GPIO (bomba, robot, display)',
			'Aprobar el examen interactivo del Parcial II',
		],
		outcomesEn: [
			'Calculate ms delays with 20 MHz crystal',
			'Complete comparison subroutines and C/Z table',
			'Solve GPIO problems (pump, robot, display)',
			'Pass the interactive Partial II exam',
		],
		lessons: [
			{
				id: 'c09-l1',
				titleEs: 'Guia de repaso Parcial II',
				titleEn: 'Partial II review guide',
				hrefEs: '/parcial/parcial-2/',
				hrefEn: '/en/parcial/parcial-2/',
				minutes: 45,
				type: 'exam',
			},
			{
				id: 'c09-l2',
				titleEs: 'Banco de ejercicios Parcial II',
				titleEn: 'Partial II exercise bank',
				hrefEs: '/parcial/ejercicios/',
				hrefEn: '/en/parcial/ejercicios/',
				minutes: 60,
				type: 'practice',
				sourceDoc: 'Clase Tema 4 y 5.pdf',
				optional: true,
			},
		],
	},
	{
		id: 'c10',
		order: 10,
		phase: 'curso',
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
				id: 'c10-l1',
				titleEs: 'Interrupciones: concepto y registros',
				titleEn: 'Interrupts: concept and registers',
				hrefEs: '/interrupciones/',
				hrefEn: '/en/interrupciones/',
				minutes: 40,
				type: 'theory',
				sourceDoc: 'Clase Tema 6. Interrupciones.pdf',
			},
			{
				id: 'c10-l1g',
				titleEs: 'Guia practica — Interrupciones',
				titleEn: 'Practical guide — Interrupts',
				hrefEs: '/tutoriales/guias/interrupciones/',
				hrefEn: '/en/tutoriales/guias/interrupciones/',
				minutes: 55,
				type: 'guide',
				autoSkillSeries: 'interrupciones',
			},
			{
				id: 'c10-l2',
				titleEs: 'Tutorial: Timers e interrupciones (practica 5)',
				titleEn: 'Tutorial: Timers and interrupts (practice 5)',
				hrefEs: '/tutoriales/practica-5/',
				hrefEn: '/en/tutoriales/practica-5/',
				minutes: 90,
				type: 'lab',
				optional: true,
				autoPracticeSlug: 'practica-5',
			},
		],
	},
	{
		id: 'c11',
		order: 11,
		phase: 'curso',
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
				id: 'c11-l1',
				titleEs: 'LCD HD44780 y teclado matricial',
				titleEn: 'HD44780 LCD and matrix keyboard',
				hrefEs: '/comunicacion/lcd-teclado/',
				hrefEn: '/en/comunicacion/lcd-teclado/',
				minutes: 45,
				type: 'theory',
				sourceDoc: 'Clase Tema 7.1 Modulo LCD y 7.2 Teclado.pdf',
			},
			{
				id: 'c11-l2',
				titleEs: 'Tutorial — Práctica 2: teclado y LCD',
				titleEn: 'Tutorial — Practice 2: keyboard and LCD',
				hrefEs: '/tutoriales/practica-2/',
				hrefEn: '/en/tutoriales/practica-2/',
				minutes: 240,
				type: 'lab',
				sourceDoc: 'Practica 2  Teclado y  LCD.pdf',
				autoPracticeSlug: 'practica-2',
			},
		],
	},
	{
		id: 'c12',
		order: 12,
		phase: 'curso',
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
				id: 'c12-l1',
				titleEs: 'Timer 0: retardo y contador',
				titleEn: 'Timer 0: delay and counter',
				hrefEs: '/timers/timer0/',
				hrefEn: '/en/timers/timer0/',
				minutes: 40,
				type: 'theory',
				sourceDoc: 'Clase Tema 8. Timer.pdf',
			},
			{
				id: 'c12-l2',
				titleEs: 'Timer 1 y Timer 2',
				titleEn: 'Timer 1 and Timer 2',
				hrefEs: '/timers/timer1-timer2/',
				hrefEn: '/en/timers/timer1-timer2/',
				minutes: 35,
				type: 'theory',
				sourceDoc: 'Clase Tema 8. Timer.pdf',
			},
			{
				id: 'c12-l3',
				titleEs: 'Tutorial — Práctica 3: frecuencímetro',
				titleEn: 'Tutorial — Practice 3: frequency meter',
				hrefEs: '/tutoriales/practica-3/',
				hrefEn: '/en/tutoriales/practica-3/',
				minutes: 240,
				type: 'lab',
				sourceDoc: 'Practica 3  Frecuencimetro con  Displays Multiplexado.pdf',
				autoPracticeSlug: 'practica-3',
			},
		],
	},
	{
		id: 'c13',
		order: 13,
		phase: 'curso',
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
				id: 'c13-l1',
				titleEs: 'PWM / CCP: teoria y registros',
				titleEn: 'PWM / CCP: theory and registers',
				hrefEs: '/pwm/',
				hrefEn: '/en/pwm/',
				minutes: 35,
				type: 'theory',
				sourceDoc: 'Clase Tema 9. Modulo CCP (PWM).pdf',
			},
			{
				id: 'c13-l2',
				titleEs: 'Tutorial: PWM (practica 4)',
				titleEn: 'Tutorial: PWM (practice 4)',
				hrefEs: '/tutoriales/practica-4/',
				hrefEn: '/en/tutoriales/practica-4/',
				minutes: 90,
				type: 'lab',
				autoPracticeSlug: 'practica-4',
			},
			{
				id: 'c13-l3',
				titleEs: 'Tutorial — Práctica 6: motor paso a paso',
				titleEn: 'Tutorial — Practice 6: stepper motor',
				hrefEs: '/tutoriales/practica-6/',
				hrefEn: '/en/tutoriales/practica-6/',
				minutes: 240,
				type: 'lab',
				sourceDoc: 'Practica 6 Motor Paso a Paso.pdf',
				autoPracticeSlug: 'practica-6',
			},
		],
	},
	{
		id: 'c14',
		order: 14,
		phase: 'parcial',
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
				id: 'c14-l1',
				titleEs: 'Guia de repaso Parcial III',
				titleEn: 'Partial III review guide',
				hrefEs: '/parcial/parcial-3/',
				hrefEn: '/en/parcial/parcial-3/',
				minutes: 60,
				type: 'exam',
			},
			{
				id: 'c14-l2',
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
		id: 'c15',
		order: 15,
		phase: 'curso',
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
				id: 'c15-l1',
				titleEs: 'ADC de 10 bits en PIC18F4550',
				titleEn: '10-bit ADC on PIC18F4550',
				hrefEs: '/adc/',
				hrefEn: '/en/adc/',
				minutes: 40,
				type: 'theory',
				sourceDoc: 'Tema 9. CAD.pdf',
			},
			{
				id: 'c15-l2',
				titleEs: 'Tutorial — Práctica 7: convertidor A/D',
				titleEn: 'Tutorial — Practice 7: A/D converter',
				hrefEs: '/tutoriales/practica-7/',
				hrefEn: '/en/tutoriales/practica-7/',
				minutes: 180,
				type: 'lab',
				sourceDoc: 'Practica 7 Convertidor AD.pdf',
				autoPracticeSlug: 'practica-7',
			},
		],
	},
	{
		id: 'c16',
		order: 16,
		phase: 'curso',
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
				id: 'c16-l1',
				titleEs: 'UART / EUSART',
				titleEn: 'UART / EUSART',
				hrefEs: '/comunicacion/uart/',
				hrefEn: '/en/comunicacion/uart/',
				minutes: 40,
				type: 'theory',
				sourceDoc: 'Tema 10. Comunicación serial.pdf',
			},
			{
				id: 'c16-l2',
				titleEs: 'SPI e I2C (MSSP)',
				titleEn: 'SPI and I2C (MSSP)',
				hrefEs: '/comunicacion/spi-i2c/',
				hrefEn: '/en/comunicacion/spi-i2c/',
				minutes: 35,
				type: 'theory',
				sourceDoc: 'PIC18LF4455-I-PT.PDF',
			},
			{
				id: 'c16-l3',
				titleEs: 'USB del PIC18F4550',
				titleEn: 'PIC18F4550 USB',
				hrefEs: '/comunicacion/usb/',
				hrefEn: '/en/comunicacion/usb/',
				minutes: 25,
				type: 'theory',
				optional: true,
			},
			{
				id: 'c16-l4',
				titleEs: 'Tutorial — Práctica 8: comunicación serial',
				titleEn: 'Tutorial — Practice 8: serial communication',
				hrefEs: '/tutoriales/practica-8/',
				hrefEn: '/en/tutoriales/practica-8/',
				minutes: 210,
				type: 'lab',
				sourceDoc: 'Practica 8  Comunicacion serial_M3.pdf',
				autoPracticeSlug: 'practica-8',
			},
		],
	},
	{
		id: 'c17',
		order: 17,
		phase: 'parcial',
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
				id: 'c17-l1',
				titleEs: 'Guia de repaso Parcial IV',
				titleEn: 'Partial IV review guide',
				hrefEs: '/parcial/parcial-4/',
				hrefEn: '/en/parcial/parcial-4/',
				minutes: 60,
				type: 'exam',
			},
			{
				id: 'c17-l2',
				titleEs: 'Proyecto final tipo parcial',
				titleEn: 'Final partial-style project',
				hrefEs: '/parcial/proyecto-final/',
				hrefEn: '/en/parcial/proyecto-final/',
				minutes: 120,
				type: 'exam',
			},
			{
				id: 'c17-l3',
				titleEs: 'Tutorial proyecto integrador (practica 9)',
				titleEn: 'Integrator project tutorial (practice 9)',
				hrefEs: '/tutoriales/practica-9/',
				hrefEn: '/en/tutoriales/practica-9/',
				minutes: 120,
				type: 'lab',
				autoPracticeSlug: 'practica-9',
			},
		],
	},
	{
		id: 'c18',
		order: 18,
		phase: 'referencia',
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
				id: 'c18-l1',
				titleEs: 'Glosario y guia rapida de registros',
				titleEn: 'Glossary and quick register guide',
				hrefEs: '/referencia/glosario/',
				hrefEn: '/en/referencia/glosario/',
				minutes: 30,
				type: 'reference',
				sourceDoc: 'PIC18LF4455-I-PT.PDF',
			},
			{
				id: 'c18-l2',
				titleEs: 'Guia de registros (referencia)',
				titleEn: 'Register guide (reference)',
				hrefEs: '/referencia/guia-registros/',
				hrefEn: '/en/referencia/guia-registros/',
				minutes: 25,
				type: 'reference',
				sourceDoc: 'PIC18LF4455-I-PT.PDF',
			},
			{
				id: 'c18-l3',
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
	const blocks = studyPathCourses.length;
	const phases = new Set(studyPathCourses.map((c) => c.phase)).size;
	let lessons = 0;
	let coreLessons = 0;
	let guides = 0;
	let labs = 0;
	let minutes = 0;

	for (const course of studyPathCourses) {
		for (const lesson of course.lessons) {
			lessons += 1;
			minutes += lesson.minutes;
			if (!lesson.optional) coreLessons += 1;
			if (lesson.type === 'guide') guides += 1;
			if (lesson.type === 'lab') labs += 1;
		}
	}

	const hours = Math.ceil(minutes / 60);
	const parciales = studyPathCourses.filter((c) => c.isParcialCheckpoint).length;

	return {
		blocks,
		phases,
		lessons,
		coreLessons,
		guides,
		labs,
		minutes,
		hours,
		parciales,
		/** @deprecated use blocks */
		courses: blocks,
	};
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
	guide: { es: 'Guia practica', en: 'Practical guide', icon: 'rocket' },
};
