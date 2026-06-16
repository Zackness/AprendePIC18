import type { LabGuideContent } from './types';

export const primerLedGuide: LabGuideContent = {
	practiceSlug: 'practicas/primer-led',
	pre: {
		titleEs: 'Pre-laboratorio — investigación de referencia',
		titleEn: 'Pre-laboratory — reference research',
		introEs:
			'Introducción al primer programa en ensamblador: salidas digitales en GPIO. Base antes de las prácticas formales UNEXPO.',
		introEn:
			'Introduction to your first assembly program: digital GPIO outputs. Foundation before formal UNEXPO labs.',
		noteEs: 'Esta práctica es más corta pero usa el mismo flujo de diseño (pseudocódigo, flujo, examen).',
		noteEn: 'This lab is shorter but uses the same design flow (pseudocode, flowchart, exam).',
		items: [
			{
				id: 'pre-1',
				questionEs: '¿Qué hace el registro TRISB?',
				questionEn: 'What does the TRISB register do?',
				answerEs: `**TRISB** configura la **dirección** de cada pin del puerto B:

- Bit = **1** → pin configurado como **entrada** (alta impedancia).
- Bit = **0** → pin configurado como **salida** (controlado por LATB/PORTB).

Para encender un LED en **RB0** necesitas \`BCF TRISB, 0\` (bit 0 en 0 = salida). Sin configurar TRIS, el pin puede quedar en entrada y el LED no responde.`,
				answerEn: `**TRISB** sets each **PORTB pin direction**:

- Bit = **1** → **input** (high impedance).
- Bit = **0** → **output** (driven by LATB/PORTB).

To drive an LED on **RB0** use \`BCF TRISB, 0\` (bit 0 = output). Without TRIS setup the pin may stay input and the LED won't respond.`,
			},
			{
				id: 'pre-2',
				questionEs: 'Diferencia entre PORTB y LATB al escribir',
				questionEn: 'PORTB vs LATB when writing',
				answerEs: `En salidas digitales se recomienda escribir en **LATB** (*latch*): el valor queda en el registro de salida sin leer accidentalmente el nivel del pin (lectura-modificación-escritura en PORT puede fallar si el pin lee el nivel externo).

\`BSF LATB, 0\` pone RB0 en **alto** (LED encendido si cátodo a tierra con resistencia). \`BCF LATB, 0\` lo apaga.`,
				answerEn: `For digital outputs write **LATB** (*latch*): the value is stored without read-modify-write issues on PORT when the pin reads external level.

\`BSF LATB, 0\` drives RB0 **high** (LED on if cathode to ground with resistor). \`BCF LATB, 0\` turns it off.`,
			},
			{
				id: 'pre-3',
				questionEs: 'Montaje del LED con resistencia',
				questionEn: 'LED wiring with resistor',
				answerEs: `Montaje típico: **RB0** → resistencia **220–330 Ω** → ánodo LED → cátodo LED → **GND**.

La resistencia **limita la corriente** (~10–15 mA) para no dañar el LED ni exceder la corriente máxima del pin del PIC (~25 mA por pin, menos es mejor).`,
				answerEn: `Typical wiring: **RB0** → **220–330 Ω** resistor → LED anode → LED cathode → **GND**.

The resistor **limits current** (~10–15 mA) to protect the LED and stay within the PIC pin limit (~25 mA max per pin; less is better).`,
			},
		],
	},
	post: {
		titleEs: 'Post-laboratorio — investigación de referencia',
		titleEn: 'Post-laboratory — reference research',
		introEs: 'Reflexión tras compilar y simular el primer programa.',
		introEn: 'Reflection after assembling and simulating your first program.',
		noteEs: 'Prueba el ejercicio de mover el LED a RB1 y documenta los cambios.',
		noteEn: 'Try moving the LED to RB1 and document the line changes.',
		items: [
			{
				id: 'post-1',
				questionEs: '¿Por qué el programa termina en un bucle infinito (`GOTO bucle`)?',
				questionEn: 'Why does the program end in an infinite loop (`GOTO bucle`)?',
				answerEs: `Un microcontrolador **no tiene sistema operativo** que retenga el control: tras \`inicio\` el hardware sigue ejecutando instrucciones. Si el programa "terminara" sin bucle, ejecutaría memoria no inicializada. El \`GOTO bucle\` mantiene el LED en el estado deseado hasta reset o nueva programación.`,
				answerEn: `A microcontroller has **no OS** holding control: after \`inicio\` the CPU keeps fetching instructions. Without a loop it would run uninitialized memory. \`GOTO bucle\` keeps the LED state until reset or reprogramming.`,
			},
			{
				id: 'post-2',
				questionEs: '¿Qué cambiarías para parpadear el LED cada 500 ms?',
				questionEn: 'What would you change to blink the LED every 500 ms?',
				answerEs: `Necesitas **alternar** LATB.0 periódicamente con un **retardo** (~500 ms con bucles anidados o Timer0). Pseudocódigo:

\`bucle: toggle RB0 → esperar 500ms → goto bucle\`

Esto introduce **temporización**, tema del curso en Timer0.`,
				answerEn: `You must **toggle** LATB.0 periodically with a **delay** (~500 ms via nested loops or Timer0). Pseudocode:

\`loop: toggle RB0 → wait 500ms → goto loop\`

This introduces **timing**, covered with Timer0 in the course.`,
			},
		],
	},
	design: {
		pseudocodeEs: `INICIO
    LATB ← 0
    TRISB.0 ← 0          ; RB0 salida
    LATB.0 ← 1           ; encender LED
REPITIR SIEMPRE
    ; (futuro: parpadeo con retardo)
FIN REPITIR`,
		pseudocodeEn: `START
    LATB ← 0
    TRISB.0 ← 0          ; RB0 output
    LATB.0 ← 1           ; LED on
REPEAT FOREVER
    ; (future: blink with delay)
END REPEAT`,
		flowchartSrc: '/images/practicas/primer-led-flujo.svg',
		flowchartAltEs: 'Diagrama de flujo práctica primer LED',
		flowchartAltEn: 'First LED practice flowchart',
		flowchartCaptionEs: 'Flujo mínimo: configurar TRIS → encender LED → bucle.',
		flowchartCaptionEn: 'Minimal flow: set TRIS → turn LED on → loop.',
		pseudoPlaceholderEs: `INICIO
    Configurar RB0 como salida
    Encender LED
REPITIR
    (bucle vacío o parpadeo)
FIN REPITIR`,
		pseudoPlaceholderEn: `START
    Configure RB0 as output
    Turn LED on
REPEAT
    (empty loop or blink)
END REPEAT`,
		pseudoHintEs: 'Incluye: CLRF LATB, BCF TRISB,0, BSF LATB,0 y bucle infinito.',
		pseudoHintEn: 'Include: CLRF LATB, BCF TRISB,0, BSF LATB,0 and infinite loop.',
		flowPlaceholderEs: `1. INICIO (óvalo)
2. TRISB.0 ← salida
3. LATB.0 ← 1
4. Bucle infinito`,
		flowPlaceholderEn: `1. START (oval)
2. TRISB.0 ← output
3. LATB.0 ← 1
4. Infinite loop`,
		flowHintsEs: [
			'Inicio / Fin (óvalos)',
			'Config TRIS (rectángulo)',
			'Escribir LAT (rectángulo)',
			'Bucle infinito (flecha de retorno)',
		],
		flowHintsEn: [
			'Start / End (ovals)',
			'TRIS config (rectangle)',
			'Write LAT (rectangle)',
			'Infinite loop (return arrow)',
		],
	},
};
