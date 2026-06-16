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
    Configurar Timer0 contador (entrada frecuencia)
    Configurar Timer1 interrupción refresco display
    Inicializar 74LS48 y líneas de dígito
    conteo ← 0, digito_activo ← 0
REPITIR SIEMPRE
    SI ventana_1s_cerrada ENTONCES
        frec ← conteo
        conteo ← 0
        valor_BCD ← convertir(frec)
    FIN SI
    mostrar_digito(valor_BCD[digito_activo])
FIN REPITIR`,
		pseudocodeEn: `START
    Config Timer0 counter (frequency input)
    Config Timer1 interrupt for display refresh
    Init 74LS48 and digit select lines
    count ← 0, active_digit ← 0
REPEAT FOREVER
    IF 1s_window_closed THEN
        freq ← count
        count ← 0
        bcd_value ← convert(freq)
    END IF
    show_digit(bcd_value[active_digit])
END REPEAT`,
		flowchartSrc: '/images/practicas/practica-3-flujo.svg',
		flowchartAltEs: 'Diagrama de flujo Práctica 3 frecuencímetro',
		flowchartAltEn: 'Practice 3 frequency meter flowchart',
		flowchartCaptionEs: 'Medición por ventana de tiempo + multiplexado de dígitos en ISR.',
		flowchartCaptionEn: 'Time-window measurement + digit multiplexing in ISR.',
		pseudoPlaceholderEs: `INICIO
    Init timers y display
REPITIR
    Contar pulsos en ventana T
    Calcular f = conteo / T
    Mostrar en displays multiplexados
FIN REPITIR`,
		pseudoPlaceholderEn: `START
    Init timers and display
REPEAT
    Count pulses in window T
    Compute f = count / T
    Show on multiplexed displays
END REPEAT`,
		pseudoHintEs:
			'Incluye: timer contador, ventana de medición, conversión a BCD, multiplexado por dígito e ISR de refresco.',
		pseudoHintEn:
			'Include: counter timer, measurement window, BCD conversion, per-digit multiplexing and refresh ISR.',
		flowPlaceholderEs: `1. INICIO
2. Init hardware
3. Abrir ventana / contar pulsos
4. ¿Ventana lista? → calcular frecuencia
5. Multiplexar dígitos (ISR)
6. Bucle`,
		flowPlaceholderEn: `1. START
2. Init hardware
3. Open window / count pulses
4. Window done? → compute frequency
5. Multiplex digits (ISR)
6. Loop`,
		flowHintsEs: [
			'Timer contador (rectángulo)',
			'Ventana de tiempo (rombo)',
			'Cálculo f = N/T (rectángulo)',
			'Conversión BCD (subrutina)',
			'Multiplexado (ISR aparte)',
			'Bucle principal',
		],
		flowHintsEn: [
			'Counter timer (rectangle)',
			'Time window (diamond)',
			'Compute f = N/T (rectangle)',
			'BCD conversion (subroutine)',
			'Multiplexing (ISR aside)',
			'Main loop',
		],
	},
};
