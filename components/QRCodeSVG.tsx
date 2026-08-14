'use client';

import React from 'react';

// Generates a deterministic, crisp SVG QR Code pattern based on text
export function QRCodeSVG({ value, size = 120, fgColor = '#10b981', bgColor = '#0f172a' }: { value: string; size?: number; fgColor?: string; bgColor?: string }) {
  // Generate pseudo-deterministic 21x21 matrix from value
  const gridSize = 21;
  const matrix: boolean[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  // Finder patterns at top-left, top-right, bottom-left
  const addFinder = (startRow: number, startCol: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[startRow + r][startCol + c] = true;
        }
      }
    }
  };

  addFinder(0, 0);
  addFinder(0, 14);
  addFinder(14, 0);

  // Timing patterns
  for (let i = 8; i < 13; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Hash the string into the data area
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) - hash) + value.charCodeAt(i);
    hash |= 0;
  }

  let bitIndex = 0;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Skip finder patterns and timing lines
      const inTL = r < 8 && c < 8;
      const inTR = r < 8 && c >= 13;
      const inBL = r >= 13 && c < 8;
      const inTiming = r === 6 || c === 6;

      if (!inTL && !inTR && !inBL && !inTiming) {
        const seed = Math.sin(hash + bitIndex * 1.618) * 10000;
        matrix[r][c] = (seed - Math.floor(seed)) > 0.45;
        bitIndex++;
      }
    }
  }

  const cellSize = size / gridSize;

  return (
    <div className="inline-block p-2 rounded-xl bg-slate-950 border border-slate-800 shadow-inner" style={{ width: size + 16, height: size + 16 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg">
        <rect width={size} height={size} fill={bgColor} />
        {matrix.map((row, r) =>
          row.map((cell, c) =>
            cell ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize * 0.95}
                height={cellSize * 0.95}
                rx={cellSize * 0.2}
                fill={fgColor}
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}
