console.log(score); // undefined

var score; // ① 변수 선언 - 런타임 이전에 실행 (호이스팅)
score = 80; // ② 값의 할당 - 런타임에 실행

console.log(score); // 80
