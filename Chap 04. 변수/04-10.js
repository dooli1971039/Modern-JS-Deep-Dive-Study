console.log(score); // undefined

score = 80; // 값의 할당 - 런타임에 실행
var score; // 변수 선언 - 런타임 이전에 실행 (호이스팅)

console.log(score); // 80

/**
 * 호이스팅에 의해, 변수 선언이 위로 올라가고 1번 라인에서는 undefined가 출력
 * 이후 3번 라인을 통해 score변수에 80이 할당되고, 6번 라인에서 80이 출력
 */
