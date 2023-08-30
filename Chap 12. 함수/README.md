# Chap 12. 함수

## 함수란?

**함수**: 일련의 과정을 문(statement)으로 구현하고, 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것

![함수](https://velog.velcdn.com/images%2Fminj9_6%2Fpost%2Fb32dc160-7742-4109-923d-eabd2153fb63%2Fimage.png)

**매개변수(parameter)**: 함수 내부의 입력을 전달받는 변수  
**인수(argument)**: 입력  
**반환값(return value)**: 출력

-   함수는 값이며, 함수를 구별하기 위해 식별자인 함수 이름을 사용할 수 있다
-   함수는 **함수 정의(function definition)**을 통해 생성한다
-   함수는 **함수 호출(fuction call/invoke)**를 통해 사용할 수 있다

```js
// 함수 정의
function add(x, y) {
    return x + y;
}
// 함수 호출
var result = add(2, 5);
// 함수 add에 인수 2, 5를 전달하면서 호출하면 반환값 7을 반환한다.
console.log(result); // 7
```

-   함수는 몇 번이든 호출할 수 있기 때문에 **코드의 재사용** 측면에서 좋다.
-   코드의 중복을 억제하고 재사용성을 높이는 함수는 **유지보수의 편의성**을 높이고, 실수를 줄여 **코드의 신뢰성**을 높인다.
-   함수는 객체 타입의 값으로, 이름(식별자)를 붙일 수 있다.  
    => 함수 내부의 코드를 이해하지 않고도 함수 역할을 파악할 수 있도록 네이밍을 해야 한다. (**코드의 가독성 향상**)

<br/>

## 함수 리터럴

JS의 함수는 객체 타입의 값이다. 따라서 숫자 값을 숫자 리터럴로 생성하고 객체를 객체 리터럴로 생성하는 것처럼, 함수도 함수 리터럴로 생성할 수 있다.  
함수 리터럴은 **function 키워드**, **함수 이름**, **매개 변수 목록**, **함수 몸체**로 구성된다.

```js
// 변수에 함수 리터럴을 할당
var f = function add(x, y) {
    return x + y;
};
```

함수 리터럴의 구성 요소는 아래와 같다.
![함수 리터럴의 구성 요소](https://velog.velcdn.com/images/049494/post/72751e69-b63b-4e3e-b903-a6f47d13e6b4/image.jpg)

함수는 객체이지만 일반 객체와는 다르다. **일반 객체는 호출할 수 없지만 함수는 호출할 수 있다**. 그리고 일반 객체에는 없는 함수 객체만의 고유한 프로퍼티를 갖는다. (함수가 객체라는 사실은 다른 프로그래밍 언어와 구별되는 중요한 특징이다.)

<br/>

## 함수 정의

함수 정의란 함수를 호출하기 이전에 **인수를 전달받을 매개변수**와 **실행 문들**, 그리고 **반환할 값을 지정**하는 것을 말한다. 정의된 함수는 JS엔진에 의해 평가되어 함수 객체가 된다. 아래 4가지 방법으로 함수를 정의할 수 있다.  
![함수 정의](https://velog.velcdn.com/images/049494/post/05e1abfe-cee7-4384-b419-6d27ca23ba39/image.jpg)

> 변수는 "선언(declaration)"이라 하지만, 함수는 "정의(definition)"한다고 한다. 함수 선언문이 평가되면 식별자가 암묵적으로 생성되고 함수 객체가 할당된다.

### 함수 선언문

```js
// 함수 선언문
function add(x, y) {
    return x + y;
}

// 함수 참조
// console.dir은 console.log와는 달리 함수 객체의 프로퍼티까지 출력한다.
// 단, Node.js 환경에서는 console.log와 같은 결과가 출력된다.
console.dir(add); // ƒ add(x, y)

// 함수 호출
console.log(add(2, 5)); // 7
```

함수 선언문은 함수 리터럴과 형태가 동일하다. 하지만, 함수 리터럴을 함수 이름을 생략할 수 있지만, **함수 선언문은 함수 이름을 생략할 수 없다**.

```js
// 함수 선언문은 함수 이름을 생략할 수 없다.
function (x, y) {
  return x + y;
}
// SyntaxError: Function statements require a function name
```

**함수 선언문은 표현식이 아닌 문**이다. 그렇기 때문에 변수에 할당할 수 없다.

```js
// 함수 선언문은 표현식이 아닌 문이므로 변수에 할당할 수 없다.
// 하지만 함수 선언문이 변수에 할당되는 것처럼 보인다.
var add = function add(x, y) {
    return x + y;
};

// 함수 호출
console.log(add(2, 5)); // 7
```

하지만 위 코드에서는 함수 선언문이 변수에 할당되는 것처럼 보인다.  
JS엔진이 코드의 문맥에 따라 동일한 함수 리터럴을 "표현식이 아닌 문인 함수 선언문"으로 해석하는 경우와, "표현식인 문인 함수 리터럴 표현식"으로 해석하는 경우가 있다.  
함수 선언문은 함수 이름을 생략할 수 없다는 점을 제외하면 함수 리터럴과 형태가 동일하다.  
=> 함수 이름이 있는 기명 함수 리터럴은 함수 선언문 또는 함수 리터럴 표현식으로 해석될 가능성이 있다는 의미

<details>
<summary>{}은 블록문일까 객체 리터럴일까?</summary>

`{}`은 중의적 표현이다.  
`{}`과 같은 중의적인 코드는 코드의 문맥에 따라 해석이 달라진다. (by JS엔진)

-   `{}` 단독으로 존재 : 블록문으로 해석
-   `{}`이 값으로 평가되어야 할 문맥(ex. 할당 연산자의 우변)에서 피연산자로 사용 : 객체 리터럴로 해석

</details>

<br/>

기명 함수 리터럴도 중의적인 코드이다.

-   함수 리터럴을 단독으로 사용하면 "함수 선언문"으로 해석
-   함수 리터럴이 값으로 평가되어야 하는 문맥에서는 "함수 리터럴 표현식"으로 해석

어떤 경우든 함수가 생성되는 것은 동일하다. 하지만 함수를 생성하는 내부 동작에는 차이가 있다.

```js
// 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석된다.
// 함수 선언문에서는 함수 이름을 생략할 수 없다.
function foo() {
    console.log("foo");
}
foo(); // foo

// 함수 리터럴을 피연산자로 사용하면 함수 선언문이 아니라 함수 리터럴 표현식으로 해석된다.
// 함수 리터럴에서는 함수 이름을 생략할 수 있다.
(function bar() {
    console.log("bar");
});
bar(); // ReferenceError: bar is not defined
```

그룹 연산자 `()`내에 있는 함수 리터럴(bar)은 함수 선언문으로 해석되지 않고, 함수 리터럴로 해석된다.(그룹 연산자의 피연산자는 값으로 평가될 수 있는 표현식이어야 한다.)

이처럼 **이름이 있는 기명 함수 리터럴**은 코드 문맥에 따라 "함수 선언문" or "함수 리터럴 표현식"으로 해석된다. 두 경우 모두 함수 객체를 생성한다는 점에서는 동일하다. 하지만 호출에서 차이가 발생한다.

> 함수 선언문으로 생성된 foo는 호출 가능  
> 함수 리터럴 표현식으로 생성된 bar는 호출 불가능

#### Q1) 왜 함수 리터럴 표현식으로 생성된 bar는 호출 불가능할까?

A) 함수 이름은 함수 몸체 내에서만 참조할 수 있는 식별자이다.  
이는 함수 몸체 외부에서는 함수 이름으로 함수를 참조할 수 없으며, 함수 몸체 외부에서는 함수 이름으로 함수를 호출할 수 없다는 의미이다.  
=> 즉, 함수를 가리키는 식별자가 없다는 것

#### Q2) 함수 선언문으로 정의된 함수는 foo라는 이름으로 호출이 됐는데?

A) 기본적으로, foo는 함수 몸체 내부에서만 유효한 식별자인 함수 이름이므 foo로 함수를 호출할 수 없어야 한다.  
JS엔진은 함수 선언문을 해석해 함수 객체를 생성한다. 이때 함수 이름은 함수 몸체 내부에서만 유효한 식별자이므로, 함수 이름과는 별도로 생성된 함수 객체를 가리키는 식별자가 필요하다.  
=> JS엔진은 생성된 함수를 호출하기 위해, 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성하고, 거기에 함수 객체를 할당한다.

![함수 선언문1](https://velog.velcdn.com/images/049494/post/de4747da-20a7-49cb-a25a-a02eb7217261/image.jpg)

==> **함수는 함수 이름으로 호출하는 것이 아니라, 함수 객체를 가리키는 식별자로 호출하는 것이다.**

![함수 선언문2](https://velog.velcdn.com/images/049494/post/628ecc8d-7e59-477a-8921-4cb3d5eb5e02/image.jpg)

<br/>

### 함수 표현식

JS에서 함수는 일급 객체이므로, 함수 리터럴로 생성한 객체를 변수에 할당할 수 있다.  
=> 이런 함수 정의 방식을 **함수 표현식(function expression)**이라 한다.

```js
// 함수 표현식
var add = function (x, y) {
    return x + y;
};
console.log(add(2, 5)); // 7
```

함수 리터럴의 함수 이름은 생략할 수 있다. => 익명 함수

<br/>

```js
// 기명 함수 표현식
var add = function foo(x, y) {
    return x + y;
};

// 함수 객체를 가리키는 식별자로 호출
console.log(add(2, 5)); // 7

// 함수 이름으로 호출하면 ReferenceError가 발생한다.
// 함수 이름은 함수 몸체 내부에서만 유효한 식별자다.
console.log(foo(2, 5)); // ReferenceError: foo is not defined
```

함수 선언문에서 살펴본 바와 같이, 함수를 호출할 때는 함수 이름이 아니라 함수 객체를 가리키는 식별자를 사용해야 한다. 함수 이름은 함수 몸체 내부에서만 유효한다.

<br/>

### 함수 생성 시점과 함수 호이스팅

```js
// 함수 참조
console.dir(add); // ƒ add(x, y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function

// 함수 선언문
function add(x, y) {
    return x + y;
}

// 함수 표현식
var sub = function (x, y) {
    return x - y;
};
```

"함수 선언문"으로 정의한 함수와 "함수 표현식"으로 정의한 **함수의 생성 시점이 다르기 때문**에 차이 발생

-   함수 선언문: 런타임 이전에 함수 객체가 먼저 생성되고, JS엔진이 함수 이름과 동일한 이름의 식별자 생성 후 함수 객체 할당 (**함수 호이스팅**)
-   함수 표현식: 변수에 할당되는 값이 함수 리터럴인 문  
    => **변수 선언은 런타임 이전에 되지만, 함수 리터럴은 런타임에 평가되어 함수 객체가 됨**  
    ==> 함수 표현식으로 함수를 정의하면, 함수 호이스팅이 발생하는 것이 아닌 변수 호이스팅이 발생함

<br/>

### Function 생성자 함수

JS가 기본 제공하는 빌트인 함수 `Function` 셍성자 함수에 매개변수 목록과 함수 몸체를 문자열로 전달하면서 `new` 연산자와 함께 호출하면 함수 객체를 생성하여 반환한다. (`new` 연산자 없이 호출해도 결과는 동일)

```js
var add = new Function("x", "y", "return x + y");
console.log(add(2, 5)); // 7
```

그러나 이 방식은 일반적이지 않으며 바람직하지도 않다. `Function` 생성자 함수로 생성한 함수는 closure를 생성하지 않는 등, 함수 선언문, 함수 표현식으로 생성한 함수와 다르게 동작한다.

<br/>

### 화살표 함수

es6에서 도입된 화살표 함수(arrow function)은 `function`키워드 대신 화살표 `=>`를 사용해 좀 더 간략한 방법으로 함수를 선언할 수 있다.  
화살표 함수는 항상 익명 함수로 정의한다.

```js
const add = (x, y) => x + y;
console.log(add(2, 5)); // 7
```

화살표 함수는 기존 함수보다 표현만 간략한 것이 아니라 내부 동작 또한 간략화되어 있다.

-   생성자 함수로 사용할 수 없다.
-   기존 함수와 this 바인딩 방식이 다르다.
-   `prototype` 프로퍼티가 없다.
-   `argument` 객체를 생성하지 ㅇ낳는다.

<br/>

## 함수 호출

### 매개변수와 인수

함수를 실행하기 위해 필요한 값을 함수 외부에서 함수 내부로 전달할 필요가 있는 경우, 매개변수(parameter)를 통해 인수(argument)를 전달한다. 인수는 값으로 평가될 수 있는 표현식이어야 한다.

![매개변수와 인수](https://velog.velcdn.com/images%2Fhang_kem_0531%2Fpost%2Fcce64fd5-0e44-4063-aab3-cc1d60dd567d%2Fimage.png)

매개변수는 함수를 정의할 때 선언하며, 함수 몸체 내부에서 변수와 동일하게 취급된다.

> 함수 호출 -> 함수 몸체 내에서 암묵적으로 매개변수 생성 및 undefined로 초기화 -> 인수가 순서대로 할당

따라서 매개변수의 스코프(유효범위)는 함수 내부이다.

```js
function add(x, y) {
    console.log(x, y); // 2 5
    return x + y;
}

add(2, 5);

// add 함수의 매개변수 x, y는 함수 몸체 내부에서만 참조할 수 있다.
console.log(x, y); // ReferenceError: x is not defined
```

함수는 매개변수의 개수와 인수의 개수가 일치하는지 체크하지 않는다. (에러 발생 X)

```js
function add(x, y) {
    return x + y;
}
console.log(add(2)); // NaN
// 인수가 할당되지 않은 매개변수 y의 값은 undefined

function add(x, y) {
    console.log(arguments);
    // Arguments(3) [2, 5, 10, callee: ƒ, Symbol(Symbol.iterator): ƒ]

    return x + y;
}
console.log(add(2, 5, 10)); // 7
// 초과된 인수는 무시 (arguments 객체의 프로퍼티로 보관되기는 한다.)
```

<br/>

### 인수 확인

```js
function add(x, y) {
    return x + y;
}

console.log(add(2)); // NaN
console.log(add("a", "b")); // 'ab'
```

Q) 왜 위와같은 문제가 발생할까?

1. JS 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.
2. JS는 동적 타입 언어다. 따라서 JS 함수는 매개변수의 타입을 사전에 지정할 수 없다.

```js
// 1번
function add(x, y) {
    if (typeof x != "number" || typeof y != "number") {
        // 매개변수를 통해 전달된 인수의 타입이 부적절한 경우 에러를 발생시킨다.
        throw new TypeError("인수는 모두 숫자 값이어야 합니다.");
    }

    return x + y;
}
console.log(add(2)); // TypeError: 인수는 모두 숫자 값이어야 합니다.
console.log(add("a", "b")); // TypeError: 인수는 모두 숫자 값이어야 합니다.

// 2번 - 단축평가 사용
function add(a, b, c) {
    a = a || 0;
    b = b || 0;
    c = c || 0;
    return a + b + c;
}
console.log(add(1, 2, 3)); // 6
console.log(add(1, 2)); // 3
console.log(add(1)); // 1
console.log(add()); // 0

// 3번 - 매개변수의 기본값 사용(es6)
function add(a = 0, b = 0, c = 0) {
    return a + b + c;
}
console.log(add(1, 2, 3)); // 6
console.log(add(1, 2)); // 3
console.log(add(1)); // 1
console.log(add()); // 0
```

<br/>

### 매개변수의 최대 개수

매개변수는 최대 3개 이상을 넘지 않는 것을 권장한다.  
객체를 인수로 사용하는 경우, 프로퍼티 키만 정확히 지정하면 매개변수의 순서를 신경 쓰지 않아도 된다. 또한 명시적으로 인수의 의미를 설명하는 프로퍼티 키를 사용하게 되므로 코드의 가독성도 좋아지고 실수도 줄어드는 효과가 있다.  
단, 매개변수로 전달한 객체를 함수 내부에서 변경하면 함수 외부의 객체가 변경되는 부수 효과가 발생한다.

```js
$.ajax({
    method: "POST",
    url: "/user",
    data: {id: 1, name: "Lee"},
    cache: false,
});
```

<br/>

### 반환문

함수는 `return` 키워드와 표현식(반환값)으로 이뤄진 반환문을 사용해 실행 결과를 함수 외부로 반환할 수 있다.

```js
function multiply(x, y) {
    return x * y; // 반환문
}

// 함수 호출은 반환값으로 평가된다.
var result = multiply(3, 5); // 함수 호출은 표현식이다.
console.log(result); // 15
```

**[반환문의 역할]**

1. 함수의 실행을 중단하고 함수 몸체를 빠져나간다. (반환문 이후의 문은 실행되지 X)
2. 반환문은 `return`키워드 뒤에 오는 표현식을 평가해 반환한다. (없으면 undefined)  
   (`return`이 아예 없어도 undefined 반환)

```js
function foo() {
    // 반환문을 생략하면 암묵적으로 undefined가 반환된다.
}
console.log(foo()); // undefined

function multiply(x, y) {
    // return 키워드와 반환값 사이에 줄바꿈이 있으면
    return; // 세미콜론 자동 삽입 기능(ASI)에 의해 세미콜론이 추가된다.
    x * y; // 무시된다.
}
console.log(multiply(3, 5)); // undefined
```

반환문은 함수 몸체 내부에서만 사용할 수 있다.  
(Node.js 모듈 시스템에 의해 파일별로 독립적인 파일 스코프를 가져서, 파일의 가장 바깥 영역에서 반환문을 사용해도 에러가 발생하지 않는다)

```html
<!DOCTYPE html>
<html>
    <body>
        <script>
            return; // SyntaxError: Illegal return statement
        </script>
    </body>
</html>
```

<br/>

## 참조에 의한 전달과 외부 상태의 변경

```js
// 매개변수 primitive는 원시 값을 전달받고, 매개변수 obj는 객체를 전달받는다.
function changeVal(primitive, obj) {
    primitive += 100;
    obj.name = "Kim";
}

// 외부 상태
var num = 100;
var person = {name: "Lee"};

console.log(num); // 100
console.log(person); // {name: "Lee"}

// 원시 값은 값 자체가 복사되어 전달되고 객체는 참조 값이 복사되어 전달된다.
changeVal(num, person);

// 원시 값은 원본이 훼손되지 않는다.
console.log(num); // 100

// 객체는 원본이 훼손된다.
console.log(person); // {name: "Kim"}
```

복잡한 코드에서 의도치 않은 객체의 변경을 추적하는 것은 어려운 일이다. 객체의 변경을 추적하려면 옵저버(Observer) 패턴 등을 통해 객체를 참조를 공유하는 모든 이들에게 변경 사실을 통지하고 이에 대처하는 추가 대응이 필요하다.

객체를 불변 객체(immutable object)로 만들어 사용하는 것은 해결 방법 중 하나이다. 깊은 복사(deep copy)를 통해 새로운 객체를 생성하고 재할당을 통해 교체를 하면 된다.

외부 상태를 변경하지 않고 외부 상태에 의존하지도 않는 함수를 순수 함수라 한다. 순수 함수를 통해 부수 효과를 최대한 억제하여 오류를 피하고 프로그램 안전성을 높이려는 프로그램 패러다임을 함수형 프로그래밍이라 한다.

<br/>

## 다양한 함수의 형태

### 즉시 실행 함수

함수 정의와 동시에 즉시 호출되는 함수를 즉시 실행 함수(IIFE, Immediately Invoked Function Expression)라 한다. 즉시 실행 함수는 단 한 번만 호출되며 다시 호출할 수 없다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/c17ca237-5de2-461c-834e-f5033279974d)

기명 즉시 실행 함수도 사용할 수 있으나. 그룹 연산자 내의 기명 함수는 함수 리터럴로 평가되어 함수 이름은 함수 몸체에서만 참조할 수 있는 식별자이므로 즉시 실행 함수를 다시 호출할 수는 없다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/b490109d-d3e1-4d77-92f7-9465f4b5e220)

즉시 실행 함수는 반드시 그룹 연산자 `()`로 감싸야 한다. (아니면 에러 발생)

```js
function () {
    // SyntaxError: Function statements require a function name
}();
```

위 코드는 함수 정의가 함수 선언문의 형식에 맞지 않기 때문에 에러가 발생한다. (함수 이름 X)

```js
function foo() {
    // ...
}(); // SyntaxError: Unexpected token ')'

function foo() {}(); // => function foo() {};();

(); // SyntaxError: Unexpected token ')'
```

위 코드도 에러가 나는데, JS엔진이 암묵적으로 수행하는 세미콜론 자동 삽입 기능에 의해 함수 선언문이 끝나는 위치 (`}` 뒤에) 에 세미콜론이 암묵적으로 추가되기 때문이다.

<br/>

```js
console.log(typeof function foo() {}); // function
console.log(typeof function () {}); // function
```

그룹 연산자의 피연산자는 값으로 평가되므로 기명 또는 무명함수를 그룹 연산자로 감싸면 함수 리터럴로 평가되어 함수 객체가 된다. 이외에도 함수 객체를 생성할 수 있긴 한다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/d4cde75f-e0c3-49ef-9fef-191eded65906)

