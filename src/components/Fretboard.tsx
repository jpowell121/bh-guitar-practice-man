"use client";

import React from "react";

export interface Note {
    string: number;
    fret: number;
    label?: string;
    active: boolean;
    root?: boolean;
}

export type WoodType = "rosewood" | "maple";

interface FretboardProps {
    notes: Note[];
    startFret?: number;
    numFrets?: number;
    showLabels?: boolean;
    pulse?: boolean;
    wood?: WoodType;
}

const POSITION_MARKERS = [3, 5, 7, 9, 15];
const DOUBLE_DOT_FRET = 12;
const STRING_THICKNESSES = [3.0, 2.6, 2.2, 1.8, 1.5, 1.2];

const WOOD_CONFIGS = {
    rosewood: {
        grainStops: [
            { offset: "0%",   color: "#3D1C02" },
            { offset: "12%",  color: "#5C2E08" },
            { offset: "25%",  color: "#4A2206" },
            { offset: "38%",  color: "#6B3A10" },
            { offset: "50%",  color: "#4A2206" },
            { offset: "63%",  color: "#5C2E08" },
            { offset: "75%",  color: "#3D1C02" },
            { offset: "88%",  color: "#5C2E08" },
            { offset: "100%", color: "#4A2206" },
        ],
        stringColor: "#C8B89A",
        woundStringColor: "#B0A07A",
        fretLabelColor: "#7A6A50",
        stringLabelColor: "#C8A87A",
        dotRegularFrom: "#E8E0D0",
        dotRegularTo: "#B8A888",
        dotBorder: "#8A7A60",
        dotTextColor: "#3D2800",
    },
    maple: {
        grainStops: [
            { offset: "0%",   color: "#D4923A" },
            { offset: "12%",  color: "#E8A84A" },
            { offset: "25%",  color: "#C8823A" },
            { offset: "38%",  color: "#EAB055" },
            { offset: "50%",  color: "#C87830" },
            { offset: "63%",  color: "#E0A040" },
            { offset: "75%",  color: "#D08830" },
            { offset: "88%",  color: "#E8A848" },
            { offset: "100%", color: "#C87830" },
        ],
        stringColor: "#8A7A60",
        woundStringColor: "#7A6A50",
        fretLabelColor: "#A07830",
        stringLabelColor: "#A07830",
        dotRegularFrom: "#6B5A3A",
        dotRegularTo: "#4A3A22",
        dotBorder: "#6B5A3A",
        dotTextColor: "#F5E6C0",
    },
};

