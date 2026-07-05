#!/usr/bin/env node
/**
 * generate_audio.js — Pre-generates all narration .mp3 files via ElevenLabs API
 * Run: node scripts/generate_audio.js
 * Output: public/assets/audio/*.mp3  +  updates src/utils/audioMap.js
 */

import fs   from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.join(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'public', 'assets', 'audio');
const AUDIO_MAP = path.join(ROOT, 'src', 'utils', 'audioMap.js');

const API_KEY  = 'sk_7ef27dccb32144843f8ee5068dfd4223a85326c56c14b00a';
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MODEL_ID = 'eleven_multilingual_v2';

const VOICE_SETTINGS = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

// ── All phrases to generate ────────────────────────────────────────────────
const PHRASES = [
  // Wonder
  { file: 'wonder_title',       style: 'celebration',  text: "The Big Mystery!" },
  { file: 'wonder_hook',        style: 'question',     text: "If a stadium has eighty-four thousand, three hundred and twenty-five seats, how would you build that number using only ten-thousands, thousands, hundreds, tens and ones?" },
  { file: 'wonder_investigate', style: 'encouragement', text: "Let's investigate how every big number is built from smaller parts!" },

  // Story panels
  { file: 'story_panel_0', style: 'statement',    text: "Siya works at a toy factory. One day, she needed to count a huge shipment of toy blocks!" },
  { file: 'story_panel_1', style: 'statement',    text: "She found 3 crates of ten-thousand blocks, 2 crates of one-thousand blocks, 4 trays of one-hundred blocks, 1 pack of ten blocks, and 6 loose blocks." },
  { file: 'story_panel_2', style: 'instruction',  text: "Siya arranged them in a place-value chart: Ten Thousands, Thousands, Hundreds, Tens, and Ones. Each column shows one part of the big number!" },
  { file: 'story_panel_3', style: 'celebration',  text: "So 3 ten-thousands plus 2 thousands plus 4 hundreds plus 1 ten plus 6 ones equals thirty-two thousand, four hundred and sixteen! That is the expanded form!" },

  // Simulate
  { file: 'sim_station_a_intro', style: 'instruction', text: "Station A: Drag the place value blocks into the build zone to match the target number. Watch the expanded form appear as you build!" },
  { file: 'sim_station_b_intro', style: 'instruction', text: "Station B: Look at the target number and drag the correct chips to build the expanded form addition sentence." },
  { file: 'sim_station_c_intro', style: 'instruction', text: "Station C: Move each slider to change a digit. Watch how the number and its expanded form change instantly!" },
  { file: 'sim_station_d_intro', style: 'question',    text: "Station D: One of the terms in the expanded form is wrong. Can you spot the error and tap the incorrect term?" },
  { file: 'sim_correct',         style: 'celebration', text: "Amazing! You built the number correctly!" },
  { file: 'sim_wrong',           style: 'encouragement', text: "Not quite! Try removing some blocks and try again." },
  { file: 'sim_b_correct',       style: 'celebration', text: "Well done! You assembled the expanded form perfectly!" },
  { file: 'sim_b_wrong',         style: 'encouragement', text: "Look again! Check which chips match each column of the place value chart." },
  { file: 'sim_d_correct',       style: 'celebration', text: "Great spotting! That term was wrong. Here is the correct expanded form!" },
  { file: 'sim_d_wrong',         style: 'encouragement', text: "Look again! Check each place value column carefully." },

  // Play
  { file: 'play_correct',           style: 'celebration',   text: "Amazing! You expanded it perfectly!" },
  { file: 'play_correct_2',         style: 'celebration',   text: "Brilliant! That is exactly right!" },
  { file: 'play_correct_3',         style: 'celebration',   text: "Superb! You know your place values!" },
  { file: 'play_correct_4',         style: 'celebration',   text: "Excellent! Well done!" },
  { file: 'play_correct_5',         style: 'celebration',   text: "Perfect! You are a place value star!" },
  { file: 'play_wrong',             style: 'encouragement', text: "Let's check the place value chart again!" },
  { file: 'play_streak',            style: 'celebration',   text: "Fantastic streak! Keep going!" },
  { file: 'play_district_complete', style: 'celebration',   text: "Excellent work! You completed this district!" },
  { file: 'play_district_unlock',   style: 'celebration',   text: "You unlocked a new district! Well done!" },
  { file: 'play_hint1',             style: 'thinking',      text: "Hint: Look at each column of the place value chart." },
  { file: 'play_hint2',             style: 'thinking',      text: "Hint: Break the number into blocks. Each digit tells you how many of each place value." },

  // All 100 question read-alouds (Questions 1–10 from each type)
  // Q1
  { file: 'q1_001', style: 'question', text: "Write 15,230 in expanded form." },
  { file: 'q1_002', style: 'question', text: "Write 12,045 in expanded form." },
  { file: 'q1_003', style: 'question', text: "Write 18,300 in expanded form." },
  { file: 'q1_004', style: 'question', text: "Write 11,111 in expanded form." },
  { file: 'q1_005', style: 'question', text: "Write 43,607 in expanded form." },
  { file: 'q1_006', style: 'question', text: "Write 56,089 in expanded form." },
  { file: 'q1_007', style: 'question', text: "Write 72,450 in expanded form." },
  { file: 'q1_008', style: 'question', text: "Write 84,325 in expanded form." },
  { file: 'q1_009', style: 'question', text: "Write 90,004 in expanded form." },
  { file: 'q1_010', style: 'question', text: "Write 100,000 in expanded form." },
  // Q2
  { file: 'q2_001', style: 'question', text: "10,000 plus 3,000 plus 200 plus 0 plus 0 equals what?" },
  { file: 'q2_002', style: 'question', text: "10,000 plus 7,000 plus 0 plus 50 plus 0 equals what?" },
  { file: 'q2_003', style: 'question', text: "10,000 plus 4,000 plus 300 plus 20 plus 1 equals what?" },
  { file: 'q2_004', style: 'question', text: "10,000 plus 9,000 plus 0 plus 0 plus 9 equals what?" },
  { file: 'q2_005', style: 'question', text: "40,000 plus 7,000 plus 200 plus 0 plus 8 equals what?" },
  { file: 'q2_006', style: 'question', text: "50,000 plus 3,000 plus 600 plus 70 plus 0 equals what?" },
  { file: 'q2_007', style: 'question', text: "60,000 plus 1,000 plus 0 plus 0 plus 5 equals what?" },
  { file: 'q2_008', style: 'question', text: "70,000 plus 8,000 plus 500 plus 40 plus 0 equals what?" },
  { file: 'q2_009', style: 'question', text: "90,000 plus 5,000 plus 0 plus 0 plus 1 equals what?" },
  { file: 'q2_010', style: 'question', text: "90,000 plus 9,000 plus 900 plus 90 plus 9 equals what?" },
  // Q3
  { file: 'q3_001', style: 'question', text: "What digit is in the Thousands place of 14,523?" },
  { file: 'q3_002', style: 'question', text: "What digit is in the Hundreds place of 36,712?" },
  { file: 'q3_003', style: 'question', text: "What digit is in the Ten-Thousands place of 52,908?" },
  { file: 'q3_004', style: 'question', text: "What digit is in the Tens place of 80,346?" },
  { file: 'q3_005', style: 'question', text: "What digit is in the Ones place of 17,600?" },
  { file: 'q3_006', style: 'question', text: "What digit is in the Hundreds place of 64,038?" },
  { file: 'q3_007', style: 'question', text: "What digit is in the Thousands place of 75,219?" },
  { file: 'q3_008', style: 'question', text: "What digit is in the Hundreds place of 93,045?" },
  { file: 'q3_009', style: 'question', text: "What digit is in the Thousands place of 100,000?" },
  { file: 'q3_010', style: 'question', text: "Which place value is the digit 6 in, within 80,006?" },
  // Q4
  { file: 'q4_001', style: 'question', text: "What is the value of the digit 4 in 14,523?" },
  { file: 'q4_002', style: 'question', text: "What is the value of the digit 5 in 52,908?" },
  { file: 'q4_003', style: 'question', text: "What is the value of the digit 7 in 36,712?" },
  { file: 'q4_004', style: 'question', text: "What is the value of the digit 2 in 84,325?" },
  { file: 'q4_005', style: 'question', text: "What is the value of the digit 2 in 47,208?" },
  { file: 'q4_006', style: 'question', text: "What is the value of the digit 3 in 73,405?" },
  { file: 'q4_007', style: 'question', text: "What is the value of the digit 9 in 65,890?" },
  { file: 'q4_008', style: 'question', text: "What is the value of the digit 9 in 92,037?" },
  { file: 'q4_009', style: 'question', text: "What is the value of the digit 8 in 80,006?" },
  { file: 'q4_010', style: 'question', text: "In 99,999, what is the value of the digit in the Hundreds place?" },
  // Q5
  { file: 'q5_001', style: 'question', text: "Oliver counted 13,500 books at his school library. Write 13,500 in expanded form." },
  { file: 'q5_002', style: 'question', text: "Emma counted 47,208 commuters at a busy train station. Write 47,208 in expanded form." },
  { file: 'q5_003', style: 'question', text: "A zoo in the city had 62,481 visitors over the holidays. Write this number in expanded form." },
  { file: 'q5_004', style: 'question', text: "Lucas counted 38,060 tickets sold for a school sports day. Write 38,060 in expanded form." },
  { file: 'q5_005', style: 'question', text: "A concert hall sold 55,300 tickets this year. Write 55,300 in expanded form." },
  { file: 'q5_006', style: 'question', text: "A national stadium has 71,090 seats. Write 71,090 in expanded form." },
  { file: 'q5_007', style: 'question', text: "A large apartment building has 83,007 units. Write 83,007 in expanded form." },
  { file: 'q5_008', style: 'question', text: "A library ordered 90,054 new books. Write 90,054 in expanded form." },
  { file: 'q5_009', style: 'question', text: "A theme park sold 75,600 tickets in one month. Write 75,600 in expanded form." },
  { file: 'q5_010', style: 'question', text: "A city counted 100,000 residents in a survey. Write 100,000 in expanded form." },
  // Q6
  { file: 'q6_001', style: 'question', text: "Is this correct? 13,200 equals 10,000 plus 3,000 plus 200 plus 0 plus 0. True or False?" },
  { file: 'q6_002', style: 'question', text: "Is this correct? 25,400 equals 20,000 plus 500 plus 400 plus 0 plus 0. True or False?" },
  { file: 'q6_003', style: 'question', text: "Is this correct? 56,300 equals 50,000 plus 6,000 plus 300 plus 0 plus 0. True or False?" },
  { file: 'q6_004', style: 'question', text: "Is this correct? 43,910 equals 40,000 plus 3,000 plus 90 plus 10 plus 0. True or False?" },
  { file: 'q6_005', style: 'question', text: "Is this correct? 70,802 equals 70,000 plus 0 plus 800 plus 0 plus 2. True or False?" },
  { file: 'q6_006', style: 'question', text: "Is this correct? 84,325 equals 80,000 plus 4,000 plus 300 plus 25. True or False?" },
  { file: 'q6_007', style: 'question', text: "Is this correct? 91,005 equals 90,000 plus 1,000 plus 500. True or False?" },
  { file: 'q6_008', style: 'question', text: "Is this correct? 37,040 equals 30,000 plus 7,000 plus 0 plus 40 plus 0. True or False?" },
  { file: 'q6_009', style: 'question', text: "Is this correct? 60,009 equals 60,000 plus 9,000 plus 9. True or False?" },
  { file: 'q6_010', style: 'question', text: "Is this correct? 99,900 equals 90,000 plus 9,000 plus 900 plus 0 plus 0. True or False?" },
  // Q7
  { file: 'q7_001', style: 'question', text: "Which expanded form matches 15,600?" },
  { file: 'q7_002', style: 'question', text: "Which expanded form matches 28,400?" },
  { file: 'q7_003', style: 'question', text: "Which expanded form matches 32,716?" },
  { file: 'q7_004', style: 'question', text: "Which expanded form matches 47,503?" },
  { file: 'q7_005', style: 'question', text: "Which expanded form matches 71,090?" },
  { file: 'q7_006', style: 'question', text: "Which expanded form matches 85,002?" },
  { file: 'q7_007', style: 'question', text: "Which expanded form matches 63,740?" },
  { file: 'q7_008', style: 'question', text: "Which expanded form matches 92,508?" },
  { file: 'q7_009', style: 'question', text: "Which expanded form matches 40,008?" },
  { file: 'q7_010', style: 'question', text: "Which expanded form matches 100,000?" },
  // Q8
  { file: 'q8_001', style: 'question', text: "10,000 plus blank plus 200 plus 40 plus 0 equals 13,240. What is the missing term?" },
  { file: 'q8_002', style: 'question', text: "20,000 plus 5,000 plus 300 plus 0 plus blank equals 25,304. What is the missing term?" },
  { file: 'q8_003', style: 'question', text: "40,000 plus 6,000 plus blank plus 10 plus 9 equals 46,819. What is the missing term?" },
  { file: 'q8_004', style: 'question', text: "60,000 plus blank plus 500 plus 10 plus 2 equals 68,512. What is the missing term?" },
  { file: 'q8_005', style: 'question', text: "Blank plus 4,000 plus 300 plus 0 plus 6 equals 74,306. What is the missing term?" },
  { file: 'q8_006', style: 'question', text: "50,000 plus 3,000 plus 700 plus blank plus 0 equals 53,720. What is the missing term?" },
  { file: 'q8_007', style: 'question', text: "80,000 plus 2,000 plus blank plus 40 plus 5 equals 82,045. What is the missing term?" },
  { file: 'q8_008', style: 'question', text: "90,000 plus 1,000 plus 500 plus blank plus 8 equals 91,508. What is the missing term?" },
  { file: 'q8_009', style: 'question', text: "60,000 plus blank plus 300 plus 0 plus 2 equals 60,302. What is the missing term?" },
  { file: 'q8_010', style: 'question', text: "70,000 plus 9,000 plus 600 plus 30 plus blank equals 79,630. What is the missing term?" },
  // Q9
  { file: 'q9_001', style: 'question', text: "Which is greater: 18,000 or 12,000?" },
  { file: 'q9_002', style: 'question', text: "Which is greater: 45,900 or 45,090?" },
  { file: 'q9_003', style: 'question', text: "Which is smaller: 33,000 or 30,033?" },
  { file: 'q9_004', style: 'question', text: "Which is greater: 27,500 or 25,700?" },
  { file: 'q9_005', style: 'question', text: "Which is smaller: 60,500 or 60,050?" },
  { file: 'q9_006', style: 'question', text: "Which is greater: 72,480 or 72,840?" },
  { file: 'q9_007', style: 'question', text: "Which is greater: 88,000 or 80,800?" },
  { file: 'q9_008', style: 'question', text: "Which is smaller: 95,001 or 95,100?" },
  { file: 'q9_009', style: 'question', text: "Which is greater: 99,090 or 99,009?" },
  { file: 'q9_010', style: 'question', text: "Which is greater: 100,000 or 99,999?" },
  // Q10
  { file: 'q10_001', style: 'question', text: "What comes next? 12,000, 22,000, 32,000, blank?" },
  { file: 'q10_002', style: 'question', text: "What comes next? 11,000, 12,000, 13,000, 14,000, blank?" },
  { file: 'q10_003', style: 'question', text: "What comes next? 19,300, 19,400, 19,500, 19,600, blank?" },
  { file: 'q10_004', style: 'question', text: "What comes next? 16,000, 16,010, 16,020, 16,030, blank?" },
  { file: 'q10_005', style: 'question', text: "What comes next? 25,000, 35,000, 45,000, 55,000, blank?" },
  { file: 'q10_006', style: 'question', text: "What comes next? 44,000, 45,000, 46,000, 47,000, blank?" },
  { file: 'q10_007', style: 'question', text: "What comes next? 73,200, 73,300, 73,400, 73,500, blank?" },
  { file: 'q10_008', style: 'question', text: "What comes next? 87,010, 87,020, 87,030, 87,040, blank?" },
  { file: 'q10_009', style: 'question', text: "What comes next? 94,000, 95,000, 96,000, 97,000, blank?" },
  { file: 'q10_010', style: 'question', text: "What comes next? 96,000, 97,000, 98,000, 99,000, blank?" },

  // Reflect
  { file: 'reflect_prompt',   style: 'question',    text: "Tell me one big number you can now expand!" },
  { file: 'reflect_complete', style: 'celebration', text: "Congratulations! You have mastered expanded form of numbers up to one hundred thousand!" },
  { file: 'reflect_trophy',   style: 'celebration', text: "You are now a Place Value Master! Great work today!" },
];

