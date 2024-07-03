<script setup lang="ts">
const 현재값 = defineModel<string>({ default: "0" });
const 연산자눌렀는가 = ref(false);
const 계산식 = ref<string[]>([]);
const emits = defineEmits<{ (e: "click-easy"): void }>();

const clearDisplay = () => {
  현재값.value = "0";
  if (계산식.value.length > 0 && 현재값.value === "0") {
    계산식.value = [];
  }
};

const delDisplay = () => {
  if (현재값.value.length > 1) {
    현재값.value = 현재값.value.slice(0, -1);
  } else {
    현재값.value = "0"; // 모든 자릿수가 지워지면 기본값 0으로 설정
  }
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
  if (현재값.value.length > 10) return;

  // 소수점 중복 입력 방지
  if (number === "." && 현재값.value.includes(".")) return;

  if (연산자눌렀는가.value) {
    // 연산자 눌렀는가? => 새로운 숫자 입력 시작
    현재값.value = number;
    연산자눌렀는가.value = false;
  } else {
    if (number === ".") {
      // 소수점 추가
      현재값.value += number;
    } else if (현재값.value.includes(".")) {
      // 소수점을 포함한 상태에서 숫자 추가
      현재값.value += number;
    } else {
      // 소수점이 없는 상태에서 숫자 추가
      현재값.value = (+(현재값.value + number)).toString();
    }
  }
};

const chooseOperator = (nextOperator: string) => {
  if (연산자눌렀는가.value) {
    // 연산자가 이미 눌렸다면, 계산식의 마지막 연산자를 교체
    계산식.value[계산식.value.length - 1] = nextOperator;
  } else {
    // 연산자가 눌리지 않았다면
    const lastElement = 계산식.value.at(-1);

    if (lastElement && !isNaN(+lastElement)) {
      // 마지막 요소가 숫자라면
      계산식.value.push(nextOperator);
      연산자눌렀는가.value = true;
      현재값.value = performCalculation().toString();
    } else if (+현재값.value > 0) {
      // 현재값이 유효하고 마지막 요소가 숫자가 아니라면
      계산식.value.push(현재값.value, nextOperator);
      연산자눌렀는가.value = true;
      현재값.value = performCalculation().toString();
    }
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
  return Math.round(결과값);
};
</script>
<template>
  <div class="h-100 flex flex-col">
    <slot />
    <div class="text-xl text-right px-6 py-1 text-gray-500 h-100">
      {{ 계산식.map((v) => ({ "*": "x" }[v] || v)).join(" ") || "　" }}
    </div>
    <div class="buttons flex-1">
      <button class="btn bg-black" @click="clearDisplay()">
        {{ 계산식.length > 0 && 현재값 === "0" ? "AC" : "C" }}
      </button>
      <button class="btn number bg-black" @click="emits('click-easy')">
        <UIcon name="i-ph-hamburger-bold floating" />
      </button>
      <button class="btn number bg-black" @click="delDisplay()">
        <UIcon name="i-ph-arrow-left-bold" />
      </button>
      <button class="btn bg-primary" @click="chooseOperator('/')">
        <UIcon name="i-ph-divide-bold" />
      </button>
      <button class="btn number" @click="appendNumber('7')">7</button>
      <button class="btn number" @click="appendNumber('8')">8</button>
      <button class="btn number" @click="appendNumber('9')">9</button>
      <button class="btn bg-primary" @click="chooseOperator('*')">
        <UIcon name="i-ph-x-bold" />
      </button>
      <button class="btn number" @click="appendNumber('4')">4</button>
      <button class="btn number" @click="appendNumber('5')">5</button>
      <button class="btn number" @click="appendNumber('6')">6</button>
      <button class="btn bg-primary" @click="chooseOperator('-')">
        <UIcon name="i-ph-minus-bold" />
      </button>
      <button class="btn number" @click="appendNumber('1')">1</button>
      <button class="btn number" @click="appendNumber('2')">2</button>
      <button class="btn number" @click="appendNumber('3')">3</button>
      <button class="btn bg-primary" @click="chooseOperator('+')">
        <UIcon name="i-ph-plus-bold" />
      </button>
      <button class="btn number" @click="appendNumber('.')">.</button>
      <button class="btn number" @click="appendNumber('0')">0</button>
      <button class="btn number" @click="appendNumber('00')">00</button>
      <button class="btn bg-primary" @click="handleEqual()">
        <UIcon name="i-ph-equals-bold" />
      </button>
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
}

.btn:active {
  box-shadow: 0 0 0 5px rgb(var(--color-primary-700));
  transform: scale(0.9);
}
</style>
