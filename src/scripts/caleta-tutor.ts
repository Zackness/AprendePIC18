/**
 * Tutor IA de AprendePIC18 — proxy privado hacia CALETAS (JWT + plan con chat).
 */

import { buildLoginUrl, getToken, isLoggedIn } from './caleta-auth';
import { CALETA_ORIGIN, getCaletaApiOrigin } from './caleta-config';

export type TutorMessage = {
	role: 'user' | 'assistant';
	content: string;
};

export type TutorAccessResponse = {
	authenticated: boolean;
	canUseTutor: boolean;
	reason: 'login_required' | 'no_subscription' | 'plan_no_chat' | 'ok';
	planName?: string | null;
};

export type TutorChatResponse = {
	message: string;
	planName?: string | null;
};

function authHeaders(): HeadersInit {
	const token = getToken();
	return {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
}

export async function fetchTutorAccess(): Promise<TutorAccessResponse> {
	const res = await fetch(`${getCaletaApiOrigin()}/api/aprende-pic18/tutor/access`, {
		method: 'GET',
		headers: authHeaders(),
		redirect: 'manual',
	});

	if (res.type === 'opaqueredirect' || res.status === 301 || res.status === 302 || res.status === 307) {
		throw new Error('caleta_api_redirect');
	}

	if (res.status === 401) {
		return { authenticated: false, canUseTutor: false, reason: 'login_required' };
	}

	const contentType = res.headers.get('content-type') ?? '';
	if (!res.ok || !contentType.includes('application/json')) {
		throw new Error(`Tutor access: ${res.status}`);
	}

	return res.json();
}

export async function sendTutorMessage(payload: {
	messages: TutorMessage[];
	pageContext?: string;
}): Promise<TutorChatResponse> {
	if (!isLoggedIn()) {
		throw new Error('login_required');
	}

	const res = await fetch(`${getCaletaApiOrigin()}/api/aprende-pic18/tutor/chat`, {
		method: 'POST',
		headers: authHeaders(),
		body: JSON.stringify(payload),
	});

	const data = await res.json().catch(() => ({}));

	if (!res.ok) {
		const err = new Error(data?.error || `Tutor chat: ${res.status}`) as Error & {
			code?: string;
			planName?: string;
		};
		err.code = data?.code;
		err.planName = data?.planName;
		throw err;
	}

	return data;
}

export function buildTutorSubscribeUrl(): string {
	return `${CALETA_ORIGIN}/suscripcion`;
}

export function buildTutorLoginUrl(): string {
	return buildLoginUrl();
}

export function getPageContextForTutor(): string {
	if (typeof document === 'undefined') return '';
	const title = document.querySelector('h1')?.textContent?.trim() || document.title;
	const path = window.location.pathname;
	return `${title} (${path})`;
}

const STORAGE_MESSAGES = 'aprende-pic18-tutor-messages';

export function loadTutorMessages(): TutorMessage[] {
	try {
		const raw = localStorage.getItem(STORAGE_MESSAGES);
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed.slice(-40) : [];
	} catch {
		return [];
	}
}

export function saveTutorMessages(messages: TutorMessage[]) {
	try {
		localStorage.setItem(STORAGE_MESSAGES, JSON.stringify(messages.slice(-40)));
	} catch {
		/* ignore */
	}
}

export function clearTutorMessages() {
	try {
		localStorage.removeItem(STORAGE_MESSAGES);
	} catch {
		/* ignore */
	}
}
