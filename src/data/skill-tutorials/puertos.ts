import type { SkillTutorialSeries } from './types';

const LIST_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        END`;

const CONFIG_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF

        END`;

const SHELL_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF

        ORG     0x0000
        GOTO    inicio

; --- subrutinas (medio sandwich) ---
init_gpio:
        RETURN

; --- programa principal (abajo) ---
inicio:
        CALL    init_gpio
bucle:
        GOTO    bucle

        END`;

const TRIS_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF

        ORG     0x0000
        GOTO    inicio

init_gpio:
        BCF     TRISB, 0      ; RB0 salida (LED)
        BSF     TRISB, 1      ; RB1 entrada (pulsador)
        RETURN

inicio:
        CALL    init_gpio
bucle:
        GOTO    bucle

        END`;

const LAT_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF

        ORG     0x0000
        GOTO    inicio

init_gpio:
        BCF     TRISB, 0
        BSF     TRISB, 1
        RETURN

inicio:
        CALL    init_gpio
        BCF     LATB, 0       ; LED apagado al arrancar
        BSF     LATB, 0       ; prueba: enciende LED en Proteus
bucle:
        GOTO    bucle

        END`;

const PORT_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF

        ORG     0x0000
        GOTO    inicio

init_gpio:
        BCF     TRISB, 0
        BSF     TRISB, 1
        RETURN

inicio:
        CALL    init_gpio
        BCF     LATB, 0
bucle:
        BTFSC   PORTB, 1      ; RB1 alto = pulsador suelto
        BCF     LATB, 0
        BTFSS   PORTB, 1      ; RB1 bajo = pulsador presionado
        BSF     LATB, 0
        GOTO    bucle

        END`;

const FINAL_CODE = `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF

        ORG     0x0000
        GOTO    inicio

; --- init: direccion de pines (TRIS) ---
init_gpio:
        BCF     TRISB, 0      ; RB0 → salida (LED)
        BSF     TRISB, 1      ; RB1 → entrada (pulsador NA)
        RETURN

; --- programa principal ---
inicio:
        CALL    init_gpio
        BCF     LATB, 0       ; LED apagado al inicio
bucle:
        BTFSC   PORTB, 1      ; lee RB1 con PORT
        BCF     LATB, 0       ; suelto → apaga LED (LAT)
        BTFSS   PORTB, 1
        BSF     LATB, 0       ; presionado → enciende LED
        GOTO    bucle

        END`;

