import type { SkillTutorialSeries } from './types';

export const aluSeries: SkillTutorialSeries = {
	id: 'alu',
	titleEs: 'Operaciones ALU en ensamblador',
	titleEn: 'ALU operations in assembly',
	descriptionEs:
		'Suma, resta, multiplicacion, logica y rotaciones con operandos en WREG. Preparacion directa para la Practica 1.',
	descriptionEn:
		'Add, subtract, multiply, logic, and rotates with operands in WREG. Direct prep for Practice 1.',
	level: 'intermedio',
	prerequisites: ['puertos'],
	relatedDocs: [
		{
			labelEs: 'Ensamblador MPASM',
			labelEn: 'MPASM assembly',
			hrefEs: '/fundamentos/ensamblador/',
			hrefEn: '/en/fundamentos/ensamblador/',
		},
	],
	preparesFor: ['practica-1'],
	steps: [
		{
			id: '0-introduccion',
			order: 0,
			titleEs: 'Introduccion: WREG y operandos',
			titleEn: 'Introduction: WREG and operands',
			bodyEs:
				'La ALU del PIC18 trabaja con el acumulador **WREG (W)**. Patron tipico: cargar un operando en W, combinar con otro con `ADDWF`, `SUBWF`, etc., y guardar el resultado en un registro o puerto.',
			bodyEn:
				'The PIC18 ALU uses accumulator **WREG (W)**. Typical pattern: load one operand in W, combine with another via `ADDWF`, `SUBWF`, etc., and store the result in a register or port.',
		},
		{
			id: '1-suma-resta',
			order: 1,
			titleEs: 'Suma y resta con ADDWF / SUBWF',
			titleEn: 'Add and subtract with ADDWF / SUBWF',
			goalEs: 'Sumar PORTB + PORTD y mostrar en LATC.',
			goalEn: 'Add PORTB + PORTD and display on LATC.',
			bodyEs:
				'`MOVF PORTB, W` carga el operando A. `ADDWF PORTD, W` suma B (modo W) o `ADDWF PORTD, F` suma en memoria. Para resta: `SUBWF` (cuidado con el orden del minuendo).',
			bodyEn:
				'`MOVF PORTB, W` loads operand A. `ADDWF PORTD, W` adds B (to W) or `ADDWF PORTD, F` adds in place. For subtract: `SUBWF` (watch minuend order).',
			code: `        MOVF    PORTB, W
        ADDWF   PORTD, W
        MOVWF   LATC`,
			challengeEs: 'Implementa resta A - B y enciende RB0 si el resultado es negativo (borrow).',
			challengeEn: 'Implement A - B and turn on RB0 if the result is negative (borrow).',
		},
		{
			id: '2-logica',
			order: 2,
			titleEs: 'OR, AND y XOR',
			titleEn: 'OR, AND, and XOR',
			bodyEs:
				'**IORWF**, **ANDWF**, **XORWF** aplican logica bit a bit entre W y el operando f. Util para enmascarar nibbles o combinar switches.',
			bodyEn:
				'**IORWF**, **ANDWF**, **XORWF** apply bitwise logic between W and operand f. Useful to mask nibbles or combine switches.',
			code: `        MOVF    PORTB, W
        ANDLW   0x0F        ; solo nibble bajo
        IORWF   PORTD, W
        MOVWF   LATC`,
		},
		{
			id: '3-multiplicacion',
			order: 3,
			titleEs: 'Multiplicacion con MULWF',
			titleEn: 'Multiply with MULWF',
			bodyEs:
				'`MULWF` deja el producto 16 bits en **PRODH:PRODL**. Muestra ambos bytes en dos puertos o combinalos segun tu practica.',
			bodyEn:
				'`MULWF` leaves the 16-bit product in **PRODH:PRODL**. Display both bytes on two ports or combine per your lab.',
			code: `        MOVF    PORTB, W
        MULWF   PORTD
        MOVF    PRODL, W
        MOVWF   LATC
        MOVF    PRODH, W
        MOVWF   LATE`,
		},
		{
			id: '4-resumen',
			order: 4,
			titleEs: 'Resumen y Practica 1',
			titleEn: 'Summary and Practice 1',
			bodyEs:
				'Con estas instrucciones puedes armar la calculadora ALU de la Practica 1. Continua en [Tutorial Practica 1](/tutoriales/practica-1/).',
			bodyEn:
				'With these instructions you can build the Practice 1 ALU calculator. Continue at [Practice 1 tutorial](/en/tutoriales/practica-1/).',
		},
	],
};
