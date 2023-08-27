var str = "";

// 문자열의 길이(length)를 참조한다.
var length = str && str.length;
// 문자열의 길이(length)를 참조하지 못한다.
console.log(length); // ''

console.log("##############");

// 문자열의 길이(length)를 참조한다. 이때 좌항 피연산자가 false로 평가되는 Falsy 값이라도
// null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.
var length = str?.length;
console.log(length); // 0

console.log(str.length); //0
