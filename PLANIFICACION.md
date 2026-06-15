# Planificacion de AprendePIC18

Este documento guarda la planificacion general de **AprendePIC18**, una web tipo documentacion/curso para estudiar el **PIC18F4550** con enfoque en ensamblador, teoria para parcial, simulacion y practica real.

El proyecto es una plataforma web desarrollada por **zackness** y debe mantener una experiencia clara, didactica y bilingue en espanol e ingles. El contenido academico proviene del curso de **Microcontroladores** (UNEXPO).

## Plan propuesto

Crear una web tipo documentacion/curso para estudiar el PIC18F4550, usando Astro, inspirada en:

- Documentacion de Astro: navegacion clara, sidebar, busqueda, paginas MD/MDX.
- aprendejavascript.dev: camino de aprendizaje, modulos, practicas, ejercicios y estilo mas didactico.

## Tecnologia recomendada

Usar **Astro + Starlight**, porque Starlight ya trae casi todo lo necesario para documentacion:

- Sidebar.
- Busqueda.
- Soporte multilenguaje.
- Modo claro/oscuro.
- Markdown/MDX.
- Buen SEO.
- Estructura similar a la documentacion oficial de Astro.

Para el estilo de curso, agregar componentes personalizados:

- Tarjetas de leccion.
- Bloques de practica.
- Ejercicios guiados.
- Comparaciones visuales.
- Bloques “Explicado por AI”.
- Bloques “Codigo paso a paso”.
- Secciones tipo “reto”.

## Estructura del curso

### 1. Introduccion

- Que es el PIC18F4550.
- Para que sirve.
- Diferencias con Arduino, ESP32, Raspberry Pi y otros microcontroladores.
- Como estudiar para el parcial.

### 2. Fundamentos

- Arquitectura Harvard.
- CPU, memoria Flash, RAM, EEPROM.
- Registros.
- Puertos digitales.
- Bits, bytes, mascaras y operaciones binarias.

### 3. Entorno de trabajo

- MPLAB v8.
- MPLAB X IDE.
- MPASM.
- XC8 Compiler como referencia secundaria.
- Proteus o simulador.
- Configuracion inicial del proyecto.
- Fuses/config bits.
- Flujo de compilacion de `.asm` a `.hex`.

### 4. GPIO

- `TRIS`, `LAT`, `PORT`.
- Entradas y salidas.
- LEDs.
- Botones.
- Pull-up/pull-down.
- Antirrebote.

### 5. Timers

- Timer0.
- Timer1.
- Timer2.
- Prescalers.
- Interrupciones con timers.
- Ejercicios de delays y parpadeo.

### 6. Interrupciones

- Que son.
- Prioridades.
- `INT0`, `INT1`, `INT2`.
- Interrupciones por cambio.
- Buenas practicas.
- Flujo de entrada y salida de una ISR.

### 7. ADC

- Conversion analogica-digital.
- Sensores.
- Potenciometro.
- Lectura de voltaje.
- Configuracion de registros ADC.
- Ejercicios practicos.

### 8. PWM

- Modulo CCP.
- Duty cycle.
- Frecuencia de PWM.
- Control de brillo.
- Control de motores.
- Servomotores si aplica.

### 9. Comunicacion serial

- UART.
- SPI.
- I2C.
- USB basico del PIC18F4550.
- Comunicacion con PC.
- Ejemplos teoricos y practicos.

### 10. Proyectos practicos

- LED blink.
- Semaforo.
- Contador con display.
- Lectura de boton.
- Dimmer con PWM.
- Sensor analogico.
- Comunicacion serial con PC.
- Proyecto final tipo parcial.

### 11. Comparaciones

- PIC18F4550 vs Arduino UNO.
- PIC18F4550 vs ESP32.
- PIC18F4550 vs Raspberry Pi.
- Microcontrolador vs microprocesador.
- Cuando usar cada uno.

### 12. Preparacion para parcial

- Resumenes.
- Preguntas frecuentes.
- Ejercicios tipo examen.
- Checklist de temas.
- Guia rapida de registros.
- Errores comunes.
- Preguntas teoricas con respuestas explicadas.

## Estructura de carpetas objetivo

La estructura base pensada para el proyecto es:

