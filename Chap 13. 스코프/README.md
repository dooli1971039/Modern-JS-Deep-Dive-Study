# Chap 13. 스코프

모든 식별자(변수 이름, 함수 이름, 클래스 이름 등)은 **자신이 선언된 위치에 의해** 다른 코드가 식별자 자신을 참조할 수 있는 **유효범위가 결정**된다. 이를 **스코프(scope)** 라고 한다.  
=> **스코프는 식별자가 유효한 범위**를 말한다.

```js
function add(x, y) {
    // 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
    // 즉, 매개변수의 스코프(유효범위)는 함수 몸체 내부다.
    console.log(x, y); // 2 5
    return x + y;
}

add(2, 5);
// 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
console.log(x, y); // ReferenceError: x is not defined

var var1 = 1;
if (true) {
    var var2 = 2;
    if (true) {
        var var3 = 3;
    }
}

function foo() {
    var var4 = 4;
    function bar() {
        var var5 = 5;
    }
}

console.log(var1); // 1
console.log(var2); // 2
console.log(var3); // 3
console.log(var4); // ReferenceError: var4 is not defined
console.log(var5); // ReferenceError: var5 is not defined
```

<br/>

```js
var x = "global";

function foo() {
    var x = "local";
    console.log(x); // <----- local
}

foo();

console.log(x); // <----- global
```

**식별자 결정(identifier resolution)**: 이름이 같은 변수들 중에서 어떤 변수를 참조해야 할 것인지 결정하는 것. JS엔진은 스코프를 통해 어떤 변수를 참조할 것인지 결정한다.  
=> 스코프: **JS엔진이 식별자를 검색할 때 사용하는 규칙**

JS 엔진은 코드를 실행할 때, 코드의 문맥(context)를 고려한다.

![스코프는 네임스페이스](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcn0zjT%2FbtqZoydJdrc%2FvHquKk6Vb0mf4PaExIsZX1%2Fimg.png)

스코프라는 개념이 없다면 같은 이름을 갖는 변수는 충돌을 일으키므로 프로그램 전체에서 하나밖에 사용할 수 없다. 프로그래밍 언어에서는 스코프(유효범위)를 통해 식별자인 변수 이름의 충돌을 방지하여 같은 이름의 변수를 사용할 수 있게 한다. 스코프 내에서 식별자는 유일해야 하지만, 다른 스코프에는 같은 이름의 식별자를 사용할 수 있다.  
=> 스코프는 네임스페이스다.

<details>
<summary>var 키워드로 선언한 변수의 중복 선언</summary>

var 키워드로 선언된 변수는 **같은 스코프 내에서도 중복 선언이 허용**된다. 이는 의도치 않게 변수값이 재할당되어 변경되는 부작용을 발생시킨다.

```js
function foo() {
    var x = 1;
    // var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
    // 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
    var x = 2;
    console.log(x); // 2
}
foo();

function bar() {
    let x = 1;
    // let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
    let x = 2; // SyntaxError: Identifier 'x' has already been declared
}
bar();
```

</details>

<details>
<summary>코드의 문맥과 환경</summary>

"코드가 어디서 실행되며 주변에 어떤 코드가 있는지"를 렉시컬 환경(lexical environment)라고 부른다. 즉, 코드의 문맥(context)는 렉시컬 환경으로 이뤄진다. 이를 구현한 것이 "실행 컨텍스트(execution context)"이며, 모든 코드는 실행 컨텍스트에서 평가되고 실행된다. 스코프는 실행 컨텍스트와 깊은 관련이 있다.

</details>

<br/>

## 스코프의 종류

코드는 전역(global)과 지역(local)로 구분할 수 있다.

| 구분 |         설명          |   스코프    |   변수    |
| :--: | :-------------------: | :---------: | :-------: |
| 전역 | 코드의 가장 바깥 영역 | 전역 스코프 | 전역 변수 |
| 지역 |    함수 몸체 내부     | 지역 스코프 | 지역 변수 |

변수는 자신이 선언된 위치(전역 or 지역)에 의해 자신이 유효한 범위인 스코프가 결정된다.

![전역 스코프와 지역 스코프](https://velog.velcdn.com/images%2Fjinseoit%2Fpost%2F768d4117-0a6c-49c3-952c-74e663201b17%2Fimage.png)

### 전역과 전역 스코프

전역: 코드의 가장 바깥 영역, 전역 스코프(global scope)를 만든다.  
전역에 변수를 선언하면 전역 스코프를 갖는 전역 변수(global variable)가 된다.  
**전역 변수는 어디서든지 참조할 수 있다**.

### 지역과 지역 스코프

지역: 함수 몸체 내부, 지역 스코프(local scope)를 만든다.
지역에 변수를 선언하면 지역 스코프를 갖는 지역 변수(local variable)가 된다.  
**지역 변수는 자신의 지역 스코프와 하위 지역 스코프에서 유효하다.**

<br/>

## 스코프 체인

**스코프는 함수의 중첩에 의해 계층적 구조를 갖는다.** 이때 외부 함수의 지역 스코프를 중첩 함수의 상위 스코프라 한다.

![스코프 체인](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZsB6H%2FbtqZqqeXNc7%2Fufs7kKZUEci9ynrAyWFkJk%2Fimg.png)

모든 스코프는 하나의 계층적 구조롤 연결되며, 모든 지역 스코프의 최상위 스코프는 전역 스코프다.  
이렇게 스코프가 계층적으로 연결된 것을 **스코프 체인(scope chain)** 이라 한다.

<br/>

#### Q) 상위 스코프에서 선언한 변수 참조는 어떻게 하지?

A) 변수를 참조할 때, JS앤잔운 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 이동하며 선언된 변수를 검색(identifier resolution)한다.

