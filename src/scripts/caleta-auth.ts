/**
 * Cliente de autenticacion y progreso CALETAS para AprendePIC18.
 * Flujo similar a Zeno Notes: redirect a caleta.top → callback con token JWT.
 */

import { isQuizAuthRequired } from '../data/quizzes';
import { studyPathCourses } from '../data/study-path';
import { hrefToQuizSlug } from '../data/quizzes';
import { getSkillSeries } from '../data/skill-tutorials/index';
import { practiceTutorials } from '../data/tutorials';
import { getTutorialSteps } from '../data/tutorial-steps';
import { CALETA_ORIGIN, SITE_ORIGIN, getCaletaApiOrigin } from './caleta-config';

const STORAGE_TOKEN = 'aprende-pic18-caleta-token';
const STORAGE_USER = 'aprende-pic18-caleta-user';
const STORAGE_PROGRESS = 'aprende-pic18-progress-local';
const STORAGE_CHECKLISTS = 'aprende-pic18-checklists';
const STORAGE_STUDY_PATH = 'aprende-pic18-study-path';
const STORAGE_SKILL_GUIDES = 'aprende-pic18-skill-guides';

export type CaletaUser = { id: string; email: string; name: string };
export type QuizResult = {
	score: number;
	passed: boolean;
	correct: number;
	total: number;
	at?: string;
	/** Indice de opcion elegida por pregunta (-1 si no respondida). */
	answers?: number[];
};

function notifyProgressSync() {
	if (typeof window !== 'undefined') {
		window.dispatchEvent(new CustomEvent('aprende-progress-sync'));
	}
}

export function getToken(): string | null {
	try {
		return localStorage.getItem(STORAGE_TOKEN);
	} catch {
		return null;
	}
}

export function getUser(): CaletaUser | null {
	try {
		const raw = localStorage.getItem(STORAGE_USER);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

export function isLoggedIn(): boolean {
	return Boolean(getToken() && getUser()?.id);
}

function buildConnectUrl(returnPath?: string): string {
	const redirectUri = `${SITE_ORIGIN}/auth/callback`;
	const state = btoa(
		JSON.stringify({
			returnTo: returnPath || window.location.pathname + window.location.search,
			nonce: crypto.randomUUID(),
		}),
	);
	const params = new URLSearchParams({
		redirect_uri: redirectUri,
		state,
	});
	return `${CALETA_ORIGIN}/aprende-pic18/connect?${params}`;
}

export function buildLoginUrl(returnPath?: string): string {
	return buildConnectUrl(returnPath);
}

/** OAuth directo (Google) con retorno al flujo connect de AprendePIC18 */
export function buildCaletaSocialLoginUrl(provider: 'google', returnPath?: string): string {
	const callbackURL = encodeURIComponent(buildConnectUrl(returnPath));
	return `${CALETA_ORIGIN}/api/auth/sign-in/social/${provider}?callbackURL=${callbackURL}`;
}

/** Login CALETAS (email u otros proveedores en la pagina de acceso) */
export function buildCaletaLoginPageUrl(returnPath?: string): string {
	const connectUrl = buildConnectUrl(returnPath);
	return `${CALETA_ORIGIN}/login?callbackUrl=${encodeURIComponent(connectUrl)}`;
}

export function logout() {
	localStorage.removeItem(STORAGE_TOKEN);
	localStorage.removeItem(STORAGE_USER);
	window.dispatchEvent(new CustomEvent('aprende-auth-change'));
}

function setSession(token: string, user: CaletaUser) {
	localStorage.setItem(STORAGE_TOKEN, token);
	localStorage.setItem(STORAGE_USER, JSON.stringify(user));
	window.dispatchEvent(new CustomEvent('aprende-auth-change'));
}

function loadLocalProgress(): Record<string, unknown> {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_PROGRESS) || '{}');
	} catch {
		return {};
	}
}

function saveLocalProgress(data: Record<string, unknown>) {
	localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(data));
}

