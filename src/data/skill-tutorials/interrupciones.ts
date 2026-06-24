import type { SkillTutorialSeries } from './types';

const SHELL_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF

        ORG     0x0000
        GOTO    inicio

        ORG     0x0008            ; vector alta (tambien ORG 08H)
        GOTO    isr_alta

        ORG     0x0018            ; vector baja (tambien ORG 18H)
        GOTO    isr_baja

; --- variables en RAM ---
        CBLOCK  0x20
temp_w
temp_status
        ENDC

; --- subrutinas ---
init_gpio:
        RETURN

init_timer0:
        RETURN

isr_alta:
        RETFIE

isr_baja:
        RETFIE

; --- programa principal ---
inicio:
        CALL    init_gpio
        CALL    init_timer0
bucle:
        GOTO    bucle

        END`;

const VARS_CODE = SHELL_CODE;

const GPIO_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF

        ORG     0x0000
        GOTO    inicio

        ORG     0x0008
        GOTO    isr_alta

        ORG     0x0018
        GOTO    isr_baja

        CBLOCK  0x20
temp_w
temp_status
        ENDC

init_gpio:
        BCF     TRISB, 0      ; RB0 salida (LED)
        BCF     LATB, 0       ; LED apagado al arrancar
        RETURN

init_timer0:
        RETURN

isr_alta:
        RETFIE

isr_baja:
        RETFIE

inicio:
        CALL    init_gpio
        CALL    init_timer0
bucle:
        GOTO    bucle

        END`;

const TIMER_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF

        ORG     0x0000
        GOTO    inicio

        ORG     0x0008
        GOTO    isr_alta

        ORG     0x0018
        GOTO    isr_baja

        CBLOCK  0x20
temp_w
temp_status
        ENDC

init_gpio:
        BCF     TRISB, 0
        BCF     LATB, 0
        RETURN

init_timer0:
        MOVLW   B'00000111'    ; 16 bit, interno, prescaler 1:256
        MOVWF   T0CON
        MOVLW   B'01100111'    ; TMR0H = 0x67
        MOVWF   TMR0H
        MOVLW   B'01101010'    ; TMR0L = 0x6A  (~2 s @ 20 MHz)
        MOVWF   TMR0L
        RETURN

isr_alta:
        RETFIE

isr_baja:
        RETFIE

inicio:
        CALL    init_gpio
        CALL    init_timer0
bucle:
        GOTO    bucle

        END`;

const ENABLE_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF

        ORG     0x0000
        GOTO    inicio

        ORG     0x0008
        GOTO    isr_alta

        ORG     0x0018
        GOTO    isr_baja

        CBLOCK  0x20
temp_w
temp_status
        ENDC

init_gpio:
        BCF     TRISB, 0
        BCF     LATB, 0
        RETURN

init_timer0:
        MOVLW   B'00000111'
        MOVWF   T0CON
        MOVLW   B'01100111'
        MOVWF   TMR0H
        MOVLW   B'01101010'
        MOVWF   TMR0L
        RETURN

isr_alta:
        RETFIE

isr_baja:
        RETFIE

inicio:
        CALL    init_gpio
        CALL    init_timer0
        BCF     INTCON, TMR0IF   ; limpia bandera antes de habilitar
        BSF     INTCON, TMR0IE   ; habilita interrupcion Timer0
        BSF     INTCON, GIE      ; maestro global
        BSF     T0CON, TMR0ON    ; arranca el timer
bucle:
        GOTO    bucle

        END`;

const ISR_SKELETON_CODE = `isr_alta:
        BTFSS   INTCON, TMR0IF
        GOTO    fin_isr
        BCF     INTCON, TMR0IF
fin_isr:
        RETFIE`;

const ISR_CONTEXT_CODE = `isr_alta:
        BTFSS   INTCON, TMR0IF
        GOTO    fin_isr

        MOVWF   temp_w
        SWAPF   STATUS, W
        MOVWF   temp_status

        BCF     INTCON, TMR0IF

        SWAPF   temp_status, W
        MOVWF   STATUS
        MOVF    temp_w, W
fin_isr:
        RETFIE`;

const FINAL_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF

        ORG     0x0000
        GOTO    inicio

        ORG     0x0008            ; alta prioridad (08H)
        GOTO    isr_alta

        ORG     0x0018            ; baja prioridad (18H)
        GOTO    isr_baja

        CBLOCK  0x20
temp_w
temp_status
        ENDC

init_gpio:
        BCF     TRISB, 0      ; RB0 salida (LED)
        BCF     LATB, 0
        RETURN

init_timer0:
        MOVLW   B'00000111'    ; 16 bit, interno, PS 1:256
        MOVWF   T0CON
        MOVLW   B'01100111'
        MOVWF   TMR0H
        MOVLW   B'01101010'
        MOVWF   TMR0L
        RETURN

