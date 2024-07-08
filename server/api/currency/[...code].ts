export default defineEventHandler(async (event) => {
  const currencyCode = getRouterParam(event, "code") || "";
  const { country }: any = await $fetch(
    `https://m.search.naver.com/p/csearch/content/qapirender.nhn?` +
      [
        "key=calculator",
        "pkid=141",
        "q=%ED%99%98%EC%9C%A8",
        "where=m",
        "u1=keb",
        "u6=standardUnit",
        `u3=${currencyCode}`,
        `u4=KRW`,
        `u8=down`,
        `u2=${["VND", "JPY", "IDR"].includes(currencyCode) ? 100 : 1}`,
      ].join("&")
  );
  return {
    currencyUnit: +country[0].value,
    basePrice: +country[1].value.replace(/\,/g, ""),
    modifiedAt: new Date(),
  };
});