<br/>

스코프 체인은 물리적인 실체로 존재한다. 자바스크립트 엔진은 코드를 실행하기에 앞서 위 그림과 유사한 자료구조인 렉시컬 환경을 실제로 생성한다. 변수 선언이 실행되면 변수 식별자가 이 자료구조(렉시컬 환경)에 키(key)로 등록되고. 변수 할당이 실행되면 변수 식별자에 해당하는 값을 이 자료구조의 값으로 설정한다. 변수의 검색도 이 자료구조 상에서 이뤄진다.

<details>
<summary>렉시컬 환경(Lexical Environment)</summary>

스코프 체인은 실행 컨텍스트의 렉시컬 환경을 단방향으로 연결(Chaining)한 것이다. 전역 렉시컬 환경은 코드가 로드되면 곧바로 생성되고 함수의 렉시컬 환경은 함수가 호출되면서 곧바로 생성된다.

</details>

### 스코프 체인에 의한 변수/함수 검색

-   상위 스코프에서 유효한 식별자는 하위 스코프에서 자유롭게 참조할 수 있다.
-   반면, 하위 스코프에서 유효한 식별자를 상위 스코프에서 참조할 수는 없다.

```js
// 전역 함수
function foo() {
    console.log("global function foo");
}

function bar() {
    // 중첩 함수
    function foo() {
        console.log("local function foo");
    }
    foo(); // local function foo
}

bar();
```

함수 선언문으로 함수를 정의하면 런타임 이전에 함수 객체가 먼저 생성된다. 그리고 JS엔진은 함수 이름과 동일한 이름의 식별자를 암묵적으로 선언하고 생성된 함수 객체를 할당한다.  
=> 함수도 식별자에 할당되기 때문에 스코프를 갖는다.

<br/>

## 함수 레벨 스코프

코드 블록이 아닌 함수에 의해서만 지역 스코프가 생성된다.  
C나 JAVA같은 대부분의 프로그래밍 언어는 함수 몸체만이 아니라 **모든 코드 블록(if, for, while, try/catch 등)이 지역 스코프를 만든다**. 이러한 특성을 **블록 레벨 스코프(block level scope)** 라 한다.  
하지만 **var 키워드로 선언된 변수는 오로지 함수의 코드 블록(함수 몸체)만을 지역 스코프로 인정**한다. 이를 **함수 레벨 스코프(function level scope)** 라 한다.

```js
// 예시 1
var x = 1;
if (true) {
    // var 키워드로 선언된 변수는 함수의 코드 블록(함수 몸체)만을 지역 스코프로 인정한다.
    // 함수 밖에서 var 키워드로 선언된 변수는 코드 블록 내에서 선언되었다 할지라도 모두 전역 변수다.
    // 따라서 x 변수는 전역 변수다. 이미 선언된 전역 변수 x 가 있으므로 x 변수는 중복 선언된다.
    // 이는 의도치 않게 변수 값이 변경되는 부작용을 발생시킨다.
    var x = 10;
}
console.log(x); // 10

// 예시 2
var i = 10;
// for 문에서 선언한 i는 전역 변수다. 이미 선언된 전역 변수 i가 있으므로 중복 선언된다.
for (var i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4
}
// 의도치 않게 변수의 값이 변경되었다.
console.log(i); // 5
```

es6에 도입된 `let`,`const`는 블록 레벨 스코프를 지원한다.

<br/>

## 렉시컬 스코프

```js
var x = 1;

function foo() {
    var x = 10;
    bar();
}

function bar() {
    console.log(x);
}

foo(); // ? -> 1
bar(); // ? -> 1
```

1. 동적 스코프(dynamic scope): **함수를 어디서 호출**했는지에 따라 함수의 상위 스코프를 결정
2. 렉시컬/정적 스코프(lexical/static scope): **함수를 어디서 정의**했는지에 따라 함수의 상위 스코프를 결정

**JS는 렉시컬 스코프를 따르므로, 함수를 어디서 "정의"했는지에 따라 상위 스코프를 결정한다**. 함수가 호출된 위치는 상위 스코프 결정에 어떠한 영향도 주지 않는다. 즉, 함수의 상위 스코프는 언제나 자신이 정의된 스코프다.

이처럼 함수의 상위 스코프는 함수 정의가 실행될 때 정적으로 결정된다. 함수 정의(함수 선언문 또는 함수 표현식)가 실행되어 생성된 함수 객체는 이렇게 결정된 상위 스코프를 기억한다. 함수가 호출될 때마다 함수의 상위 스코프를 참조할 필요가 있기 때문이다.
