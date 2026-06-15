#!/usr/bin/env python3
"""Generate remaining AprendePIC18 content files."""
import os

BASE = os.path.join(os.path.dirname(__file__), "..", "src", "content", "docs")
BASE = os.path.abspath(BASE)


def write(path: str, content: str) -> None:
    full = os.path.join(BASE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Wrote {path}")


# Spanish modules
write("gpio/index.mdx", """
---
title: GPIO - TRIS, PORT y LAT
description: Puertos digitales del PIC18F4550, entradas, salidas y configuracion de pines.
---

import AIExplain from '../../../components/AIExplain.astro';
import PracticeBox from '../../../components/PracticeBox.astro';

Los puertos GPIO permiten leer sensores, botones y controlar LEDs, displays y actuadores. En el PIC18F4550 cada puerto tiene tres registros clave.

<AIExplain title="Trio fundamental">
`TRISx` configura direccion. `LATx` escribe salidas. `PORTx` lee el estado de los pines.
</AIExplain>

## Registros por puerto

| Puerto | Pines | TRIS | PORT | LAT | Notas |
| --- | --- | --- | --- | --- | --- |
| A | RA0-RA5 | TRISA | PORTA | LATA | RA4 no es analogico |
| B | RB0-RB7 | TRISB | PORTB | LATB | RB0=INT0, RB4-RB7 interrupciones |
| C | RC0-RC7 | TRISC | PORTC | LATC | RC6/RC7 = UART |
| D | RD0-RD7 | TRISD | PORTD | LATD | Usado en practicas LCD |
| E | RE0-RE2 | TRISE | PORTE | LATE | Entradas analogicas |

## Configurar salida

```asm
        CLRF    LATB
        BCF     TRISB, 0    ; RB0 salida
        BSF     LATB, 0     ; RB0 alto
```

## Configurar entrada

```asm
        BSF     TRISB, 3    ; RB3 entrada
        BTFSS   PORTB, 3    ; Lee RB3
        GOTO    pin_bajo
```

<PracticeBox title="Practica 1 UNEXPO" level="Laboratorio">
Puerto B y D como operandos (switches), puerto C y E para LEDs de resultado, RA0 como pulsador para cambiar operacion. Implementa suma, resta, multiplicacion, OR, AND, XOR, complemento, rotacion y division por software.
</PracticeBox>

## Errores comunes

- Escribir en PORTx en lugar de LATx para salidas.
- No configurar ADCON1 cuando usas pines analogicos como digitales.
- Olvidar resistencias limitadoras en LEDs (330 o 220 ohm).
""")

write("gpio/botones.mdx", """
---
title: Botones, pull-up y antirrebote
description: Entradas digitales, resistencias pull-up y tecnicas de antirrebote en PIC18F4550.
---

import AIExplain from '../../../components/AIExplain.astro';
import Exercise from '../../../components/Exercise.astro';

Un boton conectado a tierra necesita pull-up para que el pin lea alto cuando no se presiona. En laboratorio se usan resistencias de 10 kΩ.

<AIExplain title="Lectura estable">
El contacto mecanico rebota al presionar. Sin antirrebote puedes leer multiples pulsaciones. Soluciones: retardo por software, timer o interrupciones.
</AIExplain>

## Conexion tipica

- Pin del PIC como entrada (`TRIS = 1`)
- Resistencia pull-up a VDD
- Boton entre pin y GND (activo en bajo)

## Antirrebote por software

```asm
espera_suelta:
        BTFSC   PORTB, 0
        GOTO    espera_suelta
        CALL    retardo_20ms
        BTFSC   PORTB, 0
        GOTO    espera_suelta
        ; Flanco valido detectado
```

## Con interrupciones

Para teclado matricial (Practica 2) se usan interrupciones RB4-RB7 al detectar cambio en columnas. Esto libera la CPU del polling constante.

<Exercise title="Explica por que RB7 se usa como pulsador en el ejercicio de control de nivel">
En la guia de ejercicios del II parcial, RB7 es el boton de inicio. Debe configurarse como entrada y leerse con `BTFSS PORTB, 7` o mediante interrupcion externa segun el diseno.
</Exercise>
""")

write("timers/timer0.mdx", """
---
title: Timer 0
description: Configuracion, formula de tiempo y ejemplos del Timer0 en PIC18F4550.
---

import AIExplain from '../../../components/AIExplain.astro';
import Exercise from '../../../components/Exercise.astro';

Timer0 puede funcionar como temporizador (reloj interno Fosc/4) o contador (pulsos externos en RA4/T0CKI).

<AIExplain title="Formula del curso">
`Tiempo = (4/Fosc) * N * Pre-divisor` donde N = 256-TMR0L (8 bit) o N = 65536-TMR0H:TMR0L (16 bit).
</AIExplain>

## Registro T0CON

| Bit | Nombre | Funcion |
| --- | --- | --- |
| 7 | TMR0ON | 1 = Timer activo |
| 6 | T08BIT | 1 = modo 8 bit |
| 5 | T0CS | 0 = interno, 1 = externo |
| 4 | T0SE | Flanco activo externo |
| 3 | PSA | 0 = pre-escalador al Timer0 |
| 2-0 | PS2:PS0 | Pre-divisor 1:2 a 1:256 |

## Ejemplo: 2 segundos con cristal 20 MHz

Con 16 bit y pre-divisor 1:256, TMR0H:TMR0L = 26474 (0x676A).

```asm
CONFIGURAR_TIMER_0:
        MOVLW   B'00000111'
        MOVWF   T0CON
        MOVLW   B'01100111'
        MOVWF   TMR0H
        MOVLW   B'01101010'
        MOVWF   TMR0L
        RETURN

RETARDO_TMR0_2S:
        BCF     INTCON, TMR0IF
        BSF     T0CON, TMR0ON
ESPERA:
        BTFSS   INTCON, TMR0IF
        GOTO    ESPERA
        BCF     T0CON, TMR0ON
        RETURN
```

<Exercise title="Calcula el tiempo maximo en 8 bit con Fosc=20MHz y pre-divisor 1:256">
Tiempo = (4/20MHz) * 256 * 256 = 13,1072 ms segun el Tema 8 del el curso de Microcontroladores (UNEXPO).
</Exercise>
""")

write("timers/timer1-timer2.mdx", """
---
title: Timer 1 y Timer 2
description: Temporizadores de 16 bit, CCP y PWM con Timer2 en PIC18F4550.
---

import AIExplain from '../../../components/AIExplain.astro';

## Timer 1

- 16 bit, registro T1CON
- Pre-escalador: 1, 2, 4, 8
- Formula: `Tiempo = (4/Fosc) * (65536-TMR1H:TMR1L) * Pre-divisor`
- Usado en modo Captura y Comparacion del CCP

## Timer 2

- 8 bit con registro de periodo PR2
- Pre-escalador: 1, 4, 16
- Post-escalador para interrupciones
- **Base del PWM** en modulo CCP

<AIExplain title="PWM usa Timer2">
El periodo PWM depende de PR2 y el pre-escalador del Timer2. El ciclo util se carga en CCPR1L y CCP1CON<5:4>.
</AIExplain>

## Registro T2CON (resumen)

| Bit | Funcion |
| --- | --- |
| TMR2ON | Habilita Timer2 |
| T2CKPS1:0 | Pre-escalador |
| TOUTPS3:0 | Post-escalador (interrupciones) |

## Timer 3

El PIC18F4550 tambien tiene Timer3 (similar a Timer1). Consulta el datasheet para aplicaciones avanzadas de captura.
""")

write("interrupciones/index.mdx", """
---
title: Interrupciones
description: ISR, vectores, INTCON, prioridades y fuentes de interrupcion del PIC18F4550.
---

import AIExplain from '../../../components/AIExplain.astro';
import Exercise from '../../../components/Exercise.astro';

Las interrupciones permiten atender eventos sin polling continuo. Son obligatorias en practicas como teclado matricial y altamente valoradas en el parcial.

<AIExplain title="Flujo de una ISR">
1. Detectar evento → 2. Guardar contexto → 3. Saltar al vector → 4. Ejecutar ISR → 5. Limpiar bandera → 6. RETFIE
</AIExplain>

## Vectores en PIC18F4550

```asm
        ORG     0x0000
        GOTO    INICIO
        ORG     0x0008
        GOTO    ATENDER_INTERRUPCIONES_H
        ORG     0x0018
        GOTO    ATENDER_INTERRUPCIONES_L
```

## Fuentes principales

1. **Externas:** INT0 (RB0), INT1 (RB1), INT2 (RB2)
2. **Puerto B:** RB4-RB7 (cambio de estado)
3. **Timers:** TMR0, TMR1, TMR2, TMR3 overflow
4. **CCP:** Captura, comparacion, PWM
5. **ADC:** ADIF al completar conversion
6. **Serial:** USART, SPI, I2C
7. **USB**

## Registros clave

- `INTCON.GIE` — habilitacion global
- `INTCON.PEIE` — interrupciones perifericas
- `PIE1/PIE2` — habilitar por periferico
- `PIR1/PIR2` — banderas de interrupcion

## ISR minima para Timer0

```asm
ATENDER_TIMER0:
        BCF     T0CON, TMR0ON
        BCF     INTCON, TMR0IF
        ; recargar TMR0H/TMR0L
        ; codigo de la tarea
        BSF     T0CON, TMR0ON
        RETFIE
```

<Exercise title="Por que se debe limpiar TMR0IF antes de salir de la ISR?">
Si no limpias la bandera, el PIC reentra inmediatamente a la interrupcion creyendo que el evento sigue pendiente.
</Exercise>
""")

write("adc/index.mdx", """
---
title: Convertidor Analogico-Digital (ADC)
description: ADC de 10 bits, 13 canales, ADCON y Practica 7 del curso UNEXPO.
---

import AIExplain from '../../../components/AIExplain.astro';
import PracticeBox from '../../../components/PracticeBox.astro';

El PIC18F4550 integra un ADC de **10 bits** con **13 canales** analogicos.

<AIExplain title="Voltaje digital">
Con Vref=5V y 10 bits, 1 LSB ≈ 4,88 mV. Resultado en ADRESH:ADRESL segun formato ADFM.
</AIExplain>

## Canales analogicos

| Puerto | Pines |
| --- | --- |
| A | RA0/AN0, RA1/AN1, RA2/AN2, RA3/AN3, RA5/AN4 |
| B | RB0/AN12, RB1/AN10, RB2/AN8, RB3/AN9, RB4/AN11 |
| E | RE0/AN5, RE1/AN6, RE2/AN7 |

**Nota:** RA4 no es analogico.

## Registros

- `ADCON0` — canal, GO/DONE, ADON
- `ADCON1` — configuracion digital/analogico (PCFG)
- `ADCON2` — reloj de conversion y formato (ADFM)
- `ADRESH`, `ADRESL` — resultado

## Pasos de conversion

1. Configurar entradas analogicas (`ADCON1`)
2. Configurar pines como entrada (`TRIS`)
3. Seleccionar canal y encender ADC (`ADCON0`)
4. Esperar tiempo de adquisicion (TACQ)
5. Iniciar conversion (`GO/DONE = 1`)
6. Esperar `GO/DONE = 0`
7. Leer `ADRESH:ADRESL`

```asm
CONFIGURAR_ADC:
        MOVLW   B'00001110'   ; AN0 analogico, resto digital
        MOVWF   ADCON1
        MOVLW   B'00000001'
        MOVWF   TRISA        ; RA0 entrada
        RETURN
```

<PracticeBox title="Practica 7 - Convertidor AD" level="Laboratorio">
Lee un potenciometro o sensor analogico, convierte el valor y muestralo en LCD o LEDs. Usa cristal 20 MHz: selecciona 16 Tosc en ADCS (101 en ADCON2).
</PracticeBox>
""")

write("pwm/index.mdx", """
---
title: PWM y modulo CCP
description: Modulacion por ancho de pulso, CCP1/CCP2 y control de motores en PIC18F4550.
---

import AIExplain from '../../../components/AIExplain.astro';
import Exercise from '../../../components/Exercise.astro';

El modulo CCP tiene tres modos: **Captura**, **Comparacion** y **PWM**. El mas usado es PWM para control de velocidad de motores y dimmer de LEDs.

<AIExplain title="Pines CCP">
CCP1 en RC2, CCP2 en RC1. PWM usa Timer2 como base de tiempo.
</AIExplain>

## Formulas (Tema 9 CCP)

**Periodo:**
`T_PWM = 4 * (PR2 + 1) * Tosc * Pre-escalador Timer2`

**Ciclo util (duty):**
`CCPR1L:CCP1CON<5:4> = (T_PWM * X%) / (Tosc * Pre-escalador)`

**Resolucion:**
`log2(Fosc / (F_PWM * Pre-escalador))`

## Configuracion PWM (5 pasos)

1. `BCF TRISC, 2` — RC2 salida
2. Cargar PR2 segun frecuencia deseada
3. Configurar T2CON (pre-escalador, TMR2ON)
4. Cargar CCPR1L y bits DC1B1:DC1B0
5. `CCP1CON = 0x0C` — modo PWM (bits CCP1M3:CCP1M0 = 11xx)

## Ejemplo: 5 kHz al 50% con 20 MHz

PR2 = 249. Para 50% duty, CCPR1L = 124.

<Exercise title="Calcula PR2 para F_PWM=5kHz, Fosc=20MHz, pre-escalador 1:4">
PR2 = 1/(5kHz) / (4 * 1/20MHz * 4) - 1 = 249 segun el ejemplo del el curso de Microcontroladores (UNEXPO).
</Exercise>
""")

# Communication modules
write("comunicacion/uart.mdx", """
---
title: UART / EUSART
description: Comunicacion serial asincrona, baudios y registros TXSTA, RCSTA en PIC18F4550.
---

import AIExplain from '../../../components/AIExplain.astro';

El PIC18F4550 incluye EUSART para comunicacion serial asincrona full-duplex.

<AIExplain title="Pines">
RC6/TX = transmision. RC7/RX = recepcion. Velocidad en baudios configurada con SPBRG y BAUDCON.
</AIExplain>

## Conceptos (Tema 10)

- **Baudios:** bits por segundo
- **Asincrono:** sin linea de reloj compartida; usa bit de inicio y parada
- **NRZ:** alto=1 (5V), bajo=0 (0V)

## Registros principales

| Registro | Funcion |
| --- | --- |
| TXSTA | Control transmision (TXEN, BRGH, SYNC) |
| RCSTA | Control recepcion (SPEN, CREN, RX9) |
| SPBRG / SPBRGH | Generador de baudios |
| BAUDCON | BRG16, deteccion auto-baud |
| TXREG | Dato a transmitir |
| RCREG | Dato recibido |

## Configuracion basica 9600 baudios @ 20MHz

```asm
; SPBRG = (Fosc/(16*baud)) - 1 para BRGH=1
; Aproximadamente SPBRG = 129 para 9600 baud
        BSF     RCSTA, SPEN
        BCF     TXSTA, SYNC
        BSF     TXSTA, BRGH
        MOVLW   D'129'
        MOVWF   SPBRG
        BSF     TXSTA, TXEN
        BSF     RCSTA, CREN
```

## Errores comunes

- No habilitar SPEN antes de usar los pines seriales.
- Olvidar limpiar FERR/OERR leyendo RCREG.
- Baudios incorrectos entre PC y PIC.
""")

write("comunicacion/spi-i2c.mdx", """
---
title: SPI e I2C (MSSP)
description: Modulo MSSP del PIC18F4550 para comunicacion sincrona SPI e I2C.
---

import AIExplain from '../../../components/AIExplain.astro';

El modulo **MSSP** (Master Synchronous Serial Port) soporta SPI e I2C.

## SPI (Serial Peripheral Interface)

- Maestro genera reloj (SCK)
- Lineas: SDO, SDI, SCK, SS (chip select)
- Full duplex, sincrono
- Usado con EEPROM seriales, displays, sensores

## I2C (Inter-Integrated Circuit)

- Dos lineas: SDA (dato), SCL (reloj)
- Modos: Master, Multi-Master, Slave
- Direccionamiento de dispositivos con 7 u 8 bits
- Usado con sensores, RTC, memorias

<AIExplain title="Diferencia clave">
SPI es mas rapido y simple (mas pines). I2C usa menos pines y permite multiples esclavos en el mismo bus.
</AIExplain>

## Registros MSSP

- `SSPCON1`, `SSPCON2` — control
- `SSPSTAT` — estado
- `SSPBUF` — buffer de datos
- `SSPADD` — direccion I2C (modo esclavo)

Consulta el Tema 10 y el datasheet para tablas de configuracion detalladas.
""")

write("comunicacion/usb.mdx", """
---
title: USB en PIC18F4550
description: Introduccion al modulo USB Full-Speed del PIC18F4550.
---

import AIExplain from '../../../components/AIExplain.astro';

El PIC18F4550 es conocido por integrar **USB 2.0 Full Speed** (12 Mbps), lo que lo diferencia de muchos PIC sin USB.

<AIExplain title="Aplicacion tipica">
Dispositivos HID (teclado, mouse emulado), CDC (puerto serial virtual) y almacenamiento masivo con stack USB de Microchip.
</AIExplain>

## Caracteristicas

- Transceptor integrado
- Buffers DMA internos
- Interrupciones USB dedicadas
- Requiere stack de firmware (USB Framework de Microchip)

## Consideraciones

- Config bits especificos para USB
- Oscilador preciso (cristal 20 MHz comun en el curso)
- Resistencias y capacitor en D+/D- segun datasheet
- Mas complejo que UART; tipicamente se usa C con MCC o ejemplos de Microchip

Para el parcial teorico basta con saber que el PIC18F4550 tiene modulo USB y puede generar interrupciones USB.
""")

write("comunicacion/lcd-teclado.mdx", """
---
title: LCD HD44780 y teclado matricial
description: Pantalla LCD 16x2, controlador HD44780 y teclado 4x4 con interrupciones RB4-RB7.
---

import AIExplain from '../../../components/AIExplain.astro';
import PracticeBox from '../../../components/PracticeBox.astro';

## LCD 16x2 con HD44780

| Pin | Funcion |
| --- | --- |
| VSS, VDD | Alimentacion |
| Vo | Contraste (potenciometro 10K) |
| RS | 0=comando, 1=dato |
| R/W | 0=escritura, 1=lectura |
| E | Enable (pulso) |
| D0-D7 | Bus de datos (4 u 8 bit) |

### Direcciones DDRAM (16x2)

- Linea 1: 0x80 - 0x8F (visible 16 chars)
- Linea 2: 0xC0 - 0xCF

### Comandos esenciales

- Clear Display: `0x01`
- Cursor Home: `0x02`
- Function Set 4-bit: `0x28`
- Display ON: `0x0C`

<PracticeBox title="Practica 2 UNEXPO" level="Laboratorio">
LCD: bus de datos en RD4-RD7 (4 bit), RS y E en RD2-RD3. Teclado: filas RB0-RB3, columnas RB4-RB7 con interrupciones. Muestra en LCD lo tecleado.
</PracticeBox>

## Teclado matricial 4x4

Escaneo por filas/columnas. Al presionar una tecla se conecta una fila con una columna. Las interrupciones RB4-RB7 detectan cambios en columnas sin polling continuo.

## Macros MPASM

La Practica 2 pide investigar macros: bloques reutilizables con `MACRO`/`ENDM` para simplificar rutinas LCD.
""")

# Lab practices
write("practicas/operaciones-matematicas.mdx", """
---
title: Practica 1 - Operaciones matematicas
description: Sistema minimo, puertos y operaciones ALU segun Practica 1 UNEXPO del curso de Microcontroladores UNEXPO (Ing. Mecatronica).
---

import PracticeBox from '../../../components/PracticeBox.astro';
import AIExplain from '../../../components/AIExplain.astro';

<PracticeBox title="Practica 1 de Laboratorio" level="UNEXPO">
Sistema minimo PIC18F4550. Operandos en puerto B y D (switches). Resultado en puerto C y E (LEDs). Pulsador RA0 cambia operacion.
</PracticeBox>

## Operaciones requeridas

- Suma, resta, multiplicacion
- Division por **software**
- OR, AND, XOR, complemento
- Rotar sin acarreo

<AIExplain title="Division por software">
No hay instruccion DIV nativa en PIC18. Implementa restas repetidas o algoritmo de restauracion en una rutina aparte.
</AIExplain>

## Herramientas

- MPLAB IDE 8.88
- PICkit 2 o 3
- Simulador (Proteus recomendado)
- Datasheet e instrucciones PIC18

## Evaluacion

- Informe pre-laboratorio
- Codigo .ASM estructurado con comentarios
- Funcionamiento en fisico
- Explicacion oral

## Post-laboratorio

1. Diferencia entre operacion por hardware y por software?
2. Por que no todo el puerto C puede ser salida? (RC6/RC7 son UART por defecto si no se configura)
""")

write("practicas/teclado-lcd.mdx", """
---
title: Practica 2 - Teclado y LCD
description: LCD 16x2 HD44780 y teclado matricial 4x4 con interrupciones RB4-RB7.
---

import PracticeBox from '../../../components/PracticeBox.astro';

<PracticeBox title="Practica 2 de Laboratorio" level="UNEXPO">
Gobernar LCD 16x2 y teclado matricial 4x4. Mostrar en pantalla los valores introducidos desde el teclado.
</PracticeBox>

## Conexiones

| Dispositivo | Pines PIC |
| --- | --- |
| LCD datos (4 bit) | RD4-RD7 |
| LCD RS, E | RD2, RD3 |
| Teclado filas | RB0-RB3 |
| Teclado columnas | RB4-RB7 |

## Requisitos del programa

- Ensamblador MPASM, modular y comentado
- Interrupciones RB4-RB7 para teclado
- Libreria LCD.INC (bus 4 bit) segun Tema 7.1
- Pseudocodigo y diagrama de flujo en el informe

## Pre-laboratorio

Investigar HD44780, teclado matricial, interrupcion RB4-RB7 y macros en MPASM.
""")

write("practicas/frecuencimetro.mdx", """
---
title: Practica 3 - Frecuencimetro
description: Medicion de frecuencia con displays multiplexados en PIC18F4550.
---

import PracticeBox from '../../../components/PracticeBox.astro';

<PracticeBox title="Practica 3 de Laboratorio" level="UNEXPO">
Frecuencimetro con displays 7 segmentos multiplexados. Usa timers para ventana de medicion y refresco del display.
</PracticeBox>

## Conceptos clave

- Timer como contador de pulsos externos
- Multiplexacion de displays para reducir pines
- Persistencia visual con refresco rapido (~50 Hz por digito)
- Calculo: frecuencia = conteo / tiempo de ventana

## Relacion con el curso

Combina Timer0/Timer1 en modo contador, GPIO y posiblemente interrupciones para el refresco.
""")

write("practicas/motor-paso-a-paso.mdx", """
---
title: Practica 6 - Motor paso a paso
description: Control de motor paso a paso con secuencia de pasos y PIC18F4550.
---

import PracticeBox from '../../../components/PracticeBox.astro';
import AIExplain from '../../../components/AIExplain.astro';

<PracticeBox title="Practica 6 de Laboratorio" level="UNEXPO">
Controlar un motor paso a paso mediante secuencia de energizacion de bobinas. Puede combinarse con PWM o salidas digitales temporizadas.
</PracticeBox>

<AIExplain title="Secuencia de pasos">
Motores unipolares/bipolares requieren patrones en fase (full step o half step). Usa timers para controlar velocidad entre pasos.
</AIExplain>

## Elementos tipicos

- Driver (ULN2003 o similar)
- 4 salidas del PIC a las bobinas
- Botones para direccion y velocidad
- Timer para retardo entre pasos
""")

write("practicas/convertidor-ad.mdx", """
---
title: Practica 7 - Convertidor AD
description: Lectura analogica con ADC de 10 bits del PIC18F4550.
---

import PracticeBox from '../../../components/PracticeBox.astro';

<PracticeBox title="Practica 7 de Laboratorio" level="UNEXPO">
Implementar conversion analogico-digital: leer potenciometro o sensor, procesar valor y visualizar en LCD o LEDs.
</PracticeBox>

## Pasos obligatorios

1. Configurar ADCON1 (pines analogicos)
2. Configurar ADCON2 (reloj, formato)
3. Seleccionar canal en ADCON0
4. Iniciar conversion y esperar GO/DONE
5. Leer y escalar resultado a voltaje o unidades

## Cristal 20 MHz

Seleccionar ADCS = 101 (16 Tosc) en ADCON2 segun Tema 9 CAD.
""")

write("practicas/comunicacion-serial.mdx", """
---
title: Practica 8 - Comunicacion serial
description: UART entre PIC18F4550 y PC segun Practica 8 del curso.
---

import PracticeBox from '../../../components/PracticeBox.astro';

<PracticeBox title="Practica 8 de Laboratorio" level="UNEXPO">
Establecer comunicacion serial entre el PIC18F4550 y una PC usando EUSART. Enviar y recibir datos (terminal serial).
</PracticeBox>

## Requisitos

- Configurar EUSART a 9600 o 115200 baudios
- Pines RC6 (TX) y RC7 (RX)
- Terminal en PC (PuTTY, Tera Term, Arduino Serial Monitor)
- Opcional: protocolo simple de comandos

## Evaluacion

Codigo funcional, simulacion o prueba fisica, informe con diagrama y explicacion del calculo de SPBRG.
""")

# Projects
write("proyectos/semaforo.mdx", """
---
title: Proyecto - Semaforo
description: Semaforo con LEDs, timers y secuencia de estados en PIC18F4550.
---

import PracticeBox from '../../../components/PracticeBox.astro';

<PracticeBox title="Proyecto guiado" level="Intermedio">
Tres LEDs (rojo, amarillo, verde) con secuencia automatica usando Timer0 para los tiempos de cada estado.
</PracticeBox>

## Estados

1. Rojo: 5 s
2. Rojo+Amarillo: 2 s
3. Verde: 5 s
4. Amarillo: 2 s
5. Repetir

## Extensiones

- Boton peatonal en RB0 (interrupcion)
- Modo nocturno (parpadeo amarillo)
- Contador de segundos en LCD
""")

write("proyectos/control-nivel.mdx", """
---
title: Proyecto - Control de nivel de tanque
description: Ejercicio tipo II parcial del curso de Microcontroladores UNEXPO (Ing. Mecatronica) con bomba y valvula.
---

import PracticeBox from '../../../components/PracticeBox.astro';
import Exercise from '../../../components/Exercise.astro';

<PracticeBox title="Ejercicio II Parcial 2025-2" level="Examen">
Control de nivel: boton inicio activa bomba hasta nivel maximo, luego abre valvula hasta vaciar, ciclo infinito.
</PracticeBox>

## Senales

| Elemento | Apagado/Cerrado | Encendido/Abierto |
| --- | --- | --- |
| Sensor vacio | 0V | — |
| Sensor lleno | — | 5V |
| Bomba | 0V | 5V |
| Valvula | 0V | 5V |

## Asignacion de pines (solucion guia)

- RB7: pulsador inicio
- RB4: sensor maximo
- RB3: sensor minimo
- RB6: bomba
- RB5: valvula

<Exercise title="Elabora pseudocodigo y diagrama de flujo">
Sigue la estructura del el curso de Microcontroladores (UNEXPO): configurar → esperar pulsador → encender bomba → esperar max → apagar bomba → abrir valvula → esperar min → cerrar valvula → repetir.
</Exercise>
""")

# Exam prep
write("parcial/ejercicios.mdx", """
---
title: Banco de ejercicios tipo parcial
description: Ejercicios de clase y II parcial del curso de Microcontroladores UNEXPO (Ing. Mecatronica) con enfoque PIC18F4550.
---

import Exercise from '../../../components/Exercise.astro';

## Ejercicio 1: Control de nivel

Sistema de bomba y valvula con sensores simulados por interruptores. Ver [Proyecto control de nivel](/proyectos/control-nivel/).

<Exercise title="Conteo descendente en display 7 segmentos">
Programa que cuenta de 0FH a 00H en display BCD catodo comun. Dos pulsadores: uno incrementa cuenta inicial, otro inicia decremento de 1 s por digito.
</Exercise>

<Exercise title="Intermitencia controlada por pulsador">
Al presionar pulsador, LED intermitente 10 ciclos en 100 segundos. Si se presiona de nuevo, detener inmediatamente. Pines sugeridos: RA0, RA1, RB0-RB3.
</Exercise>

## Temas frecuentes en evaluacion

- Pseudocodigo preciso (no necesariamente exacto)
- Diagrama de flujo con decisiones claras
- Codigo ensamblador modular
- Simulacion en Proteus
- Explicacion oral del funcionamiento
""")

write("parcial/proyecto-final.mdx", """
---
title: Proyecto final tipo parcial
description: Integracion de GPIO, timers, interrupciones, ADC o serial en un proyecto completo.
---

import PracticeBox from '../../../components/PracticeBox.astro';
import AIExplain from '../../../components/AIExplain.astro';

<PracticeBox title="Proyecto integrador" level="Final">
Combina al menos 3 modulos: entradas, salidas, temporizacion, interrupciones y un periferico (ADC, PWM o UART).
</PracticeBox>

<AIExplain title="Criterio del curso">
Codigo estructurado en modulos, comentarios claros, pseudocodigo, diagrama de flujo, simulacion y demostracion fisica.
</AIExplain>

## Ideas de proyecto

1. **Estacion meteorologica:** ADC (LM35) + LCD + UART a PC
2. **Control de acceso:** Teclado + LCD + servo PWM
3. **Semáforo inteligente:** Timer + interrupciones + boton peatonal
4. **Data logger:** ADC + EEPROM + serial

## Entregables

- Informe con portada UNEXPO
- Archivo .ASM y librerias
- Simulacion (capturas Proteus)
- Explicacion oral
""")

# Reference
write("referencia/guia-registros.mdx", """
---
title: Guia rapida de registros
description: Tabla de consulta rapida de registros SFR del PIC18F4550 para el parcial.
---

## CPU y sistema

| Registro | Bits clave | Uso |
| --- | --- | --- |
| WREG | 8 | Acumulador |
| STATUS | Z,C,DC,OV,N | Banderas ALU |
| BSR | 0-3 | Banco memoria |
| INTCON | GIE, PEIE, TMR0IF | Interrupciones globales |

## Puertos

| Registro | Funcion |
| --- | --- |
| TRISx | 1=in, 0=out |
| PORTx | Leer pines |
| LATx | Escribir salida |

## Timers

| Timer | Control | Contador |
| --- | --- | --- |
| Timer0 | T0CON | TMR0L/H |
| Timer1 | T1CON | TMR1L/H |
| Timer2 | T2CON | TMR2, PR2 |

## ADC

| Registro | Funcion |
| --- | --- |
| ADCON0 | Canal, GO/DONE, ADON |
| ADCON1 | PCFG analogico/digital |
| ADCON2 | ADFM, ADCS reloj |
| ADRESH/L | Resultado 10 bit |

## Serial

| Registro | Funcion |
| --- | --- |
| TXSTA | TXEN, BRGH |
| RCSTA | SPEN, CREN |
| SPBRG | Baudios |
| TXREG/RCREG | Datos |

## PWM/CCP

| Registro | Funcion |
| --- | --- |
| CCP1CON | Modo CCP/PWM |
| CCPR1L | Duty cycle |
| PR2 | Periodo PWM |
""")

write("referencia/glosario.mdx", """
---
title: Glosario bilingue
description: Terminos tecnicos PIC18F4550 en espanol e ingles.
---

| Espanol | English | Definicion |
| --- | --- | --- |
| Microcontrolador | Microcontroller | CPU + memoria + perifericos en un chip |
| Ensamblador | Assembly | Lenguaje de bajo nivel por instrucciones |
| Registro | Register | Celda de memoria especial de 8 bits |
| Puerto | Port | Grupo de pines GPIO |
| Interrupcion | Interrupt | Evento que desvia el flujo del programa |
| Temporizador | Timer | Modulo para retardos o conteo |
| Conversor A/D | ADC | Analog-to-Digital Converter |
| Modulacion PWM | PWM | Pulse Width Modulation |
| Baudios | Baud rate | Bits por segundo en serial |
| Ciclo util | Duty cycle | Porcentaje de tiempo en alto del PWM |
| Mascara | Bit mask | Bits usados para filtrar valores |
| ISR | ISR | Interrupt Service Routine |
| Harvard | Harvard | Memoria programa y datos separadas |
| SFR | SFR | Special Function Register |
| GPR | GPR | General Purpose Register |
| Pull-up | Pull-up | Resistencia a VDD en entradas |
| Antirrebote | Debounce | Filtrar rebote mecanico de contactos |
| Datasheet | Datasheet | Hoja de datos del fabricante |
| Config bits | Configuration bits | Fuses de hardware del PIC |
""")

print("All Spanish modules done")
