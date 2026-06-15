import fs from 'node:fs';
import path from 'node:path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const DOCS = path.join(process.cwd(), 'docs');
const files = fs.readdirSync(DOCS).filter((f) => f.toLowerCase().endsWith('.pdf'));

for (const file of files) {
	const data = new Uint8Array(fs.readFileSync(path.join(DOCS, file)));
	const pdf = await getDocument({ data }).promise;
	let hits = 0;
	for (let p = 1; p <= Math.min(pdf.numPages, 30); p++) {
		const page = await pdf.getPage(p);
		const content = await page.getTextContent();
		const text = content.items.map((i) => i.str).join(' ');
		if (/\b(SPI|I2C|MSSP|SDI|SDA)\b/i.test(text)) {
			console.log(`${file} p${p}: ${text.slice(0, 120).replace(/\s+/g, ' ')}...`);
			hits++;
			if (hits >= 2) break;
		}
	}
}
