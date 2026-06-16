/**
 * Descarga de codigo fuente AprendePIC18 — requiere JWT + suscripcion activa en CALETAS.
 */
import { buildLoginUrl, getToken, isLoggedIn } from './caleta-auth';

const CALETA_ORIGIN =
	import.meta.env.PUBLIC_CALETA_URL?.replace(/\/$/, '') || 'https://caleta.top';

export type DownloadAccessReason = 'login_required' | 'no_subscription' | 'ok';

export type DownloadAccess = {
	authenticated: boolean;
	canDownload: boolean;
	reason: DownloadAccessReason;
	planName?: string | null;
};

export async function fetchDownloadAccess(): Promise<DownloadAccess> {
	if (!isLoggedIn()) {
		return { authenticated: false, canDownload: false, reason: 'login_required' };
	}

	const token = getToken();
	const res = await fetch(`${CALETA_ORIGIN}/api/aprende-pic18/downloads/access`, {
		headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
		redirect: 'manual',
	});

	if (res.type === 'opaqueredirect' || res.status === 301 || res.status === 302 || res.status === 307) {
		throw new Error('caleta_api_redirect');
	}

	if (res.status === 401) {
		return { authenticated: false, canDownload: false, reason: 'login_required' };
	}

	const contentType = res.headers.get('content-type') ?? '';
	if (!res.ok || !contentType.includes('application/json')) {
		throw new Error(`download_access: ${res.status}`);
	}

	const data = (await res.json()) as DownloadAccess;
	return data;
}

export async function downloadLabSource(slug: string, filename: string): Promise<void> {
	const token = getToken();
	if (!token) {
		window.location.href = buildLoginUrl();
		return;
	}

	const res = await fetch(`${CALETA_ORIGIN}/api/aprende-pic18/downloads/${slug}`, {
		headers: { Authorization: `Bearer ${token}` },
		redirect: 'manual',
	});

	if (res.type === 'opaqueredirect' || res.status === 301 || res.status === 302 || res.status === 307) {
		throw new Error('caleta_api_redirect');
	}

	if (res.status === 401) {
		window.location.href = buildLoginUrl();
		return;
	}

	if (!res.ok) {
		const err = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
		throw new Error(err.error || 'download_failed');
	}

	const blob = await res.blob();
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}

export function subscriptionPlansUrl(): string {
	return `${CALETA_ORIGIN}/suscripcion`;
}
