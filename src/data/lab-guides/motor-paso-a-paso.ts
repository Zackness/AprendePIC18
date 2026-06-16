import type { LabGuideContent } from './types';

export const motorPasoAPasoGuide: LabGuideContent = {
	practiceSlug: 'practicas/motor-paso-a-paso',
	pre: {
		titleEs: 'Pre-laboratorio — investigación de referencia',
		titleEn: 'Pre-laboratory — reference research',
		introEs: 'Investigación previa para la Práctica 6 (Motor paso a paso, UNEXPO).',
		introEn: 'Pre-lab research for Practice 6 (Stepper motor, UNEXPO).',
		noteEs: 'Revisa el datasheet del motor y del driver ULN2003 del montaje.',
		noteEn: 'Review the motor and ULN2003 driver datasheet from the schematic.',
		items: [
			{
				id: 'pre-1',
				questionEs: '¿Qué es un motor paso a paso y cómo gira?',
				questionEn: 'What is a stepper motor and how does it rotate?',
				answerEs: `Un motor **paso a paso** convierte pulsos eléctricos en **rotación angular discreta** (pasos). Cada paso gira el eje un ángulo fijo (p. ej. 5.625°/paso en motores pequeños con reductora).

Se energizan las **bobinas** en secuencia (full step o half step). El PIC no entrega suficiente corriente: se usa un **driver** (ULN2003) entre el PIC y las bobinas.`,
				answerEn: `A **stepper** converts electrical pulses into **discrete angular steps**. Each step turns the shaft a fixed angle (e.g. 5.625°/step on small geared motors).

**Coils** are energized in sequence (full or half step). The PIC cannot drive coil current directly — a **driver** (ULN2003) sits between PIC and coils.`,
			},
			{
				id: 'pre-2',
				questionEs: 'Secuencias full step y half step',
				questionEn: 'Full step and half step sequences',
				answerEs: `**Full step (4 fases):** una bobina activa a la vez — 4 estados por ciclo eléctrico, más torque, menos resolución.

**Half step:** combina dos bobinas intermedias — el doble de pasos por revolución, movimiento más suave.

Ejemplo secuencia unipolar (4 bobinas A–D):
\`1000 → 0100 → 0010 → 0001 → 1000\`

En el programa guardas la secuencia en una **tabla** y avanzas un índice con cada paso.`,
				answerEn: `**Full step:** one coil on at a time — 4 states per cycle, more torque, less resolution.

**Half step:** two coils at intermediate states — double steps per revolution, smoother motion.

Example unipolar sequence (coils A–D):
\`1000 → 0100 → 0010 → 0001 → 1000\`

Store the sequence in a **table** and advance an index each step.`,
			},
			{
				id: 'pre-3',
				questionEs: 'Función del ULN2003',
				questionEn: 'Role of the ULN2003',
				answerEs: `El **ULN2003** es un arreglo de **darlington** con diodos de protección. Amplifica la corriente de las salidas del PIC (~20 mA) hasta la corriente de bobina del motor (~hundreds of mA). Las entradas del ULN2003 vienen del PIC; las salidas van a los comunes de las bobinas del motor paso a paso unipolar.`,
				answerEn: `The **ULN2003** is a **Darlington** array with protection diodes. It amplifies PIC outputs (~20 mA) to motor coil current (~hundreds of mA). ULN2003 inputs come from the PIC; outputs drive unipolar stepper coil commons.`,
			},
		],
	},
	post: {
		titleEs: 'Post-laboratorio — investigación de referencia',
		titleEn: 'Post-laboratory — reference research',
		introEs: 'Análisis posterior a controlar el motor en simulación o hardware.',
		introEn: 'Post-lab analysis after controlling the motor in simulation or hardware.',
		noteEs: 'Documenta la secuencia exacta de bits que enviaste a cada bobina.',
		noteEn: 'Document the exact bit pattern sent to each coil.',
		items: [
			{
				id: 'post-1',
				questionEs: '¿Cómo controlas la velocidad del motor paso a paso?',
				questionEn: 'How do you control stepper motor speed?',
				answerEs: `La velocidad depende del **tiempo entre pasos** (periodo). Usa un **Timer** o retardo por software entre cada cambio de secuencia. Menor retardo → más pasos por segundo → mayor velocidad angular. Cuidado: si el retardo es muy corto el motor **pierde pasos** (no sigue el campo magnético).`,
				answerEn: `Speed depends on **time between steps**. Use a **Timer** or software delay between sequence changes. Shorter delay → more steps per second → higher angular speed. Too short and the motor **misses steps**.`,
			},
			{
				id: 'post-2',
				questionEs: '¿Cómo inviertes el sentido de giro?',
				questionEn: 'How do you reverse rotation direction?',
				answerEs: `Invierte el **orden** de la secuencia de energización: en lugar de avanzar el índice (\`incf\`), retrocede (\`decf\`) o recorre la tabla en sentido contrario. Un pulsador puede alternar la variable \`sentido\` y elegir incremento o decremento del índice de fase.`,
				answerEn: `Reverse the **order** of the energization sequence: decrement the phase index instead of incrementing, or walk the table backwards. A button can toggle a \`direction\` variable.`,
			},
		],
	},
	design: {
		pseudocodeEs: `INICIO
    Configurar 4 salidas → ULN2003
    Configurar Timer0 para retardo entre pasos
    fase ← 0, sentido ← horario
    tabla ← {1000, 0100, 0010, 0001}
REPITIR SIEMPRE
    SI boton_paso ENTONCES avanzar_fase()
    SI boton_dir ENTONCES sentido ← invertir
    escribir tabla[fase] en puerto motor
    esperar retardo_timer
FIN REPITIR`,
		pseudocodeEn: `START
    Config 4 outputs → ULN2003
    Config Timer0 for step delay
    phase ← 0, direction ← CW
    table ← {1000, 0100, 0010, 0001}
REPEAT FOREVER
    IF step_button THEN advance_phase()
    IF dir_button THEN direction ← toggle
    write table[phase] to motor port
    wait timer_delay
END REPEAT`,
		flowchartSrc: '/images/practicas/practica-6-flujo.svg',
		flowchartAltEs: 'Diagrama de flujo Práctica 6 motor paso a paso',
		flowchartAltEn: 'Practice 6 stepper motor flowchart',
		flowchartCaptionEs: 'Secuencia de fases, retardo entre pasos y control de dirección.',
		flowchartCaptionEn: 'Phase sequence, step delay and direction control.',
		pseudoPlaceholderEs: `INICIO
    Init salidas y timer
REPITIR
    Siguiente fase en tabla
    Escribir patrón en bobinas
    Retardo (velocidad)
FIN REPITIR`,
		pseudoPlaceholderEn: `START
    Init outputs and timer
REPEAT
    Next phase in table
    Write pattern to coils
    Delay (speed)
END REPEAT`,
		pseudoHintEs:
			'Incluye: tabla de secuencia, índice de fase, retardo con timer, botones de dirección/velocidad y driver ULN2003.',
		pseudoHintEn:
			'Include: sequence table, phase index, timer delay, direction/speed buttons and ULN2003 driver.',
		flowPlaceholderEs: `1. INICIO
2. Init puertos + timer
3. ¿Botón dirección? (rombo)
4. Avanzar/retroceder fase
5. Escribir patrón bobinas
6. Retardo → volver a 3`,
		flowPlaceholderEn: `1. START
2. Init ports + timer
3. Direction button? (diamond)
4. Advance/rewind phase
5. Write coil pattern
6. Delay → back to 3`,
		flowHintsEs: [
			'Tabla de secuencia (subrutina/datos)',
			'Índice de fase (variable)',
			'Retardo timer (rectángulo)',
			'Decisión sentido (rombo)',
			'Salida a ULN2003 (paralelogramo)',
			'Bucle infinito',
		],
		flowHintsEn: [
			'Sequence table (subroutine/data)',
			'Phase index (variable)',
			'Timer delay (rectangle)',
			'Direction decision (diamond)',
			'Output to ULN2003 (parallelogram)',
			'Infinite loop',
		],
	},
};
