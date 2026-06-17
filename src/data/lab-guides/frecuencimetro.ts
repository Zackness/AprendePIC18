import type { LabGuideContent } from './types';

export const frecuencimetroGuide: LabGuideContent = {
	practiceSlug: 'practicas/frecuencimetro',
	pre: {
		titleEs: 'Pre-laboratorio — investigación de referencia',
		titleEn: 'Pre-laboratory — reference research',
		introEs:
			'Base de investigación para la Práctica 3 (Frecuencímetro con displays multiplexados, UNEXPO).',
		introEn: 'Research base for Practice 3 (Frequency meter with multiplexed displays, UNEXPO).',
		noteEs: 'Relaciona Timer0/Timer1 del curso con ventana de medición y refresco del display.',
		noteEn: 'Connect course Timer0/Timer1 with measurement window and display refresh.',
		items: [
			{
				id: 'pre-1',
				questionEs: '¿Cómo mide un frecuencímetro la frecuencia de una señal?',
				questionEn: 'How does a frequency meter measure signal frequency?',
				answerEs: `Un frecuencímetro cuenta **pulsos** de la señal desconocida durante un **intervalo de tiempo conocido** (ventana de medición):

\`frecuencia = conteo_de_pulsos / tiempo_ventana\`

Ejemplo: si en 1 segundo entran 1000 flancos ascendentes, la frecuencia es **1000 Hz**. El PIC usa un **timer en modo contador** para los pulsos externos y otro recurso (timer o retardo) para definir la ventana.`,
				answerEn: `A frequency meter counts **pulses** during a **known time window**:

\`frequency = pulse_count / window_time\`

Example: 1000 rising edges in 1 second → **1000 Hz**. The PIC uses a **timer in counter mode** for external pulses and another timer for the window.`,
			},
			{
				id: 'pre-2',
				questionEs: 'Display 7 segmentos multiplexado',
				questionEn: 'Multiplexed 7-segment display',
				answerEs: `Un display **multiplexado** comparte el **bus de segmentos** (a–g, dp) entre varios dígitos y activa **un dígito a la vez** mediante transistores o líneas de selección.

- Ventaja: menos pines (un 74LS48 + 3–4 líneas de dígito en lugar de 7×N segmentos).
- Requisito: **refresco rápido** (~50 Hz por dígito o más) para **persistencia visual** sin parpadeo visible.
- En la práctica: decodificador **74LS48**, transistores para habilitar cada dígito, Timer para alternar dígito activo.`,
				answerEn: `A **multiplexed** display shares the **segment bus** (a–g, dp) and enables **one digit at a time** via transistors or digit select lines.

- Advantage: fewer pins (one 74LS48 + 3–4 digit lines).
- Requirement: **fast refresh** (~50 Hz per digit) for **persistence of vision**.
- In the lab: **74LS48** decoder, transistors per digit, Timer to rotate active digit.`,
			},
			{
				id: 'pre-3',
				questionEs: 'Timers como contador de eventos externos',
				questionEn: 'Timers as external event counters',
				answerEs: `**Timer0** o **Timer1** pueden incrementarse con pulsos externos en el pin T0CKI / T1CKI (según montaje del PDF):

- Configurar prescaler si hace falta ampliar rango.
- Leer registro de 16 bits (TMR0H:TMR0L o TMR1H:TMR1L) al cerrar la ventana.
- Vaciar contador al iniciar nueva medición.

La **ventana de 1 s** puede lograrse con otro timer en modo temporizador o con bucle calibrado + interrupciones.`,
				answerEn: `**Timer0** or **Timer1** can count external pulses on T0CKI / T1CKI (per schematic):

- Configure prescaler to extend range if needed.
- Read 16-bit register when the window closes.
- Clear counter at each new measurement.

A **1 s window** can use another timer or calibrated loop + interrupts.`,
			},
		],
	},
	post: {
		titleEs: 'Post-laboratorio — investigación de referencia',
		titleEn: 'Post-laboratory — reference research',
		introEs: 'Preguntas de análisis tras implementar el frecuencímetro.',
		introEn: 'Analysis questions after implementing the frequency meter.',
		noteEs: 'Compara frecuencia medida en Proteus con el generador de señales configurado.',
		noteEn: 'Compare measured frequency in Proteus with the configured signal generator.',
		items: [
			{
				id: 'post-1',
				questionEs: '¿Qué error introduce un refresco lento del display multiplexado?',
				questionEn: 'What error does slow multiplex refresh cause?',
				answerEs: `Si el refresco es **demasiado lento** (< ~30 Hz por dígito), el ojo percibe **parpadeo** y los dígitos parecen encenderse de forma independiente. Si el refresco pausa la medición demasiado tiempo, puede **distorsionar** la ventana de conteo. La solución es usar **interrupciones periódicas** cortas para el multiplexado sin bloquear el conteo de pulsos.`,
				answerEn: `If refresh is **too slow** (< ~30 Hz per digit), visible **flicker** appears. If refresh blocks measurement too long, the count **window distorts**. Use **short periodic interrupts** for multiplexing without blocking pulse counting.`,
			},
			{
				id: 'post-2',
				questionEs: 'Límites de medición con contador de 16 bits',
				questionEn: 'Measurement limits with a 16-bit counter',
				answerEs: `Un contador de **16 bits** cuenta hasta 65535. Con ventana de 1 s, la frecuencia máxima medible sin desbordar es ~**65 kHz** (teórico). Por encima hay que usar **prescaler** o ventana más corta. En el informe indica el rango útil de tu diseño.`,
				answerEn: `A **16-bit** counter maxes at 65535. With a 1 s window, max frequency without overflow is ~**65 kHz** (theoretical). Above that use a **prescaler** or shorter window. State your design's useful range in the report.`,
			},
		],
	},
	design: {
		pseudocodeEs: `INICIO

Configurar el PIC18F4550.
Configurar los pines analógicos como digitales.
Configurar RA4/T0CKI como entrada de frecuencia.
Configurar el puerto D como salida para el 74LS48 y los transistores de selección.

Inicializar las variables:
    FLAG_1S ← 0
    CNT_50MS ← 20
    CENTENAS ← 0
    DECENAS ← 0
    UNIDADES ← 0

Configurar Timer0:
    Modo contador externo.
    Entrada por RA4/T0CKI.
    Modo de 16 bits.
    Sin prescaler.
    Conteo por flanco ascendente.

Limpiar TMR0H y TMR0L.
Encender Timer0.

Configurar Timer1:
    Modo temporizador interno.
    Prescaler 1:8.
    Carga inicial para interrupciones cada 50 ms.

Habilitar interrupción de Timer1.
Habilitar interrupciones periféricas y globales.
Encender Timer1.

REPETIR SIEMPRE

    Multiplexar los displays:
        Mostrar centenas.
        Esperar retardo corto.
        Apagar displays.

        Mostrar decenas.
        Esperar retardo corto.
        Apagar displays.

        Mostrar unidades.
        Esperar retardo corto.
        Apagar displays.

    SI FLAG_1S = 1 ENTONCES

        FLAG_1S ← 0

        Convertir el conteo capturado del Timer0 a BCD.

        SI el conteo es mayor que 999 ENTONCES
            CENTENAS ← 9
            DECENAS ← 9
            UNIDADES ← 9
        SINO
            Separar el conteo en centenas, decenas y unidades.
        FIN SI

    FIN SI

FIN REPETIR

INTERRUPCIÓN TIMER1

Guardar contexto del programa.

SI la interrupción fue causada por Timer1 ENTONCES

    Limpiar bandera de interrupción de Timer1.
    Recargar Timer1 para generar nuevamente 50 ms.

    CNT_50MS ← CNT_50MS - 1

    SI CNT_50MS = 0 ENTONCES

        CNT_50MS ← 20

        Detener Timer0.
        Leer TMR0L y TMR0H.
        Guardar el conteo de pulsos medido.
        Limpiar TMR0H y TMR0L.
        Encender nuevamente Timer0.

        FLAG_1S ← 1

    FIN SI

FIN SI

Restaurar contexto del programa.
Retornar de la interrupción.`,
		pseudocodeEn: `START

Configure the PIC18F4550.
Set analog pins as digital.
Configure RA4/T0CKI as the frequency input.
Configure PORTD as output for the 74LS48 and digit select transistors.

Initialize variables:
    FLAG_1S ← 0
    CNT_50MS ← 20
    HUNDREDS ← 0
    TENS ← 0
    UNITS ← 0

Configure Timer0:
    External counter mode.
    Input on RA4/T0CKI.
    16-bit mode.
    No prescaler.
    Count on rising edge.

Clear TMR0H and TMR0L.
Turn on Timer0.

Configure Timer1:
    Internal timer mode.
    Prescaler 1:8.
    Preload for 50 ms interrupts.

Enable Timer1 interrupt.
Enable peripheral and global interrupts.
Turn on Timer1.

REPEAT FOREVER

    Multiplex displays:
        Show hundreds.
        Short delay.
        Turn off displays.

        Show tens.
        Short delay.
        Turn off displays.

        Show units.
        Short delay.
        Turn off displays.

    IF FLAG_1S = 1 THEN

        FLAG_1S ← 0

        Convert captured Timer0 count to BCD.

        IF count > 999 THEN
            HUNDREDS ← 9
            TENS ← 9
            UNITS ← 9
        ELSE
            Split count into hundreds, tens, and units.
        END IF

    END IF

END REPEAT

TIMER1 INTERRUPT

Save context.

IF the interrupt was caused by Timer1 THEN

    Clear Timer1 interrupt flag.
    Reload Timer1 for another 50 ms.

    CNT_50MS ← CNT_50MS - 1

    IF CNT_50MS = 0 THEN

        CNT_50MS ← 20

        Stop Timer0.
        Read TMR0L and TMR0H.
        Store the measured pulse count.
        Clear TMR0H and TMR0L.
        Start Timer0 again.

        FLAG_1S ← 1

    END IF

END IF

Restore context.
Return from interrupt.`,
		flowchartSrc: '/images/practicas/practica-3-flujo.svg',
		flowchartAltEs: 'Diagrama de flujo Práctica 3 frecuencímetro',
		flowchartAltEn: 'Practice 3 frequency meter flowchart',
		flowchartCaptionEs: 'Medición por ventana de tiempo + multiplexado de dígitos en ISR.',
		flowchartCaptionEn: 'Time-window measurement + digit multiplexing in ISR.',
		pseudoPlaceholderEs: `INICIO
    Configurar Timer0 como contador externo (RA4/T0CKI)
    Configurar Timer1 para interrupción cada 50 ms
    CNT_50MS ← 20, FLAG_1S ← 0
REPITIR
    Multiplexar centenas/decenas/unidades
    Si FLAG_1S = 1 → convertir conteo a BCD y actualizar displays
FIN REPETIR

ISR Timer1:
    CNT_50MS-- ; si llega a 0 → capturar Timer0 y activar FLAG_1S`,
		pseudoPlaceholderEn: `START
    Set Timer0 as external counter (RA4/T0CKI)
    Set Timer1 for 50 ms interrupts
    CNT_50MS ← 20, FLAG_1S ← 0
REPEAT
    Multiplex hundreds/tens/units
    If FLAG_1S = 1 → BCD convert and update digits
END REPEAT

Timer1 ISR:
    CNT_50MS-- ; if 0 → capture Timer0 and set FLAG_1S`,
		pseudoHintEs:
			'Incluye: Timer0 como contador, Timer1 como base de 50 ms, contador CNT_50MS (20×50 ms = 1 s), multiplexado y la ISR (guardar/restaurar contexto).',
		pseudoHintEn:
			'Include: Timer0 as counter, Timer1 50 ms tick, CNT_50MS (20×50 ms = 1 s), multiplexing and the ISR (save/restore context).',
		flowPlaceholderEs: `DIAGRAMA 1 (principal)
1. INICIO
2. Configurar PIC + puertos
3. Inicializar variables (FLAG_1S, CNT_50MS, dígitos)
4. Configurar Timer0 (contador) + encender
5. Configurar Timer1 (50 ms) + habilitar IRQ + encender
6. Multiplexar displays
7. ¿FLAG_1S = 1? → limpiar flag → convertir a BCD → ¿>999? → actualizar dígitos
8. Volver a multiplexar

DIAGRAMA 2 (ISR Timer1)
1. Guardar contexto
2. ¿TMR1IF? → limpiar flag + recargar TMR1 → CNT_50MS-- → ¿0? → capturar Timer0 y FLAG_1S=1
3. Restaurar contexto → RETFIE`,
		flowPlaceholderEn: `DIAGRAM 1 (main)
1. START
2. Configure PIC + ports
3. Init variables (FLAG_1S, CNT_50MS, digits)
4. Configure Timer0 (counter) + start
5. Configure Timer1 (50 ms) + enable IRQ + start
6. Multiplex displays
7. FLAG_1S = 1? → clear flag → BCD convert → >999? → update digits
8. Loop back to multiplex

DIAGRAM 2 (Timer1 ISR)
1. Save context
2. TMR1IF? → clear flag + reload TMR1 → CNT_50MS-- → 0? → capture Timer0 and set FLAG_1S=1
3. Restore context → RETFIE`,
		flowHintsEs: [
			'Timer0 como contador externo (RA4/T0CKI)',
			'Timer1 como tick de 50 ms (CNT_50MS=20 → 1 s)',
			'Multiplexado centenas/decenas/unidades',
			'Decisión FLAG_1S en el bucle principal',
			'ISR: guardar/restaurar contexto + captura Timer0',
			'Saturación >999 → 999',
		],
		flowHintsEn: [
			'Timer0 external counter (RA4/T0CKI)',
			'Timer1 50 ms tick (CNT_50MS=20 → 1 s)',
			'Multiplex hundreds/tens/units',
			'FLAG_1S decision in main loop',
			'ISR: save/restore context + capture Timer0',
			'Saturate >999 → 999',
		],
	},
};
