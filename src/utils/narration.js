// Narration segments — 1:1 with on-screen text
// Each function returns an array of { text, style } segments

export function wonderNarration() {
  return [
    { text: "The Big Mystery!", style: 'celebration' },
    { text: "If a stadium has eighty-four thousand, three hundred and twenty-five seats, how would you build that number using only ten-thousands, thousands, hundreds, tens and ones?", style: 'question' },
    { text: "Let's investigate how every big number is built from smaller parts!", style: 'encouragement' },
  ];
}

export function storyNarration(panelIndex) {
  const panels = [
    [{ text: "Siya works at a toy factory in Singapore. One day, a huge shipment of toy blocks arrived at the warehouse! The manager said: 'We need to count every single block!'", style: 'statement' }],
    [{ text: "Siya sorted the blocks carefully: 3 giant crates of ten-thousand blocks, 2 crates of thousand blocks, 4 trays of hundred blocks, 1 pack of ten blocks, and 6 loose unit blocks.", style: 'statement' }],
    [{ text: "Siya placed each group in its own column: Ten Thousands, Thousands, Hundreds, Tens, and Ones. Each column is a different place value — together they make one big number!", style: 'instruction' }],
    [{ text: "Siya wrote it all out: 30,000 + 2,000 + 400 + 10 + 6 = 32,416. This is called the EXPANDED FORM — it shows exactly what each digit is worth!", style: 'celebration' }],
  ];
  return panels[panelIndex] || panels[0];
}

export function simStationIntro(stationIndex) {
  const intros = [
    [{ text: "Station A: Drag the place value blocks into the build zone to match the target number. Watch the expanded form appear as you build!", style: 'instruction' }],
    [{ text: "Station B: Look at the target number and drag the correct chips to build the expanded form addition sentence.", style: 'instruction' }],
    [{ text: "Station C: Move each slider to change a digit. Watch how the number and its expanded form change instantly!", style: 'instruction' }],
    [{ text: "Station D: One of the terms in the expanded form is wrong. Can you spot the error and tap the incorrect term?", style: 'question' }],
  ];
  return intros[stationIndex] || intros[0];
}

export function simFeedback(correct) {
  if (correct) return [{ text: "Amazing! You built the number correctly!", style: 'celebration' }];
  return [{ text: "Not quite! Try removing some blocks and try again.", style: 'encouragement' }];
}

export function playQuestionNarration(questionText) {
  return [{ text: questionText, style: 'question' }];
}

export function playCorrectNarration(streak) {
  const messages = [
    "Amazing! You expanded it perfectly!",
    "Brilliant! That is exactly right!",
    "Superb! You know your place values!",
    "Excellent! Well done!",
    "Perfect! You are a place value star!",
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  if (streak >= 5) {
    return [
      { text: msg, style: 'celebration' },
      { text: "Fantastic streak! Keep going!", style: 'celebration' },
    ];
  }
  return [{ text: msg, style: 'celebration' }];
}

export function playWrongNarration() {
  return [{ text: "Let's check the place value chart again!", style: 'encouragement' }];
}

export function playHint1Narration() {
  return [{ text: "Hint: Look at each column of the place value chart.", style: 'thinking' }];
}

export function playHint2Narration() {
  return [{ text: "Hint: Break the number into blocks. Each digit tells you how many of each place value.", style: 'thinking' }];
}

export function districtCompleteNarration() {
  return [{ text: "Excellent work! You completed this district!", style: 'celebration' }];
}

export function districtUnlockNarration() {
  return [{ text: "You unlocked a new district! Well done!", style: 'celebration' }];
}

export function reflectNarration() {
  return [{ text: "Tell me one big number you can now expand!", style: 'question' }];
}

export function reflectCompleteNarration() {
  return [
    { text: "Congratulations! You have mastered expanded form of numbers up to one hundred thousand!", style: 'celebration' },
    { text: "You are now a Place Value Master! Great work today!", style: 'celebration' },
  ];
}

// ── Per-question narration for all 100 questions ──────────────────────────
export function questionNarration(question) {
  return [{ text: question.questionText, style: 'question' }];
}
