export const BADGES = [
  {
    id: 'digit_detective',
    label: '🏅 Digit Detective',
    description: 'Complete Wonder & Story phases',
    condition: (s) => s.phaseComplete.wonder && s.phaseComplete.story,
  },
  {
    id: 'block_builder',
    label: '🥈 Block Builder',
    description: 'Complete all 4 simulation stations',
    condition: (s) => s.simStationsComplete && s.simStationsComplete.every(Boolean),
  },
  {
    id: 'expansion_expert',
    label: '🥇 Expansion Expert',
    description: 'Score 80%+ on Play phase',
    condition: (s) => {
      const totalCorrect = s.districtScores.reduce((sum, ds) => sum + (ds || 0), 0);
      return totalCorrect >= 80;
    },
  },
  {
    id: 'perfect_hundred_thousand',
    label: '💎 Perfect Hundred Thousand',
    description: 'Score 10/10 in any district',
    condition: (s) => s.districtScores.some(ds => ds === 10),
  },
  {
    id: 'streak_legend',
    label: '🔥 Streak Legend',
    description: 'Achieve a 10-answer streak',
    condition: (s) => s.maxStreak >= 10,
  },
  {
    id: 'place_value_master',
    label: '🌟 Place Value Master',
    description: 'Complete all 5 phases',
    condition: (s) => Object.values(s.phaseComplete).every(Boolean),
  },
];

export function checkBadges(state) {
  return BADGES
    .filter(b => !state.badges.includes(b.id) && b.condition(state))
    .map(b => b.id);
}
