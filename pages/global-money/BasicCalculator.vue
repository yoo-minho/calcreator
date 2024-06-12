<script setup lang="ts">
const currentValue = defineModel<number>({ default: 0 });
const operator = ref<string | null>(null);
const firstOperand = ref<number | null>(null);
const waitingForSecondOperand = ref<boolean>(false);

const clearDisplay = () => {
  currentValue.value = 0;
  operator.value = null;
  firstOperand.value = null;
  waitingForSecondOperand.value = false;
};

const appendNumber = (number: string) => {
  if (currentValue.value === 0 || waitingForSecondOperand.value) {
    currentValue.value = +number;
  } else {
    currentValue.value = currentValue.value * 10 + +number;
  }
  waitingForSecondOperand.value = false;
};

const chooseOperator = (nextOperator: string) => {
  if (firstOperand.value === null) {
    firstOperand.value = +currentValue.value;
  } else if (operator.value) {
    const result = performCalculation();
    currentValue.value = +result.toString();
    firstOperand.value = result;
  }
  waitingForSecondOperand.value = true;
  operator.value = nextOperator;
};

const performCalculation = (): number => {
  const second = +currentValue.value;
  let result: number;
  switch (operator.value) {
    case "+":
      result = firstOperand.value! + second;
      break;
    case "-":
      result = firstOperand.value! - second;
      break;
    case "*":
      result = firstOperand.value! * second;
      break;
    case "/":
      result = firstOperand.value! / second;
      break;
    default:
      return +currentValue.value;
  }
  return result;
};

const handleEqual = () => {
  if (operator.value && firstOperand.value !== null) {
    const result = performCalculation();
    currentValue.value = +result.toString();
    operator.value = null;
    firstOperand.value = null;
  }
};

const toggleSign = () => {
  currentValue.value = +currentValue.value * -1;
};

const percentage = () => {
  currentValue.value = +currentValue.value / 100;
};
</script>
<template>
  <div class="buttons">
    <button class="btn" @click="clearDisplay">AC</button>
    <button class="btn" @click="toggleSign">+/-</button>
    <button class="btn" @click="percentage">%</button>
    <button class="btn bg-primary" @click="chooseOperator('/')">/</button>
    <button class="btn number" @click="appendNumber('7')">7</button>
    <button class="btn number" @click="appendNumber('8')">8</button>
    <button class="btn number" @click="appendNumber('9')">9</button>
    <button class="btn bg-primary" @click="chooseOperator('*')">x</button>
    <button class="btn number" @click="appendNumber('4')">4</button>
    <button class="btn number" @click="appendNumber('5')">5</button>
    <button class="btn number" @click="appendNumber('6')">6</button>
    <button class="btn bg-primary" @click="chooseOperator('-')">-</button>
    <button class="btn number" @click="appendNumber('1')">1</button>
    <button class="btn number" @click="appendNumber('2')">2</button>
    <button class="btn number" @click="appendNumber('3')">3</button>
    <button class="btn bg-primary" @click="chooseOperator('+')">+</button>
    <button class="btn number" @click="appendNumber('0')">0</button>
    <button class="btn" @click="appendNumber('.')">.</button>
    <button class="btn" @click="appendNumber('.')">.</button>
    <button class="btn bg-primary" @click="handleEqual">=</button>
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
  font-size: 24px;
  cursor: pointer;
}
</style>
