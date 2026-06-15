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
}

export interface LabGuideContent {
	practiceSlug: string;
	pre: LabTextBlock;
	post: LabTextBlock;
	design: LabDesignContent;
}

export const labGuides: LabGuideContent[] = [
	{
		practiceSlug: 'practicas/operaciones-matematicas',
		pre: {
			titleEs: 'Pre-laboratorio — respuestas de referencia',
			titleEn: 'Pre-laboratory — reference answers',
			introEs:
				'Respuestas alineadas al PDF oficial de la Practica 1 (UNEXPO). Son una guia para tu informe; conviene ampliarlas con el datasheet PIC18F4550 y tus propios calculos.',
			introEn:
				'Answers aligned with the official Practice 1 sheet (UNEXPO). Use them as a report guide; expand with the PIC18F4550 datasheet and your own calculations.',
			noteEs:
				'En el informe debes redactar con tus palabras, citar fuentes (datasheet, temas de clase) y adjuntar tu diagrama electronico.',
			noteEn:
				'In your report, write in your own words, cite sources (datasheet, lecture notes) and attach your schematic.',
			items: [
				{
					id: 'pre-1',
					questionEs: 'Conexion del sistema minimo para el PIC18F4550',
					questionEn: 'Minimum system wiring for the PIC18F4550',
					answerEs: `El **sistema minimo** permite que el PIC oscile, se reinicie y se alimente de forma estable:

- **Alimentacion:** VDD = +5 V DC y VSS = tierra (comun) en los pines correspondientes.
- **Oscilador HS (20 MHz):** cristal de **20 MHz** entre los pines OSC1 y OSC2, con un condensador de **1 nF** de cada pin del cristal a tierra (segun la hoja de la practica).
- **Reset (MCLR):** resistencia de **10 kΩ** de MCLR a VDD (pull-up), condensador de **10 nF** de MCLR a tierra para filtrar ruido, y pulsador de reset opcional entre MCLR y tierra.
- **Programacion:** ICSP (PGC/PGD/MCLR/VDD/VSS) si usas PICkit 2/3.

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
					questionEs: 'Explique los puertos del PIC18F4550 usados en esta practica',
					questionEn: 'Explain the PIC18F4550 ports used in this lab',
					answerEs: `En esta practica se usan **cinco puertos** con roles distintos:

| Puerto | Direccion | Funcion en el montaje |
| --- | --- | --- |
| **PORTB** | Entrada (\`TRISB = 0xFF\`) | Operando **A** — DIP switch de 8 bits (RB0–RB7) |
| **PORTD** | Entrada (\`TRISD = 0xFF\`) | Operando **B** — segundo DIP switch (RD0–RD7) |
| **PORTC** | Salida (\`TRISC = 0\`) | LEDs del byte **bajo** del resultado (RC0–RC7 → \`LATC\`) |
| **PORTE** | Salida (\`TRISE = 0\`) | LEDs del byte **alto** en multiplicacion (RE0–RE7 → \`LATE\`) |
| **PORTA** | RA0 entrada | Pulsador NA para **cambiar de operacion** |

Cada puerto digital usa el trio **TRISx** (direccion), **PORTx** (lectura) y **LATx** (escritura de salidas). Los switches llevan resistencias de **10 kΩ** como pull-up; los LEDs llevan **220–330 Ω** en serie.`,
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
					questionEs: '¿Que es la ALU?',
					questionEn: 'What is the ALU?',
					answerEs: `La **ALU** (*Arithmetic Logic Unit*, unidad aritmetico-logica) es el bloque de la **CPU** que ejecuta operaciones sobre datos en registros: sumas, restas, AND, OR, XOR, complemento, incrementos, etc.

En el PIC18F4550 la ALU trabaja principalmente con el registro **WREG** y registros de memoria de datos. No ejecuta programas completos: solo la operacion de **una instruccion por ciclo** (salvo algunas instrucciones de dos ciclos). El resultado puede quedar en WREG, en un registro o en pares especiales como **PRODH:PRODL** (multiplicacion).`,
					answerEn: `The **ALU** (*Arithmetic Logic Unit*) is the **CPU** block that runs operations on register data: add, subtract, AND, OR, XOR, complement, increments, etc.

On the PIC18F4550 the ALU mainly works with **WREG** and data memory registers. It executes **one instruction per cycle** (except some two-cycle instructions). Results may land in WREG, a file register, or special pairs like **PRODH:PRODL** (multiply).`,
				},
				{
					id: 'pre-4',
					questionEs: '¿Cuantas operaciones puede realizar la ALU del PIC18F4550?',
					questionEn: 'How many operations can the PIC18F4550 ALU perform?',
					answerEs: `La ALU no tiene un contador fijo de "modos", pero el **juego de instrucciones** del PIC18 incluye decenas de operaciones aritmeticas y logicas sobre bytes de 8 bits, entre ellas:

- **Aritmetica:** suma (\`ADDWF\`, \`ADDLW\`), resta (\`SUBWF\`, \`SUBLW\`), incremento/decremento (\`INCF\`, \`DECF\`), multiplicacion (\`MULWF\`).
- **Logica:** AND (\`ANDWF\`), OR (\`IORWF\`), XOR (\`XORWF\`), complemento (\`COMF\`).
- **Desplazamientos/rotaciones:** \`RLCF\`, \`RRCF\`, \`RLNCF\`, \`RRNCF\`.

Operaciones como la **division entera** no tienen instruccion dedicada en PIC18: se resuelven **por software** (restas repetidas), como pide esta practica. En el informe puedes listar las instrucciones que usaras en cada rutina del programa.`,
					answerEn: `The ALU does not expose a fixed "mode count", but the PIC18 **instruction set** includes dozens of 8-bit arithmetic and logic operations, including:

- **Arithmetic:** add (\`ADDWF\`, \`ADDLW\`), subtract (\`SUBWF\`, \`SUBLW\`), inc/dec (\`INCF\`, \`DECF\`), multiply (\`MULWF\`).
- **Logic:** AND (\`ANDWF\`), OR (\`IORWF\`), XOR (\`XORWF\`), complement (\`COMF\`).
- **Shifts/rotates:** \`RLCF\`, \`RRCF\`, \`RLNCF\`, \`RRNCF\`.

Integer **division** has no dedicated PIC18 instruction and is done **in software** (repeated subtraction), as required in this lab.`,
				},
				{
					id: 'pre-5',
					questionEs:
						'¿Que instrucciones dispone el PIC18F4550 para operaciones logicas y matematicas?',
					questionEn:
						'Which instructions handle logical and arithmetic operations on this MCU?',
					answerEs: `Instrucciones usadas directamente en la Practica 1:

| Operacion del laboratorio | Instrucciones MPASM |
| --- | --- |
| Suma | \`ADDWF\` |
| Resta | \`SUBWF\` |
| Multiplicacion | \`MULWF\` → resultado en \`PRODH:PRODL\` |
| Division (software) | \`MOVF\`, \`SUBWF\`, \`ADDWF\`, \`INCF\`, \`BCF\`/\`BSF\`, \`GOTO\` (bucle) |
| OR / AND / XOR | \`IORWF\`, \`ANDWF\`, \`XORWF\` |
| Complemento | \`COMF\` |
| Rotar sin acarreo | \`RLNCF\` |

Tambien se usan instrucciones de **configuracion y control**: \`MOVLW\`, \`MOVWF\`, \`CLRF\`, \`BCF\`, \`BSF\`, \`BTFSC\`, \`BTFSS\`, \`CALL\`, \`RETURN\`, \`GOTO\` para inicializar puertos, leer switches y seleccionar la operacion activa.`,
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
			titleEs: 'Post-laboratorio — respuestas de referencia',
			titleEn: 'Post-laboratory — reference answers',
			introEs:
				'Respuestas a las preguntas de cierre del PDF. Complementalas con lo observado en Proteus o en placa fisica.',
			introEn:
				'Answers to the closing questions in the PDF. Add what you observed in Proteus or on hardware.',
			noteEs:
				'Para el informe final incluye conclusiones sobre limitaciones del PIC18 (8 bits, division por software, pines compartidos con UART).',
			noteEn:
				'For the final report, add conclusions about PIC18 limits (8 bits, software division, pins shared with UART).',
			items: [
				{
					id: 'post-1',
					questionEs:
						'¿Cual es la diferencia entre una operacion matematica por hardware y por software?',
					questionEn:
						'What is the difference between a hardware operation and a software operation?',
					answerEs: `**Por hardware (ALU nativa):** el PIC ejecuta **una instruccion** y la ALU produce el resultado en uno o pocos ciclos. Ejemplos en esta practica: \`ADDWF\` (suma), \`SUBWF\` (resta), \`MULWF\` (multiplicacion), \`IORWF\`/\`ANDWF\`/\`XORWF\` (logica).

**Por software (algoritmo):** no existe instruccion directa; el programador escribe una **rutina** con varias instrucciones. Ejemplo: **division entera** en \`division_software\` — repite "si dividendo ≥ divisor, restar e incrementar cociente" hasta que ya no cabe otra resta.

| Criterio | Hardware | Software |
| --- | --- | --- |
| Velocidad | Pocos ciclos | Mas ciclos (depende del algoritmo) |
| Codigo | Una instruccion | Bucle + variables auxiliares |
| Ejemplo en P1 | \`MULWF oper_a\` | Cociente con restas repetidas |

En oral puedes decir: *"La suma la hace la ALU con ADDWF; la division la implementamos nosotros porque el PIC18 no trae DIV."*`,
					answerEn: `**Hardware (native ALU):** the PIC runs **one instruction** and the ALU returns the result in one or a few cycles. Examples in this lab: \`ADDWF\`, \`SUBWF\`, \`MULWF\`, \`IORWF\`/\`ANDWF\`/\`XORWF\`.

**Software (algorithm):** there is no single instruction; you write a **routine**. Example: **integer divide** in \`division_software\` — repeat "while dividend ≥ divisor, subtract and increment quotient".

| | Hardware | Software |
| --- | --- | --- |
| Speed | Few cycles | More cycles |
| Code | One instruction | Loop + helper variables |
| P1 example | \`MULWF oper_a\` | Quotient by repeated subtraction |

Orally: *"Addition uses ADDWF in hardware; division is our algorithm because PIC18 has no DIV instruction."*`,
				},
				{
					id: 'post-2',
					questionEs: '¿Por que no se puede utilizar todo el puerto C como salida?',
					questionEn: 'Why can you not always use all of PORTC as output?',
					answerEs: `En el PIC18F4550 los pines **RC6** y **RC7** tienen funciones **alternativas** importantes:

- **RC6 → TX** (transmision UART / EUSART)
- **RC7 → RX** (recepcion UART)

Por defecto, o en montajes donde se usa comunicacion serial, esos pines estan asignados al modulo **UART** y no se comportan como GPIO simple sin reconfigurar registros (\`TRIS\`, \`SPBRG\`, \`TXSTA\`, \`RCSTA\`, etc.).

En esta practica se configura \`TRISC = 0\` para usar RC0–RC7 como salida a LEDs **porque no usamos UART a la vez**. Aun asi, en el informe debes explicar que:

1. Si activas UART, RC6/RC7 dejan de estar libres para LEDs.
2. Otros pines tambien tienen funciones analogicas o de perifericos (ADC, I2C, SPI) segun el datasheet.
3. Por eso el profesor pregunta: *"¿por que no **todo** PORTC?"* — porque **no todos los pines son GPIO dedicados** en todo momento.`,
					answerEn: `On the PIC18F4550 pins **RC6** and **RC7** have important **alternate functions**:

- **RC6 → TX** (EUSART transmit)
- **RC7 → RX** (EUSART receive)

By default, or when serial is used, those pins belong to **UART** unless you reconfigure registers (\`TRIS\`, \`SPBRG\`, \`TXSTA\`, \`RCSTA\`, etc.).

In this lab \`TRISC = 0\` drives RC0–RC7 to LEDs **because UART is not used**. In your report explain:

1. Enabling UART frees RC6/RC7 from simple GPIO use.
2. Other pins may be analog or peripheral pins (ADC, I2C, SPI) per the datasheet.
3. That is why the question is *"why not **all** of PORTC?"* — **not every pin is a dedicated GPIO at all times.**`,
				},
			],
		},
		design: {
			pseudocodeEs: `INICIO
    Configurar ADCON1 ← digital
    LATC ← 0, LATE ← 0, modo ← 0
    TRISB ← 0xFF, TRISD ← 0xFF    ; entradas (switches)
    TRISA.0 ← 1                   ; RA0 pulsador
    TRISC ← 0, TRISE ← 0          ; salidas (LEDs)

REPITIR SIEMPRE
    oper_a ← PORTB
    oper_b ← PORTD

    SEGUN modo HACER
        0: resultado ← oper_a + oper_b
        1: resultado ← oper_a - oper_b
        2: PRODH:PRODL ← oper_a * oper_b
        3: resultado ← DIVISION_SOFTWARE(oper_a, oper_b)
        4: resultado ← oper_a OR oper_b
        5: resultado ← oper_a AND oper_b
        6: resultado ← oper_a XOR oper_b
        7: resultado ← NOT oper_a
        8: resultado ← ROTAR_IZQ_SIN_ACARREO(oper_a)
    FIN SEGUN

    LATC ← byte_bajo(resultado)
    LATE ← byte_alto(resultado)

    SI flanco_bajada(RA0) ENTONCES
        modo ← modo + 1
        SI modo > 8 ENTONCES modo ← 0
    FIN SI
FIN REPITIR

DIVISION_SOFTWARE(A, B)
    SI B = 0 ENTONCES RETORNAR 0xFF    ; error
    cociente ← 0, resto ← A
    MIENTRAS resto ≥ B HACER
        resto ← resto - B
        cociente ← cociente + 1
    FIN MIENTRAS
    RETORNAR cociente
FIN`,
			pseudocodeEn: `START
    Configure ADCON1 ← digital
    LATC ← 0, LATE ← 0, mode ← 0
    TRISB ← 0xFF, TRISD ← 0xFF    ; inputs (switches)
    TRISA.0 ← 1                   ; RA0 pushbutton
    TRISC ← 0, TRISE ← 0          ; outputs (LEDs)

REPEAT FOREVER
    oper_a ← PORTB
    oper_b ← PORTD

    CASE mode OF
        0: result ← oper_a + oper_b
        1: result ← oper_a - oper_b
        2: PRODH:PRODL ← oper_a * oper_b
        3: result ← SOFTWARE_DIVIDE(oper_a, oper_b)
        4: result ← oper_a OR oper_b
        5: result ← oper_a AND oper_b
        6: result ← oper_a XOR oper_b
        7: result ← NOT oper_a
        8: result ← ROTATE_LEFT_NO_CARRY(oper_a)
    END CASE

    LATC ← low_byte(result)
    LATE ← high_byte(result)

    IF falling_edge(RA0) THEN
        mode ← mode + 1
        IF mode > 8 THEN mode ← 0
    END IF
END REPEAT

SOFTWARE_DIVIDE(A, B)
    IF B = 0 THEN RETURN 0xFF       ; error
    quotient ← 0, remainder ← A
    WHILE remainder ≥ B DO
        remainder ← remainder - B
        quotient ← quotient + 1
    END WHILE
    RETURN quotient
END`,
			flowchartSrc: '/images/practicas/practica-1-flujo.svg',
			flowchartAltEs: 'Diagrama de flujo del programa de la Practica 1',
			flowchartAltEn: 'Practice 1 program flowchart',
			flowchartCaptionEs:
				'Flujo principal: inicializar → bucle → leer operandos → ejecutar modo → mostrar en LEDs → revisar RA0.',
			flowchartCaptionEn:
				'Main flow: init → loop → read operands → run mode → display on LEDs → poll RA0.',
		},
	},
];

export function getLabGuide(practiceSlug: string): LabGuideContent | undefined {
	const normalized = practiceSlug.replace(/^\/+|\/+$/g, '').replace(/^en\//, '');
	return labGuides.find((g) => g.practiceSlug === normalized);
}
