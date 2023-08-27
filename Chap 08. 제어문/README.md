# Chap 08. 제어문

제어문(control flow statement)은 조건에 따라 코드 블록을 실행(조건문)하거나, 반복 실행(반복문)할 때 사용한다.  
일반적으로 코드는 위에서 아래 방향으로 실행되지만, 제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어할 수 있다.

<br/>

## 블록문

블록문(block statement/compound statement)은 **0개 이상의 문을 중괄호로 묶은 것**으로, 코드 블록 또는 블록이라고 부르기도 한다.  
JS는 블록문을 하나의 실행 단위로 취급한다.

```js
// 블록문 - 단독으로도 사용 가능하다
{
    var foo = 10;
}

// 제어문
var x = 1;
if (x < 10) {
    x++;
}

// 함수 선언문
function sum(a, b) {
    return a + b;
}
```

블록문은 단독으로도 사용이 가능하다.  
또한 블록문은 자체 종결성을 갖기 때문에 끝에 세미콜론을 붙이지 않는다.

<br/>

## 조건문

**조건문(conditional statement)** : 주어진 조건식의 평과 결과에 따라 코드 블록의 실행을 결정한다.  
**조건식(conditional expression)** : boolean 값으로 평가될 수 있는 표현식

### if ... else 문

if ... else 문은 주어진 조건식의 평과 결과에 따라 실행할 코드 블록을 결정한다.

-   if만 단독으로 사용하는 경우
    ```js
    if (조건식) {
        // 조건식이 참이면 이 코드 블록이 실행
    }
    ```
-   if ... else 로 사용하는 경우
    ```js
    if (조건식) {
        // 조건식이 참이면 실행
    } else {
        // 조건식이 거짓이면 실행
    }
    ```
-   if ... else if ... else로 사용하는 경우 (else if는 여러번 사용 가능)
    ```js
    if (조건식1) {
        // 조건식 1이 참이면 실행
    } else if (조건식 2) {
        // 조건식 2가 참이면 실행
    } else {
        // 조건식 1과 조건식 2가 모두 거짓이면 실행
    }
    ```

```js
var num = 2;
var kind;

// 블록 안의 statement가 한 줄이면 {}를 생략할 수 있다.
if (num > 0) kind = "양수";
else if (num < 0) kind = "음수";
else kind = "영";

console.log(kind); // 양수
```

<br/>

대부분의 if ... else문은 삼항 조건 연산자로 바꿔쓸 수 있다.

```js
// x가 짝수이면 result 변수에 문자열 '짝수'를 할당하고, 홀수이면 문자열 '홀수'를 할당한다.
var x = 2;
var result;

if (x % 2) {
    // 2 % 2는 0이다. 이때 0은 false로 암묵적 강제 변환된다.
    result = "홀수";
} else {
    result = "짝수";
}
console.log(result); // 짝수

// 0은 false로 취급된다.
var result = x % 2 ? "홀수" : "짝수";
console.log(result); // 짝수
```

```js
var num = 2;
// 0은 false로 취급된다.
var kind = num ? (num > 0 ? "양수" : "음수") : "영";
console.log(kind); // 양수
```

삼항 조건 연산자는 "값으로 평가되는 표현식"을 만들기 때문에, 위와 같이 사용할 수 있다.  
if ... else 문은 표현식이 아닌 문이기 때문에, 변수에 할당할 수 없다.

<br/>

### switch 문

switch 문은 주어진 표현식을 평가하여, 그 값고 일치하는 표현식을 갖는 case 문으로 실행 흐름을 옮긴다.  
case 문은 상황을 의미하는 표현식을 지정하고 콜론(:)으로 마친다.  
그리고 그 뒤에 실행할 문들을 위치시킨다.

switch 문의 표현식과 일치하는 case문이 없다면 실행 순서는 default 문으로 이동한다. (default문은 option임)

```js
switch (표현식) {
    case 표현식1:
        // switch 문의 표현식과 표현식1이 일치하면 실행될 문
        break;
    case 표현식2:
        // switch 문의 표현식과 표현식2가 일치하면 실행될 문
        break;
    default:
    // switch 문의 표현식과 일치하는 case 문이 없을 때 실행될 문
}
```

<br/>

**switch 문의 주의 사항**

switch문은, 표현식의 평가 결과와 일치하는 case문으로 실행 흐름이 이동하는 것은 맞지만, 해당 코드블록을 실행한 이후 switch문을 탈출하지 않는다. 대신, switch문이 끝날 때까지의 모든 case문과 default문을 실행하게 된다.  
=> **폴스루(fall through)** 라고 부른다.  
==> 바로 끝내고 싶다면, `break;`를 추가해주어야 한다. 그럼 바로 switch문을 탈출한다. (default문에서는 일반적으로 생략한다.)

아래는 fall through 특징을 응용한 예제이다.

