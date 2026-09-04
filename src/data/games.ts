export interface Game {
	slug: string;
	title: string;
	description: string;
	videos: string[];
	itchUrl?: string;
	newgroundsUrl?: string;
}

export const games: Game[] = [
	{
		slug: "endhell",
		title: "Endhell",
		description: `A mobile game, also playable on PC.

**ENDHELL** is set in a hellish universe (who would have guessed?) — it's a mix between an FPS and an Endless Runner!

Unlockable **weapons**, **skins**, **areas** and so much more!

You can play it for **FREE**`,
		videos: ["endhell.webm"],
		itchUrl: "https://excurse-software.itch.io/",
		newgroundsUrl: "https://www.newgrounds.com/portal/view/1036184",
	},
	{
		slug: "parabellum",
		title: "Parabellum Rain",
		description: `In **Parabellum Rain**, you are Izmael: a depressed office worker worn out by life whose only friend is his own sarcastic and greedy umbrella.

In this 2D platformer action-RPG, you will use the water droplets to propel yourself, **attack**, and **destroy** your **opponents**!

Every day, as you go to work, the city will be changed by events as bizarre as they are unexpected — mutant animals, bloodthirsty politicians, cosmic creatures...

Discover a city with twisted and nihilistic inhabitants and uncover the source of evil.

Available for free on **Newgrounds** and **itch.io**`,
		videos: [
			"parabellum-rain1.webm",
			"parabellum-rain2.webm",
			"parabellum-rain3.webm",
		],
		itchUrl: "https://excurse-software.itch.io/parabellum-rain",
		newgroundsUrl: "https://www.newgrounds.com/portal/view/984623",
	},
	{
		slug: "babel",
		title: "Babel Adventure",
		description: `Our very first PC game!

It's a **platformer** and **semi-roguelike** where you can't jump or attack! Good luck climbing the whole tower without falling — believe me, this shit is **NOT easy** at all.

And also ITS FREE`,
		videos: ["babel-1.webm", "babel-2.webm", "babel-3.webm"],
		newgroundsUrl: "https://www.newgrounds.com/portal/view/905836",
	},
	{
		slug: "spectra-collab",
		title: "Spectra Collab",
		description: `**Spectra Collab** is an interactive virtual space featuring hundreds of imaginary game boxes!

A **massive collaborative project** organized by Kotico and entirely programmed by Liam Valty, bringing together around a hundred professional illustrators and musicians.

It's packed with easter eggs, secret codes, sketches, design documents, and whimsical descriptions that **spark everyone's imagination**!`,
		videos: ["spectra-collab1.webm", "spectra-collab2.webm"],
		newgroundsUrl: "https://www.newgrounds.com/portal/view/1025439",
	},
];

export function getGameBySlug(slug: string): Game | undefined {
	return games.find((g) => g.slug === slug);
}
