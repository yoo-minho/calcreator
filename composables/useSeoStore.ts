export const useSeoStore = (data?: any) => {
  if (data) {
    const state = useState("seo", () => {});
    state.value = data;
    return state;
  } else {
    return useState("seo");
  }
};