isr_alta:
        BTFSS   INTCON, TMR0IF
        GOTO    fin_isr

        ; guardar contexto minimo
        MOVWF   temp_w
        SWAPF   STATUS, W
        MOVWF   temp_status

        BCF     T0CON, TMR0ON
        BCF     INTCON, TMR0IF
        MOVLW   B'01100111'    ; recarga Timer0 (~2 s)
        MOVWF   TMR0H
        MOVLW   B'01101010'
        MOVWF   TMR0L
        BSF     T0CON, TMR0ON

        ; toggle LED en RB0
        BTFSC   LATB, 0
        GOTO    apagar_led
        BSF     LATB, 0
        GOTO    restaurar
apagar_led:
        BCF     LATB, 0

restaurar:
        SWAPF   temp_status, W
        MOVWF   STATUS
        MOVF    temp_w, W
fin_isr:
        RETFIE

isr_baja:
        RETFIE

inicio:
        CALL    init_gpio
        CALL    init_timer0
        BCF     INTCON, TMR0IF
        BSF     INTCON, TMR0IE
        BSF     INTCON, GIE
        BSF     T0CON, TMR0ON
bucle:
        GOTO    bucle

        END`;

export const interrupcionesSeries: SkillTutorialSeries = {
	id: 'interrupciones',
	titleEs: 'Interrupciones en PIC18',
	titleEn: 'PIC18 interrupts',
	descriptionEs:
		'Guia paso a paso: desde polling hasta una ISR de Timer0 que parpadea un LED sin bloquear el bucle principal — una accion verificable por paso.',
	descriptionEn:
		'Step-by-step guide: from polling to a Timer0 ISR that blinks an LED without blocking the main loop — one verifiable action per step.',
	projectGoalEs:
		'Un `.ASM` con **vectores de interrupcion**, **Timer0** en modo 16 bit y una **ISR** que hace toggle del **LED en RB0** cada ~2 s mientras el programa principal queda en un bucle vacio.',
	projectGoalEn:
		'A `.ASM` with **interrupt vectors**, **16-bit Timer0**, and an **ISR** that toggles the **LED on RB0** every ~2 s while main code sits in an empty loop.',
	projectHardwareEs:
		'PIC18F4550 + cristal 20 MHz. **RB0:** LED + 220–330 Ω a GND. Mismo esquema base que la [guia de puertos](/tutoriales/guias/puertos/).',
	projectHardwareEn:
		'PIC18F4550 + 20 MHz crystal. **RB0:** LED + 220–330 Ω to GND. Same base schematic as the [ports guide](/en/tutoriales/guias/puertos/).',
	level: 'intermedio',
	prerequisites: ['puertos'],
	relatedDocs: [
		{
			labelEs: 'Teoria interrupciones',
			labelEn: 'Interrupt theory',
			hrefEs: '/interrupciones/',
			hrefEn: '/en/interrupciones/',
		},
		{
			labelEs: 'Timer 0',
			labelEn: 'Timer 0',
			hrefEs: '/timers/timer0/',
			hrefEn: '/en/timers/timer0/',
		},
		{
			labelEs: 'Registros INTCON',
			labelEn: 'INTCON registers',
			hrefEs: '/fundamentos/registros/#registros-de-interrupciones',
			hrefEn: '/en/fundamentos/registros/#interrupt-registers',
		},
	],
	preparesFor: ['practica-2', 'practica-3', 'practica-5'],
	steps: [
		{
			id: '0-introduccion',
			order: 0,
			titleEs: 'Bienvenida: polling vs interrupciones',
			titleEn: 'Welcome: polling vs interrupts',
			goalEs:
				'Al terminar los **10 pasos** tendras una ISR real que parpadea un LED **sin** revisar banderas en bucle.\n\n**Un paso = una accion concreta** que puedes marcar antes de seguir.\n\n**No avances** si el checklist del paso no esta cumplido.',
			goalEn:
				'When you finish **10 steps** you will have a real ISR blinking an LED **without** checking flags in a loop.\n\n**One step = one concrete action** you can mark before continuing.\n\n**Do not advance** if the step checklist is not done.',
			bodyEs:
				'Construiremos **un solo archivo** `guia-interrupciones.asm` que crece en cada paso.\n\n**Hasta ahora** en [GPIO](/gpio/) leiste el pulsador con **polling** (`BTFSS PORTB` en bucle). Aqui el **hardware** avisa al PIC cuando Timer0 desborda: salta al vector **0x0008 (08H)** y ejecuta la **ISR**.\n\n**Orden del curso:** vectores → variables RAM → Timer0 → habilitar **GIE** → escribir ISR → guardar contexto → probar en Proteus.\n\nUsa el **rastreador de guia** (panel derecho): cada paso tiene **Sigue estos pasos**, **Tu archivo hasta ahora** y **Lista antes de continuar**.',
			bodyEn:
				'We will build **one file** `guia-interrupciones.asm` that grows each step.\n\nSo far in [GPIO](/en/gpio/) you read the button with **polling** (`BTFSS PORTB` in a loop). Here **hardware** notifies the PIC when Timer0 overflows: jump to vector **0x0008 (08H)** and run the **ISR**.\n\n**Course order:** vectors → RAM variables → Timer0 → enable **GIE** → write ISR → save context → test in Proteus.\n\nUse the **guide tracker** (right panel): each step has **Follow these steps**, **Your file so far**, and **Checklist before you continue**.',
			instructionsEs: [
				'Lee el objetivo del rastreador: **LED en RB0** parpadea por **interrupcion de Timer0**, no por polling.',
				'Repasa la teoria en [Interrupciones](/interrupciones/) — flujo evento → vector → ISR → RETFIE.',
				'Ten MPLAB y Proteus listos (puedes reutilizar el esquema LED de la guia de puertos).',
				'Pulsa **Siguiente** — el paso 1 es crear el proyecto, sin codigo todavia.',
			],
			instructionsEn: [
				'Read the tracker goal: **LED on RB0** blinks via **Timer0 interrupt**, not polling.',
				'Review theory at [Interrupts](/en/interrupciones/) — event → vector → ISR → RETFIE flow.',
				'Have MPLAB and Proteus ready (you can reuse the LED schematic from the ports guide).',
				'Click **Next** — step 1 is creating the project, no code yet.',
			],
			checklistEs: [
				'Entiendo la diferencia entre polling e interrupcion.',
				'Se donde esta el rastreador de guia en pantalla.',
				'Se que el vector de alta prioridad es 0x0008 (08H).',
			],
			checklistEn: [
				'I understand polling vs interrupt.',
				'I know where the guide tracker is on screen.',
				'I know the high-priority vector is 0x0008 (08H).',
			],
		},
		{
			id: '1-habilitar',
			order: 1,
			titleEs: 'Crear proyecto y archivo .ASM',
			titleEn: 'Create project and .ASM file',
			goalEs: '**Tener** un proyecto MPLAB para PIC18F4550 con el archivo `guia-interrupciones.asm` listo para editar.',
			goalEn: '**Have** an MPLAB project for PIC18F4550 with file `guia-interrupciones.asm` ready to edit.',
			bodyEs:
				'Todavia **no escribes codigo de interrupciones**. Solo preparas el entorno como en la [guia de puertos](/tutoriales/guias/puertos/1-proyecto-mplab/): proyecto, dispositivo **PIC18F4550** y archivo `.ASM` en Source Files.',
			bodyEn:
				'You **do not write interrupt code yet**. Only set up the environment like the [ports guide](/en/tutoriales/guias/puertos/1-proyecto-mplab/): project, device **PIC18F4550**, and `.ASM` file under Source Files.',
			instructionsEs: [
				'MPLAB: **File → New Project** (o reutiliza un proyecto del curso) → dispositivo **PIC18F4550** → MPASM o XC8 segun tu laboratorio.',
				'Crea **Source Files → New → Assembly File** → nombre `guia-interrupciones.asm`.',
				'Deja el archivo vacio o con un comentario `; Guia interrupciones`.',
				'Guarda todo. Aun no compiles.',
			],
			instructionsEn: [
				'MPLAB: **File → New Project** (or reuse a course project) → device **PIC18F4550** → MPASM or XC8 per your lab.',
				'Create **Source Files → New → Assembly File** → name `guia-interrupciones.asm`.',
				'Leave the file empty or with comment `; Interrupts guide`.',
				'Save all. Do not build yet.',
			],
			checklistEs: [
				'Proyecto MPLAB creado para PIC18F4550.',
				'Existe `guia-interrupciones.asm` en Source Files.',
				'Archivo guardado en disco.',
			],
			checklistEn: [
				'MPLAB project created for PIC18F4550.',
				'`guia-interrupciones.asm` exists under Source Files.',
				'File saved on disk.',
			],
			tipEs: 'Puedes copiar el proyecto de la guia de puertos y renombrar el `.ASM` — pero trabaja en un archivo dedicado a interrupciones.',
			tipEn: 'You can copy the ports guide project and rename the `.ASM` — but use a file dedicated to interrupts.',
		},
		{
			id: '2-isr-basica',
			order: 2,
			titleEs: 'LIST, CONFIG y vectores de interrupcion',
			titleEn: 'LIST, CONFIG, and interrupt vectors',
			goalEs: '**Escribir** la base del archivo: CONFIG, reset en `0x0000` y vectores en **0x0008 (08H)** y **0x0018 (18H)**.',
			goalEn: '**Write** the file base: CONFIG, reset at `0x0000`, and vectors at **0x0008 (08H)** and **0x0018 (18H)**.',
			bodyEs:
				'Los **vectores** son direcciones fijas donde el PIC salta al ocurrir una interrupcion. Van **arriba** del archivo, despues de CONFIG — igual que el reset en `ORG 0x0000`.\n\nPor ahora `isr_alta` e `isr_baja` solo tienen `RETFIE` (retornan sin hacer nada). En pasos siguientes llenamos `isr_alta` con Timer0.',
			bodyEn:
				'**Vectors** are fixed addresses the PIC jumps to on interrupt. They go **at the top** of the file, after CONFIG — like reset at `ORG 0x0000`.\n\nFor now `isr_alta` and `isr_baja` only have `RETFIE` (return without doing anything). Later steps fill `isr_alta` with Timer0 logic.',
			instructionsEs: [
				'Abre `guia-interrupciones.asm` y pega el bloque **Tu archivo hasta ahora** (LIST, #include, CONFIG, vectores, stubs ISR, inicio, bucle, END).',
				'Comprueba que existan **tres** `ORG`: `0x0000`, `0x0008` y `0x0018`.',
				'Compila — debe decir **BUILD SUCCESSFUL**.',
				'El LED aun no parpadea; solo verificamos estructura.',
			],
			instructionsEn: [
				'Open `guia-interrupciones.asm` and paste **Your file so far** (LIST, #include, CONFIG, vectors, ISR stubs, inicio, bucle, END).',
				'Check there are **three** `ORG` lines: `0x0000`, `0x0008`, and `0x0018`.',
				'Build — must say **BUILD SUCCESSFUL**.',
				'LED does not blink yet; we only verify structure.',
			],
			cumulativeCode: SHELL_CODE,
			code: `        ORG     0x0000
        GOTO    inicio

        ORG     0x0008            ; alta prioridad (tambien ORG 08H)
        GOTO    isr_alta

        ORG     0x0018            ; baja prioridad (tambien ORG 18H)
        GOTO    isr_baja`,
			checklistEs: [
				'Tengo ORG 0x0000, 0x0008 y 0x0018 con GOTO a sus etiquetas.',
				'Existe `isr_alta` e `isr_baja` con al menos RETFIE.',
				'Compila sin errores.',
			],
			checklistEn: [
				'I have ORG 0x0000, 0x0008, and 0x0018 with GOTO to their labels.',
				'`isr_alta` and `isr_baja` exist with at least RETFIE.',
				'Builds with no errors.',
			],
			tipEs: '`ORG 08H` y `ORG 0x0008` son la misma direccion — el curso usa ambas notaciones.',
			tipEn: '`ORG 08H` and `ORG 0x0008` are the same address — the course uses both notations.',
		},
		{
			id: '3-contexto',
			order: 3,
			titleEs: 'Variables en RAM y GPIO del LED',
			titleEn: 'RAM variables and LED GPIO',
			goalEs: '**Reservar** `temp_w` y `temp_status` en RAM y configurar **RB0** como salida del LED.',
			goalEn: '**Reserve** `temp_w` and `temp_status` in RAM and set **RB0** as LED output.',
			bodyEs:
				'La ISR va a usar **WREG** y **STATUS**. Si no los guardas, el programa principal se corrompe al volver de `RETFIE`.\n\nReserva dos bytes con `CBLOCK` / `ENDC` (estilo sandwich del curso). En `init_gpio` configura **TRISB** y apaga el LED con **LATB**.',
			bodyEn:
				'The ISR will use **WREG** and **STATUS**. If you do not save them, main code corrupts after `RETFIE`.\n\nReserve two bytes with `CBLOCK` / `ENDC` (course sandwich style). In `init_gpio` set **TRISB** and turn LED off with **LATB**.',
			instructionsEs: [
				'Agrega el bloque `CBLOCK` con `temp_w` y `temp_status` (ver archivo acumulado).',
				'Completa `init_gpio` con `BCF TRISB,0` y `BCF LATB,0` + `RETURN`.',
				'No toques las ISR todavia.',
				'Compila sin errores.',
			],
			instructionsEn: [
				'Add the `CBLOCK` block with `temp_w` and `temp_status` (see cumulative file).',
				'Complete `init_gpio` with `BCF TRISB,0` and `BCF LATB,0` + `RETURN`.',
				'Do not edit ISRs yet.',
				'Build with no errors.',
			],
			cumulativeCode: GPIO_CODE,
			code: `        CBLOCK  0x20
