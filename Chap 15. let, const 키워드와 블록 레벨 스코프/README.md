# Chap 15. let, const 키워드와 블록 레벨 스코프

## var 키워드로 선언한 변수의 문제점

### 변수의 중복 선언 허용

`var` 키워드로 선언한 변수는 중복 선언이 가능하다.  
이때 나중에 중복 선언한 문에서 초기화문이 있으면 해당 값이 적용되고, 초기화문이 없으면 해당 문은 무시된다.

```js
var x = 1;
var y = 1;

// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var x = 100;
// 초기화문이 없는 변수 선언문은 무시된다.
var y; // <------- 무시

console.log(x); // 100
console.log(y); // 1
```

위와 같이 동일한 이름의 변수가 이미 선언되어 있는 것을 모르고 변수를 중복 선언하면서 값까지 할당했다면 의도치 않게 먼저 선언된 변수 값이 변경되는 부작용이 발생한다.

<br/>

### 함수 레벨 스코프

`var` 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다. 따라서 함수 외부에서 `var` 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다.

```js
var x = 1;
if (true) {
    // x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
    // 이는 의도치 않게 변수값이 변경되는 부작용을 발생시킨다.
    var x = 10;
}
console.log(x); // 10

var i = 10;
// for문에서 선언한 i는 전역 변수이다. 이미 선언된 전역 변수 i가 있으므로 중복 선언된다.
for (var i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4
}
// 의도치 않게 i 변수의 값이 변경되었다.
console.log(i); // 5
```

<br/>

### 변수 호이스팅

`var` 키워드로 변수를 선언하면 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다. 즉, 변수 호이스팅에 의해 변수 선언문 이전에 참조할 수 있다. (단, undefined를 반환한다)

```js
// 이 시점에는 변수 호이스팅에 의해 이미 foo 변수가 선언되었다(1. 선언 단계)
// 변수 foo는 undefined로 초기화된다. (2. 초기화 단계)
console.log(foo); // undefined
// 변수에 값을 할당(3. 할당 단계)
foo = 123;
console.log(foo); // 123
// 변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행된다.
var foo;
```

변수 선언문 이전에 변수를 참조하는 것은 변수 호이스팅에 의해 에러를 발생시키지는 않으나, 프로그램의 흐름상 맞지 않을뿐더러 가독성을 떨어뜨리고 오류를 발생시킬 여지를 남긴다.

<br/>

## let 키워드

es6에서 도입된 변수 선언 키워드이다.

### 변수 중복 선언 금지

`let` 키워드로 이름이 같은 변수를 중복 선언하면 문법 에러(SyntaxError)가 발생한다.

```js
var foo = 123;
// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var foo = 456;

let bar = 123;
// let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```

<br/>

### 블록 레벨 스코프

`let` 키워드로 선언한 변수는 **모든 코드 블록(함수, if, for, while, try/catch)을 지역 스코프로 인정**하는 블록 레벨 스코프를 따른다.

```js
let foo = 1; // 전역 변수

{
    let foo = 2; // 지역 변수
    let bar = 3; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

![블록 레벨 스코프의 중첩](https://velog.velcdn.com/images/ssomcandy777/post/8c94e56f-0a65-4ac5-a58a-1acb487c0ed2/image.PNG)

<br/>

### 변수 호이스팅

`var` 키워드로 선언한 변수와 달리 `let` 키워드로 선언한 변수는 **변수 호이스팅이 발생하지 않는 것처럼 동작**한다.

`let` 키워드로 선언한 변수는 **"선언 단계"와 "초기화 단계"가 분리되어 진행**된다. 즉, 런타임 이전에 **자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도착했을 때 실행**된다. (`var` 키워드로 선언한 변수는 런타임 이전에 선언+초기화 단계가 모두 실행된다.)

```js
// let
console.log(foo); // ReferenceError: foo is not defined
let foo;

// var
// var 키워드로 선언한 변수는 "런타임 이전"에 "선언 단계와 초기화 단계가 실행"된다.
// 따라서 변수 선언문 이전에 변수를 참조할 수 있다.
console.log(foo); // undefined
var foo;
console.log(foo); // undefined
foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```

초기화 단계가 실행되기 이전에 변수에 접근하려고 하면 참조 에러(ReferenceError)가 발생한다.

`let` 키워드로 선언한 변수는 스코프의 시작 지점부터 초기화 단계 시작 지점(변수 선언문)까지 변수를 참조할 수 없다. 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간을 **일시적 사각지대(Temporal Dead Zone)** 이라 부른다.

```js
// 런타임 이전에 선언 단계가 실행된다. 아직 변수가 초기화되지 않았다.
// 초기화 이전의 일시적 사각지대에서는 변수를 참조할 수 없다.
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```

![var, let 키워드로 선언한 변수의 생명 주기](https://user-images.githubusercontent.com/31315644/66705397-0dc2ed80-ed61-11e9-82c6-5fcb855d192a.png)

이렇게만 보면 `let` 변수는 호이스팅이 안 일어나는 것 같지만, `let` 변수도 호이스팅이 있다.

```js
let foo = 1; // 전역 변수
{
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
    let foo = 2; // 지역 변수
}
```

`let` 키워드로 선언한 변수의 경우 변수 호이스팅이 발생하지 않는다면 위 예제는 전역 변수 foo 의 값을 출력해야 한다. 하지만 `let` 키워드로 선언한 변수도 여전히 호이스팅이 발생하기 때문에 참조 에러(ReferenceError)가 발생한다.

**JS는 모든 선언을 호이스팅한다**. 단, es6에서 도입된 let, const, class를 사용한 선언문이 호이스팅이 안 일어난 것처럼 동작할 뿐이다.

<br/>

### 전역 객체와 let

`var` 키워드로 선언한 전역 변수와 전역 함수, 그리고 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역 객체 `windows`의 프로퍼티가 된다. 전역 객체의 프로퍼티를 참조할 때 `windows`를 생략할 수 있다.

```js
// 이 예제는 브라우저 환경에서 실행해야 한다.
// 전역 변수
var x = 1;
// 암묵적 전역
y = 2;
// 전역 함수
function foo() {}

