/**
 * Borradores y progreso del laboratorio (localStorage).
 */

const PREFIX = 'aprende-pic18-lab';

export function labKey(slug: string, part: string): string {
	return `${PREFIX}-${slug.replace(/\//g, '-')}-${part}`;
}

export function loadText(key: string): string {
	try {
		return localStorage.getItem(key) || '';
	} catch {
		return '';
	}
}

export function saveText(key: string, value: string): void {
	try {
		localStorage.setItem(key, value);
	} catch {
		/* ignore */
	}
}

export function loadBool(key: string): boolean {
	try {
		return localStorage.getItem(key) === '1';
	} catch {
		return false;
	}
}

export function saveBool(key: string, value: boolean): void {
	try {
		localStorage.setItem(key, value ? '1' : '0');
	} catch {
		/* ignore */
	}
}

export const MIN_PSEUDO_CHARS = 80;
export const MIN_FLOW_CHARS = 60;
export const MIN_ANSWER_CHARS = 50;
