# Chap 10. 객체 리터럴

JS는 객체 기반의 프로그래밍 언어이며, JS를 구성하는 거의 모든 것이 객체이다.  
원시 값을 제외한 나머지 값(함수, 배열, 정규 표현식)은 모두 객체다.

## 객체 (object)

|  원시 타입   |                           객체                            |
| :----------: | :-------------------------------------------------------: |
| 단 하나의 값 | 다양한 타입의 값을 하나의 단위로 구성한 복합적인 자료구조 |
|  immutable   |                          mutable                          |

객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 **key와 value로 구성**된다.  
JS에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있다. 함수 또한 프로퍼티 값으로 사용할 수 있으며, **객체 안의 함수**는 일반 함수와 구분을 위해 **method**라 부른다.

-   프로퍼티: 객체의 상태를 나타내는 값(data)
-   메서드: 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작

<br/>

## 객체 리터럴에 의한 객체 생성

클래스 기반 객체지향 언어(C++, JAVA)는 클래스를 사전에 정의하고, 필요한 시점에 `new` 연산자와 함께 생성자를 호출하여 인스턴스를 생성하는 방식으로 객체를 생성한다.  
**JS는 프로토타입 기반 객체지향 언어**로서 다양한 객체 생성 방법을 지원한다.

-   객체 리터럴
-   Object 생성자 함수
-   생성자 함수
-   Object.create 메서드
-   클래스 (es6)

위 방법들 중 가장 일반적이고 간단한 방법은 "객체 리터럴"이다. 객체 리터럴 외의 객체 생성 방식은 모두 함수를 사용해 객체를 생성한다.

> 리터럴(literal): 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용하여 값을 생성하는 표기법

<br/>

### 객체 리터럴

객체 리터럴은 중괄호 `{...}` 내에 0개 이상의 프로퍼티를 정의한다. **변수에 할당되는 시점에 JS엔진은 객체 리터럴을 해석해 객체를 생성**한다. 중괄호 내에 프로퍼티를 정의하지 않으면 빈 객체가 생성된다.

```js
var person = {
    name: "Lee",
    sayHello: function () {
        console.log(`Hello! My name is ${this.name}.`);
    },
};

console.log(typeof person); // object
console.log(person); // {name: "Lee", sayHello: ƒ}

var empty = {}; // 빈 객체 - 0개 이상의 프로퍼티를 가짐
console.log(typeof empty); // object
```

객체 리터럴의 중괄호는 코드 블록을 의미하지 않는다. 코드 블록의 닫는 중괄호 뒤에는 세미콜론이 붙지 않는다. 하지만 객체 리터럴은 값으로 평가되는 표현식이기 때문에 뒤에 세미콜론을 붙여야 한다.

<br/>

## 프로퍼티

객체는 프로퍼티의 집합이며, 프로퍼티는 key와 value으로 구성된다.  
프로퍼티를 나열할 때는 쉼표로 구분한다.

```js
var person = {
    // 프로퍼티 키는 name, 프로퍼티 값은 'Lee'
    name: "Lee",
    // 프로퍼티 키는 age, 프로퍼티 값은 20
    age: 20,
};
```

-   **프로퍼티 키**로 사용 가능한 값: 빈 문자열을 포함하는 모든 문자열 or 심벌 값
-   **프로퍼티 값**으로 사용 가능한 값: JS에서 사용할 수 있는 모든 값

프로퍼티 키는 프로퍼티 값에 접근할 수 있는 이름으로서 식별자 역할을 한다.  
프로퍼티 키가 식별자 네이밍 규칙을 따라야 하는 것은 아니지만, 이 경우 따옴표로 묶어야 한다. (네이밍 규칙을 따를 것을 권장한다.)

```js
var person = {
  firstName: 'Ung-mo', // 식별자 네이밍 규칙을 준수하는 프로퍼티 키
  'last-name': 'Lee'   // 식별자 네이밍 규칙을 준수하지 않는 프로퍼티 키
};
console.log(person); // {firstName: "Ung-mo", last-name: "Lee"}


// JS엔진이 last-name을 - 연산자가 있는 표현식으로 해석한다
var person = {
  firstName: 'Ung-mo',
  last-name: 'Lee' // SyntaxError: Unexpected token -
};
```

<br/>

