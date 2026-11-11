import resourceSections from "../data/resourceSections.json";

export const getResourceSection = (id) =>
  resourceSections.find((section) => section.id === id);
