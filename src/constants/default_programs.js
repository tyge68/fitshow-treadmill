const CHAOTIC_HILLS = {
    readOnly: true,
    title: 'Chaotic Hills',
    stepDuration: 120,
    steps: [
      {s:2, i:0}, // warm up
      {s:4, i:0}, {s:6, i:0}, {s:8, i:0}, {s:4, i:0}, {s:6, i:0}, {s:8, i:0}, {s:10, i:0},
      {s:4, i:0}, {s:6, i:0}, {s:8, i:0}, {s:4, i:0}, {s:6, i:0}, {s:8, i:0}, {s:10, i:0},
      {s:4, i:0}, {s:2, i:0} // calm down
    ]
  }

const EASY_PIZZY = {
    readOnly: true,
    title: 'Easy pizzy',
    stepDuration: 120,
    steps: [
      {s:2, i:6}, // warm up
      {s:4, i:4}, {s:6, i:2}, {s:4, i:4}, {s:2, i:6}, {s:4, i:4}, {s:6, i:2}, {s:4, i:4},
      {s:2, i:6}, {s:4, i:4}, {s:6, i:2}, {s:4, i:4}, {s:2, i:6}, {s:4, i:4}, {s:6, i:2},
      {s:4, i:4}, {s:2, i:6} // calm down
    ]
  }

const MOUNTAIN_HELL = {
    readOnly: true,
    title: 'Mountain Hell',
    stepDuration: 120,
    steps: [
      {s:2, i:2}, // warm up
      {s:4, i:4}, {s:6, i:4}, {s:8, i:4}, {s:4, i:4}, {s:6, i:4}, {s:8, i:4}, {s:10, i:4},
      {s:4, i:6}, {s:6, i:6}, {s:8, i:6}, {s:4, i:6}, {s:6, i:6}, {s:8, i:6}, {s:10, i:6},
      {s:4, i:2}, {s:2, i:0} // calm down
    ]
  }

export const ALL_PROGRAMS = [
  CHAOTIC_HILLS,
  EASY_PIZZY,
  MOUNTAIN_HELL
]