즉시 실행 함수도 일반 함수처럼 값읋 반환할 수 있고, 인수를 전달할 수도 있다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/8d3560b3-0e13-4567-935d-5e2921540736)

<br/>

### 재귀 함수

함수가 자기 자신을 호출하는 것을 **재귀 호출(recursive call)**이라 한다. **재귀 함수(recursive function)**은 자기 자신을 호출하는 행위, 즉 재귀 호출을 하는 함수를 말한다.

```js
// 팩토리얼(계승)은 1부터 자신까지의 모든 양의 정수의 곱이다.
// n! = 1 * 2 * ... * (n-1) * n
function factorial(n) {
    // 탈출 조건: n이 1 이하일 때 재귀 호출을 멈춘다.
    if (n <= 1) return 1;
    // 함수를 가리키는 식별자로 자기 자신을 재귀 호출
    return n * factorial(n - 1);

    // 함수 이름으로 자기 자신을 재귀 호출할 수도 있다.
    // console.log(factorial === foo); // true
    // return n * foo(n - 1);
}

console.log(factorial(0)); // 0! = 1
console.log(factorial(1)); // 1! = 1
console.log(factorial(2)); // 2! = 2 * 1 = 2
console.log(factorial(3)); // 3! = 3 * 2 * 1 = 6
console.log(factorial(4)); // 4! = 4 * 3 * 2 * 1 = 24
console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120
```

