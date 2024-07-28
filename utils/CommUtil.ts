export const setLocalJson = (key: string, data: {}) => {
  localStorage.setItem(key, JSON.stringify({ ...data, timestamp: new Date() }));
};

export const getLocalJson = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
