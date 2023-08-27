//어떤 조건이 Truty일 때 무언가를 해야 한다면 && 연산자를 사용하여 if문 대체
var done = true;
var message = "";

// 주어진 조건이 true일 때
if (done) message = "완료";

// if 문은 단축 평가로 대체 가능하다.
// done이 true라면 message에 '완료'를 할당
message = done && "완료";
console.log(message); // 완료

////////////////////////////////////////////////////////////////////////

//어떤 조건이 Falsy일 때 무언가를 해야 한다면 || 연산자를 사용하여 if문 대체
var done = false;
var message = "";

// 주어진 조건이 false일 때
if (!done) message = "미완료";

// if 문은 단축 평가로 대체 가능하다.
// done이 false라면 message에 '미완료'를 할당
message = done || "미완료";
console.log(message); // 미완료
