import type { PracticeTutorial } from './tutorials';
import type { TutorialStep } from './tutorial-step-types';
import { detailedPracticeSteps } from './tutorial-steps-practices';

export type { TutorialStep } from './tutorial-step-types';

/** Pasos detallados por slug de tutorial (contenido estilo Astro: explica + código + tarea). */
export const tutorialStepBank: Record<string, TutorialStep[]> = {
	'primer-led': [
		{
			id: 'setup',
			titleEs: 'Crea el proyecto en MPLAB',
			titleEn: 'Create the MPLAB project',
			bodyEs:
				'Abre MPLAB IDE 8.88 → **File → New Project**. Elige **PIC18F4550**, compilador **MPASM**, y tu programador (PICkit 2/3) o **Simulator** si aún no tienes placa. Crea un archivo `.asm` en el proyecto.',
			bodyEn:
				'Open MPLAB IDE 8.88 → **File → New Project**. Select **PIC18F4550**, **MPASM** compiler, and your programmer (PICkit 2/3) or **Simulator** if you have no board yet. Create a `.asm` file in the project.',
			tipEs: 'Guía de instalación: /fundamentos/mplab-proteus/',
			tipEn: 'Setup guide: /en/fundamentos/mplab-proteus/',
		},
		{
			id: 'config',
			titleEs: 'Escribe las directivas CONFIG',
			titleEn: 'Write CONFIG directives',
			bodyEs:
				'Al inicio del archivo declara el procesador y desactiva el watchdog. Con cristal de 20 MHz usa `FOSC = HS`. Estas líneas no generan código ejecutable: le dicen al ensamblador cómo configurar el PIC al grabar.',
			bodyEn:
				'At the top of the file declare the processor and disable the watchdog. With a 20 MHz crystal use `FOSC = HS`. These lines do not generate executable code—they tell the assembler how to configure the PIC when programming.',
			code: `        LIST    P=18F4550
        #include <P18F4550.INC>

        CONFIG  FOSC = HS
        CONFIG  WDT = OFF
        CONFIG  LVP = OFF`,
		},
		{
			id: 'tris',
			titleEs: 'Configura RB0 como salida',
			titleEn: 'Set RB0 as output',
			bodyEs:
				'`TRISB` define dirección: bit `1` = entrada, bit `0` = salida. Para encender un LED en RB0 necesitas ese pin como salida. Usa `BCF TRISB, 0` (pone el bit 0 en 0). Limpia `LATB` antes para un estado conocido.',
			bodyEn:
				'`TRISB` sets direction: bit `1` = input, bit `0` = output. To drive an LED on RB0 you need that pin as output. Use `BCF TRISB, 0` (clears bit 0). Clear `LATB` first for a known state.',
			code: `inicio:
        CLRF    LATB        ; Apaga todas las salidas de PORTB
        BCF     TRISB, 0    ; RB0 como salida`,
		},
		{
			id: 'lat',
			titleEs: 'Enciende el LED escribiendo en LATB',
			titleEn: 'Turn the LED on via LATB',
			bodyEs:
				'Escribe en `LATB`, no en `PORTB`, para fijar el nivel de salida. `BSF LATB, 0` pone RB0 en alto. Si tu LED va de RB0 → resistencia → cátodo a tierra, debería encenderse.',
			bodyEn:
				'Write to `LATB`, not `PORTB`, to set the output level. `BSF LATB, 0` drives RB0 high. If your LED goes RB0 → resistor → cathode to ground, it should light up.',
			code: `        BSF     LATB, 0     ; RB0 en alto — LED encendido

bucle:
        GOTO    bucle       ; El PIC no debe “terminar”`,
		},
		{
			id: 'simulate',
			titleEs: 'Simula en Proteus y adapta a tu montaje',
			titleEn: 'Simulate in Proteus and adapt to your build',
			bodyEs:
				'Importa el PIC18F4550, cristal 20 MHz, LED en RB0 con resistencia 220–330 Ω. Compila en MPLAB → carga el `.hex` en Proteus. **Adapta** el pin si tu placa usa otro puerto: cambia `TRISB`/`LATB` y el bit correspondiente.',
			bodyEn:
				'Import PIC18F4550, 20 MHz crystal, LED on RB0 with 220–330 Ω resistor. Build in MPLAB → load `.hex` in Proteus. **Adapt** the pin if your board uses another port: change `TRISB`/`LATB` and the matching bit.',
			tipEs: 'Ejercicio: mueve el LED a RB1. ¿Qué dos líneas cambian?',
			tipEn: 'Exercise: move the LED to RB1. Which two lines change?',
		},
	],
	'practica-1': [
		{
			id: 'hardware',
			titleEs: 'Monta el hardware según el diagrama',
			titleEn: 'Wire the hardware per schematic',
			bodyEs:
				'Operandos en **PORTB** y **PORTD** (DIP switches con pull-up). Resultado en **LATC** y **LATE** (LEDs). Pulsador en **RA0** para cambiar de operación. Revisa el diagrama antes de escribir una línea de código.',
			bodyEn:
				'Operands on **PORTB** and **PORTD** (DIP switches with pull-up). Result on **LATC** and **LATE** (LEDs). Pushbutton on **RA0** to change operation. Review the schematic before writing code.',
		},
		{
			id: 'ports',
			titleEs: 'Configura direcciones de puerto',
			titleEn: 'Configure port directions',
			bodyEs:
				'RB y RD como entradas (`TRISB`/`TRISD` = 0xFF`). RC y RE como salidas (`TRISC`/`TRISE` = 0x00`). RA0 entrada para el pulsador. Lee operandos con `MOVF PORTB, W` y `MOVF PORTD, W`.',
			bodyEn:
				'RB and RD as inputs (`TRISB`/`TRISD` = 0xFF`). RC and RE as outputs (`TRISC`/`TRISE` = 0x00`). RA0 input for the button. Read operands with `MOVF PORTB, W` and `MOVF PORTD, W`.',
			code: `        MOVLW   0xFF
        MOVWF   TRISB
        MOVWF   TRISD
        CLRF    TRISC
        CLRF    TRISE
        BSF     TRISA, 0    ; RA0 entrada`,
		},
		{
			id: 'alu',
			titleEs: 'Implementa una operación ALU',
			titleEn: 'Implement one ALU operation',
			bodyEs:
				'Empieza por la **suma**: `MOVF PORTB, W` → `ADDWF PORTD, W` → resultado en W → `MOVWF LATC`. Cuando funcione, duplica la rutina para resta (`SUBWF`), OR (`IORWF`), etc.',
			bodyEn:
				'Start with **add**: `MOVF PORTB, W` → `ADDWF PORTD, W` → result in W → `MOVWF LATC`. Once it works, duplicate the routine for subtract (`SUBWF`), OR (`IORWF`), etc.',
			code: `suma:
        MOVF    PORTB, W
        ADDWF   PORTD, W
        MOVWF   LATC`,
		},
		{
			id: 'mul-div',
			titleEs: 'Añade multiplicación y división por software',
			titleEn: 'Add multiply and software divide',
			bodyEs:
				'`MULWF` deja el producto en `PRODH:PRODL` — muestra ambos bytes en RC y RE. La división no tiene instrucción nativa: resta el divisor repetidamente y cuenta cuántas veces cabe.',
			bodyEn:
				'`MULWF` leaves the product in `PRODH:PRODL`—display both bytes on RC and RE. Division has no native instruction: subtract the divisor repeatedly and count how many times it fits.',
		},
		{
			id: 'mode',
			titleEs: 'Usa RA0 para cambiar de modo',
			titleEn: 'Use RA0 to switch modes',
			bodyEs:
				'Guarda el modo actual en una variable RAM (`operacion`). Cada pulsación en RA0 incrementa el modo (0…8 y vuelve a 0). En el bucle principal, salta a la rutina según el valor de `operacion`.',
			bodyEn:
				'Store the current mode in a RAM variable (`operacion`). Each press on RA0 increments the mode (0…8 then back to 0). In the main loop, branch to the routine matching `operacion`.',
		},
		{
			id: 'test',
			titleEs: 'Simula, prueba en físico y documenta',
			titleEn: 'Simulate, test on hardware, and document',
			bodyEs:
				'Verifica cada modo en Proteus con distintas combinaciones de switches. En placa física, repite las pruebas. Completa el informe pre/post laboratorio con capturas y explicación de cada operación.',
			bodyEn:
				'Verify each mode in Proteus with different switch combinations. On the physical board, repeat tests. Complete the pre/post lab report with screenshots and an explanation of each operation.',
		},
	],
};

Object.assign(tutorialStepBank, detailedPracticeSteps);

export function getTutorialSteps(tutorial: PracticeTutorial): TutorialStep[] {
	const rich = tutorialStepBank[tutorial.slug];
	if (rich) return rich;

	return tutorial.stepsEs.map((stepEs, index) => ({
		id: `step-${index + 1}`,
		titleEs: stepEs,
		titleEn: tutorial.stepsEn[index] ?? stepEs,
		bodyEs:
			'Implementa este paso en tu proyecto MPLAB/Proteus. Escribe el código necesario, compila sin errores y verifica el comportamiento antes de continuar. Adapta pines y rutinas a tu montaje si el diagrama de tu sección difiere.',
		bodyEn:
			'Implement this step in your MPLAB/Proteus project. Write the required code, build without errors, and verify behavior before moving on. Adapt pins and routines to your wiring if your section schematic differs.',
	}));
}
