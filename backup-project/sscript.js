const screen = document.getElementById('screen');
let currentInput = '';

function appendNumber(number) {
  // Предотвращаем ввод нескольких точек подряд
  if (number === '.' && currentInput.slice(-1) === '.') return;
  
  currentInput += number;
  screen.value = currentInput;
}

function appendOperator(operator) {
  if (currentInput === '') return;
  
  // Если последний символ уже оператор, заменяем его
  const lastChar = currentInput.slice(-1);
  if (['+', '-', '*', '/'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }
  
  currentInput += operator;
  screen.value = currentInput;
}

function clearScreen() {
  currentInput = '';
  screen.value = '';
}

function calculate() {
  if (currentInput === '') return;
  
  try {
    // Безопасное вычисление выражения
    const result = Function(`'use strict'; return (${currentInput})`)();
    currentInput = String(result);
    screen.value = currentInput;
  } catch (error) {
    screen.value = 'Ошибка';
    currentInput = '';
  }
}