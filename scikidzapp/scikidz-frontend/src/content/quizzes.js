export const quizzes = {
    'water-cycle': [
      {
        id: 1,
        prompt: 'How many main stages does the water cycle commonly include?',
        options: ['2', '3', '4', '5'],
        correctIndex: 2,
      },
      {
        id: 2,
        prompt: 'Which of the following is a real part of the water cycle?',
        options: ['Evaporation', 'Transportation', 'Geo-location', 'Motivation'],
        correctIndex: 0,
      },
      {
        id: 3,
        prompt: 'What is condensation?',
        options: [
          'Water vapor cooling into liquid droplets (clouds)',
          'Liquid water warming into vapor',
          'Water soaking into the ground',
          'Water freezing into ice instantly',
        ],
        correctIndex: 0,
      },
      {
        id: 4,
        prompt: 'What is precipitation?',
        options: [
          'Water gathering in oceans and lakes',
          'Water falling from clouds as rain, snow, sleet, or hail',
          'Water vapor rising from plants only',
          'Wind moving clouds across the sky',
        ],
        correctIndex: 1,
      },
      {
        id: 5,
        prompt: 'Which process is driven by the Sun’s energy?',
        options: ['Collection', 'Evaporation', 'Precipitation', 'Condensation'],
        correctIndex: 1,
      },
    ],
  
    // 🧪 Atoms & Molecules Quiz
    'atoms-molecules': [
      {
        id: 1,
        prompt: 'What is an atom?',
        options: [
          'The smallest unit of an element',
          'A type of molecule',
          'A chemical reaction',
          'A form of energy',
        ],
        correctIndex: 0,
      },
      {
        id: 2,
        prompt: 'Where are protons and neutrons located?',
        options: [
          'In the electron cloud',
          'In the nucleus',
          'Outside the atom',
          'Inside molecules only',
        ],
        correctIndex: 1,
      },
      {
        id: 3,
        prompt: 'What charge does an electron have?',
        options: ['Positive', 'Negative', 'Neutral', 'No charge'],
        correctIndex: 1,
      },
      {
        id: 4,
        prompt: 'What forms when two or more atoms bond together?',
        options: ['An element', 'A molecule', 'Energy', 'A proton'],
        correctIndex: 1,
      },
      {
        id: 5,
        prompt: 'Water (H₂O) is an example of what?',
        options: ['An atom', 'A molecule', 'An electron', 'A neutron'],
        correctIndex: 1,
      },
    ],
  
    // ⚙️ Basic Mechanics Quiz
    'basic-mechanics': [
      {
        id: 1,
        prompt: 'What is a force?',
        options: [
          'A push or a pull',
          'A type of energy only',
          'A chemical reaction',
          'A unit of temperature',
        ],
        correctIndex: 0,
      },
      {
        id: 2,
        prompt: 'Which of the following can a force change?',
        options: [
          'Only color',
          'Speed and direction',
          'Temperature only',
          'Mass only',
        ],
        correctIndex: 1,
      },
      {
        id: 3,
        prompt: 'What is friction?',
        options: [
          'A force that increases motion',
          'A force that resists motion',
          'A type of gravity',
          'A type of energy',
        ],
        correctIndex: 1,
      },
      {
        id: 4,
        prompt: 'According to Newton’s First Law, an object at rest will:',
        options: [
          'Start moving on its own',
          'Stay at rest unless acted on by a force',
          'Explode',
          'Change mass',
        ],
        correctIndex: 1,
      },
      {
        id: 5,
        prompt: 'Acceleration depends on force and what else?',
        options: ['Temperature', 'Mass', 'Color', 'Friction only'],
        correctIndex: 1,
      },
    ],
  }
  
  export function getQuiz(moduleId) {
    return quizzes[moduleId] ?? []
  }