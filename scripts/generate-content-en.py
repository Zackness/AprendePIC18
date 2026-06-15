#!/usr/bin/env python3
"""Generate English content files for AprendePIC18."""
import os

BASE = os.path.join(os.path.dirname(__file__), "..", "src", "content", "docs", "en")
BASE = os.path.abspath(BASE)

# Map Spanish slug -> English content (abbreviated but complete)
FILES = {
"sobre/ecosistema.mdx": """---
title: CALETAS Ecosystem and StartupVen
description: Who maintains AprendePIC18 and its relationship with StartupVen and CALETAS.
---

import AIExplain from '../../../../components/AIExplain.astro';

**AprendePIC18** is an open educational resource created by [zackness](https://zackness.dev) to study the PIC18F4550 with the academic rigor required in the **Microcontrollers** course of **Mechatronics Engineering** at **UNEXPO**.

## Maintenance and ecosystem

| Entity | Role | Link |
| --- | --- | --- |
| **zackness** | Author and educational content creator | [zackness.dev](https://zackness.dev) |
| **StartupVen** | Company that maintains and deploys the platform | [startupven.com](https://startupven.com) |
| **CALETAS** | Educational and technology project ecosystem | [caleta.top](https://caleta.top) |

<AIExplain title="Why CALETAS?">
CALETAS groups high-quality educational resources for engineering students in Venezuela and Latin America. AprendePIC18 deploys as a subdomain of caleta.top as part of that ecosystem.
</AIExplain>

## Deployment

- **Platform:** [Vercel](https://vercel.com)
- **Planned domain:** subdomain of [caleta.top](https://caleta.top) (e.g. `pic18.caleta.top`)
- **Stack:** Astro + Starlight, static bilingual site ES/EN

## Academic sources

Content is based on lectures, lab practices, and evaluation material from curso de Microcontroladores UNEXPO (Ing. Mecatronica) (UNEXPO Carora campus), complemented with the PIC18F4550 datasheet and PIC18 instruction set.
""",

"fundamentos/bits-hex.mdx": """---
title: Bits, bytes, hexadecimal and masks
description: Binary operations, hexadecimal notation and bit masks for the PIC18F4550.
---

import AIExplain from '../../../../components/AIExplain.astro';
import Exercise from '../../../../components/Exercise.astro';

On the PIC18F4550 almost everything is configured by modifying individual bits inside 8-bit registers.

<AIExplain title="Practical rule">
One byte = 8 bits. In MPASM you write `B'10101010'` or `0xAA`. Use `BSF` to set a bit and `BCF` to clear it.
</AIExplain>

## Quick conversion

| Decimal | Binary | Hex |
| --- | --- | --- |
| 0 | 00000000 | 0x00 |
| 15 | 00001111 | 0x0F |
| 170 | 10101010 | 0xAA |
| 255 | 11111111 | 0xFF |

## Bit masks

```asm
BSF     LATB, 0
MOVF    PORTB, W
ANDLW   B'11110000'
```

Lab Practice 1 requires routines for add, subtract, multiply, software divide, OR, AND, XOR, complement and rotate.

<Exercise title="Convert 0xC3 to binary">
0xC3 = 11000011. Bits 0, 1, 6 and 7 are high.
</Exercise>
""",

"fundamentos/registros.mdx": """---
title: Main PIC18F4550 registers
description: SFR, GPR, memory banks and key registers from the UNEXPO course.
---

import AIExplain from '../../../../components/AIExplain.astro';

**SFR** control hardware; **GPR** store variables. The `BSR` register selects the active memory bank.

## CPU registers

| Register | Function |
| --- | --- |
| `WREG` | Working accumulator |
| `STATUS` | Flags: Z, C, DC, OV, N |
| `BSR` | Bank select |
| `PC` | Program counter |

## Port registers

| Register | Function |
| --- | --- |
| `TRISx` | Direction: 1=input, 0=output |
| `PORTx` | Read pin levels |
| `LATx` | Write output latch |

## Exam question

**What is the difference between reading PORTB and writing LATB?**

`PORTB` reflects electrical pin levels. `LATB` sets the output value without reading the physical pin.
""",

"fundamentos/config-bits.mdx": """---
title: Config bits and configuration word
description: Fuses, CONFIG directives and minimum system for PIC18F4550.
---

import AIExplain from '../../../components/AIExplain.astro';
import PracticeBox from '../../../components/PracticeBox.astro';

Configuration bits define hardware behavior at power-on: oscillator, watchdog, MCLR, etc.

```asm
        CONFIG  FOSC = HS
        CONFIG  WDT  = OFF
        CONFIG  LVP  = OFF
        CONFIG  MCLRE = ON
        CONFIG  PBADEN = OFF
```

## Minimum system

- PIC18F4550, 20 MHz crystal, 1 nF caps
- 10 kΩ pull-up on MCLR
- 5 V supply, 10 nF decoupling cap

<PracticeBox title="Lab Practice 1 pre-lab" level="UNEXPO">
Research minimum system wiring and draw the schematic before breadboarding.
</PracticeBox>
""",
}

