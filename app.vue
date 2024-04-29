<template>
  <div>
    <Header />
    <div class="m-3 flex justify-center">
      <div class="min-w-xs max-w-lg w-full">
        <LandingHero />
      </div>
    </div>
  </div>
</template>
<style>
:root {
  --header-height: 4rem;
}

@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}

* {
  font-family: "Pretendard-Regular", sans-serif;
}
</style>
