export const modules = {
  "water-cycle": {
    title: "The Water Cycle",
    heroImage: "/assets/lesson-watercycle.png",
    ar: {
      title: "How to Explore",
      text: "Tap parts of the scene to learn about the water cycle. Use two fingers to move around the environment.",
      instructions: [
        { type: "pan", label: "Pan Environment" }
      ]
    },
    recap: {
      title: "Water Cycle Recap",
      bullets: [
        "The water cycle is the continuous movement of water on Earth.",
        "Evaporation turns liquid water into water vapor.",
        "Condensation forms clouds from cooled water vapor.",
        "Precipitation returns water to Earth as rain, snow, sleet, or hail.",
        "Collection gathers water in rivers, lakes, oceans, and underground."
      ]
    }
  },

  "atoms-molecules": {
    title: "Atoms and Molecules",
    heroImage: "/assets/lesson-atoms.png",
    ar: {
      title: "How to Use This Lab",
      text: "Tap the tabs at the top to switch between activities. Use the buttons, sliders, and atom controls to build atoms, create molecules, and explore bond types. Tap interactive particles or objects to learn more. In Molecule Builder, select an atom from the palette and tap the canvas to place it.",
      instructions: [
        { type: "tap", label: "Interact" }
      ]
    },
    recap: {
      title: "Atoms & Molecules Recap",
      bullets: [
        "Atoms are the basic building blocks of matter.",
        "Protons (+) and neutrons (0) are in the nucleus.",
        "Electrons (-) move around the nucleus.",
        "Molecules form when atoms bond together.",
        "Different molecules have different properties."
      ]
    }
  },

  "basic-mechanics": {
    title: "Basic Mechanics",
    heroImage: "/assets/lesson-mechanics.png",
    ar: {
      title: "How to Use This Lab",
      text: "Tap the tabs at the top to switch between mechanics activities. Use the sliders and buttons at the bottom to change values like mass, angle, friction, speed, or power. Drag or launch objects in the simulation to see how motion changes. Tap Learn buttons to open explanations for each concept.",
      instructions: [
        { type: "tap", label: "Interact" }
      ]
    },
    recap: {
      title: "Mechanics Recap",
      bullets: [
        "A force is a push or pull that can change motion.",
        "Newton’s laws describe how forces affect objects.",
        "Friction resists motion between surfaces.",
        "Mass and acceleration determine how an object responds to force.",
        "Forces can change speed, direction, or shape."
      ]
    }
  },
}

export function getModule(moduleId) {
  return modules[moduleId] ?? null
}