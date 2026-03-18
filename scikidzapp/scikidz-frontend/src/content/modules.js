export const modules = {
  "water-cycle": {
    title: "The Water Cycle",
    heroImage: "/assets/lesson-watercycle.png",
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
  }
}

export function getModule(moduleId) {
  return modules[moduleId] ?? null
}