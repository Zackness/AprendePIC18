import type { SkillTutorialSeries } from './types';

export const interrupcionesSeries: SkillTutorialSeries = {
	id: 'interrupciones',
	titleEs: 'Interrupciones en PIC18',
	titleEn: 'PIC18 interrupts',
	descriptionEs:
		'GIE, banderas, ISR y guardado de contexto. Necesario para teclado, timers y frecuencimetro.',
	descriptionEn:
		'GIE, flags, ISR, and context save. Required for keyboard, timers, and frequency meter.',
	level: 'intermedio',
	prerequisites: ['puertos'],
	relatedDocs: [
		{
			labelEs: 'Teoria interrupciones',
			labelEn: 'Interrupt theory',
			hrefEs: '/interrupciones/',
			hrefEn: '/en/interrupciones/',
		},
		{
			labelEs: 'Timer 0',
			labelEn: 'Timer 0',
			hrefEs: '/timers/timer0/',
			hrefEn: '/en/timers/timer0/',
		},
	],
	preparesFor: ['practica-2', 'practica-3', 'practica-5'],
	steps: [
		{
			id: '0-introduccion',
			order: 0,
			titleEs: 'Introduccion: polling vs interrupciones',
			titleEn: 'Introduction: polling vs interrupts',
			bodyEs:
				'Con **polling** el CPU revisa una bandera en bucle (desperdicia tiempo). Con **interrupciones**, el hardware salta a una **ISR** cuando ocurre el evento. El PIC18 usa **GIE** (global) y banderas por periferico.',
			bodyEn:
				'With **polling** the CPU checks a flag in a loop (wastes time). With **interrupts**, hardware jumps to an **ISR** when the event occurs. PIC18 uses **GIE** (global) and per-peripheral flags.',
		},
		{
			id: '1-habilitar',
			order: 1,
			titleEs: 'Habilitar interrupciones globales',
			titleEn: 'Enable global interrupts',
			goalEs: 'Encender GIE y TMR0IE para parpadear un LED desde la ISR.',
			goalEn: 'Enable GIE and TMR0IE to blink an LED from the ISR.',
			bodyEs:
				'Secuencia: configurar Timer0 overflow, poner **TMR0IE**, **PEIE** (perifericas) y **GIE**. Sin GIE=1 las ISR no se ejecutan.',
			bodyEn:
				'Sequence: configure Timer0 overflow, set **TMR0IE**, **PEIE** (peripherals), and **GIE**. Without GIE=1 ISRs will not run.',
			code: `        BSF     INTCON, TMR0IE
        BSF     INTCON, PEIE
        BSF     INTCON, GIE`,
		},
		{
			id: '2-isr-basica',
			order: 2,
			titleEs: 'Escribir una ISR minima',
			titleEn: 'Write a minimal ISR',
			bodyEs:
				'Vector alto `ORG 0x0008` → salto a `isr_alta`. En la ISR: comprueba **TMR0IF**, toggle LED, recarga TMR0, limpia flag, **RETFIE**.',
			bodyEn:
				'High vector `ORG 0x0008` → jump to `isr_alta`. In ISR: check **TMR0IF**, toggle LED, reload TMR0, clear flag, **RETFIE**.',
			code: `        ORG     0x0008
        GOTO    isr_alta

isr_alta:
        BTFSC   INTCON, TMR0IF
        GOTO    tmr0_irq
        RETFIE
tmr0_irq:
        BCF     INTCON, TMR0IF
        ; recargar TMR0, toggle LATB,0
        RETFIE`,
		},
		{
			id: '3-contexto',
			order: 3,
			titleEs: 'Guardar y restaurar contexto',
			titleEn: 'Save and restore context',
			bodyEs:
				'La ISR debe preservar **WREG** y **STATUS** (minimo). Usa macro o secuencia `MOVWF temp_w` / `SWAPF STATUS, W` / … al entrar, y restaura al salir **antes** de RETFIE.',
			bodyEn:
				'The ISR must preserve **WREG** and **STATUS** (minimum). Use a macro or `MOVWF temp_w` / `SWAPF STATUS, W` / … on entry, restore before **RETFIE**.',
			tipEs: 'Ejemplos completos en /interrupciones/',
			tipEn: 'Full examples at /en/interrupciones/',
		},
		{
			id: '4-rb-interrupt',
			order: 4,
			titleEs: 'Interrupcion RB4-RB7 (teclado)',
			titleEn: 'RB4-RB7 interrupt (keyboard)',
			bodyEs:
				'Para teclado matricial: **RBIE** + pull-ups en columnas. ISR escanea teclas, debounce, limpia **RBIF** leyendo PORTB. Continua en [Practica 2](/tutoriales/practica-2/).',
			bodyEn:
				'For matrix keyboard: **RBIE** + column pull-ups. ISR scans keys, debounces, clears **RBIF** by reading PORTB. Continue at [Practice 2](/en/tutoriales/practica-2/).',
			code: `        BCF     INTCON2, RBPU
        BSF     INTCON, RBIE
        BSF     INTCON, GIE`,
		},
	],
};
