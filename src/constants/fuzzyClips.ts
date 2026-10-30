// The clips that play inside the "Meet the Fuzzies" words on the home page,
// in a random order. Each is a short, silent MP4 in public/videos/fuzzies
// (H.264, 1920×1080 with a light sharpen, about 5–10 seconds and 4–8 MB; they load only as the section nears) with a still picture
// from it for people who turn motion off.
//
export type FuzzyClip = { src: string; poster: string };

// Ricky's clips of the fuzzies, added as they're made (2026-10-29: the first; 2026-10-30: two more).
const CLIPS = ['fuzzy-1', 'fuzzy-2', 'fuzzy-3'];

export const FUZZY_CLIPS: FuzzyClip[] = CLIPS.map((name) => ({
  src: `/videos/fuzzies/${name}.mp4`,
  poster: `/videos/fuzzies/${name}.jpg`,
}));