`factorial` 함수 내부에서 자기 자신을 호출할 때 사용한 식별자 `factorial`은 함수 이름이다. 함수 이름은 함수 몸체 내부에서만 유효하다. 따라서 함수 내부에서는 함수 이름을 사용해 자기 자신을 호출할 수 있다.

함수 이름은 물론 함수를 가리키는 식별자로도 자기 자신을 재귀호출 할 수 있다. 단, 함수 외부에서 함수를 호출할 때는 함수 이름이 아닌 함수 객체를 가리키는 식별자로 함수를 호출해야 한다.

재귀 함수는 자신을 무한 재귀 호출하므로, 반드시 **탈출 조건**이 내부에 있어야 한다. 없으면 함수가 무한 호출되어 stack overflow가 발생한다.

<br/>

### 중첩 함수

함수 내부에 정의된 함수를 **중첩 함수(nested function) 또는 내부 함수(inner function)**라 한다. 그리고 중첩 함수를 포함하는 함수는 **외부함수(outer function)**라 부른다.  
중첩 함수는 외부 함수의 내부에서만 호출할 수 있다. 일반적으로 중첩 함수는 자신을 포함하는 외부 함수를 돕는 헬퍼 함수의 역할을 한다.

```js
function outer() {
    var x = 1;

    // 중첩 함수
    function inner() {
        var y = 2;
        // 외부 함수의 변수를 참조할 수 있다.
        console.log(x + y); // 3
    }

    inner();
}

outer();
```

