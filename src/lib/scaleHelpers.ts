export type ScaleType = "Major" | "Dominant" | "Min6Dim";
export type Enharmonic = "flat" | "sharp";

const CHROMATIC_FLAT =  ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const CHROMATIC_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const SCALE_INTERVALS: Record<ScaleType, number[]> = {
    Major:     [0, 2, 4, 5, 7, 9, 11],
    Dominant:  [0, 2, 4, 5, 7, 9, 10],
    Min6Dim:   [0, 2, 3, 5, 7, 8, 9, 11],
};

export function generateScale(key: string, scaleType: ScaleType, enharmonic: Enharmonic = "flat"): string[] {
    const chromatic = enharmonic === "flat" ? CHROMATIC_FLAT : CHROMATIC_SHARP;
    const rootIndex = chromatic.indexOf(key);
    if (rootIndex === -1) return [];
    return SCALE_INTERVALS[scaleType].map(interval => chromatic[(rootIndex + interval) % 12]);
}