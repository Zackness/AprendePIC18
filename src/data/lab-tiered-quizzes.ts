/**
 * Examenes por niveles para practicas de laboratorio.
 * Cada practica puede tener varios tiers desplegables (basico → UNEXPO).
 */

import type { PageQuiz, QuizQuestion } from './quizzes';

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

const p1CodeQuestions: QuizQuestion[] = [
	{
		id: 'u1',
		questionEs:
			'En el codigo de Practica 1, las variables `modo`, `oper_a` y `oper_b` se reservan en RAM a partir de la direccion 0x20. ¿Que tipo de memoria es esa?',
		questionEn:
			'In Practice 1 code, variables `modo`, `oper_a`, and `oper_b` are reserved in RAM from address 0x20. What memory type is that?',
		optionsEs: [
			'RAM de datos (GPR / memoria de usuario)',
			'Memoria Flash de programa',
			'EEPROM de datos',
			'Registro SFR del contador de programa',
		],
		optionsEn: [
			'Data RAM (GPR / user memory)',
			'Program Flash memory',
			'Data EEPROM',
			'Program counter SFR',
		],
		correctIndex: 0,
		explanationEs:
			'El bloque `cblock 0x20` reserva bytes en la RAM de datos. Ahi viven variables en tiempo de ejecucion, no instrucciones.',
		explanationEn:
			'The `cblock 0x20` block reserves bytes in data RAM. Runtime variables live there, not instructions.',
	},
	{
		id: 'u2',
		questionEs:
			'La rutina `division_software` al terminar deja el cociente en WREG. ¿En que variable RAM se acumula ese cociente antes del `MOVF cociente, W`?',
		questionEn:
			'When `division_software` finishes, the quotient is in WREG. Which RAM variable accumulates it before `MOVF cociente, W`?',
		optionsEs: ['`cociente`', '`resto`', '`modo`', '`PRODL`'],
		optionsEn: ['`cociente`', '`resto`', '`modo`', '`PRODL`'],
		correctIndex: 0,
		explanationEs: 'El bucle incrementa `cociente` con `INCF cociente, F` en cada resta valida.',
		explanationEn: 'The loop increments `cociente` with `INCF cociente, F` on each valid subtraction.',
	},
	{
		id: 'u3',
		questionEs:
			'En `op_mul`, la instruccion `MULWF oper_a` deja el producto de 16 bits en…',
		questionEn: 'In `op_mul`, the `MULWF oper_a` instruction leaves the 16-bit product in…',
		optionsEs: ['`PRODH:PRODL`', '`WREG` solamente', '`LATC:LATE`', '`STATUS`'],
		optionsEn: ['`PRODH:PRODL`', '`WREG` only', '`LATC:LATE`', '`STATUS`'],
		correctIndex: 0,
		explanationEs:
			'El hardware de multiplicacion del PIC18 deposita el resultado en el par PRODH:PRODL.',
		explanationEn:
			'The PIC18 hardware multiplier stores the result in the PRODH:PRODL pair.',
	},
	{
		id: 'u4',
		questionEs:
			'¿Que hace `MOVLW 0x0F` seguido de `MOVWF ADCON1` al inicio del programa?',
		questionEn: 'What does `MOVLW 0x0F` followed by `MOVWF ADCON1` at program start do?',
		optionsEs: [
			'Configura pines RA/RE como digitales (desactiva modo analogico)',
			'Enciende el oscilador interno de 4 MHz',
			'Pone todos los puertos como salida',
			'Habilita el Watchdog Timer',
		],
		optionsEn: [
			'Sets RA/RE pins as digital (disables analog mode)',
			'Turns on the 4 MHz internal oscillator',
			'Sets all ports as outputs',
			'Enables the Watchdog Timer',
		],
		correctIndex: 0,
		explanationEs:
			'ADCON1 controla la configuracion analogica/digital. 0x0F deja los pines como I/O digital.',
		explanationEn:
			'ADCON1 controls analog/digital setup. 0x0F configures pins as digital I/O.',
	},
	{
		id: 'u5',
		questionEs:
			'En `mostrar_resultado`, ¿por que se escribe en `LATC` y `LATE` en lugar de `PORTC`/`PORTE`?',
		questionEn:
			'In `mostrar_resultado`, why write to `LATC` and `LATE` instead of `PORTC`/`PORTE`?',
		optionsEs: [
			'LAT mantiene el nivel de salida escrito sin leer entradas mezcladas',
			'PORT solo funciona en modo analogico',
			'LAT es la unica memoria Flash',
			'Es obligatorio por el ensamblador MPASM',
		],
		optionsEn: [
			'LAT holds the written output level without read-modify-write issues',
			'PORT only works in analog mode',
			'LAT is the only Flash memory',
			'It is mandatory for MPASM assembler',
		],
		correctIndex: 0,
		explanationEs:
			'En salidas digitales conviene escribir el latch (LATx) para evitar efectos colaterales al leer PORTx.',
		explanationEn:
			'For digital outputs, writing the latch (LATx) avoids side effects when reading PORTx.',
	},
	{
		id: 'u6',
		questionEs:
			'Las instrucciones desde `inicio:` hasta `END` del programa, ¿en que memoria se almacenan al grabar el PIC?',
		questionEn:
			'Instructions from `inicio:` through `END`, where are they stored when programming the PIC?',
		optionsEs: [
			'Memoria Flash (programa)',
			'RAM de datos volatil',
			'EEPROM',
			'Solo en el archivo .hex del PC',
		],
		optionsEn: [
			'Flash memory (program)',
			'Volatile data RAM',
			'EEPROM',
			'Only in the PC .hex file',
		],
		correctIndex: 0,
		explanationEs:
			'El codigo maquina se graba en Flash. La RAM solo guarda variables mientras hay alimentacion.',
		explanationEn:
			'Machine code is stored in Flash. RAM only holds variables while powered.',
	},
	{
		id: 'u7',
		questionEs:
			'Tras `CALL division_software` en `op_div`, ¿que instruccion coloca el cociente en `PRODL` para mostrarlo?',
		questionEn:
			'After `CALL division_software` in `op_div`, which instruction puts the quotient in `PRODL` for display?',
		optionsEs: ['`MOVWF PRODL`', '`MOVWF LATC`', '`MULWF oper_a`', '`CLRF PRODH`'],
		optionsEn: ['`MOVWF PRODL`', '`MOVWF LATC`', '`MULWF oper_a`', '`CLRF PRODH`'],
		correctIndex: 0,
		explanationEs:
			'El cociente llega en WREG desde la rutina; `MOVWF PRODL` lo deja listo para `mostrar_resultado`.',
		explanationEn:
			'The quotient returns in WREG; `MOVWF PRODL` prepares it for `mostrar_resultado`.',
	},
	{
		id: 'u8',
		questionEs:
			'En `op_rot`, la instruccion `RLNCF WREG, W` sobre el operando A corresponde a la operacion…',
		questionEn:
			'In `op_rot`, instruction `RLNCF WREG, W` on operand A corresponds to…',
		optionsEs: [
			'Rotar izquierda sin acarreo (bit 7 pasa al bit 0)',
			'Rotar izquierda usando la bandera C de STATUS',
			'Complemento a uno',
			'Desplazamiento aritmetico a la derecha',
		],
		optionsEn: [
			'Rotate left without carry (bit 7 wraps to bit 0)',
			'Rotate left through STATUS C flag',
			'One\'s complement',
			'Arithmetic shift right',
		],
		correctIndex: 0,
		explanationEs:
			'`RLNCF` rota sin acarreo; `RLCF` usa el bit C. La practica pide rotar sin acarreo.',
		explanationEn:
			'`RLNCF` rotates without carry; `RLCF` uses the C bit. The lab asks for rotate without carry.',
	},
	{
		id: 'u9',
		questionEs:
			'¿Que valor tiene `TRISB` inmediatamente despues de `MOVLW 0xFF` / `MOVWF TRISB` en la inicializacion?',
		questionEn:
			'What is the value of `TRISB` right after `MOVLW 0xFF` / `MOVWF TRISB` during init?',
		optionsEs: [
			'0xFF (todos los pines de PORTB como entrada)',
			'0x00 (todos como salida)',
			'0x0F (solo RA analogicos)',
			'Indeterminado hasta leer PORTB',
		],
		optionsEn: [
			'0xFF (all PORTB pins as inputs)',
			'0x00 (all as outputs)',
			'0x0F (analog RA only)',
			'Undefined until reading PORTB',
		],
		correctIndex: 0,
		explanationEs: 'En TRISx, bit 1 = entrada, bit 0 = salida. 0xFF configura los 8 pines como entradas.',
		explanationEn: 'In TRISx, bit 1 = input, bit 0 = output. 0xFF sets all 8 pins as inputs.',
	},
	{
		id: 'u10',
		questionEs:
			'Si el profesor pregunta en oral: "¿Que hace `revisar_pulsador` cuando detecta flanco en RA0?", la respuesta correcta es…',
		questionEn:
			'If asked orally: "What does `revisar_pulsador` do when it detects an edge on RA0?", the correct answer is…',
		optionsEs: [
			'Incrementa `modo` y vuelve a 0 al pasar de 8',
			'Suma PORTB + PORTD',
			'Reinicia el PIC con CLRWDT',
			'Guarda el resultado en EEPROM',
		],
		optionsEn: [
			'Increments `modo` and wraps to 0 after 8',
			'Adds PORTB + PORTD',
			'Resets the PIC with CLRWDT',
			'Saves the result to EEPROM',
		],
		correctIndex: 0,
		explanationEs:
			'RA0 selecciona la operacion activa; hay 9 modos (0..8) y el contador se reinicia tras el ultimo.',
		explanationEn:
			'RA0 selects the active operation; there are 9 modes (0..8) and the counter wraps after the last.',
	},
];