function normalizeQuizSlug(slug: string): string {
	return slug.trim().replace(/^\/+|\/+$/g, '').replace(/^en\//, '').replace(/\/basico$/i, '');
}

function isQuizPassedForLesson(
	quizzes: Record<string, QuizResult>,
	lessonQuizSlug: string | undefined,
): boolean {
	if (!lessonQuizSlug) return false;
	const target = normalizeQuizSlug(lessonQuizSlug);
	return Object.entries(quizzes).some(([key, value]) => {
		if (!value?.passed) return false;
		const normalized = normalizeQuizSlug(key);
		return (
			normalized === target ||
			normalized.startsWith(`${target}/`) ||
			target.startsWith(`${normalized}/`)
		);
	});
}

function isPracticeComplete(
	checklists: Record<string, Record<string, boolean>>,
	slug: string,
): boolean {
	const tutorial = practiceTutorials.find((p) => p.slug === slug);
	if (!tutorial) return false;
	const steps = getTutorialSteps(tutorial);
	if (steps.length === 0) return false;
	const checklist = checklists[`practice-${slug}`];
	if (!checklist) return false;
	return steps.every((_, index) => checklist[String(index)] || checklist[index]);
}

function isSkillSeriesCompleteLocal(
	skillGuides: Record<string, boolean>,
	seriesId: string,
): boolean {
	const series = getSkillSeries(seriesId);
	if (!series || series.steps.length === 0) return false;
	return series.steps.every((step) => skillGuides[`${seriesId}/${step.id}`]);
}

function expandStudyPathForSync(
	studyPath: Record<string, boolean>,
	quizzes: Record<string, QuizResult>,
	checklists: Record<string, Record<string, boolean>>,
	skillGuides: Record<string, boolean>,
): Record<string, boolean> {
	const expanded = { ...studyPath };

	for (const course of studyPathCourses) {
		for (const lesson of course.lessons) {
			const quizSlug = hrefToQuizSlug(lesson.hrefEs);
			if (isQuizPassedForLesson(quizzes, quizSlug)) expanded[lesson.id] = true;
			if (lesson.autoPracticeSlug && isPracticeComplete(checklists, lesson.autoPracticeSlug)) {
				expanded[lesson.id] = true;
			}
			if (lesson.autoSkillSeries && isSkillSeriesCompleteLocal(skillGuides, lesson.autoSkillSeries)) {
				expanded[lesson.id] = true;
			}
		}
	}

	return expanded;
}

function buildFullProgressPayload(): Record<string, unknown> {
	const progress = loadLocalProgress();
	const checklists = JSON.parse(localStorage.getItem(STORAGE_CHECKLISTS) || '{}') as Record<
		string,
		Record<string, boolean>
	>;
	const skillGuides = JSON.parse(localStorage.getItem(STORAGE_SKILL_GUIDES) || '{}') as Record<
		string,
		boolean
	>;
	const quizzes = (progress.quizzes as Record<string, QuizResult> | undefined) || {};
	const studyPath = expandStudyPathForSync(
		JSON.parse(localStorage.getItem(STORAGE_STUDY_PATH) || '{}') as Record<string, boolean>,
		quizzes,
		checklists,
		skillGuides,
	);

	localStorage.setItem(STORAGE_STUDY_PATH, JSON.stringify(studyPath));

	return {
		...progress,
		checklists,
		skillGuides,
		studyPath,
	};
}

function hasLocalProgressData(): boolean {
	const progress = loadLocalProgress();
	const checklists = JSON.parse(localStorage.getItem(STORAGE_CHECKLISTS) || '{}');
	const studyPath = JSON.parse(localStorage.getItem(STORAGE_STUDY_PATH) || '{}');
	return (
		Object.keys(progress).length > 0 ||
		Object.keys(checklists).length > 0 ||
		Object.keys(studyPath).length > 0
	);
}

let hydratePromise: Promise<boolean> | null = null;

/** Descarga progreso de CALETAS y lo fusiona en localStorage. Resuelve true si hubo respuesta valida. */
export function hydrateProgressFromCaleta(): Promise<boolean> {
	if (!isLoggedIn()) return Promise.resolve(false);
	if (!hydratePromise) {
		hydratePromise = fetchProgressFromCaleta()
			.then((data) => data !== null)
			.catch(() => false)
			.finally(() => {
				hydratePromise = null;
			});
	}
	return hydratePromise;
}

/** Sube cambios locales a CALETAS (p. ej. al marcar lecciones o checklists). */
export function scheduleProgressSync() {
	if (!isLoggedIn()) return;
	syncProgressToCaleta(buildFullProgressPayload()).catch(() => {});
}

export function saveQuizResult(slug: string, result: QuizResult) {
	if (isQuizAuthRequired(slug) && !isLoggedIn()) return;

	const data = loadLocalProgress();
	if (!data.quizzes) data.quizzes = {};
	(data.quizzes as Record<string, QuizResult>)[slug] = {
		...result,
		at: new Date().toISOString(),
	};
	saveLocalProgress(data);
	notifyProgressSync();

	if (isLoggedIn()) {
		syncProgressToCaleta(buildFullProgressPayload())
			.then(() => notifyProgressSync())
			.catch(() => {});
	}
}

export function getQuizResult(slug: string): QuizResult | null {
	const data = loadLocalProgress();
	const quizzes = data.quizzes as Record<string, QuizResult> | undefined;
	return quizzes?.[slug] ?? null;
}

export async function syncProgressToCaleta(payload?: Record<string, unknown>) {
	const token = getToken();
	if (!token) return null;

	const body = payload ?? buildFullProgressPayload();

	const res = await fetch(`${getCaletaApiOrigin()}/api/aprende-pic18/progress`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		},
		redirect: 'manual',
		body: JSON.stringify({ payload: body }),
	});

	if (res.type === 'opaqueredirect' || res.status === 301 || res.status === 302 || res.status === 307) {
		throw new Error('caleta_api_redirect');
	}

	if (!res.ok) throw new Error('sync failed');
	return res.json();
}