export const puertosSeries: SkillTutorialSeries = {
	id: 'puertos',
	titleEs: 'Usar puertos GPIO',
	titleEn: 'Using GPIO ports',
	descriptionEs:
		'Tutorial paso a paso: desde crear el proyecto en MPLAB hasta simular un LED controlado por pulsador — una accion verificable por paso.',
	descriptionEn:
		'Step-by-step tutorial: from creating the MPLAB project to simulating an LED controlled by a button — one verifiable action per step.',
	projectGoalEs:
		'Un `.ASM` que compila, carga en Proteus y hace que un **LED en RB0** siga a un **pulsador en RB1** usando TRIS → LAT → PORT.',
	projectGoalEn:
		'A `.ASM` that builds, loads in Proteus, and makes an **LED on RB0** follow a **button on RB1** using TRIS → LAT → PORT.',
	projectHardwareEs:
		'PIC18F4550 + cristal 20 MHz. **RB0:** LED + 220–330 Ω a GND. **RB1:** pulsador NA a GND con pull-up (10 kΩ a Vdd o pull-up interno).',
	projectHardwareEn:
		'PIC18F4550 + 20 MHz crystal. **RB0:** LED + 220–330 Ω to GND. **RB1:** NA button to GND with pull-up (10 kΩ to Vdd or internal pull-up).',
	level: 'basico',
	relatedDocs: [
		{
			labelEs: 'MPLAB y Proteus',
			labelEn: 'MPLAB and Proteus',
			hrefEs: '/fundamentos/mplab-proteus/',
			hrefEn: '/en/fundamentos/mplab-proteus/',
		},
		{
			labelEs: 'Teoria GPIO',
			labelEn: 'GPIO theory',
			hrefEs: '/gpio/',
			hrefEn: '/en/gpio/',
		},
		{
			labelEs: 'Ensamblador — sandwich',
			labelEn: 'Assembly — sandwich',
			hrefEs: '/fundamentos/ensamblador/',
			hrefEn: '/en/fundamentos/ensamblador/',
		},
	],
	preparesFor: ['primer-led', 'practica-1', 'practica-2'],
	steps: [
		{
			id: '0-introduccion',
			order: 0,
			titleEs: 'Bienvenida: que vas a lograr',
			titleEn: 'Welcome: what you will achieve',
			goalEs:
				'Al terminar los **10 pasos** + el test tendras un programa real, no solo fragmentos sueltos.\n\n**Un paso = una accion concreta** que puedes marcar como hecha antes de seguir.\n\n**No avances** si el checklist del paso no esta cumplido — asi evitas llegar al final sin LED funcionando.',
			goalEn:
				'When you finish **10 steps** + the test you will have a real program, not loose fragments.\n\n**One step = one concrete action** you can mark done before continuing.\n\n**Do not advance** if the step checklist is not done — that way you will not reach the end without a working LED.',
			bodyEs:
				'Construiremos **un solo archivo** `guia-puertos.asm` que crece en cada paso. Al final: pulsador en RB1 controla LED en RB0.\n\n**Orden del curso en codigo:** CONFIG y reset → **TRIS** (direccion) → **LAT** (salida) → **PORT** (entrada).\n\nUsa el **rastreador de guia** (panel derecho): muestra donde estas y cuantos pasos llevas marcados. Cada paso tiene **Sigue estos pasos**, **Tu archivo hasta ahora** (cuando aplique) y **Lista antes de continuar**.',
			bodyEn:
				'We will build **one file** `guia-puertos.asm` that grows each step. At the end: button on RB1 controls LED on RB0.\n\n**Course order in code:** CONFIG and reset → **TRIS** (direction) → **LAT** (output) → **PORT** (input).\n\nUse the **guide tracker** (right panel): it shows where you are and how many steps you checked off. Each step has **Follow these steps**, **Your file so far** (when applicable), and **Checklist before you continue**.',
			instructionsEs: [
				'Lee el objetivo del rastreador: **Estas construyendo** un LED + pulsador con TRIS, LAT y PORT.',
				'Ten a mano MPLAB X (o v8) y Proteus si puedes simular.',
				'Pulsa **Siguiente** — el paso 1 es solo crear el proyecto, sin codigo todavia.',
			],
			instructionsEn: [
				'Read the tracker goal: **You are building** an LED + button with TRIS, LAT, and PORT.',
				'Have MPLAB X (or v8) and Proteus ready if you can simulate.',
				'Click **Next** — step 1 is creating the project only, no code yet.',
			],
			checklistEs: [
				'Entiendo que ire paso a paso sin saltar checklists.',
				'Se donde esta el rastreador de guia en pantalla.',
			],
			checklistEn: [
				'I understand I go step by step without skipping checklists.',
				'I know where the guide tracker is on screen.',
			],
		},
		{
			id: '1-proyecto-mplab',
			order: 1,
			titleEs: 'Crear proyecto y archivo .ASM',
			titleEn: 'Create project and .ASM file',
			goalEs: '**Tener** un proyecto MPLAB para PIC18F4550 con un archivo fuente vacio listo para escribir.',
			goalEn: '**Have** an MPLAB project for PIC18F4550 with an empty source file ready to edit.',
			bodyEs:
				'Todavia **no escribes codigo**. Solo preparas el entorno igual que en [MPLAB y Proteus](/fundamentos/mplab-proteus/): proyecto, dispositivo correcto y archivo `.ASM` en el arbol del proyecto.',
			bodyEn:
				'You **do not write code yet**. You only set up the environment like in [MPLAB and Proteus](/en/fundamentos/mplab-proteus/): project, correct device, and `.ASM` file in the project tree.',
			instructionsEs: [
				'MPLAB X: **File → New Project** → Microchip Embedded → Standalone Project → dispositivo **PIC18F4550** → compilador **XC8** o MPASM segun tu curso → nombre `GuiaPuertos`.',
				'Clic derecho en **Source Files → New → Assembly File** → nombre `guia-puertos.asm`.',
				'Deja el archivo **vacio** por ahora (o solo un comentario `; Guia puertos GPIO`).',
				'Guarda todo (**Ctrl+S**). Aun no compiles — el paso 2 agrega las primeras lineas.',
			],
			instructionsEn: [
				'MPLAB X: **File → New Project** → Microchip Embedded → Standalone Project → device **PIC18F4550** → **XC8** or MPASM per your course → name `GuiaPuertos`.',
				'Right-click **Source Files → New → Assembly File** → name `guia-puertos.asm`.',
				'Leave the file **empty** for now (or only a comment `; GPIO ports guide`).',
				'Save all (**Ctrl+S**). Do not build yet — step 2 adds the first lines.',
			],
			checklistEs: [
				'Proyecto MPLAB creado para PIC18F4550.',
				'Existe el archivo `guia-puertos.asm` en Source Files.',
				'El archivo esta guardado en disco.',
			],
			checklistEn: [
				'MPLAB project created for PIC18F4550.',
				'File `guia-puertos.asm` exists under Source Files.',
				'The file is saved on disk.',
			],
			tipEs: 'Si ya tienes un proyecto del curso, reutilizalo — pero usa un `.ASM` nuevo solo para esta guia.',
			tipEn: 'If you already have a course project, reuse it — but use a new `.ASM` just for this guide.',
		},
		{
			id: '2-list-include',
			order: 2,
			titleEs: 'LIST e #include',
			titleEn: 'LIST and #include',
			goalEs: '**Escribir** las dos primeras directivas y **compilar** por primera vez sin errores.',
			goalEn: '**Write** the first two directives and **build** for the first time with no errors.',
			bodyEs:
				'`LIST P=18F4550` le dice al ensamblador que micro usas. `#include <P18F4550.INC>` trae los nombres **TRISB**, **LATB**, **PORTB**, etc. Sin el include, MPASM no reconoce esos simbolos.\n\nPor ahora el archivo termina en `END` — es valido aunque aun no haya programa.',
			bodyEn:
				'`LIST P=18F4550` tells the assembler which MCU you use. `#include <P18F4550.INC>` brings in symbol names **TRISB**, **LATB**, **PORTB**, etc. Without the include, MPASM will not recognize those symbols.\n\nFor now the file ends with `END` — valid even though there is no program yet.',
			instructionsEs: [
				'Abre `guia-puertos.asm` y **borra** todo lo que tenga.',
				'Escribe exactamente las lineas del bloque **Tu archivo hasta ahora** (LIST, #include, END).',
				'Menu **Production → Build Main Project** (martillo).',
				'En la ventana **Output** debe decir **BUILD SUCCESSFUL**. Si hay error, revisa mayusculas y que el include use `< >`.',
			],
			instructionsEn: [
				'Open `guia-puertos.asm` and **clear** everything in it.',
				'Type exactly the lines in **Your file so far** (LIST, #include, END).',
				'**Production → Build Main Project** (hammer icon).',
				'**Output** window must say **BUILD SUCCESSFUL**. On error, check caps and that include uses `< >`.',
			],
			cumulativeCode: LIST_CODE,
			checklistEs: [
				'Tengo LIST e #include en el archivo.',
				'La compilacion termina sin errores (BUILD SUCCESSFUL).',
			],
			checklistEn: [
				'I have LIST and #include in the file.',
				'Build finishes with no errors (BUILD SUCCESSFUL).',
			],
		},
		{
			id: '3-config-bits',
			order: 3,
			titleEs: 'Config bits del curso',
			titleEn: 'Course config bits',
			goalEs: '**Agregar** las cuatro lineas CONFIG del curso y **volver a compilar** sin errores.',
			goalEn: '**Add** the four course CONFIG lines and **build again** with no errors.',
			bodyEs:
				'Los **config bits** se fijan al programar el PIC — cristal HS 20 MHz, watchdog apagado, etc. Van **despues** del include y **antes** de cualquier `ORG`, como en [Config bits](/fundamentos/config-bits/).\n\nSi cambias de placa mas adelante, estas cuatro lineas suelen ser las mismas en el curso UNEXPO.',
			bodyEn:
				'**Config bits** are set when you program the PIC — 20 MHz HS crystal, watchdog off, etc. They go **after** the include and **before** any `ORG`, as in [Config bits](/en/fundamentos/config-bits/).\n\nIf you change boards later, these four lines are usually the same in the UNEXPO course.',
			instructionsEs: [
				'**Debajo** de `#include`, agrega las cuatro lineas `CONFIG` del bloque resaltado (o copia el archivo completo).',
				'No borres LIST, #include ni END.',
				'Compila otra vez — debe seguir en BUILD SUCCESSFUL.',
				'Si falla un CONFIG: verifica ortografia (`FOSC`, `WDT`, `LVP`, `PBADEN`).',
			],
			instructionsEn: [
				'**Below** `#include`, add the four `CONFIG` lines from the highlighted block (or copy the full file).',
				'Do not remove LIST, #include, or END.',
				'Build again — still BUILD SUCCESSFUL.',
				'If a CONFIG fails: check spelling (`FOSC`, `WDT`, `LVP`, `PBADEN`).',
			],
			cumulativeCode: CONFIG_CODE,
			code: `        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF
        CONFIG  PBADEN = OFF`,
			checklistEs: [
				'Las cuatro lineas CONFIG estan en el archivo.',
				'Compila sin errores.',
			],
			checklistEn: [
				'All four CONFIG lines are in the file.',
				'Builds with no errors.',
			],
		},
		{
			id: '4-estructura-sandwich',
			order: 4,
			titleEs: 'Vector de reset y estilo sandwich',
			titleEn: 'Reset vector and sandwich layout',
			goalEs: '**Completar** la estructura del programa: reset en 0x0000, subrutina `init_gpio`, `inicio` y bucle.',
			goalEn: '**Complete** program structure: reset at 0x0000, `init_gpio` subroutine, `inicio`, and loop.',
			bodyEs:
				'`ORG 0x0000` + `GOTO inicio` es el **vector de reset**: al encender, el PIC salta a `inicio`.\n\nEstilo [sandwich](/fundamentos/ensamblador/#anatomia-de-un-archivo-mpasm--estilo-sandwich): subrutinas arriba, `programa:` abajo. `init_gpio` solo tiene `RETURN` — en el paso 5 agregamos TRIS.',
			bodyEn:
				'`ORG 0x0000` + `GOTO inicio` is the **reset vector**: on power-up the PIC jumps to `inicio`.\n\n[sandwich](/en/fundamentos/ensamblador/#anatomy-of-an-mpasm-file--sandwich-layout) style: subroutines on top, main program below. `init_gpio` only has `RETURN` — we add TRIS in step 5.',
			instructionsEs: [
				'**Despues** de CONFIG y **antes** de END, pega la estructura del bloque **Tu archivo hasta ahora** (ORG, init_gpio, inicio, bucle).',
				'Comprueba: una sola etiqueta `inicio`, un solo `bucle` con `GOTO bucle`.',
				'Compila — BUILD SUCCESSFUL. El programa aun no enciende nada; eso es normal.',
				'Marca el paso completado solo si compila.',
			],
			instructionsEn: [
				'**After** CONFIG and **before** END, paste the structure from **Your file so far** (ORG, init_gpio, inicio, bucle).',
				'Check: one `inicio` label, one `bucle` with `GOTO bucle`.',
				'Build — BUILD SUCCESSFUL. The program does not light anything yet; that is normal.',
				'Mark this step done only if it builds.',
			],
			cumulativeCode: SHELL_CODE,
			code: `        ORG     0x0000
        GOTO    inicio

init_gpio:
        RETURN

inicio:
        CALL    init_gpio
bucle:
        GOTO    bucle`,
			checklistEs: [
				'Existe ORG 0x0000 con GOTO inicio.',
				'Existe init_gpio con RETURN, inicio con CALL init_gpio, y bucle infinito.',
				'Compila sin errores.',
			],
			checklistEn: [
				'`ORG 0x0000` with `GOTO inicio` exists.',
				'`init_gpio` with RETURN, `inicio` with CALL init_gpio, and infinite loop exist.',
				'Builds with no errors.',
			],
		},
		{
			id: '5-tris-direccion',
			order: 5,
			titleEs: 'TRIS: RB0 salida, RB1 entrada',
			titleEn: 'TRIS: RB0 output, RB1 input',
			goalEs: '**Configurar direcciones** en `init_gpio` con TRISB antes de usar LAT o PORT.',
			goalEn: '**Set pin directions** in `init_gpio` with TRISB before using LAT or PORT.',
			bodyEs:
				'En TRIS: **0 = salida**, **1 = entrada**. `BCF TRISB, 0` → RB0 salida (LED). `BSF TRISB, 1` → RB1 entrada (pulsador).\n\n**Regla:** siempre TRIS **antes** de LAT/PORT. Sin este paso el LED no responde aunque escribas LAT.',
			bodyEn:
				'In TRIS: **0 = output**, **1 = input**. `BCF TRISB, 0` → RB0 output (LED). `BSF TRISB, 1` → RB1 input (button).\n\n**Rule:** always TRIS **before** LAT/PORT. Without this step the LED will not respond even if you write LAT.',
			instructionsEs: [
				'En `init_gpio`, **reemplaza** el `RETURN` solo por las dos lineas TRIS + `RETURN` del bloque resaltado.',
				'No cambies `inicio` ni `bucle` todavia.',
				'Compila — debe seguir sin errores.',
				'**Aun no simules** — falta el esquema en Proteus (paso 6).',
			],
			instructionsEn: [
				'In `init_gpio`, **replace** lone `RETURN` with the two TRIS lines + `RETURN` from the highlighted block.',
				'Do not change `inicio` or `bucle` yet.',
				'Build — should still succeed.',
				'**Do not simulate yet** — Proteus schematic comes in step 6.',
			],
			cumulativeCode: TRIS_CODE,
			code: `init_gpio:
        BCF     TRISB, 0      ; RB0 salida (LED)
        BSF     TRISB, 1      ; RB1 entrada (pulsador)
        RETURN`,
			checklistEs: [
				'init_gpio tiene BCF TRISB,0 y BSF TRISB,1 antes del RETURN.',
				'Compila sin errores.',
			],
			checklistEn: [
				'`init_gpio` has BCF TRISB,0 and BSF TRISB,1 before RETURN.',
				'Builds with no errors.',
			],
			tipEs: 'TRIS no enciende el LED — solo define direccion.',
			tipEn: 'TRIS does not turn the LED on — it only sets direction.',
		},
		{
			id: '6-proteus-esquema',
			order: 6,
			titleEs: 'Montar LED y pulsador en Proteus',
			titleEn: 'Wire LED and button in Proteus',
			goalEs: '**Tener** el circuito listo para cargar el `.HEX` — sin cambiar codigo en este paso.',
			goalEn: '**Have** the circuit ready to load the `.HEX` — no code changes in this step.',
			bodyEs:
				'Este paso es **solo hardware en Proteus** (o verifica tu placa). El codigo sigue igual que en el paso 5.\n\n**RB0:** pin → resistencia 220–330 Ω → LED (anodo) → catodo a GND. **RB1:** pulsador NA entre pin y GND; resistencia 10 kΩ de RB1 a Vdd (pull-up).',
			bodyEn:
				'This step is **Proteus hardware only** (or verify your board). Code stays the same as step 5.\n\n**RB0:** pin → 220–330 Ω resistor → LED (anode) → cathode to GND. **RB1:** NA button between pin and GND; 10 kΩ from RB1 to Vdd (pull-up).',
			instructionsEs: [
				'Abre Proteus ISIs: PIC18F4550, cristal 20 MHz, capacitores y reset segun [sistema minimo](/fundamentos/arquitectura/).',
				'Conecta **LED en RB0** con resistencia en serie.',
				'Conecta **pulsador en RB1** con pull-up (resistencia a Vdd).',
				'Guarda el esquema — aun **no** cargues HEX; eso es en el paso 7.',
			],
			instructionsEn: [
				'Open Proteus ISIS: PIC18F4550, 20 MHz crystal, caps and reset per [minimum system](/en/fundamentos/arquitectura/).',
				'Wire **LED on RB0** with series resistor.',
				'Wire **button on RB1** with pull-up (resistor to Vdd).',
				'Save the schematic — do **not** load HEX yet; that is step 7.',
			],
			cumulativeCode: TRIS_CODE,
			checklistEs: [
				'Esquema Proteus (o placa) tiene LED en RB0 y pulsador en RB1.',
				'El codigo no cambio respecto al paso anterior.',
			],
			checklistEn: [
				'Proteus schematic (or board) has LED on RB0 and button on RB1.',
				'Code is unchanged from the previous step.',
			],
			tipEs: 'Si simulas solo el LED primero, puedes dejar RB1 flotante hasta el paso 8.',
			tipEn: 'If you simulate LED only first, you can leave RB1 floating until step 8.',
		},
		{
			id: '7-lat-salidas',
			order: 7,
			titleEs: 'LAT: encender el LED (primera prueba)',
			titleEn: 'LAT: turn on the LED (first test)',
			goalEs: '**Agregar** LAT en `inicio`, generar `.HEX` y **ver el LED encendido** en simulacion.',
			goalEn: '**Add** LAT in `inicio`, generate `.HEX`, and **see the LED on** in simulation.',
			bodyEs:
				'Las salidas se escriben en **LATB**, no en PORTB. Agregamos `BCF LATB,0` (apagado inicial) y `BSF LATB,0` (encendido de prueba).\n\n**Este es tu primer resultado visible.** Si el LED no enciende aqui, no sigas — revisa TRIS, esquema y config bits.',
			bodyEn:
				'Outputs are written to **LATB**, not PORTB. We add `BCF LATB,0` (initial off) and `BSF LATB,0` (test on).\n\n**This is your first visible result.** If the LED does not light here, stop — check TRIS, schematic, and config bits.',
			instructionsEs: [
				'En `inicio`, despues de `CALL init_gpio`, agrega las dos lineas LAT del bloque resaltado.',
				'Compila y localiza el `.HEX` en la carpeta del proyecto (dist o build).',
				'Proteus: doble clic al PIC → Program File → selecciona el `.HEX`.',
				'Play en Proteus: el **LED debe quedar encendido**. Si no, vuelve al paso 5 o 6.',
			],
			instructionsEn: [
				'In `inicio`, after `CALL init_gpio`, add the two LAT lines from the highlighted block.',
				'Build and find the `.HEX` in the project folder (dist or build).',
				'Proteus: double-click PIC → Program File → select the `.HEX`.',
				'Run Proteus: **LED must stay on**. If not, go back to step 5 or 6.',
			],
			cumulativeCode: LAT_CODE,
			code: `inicio:
        CALL    init_gpio
        BCF     LATB, 0       ; LED apagado al arrancar
        BSF     LATB, 0       ; prueba: enciende LED`,
			checklistEs: [
				'Agregue BCF/BSF LATB,0 en inicio.',
				'Compilé y cargué el HEX en Proteus (o placa).',
				'**Vi el LED encendido** — confirmado con mis ojos o la simulacion.',
			],
			checklistEn: [
				'I added BCF/BSF LATB,0 in inicio.',
				'I built and loaded the HEX in Proteus (or board).',
				'**I saw the LED on** — confirmed in simulation or hardware.',
			],
		},
		{
			id: '8-port-entradas',
			order: 8,
			titleEs: 'PORT: el pulsador controla el LED',
			titleEn: 'PORT: button controls the LED',
			goalEs: '**Mover** la logica al bucle: leer RB1 con PORTB y escribir el LED con LATB.',
			goalEn: '**Move** logic to the loop: read RB1 with PORTB and drive the LED with LATB.',
			bodyEs:
				'Quita el `BSF LATB,0` fijo de `inicio` (deja `BCF LATB,0` tras init). En `bucle`, **PORT** lee el pulsador y **LAT** actualiza el LED.\n\nPulsador NA + pull-up: RB1 = **1** suelto, **0** presionado. Presionas → LED enciende.',
			bodyEn:
				'Remove fixed `BSF LATB,0` from `inicio` (keep `BCF LATB,0` after init). In `bucle`, **PORT** reads the button and **LAT** updates the LED.\n\nNA button + pull-up: RB1 = **1** released, **0** pressed. Press → LED on.',
			instructionsEs: [
				'Borra `BSF LATB, 0` de `inicio` (manten `BCF LATB, 0` y `CALL init_gpio`).',
				'Reemplaza el `GOTO bucle` vacio por las 4 instrucciones del bloque resaltado + `GOTO bucle`.',
				'Compila, recarga el HEX en Proteus.',
				'Prueba: **presionar** pulsador → LED on; **soltar** → LED off. Repite 3 veces para confirmar.',
			],
			instructionsEn: [
				'Delete `BSF LATB, 0` from `inicio` (keep `BCF LATB, 0` and `CALL init_gpio`).',
				'Replace empty loop with the 4 instructions from the highlighted block + `GOTO bucle`.',
				'Build, reload HEX in Proteus.',
				'Test: **press** button → LED on; **release** → off. Repeat 3 times to confirm.',
			],
			cumulativeCode: PORT_CODE,
			code: `bucle:
        BTFSC   PORTB, 1      ; RB1 alto = pulsador suelto
        BCF     LATB, 0
        BTFSS   PORTB, 1      ; RB1 bajo = pulsador presionado
        BSF     LATB, 0
        GOTO    bucle`,
			checklistEs: [
				'El bucle usa PORTB para leer y LATB para escribir.',
				'Probé pulsador y LED al menos 3 veces — funciona.',
			],
			checklistEn: [
				'Loop uses PORTB to read and LATB to write.',
				'I tested button and LED at least 3 times — it works.',
			],
			challengeEs:
				'Opcional: invierte la logica (LED on cuando sueltas el pulsador).',
			challengeEn:
				'Optional: invert logic (LED on when you release the button).',
		},
		{
			id: '9-programa-completo',
			order: 9,
			titleEs: 'Revisar programa final y guardar',
			titleEn: 'Review final program and save',
			goalEs: '**Tener** el `.ASM` final comentado, guardado y funcionando — plantilla para otros labs.',
			goalEn: '**Have** the final commented `.ASM` saved and working — template for other labs.',
			bodyEs:
				'Compara tu archivo con la version de abajo. Agrega comentarios si faltan.\n\nRecorrido completo: **CONFIG → reset → TRIS → LAT → PORT**. Ese orden lo repetiras en [Primer LED](/tutoriales/primer-led/) y Practica 1.',
			bodyEn:
				'Compare your file with the version below. Add comments if missing.\n\nFull path: **CONFIG → reset → TRIS → LAT → PORT**. You will repeat this order in [First LED](/en/tutoriales/primer-led/) and Practice 1.',
			instructionsEs: [
				'Alinea comentarios con la version final de abajo.',
				'Guarda `guia-puertos.asm` en una carpeta del curso (backup).',
				'Simula una ultima vez: pulsador controla LED.',
				'Marca el paso y continua al **test** (paso 10).',
			],
			instructionsEn: [
				'Align comments with the final version below.',
				'Save `guia-puertos.asm` in your course folder (backup).',
				'Simulate one last time: button controls LED.',
				'Mark step done and continue to the **test** (step 10).',
			],
			cumulativeCode: FINAL_CODE,
			checklistEs: [
				'Mi programa coincide con la logica final y compila.',
				'Guarde copia del `.ASM`.',
				'Puedo explicar TRIS, LAT y PORT en voz alta.',
			],
			checklistEn: [
				'My program matches the final logic and builds.',
				'I saved a copy of the `.ASM`.',
				'I can explain TRIS, LAT, and PORT out loud.',
			],
		},
		{
			id: '10-comprueba',
			order: 10,
			titleEs: 'Comprueba lo aprendido',
			titleEn: 'Check what you learned',
			bodyEs:
				'Mini-examen de 5 preguntas. Si fallas una, vuelve al paso indicado en la explicacion — el rastreador te muestra cual.\n\nCuando apruebes, estas listo para [Primer LED](/tutoriales/primer-led/) en la [ruta de estudio](/ruta-de-estudio/).',
			bodyEn:
				'5-question mini exam. If you miss one, return to the step shown in the explanation — the tracker shows which.\n\nWhen you pass, you are ready for [First LED](/en/tutoriales/primer-led/) on the [study path](/en/ruta-de-estudio/).',
			checklistEs: [
				'Respondi el test (puedes repetirlo).',
				'Todos los pasos 0–9 marcados en el rastreador.',
			],
			checklistEn: [
				'I answered the quiz (you can retry).',
				'Steps 0–9 all checked in the tracker.',
			],
			quizSlug: 'tutoriales/guias/puertos',
		},
	],
};
