import type { LabGuideContent } from './types';

export const tecladoLcdGuide: LabGuideContent = {
	practiceSlug: 'practicas/teclado-lcd',
	pre: {
		titleEs: 'Pre-laboratorio — investigación de referencia',
		titleEn: 'Pre-laboratory — reference research',
		introEs:
			'Respuestas orientadas al PDF de la Práctica 2 (Teclado y LCD, UNEXPO). Úsalas para investigar antes del laboratorio y redactar el informe con tus propias palabras.',
		introEn:
			'Answers aligned with Practice 2 (Keyboard and LCD, UNEXPO). Use them to research before the lab and write your report in your own words.',
		noteEs: 'No copies textualmente. El informe debe incluir tu pseudocódigo, diagrama de flujo y explicación del escaneo del teclado.',
		noteEn: 'Do not copy verbatim. Your report must include your pseudocode, flowchart and keyboard scan explanation.',
		items: [
			{
				id: 'pre-1',
				questionEs: '¿Qué es el controlador HD44780 y cómo se comunica con el PIC?',
				questionEn: 'What is the HD44780 controller and how does it talk to the PIC?',
				answerEs: `El **HD44780** es el controlador estándar de displays LCD alfanuméricos (16×2, 20×4, etc.). Se comunica por un **bus paralelo**:

- **RS** (Register Select): 0 = comando, 1 = dato de carácter.
- **E** (Enable): pulso de habilitación para latch de datos.
- **Datos:** modo **4 bits** (nibble alto + nibble bajo) o 8 bits.

En la Práctica 2 el bus de datos usa **RD4–RD7**, **RS = RD2** y **E = RD3**. El PIC envía comandos de inicialización (función 4 bits, 2 líneas, cursor off) y luego escribe caracteres en la DDRAM del LCD.`,
				answerEn: `The **HD44780** is the standard controller for alphanumeric LCDs (16×2, 20×4, etc.). It uses a **parallel bus**:

- **RS**: 0 = command, 1 = character data.
- **E**: enable strobe to latch data.
- **Data:** **4-bit** mode (high nibble + low nibble) or 8-bit.

In Practice 2 the data bus uses **RD4–RD7**, **RS = RD2**, **E = RD3**. The PIC sends init commands then writes characters to LCD DDRAM.`,
			},
			{
				id: 'pre-2',
				questionEs: '¿Cómo funciona un teclado matricial 4×4?',
				questionEn: 'How does a 4×4 matrix keyboard work?',
				answerEs: `Un teclado **matricial** conecta **4 filas** y **4 columnas** formando una matriz de 16 teclas. Para detectar una tecla:

1. Se configuran las **filas como salidas** (o se activan en bajo) y las **columnas como entradas** con pull-up.
2. Se barre fila por fila poniendo una fila en **0** y leyendo columnas.
3. Si una columna lee **0**, hay una tecla presionada en la intersección (fila, columna).
4. Se usa una **tabla de correspondencia** fila/columna → carácter ('0'–'9', 'A'–'D', '*', '#').

En el montaje UNEXPO: **filas RB0–RB3**, **columnas RB4–RB7** con pull-up de 10 kΩ.`,
				answerEn: `A **matrix** keyboard has **4 rows** and **4 columns** (16 keys). To detect a key:

1. **Rows** as outputs (or driven low) and **columns** as inputs with pull-ups.
2. Scan each row low and read columns.
3. A **0** on a column means a key at (row, column).
4. A lookup table maps row/column → character ('0'–'9', 'A'–'D', '*', '#').

In the UNEXPO build: **rows RB0–RB3**, **columns RB4–RB7** with 10 kΩ pull-ups.`,
			},
			{
				id: 'pre-3',
				questionEs: 'Interrupción por cambio en RB4–RB7 (PORTB)',
				questionEn: 'Interrupt on change RB4–RB7 (PORTB)',
				answerEs: `El PIC18 puede generar interrupción cuando cambia el nivel en **RB4–RB7** (pines configurados como entradas):

- **INTCON.RBIF** — flag de interrupción PORTB.
- **INTCON.RBIE** — habilitar interrupción.
- **INTCON.RBIP** — prioridad (si aplica).

Al presionar una tecla, una columna cambia de estado y dispara la ISR. En la rutina de interrupción se **escanea** el teclado, se **debouncea** (retardo corto) y se guarda la tecla. Se debe **limpiar RBIF** leyendo PORTB antes de salir de la ISR para evitar rebotes falsos.`,
				answerEn: `The PIC18 can interrupt when **RB4–RB7** change level:

- **INTCON.RBIF** — PORTB interrupt flag.
- **INTCON.RBIE** — enable interrupt.
- **INTCON.RBIP** — priority (if used).

A key press changes a column and triggers the ISR. The ISR **scans** the keyboard, **debounces**, and stores the key. Clear **RBIF** by reading PORTB before leaving the ISR.`,
			},
			{
				id: 'pre-4',
				questionEs: 'Librería LCD.INC y macros MPASM',
				questionEn: 'LCD.INC library and MPASM macros',
				answerEs: `La práctica pide usar la librería **LCD.INC** del curso (Tema 7.1) en modo **4 bits**. Típicamente incluye macros como:

- \`LCDinit\` — secuencia de inicialización HD44780.
- \`LCDcmd\` — envía comando.
- \`LCDchar\` — escribe un carácter ASCII.
- \`LCDlinea1\` / \`LCDlinea2\` — posiciona cursor.

Las **macros** expanden en ensamblador en tiempo de compilación, evitando repetir la secuencia nibble-alto/nibble-bajo en cada byte. En el informe explica qué hace cada macro que uses.`,
				answerEn: `The lab requires **LCD.INC** from the course (Topic 7.1) in **4-bit** mode. Typical macros:

- \`LCDinit\` — HD44780 init sequence.
- \`LCDcmd\` — send command.
- \`LCDchar\` — write ASCII character.
- \`LCDlinea1\` / \`LCDlinea2\` — set cursor position.

**Macros** expand at assemble time. In your report explain each macro you use.`,
			},
		],
	},
	post: {
		titleEs: 'Post-laboratorio — investigación de referencia',
		titleEn: 'Post-laboratory — reference research',
		introEs: 'Preguntas de cierre típicas del informe de la Práctica 2.',
		introEn: 'Typical closing questions for the Practice 2 report.',
		noteEs: 'Incluye capturas de Proteus o fotos del montaje y explica el antirrebote que implementaste.',
		noteEn: 'Include Proteus screenshots or hardware photos and explain your debounce approach.',
		items: [
			{
				id: 'post-1',
				questionEs: '¿Por qué el LCD usa modo 4 bits en lugar de 8?',
				questionEn: 'Why does the LCD use 4-bit mode instead of 8?',
				answerEs: `El modo **4 bits** reduce el número de pines del PIC: solo se usan **4 líneas de datos** (RD4–RD7) más RS y E, en lugar de 8 datos + control. El HD44780 recibe cada byte en **dos nibbles** consecutivos (alto, luego bajo). Es el estándar en laboratorio cuando hay limitación de pines.`,
				answerEn: `**4-bit** mode saves PIC pins: only **4 data lines** (RD4–RD7) plus RS and E, instead of 8 data + control. The HD44780 receives each byte as **two nibbles** (high, then low). Standard in labs with pin constraints.`,
			},
			{
				id: 'post-2',
				questionEs: '¿Qué problemas puede causar no hacer debounce en el teclado?',
				questionEn: 'What problems occur without keyboard debouncing?',
				answerEs: `Sin **antirrebote**, un solo pulsado mecánico puede generar **varias interrupciones** o lecturas múltiples del mismo carácter en el LCD. Soluciones comunes: retardo de **20–50 ms** tras detectar tecla, ignorar lecturas repetidas hasta soltar, o filtrar en software en la ISR principal.`,
				answerEn: `Without **debouncing**, one mechanical press can trigger **multiple interrupts** or duplicate characters on the LCD. Common fixes: **20–50 ms** delay after detection, ignore repeats until release, or filter in software inside the ISR.`,
			},
		],
	},
	design: {
		pseudocodeEs: `INICIO
    Inicializar LCD (4 bits, 2 líneas)
    Configurar RB0-RB3 salidas, RB4-RB7 entradas
    Habilitar interrupción RB4-RB7
    buffer ← "", pos ← 1
REPITIR SIEMPRE
    SI nueva_tecla ENTONCES
        SI tecla = '#' ENTONCES mostrar buffer en LCD
        SINO buffer ← buffer + tecla; escribir tecla en LCD
    FIN SI
FIN REPITIR

ISR_PORTB:
    escanear matriz → tecla
    debounce 30 ms
    marcar nueva_tecla
    limpiar RBIF
FIN ISR`,
		pseudocodeEn: `START
    Init LCD (4-bit, 2 lines)
    Config RB0-RB3 outputs, RB4-RB7 inputs
    Enable RB4-RB7 interrupt
    buffer ← "", pos ← 1
REPEAT FOREVER
    IF new_key THEN
        IF key = '#' THEN display buffer on LCD
        ELSE buffer ← buffer + key; write key to LCD
    END IF
END REPEAT

ISR_PORTB:
    scan matrix → key
    debounce 30 ms
    set new_key flag
    clear RBIF
END ISR`,
		flowchartSrc: '/images/practicas/practica-2-flujo.svg',
		flowchartAltEs: 'Diagrama de flujo Práctica 2 teclado y LCD',
		flowchartAltEn: 'Practice 2 keyboard and LCD flowchart',
		flowchartCaptionEs: 'Flujo: init LCD/teclado → bucle principal → ISR escanea tecla → actualiza LCD.',
		flowchartCaptionEn: 'Flow: init LCD/keyboard → main loop → ISR scans key → update LCD.',
		pseudoPlaceholderEs: `INICIO
    Inicializar LCD y puerto B
    Habilitar interrupción RB4-RB7
REPITIR
    Esperar tecla (bandera)
    Decodificar fila/columna
    Mostrar carácter en LCD
FIN REPITIR`,
		pseudoPlaceholderEn: `START
    Init LCD and PORTB
    Enable RB4-RB7 interrupt
REPEAT
    Wait for key (flag)
    Decode row/column
    Display character on LCD
END REPEAT`,
		pseudoHintEs:
			'Incluye: init LCD 4 bits, escaneo matricial, tabla de teclas, ISR PORTB, debounce y actualización del display.',
		pseudoHintEn:
			'Include: 4-bit LCD init, matrix scan, key table, PORTB ISR, debounce and display update.',
		flowPlaceholderEs: `1. INICIO
2. Init LCD + teclado
3. Bucle principal (espera bandera)
4. ISR: escanear matriz (subrutina aparte)
5. ¿Tecla válida? → escribir LCD
6. Volver al bucle`,
		flowPlaceholderEn: `1. START
2. Init LCD + keyboard
3. Main loop (wait flag)
4. ISR: scan matrix (subroutine aside)
5. Valid key? → write LCD
6. Loop back`,
		flowHintsEs: [
			'Init LCD y teclado (rectángulos)',
			'Bucle principal (flecha de retorno)',
			'ISR / interrupción (caja aparte)',
			'Escaneo matricial (subrutina)',
			'Decisión tecla válida (rombo)',
			'Escribir en LCD (paralelogramo)',
		],
		flowHintsEn: [
			'Init LCD and keyboard (rectangles)',
			'Main loop (return arrow)',
			'ISR / interrupt (separate box)',
			'Matrix scan (subroutine)',
			'Valid key? (diamond)',
			'Write to LCD (parallelogram)',
		],
	},
};