// ── Ensure output dir exists ──────────────────────────────────────────────
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  console.log('Created', AUDIO_DIR);
}

// ── Download one phrase ───────────────────────────────────────────────────
function downloadAudio(text, style, outFile) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(outFile)) {
      console.log('  ✓ Exists:', path.basename(outFile));
      resolve(true);
      return;
    }
    const settings = VOICE_SETTINGS[style] || VOICE_SETTINGS.statement;
    const body = JSON.stringify({ text, model_id: MODEL_ID, voice_settings: settings });
    const opts = {
      hostname: 'api.elevenlabs.io',
      path:     `/v1/text-to-speech/${VOICE_ID}`,
      method:   'POST',
      headers: {
        'xi-api-key':    API_KEY,
        'Content-Type':  'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(opts, res => {
      if (res.statusCode !== 200) {
        let err = '';
        res.on('data', d => err += d);
        res.on('end', () => reject(new Error(`HTTP ${res.statusCode}: ${err.slice(0,100)}`)));
        return;
      }
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => {
        fs.writeFileSync(outFile, Buffer.concat(chunks));
        console.log('  ✓ Generated:', path.basename(outFile));
        resolve(true);
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🎙️  Generating ${PHRASES.length} audio files...\n`);
  const audioMapEntries = {};
  let ok = 0; let fail = 0;

  for (const p of PHRASES) {
    const outFile = path.join(AUDIO_DIR, `${p.file}.mp3`);
    try {
      await downloadAudio(p.text, p.style, outFile);
      audioMapEntries[p.text] = `/assets/audio/${p.file}.mp3`;
      ok++;
      // Rate limit: 2 req/s
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(`  ✗ FAILED ${p.file}:`, e.message);
      fail++;
    }
  }

  // Write updated audioMap.js
  const mapContent = `// Auto-generated by scripts/generate_audio.js — DO NOT EDIT MANUALLY\n\nconst audioMap = ${JSON.stringify(audioMapEntries, null, 2)};\n\nexport default audioMap;\n`;
  fs.writeFileSync(AUDIO_MAP, mapContent);
  console.log(`\n✅ Done! ${ok} generated, ${fail} failed.`);
  console.log(`📝 Updated audioMap.js with ${Object.keys(audioMapEntries).length} entries.\n`);
}

main().catch(console.error);
