import type { LabGuideContent } from './types';

export const comunicacionSerialGuide: LabGuideContent = {
	practiceSlug: 'practicas/comunicacion-serial',
	pre: {
		titleEs: 'Pre-laboratorio — investigación de referencia',
		titleEn: 'Pre-laboratory — reference research',
		introEs: 'Investigación para la Práctica 8 (Comunicación serial, UNEXPO). Relaciona con EUSART del curso.',
		introEn: 'Research for Practice 8 (Serial communication, UNEXPO). Links to course EUSART.',
		noteEs: 'RC6 = TX y RC7 = RX son pines dedicados a UART en el montaje típico.',
		noteEn: 'RC6 = TX and RC7 = RX are the UART pins in the typical schematic.',
		items: [
			{
				id: 'pre-1',
				questionEs: 'Módulo EUSART del PIC18F4550',
				questionEn: 'PIC18F4550 EUSART module',
				answerEs: `El **EUSART** (*Enhanced Universal Synchronous/Asynchronous Receiver Transmitter*) envía y recibe bytes serie de forma asíncrona:

- **TXSTA** — control transmisión (TXEN, BRGH, etc.).
- **RCSTA** — control recepción (SPEN, CREN, RX9).
- **SPBRG** — baud rate generator.
- **TXREG** / **RCREG** — buffer de transmisión / recepción.

Pines: **RC6 = TX**, **RC7 = RX**. Hay que configurar \`TRISC\` para funciones alternativas y habilitar **SPEN** en RCSTA.`,
				answerEn: `The **EUSART** sends and receives asynchronous serial bytes:

- **TXSTA** — transmit control (TXEN, BRGH, etc.).
- **RCSTA** — receive control (SPEN, CREN, RX9).
- **SPBRG** — baud rate generator.
- **TXREG** / **RCREG** — TX / RX buffer.

Pins: **RC6 = TX**, **RC7 = RX**. Set \`TRISC\` for alternate functions and enable **SPEN** in RCSTA.`,
			},
			{
				id: 'pre-2',
				questionEs: 'Cálculo de SPBRG para baudios deseados',
				questionEn: 'SPBRG calculation for target baud rate',
				answerEs: `Con **BRGH = 1** (high speed, común a 20 MHz):

\`SPBRG = (Fosc / (4 × baud)) - 1\`

Ejemplo: Fosc = 20 MHz, baud = **9600**:

\`SPBRG = (20_000_000 / (4 × 9600)) - 1 ≈ 520\`

Para **115200** el valor es menor. En el informe muestra el cálculo con tu Fosc y el error porcentual respecto al baud ideal.`,
				answerEn: `With **BRGH = 1** (high speed, common at 20 MHz):

\`SPBRG = (Fosc / (4 × baud)) - 1\`

Example: Fosc = 20 MHz, baud = **9600**:

\`SPBRG = (20_000_000 / (4 × 9600)) - 1 ≈ 520\`

For **115200** the value is lower. Show your calculation and percent error in the report.`,
			},
			{
				id: 'pre-3',
				questionEs: '¿Para qué sirve el MAX232 en el diagrama?',
				questionEn: 'What is the MAX232 for in the schematic?',
				answerEs: `El PIC trabaja en niveles **TTL** (0–5 V). El puerto serial de PC (RS-232) usa niveles **±12 V** aproximadamente. El **MAX232** convierte TTL ↔ RS-232 con condensadores externos (charge pump). Sin él, la PC no interpreta correctamente los bits del PIC.`,
				answerEn: `The PIC uses **TTL** levels (0–5 V). A PC serial port (RS-232) uses roughly **±12 V**. The **MAX232** converts TTL ↔ RS-232 using external capacitors. Without it the PC cannot decode the PIC's bits correctly.`,
			},
		],
	},
	post: {
		titleEs: 'Post-laboratorio — investigación de referencia',
		titleEn: 'Post-laboratory — reference research',
		introEs: 'Preguntas tras probar UART con terminal en PC o Proteus.',
		introEn: 'Questions after testing UART with a PC terminal or Proteus.',
		noteEs: 'Adjunta captura de la terminal serial con datos enviados y recibidos.',
		noteEn: 'Attach a terminal screenshot showing sent and received data.',
		items: [
			{
				id: 'post-1',
				questionEs: '¿Cómo sabes que un byte se transmitió correctamente?',
				questionEn: 'How do you know a byte was transmitted correctly?',
				answerEs: `Antes de escribir en **TXREG** verificas que **TXIF** esté en 1 (buffer de transmisión libre). Tras escribir el byte, esperas a que **TXIF** vuelva a 1 antes de enviar el siguiente. En recepción, **RCIF** indica byte listo en **RCREG**; debes leer RCREG para limpiar el flag.`,
				answerEn: `Before writing **TXREG** check **TXIF** is 1 (transmit buffer empty). After writing, wait until **TXIF** is 1 again before the next byte. On receive, **RCIF** means a byte is in **RCREG**; read RCREG to clear the flag.`,
			},
			{
				id: 'post-2',
				questionEs: 'Errores típicos si la terminal muestra basura',
				questionEn: 'Typical errors when the terminal shows garbage',
				answerEs: `Causas frecuentes: **baud rate** incorrecto (SPBRG mal calculado), **BRGH** distinto entre código y supuesto, cable TX/RX **cruzado** mal, **MAX232** mal cableado, o terminal configurada a 9600 mientras el PIC usa 115200. Verifica Fosc real del proyecto (20 MHz HS).`,
				answerEn: `Common causes: wrong **baud rate** (bad SPBRG), **BRGH** mismatch, TX/RX **wiring** error, bad **MAX232** wiring, or terminal at 9600 while PIC uses 115200. Verify project Fosc (20 MHz HS).`,
			},
		],
	},
	design: {
		pseudocodeEs: `INICIO
    Configurar EUSART (SPBRG, TXSTA, RCSTA)
    TRISC.6 ← salida, TRISC.7 ← entrada
REPITIR SIEMPRE
    SI RCIF ENTONCES
        dato_rx ← RCREG
        procesar_comando(dato_rx)
    FIN SI
    SI necesita_enviar ENTONCES
        MIENTRAS TXIF = 0 HACER
        TXREG ← dato_tx
    FIN SI
FIN REPITIR`,
		pseudocodeEn: `START
    Configure EUSART (SPBRG, TXSTA, RCSTA)
    TRISC.6 ← output, TRISC.7 ← input
REPEAT FOREVER
    IF RCIF THEN
        rx_data ← RCREG
        process_command(rx_data)
    END IF
    IF need_tx THEN
        WHILE TXIF = 0 DO
        TXREG ← tx_data
    END IF
END REPEAT`,
		flowchartSrc: '/images/practicas/practica-8-flujo.svg',
		flowchartAltEs: 'Diagrama de flujo Práctica 8 comunicación serial',
		flowchartAltEn: 'Practice 8 serial communication flowchart',
		flowchartCaptionEs: 'Init UART → bucle polling RCIF/TXIF → enviar/recibir bytes.',
		flowchartCaptionEn: 'Init UART → loop polling RCIF/TXIF → send/receive bytes.',
		pseudoPlaceholderEs: `INICIO
    Calcular SPBRG, init UART
REPITIR
    ¿Byte recibido? → leer RCREG
    ¿Enviar? → esperar TXIF, escribir TXREG
FIN REPITIR`,
		pseudoPlaceholderEn: `START
    Compute SPBRG, init UART
REPEAT
    Byte received? → read RCREG
    Send? → wait TXIF, write TXREG
END REPEAT`,
		pseudoHintEs:
			'Incluye: cálculo SPBRG, configuración TXSTA/RCSTA, espera TXIF, lectura RCIF/RCREG y protocolo simple opcional.',
		pseudoHintEn:
			'Include: SPBRG calculation, TXSTA/RCSTA setup, TXIF wait, RCIF/RCREG read and optional simple protocol.',
		flowPlaceholderEs: `1. INICIO
2. Init EUSART + SPBRG
3. ¿RCIF? → leer byte
4. ¿Enviar? → TXIF + TXREG
5. Volver a 3`,
		flowPlaceholderEn: `1. START
2. Init EUSART + SPBRG
3. RCIF? → read byte
4. Send? → TXIF + TXREG
5. Back to 3`,
		flowHintsEs: [
			'Cálculo SPBRG (rectángulo init)',
			'¿RCIF? recepción (rombo)',
			'Leer RCREG (paralelogramo)',
			'¿TXIF libre? (rombo)',
			'Escribir TXREG',
			'Bucle principal',
		],
		flowHintsEn: [
			'SPBRG calculation (init rectangle)',
			'RCIF? receive (diamond)',
			'Read RCREG (parallelogram)',
			'TXIF free? (diamond)',
			'Write TXREG',
			'Main loop',
		],
	},
};
