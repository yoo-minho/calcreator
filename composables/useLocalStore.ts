export const useLocalStore = async (key: string, callback: () => any) => {
  return await callback();

  /*
  if (!window?.localStorage) {
    return await callback();
  }
  const cache = localStorage.getItem(key);
  if (cache) {
    const cacheJson = JSON.parse(cache);
    if (isSameDate(new Date(cacheJson.timestamp), new Date())) {
      console.log(`success to get cached data! - ${key}`);
      return { data: ref(JSON.parse(cache)), pending: ref(false) };
    }
  }
  const { data, pending } = await callback();
  watch(
    data,
    () => {
      localStorage.setItem(key, JSON.stringify({ ...data.value, timestamp: new Date() }));
    },
    { immediate: true }
  );
  return { data, pending };
  */
};

function isSameDate(date1: Date, date2: Date) {
  const timestamp1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getTime();
  const timestamp2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()).getTime();
  return timestamp1 === timestamp2;
}