# Add remaining EN files with a helper
def add(name, body):
    FILES[name] = body

add("gpio/index.mdx", """---
title: GPIO - TRIS, PORT and LAT
description: Digital ports, inputs, outputs and pin configuration on PIC18F4550.
---

import AIExplain from '../../../../components/AIExplain.astro';

`TRISx` sets direction. `LATx` writes outputs. `PORTx` reads pins.

```asm
        BCF     TRISB, 0
        BSF     LATB, 0
```

Lab Practice 1 uses ports B/D as inputs and C/E as LED outputs with RA0 as operation selector.
""")

add("gpio/botones.mdx", """---
title: Buttons, pull-up and debounce
description: Digital inputs, pull-up resistors and debounce techniques.
---

import AIExplain from '../../../../components/AIExplain.astro';

Use 10 kΩ pull-up resistors. Debounce with software delay or interrupts. Practice 2 uses RB4-RB7 interrupts for matrix keyboard.
""")

add("timers/timer0.mdx", """---
title: Timer 0
description: Timer0 configuration, timing formula and examples.
---

import AIExplain from '../../../../components/AIExplain.astro';

Formula: `Time = (4/Fosc) * N * Prescaler`. For 2 s @ 20 MHz, 16-bit, prescaler 1:256: TMR0H:TMR0L = 26474.
""")

add("timers/timer1-timer2.mdx", """---
title: Timer 1 and Timer 2
description: 16-bit timers, CCP and PWM base with Timer2.
---

import AIExplain from '../../../../components/AIExplain.astro';

Timer2 with PR2 is the time base for PWM. Timer1 is used in CCP capture and compare modes.
""")

add("interrupciones/index.mdx", """---
title: Interrupts
description: ISR, vectors, INTCON and interrupt sources on PIC18F4550.
---

import AIExplain from '../../../../components/AIExplain.astro';

Vectors at 0x0008 (high priority) and 0x0018 (low). Always clear flags before RETFIE. Key registers: GIE, PEIE, PIE1/PIR1.
""")

add("adc/index.mdx", """---
title: Analog-to-Digital Converter (ADC)
description: 10-bit ADC, 13 channels and ADCON registers.
---

import AIExplain from '../../../../components/AIExplain.astro';

10-bit resolution, 13 channels. Configure ADCON1, ADCON2, ADCON0. For 20 MHz crystal use ADCS=101 (16 Tosc).
""")

add("pwm/index.mdx", """---
title: PWM and CCP module
description: Pulse width modulation, CCP1/CCP2 and motor control.
---

import AIExplain from '../../../../components/AIExplain.astro';

PWM uses Timer2 and PR2. CCP1 on RC2. Set TRISC bit 2 as output, load PR2, enable TMR2, configure CCP1CON for PWM mode (11xx).
""")

add("comunicacion/uart.mdx", """---
title: UART / EUSART
description: Asynchronous serial communication and baud rate setup.
---

import AIExplain from '../../../../components/AIExplain.astro';

Pins RC6/TX and RC7/RX. Configure SPBRG, TXSTA (TXEN, BRGH), RCSTA (SPEN, CREN). Typical 9600 baud @ 20 MHz: SPBRG ≈ 129.
""")

add("comunicacion/spi-i2c.mdx", """---
title: SPI and I2C (MSSP)
description: MSSP module for synchronous SPI and I2C communication.
---

import AIExplain from '../../../../components/AIExplain.astro';

SPI: faster, more pins. I2C: two wires, multiple slaves. Registers: SSPCON1/2, SSPSTAT, SSPBUF.
""")

add("comunicacion/usb.mdx", """---
title: USB on PIC18F4550
description: Introduction to the Full-Speed USB module.
---

import AIExplain from '../../../../components/AIExplain.astro';

PIC18F4550 includes USB 2.0 Full Speed. Requires Microchip USB stack. Know for theory exam that USB interrupts exist.
""")

