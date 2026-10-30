// The clips that play inside the "Meet the Fuzzies" words on the home page,
// in a random order. Each is a short, silent MP4 in public/videos/fuzzies
// (H.264, 1280×720, about 5–10 seconds and under 1 MB) with a still picture
// from it for people who turn motion off.
//
// The stand-ins are slow pans across fuzzy pictures; swap them for the real
// clips of the fuzzies at work as they're made.

export type FuzzyClip = { src: string; poster: string };

export const FUZZY_CLIPS: FuzzyClip[] = [1, 2, 3, 4, 5].map((n) => ({
  src: `/videos/fuzzies/standin-${n}.mp4`,
  poster: `/videos/fuzzies/standin-${n}.jpg`,
}));