ES6부터 함수의 정의는 문이 위치할 수 있는 문맥이라면 어디든지 가능하다. 함수 선언문의 경우 ES6 이전에는 코드의 최상위 또는 다른 함수 내부에서만 정의할 수 있었으나 ES6에서는 if문이나 for문과 같은 코드 블록 내(바람직하지는 않다)에서도 정의할 수 있다.

<br/>

### 콜백 함수

"함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수"를 **콜백 함수(callback function)** 라 한다.  
"매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수"를 **고차 함수(Higher-Order Function)** 라 한다.

콜백 함수는 함수 외부에서 고차 함수 내부로 주입하기 때문에 자유롭게 교체할 수 있는 장점이 있다. 즉, **고차 함수는 콜백 함수를 자신의 일부분으로 합성**한다.  
**고차 함수는 매개변수를 통해 전달받은 콜백 함수의 호출 시점을 결정해서 호출**한다. 다시 말해, **콜백 함수는 고차 함수에 의해 호출되며 이때 고차 함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다**.

```js
// 외부에서 전달받은 f를 n만큼 반복 호출한다.
function repeat(n, f) {
    for (var i = 0; i < n; i++) {
        f(i); // i를 전달하면서 f를 호출
    }
}

var logAll = function (i) {
    console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logAll); // 0 1 2 3 4

var logOdds = function (i) {
    if (i % 2) console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logOdds); // 1 3
```

