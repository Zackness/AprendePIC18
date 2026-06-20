import type { TutorialStep } from './tutorial-step-types';

export const detailedPracticeSteps: Record<string, TutorialStep[]> = {
	'practica-2': [
		{
			id: 'p2-setup',
			titleEs: 'Proyecto, CONFIG y pines digitales',
			titleEn: 'Project, CONFIG, and digital pins',
			bodyEs:
				'Crea el proyecto MPASM para **PIC18F4550** (20 MHz HS). Configura `ADCON1 = 0x0F` para que PORTB y PORTD sean digitales. Reserva variables RAM para la tecla detectada, índices de fila/columna y temporizadores de retardo.',
			bodyEn:
				'Create an MPASM project for **PIC18F4550** (20 MHz HS). Set `ADCON1 = 0x0F` so PORTB and PORTD are digital. Reserve RAM for the detected key, row/column indices, and delay counters.',
			code: `        MOVLW   0x0F
        MOVWF   ADCON1
        CLRF    nueva_tecla`,
		},
		{
			id: 'p2-lcd-bus',
			titleEs: 'Configura el bus LCD en 4 bits',
			titleEn: 'Set up the 4-bit LCD bus',
			bodyEs:
				'**PORTD** lleva datos D4–D7 (RD4–RD7), **RS** en RD2 y **E** en RD3. Pon `TRISD = 0` (todo salida). Escribe rutinas `lcd_nibble`, `lcd_cmd` y `lcd_dat` que envíen nibble alto, luego nibble bajo, con pulso en **E**.',
			bodyEn:
				'**PORTD** carries D4–D7 (RD4–RD7), **RS** on RD2, **E** on RD3. Set `TRISD = 0` (all outputs). Write `lcd_nibble`, `lcd_cmd`, and `lcd_dat` routines that send the high nibble, then the low nibble, strobing **E**.',
			code: `        CLRF    LATD
        CLRF    TRISD        ; LCD salidas

; Pulso E: sube, pequeño retardo, baja
lcd_strobe:
        BSF     LATD, 3      ; E = 1
        CALL    retardo_corto
        BCF     LATD, 3      ; E = 0
        RETURN`,
			tipEs: 'Tema de referencia: /comunicacion/lcd-teclado/',
			tipEn: 'Reference topic: /en/comunicacion/lcd-teclado/',
		},
		{
			id: 'p2-lcd-init',
			titleEs: 'Inicializa el HD44780',
			titleEn: 'Initialize the HD44780',
			bodyEs:
				'Secuencia típica en 4 bits: retardo >40 ms tras encender, luego comandos `0x33`, `0x32`, `0x28` (2 líneas, 4 bits), `0x0C` (display on, cursor off), `0x06` (incremento). Prueba escribiendo **TECLA:** en la primera línea antes del teclado.',
			bodyEn:
				'Typical 4-bit sequence: >40 ms delay after power-up, then commands `0x33`, `0x32`, `0x28` (2 lines, 4-bit), `0x0C` (display on, cursor off), `0x06` (entry mode). Test by writing **KEY:** on line 1 before the keyboard logic.',
			code: `lcd_init:
        CALL    retardo_largo
        MOVLW   0x33
        CALL    lcd_cmd
        MOVLW   0x32
        CALL    lcd_cmd
        MOVLW   0x28
        CALL    lcd_cmd
        MOVLW   0x0C
        CALL    lcd_cmd
        RETURN`,
		},
		{
			id: 'p2-scan',
			titleEs: 'Escanea el teclado 4×4 por filas',
			titleEn: 'Scan the 4×4 keyboard by rows',
			bodyEs:
				'**Filas RB0–RB3** como salidas, **columnas RB4–RB7** como entradas con pull-up interno desactivado y resistencias externas. Para cada fila: pon esa fila en **0**, lee PORTB. Si una columna lee 0, calcula el índice y busca el carácter en una **tabla** 4×4 (`1`–`9`, `A`–`D`, `*`, `#`).',
			bodyEn:
				'**Rows RB0–RB3** as outputs, **columns RB4–RB7** as inputs with external pull-ups. For each row: drive it **low**, read PORTB. If a column reads 0, compute the index and look up the character in a **4×4 table** (`1`–`9`, `A`–`D`, `*`, `#`).',
			code: `        MOVLW   0xF0
        MOVWF   TRISB        ; cols in, rows out

tabla_teclas:
        DB      '1','2','3','A'
        DB      '4','5','6','B'
        DB      '7','8','9','C'
        DB      '*','0','#','D'`,
		},
		{
			id: 'p2-irq',
			titleEs: 'Habilita interrupción RB4–RB7',
			titleEn: 'Enable RB4–RB7 interrupt',
			bodyEs:
				'Activa **RBIE** y **GIE**. En la ISR: verifica **RBIF**, llama al escaneo, aplica **antirrebote** (20–50 ms), guarda la tecla y **limpia RBIF** leyendo PORTB. En el bucle principal, si hay tecla nueva, escríbela en la segunda línea del LCD con `lcd_dat`.',
			bodyEn:
				'Enable **RBIE** and **GIE**. In the ISR: check **RBIF**, run the scan, **debounce** (20–50 ms), store the key, and **clear RBIF** by reading PORTB. In the main loop, if there is a new key, write it on LCD line 2 with `lcd_dat`.',
			code: `        BCF     INTCON2, RBPU
        BSF     INTCON, RBIE
        BSF     INTCON, GIE

isr_alta:
        ; guardar contexto ...
        BTFSC   INTCON, RBIF
        CALL    escanear_tecla
        ; leer PORTB limpia RBIF
        ; restaurar contexto / RETFIE`,
		},
		{
			id: 'p2-test',
			titleEs: 'Simula y prueba cada tecla',
			titleEn: 'Simulate and test every key',
			bodyEs:
				'En Proteus verifica que cada tecla muestre el carácter correcto sin duplicados. Si ves rebotes, aumenta el retardo de debounce. **Adapta** pines si tu sección usa otro mapa de filas/columnas — cambia `TRISB`, la tabla y las máscaras de escaneo.',
			bodyEn:
				'In Proteus verify each key shows the correct character without duplicates. If you see bounce, increase debounce delay. **Adapt** pins if your section uses a different row/column map—update `TRISB`, the table, and scan masks.',
		},
	],
	'practica-3': [
		{
			id: 'p3-ports',
			titleEs: 'Configura PORTD y PORTE para el display',
			titleEn: 'Configure PORTD and PORTE for the display',
			bodyEs:
				'**RD0–RD3** envían el BCD al **74LS48**. **RE0–RE3** seleccionan el dígito (transistores). Configura ambos puertos como salida. `ADCON1 = 0x0F` deja RA4/T0CKI digital para la entrada de frecuencia.',
			bodyEn:
				'**RD0–RD3** send BCD to the **74LS48**. **RE0–RE3** select the digit (transistors). Configure both ports as outputs. `ADCON1 = 0x0F` keeps RA4/T0CKI digital for the frequency input.',
			code: `        MOVLW   0x0F
        MOVWF   ADCON1
        CLRF    TRISD
        CLRF    TRISE`,
		},
		{
			id: 'p3-tmr0',
			titleEs: 'Timer0 como contador de pulsos',
			titleEn: 'Timer0 as pulse counter',
			bodyEs:
				'Configura **T0CON**: `T0CS = 1` (contador externo), modo 16 bits, incremento en flanco ascendente en **RA4/T0CKI**. Antes de cada medición limpia **TMR0H:TMR0L**.',
			bodyEn:
				'Configure **T0CON**: `T0CS = 1` (external counter), 16-bit mode, increment on rising edge at **RA4/T0CKI**. Clear **TMR0H:TMR0L** before each measurement.',
			code: `        MOVLW   B'00111000'
        MOVWF   T0CON
        CLRF    TMR0H
        CLRF    TMR0L`,
		},
		{
			id: 'p3-window',
			titleEs: 'Define la ventana de 1 segundo',
			titleEn: 'Define the 1-second window',
			bodyEs:
				'Durante exactamente **1 s**, Timer0 cuenta pulsos externos. Opciones: **Timer1** cada 50 ms (20 ticks = 1 s) en ISR, o retardo calibrado `ventana_1s` que debes ajustar en Proteus. Al cerrar la ventana, copia TMR0H:TMR0L a variables `snap` — ese es tu conteo de frecuencia en Hz.',
			bodyEn:
				'For exactly **1 s**, Timer0 counts external pulses. Options: **Timer1** every 50 ms (20 ticks = 1 s) in an ISR, or a calibrated `ventana_1s` delay tuned in Proteus. When the window closes, copy TMR0H:TMR0L to `snap` variables—that is your frequency count in Hz.',
			tipEs: 'Pseudocódigo oficial en el reto de diseño de esta práctica.',
			tipEn: 'Official pseudocode in this practice design challenge.',
		},
		{
			id: 'p3-bcd',
			titleEs: 'Convierte el conteo a centenas, decenas y unidades',
			titleEn: 'Convert count to hundreds, tens, and units',
			bodyEs:
				'Tras la medición, separa el valor en tres dígitos BCD (máx. 999; si overflow, satura en 999). Guarda en variables `centenas`, `decenas`, `unidades` para el multiplexado.',
			bodyEn:
				'After measurement, split the value into three BCD digits (max 999; saturate at 999 on overflow). Store in `centenas`, `decenas`, `unidades` variables for multiplexing.',
		},
		{
			id: 'p3-mux',
			titleEs: 'Multiplexa los tres dígitos sin parpadeo',
			titleEn: 'Multiplex three digits without flicker',
			bodyEs:
				'En el bucle principal (o ISR corta): activa **un solo dígito** en RE, pon el nibble BCD en RD, espera ~2–5 ms, apaga todos, pasa al siguiente. Repite a >50 Hz por dígito. El ojo ve tres dígitos estables.',
			bodyEn:
				'In the main loop (or short ISR): enable **one digit** on RE, put the BCD nibble on RD, wait ~2–5 ms, turn all off, next digit. Repeat at >50 Hz per digit. The eye sees three stable digits.',
			code: `mostrar_digito:
        ; digito_act = 0..2
        ; seleccionar RE, LATD = centenas/decenas/unidades
        CALL    retardo_corto
        CLRF    LATE           ; apagar todos
        RETURN`,
		},
		{
			id: 'p3-cal',
			titleEs: 'Calibra con una señal conocida',
			titleEn: 'Calibrate with a known signal',
			bodyEs:
				'En Proteus conecta un generador (ej. 100 Hz, 1 kHz). Compara lectura vs valor real. Ajusta `ventana_1s` o recarga de Timer1 hasta que el error sea aceptable. Documenta el rango útil (contador 16 bits → ~65 kHz máx. en 1 s).',
			bodyEn:
				'In Proteus connect a generator (e.g. 100 Hz, 1 kHz). Compare reading vs actual value. Tune `ventana_1s` or Timer1 reload until error is acceptable. Document useful range (16-bit counter → ~65 kHz max in 1 s).',
		},
	],
	'practica-4': [
		{
			id: 'p4-calc',
			titleEs: 'Calcula PR2 para la frecuencia PWM',
			titleEn: 'Calculate PR2 for PWM frequency',
			bodyEs:
				'Con cristal **20 MHz** y prescaler Timer2 = 4, la frecuencia PWM es `Fosc / (4 × prescaler × (PR2 + 1))`. Para ~1 kHz con PR2=249: verifica en papel antes de programar. Anota PR2 y prescaler en tu informe.',
			bodyEn:
				'With **20 MHz** crystal and Timer2 prescaler = 4, PWM frequency is `Fosc / (4 × prescaler × (PR2 + 1))`. For ~1 kHz with PR2=249: verify on paper first. Record PR2 and prescaler in your report.',
			tipEs: 'Teoría: /pwm/',
			tipEn: 'Theory: /en/pwm/',
		},
		{
			id: 'p4-t2',
			titleEs: 'Configura Timer2',
			titleEn: 'Configure Timer2',
			bodyEs:
				'Escribe **T2CON** (prescaler 1:4 o 1:16 según tu cálculo), carga **PR2** y enciende Timer2. RC2/CCP1 debe estar como salida (`TRISC` bit 2 = 0).',
			bodyEn:
				'Write **T2CON** (prescaler 1:4 or 1:16 per your calculation), load **PR2**, and enable Timer2. RC2/CCP1 must be output (`TRISC` bit 2 = 0).',
			code: `        MOVLW   D'249'
        MOVWF   PR2
        MOVLW   B'00000101'   ; T2CKPS prescaler, encender TMR2
        MOVWF   T2CON
        BCF     TRISC, 2`,
		},
		{
			id: 'p4-ccp',
			titleEs: 'Activa CCP1 en modo PWM',
			titleEn: 'Enable CCP1 in PWM mode',
			bodyEs:
				'**CCP1CON** bits 3:0 = 1100 (PWM). Los bits 5:4 de CCP1CON + **CCPR1L** definen el duty (10 bits). Empieza con 50%: `CCPR1L = PR2 / 2`.',
			bodyEn:
				'**CCP1CON** bits 3:0 = 1100 (PWM). CCP1CON bits 5:4 + **CCPR1L** set duty (10 bits). Start at 50%: `CCPR1L = PR2 / 2`.',
			code: `        MOVLW   B'00001100'
        MOVWF   CCP1CON
        MOVLW   D'124'         ; ~50% si PR2=249
        MOVWF   CCPR1L`,
		},
		{
			id: 'p4-duty',
			titleEs: 'Varía el ciclo útil en tu aplicación',
			titleEn: 'Vary duty cycle in your application',
			bodyEs:
				'Conecta un LED o motor en **RC2**. Cambia `CCPR1L` desde el teclado, potenciómetro (ADC) o tabla. Observa brillo o velocidad. **Adapta** el pin si usas CCP2 en otro puerto.',
			bodyEn:
				'Connect an LED or motor on **RC2**. Change `CCPR1L` from keyboard, potentiometer (ADC), or a table. Observe brightness or speed. **Adapt** the pin if you use CCP2 on another port.',
		},
		{
			id: 'p4-test',
			titleEs: 'Mide y documenta en Proteus',
			titleEn: 'Measure and document in Proteus',
			bodyEs:
				'Usa el osciloscopio virtual en RC2. Captura frecuencia y duty. Compara con tus cálculos teóricos. Incluye fórmulas en el informe.',
			bodyEn:
				'Use the virtual scope on RC2. Capture frequency and duty. Compare with your theoretical calculations. Include formulas in the report.',
		},
	],
	'practica-5': [
		{
			id: 'p5-tmr0',
			titleEs: 'Configura Timer0 para overflow periódico',
			titleEn: 'Configure Timer0 for periodic overflow',
			bodyEs:
				'Modo temporizador interno, prescaler según retardo deseado (ej. 1:256). Precarga **TMR0H:TMR0L** para que el overflow ocurra cada X ms. Calcula el valor con la fórmula del Tema 8.',
			bodyEn:
				'Internal timer mode, prescaler for desired delay (e.g. 1:256). Preload **TMR0H:TMR0L** so overflow occurs every X ms. Calculate the value using Topic 8 formulas.',
			tipEs: 'Repaso: /timers/timer0/',
			tipEn: 'Review: /en/timers/timer0/',
		},
		{
			id: 'p5-irq-en',
			titleEs: 'Habilita interrupción del Timer0',
			titleEn: 'Enable Timer0 interrupt',
			bodyEs:
				'Activa **TMR0IE** (INTCON), **PEIE** y **GIE**. En la ISR de Timer0: recarga TMR0, limpia **TMR0IF** y alterna un LED — así verificas que el retardo funciona sin bloquear el main.',
			bodyEn:
				'Enable **TMR0IE** (INTCON), **PEIE**, and **GIE**. In the Timer0 ISR: reload TMR0, clear **TMR0IF**, and toggle an LED—this verifies the delay works without blocking main.',
			code: `        BSF     INTCON, TMR0IE
        BSF     INTCON, PEIE
        BSF     INTCON, GIE`,
		},
		{
			id: 'p5-isr',
			titleEs: 'Escribe la ISR con guardado de contexto',
			titleEn: 'Write the ISR with context save',
			bodyEs:
				'Al entrar: guarda **WREG**, **STATUS** (y BSR si usas bancos). Haz el trabajo (toggle LED, contador, etc.). Restaura en orden inverso y **RETFIE**. Nunca uses rutinas que pisen el contexto sin guardarlo.',
			bodyEn:
				'On entry: save **WREG**, **STATUS** (and BSR if using banks). Do the work (toggle LED, counter, etc.). Restore in reverse order and **RETFIE**. Never call routines that clobber context without saving it.',
			tipEs: 'Guía: /interrupciones/',
			tipEn: 'Guide: /en/interrupciones/',
		},
		{
			id: 'p5-ext',
			titleEs: 'Añade interrupción externa (pulsador)',
			titleEn: 'Add external interrupt (pushbutton)',
			bodyEs:
				'Usa **INT0** (RB0) o **RBIE** (RB4–RB7). En la ISR externa: debounce, cambia un estado (ej. sentido de parpadeo). El **bucle principal no debe hacer polling** del pulsador — solo tareas lentas o sleep.',
			bodyEn:
				'Use **INT0** (RB0) or **RBIE** (RB4–RB7). In the external ISR: debounce, change a state (e.g. blink direction). The **main loop must not poll** the button—only slow tasks or idle work.',
		},
		{
			id: 'p5-main',
			titleEs: 'Bucle principal sin bloqueos',
			titleEn: 'Main loop without blocking',
			bodyEs:
				'El main puede estar casi vacío (`GOTO $`) o hacer tareas de baja prioridad. Todo timing preciso va en ISRs. Verifica en Proteus que el LED parpadea a intervalo estable mientras respondes al pulsador.',
			bodyEn:
				'Main can be nearly empty (`GOTO $`) or run low-priority tasks. All precise timing belongs in ISRs. Verify in Proteus that the LED blinks at a stable interval while the button responds.',
		},
	],
	'practica-6': [
		{
			id: 'p6-wiring',
			titleEs: 'Salidas RC0–RC3 al ULN2003',
			titleEn: 'RC0–RC3 outputs to ULN2003',
			bodyEs:
				'Configura **PORTC** bits 0–3 como salidas. Cada línea va a una bobina del motor paso a paso vía **ULN2003** (corriente mayor que el PIC). RA0 como entrada para invertir sentido.',
			bodyEn:
				'Set **PORTC** bits 0–3 as outputs. Each line drives a stepper coil via **ULN2003** (higher current than the PIC). RA0 as input to reverse direction.',
			code: `        CLRF    TRISC
        BSF     TRISA, 0
        CLRF    LATC`,
		},
		{
			id: 'p6-seq',
			titleEs: 'Tabla de secuencia full-step',
			titleEn: 'Full-step sequence table',
			bodyEs:
				'Secuencia unipolar típica: `0x01, 0x02, 0x04, 0x08` (una bobina a la vez). Guarda la tabla en flash con `DB` y léela con **TBLRD*** o indexa en RAM. Aplica el patrón a **LATC**.',
			bodyEn:
				'Typical unipolar sequence: `0x01, 0x02, 0x04, 0x08` (one coil at a time). Store the table in flash with `DB` and read with **TBLRD*** or index in RAM. Apply the pattern to **LATC**.',
			code: `secuencia:
        DB      0x01, 0x02, 0x04, 0x08

aplicar_fase:
        ; fase = 0..3 -> LATC = secuencia[fase]
        RETURN`,
		},
		{
			id: 'p6-step',
			titleEs: 'Avanza fase y controla sentido',
			titleEn: 'Advance phase and control direction',
			bodyEs:
				'Variable `fase` (0–3). Cada paso: incrementa o decrementa según `sentido` (toggle con RA0). Enlaza con `aplicar_fase` y un **retardo** entre pasos — ese retardo define RPM.',
			bodyEn:
				'Variable `fase` (0–3). Each step: increment or decrement per `sentido` (toggle with RA0). Link to `aplicar_fase` and a **delay** between steps—that delay sets RPM.',
		},
		{
			id: 'p6-delay',
			titleEs: 'Retardo entre pasos con Timer',
			titleEn: 'Delay between steps with Timer',
			bodyEs:
				'Evita retardo busy-wait largo si también usas interrupciones. Opción simple: bucle `retardo_paso` calibrado; opción mejor: Timer0 overflow cada N ms. Ajusta velocidad hasta giro continuo sin vibración excesiva.',
			bodyEn:
				'Avoid long busy-wait if you also use interrupts. Simple option: calibrated `retardo_paso` loop; better: Timer0 overflow every N ms. Tune speed until rotation is smooth without excessive vibration.',
		},
		{
			id: 'p6-test',
			titleEs: 'Prueba giro CW/CCW en Proteus',
			titleEn: 'Test CW/CCW rotation in Proteus',
			bodyEs:
				'Verifica secuencia en LEDs o motor virtual. Pulsa RA0: debe invertir sentido sin perder pasos. Documenta diagrama y tabla de fases en el informe.',
			bodyEn:
				'Verify sequence on LEDs or virtual motor. Press RA0: direction should reverse without losing steps. Document schematic and phase table in the report.',
		},
	],
	'practica-7': [
		{
			id: 'p7-adcon',
			titleEs: 'Configura ADCON1, ADCON2 y ADCON0',
			titleEn: 'Configure ADCON1, ADCON2, and ADCON0',
			bodyEs:
				'**ADCON1**: RA0 analógico (AN0), resto digital (`0x0E`). **ADCON2**: `ADCS = 101` (16 Tosc @ 20 MHz), resultado justificado a la derecha (`ADFM = 1`). **ADCON0**: canal AN0, `ADON = 1`.',
			bodyEn:
				'**ADCON1**: RA0 analog (AN0), rest digital (`0x0E`). **ADCON2**: `ADCS = 101` (16 Tosc @ 20 MHz), right-justified result (`ADFM = 1`). **ADCON0**: channel AN0, `ADON = 1`.',
			code: `        MOVLW   0x0E
        MOVWF   ADCON1
        MOVLW   B'10100010'
        MOVWF   ADCON2
        MOVLW   B'00000001'
        MOVWF   ADCON0`,
			tipEs: 'Teoría ADC: /adc/',
			tipEn: 'ADC theory: /en/adc/',
		},
		{
			id: 'p7-read',
			titleEs: 'Rutina de lectura GO/DONE',
			titleEn: 'GO/DONE read routine',
			bodyEs:
				'Pon **GO = 1** para iniciar conversión. Espera **GO = 0** (polling) o usa interrupción ADIF. Lee **ADRESL** y **ADRESH** → valor 10 bits (0–1023).',
			bodyEn:
				'Set **GO = 1** to start conversion. Wait for **GO = 0** (polling) or use ADIF interrupt. Read **ADRESL** and **ADRESH** → 10-bit value (0–1023).',
			code: `leer_adc:
        BSF     ADCON0, GO
espera:
        BTFSC   ADCON0, GO
        GOTO    espera
        MOVF    ADRESL, W
        MOVWF   adc_l
        MOVF    ADRESH, W
        MOVWF   adc_h
        RETURN`,
		},
		{
			id: 'p7-scale',
			titleEs: 'Escala a voltaje o porcentaje',
			titleEn: 'Scale to voltage or percentage',
			bodyEs:
				'Con Vref = 5 V: `V = lectura × 5 / 1024`. Puedes mostrar mV enteros o mapear a PWM. Implementa división por software o tabla si no cabe en 8 bits.',
			bodyEn:
				'With Vref = 5 V: `V = reading × 5 / 1024`. You can show integer mV or map to PWM. Use software division or a lookup table if it does not fit in 8 bits.',
		},
		{
			id: 'p7-lcd',
			titleEs: 'Muestra el valor en LCD',
			titleEn: 'Display the value on LCD',
			bodyEs:
				'Reutiliza rutinas LCD 4 bit (Práctica 2). Convierte el número a ASCII dígito a dígito (`÷ 1000`, `% 10`, etc.) y escribe en la segunda línea. Actualiza en cada vuelta del bucle principal.',
			bodyEn:
				'Reuse 4-bit LCD routines (Practice 2). Convert the number to ASCII digit by digit (`÷ 1000`, `% 10`, etc.) and write on line 2. Update each main loop pass.',
		},
		{
			id: 'p7-cal',
			titleEs: 'Calibra con el potenciómetro',
			titleEn: 'Calibrate with the potentiometer',
			bodyEs:
				'Gira el potenciómetro de 0 a Vcc y verifica 0–1023 (o 0.00–5.00 V). Si la lectura oscila, promedia 4–8 muestras. Captura pantalla Proteus para el informe.',
			bodyEn:
				'Rotate the pot from 0 to Vcc and verify 0–1023 (or 0.00–5.00 V). If readings jitter, average 4–8 samples. Capture Proteus screenshot for the report.',
		},
	],
	'practica-8': [
		{
			id: 'p8-pins',
			titleEs: 'Configura RC6 (TX) y RC7 (RX)',
			titleEn: 'Configure RC6 (TX) and RC7 (RX)',
			bodyEs:
				'**RC7** entrada (RX), **RC6** salida (TX). Si usas MAX232, el cableado es PIC ↔ MAX232 ↔ DB9/USB-serial. `ADCON1 = 0x0F` para digitales.',
			bodyEn:
				'**RC7** input (RX), **RC6** output (TX). With MAX232: PIC ↔ MAX232 ↔ DB9/USB-serial. `ADCON1 = 0x0F` for digital pins.',
			code: `        BSF     TRISC, 7    ; RX
        BCF     TRISC, 6    ; TX`,
		},
		{
			id: 'p8-baud',
			titleEs: 'Calcula SPBRG para 9600 baudios',
			titleEn: 'Calculate SPBRG for 9600 baud',
			bodyEs:
				'A **20 MHz** con **BRGH = 1**: `SPBRG = (Fosc / (16 × baud)) - 1` → ~129. Documenta el cálculo en el informe. Configura **TXSTA** (async, BRGH, TXEN) y **RCSTA** (SPEN, CREN).',
			bodyEn:
				'At **20 MHz** with **BRGH = 1**: `SPBRG = (Fosc / (16 × baud)) - 1` → ~129. Document the calculation in your report. Configure **TXSTA** (async, BRGH, TXEN) and **RCSTA** (SPEN, CREN).',
			code: `uart_init:
        BCF     TXSTA, SYNC
        BSF     TXSTA, BRGH
        MOVLW   D'129'
        MOVWF   SPBRG
        BSF     RCSTA, SPEN
        BSF     TXSTA, TXEN
        BSF     RCSTA, CREN
        RETURN`,
			tipEs: 'Fórmulas: /comunicacion/uart/',
			tipEn: 'Formulas: /en/comunicacion/uart/',
		},
		{
			id: 'p8-tx',
			titleEs: 'Rutina de transmisión uart_tx',
			titleEn: 'uart_tx transmit routine',
			bodyEs:
				'Espera **TXIF = 1**, escribe el byte en **TXREG**. Envía un saludo (`PIC18 UART\\r\\n`) al arrancar para confirmar que la PC recibe.',
			bodyEn:
				'Wait for **TXIF = 1**, write the byte to **TXREG**. Send a greeting (`PIC18 UART\\r\\n`) at startup to confirm the PC receives data.',
			code: `uart_tx:
        BTFSS   PIR1, TXIF
        GOTO    uart_tx
        MOVWF   TXREG
        RETURN`,
		},
		{
			id: 'p8-echo',
			titleEs: 'Bucle de eco en el main',
			titleEn: 'Echo loop in main',
			bodyEs:
				'Si **RCIF = 1**, lee **RCREG** (limpia el flag), reenvía el mismo byte con `uart_tx`. Abre terminal a **9600 8N1**. Cada tecla debe repetirse en pantalla.',
			bodyEn:
				'If **RCIF = 1**, read **RCREG** (clears flag), send the same byte with `uart_tx`. Open terminal at **9600 8N1**. Each key should echo on screen.',
			code: `bucle:
        BTFSS   PIR1, RCIF
        GOTO    bucle
        MOVF    RCREG, W
        CALL    uart_tx
        GOTO    bucle`,
		},
		{
			id: 'p8-pc',
			titleEs: 'Prueba con terminal en PC',
			titleEn: 'Test with PC terminal',
			bodyEs:
				'PuTTY o Tera Term: COM correcto, 9600 baud. Si ves basura, revisa BRGH/SPBRG o cristal. Si no hay datos, revisa MAX232 y TX/RX cruzados. Guarda captura para el informe.',
			bodyEn:
				'PuTTY or Tera Term: correct COM, 9600 baud. Garbage means check BRGH/SPBRG or crystal. No data means check MAX232 and crossed TX/RX. Save screenshot for the report.',
		},
	],
	'practica-9': [
		{
			id: 'p9-choose',
			titleEs: 'Elige tu sistema integrador',
			titleEn: 'Choose your integrator system',
			bodyEs:
				'Opciones del curso: semáforo, control de nivel, estación con LCD/teclado, etc. Debe ser **realizable** con PIC18F4550 y combinar al menos **3 módulos** (GPIO, timer, ADC, UART, PWM, motor…).',
			bodyEn:
				'Course options: traffic light, level control, station with LCD/keyboard, etc. Must be **feasible** on PIC18F4550 and combine at least **3 modules** (GPIO, timer, ADC, UART, PWM, motor…).',
			tipEs: 'Ideas: /parcial/proyecto-final/ y /proyectos/semaforo/',
			tipEn: 'Ideas: /en/parcial/proyecto-final/ and /en/proyectos/semaforo/',
		},
		{
			id: 'p9-design',
			titleEs: 'Pseudocódigo y diagrama de flujo',
			titleEn: 'Pseudocode and flowchart',
			bodyEs:
				'Antes del .ASM: define entradas, salidas, estados y bucle principal. Incluye óvalos, rectángulos, rombos y ISR si las hay. Tu profesor evalúa el diseño **antes** del código.',
			bodyEn:
				'Before .ASM: define inputs, outputs, states, and main loop. Include ovals, rectangles, diamonds, and ISRs if any. Your instructor evaluates design **before** code.',
		},
		{
			id: 'p9-modules',
			titleEs: 'Código modular en ensamblador',
			titleEn: 'Modular assembly code',
			bodyEs:
				'Separa en archivos o secciones: `init`, `isr`, `lcd`, `adc`, `main`. Reutiliza rutinas de prácticas anteriores **adaptando pines**. Comenta cada rutina con propósito y registros usados.',
			bodyEn:
				'Split into files or sections: `init`, `isr`, `lcd`, `adc`, `main`. Reuse routines from earlier practices **adapting pins**. Comment each routine with purpose and registers used.',
		},
		{
			id: 'p9-sim',
			titleEs: 'Simulación Proteus con evidencias',
			titleEn: 'Proteus simulation with evidence',
			bodyEs:
				'Monta el diagrama completo. Graba capturas de **cada modo** o secuencia del proyecto. Anota qué entradas simulaste (pulsadores, potenciómetro, serial).',
			bodyEn:
				'Build the full schematic. Capture **each mode** or sequence. Note which inputs you simulated (buttons, pot, serial).',
		},
		{
			id: 'p9-demo',
			titleEs: 'Demostración física e informe',
			titleEn: 'Hardware demo and report',
			bodyEs:
				'Presenta en placa (si aplica) y explica **oralmente** el flujo del programa. Informe: objetivo, diagrama, pseudocódigo, listado comentado, pruebas y conclusiones.',
			bodyEn:
				'Demo on hardware (if applicable) and **orally** explain program flow. Report: objective, schematic, pseudocode, commented listing, tests, and conclusions.',
		},
	],
};
