// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { buildStudyPathSidebar } from './src/data/study-path-navigation.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://pic18.caleta.top',
	redirects: {
		'/practicas/primer-led': '/tutoriales/primer-led',
		'/practicas/operaciones-matematicas': '/tutoriales/practica-1',
		'/practicas/teclado-lcd': '/tutoriales/practica-2',
		'/practicas/frecuencimetro': '/tutoriales/practica-3',
		'/practicas/motor-paso-a-paso': '/tutoriales/practica-6',
		'/practicas/convertidor-ad': '/tutoriales/practica-7',
		'/practicas/comunicacion-serial': '/tutoriales/practica-8',
		'/en/practicas/primer-led': '/en/tutoriales/primer-led',
		'/en/practicas/operaciones-matematicas': '/en/tutoriales/practica-1',
		'/en/practicas/teclado-lcd': '/en/tutoriales/practica-2',
		'/en/practicas/frecuencimetro': '/en/tutoriales/practica-3',
		'/en/practicas/motor-paso-a-paso': '/en/tutoriales/practica-6',
		'/en/practicas/convertidor-ad': '/en/tutoriales/practica-7',
		'/en/practicas/comunicacion-serial': '/en/tutoriales/practica-8',
		'/tutoriales/guias/puertos/1-esqueleto': '/tutoriales/guias/puertos/4-estructura-sandwich',
		'/tutoriales/guias/puertos/1-tris-direccion': '/tutoriales/guias/puertos/5-tris-direccion',
		'/tutoriales/guias/puertos/2-tris-direccion': '/tutoriales/guias/puertos/5-tris-direccion',
		'/tutoriales/guias/puertos/2-lat-salidas': '/tutoriales/guias/puertos/7-lat-salidas',
		'/tutoriales/guias/puertos/3-lat-salidas': '/tutoriales/guias/puertos/7-lat-salidas',
		'/tutoriales/guias/puertos/3-port-entradas': '/tutoriales/guias/puertos/8-port-entradas',
		'/tutoriales/guias/puertos/4-port-entradas': '/tutoriales/guias/puertos/8-port-entradas',
		'/tutoriales/guias/puertos/4-resumen': '/tutoriales/guias/puertos/9-programa-completo',
		'/tutoriales/guias/puertos/5-programa-completo': '/tutoriales/guias/puertos/9-programa-completo',
		'/tutoriales/guias/puertos/6-comprueba': '/tutoriales/guias/puertos/10-comprueba',
		'/en/tutoriales/guias/puertos/1-esqueleto': '/en/tutoriales/guias/puertos/4-estructura-sandwich',
		'/en/tutoriales/guias/puertos/1-tris-direccion': '/en/tutoriales/guias/puertos/5-tris-direccion',
		'/en/tutoriales/guias/puertos/2-tris-direccion': '/en/tutoriales/guias/puertos/5-tris-direccion',
		'/en/tutoriales/guias/puertos/2-lat-salidas': '/en/tutoriales/guias/puertos/7-lat-salidas',
		'/en/tutoriales/guias/puertos/3-lat-salidas': '/en/tutoriales/guias/puertos/7-lat-salidas',
		'/en/tutoriales/guias/puertos/3-port-entradas': '/en/tutoriales/guias/puertos/8-port-entradas',
		'/en/tutoriales/guias/puertos/4-port-entradas': '/en/tutoriales/guias/puertos/8-port-entradas',
		'/en/tutoriales/guias/puertos/4-resumen': '/en/tutoriales/guias/puertos/9-programa-completo',
		'/en/tutoriales/guias/puertos/5-programa-completo': '/en/tutoriales/guias/puertos/9-programa-completo',
		'/en/tutoriales/guias/puertos/6-comprueba': '/en/tutoriales/guias/puertos/10-comprueba',
	},
	integrations: [
		starlight({
			title: 'AprendePIC18',
			description:
				'Curso y documentacion bilingue para aprender el PIC18F4550 en ensamblador, MPLAB, Proteus y placa fisica. Mantenido por StartupVen, ecosistema CALETAS.',
			locales: {
				root: {
					label: 'Espanol',
					lang: 'es',
				},
				en: {
					label: 'English',
				},
			},
			customCss: ['./src/styles/custom.css'],
			routeMiddleware: ['./src/starlightRouteData.ts'],
			components: {
				Head: './src/components/Head.astro',
				Header: './src/components/Header.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				Footer: './src/components/Footer.astro',
				Sidebar: './src/components/Sidebar.astro',
				SocialIcons: './src/components/SocialIcons.astro',
				PageSidebar: './src/components/PageSidebar.astro',
				PageTitle: './src/components/PageTitle.astro',
				TwoColumnContent: './src/components/TwoColumnContent.astro',
			},
			social: [
				{ icon: 'github', label: 'zackness', href: 'https://github.com/zackness' },
				{ icon: 'instagram', label: 'zackness_ofc', href: 'https://instagram.com/zackness_ofc' },
				{ icon: 'tiktok', label: 'zackness_ofc', href: 'https://tiktok.com/@zackness_ofc' },
				{ icon: 'external', label: 'StartupVen', href: 'https://startupven.com' },
				{ icon: 'external', label: 'CALETAS', href: 'https://caleta.top' },
			],
			sidebar: buildStudyPathSidebar(),
		}),
	],
});
