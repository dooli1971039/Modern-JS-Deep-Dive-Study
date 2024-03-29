# Chap 16. 프로퍼티 어트리뷰트

## 내부 슬롯과 내부 메서드

내부 슬롯과 내부 메서드는 JS 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 pseudo 프로퍼티와 메서드이다. ECMAScript 사양에 등장하는 이중 대괄호 `[[...]]`로 감싼 이름들이 내부 슬롯과 내부 메서드다.

내부 슬롯과 내부 메서드는 JS 엔진에서 실제로 동작 하지만, 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로퍼티는 아니다. 즉, 기본적으로는 직접 접근하거나 호출하는 것이 불가능하다. (일부 내부 슬롯과 내부 메서드에 한해 간접적으로 접근할 수 있는 수단을 제공하기는 한다.)

```js
const o = {};

// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근할 수 없다.
o.[[Prototype]] // -> Uncaught SyntaxError: Unexpected token '['
// 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
o.__proto__ // -> Object.prototype
```

<br/>

## 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

**자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.**

프로퍼티 상태에는 아래의 요소들이 있다.

-   프로퍼티의 값(value)
-   값의 갱신 가능 여부(writable)
-   열거 가능 여부(enumerable)
-   재정의 가능 여부(configurable)

프로퍼티 어트리뷰트는 JS 엔진이 관리하는 내부 상태 값(meta-property)인 내부 슬롯 `[[Value]]`, `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]`이다. 따라서 직접 접근할 수는 없지만, `Object.getOwnPropertyDescriptor` 메서드를 사용하여 간접적으로 확인할 수는 있다.

### Object.getOwnPropertyDescriptor 메서드

하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환한다.

1. 호출
    - 첫 번째 매개변수 : 객체의 참조
    - 두 번째 매개변수 : 프로퍼티 키를 문자열로 전달
2. 반환
    - 프로퍼티 어트리뷰트 정보를 제공하는 **프로퍼티 디스크립터(PropertyDescriptor) 객체**
    - 만약 존재하지 않는 프로퍼티나, 상속받은 프로퍼티에 대한 프로퍼티 디스크립터를 요구하면 `undefined` 반환

ES8에 도입된 `Object.getOwnPropertyDescriptors` 메서드는 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.

```js
const person = {
    name: "Lee",
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(person, "name"));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
```

```js
const person = {
    name: "Lee",
};

// 프로퍼티 동적 생성
person.age = 20;

// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: true},
  age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/
```

<br/>

## 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있다.

-   데이터 프로퍼티(data property)

    -   키와 값으로 구성된 일반적인 프로퍼티
    -   위에서 본 모든 프로퍼티는 데이터 프로퍼티이다.

-   접근자 프로퍼티(accessor property)
    -   자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수(accessor function)로 구성된 프로퍼티다.

### 데이터 프로퍼티

데이터 프로퍼티는 다음과 같은 프로퍼티 어트리뷰트를 갖는다. 이 프로퍼티 어트리뷰트는 JS엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의된다.