export async function fetchProgressFromCaleta() {
	const token = getToken();
	if (!token) return null;

	const res = await fetch(`${getCaletaApiOrigin()}/api/aprende-pic18/progress`, {
		headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
		redirect: 'manual',
	});

	if (res.type === 'opaqueredirect' || res.status === 301 || res.status === 302 || res.status === 307) {
		return null;
	}

	if (!res.ok) return null;
	const contentType = res.headers.get('content-type') ?? '';
	if (!contentType.includes('application/json')) return null;

	const data = await res.json();
	if (data?.payload) {
		mergeRemoteProgress(data.payload);
		notifyProgressSync();
	}
	return data;
}

function mergeRemoteProgress(remote: Record<string, unknown>) {
	const local = loadLocalProgress();
	const merged: Record<string, unknown> = { ...remote, ...local };

	const remoteQuizzes = (remote.quizzes as Record<string, QuizResult> | undefined) || {};
	const localQuizzes = (local.quizzes as Record<string, QuizResult> | undefined) || {};
	if (Object.keys(remoteQuizzes).length || Object.keys(localQuizzes).length) {
		merged.quizzes = { ...remoteQuizzes, ...localQuizzes };
	}

	saveLocalProgress(merged);
	notifyProgressSync();

	const localChecklists = JSON.parse(localStorage.getItem(STORAGE_CHECKLISTS) || '{}');
	const remoteChecklists = (remote.checklists as Record<string, unknown>) || {};
	localStorage.setItem(
		STORAGE_CHECKLISTS,
		JSON.stringify({ ...remoteChecklists, ...localChecklists }),
	);

	const localStudyPath = JSON.parse(localStorage.getItem(STORAGE_STUDY_PATH) || '{}');
	const remoteStudyPath = (remote.studyPath as Record<string, unknown>) || {};
	localStorage.setItem(
		STORAGE_STUDY_PATH,
		JSON.stringify({ ...remoteStudyPath, ...localStudyPath }),
	);
}

/** Sube progreso local (quizzes opcionales, ruta, checklists) a CALETAS tras iniciar sesion */
export async function pushLocalProgressToCaleta() {
	if (!isLoggedIn()) return null;

	const fetched = await hydrateProgressFromCaleta();
	if (!fetched && !hasLocalProgressData()) return null;

	return syncProgressToCaleta(buildFullProgressPayload());
}

export function handleAuthCallback() {
	const params = new URLSearchParams(window.location.search);
	const token = params.get('token');
	const userId = params.get('userId');
	const email = params.get('email');
	const name = params.get('name');
	const state = params.get('state');

	if (!token || !userId) return null;

	setSession(token, {
		id: userId,
		email: email || '',
		name: name || 'Estudiante',
	});

	let returnTo = '/';
	if (state) {
		try {
			const decoded = JSON.parse(atob(state));
			if (decoded.returnTo) returnTo = decoded.returnTo;
		} catch {
			/* ignore */
		}
	}

	hydrateProgressFromCaleta()
		.then((fetched) => {
			if (fetched || hasLocalProgressData()) {
				return syncProgressToCaleta(buildFullProgressPayload());
			}
		})
		.finally(() => {
			window.history.replaceState({}, '', returnTo);
			window.location.href = returnTo;
		});

	return returnTo;
}

export function initCaletaAuth() {
	document.querySelectorAll('[data-caleta-login]').forEach((el) => {
		if (el.getAttribute('data-auth-init') === '1') return;
		el.setAttribute('data-auth-init', '1');
		el.addEventListener('click', (e) => {
			e.preventDefault();
			window.location.href = buildLoginUrl();
		});
	});

	document.querySelectorAll('[data-caleta-login-social]').forEach((el) => {
		if (el.getAttribute('data-auth-init') === '1') return;
		el.setAttribute('data-auth-init', '1');
		el.addEventListener('click', (e) => {
			e.preventDefault();
			const provider = el.getAttribute('data-caleta-login-social');
			window.location.href =
				provider === 'google'
					? buildCaletaSocialLoginUrl('google')
					: buildCaletaLoginPageUrl();
		});
	});

	document.querySelectorAll('[data-caleta-logout]').forEach((el) => {
		if (el.getAttribute('data-auth-init') === '1') return;
		el.setAttribute('data-auth-init', '1');
		el.addEventListener('click', (e) => {
			e.preventDefault();
			logout();
		});
	});

	updateAuthUI();

	if (isLoggedIn()) {
		pushLocalProgressToCaleta().catch(() => {});
	}
}

function onAuthChange() {
	updateAuthUI();
	if (isLoggedIn()) {
		pushLocalProgressToCaleta().catch(() => {});
	}
}

function updateAuthUI() {
	const user = getUser();
	const loggedIn = isLoggedIn();

	document.querySelectorAll('[data-caleta-auth]').forEach((root) => {
		const guest = root.querySelector('[data-auth-guest]');
		const authed = root.querySelector('[data-auth-user]');
		const nameEl = root.querySelector('[data-auth-name]');

		if (guest) guest.hidden = loggedIn;
		if (authed) authed.hidden = !loggedIn;
		if (nameEl && user) nameEl.textContent = user.name;
	});
}

if (typeof window !== 'undefined') {
	window.addEventListener('aprende-auth-change', onAuthChange);
	window.addEventListener('aprende-quiz-complete', updateAuthUI);
}