temp_w
temp_status
        ENDC

init_gpio:
        BCF     TRISB, 0      ; RB0 salida (LED)
        BCF     LATB, 0       ; LED apagado
        RETURN`,
			checklistEs: [
				'Reservé temp_w y temp_status en CBLOCK.',
				'init_gpio configura RB0 como salida y apaga el LED.',
				'Compila sin errores.',
			],
			checklistEn: [
				'I reserved temp_w and temp_status in CBLOCK.',
				'`init_gpio` sets RB0 as output and turns LED off.',
				'Builds with no errors.',
			],
		},
		{
			id: '4-rb-interrupt',
			order: 4,
			titleEs: 'Configurar Timer0 (sin ISR todavia)',
			titleEn: 'Configure Timer0 (no ISR yet)',
			goalEs: '**Programar** Timer0 en modo 16 bit con prescaler 1:256 y valor inicial para ~2 s @ 20 MHz.',
			goalEn: '**Set up** Timer0 in 16-bit mode with prescaler 1:256 and initial value for ~2 s @ 20 MHz.',
			bodyEs:
				'Timer0 es la fuente de interrupcion mas usada al empezar. Sus banderas **`TMR0IE`** y **`TMR0IF`** estan en **`INTCON`** — **no** en PIE1/PIR1.\n\n**Importante:** Timer0 **no** necesita **PEIE**. La cadena es: configurar T0CON + TMR0H/L → luego (paso 5) habilitar TMR0IE y GIE.\n\nLos valores `0x676A` vienen del [Timer 0 — ejemplo 2 s](/timers/timer0/#ejemplo-2-segundos-con-cristal-20-mhz).',
			bodyEn:
				'Timer0 is the most common interrupt source when starting. Flags **`TMR0IE`** and **`TMR0IF`** are in **`INTCON`** — **not** PIE1/PIR1.\n\n**Important:** Timer0 does **not** need **PEIE**. Chain is: set T0CON + TMR0H/L → then (step 5) enable TMR0IE and GIE.\n\nValues `0x676A` come from [Timer 0 — 2 s example](/en/timers/timer0/#example-2-seconds-with-20-mhz-crystal).',
			instructionsEs: [
				'Reemplaza el `RETURN` vacio de `init_timer0` por las lineas del bloque resaltado (T0CON, TMR0H, TMR0L).',
				'No enciendas TMR0ON ni GIE todavia — solo deja el timer configurado.',
				'Compila sin errores.',
				'Opcional: compara T0CON con la tabla en [Timer 0](/timers/timer0/).',
			],
			instructionsEn: [
				'Replace empty `init_timer0` RETURN with highlighted lines (T0CON, TMR0H, TMR0L).',
				'Do not set TMR0ON or GIE yet — only configure the timer.',
				'Build with no errors.',
				'Optional: compare T0CON with the table in [Timer 0](/en/timers/timer0/).',
			],
			cumulativeCode: TIMER_CODE,
			code: `init_timer0:
        MOVLW   B'00000111'    ; 16 bit, interno, prescaler 1:256
        MOVWF   T0CON
        MOVLW   B'01100111'    ; TMR0H = 0x67
        MOVWF   TMR0H
        MOVLW   B'01101010'    ; TMR0L = 0x6A
        MOVWF   TMR0L
        RETURN`,
			checklistEs: [
				'init_timer0 carga T0CON y los valores iniciales de TMR0H/L.',
				'Entiendo que Timer0 no usa PEIE.',
				'Compila sin errores.',
			],
			checklistEn: [
				'`init_timer0` loads T0CON and TMR0H/L initial values.',
				'I understand Timer0 does not use PEIE.',
				'Builds with no errors.',
			],
			tipEs: 'PEIE es para Timer1/2/3, UART, ADC… — no para Timer0.',
			tipEn: 'PEIE is for Timer1/2/3, UART, ADC… — not Timer0.',
		},
		{
			id: '5-habilitar-gie',
			order: 5,
			titleEs: 'Habilitar interrupciones (GIE y TMR0IE)',
			titleEn: 'Enable interrupts (GIE and TMR0IE)',
			goalEs: '**Encender** la cadena de habilitacion: limpiar TMR0IF, activar TMR0IE, GIE y arrancar el timer.',
			goalEn: '**Turn on** the enable chain: clear TMR0IF, set TMR0IE, GIE, and start the timer.',
			bodyEs:
				'Sin **GIE = 1** ninguna ISR se ejecuta — es el interruptor maestro global.\n\n**Secuencia del curso** (Timer0):\n1. `BCF INTCON, TMR0IF` — limpia bandera vieja\n2. `BSF INTCON, TMR0IE` — habilita la fuente\n3. `BSF INTCON, GIE` — habilita globalmente\n4. `BSF T0CON, TMR0ON` — el contador empieza a correr\n\nEl bucle principal (`bucle`) puede quedar vacio: el LED lo movera la ISR en el paso 8.',
			bodyEn:
				'Without **GIE = 1** no ISR runs — it is the global master switch.\n\n**Course sequence** (Timer0):\n1. `BCF INTCON, TMR0IF` — clear stale flag\n2. `BSF INTCON, TMR0IE` — enable source\n3. `BSF INTCON, GIE` — enable globally\n4. `BSF T0CON, TMR0ON` — counter starts\n\nMain loop (`bucle`) can stay empty: the ISR will drive the LED in step 8.',
			instructionsEs: [
				'En `inicio`, despues de los dos CALL, agrega las cuatro lineas del bloque resaltado.',
				'Orden: limpiar TMR0IF **antes** de habilitar interrupciones.',
				'Compila sin errores.',
				'Si cargas en Proteus ahora, el LED **aun no** parpadea — falta el cuerpo de la ISR.',
			],
			instructionsEn: [
				'In `inicio`, after both CALLs, add the four lines from the highlighted block.',
				'Order: clear TMR0IF **before** enabling interrupts.',
				'Build with no errors.',
				'If you load in Proteus now, the LED **will not** blink yet — ISR body is missing.',
			],
			cumulativeCode: ENABLE_CODE,
			code: `        BCF     INTCON, TMR0IF
        BSF     INTCON, TMR0IE
        BSF     INTCON, GIE
        BSF     T0CON, TMR0ON`,
			checklistEs: [
				'Agregué las cuatro lineas de habilitacion en inicio.',
				'Se que GIE es obligatorio para cualquier ISR.',
				'Compila sin errores.',
			],
			checklistEn: [
				'I added the four enable lines in inicio.',
				'I know GIE is required for any ISR.',
				'Builds with no errors.',
			],
		},
		{
			id: '6-isr-esqueleto',
			order: 6,
			titleEs: 'ISR minima: comprobar bandera y limpiar',
			titleEn: 'Minimal ISR: check flag and clear',
			goalEs: '**Escribir** el esqueleto de `isr_alta`: si es Timer0, limpiar `TMR0IF` y volver con `RETFIE`.',
			goalEn: '**Write** the `isr_alta` skeleton: if Timer0, clear `TMR0IF` and return with `RETFIE`.',
			bodyEs:
				'Patron obligatorio en toda ISR:\n1. **Comprobar** que la interrupcion es tuya (`BTFSS TMR0IF`)\n2. **Limpiar** la bandera (`BCF TMR0IF`) — si no, reentra infinito\n3. **RETFIE** al salir\n\nAun **no** guardamos WREG/STATUS ni movemos el LED — eso es el paso 7.',
			bodyEn:
				'Required pattern in every ISR:\n1. **Check** it is your interrupt (`BTFSS TMR0IF`)\n2. **Clear** the flag (`BCF TMR0IF`) — otherwise infinite re-entry\n3. **RETFIE** on exit\n\nWe do **not** save WREG/STATUS or toggle the LED yet — that is step 7.',
			instructionsEs: [
				'Reemplaza el `RETFIE` solo de `isr_alta` por el bloque resaltado.',
				'Deja `isr_baja` con solo RETFIE (no la usamos en este ejercicio).',
				'Compila y carga el HEX en Proteus.',
				'El programa corre pero el LED sigue fijo — normal en este paso.',
			],
			instructionsEn: [
				'Replace lone `RETFIE` in `isr_alta` with the highlighted block.',
				'Leave `isr_baja` with only RETFIE (we do not use it in this exercise).',
				'Build and load HEX in Proteus.',
				'Program runs but LED stays fixed — normal at this step.',
			],
			cumulativeCode: ENABLE_CODE.replace(
				'isr_alta:\n        RETFIE',
				`isr_alta:\n        BTFSS   INTCON, TMR0IF\n        GOTO    fin_isr\n        BCF     INTCON, TMR0IF\nfin_isr:\n        RETFIE`,
			),
			code: ISR_SKELETON_CODE,
			checklistEs: [
				'isr_alta comprueba TMR0IF antes de actuar.',
				'Limpio TMR0IF antes de RETFIE.',
				'Compila sin errores.',
			],
			checklistEn: [
				'`isr_alta` checks TMR0IF before acting.',
				'I clear TMR0IF before RETFIE.',
				'Builds with no errors.',
			],
		},
		{
			id: '7-guardar-contexto',
			order: 7,
			titleEs: 'Guardar y restaurar contexto',
			titleEn: 'Save and restore context',
			goalEs: '**Preservar** WREG y STATUS al entrar a la ISR y **restaurarlos** antes de `RETFIE`.',
			goalEn: '**Preserve** WREG and STATUS on ISR entry and **restore** them before `RETFIE`.',
			bodyEs:
				'Secuencia minima del curso (usa las variables `temp_w` y `temp_status` del paso 3):\n\n**Al entrar:** `MOVWF temp_w` → `SWAPF STATUS,W` → `MOVWF temp_status`\n\n**Al salir (antes de RETFIE):** `SWAPF temp_status,W` → `MOVWF STATUS` → `MOVF temp_w,W`\n\nSin esto, el programa principal puede fallar despues de la primera interrupcion.',
			bodyEn:
				'Course minimum sequence (uses `temp_w` and `temp_status` from step 3):\n\n**On entry:** `MOVWF temp_w` → `SWAPF STATUS,W` → `MOVWF temp_status`\n\n**On exit (before RETFIE):** `SWAPF temp_status,W` → `MOVWF STATUS` → `MOVF temp_w,W`\n\nWithout this, main code may break after the first interrupt.',
			instructionsEs: [
				'Entre la comprobacion de TMR0IF y el BCF de la bandera, agrega guardado de W y STATUS.',
				'Antes de `fin_isr`, agrega la restauracion en orden inverso.',
				'Compila sin errores.',
				'Detalle extra: [guia contexto](/tutoriales/guias/interrupciones/7-guardar-contexto/) y [teoria](/interrupciones/#paso-4--guardar-contexto).',
			],
			instructionsEn: [
				'Between TMR0IF check and flag BCF, add W and STATUS save.',
				'Before `fin_isr`, add restore in reverse order.',
				'Build with no errors.',
				'More detail: [context guide](/en/tutoriales/guias/interrupciones/7-guardar-contexto/) and [theory](/en/interrupciones/#step-4--save-context).',
			],
			code: ISR_CONTEXT_CODE,
			checklistEs: [
				'Guardo WREG y STATUS al entrar a la ISR.',
				'Restauro WREG y STATUS antes de RETFIE.',
				'Compila sin errores.',
			],
			checklistEn: [
				'I save WREG and STATUS on ISR entry.',
				'I restore WREG and STATUS before RETFIE.',
				'Builds with no errors.',
			],
			tipEs: 'Nunca pongas codigo entre restaurar STATUS y RETFIE — STATUS debe quedar correcto al volver.',
			tipEn: 'Never put code between restoring STATUS and RETFIE — STATUS must be correct on return.',
		},
		{
			id: '8-isr-completa',
			order: 8,
			titleEs: 'ISR completa: toggle LED y recargar Timer0',
			titleEn: 'Full ISR: toggle LED and reload Timer0',
			goalEs: '**Completar** la ISR: recargar TMR0H/L, hacer toggle del LED en RB0 y ver el parpadeo en Proteus.',
			goalEn: '**Complete** the ISR: reload TMR0H/L, toggle LED on RB0, and see blinking in Proteus.',
			bodyEs:
				'Entre guardar contexto y restaurarlo:\n1. Pausa el timer (`BCF T0CON, TMR0ON`)\n2. Limpia `TMR0IF` y recarga **TMR0H/L** con los mismos valores del paso 4\n3. Rearranca el timer (`BSF T0CON, TMR0ON`)\n4. **Toggle** del LED con `BTFSC LATB,0` / `BSF` o `BCF`\n\nEl bucle principal sigue en `GOTO bucle` — demuestra que **no hace falta polling**.',
			bodyEn:
				'Between saving and restoring context:\n1. Pause timer (`BCF T0CON, TMR0ON`)\n2. Clear `TMR0IF` and reload **TMR0H/L** with same values from step 4\n3. Restart timer (`BSF T0CON, TMR0ON`)\n4. **Toggle** LED with `BTFSC LATB,0` / `BSF` or `BCF`\n\nMain loop stays at `GOTO bucle` — shows **no polling needed**.',
			instructionsEs: [
				'Completa `isr_alta` con el archivo final de abajo (o agrega toggle + recarga al esqueleto del paso 7).',
				'Compila, genera `.HEX` y cargalo en Proteus (LED en RB0, 20 MHz).',
				'Pulsa **Play** y espera ~2 s: el **LED debe alternar** encendido/apagado.',
				'Si no parpadea: revisa GIE, TMR0IE, vector 0x0008 y que limpiaste TMR0IF.',
			],
			instructionsEn: [
				'Complete `isr_alta` with the final file below (or add toggle + reload to step 7 skeleton).',
				'Build, generate `.HEX`, load in Proteus (LED on RB0, 20 MHz).',
				'Press **Play** and wait ~2 s: **LED must toggle** on/off.',
				'If no blink: check GIE, TMR0IE, vector 0x0008, and TMR0IF cleared.',
			],
			cumulativeCode: FINAL_CODE,
			checklistEs: [
				'La ISR recarga Timer0 y hace toggle del LED.',
				'**Vi el LED parpadear** en Proteus o placa (~2 s por cambio).',
				'El bucle principal no lee TMR0IF — confirma que es interrupcion, no polling.',
			],
			checklistEn: [
				'ISR reloads Timer0 and toggles the LED.',
				'**I saw the LED blink** in Proteus or hardware (~2 s per change).',
				'Main loop does not read TMR0IF — confirms interrupt, not polling.',
			],
			challengeEs:
				'Opcional: cambia el valor de TMR0H/L para parpadeo mas rapido y calcula el nuevo tiempo con la formula de [Timer 0](/timers/timer0/).',
			challengeEn:
				'Optional: change TMR0H/L for faster blink and calculate the new time with the [Timer 0](/en/timers/timer0/) formula.',
		},
		{
			id: '9-rb-teclado',
			order: 9,
			titleEs: 'Vista previa: interrupcion RB4–RB7 (teclado)',
			titleEn: 'Preview: RB4–RB7 interrupt (keyboard)',
			goalEs: '**Entender** como se habilita **RBIE** para el teclado matricial — puente hacia Practica 2.',
			goalEn: '**Understand** how to enable **RBIE** for the matrix keyboard — bridge to Practice 2.',
			bodyEs:
				'El mismo archivo ya funciona con Timer0. Para **teclado matricial** ([Practica 2](/tutoriales/practica-2/)) agregaras otra fuente en la misma `isr_alta`:\n\n- **RBIE** en INTCON — interrupcion por cambio en RB4–RB7\n- Pull-ups en columnas (`BCF INTCON2, RBPU` si usas internos)\n- En la ISR: escanear filas, antirrebote, y **limpiar RBIF leyendo PORTB** (requerimiento del hardware)\n\nNo es obligatorio probarlo ahora; es la **siguiente aplicacion** de interrupciones en el curso.',
			bodyEn:
				'The same file already works with Timer0. For **matrix keyboard** ([Practice 2](/en/tutoriales/practica-2/)) you will add another source in the same `isr_alta`:\n\n- **RBIE** in INTCON — interrupt on RB4–RB7 change\n- Column pull-ups (`BCF INTCON2, RBPU` if using internal)\n- In ISR: scan rows, debounce, and **clear RBIF by reading PORTB** (hardware requirement)\n\nNot required to test now; it is the **next interrupt application** in the course.',
			instructionsEs: [
				'Lee el bloque de codigo RBIE de abajo — no hace falta integrarlo si tu LED ya parpadea.',
				'Compara con la seccion [RB4–RB7](/interrupciones/#interrupcion-rb4-rb7--vista-previa-teclado) de la teoria.',
				'Guarda `guia-interrupciones.asm` como plantilla para practicas.',
				'Marca todos los pasos 0–8 en el rastreador.',
			],
			instructionsEn: [
				'Read the RBIE code block below — no need to integrate if your LED already blinks.',
				'Compare with [RB4–RB7](/en/interrupciones/#rb4-rb7-interrupt--keyboard-preview) in theory.',
				'Save `guia-interrupciones.asm` as a template for labs.',
				'Mark all steps 0–8 in the tracker.',
			],
			cumulativeCode: FINAL_CODE,
			code: `; --- Agregar en inicio (ademas de Timer0) para teclado ---
        BCF     INTCON2, RBPU    ; pull-ups PORTB (segun practica)
        BSF     INTCON, RBIE     ; cambio en RB4-RB7

