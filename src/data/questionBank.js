// ── 100 Questions — 10 types × 10 questions ──────────────────────────────
// Types: standard_to_expanded, expanded_to_standard, place_value_id,
//        digit_value, word_problem, true_false, match_expanded,
//        missing_term, compare_numbers, number_pattern

const Q = [];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q1 — Standard → Expanded Form (10 questions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q.push({
  id:"Q1_001", type:"standard_to_expanded", district:0, difficulty:1,
  value:15230, digits:{tenThousands:1,thousands:5,hundreds:2,tens:3,ones:0},
  expandedTerms:[10000,5000,200,30,0],
  questionText:"Write 15,230 in expanded form.",
  visual:"chart",
  options:["10,000 + 5,000 + 200 + 30 + 0","10,000 + 5,000 + 20 + 3 + 0","1,000 + 5,000 + 200 + 30 + 0","10,000 + 500 + 200 + 30 + 0"],
  correctAnswer:"10,000 + 5,000 + 200 + 30 + 0",
  hint1:"Look at each column of the place value chart.",
  hint2:"Break it apart: 1 ten-thousand, 5 thousands, 2 hundreds, 3 tens, 0 ones.",
  explanation:"15,230 = 10,000 + 5,000 + 200 + 30 + 0",
});
Q.push({
  id:"Q1_002", type:"standard_to_expanded", district:0, difficulty:1,
  value:12045, digits:{tenThousands:1,thousands:2,hundreds:0,tens:4,ones:5},
  expandedTerms:[10000,2000,0,40,5],
  questionText:"Write 12,045 in expanded form.",
  visual:"chart",
  options:["10,000 + 2,000 + 0 + 40 + 5","10,000 + 200 + 0 + 40 + 5","1,000 + 2,000 + 0 + 40 + 5","10,000 + 2,000 + 400 + 5"],
  correctAnswer:"10,000 + 2,000 + 0 + 40 + 5",
  hint1:"Look at the Hundreds column — what digit is there?",
  hint2:"12,045: 1 ten-thousand, 2 thousands, 0 hundreds, 4 tens, 5 ones.",
  explanation:"12,045 = 10,000 + 2,000 + 0 + 40 + 5",
});
Q.push({
  id:"Q1_003", type:"standard_to_expanded", district:1, difficulty:1,
  value:18300, digits:{tenThousands:1,thousands:8,hundreds:3,tens:0,ones:0},
  expandedTerms:[10000,8000,300,0,0],
  questionText:"Write 18,300 in expanded form.",
  visual:"chart",
  options:["10,000 + 8,000 + 300 + 0 + 0","10,000 + 800 + 300 + 0 + 0","10,000 + 8,000 + 30 + 0 + 0","1,000 + 8,000 + 300 + 0 + 0"],
  correctAnswer:"10,000 + 8,000 + 300 + 0 + 0",
  hint1:"18,300 has no tens and no ones.",
  hint2:"1 ten-thousand, 8 thousands, 3 hundreds, 0 tens, 0 ones.",
  explanation:"18,300 = 10,000 + 8,000 + 300 + 0 + 0",
});
Q.push({
  id:"Q1_004", type:"standard_to_expanded", district:1, difficulty:1,
  value:11111, digits:{tenThousands:1,thousands:1,hundreds:1,tens:1,ones:1},
  expandedTerms:[10000,1000,100,10,1],
  questionText:"Write 11,111 in expanded form.",
  visual:"chart",
  options:["10,000 + 1,000 + 100 + 10 + 1","1,000 + 100 + 10 + 1","10,000 + 1,000 + 10 + 1","10,000 + 100 + 10 + 1"],
  correctAnswer:"10,000 + 1,000 + 100 + 10 + 1",
  hint1:"Every digit is 1 in 11,111.",
  hint2:"Each 1 is in a different place: 10,000, 1,000, 100, 10, 1.",
  explanation:"11,111 = 10,000 + 1,000 + 100 + 10 + 1",
});
Q.push({
  id:"Q1_005", type:"standard_to_expanded", district:2, difficulty:2,
  value:43607, digits:{tenThousands:4,thousands:3,hundreds:6,tens:0,ones:7},
  expandedTerms:[40000,3000,600,0,7],
  questionText:"Write 43,607 in expanded form.",
  visual:"chart",
  options:["40,000 + 3,000 + 600 + 0 + 7","40,000 + 3,000 + 60 + 0 + 7","4,000 + 3,000 + 600 + 0 + 7","40,000 + 300 + 600 + 0 + 7"],
  correctAnswer:"40,000 + 3,000 + 600 + 0 + 7",
  hint1:"Check the tens column — it's zero!",
  hint2:"4 ten-thousands, 3 thousands, 6 hundreds, 0 tens, 7 ones.",
  explanation:"43,607 = 40,000 + 3,000 + 600 + 0 + 7",
});
Q.push({
  id:"Q1_006", type:"standard_to_expanded", district:3, difficulty:2,
  value:56089, digits:{tenThousands:5,thousands:6,hundreds:0,tens:8,ones:9},
  expandedTerms:[50000,6000,0,80,9],
  questionText:"Write 56,089 in expanded form.",
  visual:"chart",
  options:["50,000 + 6,000 + 0 + 80 + 9","50,000 + 6,000 + 800 + 80 + 9","50,000 + 600 + 0 + 80 + 9","5,000 + 6,000 + 0 + 80 + 9"],
  correctAnswer:"50,000 + 6,000 + 0 + 80 + 9",
  hint1:"The hundreds digit is zero — don't skip it!",
  hint2:"5 ten-thousands, 6 thousands, 0 hundreds, 8 tens, 9 ones.",
  explanation:"56,089 = 50,000 + 6,000 + 0 + 80 + 9",
});
Q.push({
  id:"Q1_007", type:"standard_to_expanded", district:5, difficulty:2,
  value:72450, digits:{tenThousands:7,thousands:2,hundreds:4,tens:5,ones:0},
  expandedTerms:[70000,2000,400,50,0],
  questionText:"Write 72,450 in expanded form.",
  visual:"chart",
  options:["70,000 + 2,000 + 400 + 50 + 0","70,000 + 200 + 400 + 50 + 0","7,000 + 2,000 + 400 + 50 + 0","70,000 + 2,000 + 40 + 50 + 0"],
  correctAnswer:"70,000 + 2,000 + 400 + 50 + 0",
  hint1:"The ones digit is zero — include it!",
  hint2:"7 ten-thousands, 2 thousands, 4 hundreds, 5 tens, 0 ones.",
  explanation:"72,450 = 70,000 + 2,000 + 400 + 50 + 0",
});
Q.push({
  id:"Q1_008", type:"standard_to_expanded", district:6, difficulty:2,
  value:84325, digits:{tenThousands:8,thousands:4,hundreds:3,tens:2,ones:5},
  expandedTerms:[80000,4000,300,20,5],
  questionText:"Write 84,325 in expanded form.",
  visual:"chart",
  options:["80,000 + 4,000 + 300 + 20 + 5","80,000 + 400 + 300 + 20 + 5","8,000 + 4,000 + 300 + 20 + 5","80,000 + 4,000 + 30 + 20 + 5"],
  correctAnswer:"80,000 + 4,000 + 300 + 20 + 5",
  hint1:"The stadium number from the Wonder phase!",
  hint2:"8 ten-thousands, 4 thousands, 3 hundreds, 2 tens, 5 ones.",
  explanation:"84,325 = 80,000 + 4,000 + 300 + 20 + 5",
});
Q.push({
  id:"Q1_009", type:"standard_to_expanded", district:7, difficulty:3,
  value:90004, digits:{tenThousands:9,thousands:0,hundreds:0,tens:0,ones:4},
  expandedTerms:[90000,0,0,0,4],
  questionText:"Write 90,004 in expanded form.",
  visual:"chart",
  options:["90,000 + 0 + 0 + 0 + 4","90,000 + 4,000 + 0 + 0 + 4","9,000 + 0 + 0 + 0 + 4","90,000 + 400 + 0 + 0 + 4"],
  correctAnswer:"90,000 + 0 + 0 + 0 + 4",
  hint1:"Most digits are zero — but still include them!",
  hint2:"9 ten-thousands, 0 thousands, 0 hundreds, 0 tens, 4 ones.",
  explanation:"90,004 = 90,000 + 0 + 0 + 0 + 4",
});
Q.push({
  id:"Q1_010", type:"standard_to_expanded", district:9, difficulty:3,
  value:100000, digits:{tenThousands:10,thousands:0,hundreds:0,tens:0,ones:0},
  expandedTerms:[100000,0,0,0,0],
  questionText:"Write 100,000 in expanded form.",
  visual:"chart",
  options:["100,000 + 0 + 0 + 0 + 0","10,000 + 0 + 0 + 0 + 0","100,000 + 10,000","1,000 + 0 + 0 + 0 + 0"],
  correctAnswer:"100,000 + 0 + 0 + 0 + 0",
  hint1:"100,000 is exactly one hundred thousand.",
  hint2:"All other columns are zero.",
  explanation:"100,000 = 100,000 + 0 + 0 + 0 + 0",
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q2 — Expanded → Standard Form (10 questions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q.push({
  id:"Q2_001", type:"expanded_to_standard", district:0, difficulty:1,
  value:13200, digits:{tenThousands:1,thousands:3,hundreds:2,tens:0,ones:0},
  expandedTerms:[10000,3000,200,0,0],
  questionText:"10,000 + 3,000 + 200 + 0 + 0 = ?",
  visual:"sentence",
  options:["13,200","1,320","13,020","13,002"],
  correctAnswer:"13,200",
  hint1:"Add the values in each column.",
  hint2:"10,000 + 3,000 = 13,000. Then add 200.",
  explanation:"10,000 + 3,000 + 200 + 0 + 0 = 13,200",
});
Q.push({
  id:"Q2_002", type:"expanded_to_standard", district:0, difficulty:1,
  value:17050, digits:{tenThousands:1,thousands:7,hundreds:0,tens:5,ones:0},
  expandedTerms:[10000,7000,0,50,0],
  questionText:"10,000 + 7,000 + 0 + 50 + 0 = ?",
  visual:"sentence",
  options:["17,050","17,500","1,705","17,005"],
  correctAnswer:"17,050",
  hint1:"No hundreds or ones in this number.",
  hint2:"10,000 + 7,000 = 17,000. Add 50 to get 17,050.",
  explanation:"10,000 + 7,000 + 0 + 50 + 0 = 17,050",
});
Q.push({
  id:"Q2_003", type:"expanded_to_standard", district:1, difficulty:1,
  value:14321, digits:{tenThousands:1,thousands:4,hundreds:3,tens:2,ones:1},
  expandedTerms:[10000,4000,300,20,1],
  questionText:"10,000 + 4,000 + 300 + 20 + 1 = ?",
  visual:"sentence",
  options:["14,321","1,4321","14,231","14,312"],
  correctAnswer:"14,321",
  hint1:"Add from the biggest value down.",
  hint2:"10,000 + 4,000 + 300 + 20 + 1 = 14,321.",
  explanation:"10,000 + 4,000 + 300 + 20 + 1 = 14,321",
});
Q.push({
  id:"Q2_004", type:"expanded_to_standard", district:1, difficulty:1,
  value:19009, digits:{tenThousands:1,thousands:9,hundreds:0,tens:0,ones:9},
  expandedTerms:[10000,9000,0,0,9],
  questionText:"10,000 + 9,000 + 0 + 0 + 9 = ?",
  visual:"sentence",
  options:["19,009","19,900","1,909","19,090"],
  correctAnswer:"19,009",
  hint1:"No hundreds or tens — careful with the zeros!",
  hint2:"10,000 + 9,000 = 19,000. Add just 9 ones.",
  explanation:"10,000 + 9,000 + 0 + 0 + 9 = 19,009",
});
Q.push({
  id:"Q2_005", type:"expanded_to_standard", district:3, difficulty:2,
  value:47208, digits:{tenThousands:4,thousands:7,hundreds:2,tens:0,ones:8},
  expandedTerms:[40000,7000,200,0,8],
  questionText:"40,000 + 7,000 + 200 + 0 + 8 = ?",
  visual:"sentence",
  options:["47,208","4,728","47,028","47,280"],
  correctAnswer:"47,208",
  hint1:"No tens in this number.",
  hint2:"40,000 + 7,000 + 200 + 8 = 47,208.",
  explanation:"40,000 + 7,000 + 200 + 0 + 8 = 47,208",
});
Q.push({
  id:"Q2_006", type:"expanded_to_standard", district:4, difficulty:2,
  value:53670, digits:{tenThousands:5,thousands:3,hundreds:6,tens:7,ones:0},
  expandedTerms:[50000,3000,600,70,0],
  questionText:"50,000 + 3,000 + 600 + 70 + 0 = ?",
  visual:"sentence",
  options:["53,670","5,367","53,760","53,607"],
  correctAnswer:"53,670",
  hint1:"No ones in this number.",
  hint2:"50,000 + 3,000 = 53,000. Add 600 and 70.",
  explanation:"50,000 + 3,000 + 600 + 70 + 0 = 53,670",
});
Q.push({
  id:"Q2_007", type:"expanded_to_standard", district:5, difficulty:2,
  value:61005, digits:{tenThousands:6,thousands:1,hundreds:0,tens:0,ones:5},
  expandedTerms:[60000,1000,0,0,5],
  questionText:"60,000 + 1,000 + 0 + 0 + 5 = ?",
  visual:"sentence",
  options:["61,005","61,050","61,500","6,105"],
  correctAnswer:"61,005",
  hint1:"No hundreds or tens — watch those zeros!",
  hint2:"60,000 + 1,000 = 61,000. Add 5 ones.",
  explanation:"60,000 + 1,000 + 0 + 0 + 5 = 61,005",
});
Q.push({
  id:"Q2_008", type:"expanded_to_standard", district:6, difficulty:2,
  value:78540, digits:{tenThousands:7,thousands:8,hundreds:5,tens:4,ones:0},
  expandedTerms:[70000,8000,500,40,0],
  questionText:"70,000 + 8,000 + 500 + 40 + 0 = ?",
  visual:"sentence",
  options:["78,540","7,854","78,504","78,450"],
  correctAnswer:"78,540",
  hint1:"No ones in this number.",
  hint2:"70,000 + 8,000 = 78,000. Add 500 and 40.",
  explanation:"70,000 + 8,000 + 500 + 40 + 0 = 78,540",
});
Q.push({
  id:"Q2_009", type:"expanded_to_standard", district:8, difficulty:3,
  value:95001, digits:{tenThousands:9,thousands:5,hundreds:0,tens:0,ones:1},
  expandedTerms:[90000,5000,0,0,1],
  questionText:"90,000 + 5,000 + 0 + 0 + 1 = ?",
  visual:"sentence",
  options:["95,001","95,010","9,501","95,100"],
  correctAnswer:"95,001",
  hint1:"Three zeros in the middle!",
  hint2:"90,000 + 5,000 = 95,000. Then add just 1.",
  explanation:"90,000 + 5,000 + 0 + 0 + 1 = 95,001",
});
Q.push({
  id:"Q2_010", type:"expanded_to_standard", district:9, difficulty:3,
  value:99999, digits:{tenThousands:9,thousands:9,hundreds:9,tens:9,ones:9},
  expandedTerms:[90000,9000,900,90,9],
  questionText:"90,000 + 9,000 + 900 + 90 + 9 = ?",
  visual:"sentence",
  options:["99,999","9,999","90,909","99,909"],
  correctAnswer:"99,999",
  hint1:"Every digit is 9.",
  hint2:"90,000 + 9,000 + 900 + 90 + 9 = 99,999.",
  explanation:"90,000 + 9,000 + 900 + 90 + 9 = 99,999",
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q3 — Identify Place Value (10 questions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q.push({ id:"Q3_001", type:"place_value_id", district:0, difficulty:1, value:14523, digits:{tenThousands:1,thousands:4,hundreds:5,tens:2,ones:3}, expandedTerms:[10000,4000,500,20,3], questionText:"What digit is in the Thousands place of 14,523?", visual:"chart", options:["1","4","5","2"], correctAnswer:"4", hint1:"The Thousands column is the second column from the left.", hint2:"14,523: Ten-Th=1, Th=4, H=5, T=2, O=3.", explanation:"In 14,523, the digit in the Thousands place is 4." });
Q.push({ id:"Q3_002", type:"place_value_id", district:0, difficulty:1, value:36712, digits:{tenThousands:3,thousands:6,hundreds:7,tens:1,ones:2}, expandedTerms:[30000,6000,700,10,2], questionText:"What digit is in the Hundreds place of 36,712?", visual:"chart", options:["3","6","7","1"], correctAnswer:"7", hint1:"The Hundreds column is the third from the left.", hint2:"36,712: Ten-Th=3, Th=6, H=7, T=1, O=2.", explanation:"In 36,712, the digit in the Hundreds place is 7." });
Q.push({ id:"Q3_003", type:"place_value_id", district:0, difficulty:1, value:52908, digits:{tenThousands:5,thousands:2,hundreds:9,tens:0,ones:8}, expandedTerms:[50000,2000,900,0,8], questionText:"What digit is in the Ten-Thousands place of 52,908?", visual:"chart", options:["5","2","9","8"], correctAnswer:"5", hint1:"The Ten-Thousands column is the first (leftmost) column.", hint2:"52,908: Ten-Th=5, Th=2, H=9, T=0, O=8.", explanation:"In 52,908, the digit in the Ten-Thousands place is 5." });
Q.push({ id:"Q3_004", type:"place_value_id", district:1, difficulty:1, value:80346, digits:{tenThousands:8,thousands:0,hundreds:3,tens:4,ones:6}, expandedTerms:[80000,0,300,40,6], questionText:"What digit is in the Tens place of 80,346?", visual:"chart", options:["8","3","4","6"], correctAnswer:"4", hint1:"The Tens column is the second from the right.", hint2:"80,346: Ten-Th=8, Th=0, H=3, T=4, O=6.", explanation:"In 80,346, the digit in the Tens place is 4." });
Q.push({ id:"Q3_005", type:"place_value_id", district:1, difficulty:1, value:17600, digits:{tenThousands:1,thousands:7,hundreds:6,tens:0,ones:0}, expandedTerms:[10000,7000,600,0,0], questionText:"What digit is in the Ones place of 17,600?", visual:"chart", options:["1","7","6","0"], correctAnswer:"0", hint1:"The Ones column is the rightmost column.", hint2:"17,600: Ten-Th=1, Th=7, H=6, T=0, O=0.", explanation:"In 17,600, the digit in the Ones place is 0." });
Q.push({ id:"Q3_006", type:"place_value_id", district:3, difficulty:2, value:64038, digits:{tenThousands:6,thousands:4,hundreds:0,tens:3,ones:8}, expandedTerms:[60000,4000,0,30,8], questionText:"What digit is in the Hundreds place of 64,038?", visual:"chart", options:["6","4","0","3"], correctAnswer:"0", hint1:"Check the middle column — sometimes it is zero!", hint2:"64,038: Ten-Th=6, Th=4, H=0, T=3, O=8.", explanation:"In 64,038, the digit in the Hundreds place is 0." });
Q.push({ id:"Q3_007", type:"place_value_id", district:4, difficulty:2, value:75219, digits:{tenThousands:7,thousands:5,hundreds:2,tens:1,ones:9}, expandedTerms:[70000,5000,200,10,9], questionText:"What digit is in the Thousands place of 75,219?", visual:"chart", options:["7","5","2","1"], correctAnswer:"5", hint1:"Count: Ten-Th, Th — you want the second column.", hint2:"75,219: Ten-Th=7, Th=5, H=2, T=1, O=9.", explanation:"In 75,219, the digit in the Thousands place is 5." });
Q.push({ id:"Q3_008", type:"place_value_id", district:6, difficulty:2, value:93045, digits:{tenThousands:9,thousands:3,hundreds:0,tens:4,ones:5}, expandedTerms:[90000,3000,0,40,5], questionText:"What digit is in the Hundreds place of 93,045?", visual:"chart", options:["9","3","0","4"], correctAnswer:"0", hint1:"93,045 has a zero somewhere in the middle.", hint2:"93,045: Ten-Th=9, Th=3, H=0, T=4, O=5.", explanation:"In 93,045, the digit in the Hundreds place is 0." });
Q.push({ id:"Q3_009", type:"place_value_id", district:7, difficulty:3, value:100000, digits:{tenThousands:10,thousands:0,hundreds:0,tens:0,ones:0}, expandedTerms:[100000,0,0,0,0], questionText:"What digit is in the Thousands place of 100,000?", visual:"chart", options:["1","0","10","100"], correctAnswer:"0", hint1:"100,000 is one hundred thousand. All other digits are zero.", hint2:"10-Th=10, Th=0, H=0, T=0, O=0.", explanation:"In 100,000, the digit in the Thousands place is 0." });
Q.push({ id:"Q3_010", type:"place_value_id", district:8, difficulty:3, value:80006, digits:{tenThousands:8,thousands:0,hundreds:0,tens:0,ones:6}, expandedTerms:[80000,0,0,0,6], questionText:"Which place value is the digit 6 in, within 80,006?", visual:"chart", options:["Ten-Thousands","Thousands","Tens","Ones"], correctAnswer:"Ones", hint1:"6 is the rightmost digit.", hint2:"80,006: Ten-Th=8, Th=0, H=0, T=0, O=6.", explanation:"In 80,006, the 6 is in the Ones place." });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q4 — Value of a Digit (10 questions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q.push({ id:"Q4_001", type:"digit_value", district:0, difficulty:1, value:14523, digits:{tenThousands:1,thousands:4,hundreds:5,tens:2,ones:3}, expandedTerms:[10000,4000,500,20,3], questionText:"What is the VALUE of the digit 4 in 14,523?", visual:"chart", options:["4","400","4,000","40,000"], correctAnswer:"4,000", hint1:"The 4 is in the Thousands column.", hint2:"4 in the Thousands place = 4 × 1,000 = 4,000.", explanation:"The digit 4 is in the Thousands place, so its value is 4,000." });
Q.push({ id:"Q4_002", type:"digit_value", district:0, difficulty:1, value:52908, digits:{tenThousands:5,thousands:2,hundreds:9,tens:0,ones:8}, expandedTerms:[50000,2000,900,0,8], questionText:"What is the VALUE of the digit 5 in 52,908?", visual:"chart", options:["5","500","5,000","50,000"], correctAnswer:"50,000", hint1:"The 5 is in the Ten-Thousands column.", hint2:"5 in the Ten-Thousands place = 5 × 10,000 = 50,000.", explanation:"The digit 5 is in the Ten-Thousands place, so its value is 50,000." });
Q.push({ id:"Q4_003", type:"digit_value", district:1, difficulty:1, value:36712, digits:{tenThousands:3,thousands:6,hundreds:7,tens:1,ones:2}, expandedTerms:[30000,6000,700,10,2], questionText:"What is the VALUE of the digit 7 in 36,712?", visual:"chart", options:["7","70","700","7,000"], correctAnswer:"700", hint1:"The 7 is in the Hundreds column.", hint2:"7 in the Hundreds place = 7 × 100 = 700.", explanation:"The digit 7 is in the Hundreds place, so its value is 700." });
Q.push({ id:"Q4_004", type:"digit_value", district:1, difficulty:1, value:84325, digits:{tenThousands:8,thousands:4,hundreds:3,tens:2,ones:5}, expandedTerms:[80000,4000,300,20,5], questionText:"What is the VALUE of the digit 2 in 84,325?", visual:"chart", options:["2","20","200","2,000"], correctAnswer:"20", hint1:"The 2 is in the Tens column.", hint2:"2 in the Tens place = 2 × 10 = 20.", explanation:"The digit 2 is in the Tens place, so its value is 20." });
Q.push({ id:"Q4_005", type:"digit_value", district:2, difficulty:2, value:47208, digits:{tenThousands:4,thousands:7,hundreds:2,tens:0,ones:8}, expandedTerms:[40000,7000,200,0,8], questionText:"What is the VALUE of the digit 2 in 47,208?", visual:"chart", options:["2","20","200","2,000"], correctAnswer:"200", hint1:"Find the 2 in 47,208 — which column is it in?", hint2:"The 2 is in the Hundreds column: 2 × 100 = 200.", explanation:"The digit 2 is in the Hundreds place, so its value is 200." });
Q.push({ id:"Q4_006", type:"digit_value", district:4, difficulty:2, value:73405, digits:{tenThousands:7,thousands:3,hundreds:4,tens:0,ones:5}, expandedTerms:[70000,3000,400,0,5], questionText:"What is the VALUE of the digit 3 in 73,405?", visual:"chart", options:["3","300","3,000","30,000"], correctAnswer:"3,000", hint1:"Find the 3 in 73,405 — which column is it in?", hint2:"The 3 is in the Thousands column: 3 × 1,000 = 3,000.", explanation:"The digit 3 is in the Thousands place, so its value is 3,000." });
Q.push({ id:"Q4_007", type:"digit_value", district:5, difficulty:2, value:65890, digits:{tenThousands:6,thousands:5,hundreds:8,tens:9,ones:0}, expandedTerms:[60000,5000,800,90,0], questionText:"What is the VALUE of the digit 9 in 65,890?", visual:"chart", options:["9","90","900","9,000"], correctAnswer:"90", hint1:"Find the 9 in 65,890 — which column is it in?", hint2:"The 9 is in the Tens column: 9 × 10 = 90.", explanation:"The digit 9 is in the Tens place, so its value is 90." });
Q.push({ id:"Q4_008", type:"digit_value", district:6, difficulty:2, value:92037, digits:{tenThousands:9,thousands:2,hundreds:0,tens:3,ones:7}, expandedTerms:[90000,2000,0,30,7], questionText:"What is the VALUE of the digit 9 in 92,037?", visual:"chart", options:["9","900","9,000","90,000"], correctAnswer:"90,000", hint1:"The 9 is the leftmost digit.", hint2:"9 in the Ten-Thousands place = 9 × 10,000 = 90,000.", explanation:"The digit 9 is in the Ten-Thousands place, so its value is 90,000." });
Q.push({ id:"Q4_009", type:"digit_value", district:7, difficulty:3, value:80006, digits:{tenThousands:8,thousands:0,hundreds:0,tens:0,ones:6}, expandedTerms:[80000,0,0,0,6], questionText:"What is the VALUE of the digit 8 in 80,006?", visual:"chart", options:["8","800","8,000","80,000"], correctAnswer:"80,000", hint1:"The 8 is the leftmost digit in 80,006.", hint2:"8 in the Ten-Thousands place = 8 × 10,000 = 80,000.", explanation:"The digit 8 is in the Ten-Thousands place, so its value is 80,000." });
Q.push({ id:"Q4_010", type:"digit_value", district:9, difficulty:3, value:99999, digits:{tenThousands:9,thousands:9,hundreds:9,tens:9,ones:9}, expandedTerms:[90000,9000,900,90,9], questionText:"In 99,999, what is the VALUE of the underlined digit in the Hundreds place?", visual:"chart", options:["9","90","900","9,000"], correctAnswer:"900", hint1:"The Hundreds column is the third from the left.", hint2:"9 in the Hundreds place = 9 × 100 = 900.", explanation:"The digit 9 in the Hundreds place of 99,999 has a value of 900." });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q5 — Word Problems — Singapore Context (10 questions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q.push({ id:"Q5_001", type:"word_problem", district:0, difficulty:1, value:13500, digits:{tenThousands:1,thousands:3,hundreds:5,tens:0,ones:0}, expandedTerms:[10000,3000,500,0,0], questionText:"Oliver counted 13,500 books at his school library. Write 13,500 in expanded form.", visual:"sentence", characterName:"Oliver", settingName:"school library", options:["10,000 + 3,000 + 500 + 0 + 0","10,000 + 300 + 500 + 0 + 0","1,000 + 3,000 + 500 + 0 + 0","10,000 + 3,000 + 50 + 0 + 0"], correctAnswer:"10,000 + 3,000 + 500 + 0 + 0", hint1:"Split 13,500 by its place values.", hint2:"1 ten-thousand, 3 thousands, 5 hundreds, 0 tens, 0 ones.", explanation:"13,500 = 10,000 + 3,000 + 500 + 0 + 0" });
Q.push({ id:"Q5_002", type:"word_problem", district:2, difficulty:2, value:47208, digits:{tenThousands:4,thousands:7,hundreds:2,tens:0,ones:8}, expandedTerms:[40000,7000,200,0,8], questionText:"Emma counted 47,208 commuters at a busy train station. Write 47,208 in expanded form.", visual:"sentence", characterName:"Emma", settingName:"train station", options:["40,000 + 7,000 + 200 + 0 + 8","4,000 + 7,000 + 200 + 0 + 8","40,000 + 700 + 200 + 0 + 8","40,000 + 7,000 + 20 + 0 + 8"], correctAnswer:"40,000 + 7,000 + 200 + 0 + 8", hint1:"Split 47,208 into ten-thousands, thousands, hundreds, tens, ones.", hint2:"40,000 + 7,000 + 200 + 0 + 8 — check each column.", explanation:"47,208 = 40,000 + 7,000 + 200 + 0 + 8" });
Q.push({ id:"Q5_003", type:"word_problem", district:2, difficulty:2, value:62481, digits:{tenThousands:6,thousands:2,hundreds:4,tens:8,ones:1}, expandedTerms:[60000,2000,400,80,1], questionText:"A zoo in the city had 62,481 visitors over the holidays. Write this number in expanded form.", visual:"sentence", characterName:"Noah", settingName:"city zoo", options:["60,000 + 2,000 + 400 + 80 + 1","6,000 + 2,000 + 400 + 80 + 1","60,000 + 200 + 400 + 80 + 1","60,000 + 2,000 + 40 + 80 + 1"], correctAnswer:"60,000 + 2,000 + 400 + 80 + 1", hint1:"62,481 — break it into its five place values.", hint2:"6 ten-thousands, 2 thousands, 4 hundreds, 8 tens, 1 one.", explanation:"62,481 = 60,000 + 2,000 + 400 + 80 + 1" });
Q.push({ id:"Q5_004", type:"word_problem", district:3, difficulty:2, value:38060, digits:{tenThousands:3,thousands:8,hundreds:0,tens:6,ones:0}, expandedTerms:[30000,8000,0,60,0], questionText:"Lucas counted 38,060 tickets sold for a school sports day. Write 38,060 in expanded form.", visual:"sentence", characterName:"Lucas", settingName:"school sports day", options:["30,000 + 8,000 + 0 + 60 + 0","3,000 + 8,000 + 0 + 60 + 0","30,000 + 800 + 0 + 60 + 0","30,000 + 8,000 + 600 + 60 + 0"], correctAnswer:"30,000 + 8,000 + 0 + 60 + 0", hint1:"The hundreds and ones are both zero.", hint2:"3 ten-thousands, 8 thousands, 0 hundreds, 6 tens, 0 ones.", explanation:"38,060 = 30,000 + 8,000 + 0 + 60 + 0" });
Q.push({ id:"Q5_005", type:"word_problem", district:4, difficulty:2, value:55300, digits:{tenThousands:5,thousands:5,hundreds:3,tens:0,ones:0}, expandedTerms:[50000,5000,300,0,0], questionText:"A concert hall sold 55,300 tickets this year. Write 55,300 in expanded form.", visual:"sentence", characterName:"Chloe", settingName:"concert hall", options:["50,000 + 5,000 + 300 + 0 + 0","50,000 + 500 + 300 + 0 + 0","5,000 + 5,000 + 300 + 0 + 0","50,000 + 5,000 + 30 + 0 + 0"], correctAnswer:"50,000 + 5,000 + 300 + 0 + 0", hint1:"No tens or ones in 55,300.", hint2:"5 ten-thousands, 5 thousands, 3 hundreds, 0 tens, 0 ones.", explanation:"55,300 = 50,000 + 5,000 + 300 + 0 + 0" });
Q.push({ id:"Q5_006", type:"word_problem", district:5, difficulty:2, value:71090, digits:{tenThousands:7,thousands:1,hundreds:0,tens:9,ones:0}, expandedTerms:[70000,1000,0,90,0], questionText:"A national stadium has 71,090 seats. Write 71,090 in expanded form.", visual:"sentence", characterName:"James", settingName:"national stadium", options:["70,000 + 1,000 + 0 + 90 + 0","70,000 + 100 + 0 + 90 + 0","7,000 + 1,000 + 0 + 90 + 0","70,000 + 1,000 + 900 + 90 + 0"], correctAnswer:"70,000 + 1,000 + 0 + 90 + 0", hint1:"No hundreds or ones in 71,090.", hint2:"7 ten-thousands, 1 thousand, 0 hundreds, 9 tens, 0 ones.", explanation:"71,090 = 70,000 + 1,000 + 0 + 90 + 0" });
Q.push({ id:"Q5_007", type:"word_problem", district:6, difficulty:3, value:83007, digits:{tenThousands:8,thousands:3,hundreds:0,tens:0,ones:7}, expandedTerms:[80000,3000,0,0,7], questionText:"A large apartment building has 83,007 units. Write 83,007 in expanded form.", visual:"sentence", characterName:"Sophia", settingName:"apartment building", options:["80,000 + 3,000 + 0 + 0 + 7","80,000 + 300 + 0 + 0 + 7","8,000 + 3,000 + 0 + 0 + 7","80,000 + 3,000 + 700 + 0 + 7"], correctAnswer:"80,000 + 3,000 + 0 + 0 + 7", hint1:"83,007 has three zeros — hundreds, tens, but also?", hint2:"8 ten-thousands, 3 thousands, 0 hundreds, 0 tens, 7 ones.", explanation:"83,007 = 80,000 + 3,000 + 0 + 0 + 7" });
Q.push({ id:"Q5_008", type:"word_problem", district:7, difficulty:3, value:90054, digits:{tenThousands:9,thousands:0,hundreds:0,tens:5,ones:4}, expandedTerms:[90000,0,0,50,4], questionText:"A library ordered 90,054 new books. Write 90,054 in expanded form.", visual:"sentence", characterName:"Liam", settingName:"city library", options:["90,000 + 0 + 0 + 50 + 4","90,000 + 5,000 + 0 + 50 + 4","9,000 + 0 + 0 + 50 + 4","90,000 + 0 + 500 + 50 + 4"], correctAnswer:"90,000 + 0 + 0 + 50 + 4", hint1:"Thousands and hundreds are both zero!", hint2:"9 ten-thousands, 0 thousands, 0 hundreds, 5 tens, 4 ones.", explanation:"90,054 = 90,000 + 0 + 0 + 50 + 4" });
Q.push({ id:"Q5_009", type:"word_problem", district:8, difficulty:3, value:75600, digits:{tenThousands:7,thousands:5,hundreds:6,tens:0,ones:0}, expandedTerms:[70000,5000,600,0,0], questionText:"A theme park sold 75,600 tickets in one month. Write 75,600 in expanded form.", visual:"sentence", characterName:"Isabella", settingName:"theme park", options:["70,000 + 5,000 + 600 + 0 + 0","70,000 + 500 + 600 + 0 + 0","7,000 + 5,000 + 600 + 0 + 0","70,000 + 5,000 + 60 + 0 + 0"], correctAnswer:"70,000 + 5,000 + 600 + 0 + 0", hint1:"No tens or ones in 75,600.", hint2:"7 ten-thousands, 5 thousands, 6 hundreds, 0 tens, 0 ones.", explanation:"75,600 = 70,000 + 5,000 + 600 + 0 + 0" });
Q.push({ id:"Q5_010", type:"word_problem", district:9, difficulty:3, value:100000, digits:{tenThousands:10,thousands:0,hundreds:0,tens:0,ones:0}, expandedTerms:[100000,0,0,0,0], questionText:"A city counted 100,000 residents in a survey. Write 100,000 in expanded form.", visual:"sentence", characterName:"Ethan", settingName:"city", options:["100,000 + 0 + 0 + 0 + 0","10,000 + 0 + 0 + 0 + 0","100,000","1,000 + 0 + 0 + 0 + 0"], correctAnswer:"100,000 + 0 + 0 + 0 + 0", hint1:"100,000 is exactly one hundred thousand.", hint2:"All other place values are zero.", explanation:"100,000 = 100,000 + 0 + 0 + 0 + 0" });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q6 — True/False (10 questions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q.push({ id:"Q6_001", type:"true_false", district:0, difficulty:1, value:13200, digits:{tenThousands:1,thousands:3,hundreds:2,tens:0,ones:0}, expandedTerms:[10000,3000,200,0,0], questionText:"Is this correct?  13,200 = 10,000 + 3,000 + 200 + 0 + 0", visual:"sentence", options:["True","False"], correctAnswer:"True", hint1:"Add: 10,000 + 3,000 = 13,000; + 200 = 13,200.", hint2:"Check all five place values.", explanation:"13,200 = 10,000 + 3,000 + 200 + 0 + 0 ✓ TRUE." });
Q.push({ id:"Q6_002", type:"true_false", district:0, difficulty:1, value:25400, digits:{tenThousands:2,thousands:5,hundreds:4,tens:0,ones:0}, expandedTerms:[20000,5000,400,0,0], questionText:"Is this correct?  25,400 = 20,000 + 500 + 400 + 0 + 0", visual:"sentence", options:["True","False"], correctAnswer:"False", hint1:"Check the Thousands term — is 500 the right value?", hint2:"The thousands digit is 5, so it should be 5,000 not 500.", explanation:"FALSE. 25,400 = 20,000 + 5,000 + 400 + 0 + 0. The Thousands term is wrong." });
Q.push({ id:"Q6_003", type:"true_false", district:1, difficulty:1, value:56300, digits:{tenThousands:5,thousands:6,hundreds:3,tens:0,ones:0}, expandedTerms:[50000,6000,300,0,0], questionText:"Is this correct?  56,300 = 50,000 + 6,000 + 300 + 0 + 0", visual:"sentence", options:["True","False"], correctAnswer:"True", hint1:"Add: 50,000 + 6,000 + 300 = 56,300.", hint2:"All five terms are correct.", explanation:"56,300 = 50,000 + 6,000 + 300 + 0 + 0 ✓ TRUE." });
Q.push({ id:"Q6_004", type:"true_false", district:1, difficulty:1, value:43910, digits:{tenThousands:4,thousands:3,hundreds:9,tens:1,ones:0}, expandedTerms:[40000,3000,900,10,0], questionText:"Is this correct?  43,910 = 40,000 + 3,000 + 90 + 10 + 0", visual:"sentence", options:["True","False"], correctAnswer:"False", hint1:"Check the Hundreds term — is 90 the right value?", hint2:"The hundreds digit is 9, so it should be 900 not 90.", explanation:"FALSE. 43,910 = 40,000 + 3,000 + 900 + 10 + 0. The Hundreds term is wrong." });
Q.push({ id:"Q6_005", type:"true_false", district:2, difficulty:1, value:70802, digits:{tenThousands:7,thousands:0,hundreds:8,tens:0,ones:2}, expandedTerms:[70000,0,800,0,2], questionText:"Is this correct?  70,802 = 70,000 + 0 + 800 + 0 + 2", visual:"sentence", options:["True","False"], correctAnswer:"True", hint1:"70,802 has no thousands and no tens.", hint2:"70,000 + 800 + 2 = 70,802. ✓", explanation:"70,802 = 70,000 + 0 + 800 + 0 + 2 ✓ TRUE." });
Q.push({ id:"Q6_006", type:"true_false", district:3, difficulty:2, value:84325, digits:{tenThousands:8,thousands:4,hundreds:3,tens:2,ones:5}, expandedTerms:[80000,4000,300,20,5], questionText:"Is this correct?  84,325 = 80,000 + 4,000 + 300 + 25", visual:"sentence", options:["True","False"], correctAnswer:"False", hint1:"The expansion should show 5 separate terms.", hint2:"Tens and Ones should be separate: 20 + 5, not combined as 25.", explanation:"FALSE. 84,325 = 80,000 + 4,000 + 300 + 20 + 5. Tens and Ones must be separate terms." });
Q.push({ id:"Q6_007", type:"true_false", district:5, difficulty:2, value:91005, digits:{tenThousands:9,thousands:1,hundreds:0,tens:0,ones:5}, expandedTerms:[90000,1000,0,0,5], questionText:"Is this correct?  91,005 = 90,000 + 1,000 + 500", visual:"sentence", options:["True","False"], correctAnswer:"False", hint1:"91,005 ends in 5 — is 500 correct for that?", hint2:"The 5 is in the Ones place, so it should be 5, not 500.", explanation:"FALSE. 91,005 = 90,000 + 1,000 + 0 + 0 + 5. The 5 is in the Ones place." });
Q.push({ id:"Q6_008", type:"true_false", district:6, difficulty:2, value:37040, digits:{tenThousands:3,thousands:7,hundreds:0,tens:4,ones:0}, expandedTerms:[30000,7000,0,40,0], questionText:"Is this correct?  37,040 = 30,000 + 7,000 + 0 + 40 + 0", visual:"sentence", options:["True","False"], correctAnswer:"True", hint1:"37,040: 3 ten-thousands, 7 thousands, 0 hundreds, 4 tens, 0 ones.", hint2:"30,000 + 7,000 + 40 = 37,040. ✓", explanation:"37,040 = 30,000 + 7,000 + 0 + 40 + 0 ✓ TRUE." });
Q.push({ id:"Q6_009", type:"true_false", district:8, difficulty:3, value:60009, digits:{tenThousands:6,thousands:0,hundreds:0,tens:0,ones:9}, expandedTerms:[60000,0,0,0,9], questionText:"Is this correct?  60,009 = 60,000 + 9,000 + 9", visual:"sentence", options:["True","False"], correctAnswer:"False", hint1:"60,009 — how many thousands does it have?", hint2:"60,009 has 0 thousands. There is no 9,000 term.", explanation:"FALSE. 60,009 = 60,000 + 0 + 0 + 0 + 9. There are no thousands." });
Q.push({ id:"Q6_010", type:"true_false", district:9, difficulty:3, value:99900, digits:{tenThousands:9,thousands:9,hundreds:9,tens:0,ones:0}, expandedTerms:[90000,9000,900,0,0], questionText:"Is this correct?  99,900 = 90,000 + 9,000 + 900 + 0 + 0", visual:"sentence", options:["True","False"], correctAnswer:"True", hint1:"No tens or ones in 99,900.", hint2:"90,000 + 9,000 + 900 = 99,900. ✓", explanation:"99,900 = 90,000 + 9,000 + 900 + 0 + 0 ✓ TRUE." });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q7 — Match Expanded Form (10 questions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q.push({ id:"Q7_001", type:"match_expanded", district:0, difficulty:1, value:15600, digits:{tenThousands:1,thousands:5,hundreds:6,tens:0,ones:0}, expandedTerms:[10000,5000,600,0,0], questionText:"Which expanded form matches 15,600?", visual:"sentence", options:["10,000 + 5,000 + 600 + 0 + 0","10,000 + 500 + 600 + 0 + 0","1,000 + 5,000 + 600 + 0 + 0","10,000 + 5,000 + 60 + 0 + 0"], correctAnswer:"10,000 + 5,000 + 600 + 0 + 0", hint1:"Thousands digit is 5 → 5,000. Hundreds digit is 6 → 600.", hint2:"1 ten-thousand, 5 thousands, 6 hundreds, 0 tens, 0 ones.", explanation:"15,600 = 10,000 + 5,000 + 600 + 0 + 0" });
Q.push({ id:"Q7_002", type:"match_expanded", district:0, difficulty:1, value:28400, digits:{tenThousands:2,thousands:8,hundreds:4,tens:0,ones:0}, expandedTerms:[20000,8000,400,0,0], questionText:"Which expanded form matches 28,400?", visual:"sentence", options:["20,000 + 8,000 + 400 + 0 + 0","20,000 + 800 + 400 + 0 + 0","2,000 + 8,000 + 400 + 0 + 0","20,000 + 8,000 + 40 + 0 + 0"], correctAnswer:"20,000 + 8,000 + 400 + 0 + 0", hint1:"2 in ten-thousands = 20,000. 8 in thousands = 8,000.", hint2:"No tens or ones — both are zero.", explanation:"28,400 = 20,000 + 8,000 + 400 + 0 + 0" });
Q.push({ id:"Q7_003", type:"match_expanded", district:1, difficulty:1, value:32716, digits:{tenThousands:3,thousands:2,hundreds:7,tens:1,ones:6}, expandedTerms:[30000,2000,700,10,6], questionText:"Which expanded form matches 32,716?", visual:"sentence", options:["30,000 + 2,000 + 700 + 10 + 6","30,000 + 200 + 700 + 10 + 6","3,000 + 2,000 + 700 + 10 + 6","30,000 + 2,000 + 70 + 10 + 6"], correctAnswer:"30,000 + 2,000 + 700 + 10 + 6", hint1:"Each digit has a place value. 7 in hundreds = 700.", hint2:"3→30,000 · 2→2,000 · 7→700 · 1→10 · 6→6.", explanation:"32,716 = 30,000 + 2,000 + 700 + 10 + 6" });
Q.push({ id:"Q7_004", type:"match_expanded", district:1, difficulty:1, value:47503, digits:{tenThousands:4,thousands:7,hundreds:5,tens:0,ones:3}, expandedTerms:[40000,7000,500,0,3], questionText:"Which expanded form matches 47,503?", visual:"sentence", options:["40,000 + 7,000 + 500 + 0 + 3","40,000 + 700 + 500 + 0 + 3","4,000 + 7,000 + 500 + 0 + 3","40,000 + 7,000 + 50 + 0 + 3"], correctAnswer:"40,000 + 7,000 + 500 + 0 + 3", hint1:"No tens in 47,503 — the tens column is zero.", hint2:"4→40,000 · 7→7,000 · 5→500 · 0→0 · 3→3.", explanation:"47,503 = 40,000 + 7,000 + 500 + 0 + 3" });
Q.push({ id:"Q7_005", type:"match_expanded", district:3, difficulty:2, value:71090, digits:{tenThousands:7,thousands:1,hundreds:0,tens:9,ones:0}, expandedTerms:[70000,1000,0,90,0], questionText:"Which expanded form matches 71,090?", visual:"sentence", options:["70,000 + 1,000 + 0 + 90 + 0","70,000 + 100 + 0 + 90 + 0","7,000 + 1,000 + 0 + 90 + 0","70,000 + 1,000 + 900 + 90 + 0"], correctAnswer:"70,000 + 1,000 + 0 + 90 + 0", hint1:"The hundreds column is zero in 71,090.", hint2:"7→70,000 · 1→1,000 · 0→0 · 9→90 · 0→0.", explanation:"71,090 = 70,000 + 1,000 + 0 + 90 + 0" });
Q.push({ id:"Q7_006", type:"match_expanded", district:4, difficulty:2, value:85002, digits:{tenThousands:8,thousands:5,hundreds:0,tens:0,ones:2}, expandedTerms:[80000,5000,0,0,2], questionText:"Which expanded form matches 85,002?", visual:"sentence", options:["80,000 + 5,000 + 0 + 0 + 2","80,000 + 500 + 0 + 0 + 2","8,000 + 5,000 + 0 + 0 + 2","80,000 + 5,000 + 200 + 0 + 2"], correctAnswer:"80,000 + 5,000 + 0 + 0 + 2", hint1:"85,002 — hundreds and tens are both zero.", hint2:"8→80,000 · 5→5,000 · 0→0 · 0→0 · 2→2.", explanation:"85,002 = 80,000 + 5,000 + 0 + 0 + 2" });
Q.push({ id:"Q7_007", type:"match_expanded", district:5, difficulty:2, value:63740, digits:{tenThousands:6,thousands:3,hundreds:7,tens:4,ones:0}, expandedTerms:[60000,3000,700,40,0], questionText:"Which expanded form matches 63,740?", visual:"sentence", options:["60,000 + 3,000 + 700 + 40 + 0","60,000 + 300 + 700 + 40 + 0","6,000 + 3,000 + 700 + 40 + 0","60,000 + 3,000 + 70 + 40 + 0"], correctAnswer:"60,000 + 3,000 + 700 + 40 + 0", hint1:"No ones in 63,740.", hint2:"6→60,000 · 3→3,000 · 7→700 · 4→40 · 0→0.", explanation:"63,740 = 60,000 + 3,000 + 700 + 40 + 0" });
Q.push({ id:"Q7_008", type:"match_expanded", district:6, difficulty:2, value:92508, digits:{tenThousands:9,thousands:2,hundreds:5,tens:0,ones:8}, expandedTerms:[90000,2000,500,0,8], questionText:"Which expanded form matches 92,508?", visual:"sentence", options:["90,000 + 2,000 + 500 + 0 + 8","90,000 + 200 + 500 + 0 + 8","9,000 + 2,000 + 500 + 0 + 8","90,000 + 2,000 + 50 + 0 + 8"], correctAnswer:"90,000 + 2,000 + 500 + 0 + 8", hint1:"No tens in 92,508.", hint2:"9→90,000 · 2→2,000 · 5→500 · 0→0 · 8→8.", explanation:"92,508 = 90,000 + 2,000 + 500 + 0 + 8" });
Q.push({ id:"Q7_009", type:"match_expanded", district:8, difficulty:3, value:40008, digits:{tenThousands:4,thousands:0,hundreds:0,tens:0,ones:8}, expandedTerms:[40000,0,0,0,8], questionText:"Which expanded form matches 40,008?", visual:"sentence", options:["40,000 + 0 + 0 + 0 + 8","40,000 + 8,000 + 0 + 0 + 8","4,000 + 0 + 0 + 0 + 8","40,000 + 0 + 800 + 0 + 8"], correctAnswer:"40,000 + 0 + 0 + 0 + 8", hint1:"40,008 has three zeros between the 4 and the 8.", hint2:"4→40,000 · 0→0 · 0→0 · 0→0 · 8→8.", explanation:"40,008 = 40,000 + 0 + 0 + 0 + 8" });
Q.push({ id:"Q7_010", type:"match_expanded", district:9, difficulty:3, value:100000, digits:{tenThousands:10,thousands:0,hundreds:0,tens:0,ones:0}, expandedTerms:[100000,0,0,0,0], questionText:"Which expanded form matches 100,000?", visual:"sentence", options:["100,000 + 0 + 0 + 0 + 0","10,000 + 0 + 0 + 0 + 0","100,000","1,000 + 0 + 0 + 0 + 0"], correctAnswer:"100,000 + 0 + 0 + 0 + 0", hint1:"100,000 is one hundred thousand.", hint2:"All other place values are zero.", explanation:"100,000 = 100,000 + 0 + 0 + 0 + 0" });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q8 — Missing Term (10 questions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q.push({ id:"Q8_001", type:"missing_term", district:0, difficulty:1, value:13240, digits:{tenThousands:1,thousands:3,hundreds:2,tens:4,ones:0}, expandedTerms:[10000,3000,200,40,0], missingTermIndex:1, questionText:"10,000 + ___ + 200 + 40 + 0 = 13,240. What is the missing term?", visual:"ribbon", options:["300","3,000","30,000","3"], correctAnswer:"3,000", hint1:"13,240 − 10,000 − 200 − 40 = ?", hint2:"The Thousands digit is 3 → 3 × 1,000 = 3,000.", explanation:"13,240 = 10,000 + 3,000 + 200 + 40 + 0. Missing term: 3,000." });
Q.push({ id:"Q8_002", type:"missing_term", district:0, difficulty:1, value:25304, digits:{tenThousands:2,thousands:5,hundreds:3,tens:0,ones:4}, expandedTerms:[20000,5000,300,0,4], missingTermIndex:4, questionText:"20,000 + 5,000 + 300 + 0 + ___ = 25,304. What is the missing term?", visual:"ribbon", options:["40","400","4","4,000"], correctAnswer:"4", hint1:"25,304 − 20,000 − 5,000 − 300 = 4.", hint2:"The Ones digit is 4 → its value is just 4.", explanation:"25,304 = 20,000 + 5,000 + 300 + 0 + 4. Missing term: 4." });
Q.push({ id:"Q8_003", type:"missing_term", district:1, difficulty:1, value:46819, digits:{tenThousands:4,thousands:6,hundreds:8,tens:1,ones:9}, expandedTerms:[40000,6000,800,10,9], missingTermIndex:2, questionText:"40,000 + 6,000 + ___ + 10 + 9 = 46,819. What is the missing term?", visual:"ribbon", options:["8","80","800","8,000"], correctAnswer:"800", hint1:"46,819 − 40,000 − 6,000 − 10 − 9 = 800.", hint2:"The Hundreds digit is 8 → 8 × 100 = 800.", explanation:"46,819 = 40,000 + 6,000 + 800 + 10 + 9. Missing term: 800." });
Q.push({ id:"Q8_004", type:"missing_term", district:1, difficulty:1, value:68512, digits:{tenThousands:6,thousands:8,hundreds:5,tens:1,ones:2}, expandedTerms:[60000,8000,500,10,2], missingTermIndex:1, questionText:"60,000 + ___ + 500 + 10 + 2 = 68,512. What is the missing term?", visual:"ribbon", options:["800","8,000","80,000","80"], correctAnswer:"8,000", hint1:"68,512 − 60,000 − 500 − 10 − 2 = 8,000.", hint2:"The Thousands digit is 8 → 8 × 1,000 = 8,000.", explanation:"68,512 = 60,000 + 8,000 + 500 + 10 + 2. Missing term: 8,000." });
Q.push({ id:"Q8_005", type:"missing_term", district:3, difficulty:2, value:74306, digits:{tenThousands:7,thousands:4,hundreds:3,tens:0,ones:6}, expandedTerms:[70000,4000,300,0,6], missingTermIndex:0, questionText:"___ + 4,000 + 300 + 0 + 6 = 74,306. What is the missing term?", visual:"ribbon", options:["7,000","70","70,000","700"], correctAnswer:"70,000", hint1:"74,306 − 4,000 − 300 − 6 = 70,000.", hint2:"The Ten-Thousands digit is 7 → 7 × 10,000 = 70,000.", explanation:"74,306 = 70,000 + 4,000 + 300 + 0 + 6. Missing term: 70,000." });
Q.push({ id:"Q8_006", type:"missing_term", district:4, difficulty:2, value:53720, digits:{tenThousands:5,thousands:3,hundreds:7,tens:2,ones:0}, expandedTerms:[50000,3000,700,20,0], missingTermIndex:3, questionText:"50,000 + 3,000 + 700 + ___ + 0 = 53,720. What is the missing term?", visual:"ribbon", options:["2","200","2,000","20"], correctAnswer:"20", hint1:"53,720 − 50,000 − 3,000 − 700 = 20.", hint2:"The Tens digit is 2 → 2 × 10 = 20.", explanation:"53,720 = 50,000 + 3,000 + 700 + 20 + 0. Missing term: 20." });
Q.push({ id:"Q8_007", type:"missing_term", district:5, difficulty:2, value:82045, digits:{tenThousands:8,thousands:2,hundreds:0,tens:4,ones:5}, expandedTerms:[80000,2000,0,40,5], missingTermIndex:2, questionText:"80,000 + 2,000 + ___ + 40 + 5 = 82,045. What is the missing term?", visual:"ribbon", options:["0","400","40","4,000"], correctAnswer:"0", hint1:"82,045 − 80,000 − 2,000 − 40 − 5 = 0.", hint2:"The Hundreds digit is 0 → its value is 0.", explanation:"82,045 = 80,000 + 2,000 + 0 + 40 + 5. Missing term: 0." });
Q.push({ id:"Q8_008", type:"missing_term", district:7, difficulty:3, value:91508, digits:{tenThousands:9,thousands:1,hundreds:5,tens:0,ones:8}, expandedTerms:[90000,1000,500,0,8], missingTermIndex:3, questionText:"90,000 + 1,000 + 500 + ___ + 8 = 91,508. What is the missing term?", visual:"ribbon", options:["8","0","80","800"], correctAnswer:"0", hint1:"91,508 − 90,000 − 1,000 − 500 − 8 = 0.", hint2:"The Tens digit is 0 → its value is 0.", explanation:"91,508 = 90,000 + 1,000 + 500 + 0 + 8. Missing term: 0." });
Q.push({ id:"Q8_009", type:"missing_term", district:8, difficulty:3, value:60302, digits:{tenThousands:6,thousands:0,hundreds:3,tens:0,ones:2}, expandedTerms:[60000,0,300,0,2], missingTermIndex:1, questionText:"60,000 + ___ + 300 + 0 + 2 = 60,302. What is the missing term?", visual:"ribbon", options:["0","6,000","60","600"], correctAnswer:"0", hint1:"60,302 − 60,000 − 300 − 2 = 0.", hint2:"There are no thousands in 60,302.", explanation:"60,302 = 60,000 + 0 + 300 + 0 + 2. Missing term: 0." });
Q.push({ id:"Q8_010", type:"missing_term", district:9, difficulty:3, value:79630, digits:{tenThousands:7,thousands:9,hundreds:6,tens:3,ones:0}, expandedTerms:[70000,9000,600,30,0], missingTermIndex:4, questionText:"70,000 + 9,000 + 600 + 30 + ___ = 79,630. What is the missing term?", visual:"ribbon", options:["0","3","30","300"], correctAnswer:"0", hint1:"79,630 − 70,000 − 9,000 − 600 − 30 = 0.", hint2:"79,630 ends in 0 → the Ones value is 0.", explanation:"79,630 = 70,000 + 9,000 + 600 + 30 + 0. Missing term: 0." });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q9 — Compare Numbers (10 questions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q.push({ id:"Q9_001", type:"compare_numbers", district:0, difficulty:1, value:18000, digits:{tenThousands:1,thousands:8,hundreds:0,tens:0,ones:0}, expandedTerms:[10000,8000,0,0,0], questionText:"Which is greater: 18,000 or 12,000?", visual:"compare", options:["18,000","12,000","They are equal","Cannot tell"], correctAnswer:"18,000", hint1:"Both start with 1 ten-thousand. Compare the thousands.", hint2:"18,000 has 8 thousands; 12,000 has 2 thousands. 8 > 2.", explanation:"18,000 > 12,000 because 8 thousands > 2 thousands." });
Q.push({ id:"Q9_002", type:"compare_numbers", district:0, difficulty:1, value:45900, digits:{tenThousands:4,thousands:5,hundreds:9,tens:0,ones:0}, expandedTerms:[40000,5000,900,0,0], questionText:"Which is greater: 45,900 or 45,090?", visual:"compare", options:["45,900","45,090","They are equal","Cannot tell"], correctAnswer:"45,900", hint1:"Both have 4 ten-thousands and 5 thousands. Compare hundreds.", hint2:"45,900 has 9 hundreds; 45,090 has 0 hundreds. 9 > 0.", explanation:"45,900 > 45,090 because 900 > 90 in the hundreds column." });
Q.push({ id:"Q9_003", type:"compare_numbers", district:1, difficulty:1, value:33000, digits:{tenThousands:3,thousands:3,hundreds:0,tens:0,ones:0}, expandedTerms:[30000,3000,0,0,0], questionText:"Which is smaller: 33,000 or 30,033?", visual:"compare", options:["33,000","30,033","They are equal","Cannot tell"], correctAnswer:"30,033", hint1:"Compare the thousands digit first.", hint2:"33,000 has 3 thousands; 30,033 has 0 thousands. 0 < 3.", explanation:"30,033 < 33,000 because it has fewer thousands." });
Q.push({ id:"Q9_004", type:"compare_numbers", district:1, difficulty:1, value:27500, digits:{tenThousands:2,thousands:7,hundreds:5,tens:0,ones:0}, expandedTerms:[20000,7000,500,0,0], questionText:"Which is greater: 27,500 or 25,700?", visual:"compare", options:["27,500","25,700","They are equal","Cannot tell"], correctAnswer:"27,500", hint1:"Both have 2 ten-thousands. Compare thousands.", hint2:"27,500 has 7 thousands; 25,700 has 5 thousands. 7 > 5.", explanation:"27,500 > 25,700 because 7,000 > 5,000." });
Q.push({ id:"Q9_005", type:"compare_numbers", district:3, difficulty:2, value:60500, digits:{tenThousands:6,thousands:0,hundreds:5,tens:0,ones:0}, expandedTerms:[60000,0,500,0,0], questionText:"Which is smaller: 60,500 or 60,050?", visual:"compare", options:["60,500","60,050","They are equal","Cannot tell"], correctAnswer:"60,050", hint1:"Same ten-thousands and thousands. Compare hundreds.", hint2:"60,500 has 5 hundreds; 60,050 has 0 hundreds. 0 < 5.", explanation:"60,050 < 60,500 because it has fewer hundreds." });
Q.push({ id:"Q9_006", type:"compare_numbers", district:4, difficulty:2, value:72480, digits:{tenThousands:7,thousands:2,hundreds:4,tens:8,ones:0}, expandedTerms:[70000,2000,400,80,0], questionText:"Which is greater: 72,480 or 72,840?", visual:"compare", options:["72,480","72,840","They are equal","Cannot tell"], correctAnswer:"72,840", hint1:"Same ten-thousands and thousands. Compare hundreds.", hint2:"72,480 has 4 hundreds; 72,840 has 8 hundreds. 8 > 4.", explanation:"72,840 > 72,480 because 800 > 400." });
Q.push({ id:"Q9_007", type:"compare_numbers", district:5, difficulty:2, value:88000, digits:{tenThousands:8,thousands:8,hundreds:0,tens:0,ones:0}, expandedTerms:[80000,8000,0,0,0], questionText:"Which is greater: 88,000 or 80,800?", visual:"compare", options:["88,000","80,800","They are equal","Cannot tell"], correctAnswer:"88,000", hint1:"Both have 8 ten-thousands. Compare thousands.", hint2:"88,000 has 8 thousands; 80,800 has 0 thousands. 8 > 0.", explanation:"88,000 > 80,800 because it has more thousands." });
Q.push({ id:"Q9_008", type:"compare_numbers", district:7, difficulty:3, value:95001, digits:{tenThousands:9,thousands:5,hundreds:0,tens:0,ones:1}, expandedTerms:[90000,5000,0,0,1], questionText:"Which is smaller: 95,001 or 95,100?", visual:"compare", options:["95,001","95,100","They are equal","Cannot tell"], correctAnswer:"95,001", hint1:"Same ten-thousands and thousands. Compare hundreds.", hint2:"95,001 has 0 hundreds; 95,100 has 1 hundred. 0 < 1.", explanation:"95,001 < 95,100 because 0 hundreds < 1 hundred." });
Q.push({ id:"Q9_009", type:"compare_numbers", district:8, difficulty:3, value:99090, digits:{tenThousands:9,thousands:9,hundreds:0,tens:9,ones:0}, expandedTerms:[90000,9000,0,90,0], questionText:"Which is greater: 99,090 or 99,009?", visual:"compare", options:["99,090","99,009","They are equal","Cannot tell"], correctAnswer:"99,090", hint1:"Same ten-thousands, thousands, and hundreds. Compare tens.", hint2:"99,090 has 9 tens; 99,009 has 0 tens. 9 > 0.", explanation:"99,090 > 99,009 because 90 > 9 in the tens place." });
Q.push({ id:"Q9_010", type:"compare_numbers", district:9, difficulty:3, value:100000, digits:{tenThousands:10,thousands:0,hundreds:0,tens:0,ones:0}, expandedTerms:[100000,0,0,0,0], questionText:"Which is greater: 100,000 or 99,999?", visual:"compare", options:["100,000","99,999","They are equal","Cannot tell"], correctAnswer:"100,000", hint1:"100,000 has 6 digits; 99,999 has 5 digits.", hint2:"A 6-digit number is always greater than a 5-digit number.", explanation:"100,000 > 99,999 because it is the next number after 99,999." });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Q10 — Number Pattern (10 questions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q.push({ id:"Q10_001", type:"number_pattern", district:0, difficulty:1, value:42000, digits:{tenThousands:4,thousands:2,hundreds:0,tens:0,ones:0}, expandedTerms:[40000,2000,0,0,0], questionText:"What comes next? 12,000 → 22,000 → 32,000 → ___", visual:"pattern", options:["40,000","42,000","33,000","43,000"], correctAnswer:"42,000", hint1:"The ten-thousands digit increases by 1 each time.", hint2:"+10,000 each step: 12→22→32→42.", explanation:"The pattern adds 10,000 each time. 32,000 + 10,000 = 42,000." });
Q.push({ id:"Q10_002", type:"number_pattern", district:0, difficulty:1, value:15000, digits:{tenThousands:1,thousands:5,hundreds:0,tens:0,ones:0}, expandedTerms:[10000,5000,0,0,0], questionText:"What comes next? 11,000 → 12,000 → 13,000 → 14,000 → ___", visual:"pattern", options:["15,000","16,000","20,000","14,100"], correctAnswer:"15,000", hint1:"The thousands digit increases by 1 each time.", hint2:"+1,000 each step: 11→12→13→14→15.", explanation:"The pattern adds 1,000 each time. 14,000 + 1,000 = 15,000." });
Q.push({ id:"Q10_003", type:"number_pattern", district:1, difficulty:1, value:19700, digits:{tenThousands:1,thousands:9,hundreds:7,tens:0,ones:0}, expandedTerms:[10000,9000,700,0,0], questionText:"What comes next? 19,300 → 19,400 → 19,500 → 19,600 → ___", visual:"pattern", options:["19,700","19,610","20,000","19,650"], correctAnswer:"19,700", hint1:"The hundreds digit increases by 1 each time.", hint2:"+100 each step.", explanation:"The pattern adds 100 each time. 19,600 + 100 = 19,700." });
Q.push({ id:"Q10_004", type:"number_pattern", district:1, difficulty:1, value:16040, digits:{tenThousands:1,thousands:6,hundreds:0,tens:4,ones:0}, expandedTerms:[10000,6000,0,40,0], questionText:"What comes next? 16,000 → 16,010 → 16,020 → 16,030 → ___", visual:"pattern", options:["16,040","16,400","17,000","16,031"], correctAnswer:"16,040", hint1:"The tens digit increases by 1 each time.", hint2:"+10 each step.", explanation:"The pattern adds 10 each time. 16,030 + 10 = 16,040." });
Q.push({ id:"Q10_005", type:"number_pattern", district:3, difficulty:2, value:65000, digits:{tenThousands:6,thousands:5,hundreds:0,tens:0,ones:0}, expandedTerms:[60000,5000,0,0,0], questionText:"What comes next? 25,000 → 35,000 → 45,000 → 55,000 → ___", visual:"pattern", options:["65,000","56,000","60,000","64,000"], correctAnswer:"65,000", hint1:"+10,000 each step — the ten-thousands digit increases.", hint2:"25→35→45→55→65.", explanation:"The pattern adds 10,000 each time. 55,000 + 10,000 = 65,000." });
Q.push({ id:"Q10_006", type:"number_pattern", district:4, difficulty:2, value:48000, digits:{tenThousands:4,thousands:8,hundreds:0,tens:0,ones:0}, expandedTerms:[40000,8000,0,0,0], questionText:"What comes next? 44,000 → 45,000 → 46,000 → 47,000 → ___", visual:"pattern", options:["48,000","49,000","47,100","40,000"], correctAnswer:"48,000", hint1:"+1,000 each step.", hint2:"44→45→46→47→48.", explanation:"The pattern adds 1,000 each time. 47,000 + 1,000 = 48,000." });
Q.push({ id:"Q10_007", type:"number_pattern", district:5, difficulty:2, value:73600, digits:{tenThousands:7,thousands:3,hundreds:6,tens:0,ones:0}, expandedTerms:[70000,3000,600,0,0], questionText:"What comes next? 73,200 → 73,300 → 73,400 → 73,500 → ___", visual:"pattern", options:["73,600","74,000","73,510","73,550"], correctAnswer:"73,600", hint1:"+100 each step.", hint2:"73,200→73,300→73,400→73,500→73,600.", explanation:"The pattern adds 100 each time. 73,500 + 100 = 73,600." });
Q.push({ id:"Q10_008", type:"number_pattern", district:6, difficulty:2, value:87050, digits:{tenThousands:8,thousands:7,hundreds:0,tens:5,ones:0}, expandedTerms:[80000,7000,0,50,0], questionText:"What comes next? 87,010 → 87,020 → 87,030 → 87,040 → ___", visual:"pattern", options:["87,050","87,500","88,000","87,041"], correctAnswer:"87,050", hint1:"+10 each step.", hint2:"87,010→87,020→87,030→87,040→87,050.", explanation:"The pattern adds 10 each time. 87,040 + 10 = 87,050." });
Q.push({ id:"Q10_009", type:"number_pattern", district:8, difficulty:3, value:98000, digits:{tenThousands:9,thousands:8,hundreds:0,tens:0,ones:0}, expandedTerms:[90000,8000,0,0,0], questionText:"What comes next? 94,000 → 95,000 → 96,000 → 97,000 → ___", visual:"pattern", options:["98,000","99,000","94,100","97,001"], correctAnswer:"98,000", hint1:"+1,000 each step.", hint2:"94→95→96→97→98.", explanation:"The pattern adds 1,000 each time. 97,000 + 1,000 = 98,000." });
Q.push({ id:"Q10_010", type:"number_pattern", district:9, difficulty:3, value:100000, digits:{tenThousands:10,thousands:0,hundreds:0,tens:0,ones:0}, expandedTerms:[100000,0,0,0,0], questionText:"What comes next? 96,000 → 97,000 → 98,000 → 99,000 → ___", visual:"pattern", options:["100,000","90,000","99,100","99,001"], correctAnswer:"100,000", hint1:"+1,000 each step — what comes after 99,000?", hint2:"99,000 + 1,000 = 100,000, which is one hundred thousand.", explanation:"The pattern adds 1,000 each time. 99,000 + 1,000 = 100,000." });

export default Q;