// var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티다.
console.log(window.x); // 1
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(x); // 1

// 암묵적 전역은 전역 객체 window의 프로퍼티다.
console.log(window.y); // 2
console.log(y); // 2

// 함수 선언문으로 정의한 전역 함수는 전역 객체 window의 프로퍼티다.
console.log(window.foo); // ƒ foo() {}
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(foo); // ƒ foo() {}
```

`let` 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 즉 `windows.foo` 같은 방식으로 접근할 수 없다.

`let` 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드)내에 존재하게 된다.

```js
// 이 예제는 브라우저 환경에서 실행해야 한다.
let x = 1;

// let, const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다.
console.log(window.x); // undefined
console.log(x); // 1
```

<br/>

## const 키워드

es6에 생긴 도입된 키워드로, 상수(constant)를 선언하기 위해 사용된다. (하지만 반드시 상수만을 위해 사용하는 것은 아님)  
대체적으로 `let`과 동일하다

### 선언과 초기화

**`const` 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다.**

```js
const foo = 1; // <--- ok
```

```js
const foo; // SyntaxError: Missing initializer in const declaration
```

`const` 키워드로 선언한 변수 또한 블록 레벨 스코프를 가지며, 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

```js
{
    // 변수 호이스팅이 발생하지 않는 것처럼 동작한다
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
    const foo = 1;
    console.log(foo); // 1
}

// 블록 레벨 스코프를 갖는다.
console.log(foo); // ReferenceError: foo is not defined
```

<br/>

### 재할당 금지

`var`, `let` 키워드로 선언한 변수는 재할당이 자유롭지만, **`const` 키워드로 선언한 변수는 재할당이 금지**된다.

```js
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable.
```

### 상수

**상수: 재할당이 금지된 변수**  
`const` 키워드로 선언한 변수에 원시 값을 할당한 경우 변수 값을 변경할 수 없다. 원시 값은 변경 불가능한 값(immutable value)이므로 재할당 없이 값을 변경할 수 있는 방법이 없으며, `const` 키워드로 선언된 변수는 재할당이 불가능하기 때문이다.

```js
// 세율을 의미하는 0.1은 변경할 수 없는 상수로서 사용될 값이다.
// 변수 이름을 대문자로 선언해 상수임을 명확히 나타낸다.
const TAX_RATE = 0.1;
// 세전 가격
let preTaxPrice = 100;
// 세후 가격
let afterTaxPrice = preTaxPrice + preTaxPrice * TAX_RATE;
console.log(afterTaxPrice); // 110
```

<br/>

### const 키워드와 객체

const 키워드로 선언된 변수에 객체를 할당한 경우 값을 변경할 수 있다. 객체는 변경 가능한 값이기 때문에 재할당 없이도 직접 변경이 가능하기 때문이다.

```js
const person = {
    name: "Lee",
};

// 객체는 변경 가능한 값이다. 따라서 재할당 없이 변경이 가능하다.
person.name = "Kim";
console.log(person); // {name: "Kim"}
```

**const 키워드는 재할당을 금지할 뿐 "불변"을 의미하지는 않는다.**  
새로운 값을 재할당하는 것은 불가능하지만, 프로퍼티 동적 생성, 삭제, 프로퍼티 값의 변경을 통해 객체를 변경하는 것은 가능하다. 이때 객체가 변경되더라도 변수에 할당된 참조 값은 변경되지 않는다.

<br/>

## var vs. let vs. const

변수 선언에는 기본적으로 `const`를 사용하고, `let`은 재할당이 필요한 경우에 한정해 사용하는 것이 좋다.  
`const` 키워드를 사용하면 의도치 않은 재할등을 방지하기 때문에 좀 더 안전하다.

-   es6를 사용한다면 `var` 키워드는 사용하지 않는다.
-   재할당이 필요한 경우에 한정해 `let` 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
-   변경이 발생하지 않고 읽기 전용으로 사용하는(재할당이 필요 없는 상수) 원시 값과 객체에는 `const` 키워드를 사용한다. `const` 키워드는 재할당을 금지하므로 `var`, `let` 키워드보다 안전하다.
