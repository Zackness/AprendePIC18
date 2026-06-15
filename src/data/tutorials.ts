export interface TutorialItem {
	id: string;
	labelEs: string;
	labelEn: string;
	hrefEs: string;
	hrefEn: string;
}

export interface TutorialUnit {
	id: string;
	titleEs: string;
	titleEn: string;
	descriptionEs: string;
	descriptionEn: string;
	items: TutorialItem[];
}

export interface PracticeTutorial {
	id: string;
	number: number;
	titleEs: string;
	titleEn: string;
	slug: string;
	stepsEs: string[];
	stepsEn: string[];
	docHrefEs: string;
	docHrefEn: string;
	ready: boolean;
	figures?: Array<{
		src: string;
		altEs: string;
		altEn: string;
		captionEs: string;
		captionEn: string;
		credit: string;
	}>;
}

export const courseUnits: TutorialUnit[] = [
	{
		id: 'inicio',
		titleEs: 'Unidad 1 — Comienza aqui',
		titleEn: 'Unit 1 — Start here',
		descriptionEs: 'Contexto del PIC18F4550 y ruta de estudio.',
		descriptionEn: 'PIC18F4550 context and study path.',
		items: [
			{
				id: 'ruta',
				labelEs: 'Leer la ruta de estudio',
				labelEn: 'Read the study path',
				hrefEs: '/ruta-de-estudio/',
				hrefEn: '/en/ruta-de-estudio/',
			},
			{
				id: 'pic',
				labelEs: 'Que es el PIC18F4550',
				labelEn: 'What is the PIC18F4550',
				hrefEs: '/introduccion/pic18f4550/',
				hrefEn: '/en/introduccion/pic18f4550/',
			},
			{
				id: 'comparar',
				labelEs: 'Comparar con Arduino, ESP32 y Raspberry Pi',
				labelEn: 'Compare with Arduino, ESP32, and Raspberry Pi',
				hrefEs: '/introduccion/comparaciones/',
				hrefEn: '/en/introduccion/comparaciones/',
			},
			{
				id: 'mplab',
				labelEs: 'Configurar MPLAB y Proteus',
				labelEn: 'Set up MPLAB and Proteus',
				hrefEs: '/fundamentos/mplab-proteus/',
				hrefEn: '/en/fundamentos/mplab-proteus/',
			},
		],
	},
	{
		id: 'fundamentos',
		titleEs: 'Unidad 2 — Fundamentos',
		titleEn: 'Unit 2 — Foundations',
		descriptionEs: 'Arquitectura, registros y ensamblador.',
		descriptionEn: 'Architecture, registers, and assembly.',
		items: [
			{
				id: 'arquitectura',
				labelEs: 'Arquitectura Harvard y memoria',
				labelEn: 'Harvard architecture and memory',
				hrefEs: '/fundamentos/arquitectura/',
				hrefEn: '/en/fundamentos/arquitectura/',
			},
			{
				id: 'bits',
				labelEs: 'Bits, hex y mascaras',
				labelEn: 'Bits, hex, and masks',
				hrefEs: '/fundamentos/bits-hex/',
				hrefEn: '/en/fundamentos/bits-hex/',
			},
			{
				id: 'registros',
				labelEs: 'Registros principales',
				labelEn: 'Main registers',
				hrefEs: '/fundamentos/registros/',
				hrefEn: '/en/fundamentos/registros/',
			},
			{
				id: 'ensamblador',
				labelEs: 'Ensamblador MPASM',
				labelEn: 'MPASM assembly',
				hrefEs: '/fundamentos/ensamblador/',
				hrefEn: '/en/fundamentos/ensamblador/',
			},
			{
				id: 'config',
				labelEs: 'Config bits y sistema minimo',
				labelEn: 'Config bits and minimum system',
				hrefEs: '/fundamentos/config-bits/',
				hrefEn: '/en/fundamentos/config-bits/',
			},
		],
	},
	{
		id: 'perifericos',
		titleEs: 'Unidad 3 — Perifericos',
		titleEn: 'Unit 3 — Peripherals',
		descriptionEs: 'GPIO, timers, interrupciones, ADC, PWM y serial.',
		descriptionEn: 'GPIO, timers, interrupts, ADC, PWM, and serial.',
		items: [
			{ id: 'gpio', labelEs: 'GPIO: TRIS, PORT, LAT', labelEn: 'GPIO: TRIS, PORT, LAT', hrefEs: '/gpio/', hrefEn: '/en/gpio/' },
			{ id: 'botones', labelEs: 'Botones y antirrebote', labelEn: 'Buttons and debounce', hrefEs: '/gpio/botones/', hrefEn: '/en/gpio/botones/' },
			{ id: 'timer0', labelEs: 'Timer 0', labelEn: 'Timer 0', hrefEs: '/timers/timer0/', hrefEn: '/en/timers/timer0/' },
			{ id: 'timer12', labelEs: 'Timer 1 y 2', labelEn: 'Timer 1 and 2', hrefEs: '/timers/timer1-timer2/', hrefEn: '/en/timers/timer1-timer2/' },
			{ id: 'int', labelEs: 'Interrupciones', labelEn: 'Interrupts', hrefEs: '/interrupciones/', hrefEn: '/en/interrupciones/' },
			{ id: 'adc', labelEs: 'Convertidor AD', labelEn: 'ADC', hrefEs: '/adc/', hrefEn: '/en/adc/' },
			{ id: 'pwm', labelEs: 'PWM / CCP', labelEn: 'PWM / CCP', hrefEs: '/pwm/', hrefEn: '/en/pwm/' },
			{ id: 'uart', labelEs: 'UART', labelEn: 'UART', hrefEs: '/comunicacion/uart/', hrefEn: '/en/comunicacion/uart/' },
		],
	},
	{
		id: 'parcial',
		titleEs: 'Unidad 4 — Preparacion parcial',
		titleEn: 'Unit 4 — Exam prep',
		descriptionEs: 'Teoria, ejercicios y proyecto integrador.',
		descriptionEn: 'Theory, exercises, and integrator project.',
		items: [
			{ id: 'guia', labelEs: 'Guia teorica', labelEn: 'Theory guide', hrefEs: '/parcial/guia-teorica/', hrefEn: '/en/parcial/guia-teorica/' },
			{ id: 'ejercicios', labelEs: 'Banco de ejercicios', labelEn: 'Exercise bank', hrefEs: '/parcial/ejercicios/', hrefEn: '/en/parcial/ejercicios/' },
			{ id: 'registros-ref', labelEs: 'Guia rapida de registros', labelEn: 'Quick register guide', hrefEs: '/referencia/guia-registros/', hrefEn: '/en/referencia/guia-registros/' },
			{ id: 'final', labelEs: 'Proyecto final tipo parcial', labelEn: 'Final partial-style project', hrefEs: '/parcial/proyecto-final/', hrefEn: '/en/parcial/proyecto-final/' },
		],
	},
];

