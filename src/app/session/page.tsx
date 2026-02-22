"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Fretboard, { FretDot, WoodType } from "@/components/Fretboard";

const TEST_DOTS: FretDot[] = [
    { string: 6, fret: 8,  label: "C",  active: true,  root: true  },
    { string: 6, fret: 10, label: "D",  active: true,  root: false },
    { string: 6, fret: 12, label: "E",  active: true,  root: false },
    { string: 5, fret: 8,  label: "F",  active: true,  root: false },
    { string: 5, fret: 10, label: "G",  active: true,  root: false },
    { string: 5, fret: 12, label: "A",  active: true,  root: false },
    { string: 4, fret: 9,  label: "B",  active: true,  root: false },
    { string: 4, fret: 10, label: "C",  active: true,  root: true  },
    { string: 3, fret: 9,  label: "D",  active: true,  root: false },
    { string: 3, fret: 10, label: "E",  active: true,  root: false },
    { string: 2, fret: 8,  label: "F",  active: true,  root: false },
    { string: 2, fret: 10, label: "G",  active: true,  root: false },
    { string: 1, fret: 8,  label: "A",  active: true,  root: false },
    { string: 1, fret: 10, label: "B",  active: true,  root: false },
];

const WOOD_OPTIONS: { value: WoodType; label: string; from: string; to: string }[] = [
    { value: "rosewood", label: "Rosewood", from: "#5C2E08", to: "#3D1C02" },
    { value: "maple", label: "Maple", from: "#E8A848", to: "#C87830" },
];

function SessionContent() {
    const searchParams = useSearchParams();
    const key = searchParams.get("key") || "C";
    const scale = searchParams.get("scale") || "Major";
    const exerciseType = searchParams.get("exerciseType") || "Scale";
    const position = searchParams.get("position") || "6th String Root";
    const tempo = searchParams.get("tempo") || "freeform";
    const bpm = searchParams.get("bpm");

    const [showFretboard, setShowFretboard] = useState(true);
    const [showLabels, setShowLabels] = useState(true);
    const [wood, setWood] = useState<WoodType>("rosewood");

    return (
        <main className="min-h-screen bg-background flex flex-col p-4">
            <div className="max-w-sm mx-auto w-full flex flex-col gap-4">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-text-main">{key} {scale}</h1>
                        <p className="text-text-muted text-sm">{exerciseType} · {position}</p>
                    </div>
                    <div className="text-right">
                        {tempo === "freeform" ? (
                            <span className="text-text-muted text-sm">Freeform</span>
                        ) : (
                            <span className="text-text-main font-bold text-lg">
                {bpm} <span className="text-text-muted text-sm font-normal">BPM</span>
              </span>
                        )}
                    </div>
                </div>

                {/* Controls row */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowFretboard(!showFretboard)}
                        className={`flex-1 rounded-xl py-2.5 text-sm font-medium border transition-colors ${
                            showFretboard
                                ? "bg-primary text-white border-primary"
                                : "bg-surface text-text-main border-border"
                        }`}
                    >
                        {showFretboard ? "Hide Fretboard" : "Show Fretboard"}
                    </button>
                    <button
                        onClick={() => setShowLabels(!showLabels)}
                        disabled={!showFretboard}
                        className={`flex-1 rounded-xl py-2.5 text-sm font-medium border transition-colors disabled:opacity-40 ${
                            showLabels && showFretboard
                                ? "bg-primary text-white border-primary"
                                : "bg-surface text-text-main border-border"
                        }`}
                    >
                        {showLabels ? "Hide Labels" : "Show Labels"}
                    </button>
                </div>

                {/* Wood picker */}
                {showFretboard && (
                    <div className="flex gap-2 items-center">
                        <span className="text-text-muted text-xs font-medium">Fretboard:</span>
                        <div className="flex gap-2">
                            {WOOD_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setWood(opt.value)}
                                    title={opt.label}
                                    className="relative rounded-lg overflow-hidden transition-all"
                                    style={{
                                        width: 48,
                                        height: 28,
                                        background: `linear-gradient(to right, ${opt.from}, ${opt.to})`,
                                        outline: wood === opt.value ? "2.5px solid #2A7F7F" : "2px solid transparent",
                                        outlineOffset: "2px",
                                        boxShadow: wood === opt.value ? "0 0 0 1px #2A7F7F" : "none",
                                    }}
                                >
                                    {wood === opt.value && (
                                        <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-white opacity-80" />
                    </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Fretboard or placeholder */}
                {showFretboard ? (
                    <Fretboard
                        dots={TEST_DOTS}
                        startFret={7}
                        numFrets={5}
                        showLabels={showLabels}
                        wood={wood}
                    />
                ) : (
                    <div
                        className="w-full bg-surface border border-border rounded-2xl flex items-center justify-center"
                        style={{ aspectRatio: "360/520" }}
                    >
                        <div className="text-center">
                            <div className="text-5xl mb-3">🎸</div>
                            <p className="text-text-muted text-sm">Play from memory</p>
                        </div>
                    </div>
                )}

                {/* Done button */}
                <button className="w-full bg-primary hover:bg-primary-hover text-white rounded-2xl py-4 text-lg font-medium transition-colors mt-auto">
                    I&apos;m Done
                </button>

            </div>
        </main>
    );
}

export default function SessionPage() {
    return (
        <Suspense>
            <SessionContent />
        </Suspense>
    );
}
