# Chap 18. 함수와 일급 객체

## 일급 객체

아래 조건을 만족하는 객체를 **일급 객체**라고 한다.

1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

\*\*) JS의 함수는 일급 객체이다.

```js
// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
    return ++num;
};

const decrease = function (num) {
    return --num;
};

// 2. 함수는 객체에 저장할 수 있다.
const auxs = {increase, decrease};

// 3. 함수의 매개변수에게 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(aux) {
    let num = 0;

    return function () {
        num = aux(num);
        return num;
    };
}

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(auxs.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미다. 객체는 값이므로 함수는 값과 동일하게 취급할 수 있다.  
=> 함수는 값을 사용할 수 있는 곳(변수 할당문, 객체의 프로퍼티 값, 배열의 요소, 함수 호출의 인수, 함수 반환문)이라면 어디서든지 리터럴로 정의할 수 있으며 runtime에 함수 객체로 평가된다.  
-> 함수는 객체이지만 일반 객체와는 달리 호출할 수 있다. 또한 일반 객체에는 없는 함수 고유의 프로퍼티를 소유한다.

<br/>

## 함수 객체의 프로퍼티

함수가 객체이기 때문에 프로퍼티를 가진다.

```js
function square(number) {
    return number * number;
}

console.dir(square);
```

![함수 객체의 프로퍼티](https://velog.velcdn.com/images%2Fken1204%2Fpost%2Fbe7ba03c-0cd2-49bd-b0bd-0c0cb90520f0%2Fimage.png)

```js
//square()의 모든 property attribure를 Object.getOwnPropertyDescriptors() 로 확인해보자
console.log(Object.getOwnPropertyDescriptors(square));
/*
{
  length: {value: 1, writable: false, enumerable: false, configurable: true},
  name: {value: "square", writable: false, enumerable: false, configurable: true},
  arguments: {value: null, writable: false, enumerable: false, configurable: false},
  caller: {value: null, writable: false, enumerable: false, configurable: false},
  prototype: {value: {...}, writable: true, enumerable: false, configurable: false}
}
*/

// __proto__는 square 함수의 프로퍼티가 아니다.
console.log(Object.getOwnPropertyDescriptor(square, "__proto__")); // undefined

// __proto__는 Object.prototype 객체의 접근자 프로퍼티다.
// square 함수는 Object.prototype 객체로부터 __proto__ 접근자 프로퍼티를 상속받는다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```

이처럼 `arguments`, `caller`, `length`, `name`, `prototype` 프로퍼티는 모두 함수 객체의 데이터 프로퍼티다.이들은 일반 객체에는 없는 함수 객체 고유의 프로퍼티다.  
하지만 `__proto__`는 접근자 프로퍼티이며, 함수 객체 고유 프로퍼티가 아니라 `Object.prototype` 객체의 프로퍼티를 상속받은 것을 알 수 있다. `Object.prototype` 객체의 프로퍼티는 모든 객체가 상속받아 사용할 수 있기 때문에, `__proto__` 접근자 프로퍼티는 모든 객체가 사용할 수 있다.

### arguments 프로퍼티

-   함수 객체의 `arguments` 프로퍼티 값은 `arguments` 객체다.
-   `arguments` 객체는 함수 호출 시 전달된 인수(parameter)들의 정보를 담고 있는 순회 가능한(iterable) 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용된다. (함수 외부에선 사용 X)

```js
function multiply(x, y) {
    console.log(arguments);
    return x * y;
}

console.log(multiply()); // NaN
console.log(multiply(1)); // NaN
console.log(multiply(1, 2)); // 2
console.log(multiply(1, 2, 3)); // 2
// JS는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.
// 덜 넣으면 undefined가 들어가고, 더 넣으면 그냥 에러 없이 잘 동작한다.
// 인자로 넘긴 인수들은 arguments에 저장된다.
```