```txt
aprende-pic18/
├── astro.config.mjs
├── package.json
├── PLANIFICACION.md
├── src/
│   ├── content/
│   │   └── docs/
│   │       ├── index.mdx
│   │       ├── ruta-de-estudio.mdx
│   │       ├── introduccion/
│   │       ├── fundamentos/
│   │       ├── gpio/
│   │       ├── timers/
│   │       ├── interrupciones/
│   │       ├── adc/
│   │       ├── pwm/
│   │       ├── comunicacion/
│   │       ├── proyectos/
│   │       ├── parcial/
│   │       └── en/
│   │           ├── index.mdx
│   │           ├── ruta-de-estudio.mdx
│   │           ├── introduccion/
│   │           ├── fundamentos/
│   │           ├── gpio/
│   │           ├── timers/
│   │           ├── interrupciones/
│   │           ├── adc/
│   │           ├── pwm/
│   │           ├── comunicacion/
│   │           ├── proyectos/
│   │           └── parcial/
│   ├── components/
│   │   ├── LessonCard.astro
│   │   ├── PracticeBox.astro
│   │   ├── AIExplain.astro
│   │   ├── Exercise.astro
│   │   ├── CompareCard.astro
│   │   └── CompareTable.astro
│   └── styles/
│       └── custom.css
└── public/
    └── images/
```

Nota: en este proyecto el espanol funciona como idioma principal en la raiz y el ingles vive bajo `/en/`.

## Parte de AI

Para que la web tenga “AI que explique”, hay dos opciones:

### 1. AI estatica/revisada

- Generar explicaciones claras dentro de la documentacion.
- Es mas seguro para estudiar.
- No requiere API keys.
- Funciona offline si se despliega estaticamente.
- Es la opcion recomendada para este proyecto.

### 2. Chat AI integrado

- Un asistente dentro de la web para preguntar cosas del PIC18F4550.
- Requiere API key y backend/API route.
- Es mas complejo.
- Puede equivocarse si no se limita con contenido verificado.

Decision actual: **usar AI estatica/revisada**, no chat integrado. La web sera una documentacion/curso, no una app de chat.

## Imagenes generadas con AI

La web puede incluir imagenes generadas con AI cuando sean utiles para explicar conceptos visuales:

- Arquitectura interna del PIC18F4550.
- Conexion de un LED.
- Conexion de botones.
- Flujo de interrupciones.
- Mapa conceptual de memoria.
- Comparaciones entre PIC, Arduino, ESP32 y Raspberry Pi.
- Diagramas de Proteus o guias visuales.

Regla importante: toda imagen generada con AI debe revisarse tecnicamente antes de publicarse.

## Primera version recomendada

Para no hacer un proyecto enorme de una sola vez, el MVP debe incluir:

- Proyecto Astro + Starlight.
- Idiomas espanol e ingles.
- Pagina de inicio.
- Sidebar organizada.
- Diseno personalizado inspirado en aprendejavascript.dev.
- Primer modulo completo en espanol e ingles:
  - Introduccion.
  - Que es el PIC18F4550.
  - Comparacion con Arduino, ESP32 y Raspberry Pi.
  - Guia de estudio para el parcial.
  - Primer ejercicio: encender un LED.
- Componentes reutilizables para ejercicios, explicaciones AI y practicas.

## Estado actual del proyecto

Ya existe una primera base con:

- Astro + Starlight instalado.
- Sitio llamado **AprendePIC18**.
- Espanol en la raiz.
- Ingles en `/en/`.
- Sidebar inicial.
- Estilos personalizados.
- Credito a **zackness** (desarrollo de la plataforma web).
- Componentes iniciales:
  - `AIExplain.astro`.
  - `PracticeBox.astro`.
  - `CompareTable.astro`.
- Primeras paginas:
  - Inicio.
  - Ruta de estudio.
  - Que es el PIC18F4550.
  - Comparaciones.
  - Arquitectura basica.
  - Ensamblador.
  - MPLAB v8, MPLAB X, Proteus y placa.
  - Primer LED.
  - Guia teorica para parcial.

## Modulos que se deben agregar despues

Prioridad recomendada para continuar:

1. GPIO completo.
2. Bits, bytes, hexadecimal y mascaras.
3. Registros principales del PIC18F4550.
4. Config bits/fuses.
5. Timer0.
6. Timer1 y Timer2.
7. Interrupciones.
8. Botones y antirrebote.
9. ADC.
10. PWM/CCP.
11. UART.
12. SPI.
13. I2C.
14. USB basico.
15. Practicas con Proteus.
16. Practicas con placa fisica.
17. Banco de ejercicios tipo parcial.
18. Guia rapida de registros.
19. Glosario bilingue.
20. Proyecto final tipo parcial.

## Criterio de calidad del contenido

Cada modulo deberia incluir:

- Explicacion simple del concepto.
- Relacion con el PIC18F4550.
- Registros involucrados.
- Bits importantes.
- Ejemplo en ensamblador.
- Explicacion linea por linea.
- Errores comunes.
- Preguntas tipo parcial.
- Practica en Proteus cuando aplique.
- Nota para placa fisica cuando aplique.
- Version en espanol.
- Version en ingles.
