# Chap 20. strict mode

## strict mode란?

strict mode는 **JS 언어의 문법을 좀 더 엄격히 적용**하여 오류를 발생시킬 가능성이 높거나 JS 엔진이 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.

-   암묵적 전역
-   변수, 함수, 매개변수의 삭제
-   매개변수 이름의 중복
-   with 문의 사용

strict mode는 es5부터 추가된 문법이며, es6에서 도입된 클래스와 모듈은 기본적으로 strict mode가 적용된다.

```js
function foo() {
    x = 10;
}
foo();

console.log(x); // ?
```

위 코드는 `ReferenceError`를 발생시킬 것 같지만 strict mode가 아니라면 에러가 발생하지 않는다.  
JS엔진이 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성하기 떄문이다. 이때 전역 객체의 x 프로퍼티는 마치 전역 변수 처럼 사용할 수 있다  
==> **암묵적 전역(implicit global)** 이라 한다.

<br/>

## strict mode의 적용

전역 or 함수 몸체의 선두에 `'use strict';`를 추가하면 strict mode를 적용할 수 있다.

```js
"use strict";

function foo() {
    x = 10; // ReferenceError: x is not defined
}
foo();
```

```js
function foo() {
    "use strict";

    x = 10; // ReferenceError: x is not defined
}
foo();
```

<br/>

하지만 선두에 위치시키지 않으면 strict mode가 제대로 작동하지 않는다.

```js
function foo() {
    x = 10; // 에러를 발생시키지 않는다.
    ("use strict");
}
foo();
```

<br/>

## 전역에 strict mode를 적용하는 것은 피하자

전역에 적용한 strict mode는 스크립트 단위로 적용된다.  
strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다. 특히 외부 서드파티 라이브러리를 사용하는 경우에 라이브러리가 non-strict일 수도 있다. 그렇기 때문에 전역 strict mode를 사용하는 것은 바람직하지 않다. 이러한 경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수 선두에 strict mode를 적용한다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/86480f4a-14a7-449f-8d7a-85c98f942a5c)

<br/>

## 함수 단위로 strict mode를 적용하는 것도 피하자

어떤 함수는 strict mode를 적용하고, 어떤 것을 적용하지 않는 것은 바람직하지 않다. 그렇다고 모든 함수에 일일이 strict mode를 적용하는 번거로운 일이다. 또한 strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제가 발생할 수 있다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/40d27aa7-035b-4089-9327-edeccc969f23)

따라서 **strict mode는 즉시 실행함수로 감싼 스크립트 단위로 적용하는 것이 바람직**하다.

<br/>

## strict mode가 발생시키는 에러

### 암묵적 전역

선언하지 않은 변수를 참조하면 `ReferenceError`가 발생한다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/10996b74-4864-4044-9678-f1b10594df0b)

<br/>

### 변수, 함수, 매개변수의 삭제

`delete` 연산자로 변수, 함수, 매개변수를 삭제하면 `SyntaxError`가 발생한다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/bab97c83-8eb9-460f-93c0-9ef9ad13c873)

<br/>

### 매개변수 이름의 중복

중복된 매개변수 이름을 사용하면 `SyntaxError`가 발생한다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/50cb3be7-5467-4bef-a487-259fc0b3b4f2)

<br/>

### with 문의 사용

`with` 문을 사용하면 `SyntexError`가 발생한다.  
`with` 문은 전달된 객체를 스코프 체인에 추가한다. `with` 문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지는 문제가 있다. 따라서 `with` 문은 사용하지 않는 것이 좋다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/246c5cf0-4cd7-48d0-b890-af8fa5b8f2f5)

<br/>

## strict mode 적용에 의한 변화

### 일반 함수의 this

strict mode에서 함수를 일반 함수로서 호출하면 this에 **undefined**가 바인딩된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 이때 에러는 발생하지 않는다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/98200450-1e20-4586-b0ea-6b6771222009)

<br/>

### arguments 객체

strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/d002f2d1-b5f3-4173-bffe-de4c6b548c07)