문자열 또는 문자열로 평가할 수 있는 표현식으로 사용해, **프로퍼티 키를 동적으로 생성**할 수도 있다. 단, 이 경우에는 프로퍼티 키로 사용한 표현식을 **대괄호**로 묶어야 한다.

```js
var obj = {};
var key = "hello";

// ES5: 프로퍼티 키 동적 생성
obj[key] = "world";
// ES6: 계산된 프로퍼티 이름
// var obj = { [key]: 'world' };

console.log(obj); // {hello: "world"}
```

<br/>

빈 문자열이나 예약어를 프로퍼티 키로 사용해도 에러가 발생하지 않는다. 하지만 권장하지는 않는다.

```js
var foo = {
    "": "", // 빈 문자열도 프로퍼티 키로 사용할 수 있다. 그러나 key로서의 의미를 갖지 못하므로 권장 X
};
console.log(foo); // {"": ""}

var foo = {
    var: "", // 예약어를 프로퍼티 키로 사용해도 되지만, 예상치 못한 에러가 발생할 수 있으므로 권장 X
    function: "",
};
console.log(foo); // {var: "", function: ""}
```

<br/>

프로퍼티 key에 문자열이나 심벌 값 이외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다.

```js
// 프로퍼티 키로 숫자 리터럴을 사용하면 따옴표는 붙지 않지만, 내부적으로 문자열로 변환된다.
var foo = {
    0: 1,
    1: 2,
    2: 3,
};
console.log(foo); // {0: 1, 1: 2, 2: 3}
```

<br/>

이미 존재하는 프로퍼티 키를 중복 선언 시, 나중에 선언한 프로퍼티의 값이 적용된다. (이때 에러가 발생하지 X)

```js
var foo = {
    name: "Lee",
    name: "Kim",
};
console.log(foo); // {name: "Kim"}
```

<br/>

## 메서드 (method)

함수는 값으로 취급할 수 있기 때문에 프로퍼티 값으로 사용할 수 있다. 이때 일반함수와 구분하기 위해 method라 부른다.

```js
var circle = {
    radius: 5, // ← 프로퍼티

    // 원의 지름
    getDiameter: function () {
        // ← 메서드
        return 2 * this.radius; // this는 circle을 가리킨다. (객체 자신을 가리킴)
    },
};

console.log(circle.getDiameter()); // 10
```

<br/>

## 프로퍼티 접근

프로퍼티에 접근하는 방법은 **마침표 표기법(dot notation)** 과 **대괄호 표기법(bracket notation)** 이 있다. 프로퍼티 키가 네이밍 규칙을 따른다면 두 방법 모두 사용 가능하나, 그렇지 않다면 대괄호 표기법만 사용할 수 있다.

```js
var person = {
    name: "Lee",
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person["name"]); // Lee

// 대괄호 프로퍼티 접근 연산자 내에 따옴표로 감싸지 않은 이름을 프로퍼티 키로 사용하면 JS엔진은 이를 식별자로 해석한다.
console.log(person[name]); // ReferenceError: name is not defined
```

ReferenceError가 발생한 이유는, 식별자 name을 평가하기 위해 선언된 name을 찾았으나 찾지 못했기 때문이다.

<br/>

객체에 존재하지 않는 프로퍼티에 접근할 경우, undefined가 반환된다.

```js
var person = {
    name: "Lee",
};
console.log(person.age); // undefined
```

<br/>

프로퍼티 키가 네이밍 규칙을 준수하지 않는 이름일 경우 반드시 대괄호 표기법을 사용해야 한다. 단 숫자로 이루어진 문자열인 경우 따옴표를 생략할 수 있다. 이 외의 경우 대괄호 내에 들어가는 프로퍼티 키는 반드시 따옴표료 감싼 문자열이어야 한다.

```js
var person = {
  'last-name': 'Lee',
  1: 10
};

person.'last-name';  // -> SyntaxError: Unexpected string
person.last-name;    // -> 브라우저 환경: NaN
                     // -> Node.js 환경: ReferenceError: name is not defined
person[last-name];   // -> ReferenceError: last is not defined
person['last-name']; // -> Lee

// 프로퍼티 키가 숫자로 이뤄진 문자열인 경우 따옴표를 생략할 수 있다.
person.1;     // -> SyntaxError: Unexpected number
person.'1';   // -> SyntaxError: Unexpected string
person[1];    // -> 10 : person[1] -> person['1']
person['1'];  // -> 10
```

