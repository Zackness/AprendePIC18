<div align="center">

# AprendePIC18

### Curso y documentación bilingüe para dominar el **PIC18F4550** en ensamblador, sin perderte en PDFs eternos.

[![Astro](https://img.shields.io/badge/Astro-6.x-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Starlight](https://img.shields.io/badge/Starlight-0.40-FCA311?style=for-the-badge)](https://starlight.astro.build)
[![Bilingüe](https://img.shields.io/badge/Idiomas-ES%20%7C%20EN-14213D?style=for-the-badge)](https://pic18.caleta.top)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

<br />

[**Ver sitio en vivo**](https://pic18.caleta.top) · [**Ruta de estudio**](https://pic18.caleta.top/ruta-de-estudio/) · [**Ecosistema CALETAS**](https://caleta.top)

<br />

Plataforma web por [**zackness**](https://zackness.pages.dev) · Mantenido por [**StartupVen**](https://startupven.com) · Parte de [**CALETAS**](https://caleta.top)

</div>

---

## ¿Qué es AprendePIC18?

**AprendePIC18** es una plataforma educativa open source que transforma el material académico del curso de **Microcontroladores** en una experiencia de estudio clara, visual y navegable.

Está pensada para estudiantes que trabajan con el **PIC18F4550** en **ensamblador MPASM**, usando **MPLAB**, **Proteus** y placa física, con preparación directa para el **parcial teórico** y las **prácticas de laboratorio**.

> No reemplaza el datasheet. Lo traduce a una ruta: **concepto → registro → código → simulación → práctica → pregunta de parcial**.

El contenido está alineado con las clases y laboratorios del curso de **Microcontroladores** de **Ingeniería Mecatrónica** de la **UNEXPO**, complementado con el datasheet del PIC18F4550 y el set de instrucciones del PIC18.

---

## ✨ Características

| | |
|---|---|
| 📚 **Curso completo** | 36+ módulos en español y su versión en inglés bajo `/en/` |
| 🔧 **Ensamblador primero** | Ejemplos MPASM, registros, config bits y flujo `.asm` → `.hex` |
| 🧪 **Laboratorio UNEXPO** | 8 prácticas: LED, operaciones ALU, LCD/teclado, frecuencímetro, motor, ADC, serial |
| 📝 **Preparación parcial** | Guía teórica, banco de ejercicios y proyecto integrador |
| 🖼️ **Diagramas visuales** | SVG didácticos: Harvard, sistema mínimo, GPIO, timers, ISR, PWM, UART, LCD |
| 🌐 **Bilingüe** | Español como idioma principal; inglés para repasar vocabulario técnico |
| 🔍 **Búsqueda integrada** | Pagefind indexa todo el sitio estático |
| 🌓 **Modo claro / oscuro** | Tema adaptable con identidad visual propia |
| ⚡ **Rápido y SEO-friendly** | Astro + Starlight, sitio estático desplegable en Vercel |

---

## 🗺️ Mapa del curso

```mermaid
flowchart LR
    A[Introducción] --> B[Fundamentos]
    B --> C[GPIO]
    C --> D[Timers]
    D --> E[Interrupciones]
    E --> F[ADC / PWM]
    F --> G[Comunicación]
    G --> H[Prácticas UNEXPO]
    H --> I[Proyectos]
    I --> J[Parcial]

    style A fill:#14213d,color:#fff
    style J fill:#fca311,color:#14213d
```

<details>
<summary><strong>Ver todos los módulos</strong></summary>

<br />

| Sección | Contenido |
|---------|-----------|
| **Comienza aquí** | Ruta de estudio, ecosistema CALETAS, PIC18F4550, comparaciones |
| **Fundamentos** | Arquitectura, bits/hex, registros, ensamblador, config bits, MPLAB/Proteus |
| **GPIO** | TRIS / PORT / LAT, botones, pull-up y antirrebote |
| **Timers** | Timer0, Timer1 y Timer2 |
| **Interrupciones** | ISR, vectores, INTCON, fuentes externas e internas |
| **ADC** | Conversor 10 bits, 13 canales, ADCON |
| **PWM / CCP** | Modulación por ancho de pulso, Timer2, duty cycle |
| **Comunicación** | UART, SPI/I2C, USB, LCD HD44780 y teclado matricial |
| **Prácticas** | Las 8 prácticas oficiales del laboratorio |
| **Proyectos** | Semáforo, control de nivel (ejercicio II parcial) |
| **Parcial** | Guía teórica, ejercicios tipo examen, proyecto final |
| **Referencia** | Guía rápida de registros y glosario bilingüe |

</details>

---

## 🛠️ Stack tecnológico

```
Astro 6  +  Starlight  +  MDX  +  Pagefind  +  Vercel
```

| Tecnología | Uso |
|------------|-----|
| [Astro](https://astro.build) | Framework del sitio estático |
| [Starlight](https://starlight.astro.build) | Tema de documentación: sidebar, i18n, búsqueda |
| MDX | Contenido del curso con componentes interactivos |
| [Pagefind](https://pagefind.app) | Motor de búsqueda en el build |
| [Vercel](https://vercel.com) | Hosting y despliegue continuo |
| [Sharp](https://sharp.pixelplumbing.com) | Optimización de imágenes |

### Componentes personalizados

| Componente | Descripción |
|------------|-------------|
| `AIExplain.astro` | Bloques de explicación clara (contenido revisado, no chat) |
| `PracticeBox.astro` | Cajas de práctica de laboratorio |
| `Exercise.astro` | Ejercicios tipo parcial |
| `CompareTable.astro` | Tablas comparativas (PIC vs Arduino, ESP32…) |
| `Figure.astro` | Imágenes con pie de foto y crédito académico |
| `LessonCard.astro` | Tarjetas de lección para rutas de estudio |

---

## 🚀 Inicio rápido

### Requisitos

- **Node.js** 18 o superior
- **npm** (o pnpm / yarn)

### Instalación

```bash
git clone https://github.com/Zackness/AprendePIC18.git
cd AprendePIC18
npm install
```

### Desarrollo local

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en el navegador.

### Build de producción

```bash
npm run build    # genera la carpeta dist/
npm run preview  # previsualiza el build localmente
```

---

## 📁 Estructura del repositorio

```txt
aprende-pic18/
├── astro.config.mjs          # Configuración Astro + Starlight + sidebar
├── vercel.json               # Configuración de despliegue en Vercel
├── PLANIFICACION.md          # Plan maestro del proyecto
├── public/
│   └── images/               # Diagramas SVG del curso
├── src/
│   ├── components/           # Componentes Astro reutilizables
│   ├── content/docs/         # Contenido del curso (ES en raíz, EN en /en/)
│   └── styles/custom.css     # Tema visual (navy + amber)
└── scripts/                  # Scripts de generación de contenido
```

---

## 🌍 Despliegue

El sitio está configurado para desplegarse en **Vercel** con dominio en el ecosistema **CALETAS**:

| | |
|---|---|
| **Dominio** | [pic18.caleta.top](https://pic18.caleta.top) |
| **Plataforma** | Vercel (sitio estático) |
| **Build command** | `npm run build` |
| **Output** | `dist/` |

Para conectar tu fork en Vercel: importa el repositorio, deja la detección automática de Astro y agrega el dominio personalizado en *Settings → Domains*.

---

## 🎓 Fuentes académicas

El contenido pedagógico se basa en el curso de **Microcontroladores** de la **Ingeniería Mecatrónica** de la **Universidad Nacional Experimental Politécnica Antonio José de Sucre (UNEXPO)**, incluyendo:

- Temas teóricos (conceptos básicos, arquitectura, interrupciones, timers, CCP/PWM, CAD, comunicación serial)
- Prácticas de laboratorio 1–8
- Ejercicios tipo parcial
- Datasheet **PIC18F4550** / PIC18LF4455

> Los PDFs originales del curso **no se incluyen** en este repositorio por derechos de autor. El sitio web es una reinterpretación educativa del material.

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Algunas ideas:

- Mejorar explicaciones o corregir errores técnicos
- Agregar diagramas extraídos de fuentes con permiso
- Traducir o pulir contenido en inglés
- Nuevos ejercicios tipo parcial con solución explicada
- Capturas de simulaciones Proteus

1. Haz fork del repositorio
2. Crea una rama: `git checkout -b feature/mi-mejora`
3. Commit: `git commit -m "Describe tu cambio"`
4. Push y abre un Pull Request

Por favor mantén el tono **académico, claro y didáctico**, coherente con el estilo del curso.

---

## 👥 Ecosistema

<table>
  <tr>
    <td align="center" width="33%">
      <strong>zackness</strong><br />
      <sub>Desarrollo de la plataforma web</sub><br /><br />
      <a href="https://zackness.pages.dev">zackness.pages.dev</a>
    </td>
    <td align="center" width="33%">
      <strong>StartupVen</strong><br />
      <sub>Mantenimiento y despliegue</sub><br /><br />
      <a href="https://startupven.com">startupven.com</a>
    </td>
    <td align="center" width="33%">
      <strong>CALETAS</strong><br />
      <sub>Ecosistema educativo</sub><br /><br />
      <a href="https://caleta.top">caleta.top</a>
    </td>
  </tr>
</table>

---

## 📄 Licencia

El **código fuente** de este repositorio (Astro, componentes, estilos y scripts) se publica bajo la licencia [MIT](LICENSE).

El contenido didáctico derivado del curso universitario pertenece al contexto académico de UNEXPO. Si reutilizas material, cita la fuente académica (**Microcontroladores**, **Ing. Mecatrónica**, **UNEXPO**) cuando corresponda.

---

<div align="center">

<br />

**Hecho con dedicación para estudiantes de ingeniería que quieren entender el PIC de verdad.**

⭐ Si este proyecto te ayudó a estudiar, considera darle una estrella en GitHub.

<br />

[AprendePIC18](https://pic18.caleta.top) · [CALETAS](https://caleta.top) · [StartupVen](https://startupven.com)

</div>
