import { getSkillSeries } from '../data/skill-tutorials/index';
import { getTutorialSteps } from '../data/tutorial-steps';
import { practiceTutorials } from '../data/tutorials';

export const STORAGE_STUDY_PATH = 'aprende-pic18-study-path';
export const STORAGE_PROGRESS = 'aprende-pic18-progress-local';
export const STORAGE_CHECKLISTS = 'aprende-pic18-checklists';
export const STORAGE_SKILL_GUIDES = 'aprende-pic18-skill-guides';

function loadJson(key: string): Record<string, unknown> {
	try {
		return JSON.parse(localStorage.getItem(key) || '{}');
	} catch {
		return {};
	}
}

export function loadStudyPath(): Record<string, boolean> {
	return loadJson(STORAGE_STUDY_PATH) as Record<string, boolean>;
}

export function saveStudyPath(data: Record<string, boolean>) {
	localStorage.setItem(STORAGE_STUDY_PATH, JSON.stringify(data));
	window.dispatchEvent(new CustomEvent('aprende-checklist-update'));
}

export function loadQuizzes(): Record<string, { passed?: boolean; score?: number }> {
	const progress = loadJson(STORAGE_PROGRESS) as { quizzes?: Record<string, { passed?: boolean; score?: number }> };
	return progress.quizzes || {};
}

export function isSkillSeriesComplete(seriesId: string): boolean {
	const series = getSkillSeries(seriesId);
	if (!series || series.steps.length === 0) return false;
	const saved = loadJson(STORAGE_SKILL_GUIDES) as Record<string, boolean>;
	return series.steps.every((step) => saved[`${seriesId}/${step.id}`]);
}

export function isPracticeTutorialComplete(slug: string): boolean {
	const tutorial = practiceTutorials.find((p) => p.slug === slug);
	if (!tutorial) return false;
	const steps = getTutorialSteps(tutorial);
	if (steps.length === 0) return false;
	const checklists = loadJson(STORAGE_CHECKLISTS) as Record<string, Record<string, boolean>>;
	const checklist = checklists[`practice-${slug}`];
	if (!checklist) return false;
	return steps.every((_, index) => checklist[String(index)] || checklist[index]);
}

export function initStudyPath() {
	const root = document.querySelector('[data-study-path]');
	if (!root || root.getAttribute('data-progress-bound') === '1') return;
	root.setAttribute('data-progress-bound', '1');

	const isEn = root.getAttribute('data-locale') === 'en';
	const inputs = root.querySelectorAll<HTMLInputElement>('.study-path__check');
	const globalPct = root.querySelector('[data-global-pct]');
	const globalFill = root.querySelector<HTMLElement>('[data-global-fill]');
	const resetBtn = root.querySelector('[data-reset-path]');

	function applyAutoProgress(data: Record<string, boolean>) {
		let changed = false;
		inputs.forEach((input) => {
			if (input.disabled) return;
			const id = input.getAttribute('data-lesson-id');
			if (!id) return;

			const skillSeries = input.getAttribute('data-skill-series');
			const practiceSlug = input.getAttribute('data-practice-slug');
			let autoDone = false;

			if (skillSeries && isSkillSeriesComplete(skillSeries)) autoDone = true;
			if (practiceSlug && isPracticeTutorialComplete(practiceSlug)) autoDone = true;

			if (autoDone && !input.checked) {
				input.checked = true;
				data[id] = true;
				changed = true;
			}
		});
		return changed;
	}

	function applyQuizProgress() {
		const quizzes = loadQuizzes();
		inputs.forEach((input) => {
			const quizSlug = input.getAttribute('data-quiz-slug');
			if (!quizSlug) return;
			const result = quizzes[quizSlug];
			const badge = input.closest('.study-path__lesson')?.querySelector('[data-quiz-badge]');
			if (result?.passed) {
				input.checked = true;
				input.disabled = true;
				if (badge) {
					badge.textContent = isEn ? 'Passed' : 'Aprobado';
					badge.classList.add('study-path__quiz-badge--passed');
				}
			} else if (result?.score) {
				if (badge) {
					badge.textContent = `${result.score}%`;
					badge.classList.add('study-path__quiz-badge--attempt');
				}
			}
		});
	}

   function syncQuizToStorage() {
		const quizzes = loadQuizzes();
		const data = loadStudyPath();
		let changed = false;
		inputs.forEach((input) => {
			const quizSlug = input.getAttribute('data-quiz-slug');
			const id = input.getAttribute('data-lesson-id');
			if (!quizSlug || !id) return;
			if (quizzes[quizSlug]?.passed && !data[id]) {
				data[id] = true;
				changed = true;
			}
		});
		if (changed) saveStudyPath(data);
	}

	function updateUI() {
		const total = inputs.length;
		const done = [...inputs].filter((i) => i.checked).length;
		const pct = total ? Math.round((done / total) * 100) : 0;

		if (globalPct) globalPct.textContent = `${pct}%`;
		if (globalFill) globalFill.style.width = `${pct}%`;

		root.querySelectorAll('[data-course]').forEach((courseEl) => {
			const courseInputs = courseEl.querySelectorAll('.study-path__check');
			const courseDone = [...courseInputs].filter((i) => i.checked).length;
			const courseTotal = courseInputs.length;
			const coursePct = courseTotal ? Math.round((courseDone / courseTotal) * 100) : 0;
			const badge = courseEl.querySelector('[data-course-pct]');
			if (badge) badge.textContent = `${coursePct}%`;
			courseEl.classList.toggle('study-path__course--done', coursePct === 100 && courseTotal > 0);
		});

		inputs.forEach((input) => {
			const row = input.closest('.study-path__lesson');
			if (row) row.classList.toggle('study-path__lesson--done', input.checked);
		});
	}

	function refresh() {
		const data = loadStudyPath();
		if (applyAutoProgress(data)) saveStudyPath(data);
		applyQuizProgress();
		syncQuizToStorage();
		updateUI();
	}

	const saved = loadStudyPath();
	inputs.forEach((input) => {
		const id = input.getAttribute('data-lesson-id');
		if (id && saved[id]) input.checked = true;
		input.addEventListener('change', () => {
			if (input.disabled) return;
			const lessonId = input.getAttribute('data-lesson-id');
			if (!lessonId) return;
			const data = loadStudyPath();
			data[lessonId] = input.checked;
			saveStudyPath(data);
			updateUI();
		});
	});

	refresh();

	const onExternalUpdate = () => refresh();
	window.addEventListener('aprende-quiz-complete', onExternalUpdate);
	window.addEventListener('aprende-auth-change', onExternalUpdate);
	window.addEventListener('aprende-checklist-update', onExternalUpdate);
	window.addEventListener('aprende-skill-guide-update', onExternalUpdate);
	window.addEventListener('aprende-progress-sync', onExternalUpdate);

	resetBtn?.addEventListener('click', () => {
		const msg = isEn
			? 'Reset all course progress? Manual checks, guides, and tutorials will need to be marked again (passed exams stay approved).'
			: 'Reiniciar todo el progreso del curso? Tendras que volver a marcar lecciones, guias y tutoriales (los examenes aprobados siguen aprobados).';
		if (!confirm(msg)) return;
		localStorage.removeItem(STORAGE_STUDY_PATH);
		inputs.forEach((i) => {
			if (!i.disabled) i.checked = false;
		});
		refresh();
	});
}