```js
// 08-09

var year = 2000; // 2000년은 윤년으로 2월이 29일이다.
var month = 2;
var days = 0;

switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        days = 31;
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        days = 30;
        break;
    case 2:
        // 윤년 계산 알고리즘
        // 1. 연도가 4로 나누어 떨어지는 해는 윤년이다.
        // 2. 연도가 4로 나누어 떨어지더라도 100으로 나누어 떨어지는 해는 윤년이 아니다.
        // 3. 연도가 400으로 나누어 떨어지는 해는 윤년이다.
        days = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
        break;
    default:
        console.log("Invalid month");
}
```

<br/>
<br/>

## 반복문

반복문(loop statement)은 조건식의 평가 결과가 참인 경우 코드 블록을 실행한다. 이후 조건식을 다시 평가하여 참인 경우 코드블록을 재실행 한다. => "반복"  
for문, while문, do...while문이 있다.

### for문

for문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행한다.

```js
for(변수 선언문 또는 할당문; 조건식; 증감식) {
    // 조건식이 참인 경우 반복 실행될 문;
}
```

for문의 변수 선언문, 조건식, 증감식은 모두 옵션이다.  
그러나 전부 쓰지 않으면 무한 루프가 된다.

```js
// 무한루프
for (;;) { ... }
```

for문도 중첩하여 사용할 수 있다.

```js
for (var i = 1; i <= 6; i++) {
    for (var j = 1; j <= 6; j++) {
        if (i + j === 6) console.log(`[${i}, ${j}]`);
    }
}
```

<br/>

### while 문

while 문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다.  
while문은 조건문의 평가 결과가 거짓이 되면 코드 블록을 실행하지 않고 종료한다.

```js
while (조건식) {
    // 조건식이 참인 경우 반복 실행될 문;
}
```

조건식의 평가 결과가 boolean 값이 아니면 boolean 값으로 강제 변환하여 논리적 참, 거짓을 구별한다. (truthy, falsy)

```js
//300은 truthy한 값이다.
while (300) {
    // 조건식이 참인 경우 반복 실행될 문;
}
```

아래와 같이 무한루프인 경우, 중간에 `break;`로 빠져나올 수 있다.

```js
var count = 0;
// 무한 루프
while (true) {
    console.log(count);
    count++;
    // count가 3이면 코드 실행을 중단한다.
    if (count === 3) break;
} // 0 1 2
```

<br/>

### do ... while 문

do...while문은 코드 블록을 먼저 실행하고 조건식을 평가한다.  
따라서 조건식부터 평가하는 while문과 달리, 반드시 1번은 코드 블록을 실행하게 된다.

```js
var count = 5;

do {
    console.log(count);
    count++;
} while (count < 3); // 5
```

<br/>
<br/>

## break/continue 문

### break 문

`break;`는 **레이블 문, 반복문, switch 문**의 코드 블록을 탈출한다.

```js
var string = "Hello World.";
var search = "l";
var index;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
    // 문자열의 개별 문자가 'l'이면
    if (string[i] === search) {
        index = i;
        break; // 반복문을 탈출한다.
    }
}

console.log(index); // 2

// 참고로 String.prototype.indexOf 메서드를 사용해도 같은 동작을 한다.
console.log(string.indexOf(search)); // 2
```

이 외의 경우에 `break;`를 사용하면 SyntaxError가 발생한다.

```js
if (true) {
  break; // Uncaught SyntaxError: Illegal break statement
}
```

<br/>

**레이블 문**에서의 `break;`

```js
// foo라는 식별자가 붙은 레이블 블록문
foo: {
    console.log(1);
    break foo; // foo 레이블 블록문을 탈출한다.
    console.log(2);
}

console.log("Done!");
```

레이블 문을 탈출하려면 **break문에 레이블 식별자를 지정**해야 한다.

<br/>

중첩된 for문의 안쪽 for문에서 break를 실행하면, 안쪽 for문은 탈출해도 여전히 바깥쪽 for문에 남게 된다. 아예 빠져나가고 싶다면, 레이블 문을 사용하면 된다. 하지만 레이블 문을 사용하면 프로그램의 흐름이 복잡해져서 가독성이 나빠지고 오류를 발생시킬 가능성이 높아지므로 권장하지 않는다.

```js
// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
        if (i + j === 3) break outer;
        console.log(`inner [${i}, ${j}]`);
    }
}

console.log("Done!");
```

<br/>

### continue 문

continue 문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다.  
(break문 처럼 반복문을 탈출하지는 않는다.)

```js
// continue 문을 사용하지 않으면 if 문 내에 코드를 작성해야 한다.
for (var i = 0; i < string.length; i++) {
    // 'l'이면 카운트를 증가시킨다.
    if (string[i] === search) {
        count++;
        // code
        // code
        // code
    }
}

// continue 문을 사용하면 if 문 밖에 코드를 작성할 수 있다.
for (var i = 0; i < string.length; i++) {
    // 'l'이 아니면 카운트를 증가시키지 않는다.
    if (string[i] !== search) continue;

    count++;
    // code
    // code
    // code
}
```
