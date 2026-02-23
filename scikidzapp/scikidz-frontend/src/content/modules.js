export const modules = {
  "water-cycle": {
    title: "The Water Cycle",
    heroImage: "/assets/lesson-watercycle.png",
    ar: {
      title: "Gestures",
      text:
        "Use one finger to interact with water elements. Tap clouds or rain to see the water cycle in action. Use two fingers to pan around.",
      gestures: [
        { icon: "/assets/interact.png", alt: "Tap to interact", label: "Interact" },
        { icon: "/assets/panenvironment.png", alt: "Use two fingers to pan", label: "Pan Environment" }
      ]
    }
  },

  "atoms-molecules": {
    title: "Atoms and Molecules",
    heroImage: "/assets/lesson-atoms.png",
    ar: {
      title: "Gestures",
      text:
        "Tap atoms to learn about protons, neutrons, and electrons. Drag atoms together to form molecules. Use two fingers to pan.",
      gestures: [
        { icon: "/assets/interact.png", alt: "Tap to interact", label: "Interact" },
        { icon: "/assets/panenvironment.png", alt: "Use two fingers to pan", label: "Pan Environment" }
      ]
    }
  },

  "basic-mechanics": {
    title: "Basic Mechanics",
    heroImage: "/assets/lesson-mechanics.png",
    ar: {
      title: "Gestures",
      text:
        "Tap objects to apply forces. Drag to move them. Use two fingers to pan the environment.",
      gestures: [
        { icon: "/assets/interact.png", alt: "Tap to interact", label: "Interact" },
        { icon: "/assets/panenvironment.png", alt: "Use two fingers to pan", label: "Pan Environment" }
      ]
    }
  }
}

export function getModule(moduleId) {
  return modules[moduleId] ?? null
}