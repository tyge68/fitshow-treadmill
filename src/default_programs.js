const CHAOTIC_HILLS = {
    title: 'Chaotic Hills',
    stepDuration: 120,
    steps: [
      [2, 0], // warm up
      [4, 0], [6, 0], [8, 0], [4, 0], [6, 0], [8, 0], [10, 0],
      [4, 0], [6, 0], [8, 0], [4, 0], [6, 0], [8, 0], [10, 0],
      [4, 0], [2, 0] // calm down
    ]
  };

const EASY_PIZZY = {
    title: 'Easy pizzy',
    stepDuration: 120,
    steps: [
      [2, 6], // warm up
      [4, 4], [6, 2], [4, 4], [2, 6], [4, 4], [6, 2], [4, 4],
      [2, 6], [4, 4], [6, 2], [4, 4], [2, 6], [4, 4], [6, 2],
      [4, 4], [2, 6] // calm down
    ]
  };

const MOUNTAIN_HELL = {
    title: 'Mountain Hell',
    stepDuration: 120,
    steps: [
      [2, 2], // warm up
      [4, 4], [6, 4], [8, 4], [4, 4], [6, 4], [8, 4], [10, 4],
      [4, 6], [6, 6], [8, 6], [4, 6], [6, 6], [8, 6], [10, 6],
      [4, 2], [2, 0] // calm down
    ]
  };

export default [
  CHAOTIC_HILLS,
  EASY_PIZZY,
  MOUNTAIN_HELL
];