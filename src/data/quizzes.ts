export interface QuizQuestion {
	id: string;
	questionEs: string;
	questionEn: string;
	optionsEs: string[];
	optionsEn: string[];
	correctIndex: number;
	explanationEs?: string;
	explanationEn?: string;
}

export interface PageQuiz {
	slug: string;
	titleEs: string;
	titleEn: string;
	sourceDoc?: string;
	questions: QuizQuestion[];
}

/**
 * Solo los examenes de "Comienza aqui" (introduccion) se pueden intentar sin cuenta;
 * el progreso se guarda en el navegador hasta iniciar sesion en CALETAS.
 * Todos los demas (fundamentos, parciales, practicas, etc.) requieren cuenta.
 */
export const quizAuthOptionalSlugs = new Set([
	'introduccion/pic18f4550',
	'introduccion/comparaciones',
]);

export function isQuizAuthRequired(slug: string): boolean {
	const normalized = slug.replace(/^\/+|\/+$/g, '').replace(/^en\//, '');
	if (quizAuthOptionalSlugs.has(normalized)) return false;
	if (normalized.endsWith('/basico')) return false;
	return true;
}

/** Banco de examenes por slug de pagina (sin prefijo /en/) */
export const pageQuizzes: PageQuiz[] = [
	{
		slug: 'introduccion/pic18f4550',
		titleEs: 'Introduccion al PIC18F4550',
		titleEn: 'Introduction to PIC18F4550',
		sourceDoc: 'Tema 1. Conceptos Básicos (1).pdf',
		questions: [
			{
				id: 'q1',
				questionEs: '¿El PIC18F4550 ejecuta un sistema operativo como una Raspberry Pi?',
				questionEn: 'Does the PIC18F4550 run an operating system like a Raspberry Pi?',
				optionsEs: ['Verdadero', 'Falso'],
				optionsEn: ['True', 'False'],
				correctIndex: 1,
				explanationEs: 'El PIC ejecuta directamente el programa en Flash, sin SO.',
				explanationEn: 'The PIC runs the program in Flash directly, without an OS.',
			},
			{
				id: 'q2',
				questionEs: '¿Donde se guarda el programa que grabas con el .hex?',
				questionEn: 'Where is the program you burn with the .hex file stored?',
				optionsEs: ['RAM', 'EEPROM', 'Memoria Flash', 'Registro WREG'],
				optionsEn: ['RAM', 'EEPROM', 'Flash memory', 'WREG register'],
				correctIndex: 2,
			},
			{
				id: 'q3',
				questionEs: '¿Cuantos bits tiene la CPU del PIC18F4550?',
				questionEn: 'How many bits is the PIC18F4550 CPU?',
				optionsEs: ['4 bits', '8 bits', '16 bits', '32 bits'],
				optionsEn: ['4 bits', '8 bits', '16 bits', '32 bits'],
				correctIndex: 1,
			},
		],
	},
	{
		slug: 'fundamentos/arquitectura',
		titleEs: 'Arquitectura Harvard',
		titleEn: 'Harvard architecture',
		sourceDoc: 'Clase Tema 2 y 3 (1).pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'En arquitectura Harvard, programa y datos...',
				questionEn: 'In Harvard architecture, program and data...',
				optionsEs: [
					'Comparten el mismo bus y memoria',
					'Tienen buses y espacios de memoria separados',
					'Solo existen en EEPROM',
					'Se leen unicamente por UART',
				],
				optionsEn: [
					'Share the same bus and memory',
					'Have separate buses and memory spaces',
					'Exist only in EEPROM',
					'Are read only via UART',
				],
				correctIndex: 1,
			},
			{
				id: 'q2',
				questionEs: '¿Que registro selecciona el banco de memoria?',
				questionEn: 'Which register selects the memory bank?',
				optionsEs: ['WREG', 'STATUS', 'BSR', 'PC'],
				optionsEn: ['WREG', 'STATUS', 'BSR', 'PC'],
				correctIndex: 2,
			},
			{
				id: 'q3',
				questionEs: 'Los SFR sirven para...',
				questionEn: 'SFRs are used to...',
				optionsEs: [
					'Guardar solo variables del usuario',
					'Controlar perifericos y funciones especiales',
					'Almacenar el programa principal',
					'Configurar el cristal externo unicamente',
				],
				optionsEn: [
					'Store only user variables',
					'Control peripherals and special functions',
					'Store the main program',
					'Configure only the external crystal',
				],
				correctIndex: 1,
			},
		],
	},
	{
		slug: 'fundamentos/bits-hex',
		titleEs: 'Bits y hexadecimal',
		titleEn: 'Bits and hexadecimal',
		sourceDoc: 'Clase Tema 2 y 3 (1).pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'El valor hexadecimal 0x0F en binario es:',
				questionEn: 'The hexadecimal value 0x0F in binary is:',
				optionsEs: ['00001111', '11110000', '00011110', '10101010'],
				optionsEn: ['00001111', '11110000', '00011110', '10101010'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'Para encender solo el bit 3 de un puerto usas una mascara...',
				questionEn: 'To turn on only bit 3 of a port you use a mask...',
				optionsEs: ['AND con 0', 'IORLW con el bit 3 en 1', 'XOR con FF', 'NOP'],
				optionsEn: ['AND with 0', 'IORLW with bit 3 set to 1', 'XOR with FF', 'NOP'],
				correctIndex: 1,
			},
		],
	},
	{
		slug: 'fundamentos/registros',
		titleEs: 'Registros del PIC18',
		titleEn: 'PIC18 registers',
		sourceDoc: 'Clase Tema 2 y 3 (1).pdf',
		questions: [
			{
				id: 'q1',
				questionEs: '¿Que registro define si un pin es entrada o salida?',
				questionEn: 'Which register defines if a pin is input or output?',
				optionsEs: ['PORTx', 'LATx', 'TRISx', 'ADCON0'],
				optionsEn: ['PORTx', 'LATx', 'TRISx', 'ADCON0'],
				correctIndex: 2,
			},
			{
				id: 'q2',
				questionEs: 'Para escribir un valor de salida sin leer entradas analogas conviene usar...',
				questionEn: 'To write an output without reading analog inputs you should use...',
				optionsEs: ['PORTx', 'LATx', 'INTCON', 'SSPSTAT'],
				optionsEn: ['PORTx', 'LATx', 'INTCON', 'SSPSTAT'],
				correctIndex: 1,
			},
		],
	},
	{
		slug: 'gpio',
		titleEs: 'GPIO y puertos',
		titleEn: 'GPIO and ports',
		sourceDoc: 'Clase Tema 2 y 3 (1).pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'TRISB = 0xFF significa que el puerto B es...',
				questionEn: 'TRISB = 0xFF means port B is...',
				optionsEs: ['Todo salida', 'Todo entrada', 'Mitad entrada mitad salida', 'En alta impedancia USB'],
				optionsEn: ['All output', 'All input', 'Half input half output', 'USB high-Z'],
				correctIndex: 1,
			},
			{
				id: 'q2',
				questionEs: '¿Cual es la diferencia principal entre PORTB y LATB?',
				questionEn: 'What is the main difference between PORTB and LATB?',
				optionsEs: [
					'PORT lee/escribe latch; LAT solo lectura',
					'LAT escribe la salida; PORT lee el pin (puede incluir entrada)',
					'No hay diferencia en PIC18',
					'LAT es solo para analogico',
				],
				optionsEn: [
					'PORT reads/writes latch; LAT is read-only',
					'LAT writes output; PORT reads the pin (may include input)',
					'There is no difference on PIC18',
					'LAT is analog only',
				],
				correctIndex: 1,
			},
		],
	},
	{
		slug: 'timers/timer0',
		titleEs: 'Timer 0',
		titleEn: 'Timer 0',
		sourceDoc: 'Clase Tema 8. Timer.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'TMR0IF indica que...',
				questionEn: 'TMR0IF indicates that...',
				optionsEs: [
					'El timer desbordo (overflow)',
					'UART recibio un byte',
					'ADC termino conversion',
					'USB esta conectado',
				],
				optionsEn: [
					'The timer overflowed',
					'UART received a byte',
					'ADC finished conversion',
					'USB is connected',
				],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'El prescaler del Timer0 se configura en...',
				questionEn: 'Timer0 prescaler is configured in...',
				optionsEs: ['T0CON', 'TXSTA', 'ADCON2', 'CCP1CON'],
				optionsEn: ['T0CON', 'TXSTA', 'ADCON2', 'CCP1CON'],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'interrupciones',
		titleEs: 'Interrupciones',
		titleEn: 'Interrupts',
		sourceDoc: 'Clase Tema 6. Interrupciones.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'GIE en INTCON habilita...',
				questionEn: 'GIE in INTCON enables...',
				optionsEs: [
					'Solo interrupciones de alta prioridad',
					'Interrupciones globales',
					'El modulo USB',
					'El convertidor AD unicamente',
				],
				optionsEn: [
					'Only high-priority interrupts',
					'Global interrupts',
					'The USB module',
					'Only the ADC',
				],
				correctIndex: 1,
			},
			{
				id: 'q2',
				questionEs: 'Antes de salir de una ISR debes...',
				questionEn: 'Before leaving an ISR you must...',
				optionsEs: [
					'Apagar GIE permanentemente',
					'Limpiar la bandera que causo la interrupcion',
					'Borrar todo el programa Flash',
					'Desconectar el cristal',
				],
				optionsEn: [
					'Turn off GIE permanently',
					'Clear the flag that caused the interrupt',
					'Erase all Flash program',
					'Disconnect the crystal',
				],
				correctIndex: 1,
			},
		],
	},
	{
		slug: 'adc',
		titleEs: 'Convertidor A/D',
		titleEn: 'A/D converter',
		sourceDoc: 'Tema 9. CAD.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'La resolucion del ADC del PIC18F4550 es de...',
				questionEn: 'The PIC18F4550 ADC resolution is...',
				optionsEs: ['8 bits', '10 bits', '12 bits', '16 bits'],
				optionsEn: ['8 bits', '10 bits', '12 bits', '16 bits'],
				correctIndex: 1,
			},
			{
				id: 'q2',
				questionEs: 'ADCON0 selecciona principalmente...',
				questionEn: 'ADCON0 mainly selects...',
				optionsEs: [
					'Canal analogico y encendido del ADC',
					'Baudios de UART',
					'Modo PWM',
					'Direccion I2C esclavo',
				],
				optionsEn: [
					'Analog channel and ADC on/off',
					'UART baud rate',
					'PWM mode',
					'I2C slave address',
				],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'pwm',
		titleEs: 'PWM y modulo CCP',
		titleEn: 'PWM and CCP module',
		sourceDoc: 'Clase Tema 9. Modulo CCP (PWM).pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'El PWM del PIC18F4550 usa principalmente...',
				questionEn: 'PIC18F4550 PWM mainly uses...',
				optionsEs: ['Timer0', 'Timer1', 'Timer2 y PR2', 'Timer3 solamente'],
				optionsEn: ['Timer0', 'Timer1', 'Timer2 and PR2', 'Timer3 only'],
				correctIndex: 2,
			},
			{
				id: 'q2',
				questionEs: 'El pin tipico de salida PWM1 en PIC18F4550 es...',
				questionEn: 'The typical PWM1 output pin on PIC18F4550 is...',
				optionsEs: ['RB0', 'RC2/CCP1', 'RD0', 'RA3'],
				optionsEn: ['RB0', 'RC2/CCP1', 'RD0', 'RA3'],
				correctIndex: 1,
			},
		],
	},
	{
		slug: 'comunicacion/uart',
		titleEs: 'UART / EUSART',
		titleEn: 'UART / EUSART',
		sourceDoc: 'Tema 10. Comunicación serial.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'En modo asincrono, TXSTA debe tener SYNC en...',
				questionEn: 'In async mode, TXSTA must have SYNC set to...',
				optionsEs: ['1 (sincrono)', '0 (asincrono)', 'No importa', 'Z (alta impedancia)'],
				optionsEn: ['1 (sync)', '0 (async)', 'Does not matter', 'Z (high-Z)'],
				correctIndex: 1,
			},
			{
				id: 'q2',
				questionEs: 'Los pines seriales por defecto del PIC18F4550 son...',
				questionEn: 'The default serial pins on PIC18F4550 are...',
				optionsEs: ['RA0 y RA1', 'RC6 (TX) y RC7 (RX)', 'RB4 y RB5', 'RD6 y RD7'],
				optionsEn: ['RA0 and RA1', 'RC6 (TX) and RC7 (RX)', 'RB4 and RB5', 'RD6 and RD7'],
				correctIndex: 1,
			},
		],
	},
	{
		slug: 'introduccion/comparaciones',
		titleEs: 'PIC vs Arduino, ESP32 y Raspberry Pi',
		titleEn: 'PIC vs Arduino, ESP32 and Raspberry Pi',
		sourceDoc: 'Tema 1. Conceptos Básicos (1).pdf',
		questions: [
			{
				id: 'q1',
				questionEs: '¿La Raspberry Pi es un microcontrolador como el PIC18F4550?',
				questionEn: 'Is Raspberry Pi a microcontroller like the PIC18F4550?',
				optionsEs: ['Si, ambos son 8 bits', 'No, es un microprocesador con sistema operativo', 'Si, pero solo en modo sleep', 'No, es solo un sensor'],
				optionsEn: ['Yes, both are 8-bit', 'No, it is a microprocessor with an OS', 'Yes, but only in sleep mode', 'No, it is only a sensor'],
				correctIndex: 1,
				explanationEs: 'Raspberry Pi ejecuta Linux; el PIC ejecuta tu firmware directamente.',
				explanationEn: 'Raspberry Pi runs Linux; the PIC runs your firmware directly.',
			},
			{
				id: 'q2',
				questionEs: '¿Por que estudiar PIC18F4550 en un curso de microcontroladores?',
				questionEn: 'Why study PIC18F4550 in a microcontrollers course?',
				optionsEs: [
					'Porque tiene Wi-Fi integrado',
					'Porque obliga a entender registros, bits e instrucciones de bajo nivel',
					'Porque no necesita cristal',
					'Porque solo se programa en Python',
				],
				optionsEn: [
					'Because it has built-in Wi-Fi',
					'Because it forces understanding registers, bits and low-level instructions',
					'Because it needs no crystal',
					'Because it is only programmed in Python',
				],
				correctIndex: 1,
			},
			{
				id: 'q3',
				questionEs: 'Arduino UNO y PIC18F4550 comparten que ambos...',
				questionEn: 'Arduino UNO and PIC18F4550 share that both...',
				optionsEs: [
					'Son placas con microcontrolador embebido',
					'Ejecutan Windows',
					'Tienen 32 bits y Linux',
					'No usan GPIO',
				],
				optionsEn: [
					'Are boards with an embedded microcontroller',
					'Run Windows',
					'Are 32-bit with Linux',
					'Do not use GPIO',
				],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'timers/timer1-timer2',
		titleEs: 'Timer 1 y Timer 2',
		titleEn: 'Timer 1 and Timer 2',
		sourceDoc: 'Clase Tema 8. Timer.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: '¿Cual timer usa el modulo PWM del CCP?',
				questionEn: 'Which timer does the CCP PWM module use?',
				optionsEs: ['Timer0', 'Timer1', 'Timer2', 'Timer3 exclusivamente'],
				optionsEn: ['Timer0', 'Timer1', 'Timer2', 'Timer3 only'],
				correctIndex: 2,
			},
			{
				id: 'q2',
				questionEs: 'Timer1 es de...',
				questionEn: 'Timer1 is...',
				optionsEs: ['8 bits con PR2', '16 bits, usado en captura y comparacion CCP', 'Solo para USB', 'Solo lectura'],
				optionsEn: ['8 bits with PR2', '16 bits, used in CCP capture and compare', 'USB only', 'Read-only'],
				correctIndex: 1,
			},
			{
				id: 'q3',
				questionEs: 'El periodo PWM depende principalmente de...',
				questionEn: 'PWM period mainly depends on...',
				optionsEs: ['PR2 y pre-escalador de Timer2', 'ADRESH', 'SPBRG', 'EEPROM'],
				optionsEn: ['PR2 and Timer2 prescaler', 'ADRESH', 'SPBRG', 'EEPROM'],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'fundamentos/ensamblador',
		titleEs: 'Ensamblador MPASM',
		titleEn: 'MPASM assembly',
		sourceDoc: 'instrucciones pic.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'MOVLW k carga un valor en...',
				questionEn: 'MOVLW k loads a value into...',
				optionsEs: ['PORTB', 'WREG', 'PC', 'Stack'],
				optionsEn: ['PORTB', 'WREG', 'PC', 'Stack'],
				correctIndex: 1,
			},
			{
				id: 'q2',
				questionEs: 'La directiva ORG 0x0000 indica...',
				questionEn: 'The ORG 0x0000 directive indicates...',
				optionsEs: [
					'Donde empieza el codigo en memoria de programa',
					'El baud rate de UART',
					'El canal ADC activo',
					'La frecuencia del cristal',
				],
				optionsEn: [
					'Where code starts in program memory',
					'UART baud rate',
					'Active ADC channel',
					'Crystal frequency',
				],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'fundamentos/config-bits',
		titleEs: 'Configuration bits',
		titleEn: 'Configuration bits',
		sourceDoc: 'PIC18LF4455-I-PT.PDF',
		questions: [
			{
				id: 'q1',
				questionEs: 'CONFIG WDT = OFF desactiva...',
				questionEn: 'CONFIG WDT = OFF disables...',
				optionsEs: ['El watchdog timer', 'UART', 'ADC', 'Timer2'],
				optionsEn: ['The watchdog timer', 'UART', 'ADC', 'Timer2'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'FOSC = HS selecciona oscilador...',
				questionEn: 'FOSC = HS selects...',
				optionsEs: ['RC interno', 'Cristal de alta velocidad', 'Solo USB', 'Modo sleep permanente'],
				optionsEn: ['Internal RC', 'High-speed crystal', 'USB only', 'Permanent sleep'],
				correctIndex: 1,
			},
		],
	},
	{
		slug: 'fundamentos/mplab-proteus',
		titleEs: 'MPLAB y Proteus',
		titleEn: 'MPLAB and Proteus',
		questions: [
			{
				id: 'q1',
				questionEs: 'En el flujo del curso, Proteus se usa principalmente para...',
				questionEn: 'In the course workflow, Proteus is mainly used to...',
				optionsEs: [
					'Simular el circuito antes de la placa fisica',
					'Compilar C++ para Linux',
					'Grabar solo EEPROM',
					'Configurar Wi-Fi del ESP32',
				],
				optionsEn: [
					'Simulate the circuit before the physical board',
					'Compile C++ for Linux',
					'Burn EEPROM only',
					'Configure ESP32 Wi-Fi',
				],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'MPASM genera un archivo...',
				questionEn: 'MPASM produces a...',
				optionsEs: ['.hex para programar el PIC', '.pdf del informe', '.exe de Windows', '.json de config'],
				optionsEn: ['.hex to program the PIC', '.pdf report', '.exe for Windows', '.json config'],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'gpio/botones',
		titleEs: 'Botones y entradas digitales',
		titleEn: 'Buttons and digital inputs',
		questions: [
			{
				id: 'q1',
				questionEs: 'Para leer un pulsador sin rebotes logicos conviene...',
				questionEn: 'To read a button without bounce issues you should...',
				optionsEs: [
					'Usar pull-up o pull-down y antirrebote por software o hardware',
					'Dejar el pin flotante',
					'Configurar TRIS como salida',
					'Deshabilitar GIE siempre',
				],
				optionsEn: [
					'Use pull-up or pull-down and debounce in software or hardware',
					'Leave the pin floating',
					'Set TRIS as output',
					'Always disable GIE',
				],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'Si un pin esta en TRIS=1, funciona como...',
				questionEn: 'If a pin has TRIS=1, it acts as...',
				optionsEs: ['Salida', 'Entrada', 'PWM automatico', 'Reset'],
				optionsEn: ['Output', 'Input', 'Automatic PWM', 'Reset'],
				correctIndex: 1,
			},
		],
	},
	{
		slug: 'comunicacion/lcd-teclado',
		titleEs: 'LCD y teclado matricial',
		titleEn: 'LCD and matrix keyboard',
		sourceDoc: 'Clase Tema 7.1 Modulo LCD y 7.2 Teclado.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'En LCD HD44780, RS=0 significa...',
				questionEn: 'On HD44780 LCD, RS=0 means...',
				optionsEs: ['Enviar comando', 'Enviar dato de caracter', 'Apagar contraste', 'Modo SPI'],
				optionsEn: ['Send command', 'Send character data', 'Turn off contrast', 'SPI mode'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'En Practica 2, las interrupciones del teclado usan...',
				questionEn: 'In Practice 2, keyboard interrupts use...',
				optionsEs: ['RB4-RB7 (PORTB change)', 'RC6-RC7 UART', 'INT0 solo', 'ADC GO/DONE'],
				optionsEn: ['RB4-RB7 (PORTB change)', 'RC6-RC7 UART', 'INT0 only', 'ADC GO/DONE'],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'comunicacion/spi-i2c',
		titleEs: 'SPI e I2C',
		titleEn: 'SPI and I2C',
		sourceDoc: 'PIC18LF4455-I-PT.PDF',
		questions: [
			{
				id: 'q1',
				questionEs: 'I2C usa tipicamente cuantos hilos de datos?',
				questionEn: 'I2C typically uses how many data wires?',
				optionsEs: ['1 (SDA) mas SCL', '8 mas clock', 'Solo TX', '4 como LCD'],
				optionsEn: ['1 (SDA) plus SCL', '8 plus clock', 'TX only', '4 like LCD'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'El modulo MSSP del PIC18 puede usarse para...',
				questionEn: 'The PIC18 MSSP module can be used for...',
				optionsEs: ['SPI e I2C', 'Solo PWM', 'Solo ADC', 'Solo USB host'],
				optionsEn: ['SPI and I2C', 'PWM only', 'ADC only', 'USB host only'],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'comunicacion/usb',
		titleEs: 'USB en PIC18F4550',
		titleEn: 'USB on PIC18F4550',
		questions: [
			{
				id: 'q1',
				questionEs: 'El PIC18F4550 integra periferico...',
				questionEn: 'The PIC18F4550 integrates...',
				optionsEs: ['USB full-speed device', 'Ethernet Gigabit', 'Wi-Fi 6', 'Bluetooth LE nativo'],
				optionsEn: ['USB full-speed device', 'Gigabit Ethernet', 'Wi-Fi 6', 'Native Bluetooth LE'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'Para Practica 8 del curso, la comunicacion con PC suele ser por...',
				questionEn: 'For course Practice 8, PC communication is usually via...',
				optionsEs: ['UART/EUSART (serial)', 'Solo USB HID sin firmware', 'I2C al monitor', 'SPI al teclado'],
				optionsEn: ['UART/EUSART (serial)', 'USB HID only without firmware', 'I2C to monitor', 'SPI to keyboard'],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'practicas/teclado-lcd',
		titleEs: 'Practica 2 — Teclado y LCD',
		titleEn: 'Practice 2 — Keyboard and LCD',
		sourceDoc: 'Practica 2  Teclado y  LCD.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'El bus de datos del LCD en Practica 2 usa...',
				questionEn: 'LCD data bus in Practice 2 uses...',
				optionsEs: ['Modo 4 bit en RD4-RD7', 'Modo 8 bit en RA0-RA7', 'SPI en RC3', 'Solo I2C'],
				optionsEn: ['4-bit mode on RD4-RD7', '8-bit mode on RA0-RA7', 'SPI on RC3', 'I2C only'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'Las filas del teclado 4x4 van a...',
				questionEn: '4x4 keyboard rows connect to...',
				optionsEs: ['RB0-RB3', 'RC6-RC7', 'RD0-RD3', 'RE0-RE3'],
				optionsEn: ['RB0-RB3', 'RC6-RC7', 'RD0-RD3', 'RE0-RE3'],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'practicas/frecuencimetro',
		titleEs: 'Practica 3 — Frecuencimetro',
		titleEn: 'Practice 3 — Frequency meter',
		sourceDoc: 'Practica 3  Frecuencimetro con  Displays Multiplexado.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'Un frecuencimetro mide frecuencia como...',
				questionEn: 'A frequency meter measures frequency as...',
				optionsEs: ['Conteo de pulsos / tiempo', 'Solo voltaje ADC', 'Temperatura en °C', 'Baudios UART'],
				optionsEn: ['Pulse count / time', 'ADC voltage only', 'Temperature in °C', 'UART baud'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'Display multiplexado significa...',
				questionEn: 'Multiplexed display means...',
				optionsEs: [
					'Encender un digito a la vez muy rapido (persistencia visual)',
					'Un solo LED siempre encendido',
					'Solo usar LCD texto',
					'Apagar Timer0',
				],
				optionsEn: [
					'Turn on one digit at a time quickly (persistence of vision)',
					'One LED always on',
					'Text LCD only',
					'Turn off Timer0',
				],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'practicas/motor-paso-a-paso',
		titleEs: 'Practica 6 — Motor paso a paso',
		titleEn: 'Practice 6 — Stepper motor',
		sourceDoc: 'Practica 6 Motor Paso a Paso.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'Un motor paso a paso gira en incrementos...',
				questionEn: 'A stepper motor rotates in...',
				optionsEs: ['Discretos (pasos)', 'Solo continuo sin control', 'Solo por UART', 'Solo con ADC'],
				optionsEn: ['Discrete steps', 'Continuous only without control', 'UART only', 'ADC only'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'El driver ULN2003 se usa para...',
				questionEn: 'The ULN2003 driver is used to...',
				optionsEs: [
					'Amplificar corriente de las bobinas del motor',
					'Convertir analogico a digital',
					'Calcular baudios',
					'Leer teclado matricial',
				],
				optionsEn: [
					'Amplify coil current for the motor',
					'Convert analog to digital',
					'Calculate baud rate',
					'Read matrix keyboard',
				],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'practicas/convertidor-ad',
		titleEs: 'Practica 7 — Convertidor AD',
		titleEn: 'Practice 7 — A/D converter lab',
		sourceDoc: 'Practica 7 Convertidor AD.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'Con cristal 20 MHz, ADCS en ADCON2 suele ser...',
				questionEn: 'With 20 MHz crystal, ADCS in ADCON2 is usually...',
				optionsEs: ['101 (16 Tosc)', '000 (2 Tosc)', '111 (solo RC)', 'No se configura'],
				optionsEn: ['101 (16 Tosc)', '000 (2 Tosc)', '111 (RC only)', 'Not configured'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'GO/DONE en ADCON0 indica...',
				questionEn: 'GO/DONE in ADCON0 indicates...',
				optionsEs: [
					'Conversion en progreso (1) o terminada (0)',
					'Estado del motor',
					'Baud rate listo',
					'LCD inicializado',
				],
				optionsEn: [
					'Conversion in progress (1) or done (0)',
					'Motor status',
					'Baud ready',
					'LCD initialized',
				],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'practicas/comunicacion-serial',
		titleEs: 'Practica 8 — Comunicacion serial',
		titleEn: 'Practice 8 — Serial communication',
		sourceDoc: 'Practica 8  Comunicacion serial_M3.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'SPBRG se calcula a partir de...',
				questionEn: 'SPBRG is calculated from...',
				optionsEs: ['Fosc y baudios deseados', 'Solo PR2', 'ADRESH', 'EEPROM'],
				optionsEn: ['Fosc and target baud rate', 'PR2 only', 'ADRESH', 'EEPROM'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'MAX232 en el diagrama de Practica 8 sirve para...',
				questionEn: 'MAX232 in Practice 8 schematic is used to...',
				optionsEs: [
					'Niveles RS-232 entre PIC y PC',
					'PWM del motor',
					'Multiplexar displays',
					'Configurar ADC',
				],
				optionsEn: [
					'RS-232 levels between PIC and PC',
					'Motor PWM',
					'Multiplex displays',
					'Configure ADC',
				],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'parcial/parcial-1',
		titleEs: 'Parcial I — Temas 1, 2 y 3',
		titleEn: 'Partial I — Topics 1, 2, and 3',
		sourceDoc: 'Tema 1. Conceptos Básicos (1).pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'La arquitectura Harvard del PIC18 separa...',
				questionEn: 'PIC18 Harvard architecture separates...',
				optionsEs: [
					'Programa y datos en buses distintos',
					'Solo la EEPROM del resto',
					'UART de SPI',
					'Timer0 de Timer1 unicamente',
				],
				optionsEn: [
					'Program and data on separate buses',
					'Only EEPROM from the rest',
					'UART from SPI',
					'Only Timer0 from Timer1',
				],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'El registro BSR sirve para...',
				questionEn: 'The BSR register is used to...',
				optionsEs: [
					'Seleccionar el banco de memoria',
					'Guardar el resultado de multiplicacion',
					'Configurar baud rate UART',
					'Leer el ADC directamente',
				],
				optionsEn: [
					'Select the memory bank',
					'Store multiplication result',
					'Configure UART baud rate',
					'Read the ADC directly',
				],
				correctIndex: 0,
			},
			{
				id: 'q3',
				questionEs: 'WREG es el registro de trabajo usado para...',
				questionEn: 'WREG is the working register used for...',
				optionsEs: [
					'Operandos de muchas instrucciones ALU',
					'Almacenar el programa completo',
					'Seleccionar el cristal',
					'Apagar todas las interrupciones',
				],
				optionsEn: [
					'Operands of many ALU instructions',
					'Store the full program',
					'Select the crystal',
					'Disable all interrupts',
				],
				correctIndex: 0,
			},
			{
				id: 'q4',
				questionEs: '0xF0 en binario es:',
				questionEn: '0xF0 in binary is:',
				optionsEs: ['11110000', '00001111', '11111111', '00010000'],
				optionsEn: ['11110000', '00001111', '11111111', '00010000'],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'parcial/parcial-2',
		titleEs: 'Parcial II — Temas 4 y 5',
		titleEn: 'Partial II — Topics 4 and 5',
		sourceDoc: 'Practica 1  Operacion matematia.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'TRISB = 0xFF significa que el puerto B es...',
				questionEn: 'TRISB = 0xFF means port B is...',
				optionsEs: ['Todo entradas', 'Todo salidas', 'Solo analogico', 'Deshabilitado'],
				optionsEn: ['All inputs', 'All outputs', 'Analog only', 'Disabled'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'Para escribir una salida estable en un pin debes usar preferentemente...',
				questionEn: 'To write a stable output on a pin you should preferably use...',
				optionsEs: ['LATx', 'Solo leer PORTx', 'ADRESH', 'EECON1'],
				optionsEn: ['LATx', 'Only read PORTx', 'ADRESH', 'EECON1'],
				correctIndex: 0,
			},
			{
				id: 'q3',
				questionEs: 'Un boton a tierra con pull-up lee alto cuando...',
				questionEn: 'A ground-connected button with pull-up reads high when...',
				optionsEs: ['No esta presionado', 'Esta presionado', 'El ADC esta activo', 'GIE = 0'],
				optionsEn: ['Not pressed', 'Pressed', 'ADC is active', 'GIE = 0'],
				correctIndex: 0,
			},
			{
				id: 'q4',
				questionEs: 'El flujo tipico de desarrollo es...',
				questionEn: 'The typical development flow is...',
				optionsEs: [
					'.asm → MPASM → .hex → programador',
					'.hex → .asm → UART → EEPROM',
					'Proteus → solo RAM → sin CONFIG',
					'ADC → TRIS → sin compilar',
				],
				optionsEn: [
					'.asm → MPASM → .hex → programmer',
					'.hex → .asm → UART → EEPROM',
					'Proteus → RAM only → no CONFIG',
					'ADC → TRIS → no compile',
				],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'parcial/parcial-3',
		titleEs: 'Parcial III — Temas 6, 7, 8 y 9 PWM',
		titleEn: 'Partial III — Topics 6, 7, 8, and 9 PWM',
		sourceDoc: 'Clase Tema 8. Timer.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'Antes de RETFIE en una ISR debes...',
				questionEn: 'Before RETFIE in an ISR you must...',
				optionsEs: [
					'Limpiar la bandera de interrupcion atendida',
					'Deshabilitar el cristal',
					'Borrar toda la Flash',
					'Poner TRIS en 0x00 siempre',
				],
				optionsEn: [
					'Clear the handled interrupt flag',
					'Disable the crystal',
					'Erase all Flash',
					'Always set TRIS to 0x00',
				],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'Timer2 en modo PWM usa principalmente...',
				questionEn: 'Timer2 in PWM mode mainly uses...',
				optionsEs: ['PR2 y CCPR1L', 'SPBRG', 'ADCON1', 'EECON1'],
				optionsEn: ['PR2 and CCPR1L', 'SPBRG', 'ADCON1', 'EECON1'],
				correctIndex: 0,
			},
			{
				id: 'q3',
				questionEs: 'El LCD HD44780 en modo 4 bits usa...',
				questionEn: 'HD44780 LCD in 4-bit mode uses...',
				optionsEs: [
					'Nibble alto y bajo en dos escrituras',
					'Solo SPI hardware',
					'Un canal ADC',
					'RETFIE automatico',
				],
				optionsEn: [
					'High and low nibble in two writes',
					'Hardware SPI only',
					'One ADC channel',
					'Automatic RETFIE',
				],
				correctIndex: 0,
			},
			{
				id: 'q4',
				questionEs: 'Con Fosc = 20 MHz, un ciclo de instruccion dura...',
				questionEn: 'With Fosc = 20 MHz, one instruction cycle lasts...',
				optionsEs: ['200 ns', '1 us', '20 ms', '1 s'],
				optionsEn: ['200 ns', '1 us', '20 ms', '1 s'],
				correctIndex: 0,
				explanationEs: 'Tcy = 4/Fosc = 4/20MHz = 200 ns.',
				explanationEn: 'Tcy = 4/Fosc = 4/20MHz = 200 ns.',
			},
		],
	},
	{
		slug: 'parcial/parcial-4',
		titleEs: 'Parcial IV — ADC, serial y cierre',
		titleEn: 'Partial IV — ADC, serial, and wrap-up',
		sourceDoc: 'Tema 10. Comunicación serial.pdf',
		questions: [
			{
				id: 'q1',
				questionEs: 'Antes de usar un pin como analogico debes configurar...',
				questionEn: 'Before using a pin as analog you must configure...',
				optionsEs: ['ADCON1 (PCFG)', 'Solo CCP1CON', 'USBCON', 'TBLPTR'],
				optionsEn: ['ADCON1 (PCFG)', 'CCP1CON only', 'USBCON', 'TBLPTR'],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'SPBRG en UART depende de...',
				questionEn: 'SPBRG in UART depends on...',
				optionsEs: ['Fosc y baud rate deseado', 'Solo PR2', 'Solo el teclado', 'EEPROM'],
				optionsEn: ['Fosc and target baud rate', 'PR2 only', 'Keyboard only', 'EEPROM'],
				correctIndex: 0,
			},
			{
				id: 'q3',
				questionEs: 'El resultado de conversion ADC de 10 bits se lee en...',
				questionEn: 'The 10-bit ADC conversion result is read in...',
				optionsEs: ['ADRESH y ADRESL', 'TXREG', 'RCREG', 'PORTA solo'],
				optionsEn: ['ADRESH and ADRESL', 'TXREG', 'RCREG', 'PORTA only'],
				correctIndex: 0,
			},
			{
				id: 'q4',
				questionEs: 'MAX232 en Practica 8 adapta niveles entre...',
				questionEn: 'MAX232 in Practice 8 adapts levels between...',
				optionsEs: ['PIC (TTL) y PC (RS-232)', 'Motor y LCD', 'ADC y PWM', 'USB y I2C'],
				optionsEn: ['PIC (TTL) and PC (RS-232)', 'Motor and LCD', 'ADC and PWM', 'USB and I2C'],
				correctIndex: 0,
			},
		],
	},
	{
		slug: 'practicas/primer-led',
		titleEs: 'Practica — Primer LED',
		titleEn: 'Practice — First LED',
		questions: [
			{
				id: 'q1',
				questionEs: 'Para encender un LED en un pin del PIC primero debes...',
				questionEn: 'To turn on an LED on a PIC pin you must first...',
				optionsEs: [
					'Configurar TRIS como salida y escribir en LAT/PORT',
					'Solo leer PORT sin TRIS',
					'Activar ADC en ese pin',
					'Deshabilitar el cristal',
				],
				optionsEn: [
					'Set TRIS as output and write to LAT/PORT',
					'Only read PORT without TRIS',
					'Enable ADC on that pin',
					'Disable the crystal',
				],
				correctIndex: 0,
			},
			{
				id: 'q2',
				questionEs: 'La resistencia en serie con el LED sirve para...',
				questionEn: 'The resistor in series with the LED is used to...',
				optionsEs: ['Limitar corriente', 'Aumentar voltaje a 12V', 'Habilitar UART', 'Leer teclado'],
				optionsEn: ['Limit current', 'Increase voltage to 12V', 'Enable UART', 'Read keyboard'],
				correctIndex: 0,
			},
		],
	},
];

export function getQuizBySlug(slug: string): PageQuiz | undefined {
	const normalized = slug.replace(/^\/+|\/+$/g, '').replace(/^en\//, '');
	return pageQuizzes.find((q) => q.slug === normalized);
}

export function getAllQuizSlugs(): string[] {
	return pageQuizzes.map((q) => q.slug);
}

/** Mapea href de leccion (/gpio/, /en/timers/timer0/) al slug del quiz */
export function hrefToQuizSlug(href: string): string | undefined {
	const normalized = href.replace(/^\/+|\/+$/g, '').replace(/^en\//, '');
	return pageQuizzes.find((q) => q.slug === normalized)?.slug;
}