add("comunicacion/lcd-teclado.mdx", """---
title: HD44780 LCD and matrix keyboard
description: 16x2 LCD, HD44780 controller and 4x4 keyboard with RB4-RB7 interrupts.
---

import PracticeBox from '../../../../components/PracticeBox.astro';

Practice 2: LCD data on RD4-RD7 (4-bit), RS/E on RD2-RD3. Keyboard rows RB0-RB3, columns RB4-RB7.
""")

add("practicas/operaciones-matematicas.mdx", """---
title: Practice 1 - Math operations
description: Minimum system, ports and ALU operations per UNEXPO lab.
---

import PracticeBox from '../../../../components/PracticeBox.astro';

Operands on ports B and D, results on C and E, RA0 selects operation: add, subtract, multiply, software divide, OR, AND, XOR, complement, rotate.
""")

add("practicas/teclado-lcd.mdx", """---
title: Practice 2 - Keyboard and LCD
description: 16x2 LCD and 4x4 matrix keyboard with interrupts.
---

import PracticeBox from '../../../../components/PracticeBox.astro';

Display typed values on LCD using RB4-RB7 change interrupts for the keyboard.
""")

add("practicas/frecuencimetro.mdx", """---
title: Practice 3 - Frequency meter
description: Frequency measurement with multiplexed 7-segment displays.
---

import PracticeBox from '../../../../components/PracticeBox.astro';

Use timer as external pulse counter and multiplex displays for visual persistence.
""")

add("practicas/motor-paso-a-paso.mdx", """---
title: Practice 6 - Stepper motor
description: Stepper motor control with step sequences.
---

import PracticeBox from '../../../../components/PracticeBox.astro';

Drive motor phases through ULN2003 or similar. Use timers for step delay.
""")

add("practicas/convertidor-ad.mdx", """---
title: Practice 7 - A/D converter
description: 10-bit analog reading with PIC18F4550 ADC.
---

import PracticeBox from '../../../../components/PracticeBox.astro';

Read potentiometer or sensor, display on LCD or LEDs. Configure ADCON1/2/0 properly.
""")

add("practicas/comunicacion-serial.mdx", """---
title: Practice 8 - Serial communication
description: UART between PIC18F4550 and PC.
---

import PracticeBox from '../../../../components/PracticeBox.astro';

Configure EUSART, test with serial terminal on PC. Document SPBRG calculation in report.
""")

add("proyectos/semaforo.mdx", """---
title: Project - Traffic light
description: Traffic light with LEDs and Timer0 delays.
---

import PracticeBox from '../../../../components/PracticeBox.astro';

Red, yellow, green sequence with timed states. Optional pedestrian button on RB0.
""")

add("proyectos/control-nivel.mdx", """---
title: Project - Tank level control
description: II partial exam exercise with pump and valve.
---

import PracticeBox from '../../../../components/PracticeBox.astro';

RB7=start, RB4=max sensor, RB3=min sensor, RB6=pump, RB5=valve. Infinite fill/drain cycle.
""")

add("parcial/ejercicios.mdx", """---
title: Exam-style exercise bank
description: In-class and II partial exercises from curso de Microcontroladores UNEXPO (Ing. Mecatronica).
---

import Exercise from '../../../../components/Exercise.astro';

Includes tank level control, countdown on 7-segment display, and LED blink sequence stopped by button press.
""")

add("parcial/proyecto-final.mdx", """---
title: Final partial-style project
description: Integrate GPIO, timers, interrupts and a peripheral.
---

import PracticeBox from '../../../../components/PracticeBox.astro';

Combine at least 3 modules. Deliver report, .ASM, Proteus simulation and oral explanation.
""")

add("referencia/guia-registros.mdx", """---
title: Quick register guide
description: Fast SFR lookup table for the PIC18F4550 exam.
---

| Area | Key registers |
| --- | --- |
| CPU | WREG, STATUS, BSR, INTCON |
| Ports | TRISx, PORTx, LATx |
| Timers | T0CON/TMR0, T1CON/TMR1, T2CON/TMR2/PR2 |
| ADC | ADCON0/1/2, ADRESH/L |
| Serial | TXSTA, RCSTA, SPBRG |
| PWM | CCP1CON, CCPR1L, PR2 |
""")

add("referencia/glosario.mdx", """---
title: Bilingual glossary
description: Technical PIC18F4550 terms in Spanish and English.
---

| Spanish | English |
| --- | --- |
| Microcontrolador | Microcontroller |
| Interrupcion | Interrupt |
| Temporizador | Timer |
| Baudios | Baud rate |
| Ciclo util | Duty cycle |
| Ensamblador | Assembly |
""")

for path, content in FILES.items():
    full = os.path.join(BASE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Wrote en/{path}")

print("English modules done")
