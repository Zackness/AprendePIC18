import type { LabGuideContent } from './types';

export const operacionesMatematicasGuide: LabGuideContent = {
	practiceSlug: 'practicas/operaciones-matematicas',
	pre: {
		titleEs: 'Pre-laboratorio — investigación de referencia',
		titleEn: 'Pre-laboratory — reference research',
		introEs:
			'Respuestas alineadas al PDF oficial (Práctica 1, UNEXPO). Son una base para orientar tu investigación: analízalas, amplíalas con el datasheet y redacta el informe con tus propias palabras.',
		introEn:
			'Answers aligned with the official PDF (Practice 1, UNEXPO). Use them to guide your research: analyze them, expand with the datasheet, and write your report in your own words.',
		noteEs:
			'No copies textualmente al informe. El profesor espera tu redacción, tus cálculos y tu diagrama. Esta guía sirve para comparar y mejorar lo tuyo.',
		noteEn:
			'Do not copy verbatim into your report. Your instructor expects your own wording, calculations and schematic. Use this guide to compare and improve your work.',
		items: [
			{
				id: 'pre-1',
				questionEs: 'Conexión del sistema mínimo para el PIC18F4550',
				questionEn: 'Minimum system wiring for the PIC18F4550',
				answerEs: `El **sistema mínimo** permite que el PIC oscile, se reinicie y se alimente de forma estable:

- **Alimentación:** VDD = +5 V DC y VSS = tierra (común) en los pines correspondientes.
- **Oscilador HS (20 MHz):** cristal de **20 MHz** entre los pines OSC1 y OSC2, con un condensador de **1 nF** de cada pin del cristal a tierra (según la hoja de la práctica).
- **Reset (MCLR):** resistencia de **10 kΩ** de MCLR a VDD (pull-up), condensador de **10 nF** de MCLR a tierra para filtrar ruido, y pulsador de reset opcional entre MCLR y tierra.
- **Programación:** ICSP (PGC/PGD/MCLR/VDD/VSS) si usas PICkit 2/3.

Con **CONFIG FOSC = HS** el PIC usa el cristal externo. Sin este bloque el programa no ejecuta ciclos de reloj estables.`,
				answerEn: `The **minimum system** lets the PIC oscillate, reset and run on stable power:

- **Power:** VDD = +5 V DC and VSS = ground on the correct pins.
- **HS oscillator (20 MHz):** **20 MHz** crystal between OSC1 and OSC2, with **1 nF** capacitors from each crystal pin to ground (per the lab sheet).
- **Reset (MCLR):** **10 kΩ** pull-up from MCLR to VDD, **10 nF** from MCLR to ground, optional reset pushbutton from MCLR to ground.
- **Programming:** ICSP (PGC/PGD/MCLR/VDD/VSS) when using PICkit 2/3.

With **CONFIG FOSC = HS** the PIC uses the external crystal.`,
			},
			{
				id: 'pre-2',
				questionEs: 'Explique los puertos del PIC18F4550 usados en esta práctica',
				questionEn: 'Explain the PIC18F4550 ports used in this lab',
				answerEs: `En esta práctica se usan **cinco puertos** con roles distintos:

| Puerto | Dirección | Función en el montaje |
| --- | --- | --- |
| **PORTB** | Entrada (\`TRISB = 0xFF\`) | Operando **A** — DIP switch de 8 bits (RB0–RB7) |
| **PORTD** | Entrada (\`TRISD = 0xFF\`) | Operando **B** — segundo DIP switch (RD0–RD7) |
| **PORTC** | Salida (\`TRISC = 0\`) | LEDs del byte **bajo** del resultado (RC0–RC7 → \`LATC\`) |
| **PORTE** | Salida (\`TRISE = 0\`) | LEDs del byte **alto** en multiplicación (RE0–RE7 → \`LATE\`) |
| **PORTA** | RA0 entrada | Pulsador NA para **cambiar de operación** |

Cada puerto digital usa el trio **TRISx** (dirección), **PORTx** (lectura) y **LATx** (escritura de salidas). Los switches llevan resistencias de **10 kΩ** como pull-up; los LEDs llevan **220–330 Ω** en serie.`,
				answerEn: `This lab uses **five ports** with different roles:

| Port | Direction | Role |
| --- | --- | --- |
| **PORTB** | Input (\`TRISB = 0xFF\`) | Operand **A** — 8-bit DIP switch (RB0–RB7) |
| **PORTD** | Input (\`TRISD = 0xFF\`) | Operand **B** — second DIP switch (RD0–RD7) |
| **PORTC** | Output (\`TRISC = 0\`) | **Low** result byte on LEDs (RC0–RC7 → \`LATC\`) |
| **PORTE** | Output (\`TRISE = 0\`) | **High** byte for multiply (RE0–RE7 → \`LATE\`) |
| **PORTA** | RA0 input | Pushbutton to **change operation** |

Each digital port uses **TRISx** (direction), **PORTx** (read) and **LATx** (output latch). Switches use **10 kΩ** pull-ups; LEDs use **220–330 Ω** series resistors.`,
			},
			{
				id: 'pre-3',
				questionEs: '¿Qué es la ALU?',
				questionEn: 'What is the ALU?',
				answerEs: `La **ALU** (*Arithmetic Logic Unit*, unidad aritmético-lógica) es el bloque de la **CPU** que ejecuta operaciones sobre datos en registros: sumas, restas, AND, OR, XOR, complemento, incrementos, etc.

En el PIC18F4550 la ALU trabaja principalmente con el registro **WREG** y registros de memoria de datos. No ejecuta programas completos: solo la operación de **una instrucción por ciclo** (salvo algunas instrucciones de dos ciclos). El resultado puede quedar en WREG, en un registro o en pares especiales como **PRODH:PRODL** (multiplicación).`,
				answerEn: `The **ALU** (*Arithmetic Logic Unit*) is the **CPU** block that runs operations on register data: add, subtract, AND, OR, XOR, complement, increments, etc.

On the PIC18F4550 the ALU mainly works with **WREG** and data memory registers. It executes **one instruction per cycle** (except some two-cycle instructions). Results may land in WREG, a file register, or special pairs like **PRODH:PRODL** (multiply).`,
			},
			{
				id: 'pre-4',
				questionEs: '¿Cuántas operaciones puede realizar la ALU del PIC18F4550?',
				questionEn: 'How many operations can the PIC18F4550 ALU perform?',
				answerEs: `La ALU no tiene un contador fijo de "modos", pero el **juego de instrucciones** del PIC18 incluye decenas de operaciones aritméticas y lógicas sobre bytes de 8 bits, entre ellas:

- **Aritmética:** suma (\`ADDWF\`, \`ADDLW\`), resta (\`SUBWF\`, \`SUBLW\`), incremento/decremento (\`INCF\`, \`DECF\`), multiplicación (\`MULWF\`).
- **Lógica:** AND (\`ANDWF\`), OR (\`IORWF\`), XOR (\`XORWF\`), complemento (\`COMF\`).
- **Desplazamientos/rotaciones:** \`RLCF\`, \`RRCF\`, \`RLNCF\`, \`RRNCF\`.

Operaciones como la **división entera** no tienen instrucción dedicada en PIC18: se resuelven **por software** (restas repetidas), como pide esta práctica.`,
				answerEn: `The ALU does not expose a fixed "mode count", but the PIC18 **instruction set** includes dozens of 8-bit arithmetic and logic operations, including:

- **Arithmetic:** add (\`ADDWF\`, \`ADDLW\`), subtract (\`SUBWF\`, \`SUBLW\`), inc/dec (\`INCF\`, \`DECF\`), multiply (\`MULWF\`).
- **Logic:** AND (\`ANDWF\`), OR (\`IORWF\`), XOR (\`XORWF\`), complement (\`COMF\`).
- **Shifts/rotates:** \`RLCF\`, \`RRCF\`, \`RLNCF\`, \`RRNCF\`.

Integer **division** has no dedicated PIC18 instruction and is done **in software** (repeated subtraction), as required in this lab.`,
			},
			{
				id: 'pre-5',
				questionEs:
					'¿Qué instrucciones dispone el PIC18F4550 para operaciones lógicas y matemáticas?',
				questionEn:
					'Which instructions handle logical and arithmetic operations on this MCU?',
				answerEs: `Instrucciones usadas directamente en la Práctica 1:

| Operación del laboratorio | Instrucciones MPASM |
| --- | --- |
| Suma | \`ADDWF\` |
| Resta | \`SUBWF\` |
| Multiplicación | \`MULWF\` → resultado en \`PRODH:PRODL\` |
| División (software) | \`MOVF\`, \`SUBWF\`, \`ADDWF\`, \`INCF\`, \`BCF\`/\`BSF\`, \`GOTO\` (bucle) |
| OR / AND / XOR | \`IORWF\`, \`ANDWF\`, \`XORWF\` |
| Complemento | \`COMF\` |
| Rotar sin acarreo | \`RLNCF\` |

También se usan instrucciones de **configuración y control**: \`MOVLW\`, \`MOVWF\`, \`CLRF\`, \`BCF\`, \`BSF\`, \`BTFSC\`, \`BTFSS\`, \`CALL\`, \`RETURN\`, \`GOTO\` para inicializar puertos, leer switches y seleccionar la operación activa.`,
				answerEn: `Instructions used directly in Practice 1:

| Lab operation | MPASM instructions |
| --- | --- |
| Add | \`ADDWF\` |
| Subtract | \`SUBWF\` |
| Multiply | \`MULWF\` → result in \`PRODH:PRODL\` |
| Divide (software) | \`MOVF\`, \`SUBWF\`, \`ADDWF\`, \`INCF\`, \`BCF\`/\`BSF\`, \`GOTO\` (loop) |
| OR / AND / XOR | \`IORWF\`, \`ANDWF\`, \`XORWF\` |
| Complement | \`COMF\` |
| Rotate, no carry | \`RLNCF\` |

**Setup and control** instructions include \`MOVLW\`, \`MOVWF\`, \`CLRF\`, \`BCF\`, \`BSF\`, \`BTFSC\`, \`BTFSS\`, \`CALL\`, \`RETURN\`, \`GOTO\` for port init, switch reads and operation selection.`,
			},
		],
	},
	post: {
		titleEs: 'Post-laboratorio — investigación de referencia',
		titleEn: 'Post-laboratory — reference research',
		introEs:
			'Respuestas a las preguntas de cierre del PDF. Úsalas como punto de partida y complementa con lo que observaste en Proteus o en placa física.',
		introEn:
			'Answers to the closing questions in the PDF. Use them as a starting point and add what you observed in Proteus or on hardware.',
		noteEs:
			'En el informe final incluye conclusiones propias sobre limitaciones del PIC18 (8 bits, división por software, pines compartidos con UART).',
		noteEn:
			'In your final report add your own conclusions about PIC18 limits (8 bits, software division, pins shared with UART).',
		items: [
			{
				id: 'post-1',
				questionEs:
					'¿Cuál es la diferencia entre una operación matemática por hardware y por software?',
				questionEn:
					'What is the difference between a hardware operation and a software operation?',
				answerEs: `**Por hardware (ALU nativa):** el PIC ejecuta **una instrucción** y la ALU produce el resultado en uno o pocos ciclos. Ejemplos: \`ADDWF\`, \`SUBWF\`, \`MULWF\`, \`IORWF\`/\`ANDWF\`/\`XORWF\`.

**Por software (algoritmo):** no existe instrucción directa; escribes una **rutina** con varias instrucciones. Ejemplo: **división entera** — repite restas hasta que el dividendo es menor que el divisor.

En oral puedes decir: *"La suma la hace la ALU con ADDWF; la división la implementamos nosotros porque el PIC18 no trae DIV."*`,
				answerEn: `**Hardware (native ALU):** the PIC runs **one instruction** and the ALU returns the result in one or a few cycles. Examples: \`ADDWF\`, \`SUBWF\`, \`MULWF\`, \`IORWF\`/\`ANDWF\`/\`XORWF\`.

**Software (algorithm):** there is no single instruction; you write a **routine**. Example: **integer divide** — repeat subtraction while dividend ≥ divisor.

Orally: *"Addition uses ADDWF in hardware; division is our algorithm because PIC18 has no DIV instruction."*`,
			},
			{
				id: 'post-2',
				questionEs: '¿Por qué no se puede utilizar todo el puerto C como salida?',
				questionEn: 'Why can you not always use all of PORTC as output?',
				answerEs: `Los pines **RC6** y **RC7** tienen funciones **alternativas** (UART TX/RX). Si activas EUSART, esos pines dejan de ser GPIO simple. En esta práctica se usa \`TRISC = 0\` porque **no usamos UART a la vez**, pero debes explicar en el informe que no todos los pines son GPIO dedicados en todo momento.`,
				answerEn: `Pins **RC6** and **RC7** have **alternate functions** (UART TX/RX). When EUSART is enabled, they are not simple GPIO. This lab uses \`TRISC = 0\` because **UART is not used**, but your report must explain that not every pin is a dedicated GPIO at all times.`,
			},
		],
	},
	design: {
		pseudocodeEs: `INICIO
    Configurar ADCON1 ← digital
    LATC ← 0, LATE ← 0, modo ← 0
    TRISB ← 0xFF, TRISD ← 0xFF
    TRISA.0 ← 1, TRISC ← 0, TRISE ← 0
REPITIR SIEMPRE
    oper_a ← PORTB, oper_b ← PORTD
    SEGUN modo: suma, resta, mul, div, OR, AND, XOR, NOT, rotar
    LATC ← byte_bajo, LATE ← byte_alto
    SI flanco_bajada(RA0) ENTONCES modo ← (modo+1) mod 9
FIN REPITIR`,
		pseudocodeEn: `START
    Configure ADCON1 ← digital
    LATC ← 0, LATE ← 0, mode ← 0
    TRISB ← 0xFF, TRISD ← 0xFF
    TRISA.0 ← 1, TRISC ← 0, TRISE ← 0
REPEAT FOREVER
    oper_a ← PORTB, oper_b ← PORTD
    CASE mode: add, sub, mul, div, OR, AND, XOR, NOT, rotate
    LATC ← low_byte, LATE ← high_byte
    IF falling_edge(RA0) THEN mode ← (mode+1) mod 9
END REPEAT`,
		flowchartSrc: '/images/practicas/practica-1-flujo.svg',
		flowchartAltEs: 'Diagrama de flujo del programa de la Práctica 1',
		flowchartAltEn: 'Practice 1 program flowchart',
		flowchartCaptionEs:
			'Flujo principal: inicializar → bucle → leer operandos → ejecutar modo → mostrar en LEDs → revisar RA0.',
		flowchartCaptionEn:
			'Main flow: init → loop → read operands → run mode → display on LEDs → poll RA0.',
		pseudoPlaceholderEs: `INICIO
    Configurar puertos (TRISB/D entradas, TRISC/E salidas, RA0 pulsador)
REPITIR
    Leer operando A en PORTB, B en PORTD
    SEGÚN modo: suma, resta, multiplicación, ...
    Mostrar resultado en LEDs
    Si RA0 pulsado → siguiente modo
FIN REPITIR`,
		pseudoPlaceholderEn: `START
    Configure ports (TRISB/D inputs, TRISC/E outputs, RA0 button)
REPEAT
    Read operand A from PORTB, B from PORTD
    CASE mode: add, subtract, multiply, ...
    Display result on LEDs
    If RA0 pressed → next mode
END REPEAT`,
		pseudoHintEs:
			'Incluye: configuración de puertos, bucle principal, SEGÚN con 9 modos, RA0 para cambiar modo, rutina de división por software.',
		pseudoHintEn:
			'Include: port setup, main loop, CASE/SEGÚN for 9 modes, RA0 to change mode, software division routine.',
		flowPlaceholderEs: `1. INICIO (óvalo)
2. Inicializar puertos (rectángulo)
3. Leer PORTB y PORTD (paralelogramo)
4. SEGÚN modo — ejecutar operación (rombo + rectángulos)
5. Escribir LATC/LATE (paralelogramo)
6. ¿RA0 pulsado? (rombo) → incrementar modo
7. Volver al paso 3 (bucle)
8. Subrutina DIVISIÓN_SOFTWARE (caja aparte)`,
		flowPlaceholderEn: `1. START (oval)
2. Initialize ports (rectangle)
3. Read PORTB and PORTD (parallelogram)
4. CASE mode — run operation (diamond + rectangles)
5. Write LATC/LATE (parallelogram)
6. RA0 pressed? (diamond) → increment mode
7. Loop back to step 3
8. SOFTWARE_DIVIDE subroutine (separate box)`,
		flowHintsEs: [
			'Inicio / Fin (óvalos)',
			'Procesos (rectángulos)',
			'Decisiones (rombos)',
			'Entrada/Salida (paralelogramos)',
			'Flecha de bucle principal',
			'Subrutina de división aparte',
		],
		flowHintsEn: [
			'Start / End (ovals)',
			'Processes (rectangles)',
			'Decisions (diamonds)',
			'I/O (parallelograms)',
			'Main loop arrow back',
			'Division subroutine aside',
		],
	},
};