<br/>

```js
// 익명 함수 리터럴은 콜백 함수로 고차 함수에 전달한다.
// 익명 함수 리터럴은 repeat 함수를 호출할 때마다 평가되어 함수 객체를 생성한다.
repeat(5, function (i) {
    if (i % 2) console.log(i);
}); // 1 3
```

콜백 함수로서 전달된 함수 리터럴은 고차 함수가 호출될 때마다 평가되어 함수 객체를 생성한다. 따라서 콜백 함수를 다른 곳에서도 호풀할 필요가 있거나, 콜백함수를 전달받는 함수가 자주 호출된다면 함수 외부에서 콜백함수를 정의한 후에 함수 참조를 고차 함수에 전달하는 편이 효율적이다.

```js
// logOdds 함수는 단 한 번만 생성된다.
var logOdds = function (i) {
    if (i % 2) console.log(i);
};

// 고차 함수에 함수 참조를 전달한다.
repeat(5, logOdds); // 1 3
```

콜백 함수는 함수형 프로그래밍 패러다임뿐만 아니라 비동기 처리(이벤트 처리, Ajax 통신, 타이머 함수 등)에 활용되는 중요한 패턴이다. 더불어 배열 고차 함수에서도 사용된다.

```js
// 콜백 함수를 사용한 이벤트 처리
// myButton 버튼을 클릭하면 콜백 함수를 실행한다.
document.getElementById("myButton").addEventListener("click", function () {
    console.log("button clicked!");
});

// 콜백 함수를 사용한 비동기 처리
// 1초 후에 메시지를 출력한다.
setTimeout(function () {
    console.log("1초 경과");
}, 1000);

// 콜백 함수를 사용하는 고차 함수 map
var res = [1, 2, 3].map(function (item) {
    return item * 2;
});

console.log(res); // [2, 4, 6]

// 콜백 함수를 사용하는 고차 함수 filter
res = [1, 2, 3].filter(function (item) {
    return item % 2;
});

console.log(res); // [1, 3]

// 콜백 함수를 사용하는 고차 함수 reduce
res = [1, 2, 3].reduce(function (acc, cur) {
    return acc + cur;
}, 0);

console.log(res); // 6
```

