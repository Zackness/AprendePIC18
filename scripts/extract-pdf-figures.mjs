/**
 * Extrae figuras de PDFs del curso.
 * - Con poppler-utils: pdfimages (solo imagenes embebidas, mas limpio)
 * - Sin poppler: pdf-to-img (renderiza paginas completas)
 *
 * Uso: npm run extract-figures
 * Instalar poppler (opcional): sudo apt install poppler-utils
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { pdf } from 'pdf-to-img';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const OUT = path.join(ROOT, 'public', 'images', 'pdf');

/** @type {Record<string, { file: string; pages: number[]; credit: string; mode?: 'pages' | 'embedded' }>} */
const SOURCES = {
	'practica-1': {
		file: 'Practica 1  Operacion matematia.pdf',
		pages: [1, 2, 3],
		credit: 'Practica 1 — Operaciones matematicas (UNEXPO)',
	},
	'practica-2': {
		file: 'Practica 2  Teclado y  LCD.pdf',
		pages: [1, 2, 3],
		credit: 'Practica 2 — Teclado y LCD (UNEXPO)',
	},
	'practica-3': {
		file: 'Practica 3  Frecuencimetro con  Displays Multiplexado.pdf',
		pages: [1, 2, 3],
		credit: 'Practica 3 — Frecuencimetro (UNEXPO)',
	},
	'practica-7': {
		file: 'Practica 7 Convertidor AD.pdf',
		pages: [1, 2, 3],
		credit: 'Practica 7 — Convertidor AD (UNEXPO)',
	},
	'practica-8': {
		file: 'Practica 8  Comunicacion serial_M3.pdf',
		pages: [1, 2, 3],
		credit: 'Practica 8 — Comunicacion serial (UNEXPO)',
	},
	'motor-paso-a-paso': {
		file: 'Practica 6 Motor Paso a Paso.pdf',
		pages: [1, 2, 3, 4],
		credit: 'Practica 6 — Motor paso a paso (UNEXPO)',
	},
	'spi-i2c': {
		file: 'PIC18LF4455-I-PT.PDF',
		pages: [199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 217, 228],
		credit: 'Microchip PIC18LF4455/4550 Datasheet DS39632E',
	},
	'pinout': {
		file: 'PIC18LF4455-I-PT.PDF',
		pages: [4, 5, 6, 7, 8, 9, 10],
		credit: 'Microchip PIC18LF4455/4550 Datasheet',
	},
	'uart': {
		file: 'Tema 10. Comunicación serial.pdf',
		pages: [7, 9, 10],
		credit: 'Tema 10 — Comunicacion serial (UNEXPO)',
	},
	'lcd-teclado': {
		file: 'Clase Tema 7.1 Modulo LCD y 7.2 Teclado.pdf',
		pages: [1, 2, 3, 4, 5, 6],
		credit: 'Tema 7 — LCD y teclado (UNEXPO)',
	},
	'pwm': {
		file: 'Clase Tema 9. Modulo CCP (PWM).pdf',
		pages: [1, 2, 3, 4, 5],
		credit: 'Tema 9 — Modulo CCP / PWM (UNEXPO)',
		mode: 'embedded',
	},
	'adc': {
		file: 'Tema 9. CAD.pdf',
		pages: [1, 2, 3, 4, 5],
		credit: 'Tema 9 — Convertidor A/D (UNEXPO)',
		mode: 'embedded',
	},
	'tema-2-3': {
		file: 'Clase Tema 2 y 3 (1).pdf',
		pages: [8, 19, 20],
		credit: 'Clase Tema 2 y 3 — Arquitectura del PIC (UNEXPO · Prof. Ing. Yoel Pire)',
	},
	'tema-4-5': {
		file: 'Clase Tema 4 y 5.pdf',
		pages: [6, 7, 8, 9, 10, 11],
		credit: 'Clase Tema 4 y 5 — Retardos y comparaciones (UNEXPO · Prof. Ing. Yoel Pire)',
	},
};

function hasPdfimages() {
	try {
		execSync('which pdfimages', { stdio: 'pipe' });
		return true;
	} catch {
		return false;
	}
}

