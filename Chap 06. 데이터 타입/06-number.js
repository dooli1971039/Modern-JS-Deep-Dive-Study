// 모두 숫자 타입이다.
var integer = 10; // 정수
var double = 10.12; // 실수
var negative = -20; // 음의 정수

// 표기법만 다를 뿐 모두 같은 값이다.
var binary = 0b01000001; // 2진수
var octal = 0o101; // 8진수
var hex = 0x41; // 16진수

console.log(binary); // 65
console.log(octal); // 65
console.log(hex); // 65
console.log(binary === octal); // true
console.log(octal === hex); // true

// 숫자 타입은 모두 실수로 처리된다.
console.log(1 === 1.0); // true
console.log(4 / 2); // 2
console.log(3 / 2); // 1.5

// 숫자 타입의 세 가지 특별한 값
console.log(10 / 0); // Infinity
console.log(10 / -0); // -Infinity
console.log(1 * "String"); // NaN (Not a Number)

// 자바스크립트는 대소문자를 구별한다.
var x = nan; // ReferenceError: nan is not defined

// NaN
console.log(typeof NaN); // number
console.log(NaN === NaN); // false
console.log(NaN == NaN); // false
console.log(isNaN(NaN)); // true
