import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import config from 'virtual:starlight/user-config';
import { getStudyPathPagination } from './data/study-path-navigation';
import { parseSkillTutorialStep } from './data/skill-tutorials';

export const onRequest = defineRouteMiddleware(async (context, next) => {
	await next();

	const route = context.locals.starlightRoute;
	if (!route?.hasSidebar) return;

	const studyPathPagination = getStudyPathPagination(
		context.url.pathname,
		route.locale,
		config.pagination,
	);

	if (studyPathPagination) {
		route.pagination = studyPathPagination;
	}

	// Panel derecho con rastreador: sin TOC de pagina en pasos de guia.
	const skillStep = parseSkillTutorialStep(context.url.pathname);
	if (skillStep) {
		route.toc = { minHeadingLevel: 2, maxHeadingLevel: 3, items: [] };
	}
});
