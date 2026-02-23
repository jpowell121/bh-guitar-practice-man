"use client";

import React from "react";

export type WoodType = "rosewood" | "maple";

interface FretboardProps {
    startFret: number;
    numFrets: number;
    wood?: WoodType;
}

const POSITION_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
const DOUBLE_DOT_FRETS = [12, 24];

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
        fretLabelColor: "#C8A87A",
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
    },
};

export default function Fretboard2({
                                       startFret,
                                       numFrets,
                                       wood = "rosewood",
                                   }: FretboardProps) {
    const SVG_WIDTH = 360;
    const MARGIN_TOP = 32;
    const MARGIN_BOTTOM = 32;
    const MARGIN_LEFT = 36;
    const MARGIN_RIGHT = 24;

    const boardWidth = SVG_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
    const NUM_STRINGS = 6;
    const STRING_INSET = 20;

    const stringX = (s: number) =>
        MARGIN_LEFT + STRING_INSET + (s - 1) * ((boardWidth - STRING_INSET * 2) / (NUM_STRINGS - 1));

    const MAX_FRET = 24;
    const clampedStart = Math.max(0, Math.min(startFret, MAX_FRET));
    const clampedFrets = Math.max(1, Math.min(numFrets, MAX_FRET - clampedStart));
    const fretSpacing = 88; // fixed height per fret, matches 5-fret look
    const boardHeightActual = fretSpacing * clampedFrets;
    const fretY = (i: number) => MARGIN_TOP + i * fretSpacing;
    const boardCenter = (stringX(1) + stringX(6)) / 2;



    const fretLines = Array.from({ length: clampedFrets + 1 }, (_, i) => i);

    const cfg = WOOD_CONFIGS[wood];
    const grainId = `fretboardGrain2-${wood}`;
    const overlayId = `grainOverlay2-${wood}`;

    return (
        <div
            className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl"
            style={{ aspectRatio: `${SVG_WIDTH}/${MARGIN_TOP + boardHeightActual + MARGIN_BOTTOM}` }}
        >
            <svg viewBox={`0 0 ${SVG_WIDTH} ${MARGIN_TOP + boardHeightActual + MARGIN_BOTTOM}`}>
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
                    <linearGradient id="fretMetal2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#B8B8B8" />
                        <stop offset="40%" stopColor="#D8D8D8" />
                        <stop offset="60%" stopColor="#C0C0C0" />
                        <stop offset="100%" stopColor="#A8A8A8" />
                    </linearGradient>
                    <linearGradient id="nutGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#F0EAD8" />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#D8D0C0" />
                    </linearGradient>
                    <radialGradient id="pearlInlay2" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#E8E8F0" />
                        <stop offset="100%" stopColor="#C8C8D8" />
                    </radialGradient>
                </defs>

                {/* Background */}
                <rect x={MARGIN_LEFT - 16} y={MARGIN_TOP - 16} width={boardWidth + 32} height={boardHeightActual + 32} rx="12" ry="12" fill={`url(#${grainId})`} />
                <rect x={MARGIN_LEFT - 16} y={MARGIN_TOP - 16} width={boardWidth + 32} height={boardHeightActual + 32} rx="12" ry="12" fill={`url(#${overlayId})`} />

                {/* Inlay markers */}
                {fretLines.slice(0, -1).map((_, i) => {
                    const actualFret = clampedStart + i + 1;
                    const y = fretY(i) + fretSpacing / 2;
                    if (DOUBLE_DOT_FRETS.includes(actualFret)) {
                        return (
                            <g key={`marker-${i}`}>
                                <circle cx={boardCenter - 50} cy={y} r={9} fill="url(#pearlInlay2)" opacity="0.55" />
                                <circle cx={boardCenter + 50} cy={y} r={9} fill="url(#pearlInlay2)" opacity="0.55" />
                            </g>
                        );
                    }
                    if (POSITION_MARKERS.includes(actualFret)) {
                        return <circle key={`marker-${i}`} cx={boardCenter} cy={y} r={9} fill="url(#pearlInlay2)" opacity="0.55" />;
                    }
                    return null;
                })}

                {/* Fret lines */}
                {fretLines.map((_, i) => {
                    const y = fretY(i);
                    const isNut = clampedStart === 0 && i === 0;
                    if (isNut) {
                        return <rect key={`fret-${i}`} x={MARGIN_LEFT - 14} y={y - 8} width={boardWidth + 28} height={8} rx="2" fill="url(#nutGradient2)" />;
                    }
                    return (
                        <rect key={`fret-${i}`} x={MARGIN_LEFT - 14} y={y - 1.5}
                              width={boardWidth + 28} height={3} rx="1"
                              fill="url(#fretMetal2)" />
                    );
                })}

                {/* Fret labels */}
                {fretLines.slice(0, -1).map((_, i) => {
                    const actualFret = clampedStart + i + 1;
                    const y = fretY(i) + fretSpacing / 2;
                    return (
                        <text key={`label-${i}`}
                              x={MARGIN_LEFT - 30} y={y + 5}
                              textAnchor="middle" fontSize="11"
                              fill={cfg.fretLabelColor} opacity="1"
                              fontFamily="monospace"
                              transform={`rotate(-90, ${MARGIN_LEFT - 30}, ${y + 5})`}>
                            {actualFret}
                        </text>
                    );
                })}

                {/* Strings */}
                {Array.from({ length: NUM_STRINGS }, (_, i) => i + 1).map((s) => (
                    <line key={`string-${s}`}
                          x1={stringX(s)} y1={MARGIN_TOP - 8} x2={stringX(s)} y2={MARGIN_TOP + boardHeightActual + 8}
                          stroke={s <= 3 ? cfg.stringColor : cfg.woundStringColor}
                          strokeWidth={STRING_THICKNESSES[s - 1]} opacity="0.9" />
                ))}

            </svg>
        </div>
    );
}