<br/>

### 순수 함수와 비순수 함수

-   **순수 함수** : 어떤 외부 상태에 의존하지도 않고 변경하지도 않는, 즉 부수 효과가 없는 함수

    -   동일한 인수가 전달되면 언제나 동일한 값을 반환하는 함수
    -   오직 매개변수를 통해 함수 내부로 전달된 인수에게만 의존해 반환값을 만듬

    ```js
    var count = 0; // 현재 카운트를 나타내는 상태

    // 순수 함수 increase는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다.
    function increase(n) {
        return ++n;
    }

    // 순수 함수가 반환한 결과값을 변수에 재할당해서 상태를 변경
    count = increase(count);
    console.log(count); // 1

    count = increase(count);
    console.log(count); // 2
    ```

-   **비순수 함수** : 외부 상태에 의존하거나 외부 상태를 변경하는, 즉 부수 효과가 있는 함수

    -   외부 상태에 따라 반환 값이 달라짐
    -   매개변수를 통해 "객체"를 전달받으면 비순수 함수가 된다.

    ```js
    var count = 0; // 현재 카운트를 나타내는 상태: increase 함수에 의해 변화한다.

    // 비순수 함수
    function increase() {
        return ++count; // 외부 상태에 의존하며 외부 상태를 변경한다.
    }

    // 비순수 함수는 외부 상태(count)를 변경하므로 상태 변화를 추적하기 어려워진다.
    increase();
    console.log(count); // 1

    increase();
    console.log(count); // 2
    ```

함수형 프로그래밍은 순수 함수와 보조 함수의 조합을 통해, 외부 상태를 변경하는 부수 효과를 최소화해서 불변성(immutability)를 지향하는 프로그래밍 패러다임이다.