export default function Fretboard({
                                      notes,
                                      startFret = 0,
                                      numFrets = 5,
                                      showLabels = true,
                                      pulse = false,
                                      wood = "rosewood",
                                  }: FretboardProps) {
    const SVG_WIDTH = 360;
    const SVG_HEIGHT = 520;
    const MARGIN_TOP = 32;
    const MARGIN_BOTTOM = 32;
    const MARGIN_LEFT = 36;
    const MARGIN_RIGHT = 24;

    const boardWidth = SVG_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
    const boardHeight = SVG_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;
    const NUM_STRINGS = 6;
    const STRING_INSET = 20;

    const stringX = (s: number) =>
        MARGIN_LEFT + STRING_INSET + (s - 1) * ((boardWidth - STRING_INSET * 2) / (NUM_STRINGS - 1));

    const fretSpacing = boardHeight / numFrets;
    const fretY = (f: number) => MARGIN_TOP + f * fretSpacing;

    const showNut = startFret === 0;
    const endFret = startFret + numFrets;
    const fretLines = Array.from({ length: numFrets + 1 }, (_, i) => startFret + i);

    const cfg = WOOD_CONFIGS[wood];
    const grainId = `fretboardGrain-${wood}`;
    const overlayId = `grainOverlay-${wood}`;
    const regDotId = `regularDotGrad-${wood}`;

    return (
        <div
            className={`relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl ${pulse ? "animate-pulse-subtle" : ""}`}
            style={{ aspectRatio: `${SVG_WIDTH}/${SVG_HEIGHT}` }}
        >
            <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-full" style={{ display: "block" }}>
                <defs>
                    <linearGradient id={grainId} x1="0%" y1="0%" x2="100%" y2="0%">
                        {cfg.grainStops.map((s, i) => (
                            <stop key={i} offset={s.offset} stopColor={s.color} />
                        ))}
                    </linearGradient>
                    <linearGradient id={overlayId} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#000000" stopOpacity="0.08" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.04" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
                    </linearGradient>
                    <linearGradient id="fretMetal" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#B8B8B8" />
                        <stop offset="40%" stopColor="#D8D8D8" />
                        <stop offset="60%" stopColor="#C0C0C0" />
                        <stop offset="100%" stopColor="#A8A8A8" />
                    </linearGradient>
                    <linearGradient id="nutGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#F0EAD8" />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#D8D0C0" />
                    </linearGradient>

                    <radialGradient id="dotGlow" cx="35%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="rootDotGrad" cx="35%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#5BBFBF" />
                        <stop offset="100%" stopColor="#1A6B6B" />
                    </radialGradient>
                    <radialGradient id={regDotId} cx="35%" cy="35%" r="60%">
                        <stop offset="0%" stopColor={cfg.dotRegularFrom} />
                        <stop offset="100%" stopColor={cfg.dotRegularTo} />
                    </radialGradient>
                    <radialGradient id="pearlInlay" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#E8E8F0" />
                        <stop offset="100%" stopColor="#C8C8D8" />
                    </radialGradient>
                </defs>

                {/* Background */}
                <rect x={MARGIN_LEFT - 16} y={MARGIN_TOP - 16} width={boardWidth + 32} height={boardHeight + 32} rx="12" ry="12" fill={`url(#${grainId})`} />
                <rect x={MARGIN_LEFT - 16} y={MARGIN_TOP - 16} width={boardWidth + 32} height={boardHeight + 32} rx="12" ry="12" fill={`url(#${overlayId})`} />

                {/* Position markers */}
                {fretLines.slice(0, -1).map((fret, i) => {
                    const y = fretY(i) + fretSpacing / 2;
                    const boardCenter = (stringX(1) + stringX(6)) / 2;
                    if (POSITION_MARKERS.includes(fret + 1)) {
                        return <circle key={`m-${fret}`} cx={boardCenter} cy={y} r={9} fill="url(#pearlInlay)" opacity="0.55" />;
                    }
                    if (fret + 1 === DOUBLE_DOT_FRET) {
                        return (
                            <g key={`m-${fret}`}>
                                <circle cx={boardCenter - 50} cy={y} r={9} fill="url(#pearlInlay)" opacity="0.55" />
                                <circle cx={boardCenter + 50} cy={y} r={9} fill="url(#pearlInlay)" opacity="0.55" />
                            </g>
                        );
                    }
                    return null;
                })}

                {/* Fret lines */}
                {fretLines.map((fret, i) => {
                    const y = fretY(i);
                    const isFirst = i === 0 && !showNut;
                    return (
                        <rect key={`fret-${fret}`} x={MARGIN_LEFT - 14} y={y - (isFirst ? 1 : 1.5)}
                              width={boardWidth + 28} height={isFirst ? 2 : 3} rx="1"
                              fill="url(#fretMetal)" opacity={isFirst ? 0.4 : 1} />
                    );
                })}

                {/* Nut */}
                {showNut && (
                    <rect x={MARGIN_LEFT - 14} y={MARGIN_TOP - 8} width={boardWidth + 28} height={8} rx="2" fill="url(#nutGradient)" />
                )}

                {/* Fret labels */}
                {fretLines.slice(0, -1).map((fret, i) => {
                    const y = fretY(i) + fretSpacing / 2;
                    const displayFret = fret;
                    return (
                        <text key={`fl-${fret}`} x={MARGIN_LEFT - 30} y={y + 5} textAnchor="middle"
                              fontSize="11"  transform={`rotate(-90, ${MARGIN_LEFT - 22}, ${y + 5})`} fill={cfg.fretLabelColor} opacity="1.0" fontFamily="monospace">
                            {displayFret}
                        </text>
                    );
                })}

                {/* Strings */}
                {Array.from({ length: NUM_STRINGS }, (_, i) => i + 1).map((s) => (
                    <line key={`s-${s}`}
                          x1={stringX(s)} y1={MARGIN_TOP - 8} x2={stringX(s)} y2={MARGIN_TOP + boardHeight + 8}
                          stroke={s <= 3 ? cfg.stringColor : cfg.woundStringColor}
                          strokeWidth={STRING_THICKNESSES[s - 1]} opacity="0.9" />
                ))}

                {/* Notes */}
                {notes.map((note, idx) => {
                    if (!note.active) return null;
                    const x = stringX(note.string);
                    const y = fretY(note.fret) - fretSpacing / 2;
                    const r = 18;
                    return (
                        <g key={`note-${idx}`}>
                            <circle cx={x + 1} cy={y + 2} r={r} fill="#000000" opacity="0.25" />
                            <circle cx={x} cy={y} r={r} fill={note.root ? "url(#rootDotGrad)" : `url(#${regDotId})`} />
                            <circle cx={x} cy={y} r={r} fill="url(#dotGlow)" />
                            <circle cx={x} cy={y} r={r} fill="none" stroke={note.root ? "#2A7F7F" : cfg.dotBorder} strokeWidth="1.5" opacity="0.8" />
                            {showLabels && note.label && (
                                <text x={x} y={y + 4} textAnchor="middle"
                                      fontSize={note.label.length > 2 ? "9" : "11"} fontWeight="700"
                                      fill={note.root ? "#FFFFFF" : cfg.dotTextColor} fontFamily="monospace">
                                    {note.label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