; --- Dentro de isr_alta, despues de atender Timer0 ---
        BTFSS   INTCON, RBIF
        GOTO    fin_rb
        ; escanear teclado, antirrebote...
        MOVF    PORTB, W         ; limpia RBIF (obligatorio)
fin_rb:`,
			checklistEs: [
				'Mi programa Timer0 + ISR funciona y esta guardado.',
				'Entiendo para que sirve RBIE y por que hay que leer PORTB.',
				'Se que Practica 2 y 5 usan estas ideas.',
			],
			checklistEn: [
				'My Timer0 + ISR program works and is saved.',
				'I understand RBIE and why PORTB must be read.',
				'I know Practices 2 and 5 use these ideas.',
			],
		},
		{
			id: '10-comprueba',
			order: 10,
			titleEs: 'Comprueba lo aprendido',
			titleEn: 'Check what you learned',
			bodyEs:
				'Repasa la [teoria de interrupciones](/interrupciones/) y el [quiz del tema](/interrupciones/) si aun no lo aprobaste.\n\nCuando todos los pasos 0–9 esten marcados, continua con [Timer 0](/timers/timer0/) y [Practica 5](/tutoriales/practica-5/) en la [ruta de estudio](/ruta-de-estudio/).',
			bodyEn:
				'Review [interrupt theory](/en/interrupciones/) and the [topic quiz](/en/interrupciones/) if you have not passed it yet.\n\nWhen steps 0–9 are all checked, continue with [Timer 0](/en/timers/timer0/) and [Practice 5](/en/tutoriales/practica-5/) on the [study path](/en/ruta-de-estudio/).',
			checklistEs: [
				'Puedo explicar GIE, TMR0IE y TMR0IF con mis palabras.',
				'Se guardar y restaurar WREG/STATUS en una ISR.',
				'Todos los pasos 0–9 marcados en el rastreador.',
			],
			checklistEn: [
				'I can explain GIE, TMR0IE, and TMR0IF in my own words.',
				'I know how to save/restore WREG/STATUS in an ISR.',
				'Steps 0–9 all checked in the tracker.',
			],
		},
	],
};
