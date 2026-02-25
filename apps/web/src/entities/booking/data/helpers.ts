export const generateId = () => Math.random().toString(36).slice(2, 9);

export const STATUS_OPTIONS = [
  { value: "avaliable", label: "Свободен" },
  { value: "busy", label: "Занят" },
];
