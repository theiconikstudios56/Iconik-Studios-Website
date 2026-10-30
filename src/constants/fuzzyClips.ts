// The clips that play inside the "Meet the Fuzzies" words on the home page,
// in a random order. Each is a short, silent MP4 in public/videos/fuzzies
// (H.264, 1280×720, about 5–10 seconds and 1–1.5 MB) with a still picture
// from it for people who turn motion off.
//
export type FuzzyClip = { src: string; poster: string };

// Ricky's clips of the fuzzies, added as they're made (2026-10-29: the first).
const CLIPS = ['fuzzy-1'];

export const FUZZY_CLIPS: FuzzyClip[] = CLIPS.map((name) => ({
  src: `/videos/fuzzies/${name}.mp4`,
  poster: `/videos/fuzzies/${name}.jpg`,
}));
