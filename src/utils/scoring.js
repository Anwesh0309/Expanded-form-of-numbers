import { shuffleArray } from './shuffle.js';

export const XP_TABLE = {
  correctFirstTry:  10,
  correctSecondTry: 7,
  correctWithHint:  5,
};

export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}

export function calcStars(correct, total = 10) {
  if (correct >= 9) return 3;
  if (correct >= 7) return 2;
  if (correct >= 5) return 1;
  return 0;
}

export function canUnlockDistrict(districtScore) {
  return districtScore !== null && districtScore >= 5;
}

export function generateDistractors(correctTerms, count = 3) {
  const distractors = new Set();
  let attempts = 0;
  const placeValues = [10000, 1000, 100, 10, 1];

  while (distractors.size < count && attempts < 80) {
    const idx = Math.floor(Math.random() * correctTerms.length);
    const altered = [...correctTerms];
    const pv = placeValues[idx];
    const digit = pv > 0 ? Math.floor(correctTerms[idx] / pv) : correctTerms[idx];
    const offsets = [-1, 1, -2, 2];
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    const newDigit = Math.max(0, Math.min(9, digit + offset));
    altered[idx] = newDigit * pv;
    const asString = altered.map(t => t.toLocaleString()).join(' + ');
    const correctString = correctTerms.map(t => t.toLocaleString()).join(' + ');
    if (asString !== correctString) distractors.add(asString);
    attempts++;
  }

  return shuffleArray([correctTerms.map(t => t.toLocaleString()).join(' + '), ...distractors]);
}
