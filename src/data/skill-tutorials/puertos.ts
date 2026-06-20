import type { SkillTutorialSeries } from './types';

export const puertosSeries: SkillTutorialSeries = {
	id: 'puertos',
	titleEs: 'Usar puertos GPIO',
	titleEn: 'Using GPIO ports',
	descriptionEs:
		'Aprende TRIS, PORT y LAT con mini-ejercicios. Base para el Primer LED y casi todas las practicas UNEXPO.',
	descriptionEn:
		'Learn TRIS, PORT, and LAT with mini exercises. Foundation for First LED and most UNEXPO labs.',
	level: 'basico',
	relatedDocs: [
		{
			labelEs: 'Teoria GPIO',
			labelEn: 'GPIO theory',
			hrefEs: '/gpio/',
			hrefEn: '/en/gpio/',
		},
		{
			labelEs: 'Registros TRIS/PORT/LAT',
			labelEn: 'TRIS/PORT/LAT registers',
			hrefEs: '/fundamentos/registros/',
			hrefEn: '/en/fundamentos/registros/',
		},
	],
	preparesFor: ['primer-led', 'practica-1', 'practica-2'],
	steps: [
		{
			id: '0-introduccion',
			order: 0,
			titleEs: 'Introduccion: que es un puerto',
			titleEn: 'Introduction: what is a port',
			goalEs: 'Entender que un puerto es un grupo de pines que puedes leer o escribir en paralelo.',
			goalEn: 'Understand that a port is a group of pins you can read or write in parallel.',
			bodyEs:
				'El PIC18F4550 agrupa pines en **puertos** (PORTA, PORTB, …). Cada pin puede ser **entrada** o **salida**. Tres registros clave:\n\n- **TRIS** — direccion (1=entrada, 0=salida)\n- **PORT** — lee el nivel en el pin\n- **LAT** — escribe el nivel de salida\n\nEn esta guia programaras cada concepto en MPLAB o Proteus antes de las practicas oficiales.',
			bodyEn:
				'The PIC18F4550 groups pins into **ports** (PORTA, PORTB, …). Each pin can be **input** or **output**. Three key registers:\n\n- **TRIS** — direction (1=input, 0=output)\n- **PORT** — reads pin level\n- **LAT** — writes output level\n\nIn this guide you will code each concept in MPLAB or Proteus before the official labs.',
		},
		{
			id: '1-tris-direccion',
			order: 1,
			titleEs: 'Configurar direccion con TRIS',
			titleEn: 'Set direction with TRIS',
			goalEs: 'Poner RB0 como salida y RB1 como entrada usando TRISB.',
			goalEn: 'Set RB0 as output and RB1 as input using TRISB.',
			bodyEs:
				'**TRISB** controla PORTB. Bit en `1` = entrada; bit en `0` = salida. Para RB0 salida: `BCF TRISB, 0`. Para RB1 entrada: `BSF TRISB, 1`. Puedes cargar todo el puerto con `MOVLW` + `MOVWF TRISB`.',
			bodyEn:
				'**TRISB** controls PORTB. Bit `1` = input; bit `0` = output. For RB0 output: `BCF TRISB, 0`. For RB1 input: `BSF TRISB, 1`. You can load the whole port with `MOVLW` + `MOVWF TRISB`.',
			code: `        MOVLW   B'00000010'   ; RB1 in, RB0 out
        MOVWF   TRISB
        ; equivalente:
        BCF     TRISB, 0
        BSF     TRISB, 1`,
			challengeEs: 'Configura todo PORTC como salida y PORTD como entrada.',
			challengeEn: 'Configure all of PORTC as output and PORTD as input.',
		},
		{
			id: '2-lat-salidas',
			order: 2,
			titleEs: 'Escribir salidas con LAT',
			titleEn: 'Write outputs with LAT',
			goalEs: 'Encender y apagar RB0 escribiendo en LATB.',
			goalEn: 'Turn RB0 on and off by writing LATB.',
			bodyEs:
				'Para **salidas**, escribe en **LATB** (no en PORTB en la mayoria de casos). `BSF LATB, 0` pone RB0 en alto; `BCF LATB, 0` en bajo. `CLRF LATB` apaga todas las salidas del puerto.',
			bodyEn:
				'For **outputs**, write **LATB** (not PORTB in most cases). `BSF LATB, 0` drives RB0 high; `BCF LATB, 0` low. `CLRF LATB` clears all port outputs.',
			code: `        BCF     TRISB, 0      ; RB0 salida
        BSF     LATB, 0       ; encender
        CALL    retardo
        BCF     LATB, 0       ; apagar
        CALL    retardo`,
			tipEs: 'Tutorial practica: /tutoriales/primer-led/',
			tipEn: 'Practice tutorial: /en/tutoriales/primer-led/',
		},
		{
			id: '3-port-entradas',
			order: 3,
			titleEs: 'Leer entradas con PORT',
			titleEn: 'Read inputs with PORT',
			goalEs: 'Leer un pulsador en RB1 y copiar su estado a RB0 (LED).',
			goalEn: 'Read a button on RB1 and copy its state to RB0 (LED).',
			bodyEs:
				'**PORTB** refleja el nivel actual del pin. Usa `BTFSC PORTB, 1` / `BTFSS PORTB, 1` para saltar segun el pulsador. O mueve a W: `MOVF PORTB, W` y enmascara el bit.',
			bodyEn:
				'**PORTB** reflects the current pin level. Use `BTFSC PORTB, 1` / `BTFSS PORTB, 1` to branch on the button. Or move to W: `MOVF PORTB, W` and mask the bit.',
			code: `bucle:
        BTFSC   PORTB, 1      ; pulsador suelto?
        BCF     LATB, 0
        BTFSS   PORTB, 1
        BSF     LATB, 0
        GOTO    bucle`,
			challengeEs: 'Invierte la logica: LED encendido cuando el pulsador NO se presiona.',
			challengeEn: 'Invert logic: LED on when the button is NOT pressed.',
		},
		{
			id: '4-resumen',
			order: 4,
			titleEs: 'Resumen y siguiente paso',
			titleEn: 'Summary and next step',
			bodyEs:
				'Ya sabes configurar direccion (**TRIS**), escribir (**LAT**) y leer (**PORT**). Siguiente: [Tutorial Primer LED](/tutoriales/primer-led/) o [ALU](/tutoriales/guias/alu/) si vas a la Practica 1.',
			bodyEn:
				'You can set direction (**TRIS**), write (**LAT**), and read (**PORT**). Next: [First LED tutorial](/en/tutoriales/primer-led/) or [ALU guide](/en/tutoriales/guias/alu/) for Practice 1.',
		},
	],
};