export const practiceTutorials: PracticeTutorial[] = [
	{
		id: 'p0',
		number: 0,
		titleEs: 'Tutorial previo — Primer LED',
		titleEn: 'Warm-up — First LED',
		slug: 'primer-led',
		docHrefEs: '/practicas/primer-led/',
		docHrefEn: '/en/practicas/primer-led/',
		ready: true,
		stepsEs: [
			'Crear proyecto en MPLAB con PIC18F4550',
			'Escribir CONFIG para cristal HS y WDT off',
			'Configurar RB0 como salida con TRISB',
			'Encender LED con LATB y probar en Proteus',
			'Grabar en placa fisica y verificar',
		],
		stepsEn: [
			'Create MPLAB project for PIC18F4550',
			'Write CONFIG for HS crystal and WDT off',
			'Set RB0 as output with TRISB',
			'Turn LED on with LATB and test in Proteus',
			'Program physical board and verify',
		],
	},
	{
		id: 'p1',
		number: 1,
		titleEs: 'Practica 1 — Operaciones matematicas',
		titleEn: 'Practice 1 — Math operations',
		slug: 'practica-1',
		docHrefEs: '/practicas/operaciones-matematicas/',
		docHrefEn: '/en/practicas/operaciones-matematicas/',
		ready: true,
		figures: [
			{
				src: '/images/pdf/practica-1/page-2.png',
				altEs: 'Diagrama electronico de la Practica 1 con PIC18F4550, switches y LEDs',
				altEn: 'Practice 1 schematic with PIC18F4550, switches and LEDs',
				captionEs:
					'Diagrama electronico: operandos en RB0–RB7 y RD0–RD7, resultado en LEDs de RC/RE, pulsador en RA0.',
				captionEn:
					'Schematic: operands on RB0–RB7 and RD0–RD7, results on RC/RE LEDs, pushbutton on RA0.',
				credit: 'Practica 1 — Operaciones matematicas · UNEXPO',
			},
		],
		stepsEs: [
			'Montar sistema minimo en protoboard',
			'Conectar switches en puerto B y D (operandos)',
			'Conectar LEDs en puerto C y E (resultado)',
			'Implementar rutinas: suma, resta, mul, div software',
			'Agregar OR, AND, XOR, complemento y rotacion',
			'Usar RA0 para cambiar de operacion',
			'Simular en Proteus y probar en fisico',
			'Elaborar informe pre/post laboratorio',
		],
		stepsEn: [
			'Build minimum system on breadboard',
			'Connect switches on ports B and D (operands)',
			'Connect LEDs on ports C and E (result)',
			'Implement routines: add, sub, mul, software div',
			'Add OR, AND, XOR, complement, and rotate',
			'Use RA0 to switch operations',
			'Simulate in Proteus and test on hardware',
			'Write pre/post lab report',
		],
	},
	{
		id: 'p2',
		number: 2,
		titleEs: 'Practica 2 — Teclado y LCD',
		titleEn: 'Practice 2 — Keyboard and LCD',
		slug: 'practica-2',
		docHrefEs: '/practicas/teclado-lcd/',
		docHrefEn: '/en/practicas/teclado-lcd/',
		ready: true,
		figures: [
			{
				src: '/images/pdf/practica-2/page-2.png',
				altEs: 'Diagrama electronico de la Practica 2 con PIC18F4550, LCD y teclado matricial',
				altEn: 'Practice 2 schematic with PIC18F4550, LCD and matrix keyboard',
				captionEs:
					'Diagrama electronico: LCD en bus 4 bit (RD2-RD7), teclado 4x4 en RB0-RB7 con pull-ups.',
				captionEn:
					'Schematic: LCD in 4-bit mode (RD2-RD7), 4x4 keyboard on RB0-RB7 with pull-ups.',
				credit: 'Practica 2 — Teclado y LCD · UNEXPO',
			},
		],
		stepsEs: [
			'Conectar LCD 16x2 en bus 4 bit (RD4-RD7, RS/E)',
			'Inicializar HD44780 con rutina LCD.INC',
			'Conectar teclado 4x4: filas RB0-RB3, columnas RB4-RB7',
			'Habilitar interrupciones RB4-RB7',
			'Implementar escaneo y mostrar tecla en LCD',
			'Simular circuito completo',
			'Probar en placa y explicar oralmente',
		],
		stepsEn: [
			'Wire 16x2 LCD in 4-bit mode (RD4-RD7, RS/E)',
			'Initialize HD44780 with LCD.INC routine',
			'Connect 4x4 keyboard: rows RB0-RB3, cols RB4-RB7',
			'Enable RB4-RB7 interrupts',
			'Implement scan and display key on LCD',
			'Simulate full circuit',
			'Test on board and give oral explanation',
		],
	},
	{
		id: 'p3',
		number: 3,
		titleEs: 'Practica 3 — Frecuencimetro',
		titleEn: 'Practice 3 — Frequency meter',
		slug: 'practica-3',
		docHrefEs: '/practicas/frecuencimetro/',
		docHrefEn: '/en/practicas/frecuencimetro/',
		ready: true,
		stepsEs: [
			'Disenar multiplexado de displays 7 segmentos',
			'Configurar Timer como contador de pulsos',
			'Definir ventana de medicion con Timer0/1',
			'Calcular frecuencia = conteo / tiempo',
			'Refrescar display sin parpadeo visible',
			'Simular y validar con senal conocida',
		],
		stepsEn: [
			'Design 7-segment display multiplexing',
			'Configure Timer as pulse counter',
			'Define measurement window with Timer0/1',
			'Calculate frequency = count / time',
			'Refresh display without visible flicker',
			'Simulate and validate with known signal',
		],
	},
	{
		id: 'p4',
		number: 4,
		titleEs: 'Practica 4 — PWM y control analogico',
		titleEn: 'Practice 4 — PWM and analog control',
		slug: 'practica-4',
		docHrefEs: '/pwm/',
		docHrefEn: '/en/pwm/',
		ready: true,
		stepsEs: [
			'Calcular PR2 y duty para frecuencia deseada',
			'Configurar Timer2 y CCP1 en modo PWM',
			'Conectar LED o motor en RC2/CCP1',
			'Variar ciclo util con potenciometro (ADC opcional)',
			'Documentar calculos en informe',
			'Simular y probar en fisico',
		],
		stepsEn: [
			'Calculate PR2 and duty for target frequency',
			'Configure Timer2 and CCP1 in PWM mode',
			'Connect LED or motor on RC2/CCP1',
			'Vary duty cycle with potentiometer (optional ADC)',
			'Document calculations in report',
			'Simulate and test on hardware',
		],
	},
	{
		id: 'p5',
		number: 5,
		titleEs: 'Practica 5 — Timers e interrupciones',
		titleEn: 'Practice 5 — Timers and interrupts',
		slug: 'practica-5',
		docHrefEs: '/interrupciones/',
		docHrefEn: '/en/interrupciones/',
		ready: true,
		stepsEs: [
			'Configurar Timer0 para retardo preciso',
			'Habilitar GIE y bandera TMR0IF',
			'Escribir ISR con guardar/restaurar contexto',
			'Usar interrupcion externa INT0 o RB4-RB7',
			'Evitar polling en bucle principal',
			'Probar con pulsador y LED',
		],
		stepsEn: [
			'Configure Timer0 for precise delay',
			'Enable GIE and TMR0IF flag',
			'Write ISR with save/restore context',
			'Use INT0 or RB4-RB7 external interrupt',
			'Avoid polling in main loop',
			'Test with button and LED',
		],
	},
	{
		id: 'p6',
		number: 6,
		titleEs: 'Practica 6 — Motor paso a paso',
		titleEn: 'Practice 6 — Stepper motor',
		slug: 'practica-6',
		docHrefEs: '/practicas/motor-paso-a-paso/',
		docHrefEn: '/en/practicas/motor-paso-a-paso/',
		ready: true,
		stepsEs: [
			'Conectar driver (ULN2003) a 4 salidas del PIC',
			'Definir secuencia full-step o half-step',
			'Implementar retardo entre pasos con Timer',
			'Agregar botones para direccion y velocidad',
			'Montar y probar giro continuo',
			'Redactar informe con diagrama',
		],
		stepsEn: [
			'Connect driver (ULN2003) to 4 PIC outputs',
			'Define full-step or half-step sequence',
			'Implement step delay with Timer',
			'Add buttons for direction and speed',
			'Build and test continuous rotation',
			'Write report with schematic',
		],
	},
	{
		id: 'p7',
		number: 7,
		titleEs: 'Practica 7 — Convertidor AD',
		titleEn: 'Practice 7 — A/D converter',
		slug: 'practica-7',
		docHrefEs: '/practicas/convertidor-ad/',
		docHrefEn: '/en/practicas/convertidor-ad/',
		ready: true,
		figures: [
			{
				src: '/images/pdf/practica-7/page-2.png',
				altEs: 'Diagrama electronico de la Practica 7 con potenciometro en AN0 y LCD',
				altEn: 'Practice 7 schematic with potentiometer on AN0 and LCD',
				captionEs:
					'Potenciometro en RA0/AN0, LCD en bus 4 bit (RB0-RB3 datos, RE0/RE1 control).',
				captionEn:
					'Potentiometer on RA0/AN0, LCD in 4-bit mode (RB0-RB3 data, RE0/RE1 control).',
				credit: 'Practica 7 — Convertidor AD · UNEXPO',
			},
		],
		stepsEs: [
			'Configurar ADCON1 para canal analogico',
			'Seleccionar ADCS para cristal 20 MHz',
			'Leer potenciometro en AN0',
			'Escalar resultado a voltaje o PWM',
			'Mostrar valor en LCD o LEDs',
			'Simular y calibrar en fisico',
		],
		stepsEn: [
			'Configure ADCON1 for analog channel',
			'Select ADCS for 20 MHz crystal',
			'Read potentiometer on AN0',
			'Scale result to voltage or PWM',
			'Display value on LCD or LEDs',
			'Simulate and calibrate on hardware',
		],
	},
	{
		id: 'p8',
		number: 8,
		titleEs: 'Practica 8 — Comunicacion serial',
		titleEn: 'Practice 8 — Serial communication',
		slug: 'practica-8',
		docHrefEs: '/practicas/comunicacion-serial/',
		docHrefEn: '/en/practicas/comunicacion-serial/',
		ready: true,
		figures: [
			{
				src: '/images/pdf/practica-8/page-2.png',
				altEs: 'Diagrama electronico de la Practica 8 con MAX232 y comunicacion serial',
				altEn: 'Practice 8 schematic with MAX232 and serial communication',
				captionEs:
					'UART del PIC (RC6 TX, RC7 RX) a traves de MAX232 hacia conector serial de la PC.',
				captionEn:
					'PIC UART (RC6 TX, RC7 RX) through MAX232 to PC serial connector.',
				credit: 'Practica 8 — Comunicacion serial · UNEXPO',
			},
		],
		stepsEs: [
			'Calcular SPBRG para baudios deseados',
			'Configurar TXSTA, RCSTA y pines RC6/RC7',
			'Enviar mensaje de prueba por UART',
			'Recibir datos en terminal PC (9600 baud)',
			'Documentar calculo de baudios',
			'Probar en Proteus y placa',
		],
		stepsEn: [
			'Calculate SPBRG for target baud rate',
			'Configure TXSTA, RCSTA, and RC6/RC7 pins',
			'Send test message via UART',
			'Receive data on PC terminal (9600 baud)',
			'Document baud rate calculation',
			'Test in Proteus and on board',
		],
	},
	{
		id: 'p9',
		number: 9,
		titleEs: 'Practica 9 — Proyecto integrador',
		titleEn: 'Practice 9 — Integrator project',
		slug: 'practica-9',
		docHrefEs: '/parcial/proyecto-final/',
		docHrefEn: '/en/parcial/proyecto-final/',
		ready: true,
		stepsEs: [
			'Elegir proyecto: semaforo, nivel, estacion, etc.',
			'Combinar minimo 3 modulos (GPIO, timer, ADC/serial)',
			'Elaborar pseudocodigo y diagrama de flujo',
			'Codigo modular en ensamblador',
			'Simulacion Proteus con capturas',
			'Demostracion fisica y explicacion oral',
		],
		stepsEn: [
			'Choose project: traffic light, level control, station, etc.',
			'Combine at least 3 modules (GPIO, timer, ADC/serial)',
			'Write pseudocode and flowchart',
			'Modular assembly code',
			'Proteus simulation with screenshots',
			'Physical demo and oral explanation',
		],
	},
];