![arguments 객체의 프로퍼티](https://velog.velcdn.com/images/myday0827/post/b3231af1-e62e-49bb-b471-438f5f7867fa/image.png)

-   `arguments` 객체는 인수를 프로퍼티 값으로 소유하며, 프로퍼티 키는 인수의 순서를 나타낸다.
-   `arguments` 객체의 callee 프로퍼티는 호출되어 `arguments` 객체를 생성한 함수(함수 자신)을 가리킨다.
-   `arguments` 객체의 length 프로퍼티는 인수의 개수를 가리킨다.

JS는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않는다. 덜 넣으면 undefined가 들어가고, 더 넣으면 그냥 에러 없이 잘 동작한다. 인자로 넘긴 인수들은 arguments에 저장된다.  
=> `arguments` 객체는 매개변수 개수를 확정할 수 없는 **가변 인자 함수**를 구현할 때 유용하다.

```js
function sum() {
    let res = 0;
    // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 순회 가능
    for (let i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }
    return res;
}

console.log(sum()); // 0
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
```

-   `arguments` 객체는 배열 형태로 인자 정보를 담고 있지만, 실제 배열이 아닌 유사 배열 객체(array-like object)이다.
    -   유사 배열 객체: `length` 프로퍼티를 가진 객체로 for문으로 순회할 수 있는 객체
    -   유사 배열 객체는 배열이 아니므로, 배열 메서드를 사용할 경우 에러가 발생함. 사용하려면 `Function.prototype.call`, `Function.prototype.apply`를 사용해 간접 호출해야 한다.  
        이런 번거로움을 해결하기 위해 es6에서 `Rest 파라미터`를 도입했다.
-   `arguments`는 이터러블이기도 하다. (es6 이터러블 도입)

```js
function sum() {
    // arguments 객체를 배열로 변환
    const array = Array.prototype.slice.call(arguments);
    return array.reduce(function (pre, cur) {
        return pre + cur;
    }, 0);
}

console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

```js
// ES6 Rest parameter
function sum(...args) {
    return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

<br/>

### caller 프로퍼티

-   함수 객체의 `caller` 프로퍼티는 함수 자신을 호출한 함수를 가리킨다.
-   `caller` 프로퍼티는 ECMAScript 사양에 포함되지 않은 비표준 프로퍼티이다. (이후 표준화될 예정도 X)

```js
function foo(func) {
    return func();
}

function bar() {
    return "caller : " + bar.caller;
}

// 브라우저에서의 실행한 결과 (Node.js로 실행하면 결과가 다르게 나옴)
console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar()); // caller : null
```

(Node.js로 실행한 결과)
![image](https://github.com/dooli1971039/Algorithm/assets/70802352/ae37ca8d-79ed-4399-a3fb-680bbda5bfaa)

<br/>

### length 프로퍼티

-   함수 객체의 `length` 프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.
-   `arguments` 객체의 `length` 프로퍼티는 인자의 개수를 가리킨다.
-   함수 객체의 `length` 프로퍼티는 매개변수의 개수를 가리킨다.

==> `arguments` 객체의 `length` 프로퍼티와 함수 객체의 `length` 프로퍼티가 다를 수 있다.

```js
function foo() {}
console.log(foo.length); // 0

function bar(x) {
    return x;
}
console.log(bar.length); // 1

function baz(x, y) {
    return x * y;
}
console.log(baz.length); // 2
```

<br/>

### name 프로퍼티

-   함수 객체의 `name` 프로퍼티는 함수 이름을 나타낸다.
-   es6에서 정식 표준이 되었으며, es5와 es6의 동작이 다르다.  
    `name`프로퍼티가 익명 함수 표현식의 경우, es5에서는 빈 문자열이지만, es6에서는 함수 객체를 가리키는 식별자를 값으로 갖는다.

```js
// 기명 함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 익명 함수 표현식
var anonymousFunc = function () {};
// ES5: name 프로퍼티는 빈 문자열을 값으로 갖는다.
// ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문(Function declaration)
function bar() {}
console.log(bar.name); // bar
```

<br/>

### proto 접근자 프로퍼티

-   모든 객체는 `[[Prototype]]` 이라는 내부 슬롯을 갖는데, 이는 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다.
-   `__proto__` 프로퍼티는 `[[Prototype]]` 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티다. 내부 슬롯에 직접 접근할 수 없고, 간접적인 접근 방법을 제공하는 경우에 한해 접근할 수 있다.

```js
const obj = {a: 1};

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
// hasOwnProperty 메서드는 Object.prototype의 메서드다.
console.log(obj.hasOwnProperty("a")); // true
console.log(obj.hasOwnProperty("__proto__")); // false
```

<details>
<summary>hasOwnProperty 메서드</summary>

`hasOwnProperty` 메서드는 인수로 전달받은 프로퍼티 키가 **객체 고유의 프로퍼티 키인 경우에만 true를 반환**하고 **상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환**한다.

</details>
<br/>

### prototype 프로퍼티

-   생성자 함수로 호출할 수 있는 함수 객체로, `constructor` 만이 소유하는 프로퍼티다.
-   `non-constructor`에는 prototype 프로퍼티가 없다.

```js
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty("prototype"); // -> true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty("prototype"); // -> false
```

prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.
