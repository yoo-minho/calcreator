<script setup lang="ts">
const 현재값 = defineModel<string>({ default: "0" });
const 연산자눌렀는가 = ref(false);
const 계산식 = ref<string[]>([]);

const clearDisplay = () => {
  현재값.value = "0";
  계산식.value = [];
};

const handleEqual = () => {
  if (계산식.value.length === 0) return;
  if (!["+", "-", "*", "/"].includes(계산식.value.at(-1) || "")) {
    계산식.value = [...계산식.value, 계산식.value.at(-2) || "", 현재값.value];
  } else {
    계산식.value = [...계산식.value, 현재값.value];
  }
  현재값.value = performCalculation().toString();
};

const appendNumber = (number: string) => {
  if (연산자눌렀는가.value) {
    현재값.value = number;
    연산자눌렀는가.value = false;
  } else if ((number === "." && !현재값.value.includes(".")) || (number !== "." && 현재값.value.includes("."))) {
    현재값.value += number;
  } else {
    현재값.value = (+(현재값.value + number)).toString();
  }
};

const chooseOperator = (nextOperator: string) => {
  if (연산자눌렀는가.value) {
    계산식.value = [...계산식.value.splice(0, 계산식.value.length - 1), nextOperator];
  } else {
    if (+(계산식.value.at(-1) || "") > 0) {
      계산식.value = [...계산식.value, nextOperator];
    } else {
      계산식.value = [...계산식.value, 현재값.value, nextOperator];
    }
    연산자눌렀는가.value = true;
    현재값.value = performCalculation().toString();
  }
};

const oper = (sign: string) =>
  ({
    "+": (a: number, b: number) => a + b,
    "-": (a: number, b: number) => a - b,
    "*": (a: number, b: number) => a * b,
    "/": (a: number, b: number) => a / b,
  }[sign] || (() => 0));

const performCalculation = (): number => {
  let 결과값: number = 0;
  let sign: string | null = null;
  계산식.value.forEach((v) => {
    if (["+", "-", "*", "/"].includes(v)) {
      sign = v;
    } else {
      if (sign) {
        결과값 = oper(sign)(결과값, +v);
        sign = null;
      } else {
        결과값 = +v;
      }
    }
  });
  return 결과값;
};
</script>
<template>
  <div class="h-100 flex flex-col">
    <div class="text-xl text-right px-6 py-1 text-gray-500 h-100">
      {{ 계산식.map((v) => ({ "*": "x" }[v] || v)).join(" ") || "　" }}
    </div>
    <slot />
    <div class="buttons flex-1">
      <button class="btn number" @click="appendNumber('7')">7</button>
      <button class="btn number" @click="appendNumber('8')">8</button>
      <button class="btn number" @click="appendNumber('9')">9</button>
      <button class="btn bg-primary" @click="chooseOperator('*')">x</button>
      <button class="btn number" @click="appendNumber('4')">4</button>
      <button class="btn number" @click="appendNumber('5')">5</button>
      <button class="btn number" @click="appendNumber('6')">6</button>
      <button class="btn bg-primary" @click="chooseOperator('/')">/</button>
      <button class="btn number" @click="appendNumber('1')">1</button>
      <button class="btn number" @click="appendNumber('2')">2</button>
      <button class="btn number" @click="appendNumber('3')">3</button>
      <button class="btn bg-primary" @click="chooseOperator('+')">+</button>
      <button class="btn number" @click="appendNumber('0')">0</button>
      <button class="btn" @click="appendNumber('.')">.</button>
      <button class="btn" @click="clearDisplay()">Clear</button>
      <button class="btn bg-primary" @click="handleEqual()">=</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buttons {
  background-color: #333;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.btn {
  color: #fff;
  font-size: 28px;
  cursor: pointer;
}
</style>