<details>
<summary>Q) person.last-name 의 결과가 왜 다를까? </summary>

1. `person.last-name`을 실행 시, JS엔진은 먼저 `person.last`를 평가한다.
2. person 객체에는 "last"라는 key가 없으므로 `person.last`는 `undefined`이다.
3. `person.last-name`은 `undefined - name`과 같다.
4. JS엔진은 `name`이라는 식별자를 찾는다.

-   Node.js 환경에는 현재 어디에도 `name`이라는 식별자 선언이 없어 `ReferenceError: name is not defined`가 나타난다
-   브라우저 환경에서는 `name`이라는 전역 변수(전역 객체 `window`의 프로퍼티)가 암묵적으로 존재한다. window의 이름을 가리키며, 기본값은 빈 문자열이다. 따라서 `undefined - ''`가 되어 `NaN`이 된다.

</details>

<br/>

## 프로퍼티 값 갱신

존재하는 프로퍼티에 값을 할당하면, 프로퍼티 값이 갱신된다.

```js
var person = {
    name: "Lee",
};

// person 객체에 name 프로퍼티가 존재하므로 name 프로퍼티의 값이 갱신된다.
person.name = "Kim";
console.log(person); // {name: "Kim"}
```

## 프로퍼티 동적 생성

존재하지 않는 프로퍼티에 값을 할당하면, 프로퍼티가 동적으로 생성되어 추가되고, 프로퍼티 값이 할당된다.

```js
var person = {
    name: "Lee",
};

// person 객체에는 age 프로퍼티가 존재하지 않는다.
// 따라서 person 객체에 age 프로퍼티가 동적으로 생성되고 값이 할당된다.
person.age = 20;
console.log(person); // {name: "Lee", age: 20}
```

## 프로퍼티 삭제

`delete` 연산자를 통해 프로퍼티를 삭제할 수 있다.  
존재하지 않은 프로퍼티를 삭제하면 아무런 에러 없이 무시된다.

```js
var person = {
    name: "Lee",
};

// 프로퍼티 동적 생성
person.age = 20;

// person 객체에 age 프로퍼티가 존재한다.
// 따라서 delete 연산자로 age 프로퍼티를 삭제할 수 있다.
delete person.age;

// person 객체에 address 프로퍼티가 존재하지 않는다.
// 따라서 delete 연산자로 address 프로퍼티를 삭제할 수 없다. 이때 에러가 발생하지 않는다.
delete person.address;

console.log(person); // {name: "Lee"}
```

<br/>

## es6에서 추가된 객체 리터럴의 확장 기능

### 프로퍼티 축약 표현

프로퍼티 값으로 변수를 사용하는 경우, 변수 이름과 프로퍼티 키가 동일한 이름이면 **프로퍼티 키를 생략(property shorthand)** 할 수 있다.

```js
let x = 1,
let y = 2;

// es6 이전
var obj = {
    x: x,
    y: y,
};

// 프로퍼티 축약 표현 (es6)
const obj = {x, y};

console.log(obj); // {x: 1, y: 2}
```

<br/>

### 계산된 프로퍼티 이름

문자열 또는 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있다. 단, 대괄호로 묶어야 한다. 이를 계산된 프로퍼티 이름(computed property name)이라 한다.

es5에서 computed property name으로 프로퍼티 키를 동적 생성하려면, 객체 리터럴 외부에서 대괄호 표기법을 사용해야 한다.

```js
// ES5
var prefix = "prop";
var i = 0;

var obj = {};
// 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

es6에서는 객체 리터럴 내부에서도 computed property name으로 프로퍼티 키를 동적 생성할 수 있다.

```js
// ES6
const prefix = "prop";
let i = 0;

// 객체 리터럴 "내부"에서 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
const obj = {
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i,
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

<br/>

### 메서드 축약 표현

es5에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당한다.

```js
// ES5
var obj = {
    name: "Lee",
    sayHi: function () {
        console.log("Hi! " + this.name);
    },
};

obj.sayHi(); // Hi! Lee
```

es6에서는 메서드를 정의할 때 function 키워드를 생략한 축약표현을 사용할 수 있다. 이때 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다.

```js
// ES6
const obj = {
    name: "Lee",
    // 메서드 축약 표현
    sayHi() {
        console.log("Hi! " + this.name);
    },
};

obj.sayHi(); // Hi! Lee
```
