// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://pic18.caleta.top',
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
			components: {
				Head: './src/components/Head.astro',
				Header: './src/components/Header.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				Footer: './src/components/Footer.astro',
				Sidebar: './src/components/Sidebar.astro',
				SocialIcons: './src/components/SocialIcons.astro',
			},
			social: [
				{ icon: 'github', label: 'zackness', href: 'https://github.com/zackness' },
				{ icon: 'instagram', label: 'zackness_ofc', href: 'https://instagram.com/zackness_ofc' },
				{ icon: 'tiktok', label: 'zackness_ofc', href: 'https://tiktok.com/@zackness_ofc' },
				{ icon: 'external', label: 'StartupVen', href: 'https://startupven.com' },
				{ icon: 'external', label: 'CALETAS', href: 'https://caleta.top' },
			],
			sidebar: [
				{
					label: 'Comienza aqui',
					translations: { en: 'Start here' },
					items: [
						{ slug: 'ruta-de-estudio' },
						{ slug: 'sobre/ecosistema' },
						{ slug: 'introduccion/pic18f4550' },
						{ slug: 'introduccion/comparaciones' },
					],
				},
				{
					label: 'Tutoriales',
					translations: { en: 'Tutorials' },
					items: [
						{ slug: 'tutoriales' },
						{ slug: 'tutoriales/ejercicios' },
						{
							label: 'Practicas paso a paso',
							translations: { en: 'Step-by-step practices' },
							collapsed: true,
							items: [
								{ slug: 'tutoriales/primer-led' },
								{ slug: 'tutoriales/practica-1' },
								{ slug: 'tutoriales/practica-2' },
								{ slug: 'tutoriales/practica-3' },
								{ slug: 'tutoriales/practica-4' },
								{ slug: 'tutoriales/practica-5' },
								{ slug: 'tutoriales/practica-6' },
								{ slug: 'tutoriales/practica-7' },
								{ slug: 'tutoriales/practica-8' },
								{ slug: 'tutoriales/practica-9' },
							],
						},
					],
				},
				{
					label: 'Fundamentos',
					translations: { en: 'Foundations' },
					items: [
						{ slug: 'fundamentos/arquitectura' },
						{ slug: 'fundamentos/bits-hex' },
						{ slug: 'fundamentos/registros' },
						{ slug: 'fundamentos/ensamblador' },
						{ slug: 'fundamentos/config-bits' },
						{ slug: 'fundamentos/mplab-proteus' },
					],
				},
				{
					label: 'GPIO',
					translations: { en: 'GPIO' },
					items: [
						{ slug: 'gpio' },
						{ slug: 'gpio/botones' },
					],
				},
				{
					label: 'Timers',
					translations: { en: 'Timers' },
					items: [
						{ slug: 'timers/timer0' },
						{ slug: 'timers/timer1-timer2' },
					],
				},
				{
					label: 'Interrupciones',
					translations: { en: 'Interrupts' },
					items: [{ slug: 'interrupciones' }],
				},
				{
					label: 'ADC',
					translations: { en: 'ADC' },
					items: [{ slug: 'adc' }],
				},
				{
					label: 'PWM / CCP',
					translations: { en: 'PWM / CCP' },
					items: [{ slug: 'pwm' }],
				},
				{
					label: 'Comunicacion',
					translations: { en: 'Communication' },
					items: [
						{ slug: 'comunicacion/uart' },
						{ slug: 'comunicacion/spi-i2c' },
						{ slug: 'comunicacion/usb' },
						{ slug: 'comunicacion/lcd-teclado' },
					],
				},
				{
					label: 'Practicas de laboratorio',
					translations: { en: 'Lab practices' },
					items: [
						{ slug: 'practicas/primer-led' },
						{ slug: 'practicas/operaciones-matematicas' },
						{ slug: 'practicas/teclado-lcd' },
						{ slug: 'practicas/frecuencimetro' },
						{ slug: 'practicas/motor-paso-a-paso' },
						{ slug: 'practicas/convertidor-ad' },
						{ slug: 'practicas/comunicacion-serial' },
					],
				},
				{
					label: 'Proyectos',
					translations: { en: 'Projects' },
					items: [
						{ slug: 'proyectos/semaforo' },
						{ slug: 'proyectos/control-nivel' },
					],
				},
				{
					label: 'Preparacion parcial',
					translations: { en: 'Exam prep' },
					items: [
						{ slug: 'parcial/parcial-1' },
						{ slug: 'parcial/parcial-2' },
						{ slug: 'parcial/parcial-3' },
						{ slug: 'parcial/parcial-4' },
						{ slug: 'parcial/guia-teorica' },
						{ slug: 'parcial/ejercicios' },
						{ slug: 'parcial/proyecto-final' },
					],
				},
				{
					label: 'Referencia',
					translations: { en: 'Reference' },
					items: [
						{ slug: 'referencia/guia-registros' },
						{ slug: 'referencia/glosario' },
					],
				},
			],
		}),
	],
});