export const exerciseTutorialItems: TutorialItem[] = [
	{ id: 'ex-nivel', labelEs: 'Control de nivel de tanque', labelEn: 'Tank level control', hrefEs: '/proyectos/control-nivel/', hrefEn: '/en/proyectos/control-nivel/' },
	{ id: 'ex-display', labelEs: 'Conteo descendente en display 7 seg', labelEn: 'Countdown on 7-segment display', hrefEs: '/parcial/ejercicios/', hrefEn: '/en/parcial/ejercicios/' },
	{ id: 'ex-blink', labelEs: 'Intermitencia controlada por pulsador', labelEn: 'Button-controlled LED blink', hrefEs: '/parcial/ejercicios/', hrefEn: '/en/parcial/ejercicios/' },
	{ id: 'ex-timer', labelEs: 'Calcular TMR0 para 2 segundos', labelEn: 'Calculate TMR0 for 2 seconds', hrefEs: '/timers/timer0/', hrefEn: '/en/timers/timer0/' },
	{ id: 'ex-pwm', labelEs: 'PWM al 50% con PR2=249', labelEn: '50% PWM with PR2=249', hrefEs: '/pwm/', hrefEn: '/en/pwm/' },
	{ id: 'ex-tris', labelEs: 'Explicar TRIS vs LAT vs PORT', labelEn: 'Explain TRIS vs LAT vs PORT', hrefEs: '/gpio/', hrefEn: '/en/gpio/' },
];
