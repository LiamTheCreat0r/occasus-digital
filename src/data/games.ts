export interface Game {
  slug: string;
  title: string;
  description: string;
  videos: string[];
}

export const games: Game[] = [
  {
    slug: 'endhell',
    title: 'Endhell',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    videos: [],
  },
  {
    slug: 'spectra-collab',
    title: 'Spectra Collab',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    videos: ['spectra-collab1.webm', 'spectra-collab2.webm'],
  },
  {
    slug: 'parabellum',
    title: 'Parabellum Rain',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    videos: ['parabellum-rain1.webm', 'parabellum-rain2.webm', 'parabellum-rain3.webm'],
  },
  {
    slug: 'babel',
    title: 'Babel Adventure',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    videos: ['babel-1.webm', 'babel-2.webm', 'babel-3.webm'],
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}
