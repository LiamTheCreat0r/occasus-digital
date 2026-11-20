/**
 * Game catalogue. Titles, taglines and descriptions live in the translation
 * file (`gameInfo.<slug>.*`, `game.<slug>.*`) so they can be localized.
 */

const covers = import.meta.glob<string>("../assets/img/game-covers/*.webp", {
  eager: true,
  import: "default",
});
const cartridges = import.meta.glob<string>("../assets/img/cartridges/*.webp", {
  eager: true,
  import: "default",
});
const screenshotFiles = import.meta.glob<string>("../assets/img/game-screenshots/*.webp", {
  eager: true,
  import: "default",
});

function pick(map: Record<string, string>, name: string): string {
  const hit = Object.entries(map).find(([path]) => path.endsWith(`/${name}.webp`));
  if (!hit) throw new Error(`Missing image: ${name}`);
  return hit[1];
}

function screenshotsFor(prefix: string): string[] {
  return Object.entries(screenshotFiles)
    .filter(([path]) => path.includes(`/${prefix}-screenshot-`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);
}

export interface Game {
  slug: string;
  title: string;
  platforms: string[];
  /** Brand colour sampled from the cover art, used for accents. */
  accent: string;
  cover: string;
  cartridge: string;
  screenshots: string[];
  /** Files in /public/videos */
  videos: string[];
  videoAspect: "wide" | "square" | "vertical";
  itchUrl?: string;
  newgroundsUrl?: string;
}

function game(def: Omit<Game, "cover" | "cartridge" | "screenshots"> & { assetName: string }): Game {
  const { assetName, ...rest } = def;
  return {
    ...rest,
    cover: pick(covers, assetName),
    cartridge: pick(cartridges, `${assetName}-cartridge`),
    screenshots: screenshotsFor(assetName),
  };
}

export const games: Game[] = [
  game({
    slug: "endhell",
    title: "Endhell",
    assetName: "endhell",
    platforms: ["Mobile", "PC"],
    accent: "#e8a33a",
    videos: ["endhell.webm"],
    videoAspect: "vertical",
    itchUrl: "https://excurse-software.itch.io/",
    newgroundsUrl: "https://www.newgrounds.com/portal/view/1036184",
  }),
  game({
    slug: "spectra-collab",
    title: "Spectra Collab",
    assetName: "spectra-collab",
    platforms: ["PC"],
    accent: "#8f9dff",
    videos: ["spectra-collab1.webm", "spectra-collab2.webm"],
    videoAspect: "wide",
    newgroundsUrl: "https://www.newgrounds.com/portal/view/1025439",
  }),
  game({
    slug: "parabellum",
    title: "Parabellum Rain",
    assetName: "parabellum-rain",
    platforms: ["PC"],
    accent: "#c58bd6",
    videos: ["parabellum-rain1.webm", "parabellum-rain2.webm", "parabellum-rain3.webm"],
    videoAspect: "wide",
    itchUrl: "https://excurse-software.itch.io/parabellum-rain",
    newgroundsUrl: "https://www.newgrounds.com/portal/view/984623",
  }),
  game({
    slug: "babel",
    title: "Babel Adventure",
    assetName: "babel-adventure",
    platforms: ["PC"],
    accent: "#d9a0a8",
    videos: ["babel-1.webm", "babel-2.webm", "babel-3.webm"],
    videoAspect: "square",
    newgroundsUrl: "https://www.newgrounds.com/portal/view/905836",
  }),
];

export function getGame(slug: string | undefined): Game | undefined {
  return games.find((g) => g.slug === slug);
}
