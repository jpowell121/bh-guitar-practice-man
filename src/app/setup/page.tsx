"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const KEYS = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const SCALES = ["Major", "Dominant", "Minor 6th Diminished"];
const EXERCISE_TYPES = ["Scale", "Thirds", "Triads", "Chords", "Pivots"];
const POSITIONS = ["6th String Root", "5th String Root"];

export default function NewPracticePage() {
    const router = useRouter();
    const [key, setKey] = useState("");
    const [scale, setScale] = useState("");
    const [exerciseType, setExerciseType] = useState("");
    const [position, setPosition] = useState("");
    const [tempo, setTempo] = useState("");
    const [bpm, setBpm] = useState("");

    const isReady = key && scale && exerciseType && position && tempo &&
        (tempo === "freeform" || (bpm !== "" && Number(bpm) >= 60 && Number(bpm) <= 200));

    function handleStart() {
        const params = new URLSearchParams({
            key, scale, exerciseType, position,
            tempo,
            ...(bpm && { bpm })
        });
        router.push(`/session?${params.toString()}`);
    }
    return (
        <main className="min-h-screen bg-background p-6">
        <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-text-main mb-1">New Exercise</h1>
    <p className="text-text-muted text-sm mb-8">Choose what you want to practice</p>

    <div className="flex flex-col gap-6">

    {/* Key */}
    <div>
    <label className="text-sm font-medium text-text-main mb-2 block">Key</label>
        <div className="grid grid-cols-6 gap-2">
        {KEYS.map((k) => (
                <button
                    key={k}
            onClick={() => setKey(k)}
    className={`rounded-xl py-2.5 text-sm font-medium border transition-colors ${
        key === k
            ? "bg-primary text-white border-primary"
            : "bg-surface text-text-main border-border hover:border-primary"
    }`}
>
    {k}
    </button>
))}
    </div>
    </div>

    {/* Position */}
    <div>
        <label className="text-sm font-medium text-text-main mb-2 block">Position</label>
        <div className="grid grid-cols-2 gap-2">
            {POSITIONS.map((p) => (
                <button
                    key={p}
                    onClick={() => setPosition(p)}
                    className={`rounded-xl py-3 text-sm font-medium border transition-colors ${
                        position === p
                            ? "bg-primary text-white border-primary"
                            : "bg-surface text-text-main border-border hover:border-primary"
                    }`}
                >
                    {p}
                </button>
            ))}
        </div>
    </div>
    {/* Scale */}
    <div>
        <label className="text-sm font-medium text-text-main mb-2 block">Scale</label>
        <div className="flex flex-col gap-2">
        {SCALES.map((s) => (
                <button
                    key={s}
            onClick={() => setScale(s)}
    className={`rounded-xl py-3 text-sm font-medium border transition-colors ${
        scale === s
            ? "bg-primary text-white border-primary"
            : "bg-surface text-text-main border-border hover:border-primary"
    }`}
>
    {s}
    </button>
))}
    </div>
    </div>

    {/* Exercise Type */}
    <div>
        <label className="text-sm font-medium text-text-main mb-2 block">Exercise Type</label>
    <div className="grid grid-cols-2 gap-2">
        {EXERCISE_TYPES.map((t) => (
                <button
                    key={t}
            onClick={() => setExerciseType(t)}
    className={`rounded-xl py-3 text-sm font-medium border transition-colors ${
        exerciseType === t
            ? "bg-primary text-white border-primary"
            : "bg-surface text-text-main border-border hover:border-primary"
    }`}
>
    {t}
    </button>
))}
    </div>
    </div>

    {/* Tempo */}
    <div>
        <label className="text-sm font-medium text-text-main mb-2 block">Tempo</label>
        <div className="grid grid-cols-2 gap-2 mb-3">
            <button
                onClick={() => setTempo("freeform")}
                className={`rounded-xl py-3 text-sm font-medium border transition-colors ${
                    tempo === "freeform"
                        ? "bg-primary text-white border-primary"
                        : "bg-surface text-text-main border-border hover:border-primary"
                }`}
            >
                Freeform
            </button>
            <button
                onClick={() => setTempo("metro")}
                className={`rounded-xl py-3 text-sm font-medium border transition-colors ${
                    tempo === "metro"
                        ? "bg-primary text-white border-primary"
                        : "bg-surface text-text-main border-border hover:border-primary"
                }`}
            >
                Metronome
            </button>
        </div>
        {tempo === "metro" && (
            <input
                type="number"
                min={60}
                max={200}
                placeholder="BPM (60-200)"
                value={bpm}
                onChange={(e) => setBpm(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 bg-background text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            />
        )}
    </div>
    {/* Start Button */}
    <button
        onClick={handleStart}
    disabled={!isReady}
    className="w-full bg-primary hover:bg-primary-hover text-white rounded-2xl py-4 text-lg font-medium transition-colors disabled:opacity-40 mt-2"
        >
        Let's Go
    </button>

    </div>
    </div>
    </main>
);
}