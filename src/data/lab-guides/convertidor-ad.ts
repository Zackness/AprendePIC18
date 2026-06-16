import type { LabGuideContent } from './types';

export const convertidorAdGuide: LabGuideContent = {
	practiceSlug: 'practicas/convertidor-ad',
	pre: {
		titleEs: 'Pre-laboratorio — investigación de referencia',
		titleEn: 'Pre-laboratory — reference research',
		introEs: 'Investigación para la Práctica 7 (Convertidor A/D, UNEXPO). Relaciona con el Tema 9 del curso.',
		introEn: 'Research for Practice 7 (A/D converter, UNEXPO). Links to course Topic 9.',
		noteEs: 'Con cristal de 20 MHz usa ADCS = 101 (16 Tosc) en ADCON2 según la guía del curso.',
		noteEn: 'With a 20 MHz crystal use ADCS = 101 (16 Tosc) in ADCON2 per the course guide.',
		items: [
			{
				id: 'pre-1',
				questionEs: 'Registros ADCON0, ADCON1 y ADCON2',
				questionEn: 'ADCON0, ADCON1 and ADCON2 registers',
				answerEs: `El ADC de 10 bits del PIC18F4550 se configura con tres registros:

| Registro | Función principal |
| --- | --- |
| **ADCON0** | Canal (\`CHS\`), encendido ADC (\`ADON\`), inicio conversión (\`GO/DONE\`) |
| **ADCON1** | Qué pines son analógicos vs digitales (\`PCFG\`) |
| **ADCON2** | Reloj de conversión (\`ADCS\`), justificación resultado (\`ADFM\`), tiempo de adquisición |

Flujo típico: configurar una vez ADCON1/ADCON2 → seleccionar canal en ADCON0 → poner \`GO=1\` → esperar \`GO=0\` → leer \`ADRESH:ADRESL\`.`,
				answerEn: `The PIC18F4550 10-bit ADC uses three registers:

| Register | Main role |
| --- | --- |
| **ADCON0** | Channel (\`CHS\`), ADC on (\`ADON\`), start conversion (\`GO/DONE\`) |
| **ADCON1** | Analog vs digital pins (\`PCFG\`) |
| **ADCON2** | Conversion clock (\`ADCS\`), result format (\`ADFM\`), acquisition time |

Typical flow: set ADCON1/ADCON2 once → select channel in ADCON0 → set \`GO=1\` → wait \`GO=0\` → read \`ADRESH:ADRESL\`.`,
			},
			{
				id: 'pre-2',
				questionEs: 'Canal AN0 y potenciómetro en la práctica',
				questionEn: 'AN0 channel and potentiometer in the lab',
				answerEs: `El **potenciómetro** actúa como divisor de voltaje entre VDD y VSS. El cursor conecta a **RA0/AN0**. El valor digital representa la posición del potenciómetro:

\`V_in = (ADRES / 1023) × V_ref\`

Con \`V_ref = VDD = 5 V\`, ADRES = 512 ≈ 2.5 V. Configura **ADCON1** para que RA0 sea analógico y el resto de pines usados como digital (LCD).`,
				answerEn: `The **potentiometer** divides voltage between VDD and VSS. The wiper connects to **RA0/AN0**. The digital value represents wiper position:

\`V_in = (ADRES / 1023) × V_ref\`

With \`V_ref = VDD = 5 V\`, ADRES = 512 ≈ 2.5 V. Set **ADCON1** so RA0 is analog and other pins used by the LCD are digital.`,
			},
			{
				id: 'pre-3',
				questionEs: 'Bit GO/DONE y tiempo de conversión',
				questionEn: 'GO/DONE bit and conversion time',
				answerEs: `\`GO/DONE\` en ADCON0:

- Escribes **1** en GO → inicia la conversión.
- Hardware pone **0** cuando termina.

El tiempo depende de **ADCS** (periodo Tad) y tiempo de adquisición. Con **20 MHz** y ADCS = **101** (16 Tosc), Tad cumple el mínimo del datasheet. No leas el resultado mientras GO = 1.`,
				answerEn: `\`GO/DONE\` in ADCON0:

- Write **1** to GO → starts conversion.
- Hardware clears to **0** when done.

Time depends on **ADCS** (Tad) and acquisition time. At **20 MHz** with ADCS = **101** (16 Tosc), Tad meets the datasheet minimum. Do not read the result while GO = 1.`,
			},
		],
	},
	post: {
		titleEs: 'Post-laboratorio — investigación de referencia',
		titleEn: 'Post-laboratory — reference research',
		introEs: 'Preguntas de cierre sobre ADC y visualización.',
		introEn: 'Closing questions on ADC and display.',
		noteEs: 'Grafica voltaje vs ADRES en el informe si puedes.',
		noteEn: 'Plot voltage vs ADRES in your report if possible.',
		items: [
			{
				id: 'post-1',
				questionEs: '¿Por qué se justifica el resultado a la derecha (ADFM = 1)?',
				questionEn: 'Why right-justify the result (ADFM = 1)?',
				answerEs: `Con **ADFM = 1** (justificado a la derecha), los 10 bits útiles quedan en las posiciones bajas de \`ADRESH:ADRESL\`, facilitando tratar el resultado como entero de 16 bits (\`movff ADRESL, WREG\` + parte alta). Con justificación a la izquierda los bits están repartidos de forma distinta y el código de escalado cambia.`,
				answerEn: `With **ADFM = 1** (right-justified), the 10 useful bits sit in the low positions of \`ADRESH:ADRESL\`, making it easier to treat the value as a 16-bit integer. Left-justified format spreads bits differently and changes scaling code.`,
			},
			{
				id: 'post-2',
				questionEs: 'Fuentes de error en la lectura ADC',
				questionEn: 'Sources of error in ADC readings',
				answerEs: `Errores comunes: **ruido** en la línea analógica (falta de capacitor 100 nF en AN0), **impedancia alta** del potenciómetro, **referencia** inestable (VDD ruidoso), **código** que lee antes de que GO = 0, o **cruce** con LCD que comparte alimentación. En el informe menciona al menos dos y cómo los mitigaste.`,
				answerEn: `Common errors: **noise** on the analog line (missing 100 nF on AN0), high **impedance**, unstable **reference** (noisy VDD), reading before **GO = 0**, or **supply** noise shared with the LCD. Mention at least two in your report and how you mitigated them.`,
			},
		],
	},
	design: {
		pseudocodeEs: `INICIO
    Configurar ADCON1 (AN0 analógico)
    Configurar ADCON2 (ADCS=101, ADFM=1)
    ADCON0 ← canal 0, ADON=1
    Inicializar LCD
REPITIR SIEMPRE
    GO ← 1
    MIENTRAS GO = 1 HACER ; esperar
    valor ← ADRESH:ADRESL
    voltaje ← escalar(valor)
    mostrar voltaje en LCD
FIN REPITIR`,
		pseudocodeEn: `START
    Configure ADCON1 (AN0 analog)
    Configure ADCON2 (ADCS=101, ADFM=1)
    ADCON0 ← channel 0, ADON=1
    Init LCD
REPEAT FOREVER
    GO ← 1
    WHILE GO = 1 DO ; wait
    value ← ADRESH:ADRESL
    voltage ← scale(value)
    display voltage on LCD
END REPEAT`,
		flowchartSrc: '/images/practicas/practica-7-flujo.svg',
		flowchartAltEs: 'Diagrama de flujo Práctica 7 convertidor A/D',
		flowchartAltEn: 'Practice 7 A/D converter flowchart',
		flowchartCaptionEs: 'Configuración ADC una vez; bucle: convertir → escalar → mostrar LCD.',
		flowchartCaptionEn: 'One-time ADC setup; loop: convert → scale → show on LCD.',
		pseudoPlaceholderEs: `INICIO
    Config ADCON0/1/2
    Init LCD
REPITIR
    Iniciar conversión (GO=1)
    Esperar GO=0
    Leer ADRES, mostrar en LCD
FIN REPITIR`,
		pseudoPlaceholderEn: `START
    Config ADCON0/1/2
    Init LCD
REPEAT
    Start conversion (GO=1)
    Wait GO=0
    Read ADRES, show on LCD
END REPEAT`,
		pseudoHintEs:
			'Incluye: configuración de registros ADC, espera de GO/DONE, lectura de 10 bits y rutina de visualización en LCD.',
		pseudoHintEn:
			'Include: ADC register setup, GO/DONE wait, 10-bit read and LCD display routine.',
		flowPlaceholderEs: `1. INICIO
2. Config ADC + LCD
3. GO ← 1
4. ¿GO = 0? (espera)
5. Leer ADRES
6. Mostrar → volver a 3`,
		flowPlaceholderEn: `1. START
2. Config ADC + LCD
3. GO ← 1
4. GO = 0? (wait)
5. Read ADRES
6. Display → back to 3`,
		flowHintsEs: [
			'Config ADCON (rectángulo inicial)',
			'Inicio conversión GO=1',
			'Espera GO/DONE (rombo)',
			'Leer ADRESH:L (paralelogramo)',
			'Escalar / LCD (subrutina)',
			'Bucle',
		],
		flowHintsEn: [
			'ADCON config (initial rectangle)',
			'Start conversion GO=1',
			'Wait GO/DONE (diamond)',
			'Read ADRESH:L (parallelogram)',
			'Scale / LCD (subroutine)',
			'Loop',
		],
	},
};