![데이터 프로퍼티](https://velog.velcdn.com/images/seonguul_2/post/ccf62ddb-ebe0-4a29-b95d-d9d21d82c71c/image.png)

<br/>

### 접근자 프로퍼티

접근자 프로퍼티는 자체적으로는 값을 갖지 않고, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티다.

![image](https://github.com/dooli1971039/Modern-JS-Deep-Dive-Study/assets/70802352/e14e92db-1aa8-4d0c-9ed1-6546d62c2ea0)

접근자 함수는 getter/setter 함수라고도 부른다. 접근자 프로퍼티는 getter와 setter 함수를 모두 정의할 수도 있고 하나만 정의할 수도 있다.

```js
const person = {
    // 데이터 프로퍼티
    firstName: "Ungmo",
    lastName: "Lee",

    // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
    // getter 함수
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    // setter 함수
    set fullName(name) {
        // 배열 디스트럭처링 할당: " "을 기준으로 분해하여 firstName, lastName 프로퍼티에 할당한다.
        [this.firstName, this.lastName] = name.split(" ");
    },
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + " " + person.lastName); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장.
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = "Heegun Lee";
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조.
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // Heegun Lee

// fistName은 데이터 프로퍼티다.
// 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor);
// {value: "Heegun", writable: true, enumerable: true, configurable: true}

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
descriptor = Object.getOwnPropertyDescriptor(person, "fullName");
console.log(descriptor);
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```

내부 슬롯/메서드 관점에서 보면, 접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면 내부적으로 `[[Get]]` 내부 메서드가 호출되어 아래와 같이 동작한다.

1. 프로퍼티 키가 유효한지 확인한다. 프로퍼티 키는 문자열 또는 심벌이어야 한다. 프로퍼티 "fullName"은 문자열이므로 유효한 프로퍼티 키다.
2. 프로토타입 체인에서 프로퍼티를 검색한다. person 객체에 fullName 프로퍼티가 존재한다.
3. 검색된 fullName 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다. fullName 프로퍼티는 접근자 프로퍼티다.
4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter 함수를 호출하여 그 결과를 반환한다. 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값은 `Object.getOwnPropertyDescriptor` 메서드가 반환하는 프로퍼티 디스크립터 객체의 get 프로퍼티와 같다.

<details>
<summary>프로토타입(prototype)</summary>

어떤 객체의 상위(부모) 객체의 역할을 하는 객체다. 프로토타입은 하위(자식) 객체에게 자신의 프로퍼티와 메서드를 상속한다.
프로토타입 객체의 프로퍼티나 메소드를 상속받은 하위 객체는 자신의 프로퍼티 또는 메서드인 것 처럼 자유롭게 사용할 수 있다.  
프로토타입 체인은 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조를 말한다. 객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 프로토타입 체인을 따라 프로토타입의 프로퍼티나 메서드를 차례대로 검색한다.

</details>

<br/>

접근자 프로퍼티와 데이터 프로퍼티를 구별하는 법은 다음과 같다. `Object.getOwnPropertyDescriptor` 메서드가 반환한 프로퍼티 디스크립터 객체에 차이가 있다.

```js
// 일반 객체의 __proto__는 접근자 프로퍼티다.
Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티다.
Object.getOwnPropertyDescriptor(function () {}, "prototype");
// {value: {…}, writable: true, enumerable: false, configurable: false}
```

<br/>

## 프로퍼티 정의

프로퍼티 정의란 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것을 말한다. (ex. 프로퍼티 값을 갱신 가능하게 하거나, 열거가 가능하게 하거나 재정의 가능하도록 하거나)  
`Object.defineProperty` 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다. 인수로는 **객체의 참조**와 **데이터 프로퍼티의 키**인 문자열, **프로퍼티 디스크립터 객체**를 전달한다.

```js
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, "firstName", {
    value: "Ungmo",
    writable: true,
    enumerable: true,
    configurable: true,
});

Object.defineProperty(person, "lastName", {
    value: "Lee",
});

let descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log("firstName", descriptor);
// firstName {value: "Ungmo", writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
descriptor = Object.getOwnPropertyDescriptor(person, "lastName");
console.log("lastName", descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}

// [[Enumerable]]의 값이 false인 경우
// 해당 프로퍼티는 for...in 문이나 Object.keys 등으로 열거할 수 없다.
// lastName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열거되지 않는다.
console.log(Object.keys(person)); // ["firstName"]

// [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다.
// lastName 프로퍼티는 [[Writable]]의 값이 false이므로 값을 변경할 수 없다.
// 이때 값을 변경하면 "에러는 발생하지 않고 무시"된다.
person.lastName = "Kim";

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 삭제할 수 없다.
// lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 삭제할 수 없다.
// 이때 프로퍼티를 삭제하면 "에러는 발생하지 않고 무시"된다.
delete person.lastName;

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 재정의할 수 없다.
// Object.defineProperty(person, 'lastName', { enumerable: true });
// Uncaught TypeError: Cannot redefine property: lastName

descriptor = Object.getOwnPropertyDescriptor(person, "lastName");
console.log("lastName", descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}

// 접근자 프로퍼티 정의
Object.defineProperty(person, "fullName", {
    // getter 함수
    get() {
        return `${this.firstName} ${this.lastName}`;
    },
    // setter 함수
    set(name) {
        [this.firstName, this.lastName] = name.split(" ");
    },
    enumerable: true,
    configurable: true,
});

descriptor = Object.getOwnPropertyDescriptor(person, "fullName");
console.log("fullName", descriptor);
// fullName {get: ƒ, set: ƒ, enumerable: true, configurable: true}

person.fullName = "Heegun Lee";
console.log(person); // {firstName: "Heegun", lastName: "Lee"}
```

`Object.defineProperty` 메서드로 프로퍼티를 정의할 때 프로퍼티 디스크립터 객체의 프로퍼티를 일부 생략할 수 있다. 프로퍼티 디스크립터 객체에서 생략된 어트리뷰트는 아래와 같이 기본값이 적용된다.  
![프로퍼티 기본값](https://velog.velcdn.com/images/seonguul_2/post/f054bfc0-5434-4207-aa44-8afa424b5da9/image.png)

`Object.defineProperties` 메서드를 사용하면 여러 개의 프로퍼티를 한 번에 정의할 수 있다.

```js
const person = {};

Object.defineProperties(person, {
    // 데이터 프로퍼티 정의
    firstName: {
        value: "Ungmo",
        writable: true,
        enumerable: true,
        configurable: true,
    },
    lastName: {
        value: "Lee",
        writable: true,
        enumerable: true,
        configurable: true,
    },
    // 접근자 프로퍼티 정의
    fullName: {
        // getter 함수
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        // setter 함수
        set(name) {
            [this.firstName, this.lastName] = name.split(" ");
        },
        enumerable: true,
        configurable: true,
    },
});

person.fullName = "Heegun Lee";
console.log(person); // {firstName: "Heegun", lastName: "Lee"}
```

<br/>

## 객체 변경 방지

객체는 재할당 없이 직접 변경할 수 있다. 즉, 프로퍼티를 추가하거나 삭제할 수 있고, 프로퍼티 값을 갱신할 수 있으며, `Object.defineProperty` 또는 `Object.defineProperties` 메서드를 사용하여 프로퍼티 어트리뷰트를 재정의할 수도 있다.

JS는 객체의 변경을 방지하는 다양한 메서드를 제공한다. 객체 변경 방지 메서드들은 객체의 변경을 금지하는 강도가 다르다.

![객체 변경 방지](https://velog.velcdn.com/images/seonguul_2/post/5fb094a9-392d-4da1-9ff7-808c5338e9d4/image.png)

### 객체 확장 금지

Object.preventExtensions 메서드는 객체의 확장을 금지한다. **확장이 금지된 객체는 프로퍼티 추가가 금지된다**(삭제는 가능). 프로퍼티는 **프로퍼티 동적 추가**와 **`Object.defineProperty` 메서드**로 추가할 수 있는데 **이 두 방법이 모두 금지**된다.  
확장이 가능한 객체인지 여부는 `Object.isExtensible` 메서드로 확인할 수 있다.

```js
const person = {name: "Lee"};

// person 객체는 확장이 금지된 객체가 아니다.
console.log(Object.isExtensible(person)); // true

// person 객체의 확장을 금지하여 프로퍼티 추가를 금지한다.
Object.preventExtensions(person);

// person 객체는 확장이 금지된 객체다.
console.log(Object.isExtensible(person)); // false

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 추가는 금지되지만 삭제는 가능하다.
delete person.name;
console.log(person); // {}

// 프로퍼티 정의에 의한 프로퍼티 추가도 금지된다.
Object.defineProperty(person, "age", {value: 20});
// TypeError: Cannot define property age, object is not extensible
```

<br/>

### 객체 밀봉

`Object.seal` 메서드는 객체를 밀봉한다. 밀봉된 객체는 **읽기와 쓰기만 가능**하며, **프로퍼티 추가 및 삭제, 프로퍼티 어트리뷰트 재정의 금지를 의미**한다.  
밀봉된 객체인지 여부는 `Object.isSealed` 메서드로 확인할 수 있다.  
밀봉된 객체는 configurable이 false다.

```js
const person = {name: "Lee"};

// person 객체는 밀봉(seal)된 객체가 아니다.
console.log(Object.isSealed(person)); // false

// person 객체를 밀봉(seal)하여 프로퍼티 추가, 삭제, 재정의를 금지한다.
Object.seal(person);

// person 객체는 밀봉(seal)된 객체다.
console.log(Object.isSealed(person)); // true

// 밀봉(seal)된 객체는 configurable이 false다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: false},
}
*/

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 삭제가 금지된다.
delete person.name; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 값 갱신은 가능하다.
person.name = "Kim";
console.log(person); // {name: "Kim"}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, "name", {configurable: true});
// TypeError: Cannot redefine property: name
```

<br/>

### 객체 동결

`Object.freeze` 메서드는 객체를 동결한다. 동결된 객체는 **읽기만 가능**하며, **프로퍼티 추가 및 삭제, 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지를 의미**한다.

동결 객체 여부는 `Object.isFrozen` 메서드로 확인할 수 있다.  
동결된 객체는 writable과 configurable이 false다.

```js
const person = {name: "Lee"};

// person 객체는 동결(freeze)된 객체가 아니다.
console.log(Object.isFrozen(person)); // false

// person 객체를 동결(freeze)하여 프로퍼티 추가, 삭제, 재정의, 쓰기를 금지한다.
Object.freeze(person);

// person 객체는 동결(freeze)된 객체다.
console.log(Object.isFrozen(person)); // true

// 동결(freeze)된 객체는 writable과 configurable이 false다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: false, enumerable: true, configurable: false},
}
*/

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 삭제가 금지된다.
delete person.name; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 값 갱신이 금지된다.
person.name = "Kim"; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, "name", {configurable: true});
// TypeError: Cannot redefine property: name
```

<br/>

### 불변 객체

지금까지 살펴본 변경 방지 메서드들은 얕은 변경 방지(shallow only)로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지는 못한다. 따라서 **`Object.freeze` 메서드로 객체를 동결하여도 중첩 객체까지 동결할 수는 없다**.

```js
const person = {
    name: "Lee",
    address: {city: "Seoul"},
};

// 얕은 객체 동결
Object.freeze(person);

// 직속 프로퍼티만 동결한다.
console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결하지 못한다.
console.log(Object.isFrozen(person.address)); // false

person.address.city = "Busan";
console.log(person); // { name: 'Lee', address: { city: 'Busan' } }
```

객체의 중첩 객체까지 동결하여, 변경이 불가능한 읽기 전용의 불변 객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 `Object.freeze` 메서드를 호출해야 한다.

```js
function deepFreeze(target) {
    // 객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체만 동결한다.
    if (target && typeof target === "object" && !Object.isFrozen(target)) {
        Object.freeze(target);
        /*
            모든 프로퍼티를 순회하며 재귀적으로 동결한다.
            Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환한다.
            forEach 메서드는 배열을 순회하며 배열의 각 요소에 대하여 콜백 함수를 실행한다.
        */
        Object.keys(target).forEach((key) => deepFreeze(target[key]));
    }
    return target;
}

const person = {
    name: "Lee",
    address: {city: "Seoul"},
};

// 깊은 객체 동결
deepFreeze(person);

console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결한다.
console.log(Object.isFrozen(person.address)); // true

person.address.city = "Busan";
console.log(person); // { name: 'Lee', address: { city: 'Seoul' } }
```