function getPdfPageCount(pdfPath) {
	try {
		const out = execSync(`pdfinfo "${pdfPath}"`, { encoding: 'utf8' });
		const m = out.match(/Pages:\s+(\d+)/);
		return m ? Number(m[1]) : 0;
	} catch {
		return 0;
	}
}

function extractEmbeddedImages(key, config, pdfPath, outDir) {
	const prefix = path.join(outDir, 'img');
	const result = spawnSync('pdfimages', ['-png', '-p', pdfPath, prefix], {
		encoding: 'utf8',
	});

	if (result.status !== 0) {
		console.warn(`[${key}] pdfimages fallo, usando render de paginas`);
		return null;
	}

	const files = fs
		.readdirSync(outDir)
		.filter((f) => f.startsWith('img-') && f.endsWith('.png'))
		.sort();

	const manifest = [];
	let index = 0;

	for (const file of files) {
		// img-NNN-PPP.png → pagina PPP (1-based)
		const pageMatch = file.match(/-(\d+)\.png$/);
		const page = pageMatch ? Number(pageMatch[1]) + 1 : index + 1;
		if (!config.pages.includes(page)) {
			fs.unlinkSync(path.join(outDir, file));
			continue;
		}

		index += 1;
		const filename = `page-${page}-img-${index}.png`;
		const finalPath = path.join(outDir, filename);
		fs.renameSync(path.join(outDir, file), finalPath);
		const bytes = fs.statSync(finalPath).size;
		const rel = `/images/pdf/${key}/${filename}`;
		manifest.push({ key, page, src: rel, credit: config.credit, bytes, mode: 'embedded' });
		console.log(`[${key}] embedded p${page} -> ${rel} (${Math.round(bytes / 1024)} KB)`);
	}

	return manifest;
}

async function extractPages(key, config, pdfPath, outDir) {
	const doc = await pdf(pdfPath, { scale: 2 });
	const manifest = [];
	let pageIndex = 0;

	for await (const image of doc) {
		pageIndex += 1;
		if (!config.pages.includes(pageIndex)) continue;

		const filename = `page-${pageIndex}.png`;
		const outPath = path.join(outDir, filename);
		fs.writeFileSync(outPath, image);

		const rel = `/images/pdf/${key}/${filename}`;
		manifest.push({
			key,
			page: pageIndex,
			src: rel,
			credit: config.credit,
			bytes: image.length,
			mode: 'page',
		});
		console.log(`[${key}] p${pageIndex} -> ${rel} (${Math.round(image.length / 1024)} KB)`);
	}

	return manifest;
}

async function extractSource(key, config, useEmbedded) {
	const pdfPath = path.join(DOCS, config.file);
	if (!fs.existsSync(pdfPath)) {
		console.warn(`[skip] ${key}: no existe ${config.file}`);
		return [];
	}

	const outDir = path.join(OUT, key);
	fs.mkdirSync(outDir, { recursive: true });

	// Limpiar PNG anteriores de esta fuente
	for (const f of fs.readdirSync(outDir)) {
		if (f.endsWith('.png')) fs.unlinkSync(path.join(outDir, f));
	}

	const wantEmbedded = config.mode === 'embedded' && useEmbedded;
	if (wantEmbedded) {
		const embedded = extractEmbeddedImages(key, config, pdfPath, outDir);
		if (embedded?.length) return embedded;
	}

	return extractPages(key, config, pdfPath, outDir);
}

const usePdfimages = hasPdfimages();
console.log(
	usePdfimages
		? 'poppler-utils detectado: se intentara pdfimages en fuentes mode=embedded'
		: 'poppler-utils no instalado: render con pdf-to-img (sudo apt install poppler-utils para pdfimages)',
);

const allManifest = [];
for (const [key, config] of Object.entries(SOURCES)) {
	allManifest.push(...(await extractSource(key, config, usePdfimages)));
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(allManifest, null, 2));
console.log(`\nListo: ${allManifest.length} imagenes en public/images/pdf/`);
