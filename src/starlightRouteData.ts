import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import config from 'virtual:starlight/user-config';
import { getStudyPathPagination } from './data/study-path-navigation';

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
});
