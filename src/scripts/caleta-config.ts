/** Origen publico de CALETAS (login OAuth, suscripciones, enlaces). */
export const CALETA_ORIGIN =
	import.meta.env.PUBLIC_CALETA_URL?.replace(/\/$/, '') || 'https://caleta.top';

/** Origen de AprendePIC18 (callback OAuth). */
export const SITE_ORIGIN =
	typeof window !== 'undefined' ? window.location.origin : 'https://pic18.caleta.top';

const PROD_PIC18_HOST = 'pic18.caleta.top';

/**
 * Origen para fetch() a /api/aprende-pic18/*.
 * En produccion usamos el mismo dominio (proxy en vercel.json) porque caleta.top
 * no incluye pic18.caleta.top en Access-Control-Allow-Origin del preflight OPTIONS.
 */
export function getCaletaApiOrigin(): string {
	if (typeof window === 'undefined') return CALETA_ORIGIN;
	if (window.location.hostname === PROD_PIC18_HOST) {
		return window.location.origin;
	}
	return CALETA_ORIGIN;
}
