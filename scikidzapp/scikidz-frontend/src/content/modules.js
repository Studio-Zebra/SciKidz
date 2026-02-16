export const modules = {
    "water-cycle": {
      title: "The Water Cycle",
      heroImage: "/assets/lesson-watercycle.png",
      // ...
    },
    "atoms-molecules": {
      title: "Atoms and Molecules",
      heroImage: "/assets/lesson-atoms.png",
      // ...
    },
    "basic-mechanics": {
      title: "Basic Mechanics",
      heroImage: "/assets/lesson-mechanics.png",
      // ...
    }
  }
  
  export function getModule(moduleId) {
    return modules[moduleId] ?? null
  }
  