export const tieredLabExams: TieredLabExam[] = [
	{
		practiceSlug: 'practicas/operaciones-matematicas',
		titleEs: 'Practica 1 — Operaciones matematicas',
		titleEn: 'Practice 1 — Math operations',
		sourceDoc: 'Practica 1  Operacion matematia.pdf',
		tiers: [
			{
				tierId: 'basico',
				slug: 'practicas/operaciones-matematicas/basico',
				titleEs: 'Nivel basico — Repaso del enunciado',
				titleEn: 'Basic level — Lab brief review',
				levelEs: 'Basico',
				levelEn: 'Basic',
				descriptionEs:
					'Preguntas directas sobre el diagrama y la descripcion de la practica. Ideal antes del laboratorio.',
				descriptionEn:
					'Straightforward questions about the schematic and lab description. Good before the lab session.',
				authMode: 'none',
				sourceDoc: 'Practica 1  Operacion matematia.pdf',
				questions: [
					{
						id: 'b1',
						questionEs: 'En Practica 1, el pulsador que cambia la operacion esta en…',
						questionEn: 'In Practice 1, the button that changes the operation is on…',
						optionsEs: ['RA0', 'RB7', 'RC6', 'RD0'],
						optionsEn: ['RA0', 'RB7', 'RC6', 'RD0'],
						correctIndex: 0,
					},
					{
						id: 'b2',
						questionEs: 'Los operandos de entrada estan en los puertos…',
						questionEn: 'Input operands are on ports…',
						optionsEs: ['B y D (switches)', 'A y E solamente', 'C y UART', 'Solo RE'],
						optionsEn: ['B and D (switches)', 'A and E only', 'C and UART', 'RE only'],
						correctIndex: 0,
					},
					{
						id: 'b3',
						questionEs: 'El resultado se visualiza principalmente en…',
						questionEn: 'The result is mainly displayed on…',
						optionsEs: ['LEDs en puertos C y E', 'LCD en RD', 'Monitor UART', 'Solo RA0'],
						optionsEn: ['LEDs on ports C and E', 'LCD on RD', 'UART monitor', 'RA0 only'],
						correctIndex: 0,
					},
					{
						id: 'b4',
						questionEs: 'La division en esta practica se implementa…',
						questionEn: 'Division in this practice is implemented…',
						optionsEs: [
							'Por software (no hay DIV nativo)',
							'Con instruccion DIV de hardware',
							'Solo en lenguaje C',
							'Mediante el modulo USB',
						],
						optionsEn: [
							'In software (no native DIV)',
							'With a hardware DIV instruction',
							'In C language only',
							'Via the USB module',
						],
						correctIndex: 0,
					},
				],
			},
			{
				tierId: 'intermedio',
				slug: 'practicas/operaciones-matematicas/intermedio',
				titleEs: 'Nivel intermedio — Puertos y ALU',
				titleEn: 'Intermediate level — Ports and ALU',
				levelEs: 'Intermedio',
				levelEn: 'Intermediate',
				descriptionEs:
					'Registros TRIS/LAT/PORT, ALU e instrucciones aritmeticas. Nivel pregunta de informe.',
				descriptionEn:
					'TRIS/LAT/PORT registers, ALU and arithmetic instructions. Report-style questions.',
				authMode: 'login',
				sourceDoc: 'Practica 1  Operacion matematia.pdf',
				questions: [
					{
						id: 'i1',
						questionEs: '¿Que hace la ALU del PIC18F4550 dentro del ciclo de ejecucion?',
						questionEn: 'What does the PIC18F4550 ALU do within the execution cycle?',
						optionsEs: [
							'Operaciones aritmeticas y logicas sobre datos en registros',
							'Genera la senal PWM del Timer2',
							'Graba automaticamente en EEPROM',
							'Convierte analogico-digital sin configuracion',
						],
						optionsEn: [
							'Arithmetic and logic operations on register data',
							'Generates Timer2 PWM signal',
							'Automatically writes EEPROM',
							'Converts analog-digital with no setup',
						],
						correctIndex: 0,
					},
					{
						id: 'i2',
						questionEs:
							'Para leer el estado de un switch conectado a RB3, ¿que registro debes consultar?',
						questionEn:
							'To read a switch state on RB3, which register should you read?',
						optionsEs: ['PORTB', 'LATB', 'TRISB', 'WPUB'],
						optionsEn: ['PORTB', 'LATB', 'TRISB', 'WPUB'],
						correctIndex: 0,
					},
					{
						id: 'i3',
						questionEs:
							'¿Por que RC6 y RC7 pueden impedir usar todo PORTC como salida simple en algunos montajes?',
						questionEn:
							'Why can RC6 and RC7 prevent using all of PORTC as simple outputs in some builds?',
						optionsEs: [
							'Son funciones alternativas (p. ej. UART TX/RX)',
							'Son entradas analogicas fijas sin configuracion',
							'No existen en el PIC18F4550',
							'Solo funcionan con cristal de 32 kHz',
						],
						optionsEn: [
							'Alternate functions (e.g. UART TX/RX)',
							'Fixed analog inputs with no configuration',
							'They do not exist on PIC18F4550',
							'They only work with a 32 kHz crystal',
						],
						correctIndex: 0,
					},
					{
						id: 'i4',
						questionEs:
							'La diferencia clave entre operacion por hardware y por software en esta practica es…',
						questionEn:
							'The key difference between hardware and software operations in this lab is…',
						optionsEs: [
							'Hardware usa instrucciones nativas (ADDWF, MULWF); software usa algoritmos (division)',
							'Hardware solo existe en C; software solo en ensamblador',
							'No hay diferencia en PIC18',
							'Software siempre es mas rapido que hardware',
						],
						optionsEn: [
							'Hardware uses native instructions (ADDWF, MULWF); software uses algorithms (divide)',
							'Hardware exists only in C; software only in assembly',
							'There is no difference on PIC18',
							'Software is always faster than hardware',
						],
						correctIndex: 0,
					},
					{
						id: 'i5',
						questionEs:
							'En modo multiplicacion, ¿por que pueden encenderse LEDs tanto en PORTC como en PORTE?',
						questionEn:
							'In multiply mode, why can LEDs light on both PORTC and PORTE?',
						optionsEs: [
							'El producto es de 16 bits (PRODH en E, PRODL en C)',
							'PORTE es copia espejo de PORTB',
							'Es un error de cableado obligatorio',
							'Porque MULWF escribe en LATC directamente',
						],
						optionsEn: [
							'The product is 16 bits (PRODH on E, PRODL on C)',
							'PORTE mirrors PORTB',
							'It is a mandatory wiring error',
							'Because MULWF writes to LATC directly',
						],
						correctIndex: 0,
					},
				],
			},
			{
				tierId: 'unexpo',
				slug: 'practicas/operaciones-matematicas/unexpo',
				titleEs: 'Nivel UNEXPO — Codigo y oral de laboratorio',
				titleEn: 'UNEXPO level — Code and oral exam',
				levelEs: 'UNEXPO',
				levelEn: 'UNEXPO',
				descriptionEs:
					'Preguntas tipo profesor: analisis linea a linea del .ASM, registros, memoria e instrucciones. Preparate para la exposicion oral.',
				descriptionEn:
					'Professor-style questions: line-by-line .ASM analysis, registers, memory and instructions. Prepare for the oral exam.',
				authMode: 'login',
				sourceDoc: 'Practica 1  Operacion matematia.pdf + practica-1-operaciones.asm',
				questions: p1CodeQuestions,
			},
		],
	},
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
