# Chap 19. 프로토타입

JS는 명령형(imperative), 함수형(functional), **프로토타입 기반**(prototype-based) **객체지향 프로그래밍**(Object Oriented Programming)을 지원하는 멀티 패러다임 프로그래밍 언어이다.

<details>
<summary>클래스(class)</summary>

es6에서 클래스가 도입도기는 했지만, 이것이 기존의 프로토타입 기반 개체지향 모델을 폐지하고 새로운 객체지향 모델을 제공하는 것은 아니다.  
사실 클래스도 함수이며, 기존 프로토타입 기반 패턴의 문법적 설탕(suntatic sugar)라고 볼 수 있다.

클래스와 생성자 함수는 모두 프로토타입 기반의 인슽턴스를 생성하지만 정확히 동일하게 동작하지는 않는다. 클래스는 생성자 함수보다 엄격하며 클래스는 생성자 함수에서는 제공하지 않는 기능도 제공한다.

따라서 클래스를 프로토타입 기반 객체 생성 패턴으로 보기보다는 새로운 객체 생성 매커니즘으로 보는 것이 좀 더 합당하다고 할 수 있다.

</details>
<br/>

JS는 객체 기반의 프로그래밍 언어이며 **자바스크립트를 이루고 있는 거의 "모든 것"이 객체**다.  
ex) 원시 타입을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체

<br/>

## 객체지향 프로그래밍

객체 지향 프로그래밍이란 **여러 개의 독립적 단위, 즉 객체(object)의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임**을 말한다.

> 추상화(abstraction)  
> 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것

<br/>

객체지향 프로그래밍은 아래 두 가지를 하나의 논리적인 단위로 묶어 생각한다.

1. 객체의 **상태(state)** 를 나타내는 데이터  
   ==> **프로퍼티(property)**
2. 상태 데이터를 조작할 수 있는 **동작(behavior)**  
   ==> **메서드(method)**

==> 객체: 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조

각 객체는 고유의 기능을 갖는 독립적인 부품으로 볼 수 있지만, 자신의 고유한 기능을 수행하면서 다른 객체와의 관계성을 가질 수 있다. 다른 객체와 메서지를 주고 받거나, 데이터를 처리하거나, 다른 객체의 상태 데이터/동작을 상속받아 사용하기도 한다.

```js
const circle = {
    radius: 5, // 반지름  -- 프로퍼티 (상태 데이터)

    // 원의 지름: 2r ---- 메서드 (동작)
    getDiameter() {
        return 2 * this.radius;
    },

    // 원의 둘레: 2πr
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    },

    // 원의 넓이: πrr
    getArea() {
        return Math.PI * this.radius ** 2;
    },
};

console.log(circle);
// {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}

console.log(circle.getDiameter()); // 10
console.log(circle.getPerimeter()); // 31.41592653589793
console.log(circle.getArea()); // 78.53981633974483
```

<br/>

## 상속과 프로토타입

> 상속 (inheritance)
>
> > 상속은 객체지향 프로그래밍의 핵심 개념으로, **어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것**을 말한다.

JS는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다. (적극적으로 코드 재사용)

```js
// 생성자 함수
function Circle(radius) {
    this.radius = radius;
    this.getArea = function () {
        // Math.PI는 원주율을 나타내는 상수다.
        return Math.PI * this.radius ** 2;
    };
}

// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

**생성자 함수는 동일한 프로퍼티(메서드 포함) 구조를 갖는 객체를 여러 개 생성할 때 유용**하다.  
하지만 위 코드를 살펴보면, `getArea()` 메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용하기 때문에 하나만 생성하여 공유하는게 바람직해보인다.  
=> 동일한 생성자 함수에 의해 생성된 모든 인스턴스가 동일한 메서드를 **중복 소유**하는 것은 **메모리를 불필요하게 낭비**하는 것

![메서드 중복 생성](https://velog.velcdn.com/images%2Fhangem422%2Fpost%2F01c1b954-1fb9-4452-b57a-e51a87533411%2Fjavascript-prototype01.png)

<br/>

상속을 통해 불필요한 중복을 제거할 수 있다.  
+) **JS는 프로토타입을 기반으로 상속을 구현**한다.

```js
// 생성자 함수
function Circle(radius) {
    this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
// 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
// 이 부분이 인스턴스 생성보다 아래에 위치해도 실행에 아무런 문제 X
Circle.prototype.getArea = function () {
    return Math.PI * this.radius ** 2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

![상속에 의한 메서드 공유](https://velog.velcdn.com/images%2Fhangem422%2Fpost%2Fc191b255-fee8-45ee-b079-e95b3985ac4d%2Fjavascript-prototype02.png)

`Circle` 생성자 함수가 생성한 모든 인스턴스(circle1, circle2)는 자신의 프로토타입, 즉 상위 객체 역할을 하는 `Circle.prototype`의 모든 프로퍼티와 메서드를 상속받는다.

`getArea()` 메서드는 단 하나만 생성되어 프로토타입인 `Circle.prototype`의 메서드로 할당되어 있어, `Circle` 생성자 함수로 생성하는 모든 인스턴스는 `getArea()`를 상속받아 사용할 수 있다.  
`Circle`의 인스턴스들은 `radius` 프로퍼티만 개별적으로 소유하면 된다.

=> 상속은 코드의 재사용이라는 관점에서 매우 유용함

<br/>

## 프로토타입 객체 (=== 프로토타입)

프로토타입 객체(줄여서 프로토타입)란 객체지향 프로그래밍의 근간을 이루는 **객체 상속**(inheritance)을 구현하기 위해 사용된다.

-   프로토타입은 어떤 객체의 상위 객체의 역할을 하는 객체로서, 다른 객체에 공유 프로퍼티(메서드 포함)를 제공한다.
-   프로토타입을 상속받은 하위 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있다.

<br/>

-   모든 객체는 `[[Prototype]]`이라는 내부 슬론을 가진다.
-   이 **내부 슬롯의 값은 프로토타입의 참조**(null일 수도 있음)이다.
-   `[[Prototype]]`에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.

=> 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 `[[Prototype]]`에 저장됨

<br/>

-   모든 객체는 하나의 프로토타입을 갖는다.
-   모든 프로토타입은 생성자 함수와 연결되어 있다.

=> 객체와 프로토타입과 생성자 함수는 서로 연결되어 있다.

![객체, 프로토타입, 생성자 함수](https://velog.velcdn.com/images%2Fhangem422%2Fpost%2Fa5a00e50-b7e0-46a9-a49f-0bb0abd3ad34%2Fjavascript-prototype03.png)

<br/>

`[[Prototype]]` 내부 슬롯에는 직접 접근할 수 없지만, `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 자신의 `[[Prototype]]` 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근할 수 있다.  
그리고 프로토타입은 자신의 `constructor` 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 `prototype` 프로퍼티를 통해 프로토타입에 접근할 수 있다.

<br/>

### `__proto__` 접근자 프로퍼티

**모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 `[[Prototype]]` 내부 슬롯에 간접적으로 접근할 수 있다**.

![객체의 프로퍼티](https://velog.velcdn.com/images/dy6578ekdbs/post/cbe2e743-f767-4523-a206-8c1463988a20/image.png)

빨간색으로 표시한 부분이 객체의 프로토타입은 `Object.prototype`이다.  
`__proto__` 접근자 프로퍼티를 통해 객체의 `[[Prototype]]` 내부 슬롯이 가리키는 객체인 Object.prototype에 접근한 결과를 표시한 것.

<br/>

#### `__proto__`는 접근자 프로퍼티다.

내부 슬롯은 프로퍼티가 아니다. 그렇기 때문에 JS는 원칙적으로 내부 슬롯/메서드에 직접 접근하거나 호출할 수 있는 방법을 제공하진 않는다.

하지만 일부 내부 슬롯/메서드에 한해 간접적으로 접근할 수 있는 수단을 제공한다.  
ex) `[[Prototype]]` 내부 슬롯에 간접적으로 접근하는 `__proto__` 접근자 프로퍼티

접근자 프로퍼티는 자체적으로는 값(`[[value]]` 프로퍼티 어트리뷰트)를 갖지 않고 다른 데이터의 값을 읽거나 저장할 때 사용하는 접근자 함수(accessor function), 즉 `[[Get]]`, `[[Set]]` 프로퍼티 어트리뷰트로 구성된 프로퍼티다.

![](https://velog.velcdn.com/images/dy6578ekdbs/post/f9626c5d-f6b2-4451-be95-cc32183b5202/image.png)

`Object.prototype`의 접근자 프로퍼티인 `__proto__` 는 getter/setter 함수라고 부르는 접근자 함수(`[[Get]]`, `[[Set]]` 프로퍼티 어트리뷰트에 할당된 함수)를 통해 `[[Prototype]]` 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다.

```js
const obj = {};
const parent = {x: 1};

// getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
obj.__proto__;
// setter함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); // 1
```

<br/>

#### `__proto__` 접근자 프로퍼티는 상속을 통해 사용된다.

`__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 `Object.prototype`의 프로퍼티이다.  
모든 객체는 "상속"을 통해 `Object.prototype.__proto__`를 사용할 수 있다.

```js
const person = {name: "Lee"};

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty("__proto__")); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true
```

<br/>

#### `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

`[[Prototype]]` 내부 슬롯의 값, 즉 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 **상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해**서다.

```js
const parent = {};
const child = {};

// child의 프로토타입을 parent로 설정
child.__proto__ = parent;
// parent의 프로토타입을 child로 설정
parent.__proto__ = child; // TypeError: Cyclic __proto__ value

//서로가 자신의 프로토타입이 되는 비정상적인 프로토타입의 체인이 만들어지는 것을 방지
```

프로토타입 체인은 **단방향 연결 리스트로 구현**되어야 한다.  
즉, 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 한다. 서로가 자신이 프로토타입이 되는 비정상적인 프로토타입 체인 === 순환참조(circular reference)하는 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 프로토타입 체인에서 **프로퍼티를 검색할 때 무한 루프**에 빠진다.
때문에 아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있다.

<br/>

#### `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.

`__proto__` 접근자 프로퍼티는 es5까지는 비표준이었다.  
하지만 일부 브라우저에서는 지원하고 있어, es6부터 표준으로 채택되었다. (현재는 대부분의 브라우저가 지원)

하지만, 모든 객체가 `__proto__` 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문에 권장이 되지 않는다.  
ex) 직접 상속을 통해 `Object.prototype`을 상속받지 않는 객체를 생성할 수 있다.

```js
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);

// obj는 Object.__proto__를 상속받을 수 없다.
console.log(obj.__proto__); // undefined

// 따라서 __proto__보다 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null
```

따라서 `__proto__` 접근자 프로퍼티 대신 **프로토타입의 참조를 취득하고 싶은 경우에는 `Object.getPrototypeOf` 메서드를 사용**하고, **프로토타입을 교체하고 싶은 경우에는 `Object.setPrototypeOf` 메서드를 사용**하는 것을 권장한다.

\*\*) `Object.getPrototypeOf`는 es5, `Object.setPrototypeOf`는 es6에서 도입됨

```js
const obj = {};
const parent = {x: 1};

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;
// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1
```

<br/>

### 함수 객체의 prototype 프로퍼티

**함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.**

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/27cc1fcc-28fd-4c78-8f7c-e1f0f608d0b3)

`prototype` 프로퍼티는 생성자 함수가 생성할 객체(인스턴스)의 프로토타입을 가리킨다. 따라서 생성자 함수로서 호출할 수 없는 함수. 즉 non-constructor 인 화살표 함수와 ES6 축약 표현으로 정의한 메서드는 `prototype` 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.

```js
// 화살표 함수는 non-constructor다.
const Person = (name) => {
    this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty("prototype")); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); // undefined

// ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
const obj = {
    foo() {},
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty("prototype")); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); // undefined
```

생성자 함수로 호출하기 위해 정의하지 않은 일반 함수(함수 선언문, 함수 표현식)도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 일반 함수의 prototype 프로퍼티는 아무런 의미가 없다.

**모든 객체가 가지고 있는(엄밀히 말하면 `Object.prototype`으로부터 상속받은) `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 `prototype` 프로퍼티는 결국 동일한 프로토타입을 가리키**지만, 이들 프로퍼티를 사용하는 주체가 다르다.

| 구분                        | 소유        | 값                | 사용 주체   | 사용 목적                                                                    |
| --------------------------- | ----------- | ----------------- | ----------- | ---------------------------------------------------------------------------- |
| `__proto__` 접근자 프로퍼티 | 모든 객체   | 프로토타입의 참조 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용                      |
| `prototype` 프로퍼티        | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |

![](https://velog.velcdn.com/images%2Fhangem422%2Fpost%2F5f078b80-9020-4ab4-9b28-42db98383620%2Fjavascript-prototype04.png)

객체의 `__proto__` 접근자 프로퍼티와 함수 객체의 `prototype` 프로퍼티는 결국 동일한 프로토타입을 가진다.

```js
// 생성자 함수
function Person(name) {
    this.name = name;
}

const me = new Person("Lee"); //객체

// 결국 Person.prototype과 me.__proto__는 결국 동일한 프로토타입을 가리킨다.
console.log(Person.prototype === me.__proto__); // true
```

<br/>

### 프로토타입의 contructor 프로퍼티와 생성자 함수

모든 프로토타입은 `constructor` 프로퍼티를 갖는다. **`constructor` 프로퍼티는 `prototype` 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다**. 이 연결은 생성자 함수가 생성될 때 === 함수 객체가 생성될 때 이뤄진다.

```js
// 생성자 함수
function Person(name) {
    this.name = name;
}

const me = new Person("Lee");

// me 객체의 생성자 함수는 Person이다.
console.log(me.constructor === Person); // true
```

me라는 인스턴스를 생성하면 me 객체의 프로토타입의 `constructor` 프로퍼티를 통해 생성자 함수와 연결된다. 따라서 me 객체는 프로토타입인 `Person.prototype`의 `constructor` 프로퍼티 뿐 아니라 `Person.prototype`이 가진 프로퍼티와 메서드를 상속받아 사용할 수 있다.

![](https://velog.velcdn.com/images%2Fsonwj0915%2Fpost%2Ff4d96d62-f481-4ba6-a384-67e65b5997c9%2Fimage.png)

<br/>

## 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

생성자 함수에 의해 생성된 인스턴스는 프로토타입의 `constructor` 프로퍼티에 의해 생성자 함수와 연결된다. 이때 `constructor` 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수다.

하지만 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식도 있다.

```js
// (new 연산자 + 생성자 함수) 방식이 아닌 객체 생성 방식
// 객체 리터럴
const obj = {};

// 함수 리터럴
const add = function (a, b) {
    return a + b;
};

// 배열 리터럴
const arr = [1, 2, 3];

// 정규표현식 리터럴
const regexp = /is/gi; // /is/ig인데 자동완성 때문에 바뀌어 보임
```

리터럴 표기법에 의해 생성된 객체도 물론 프로토타입이 존재하지만,  
리터럴 표기법에 의해 생성딘 객체의 경우 **프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없다**.

```js
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true
```

위 예제의 obj 객체는 객체 리터럴로 생성되었다. 하지만 obj 객체는 Object 생성자 함수와 constructor 프로퍼티로 연결되어 있다.

#### 내부 동작을 살펴보자!

![](https://github.com/helpingstar/Modern-JS/raw/main/images/19-09.png)

2번을 보면 Object 생성자 함수에 인수를 전달하지 않거나, undefined 또는 null을 인수로 전달하면서 호출하면, 내부적으로는 추상 연산 `OrdinaryObjectCreate`를 호출하여 `Object.prototype`을 프로토타입으로 갖는 빈 객체를 생성한다.

```js
// 2. Object 생성자 함수에 의한 객체 생성
// 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다.
let obj = new Object();
console.log(obj); // {}

// 1. new.target이 undefined나 Object가 아닌 경우
// 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
class Foo extends Object {}
new Foo(); // Foo {}

// 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String  객체 생성
obj = new Object("123");
console.log(obj); // String {"123"}
```

객체 리터럴이 평가될 때는 추상 연산 `OrdinaryObjectCreate`를 호출하여 빈 객체를 생성하고 프로퍼티를 추가하도록 정의 되어 있다.

![](https://github.com/helpingstar/Modern-JS/raw/main/images/19-10.png)

이처럼 `Object` 생성자 함수 호출과 객체 리터럴 평가는 추상 연산 `OrdinaryObjectCreate`를 호출하여 빈객체를 생성하는 점에서 동일하나 `new.target`의 확인이나 프로퍼티를 추가하는 처리 등 세부 내용은 다르다. 따라서 객체 리터럴에 의해 생성된 객체는 `Object` 생성자 함수가 생성한 객체가 아니다.

함수 객체의 경우 `Function` 생성자 함수를 호출하여 생성한 함수는 렉시컬 스코프를 만들지 않고 전역 함수인 것처럼 스코프를 생성하여 클로저도 만들지 않는다. 따라서 함수 선언문과 함수 표현식을 평가하여 함수 객체를 생성한 것은 `Function` 생성자 함수가 아니다. 하지만 `constructor` 프로퍼티를 통해 확인해보면 foo 함수의 생성자 함수는 `Function` 생성자 함수다.

```js
// foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.
function foo() {}

// 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수다.
console.log(foo.constructor === Function); // true
```

<br/>

리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. 따라서 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 갖는다. 프로토타입은 생성자 함수와 더불어 생성되며 `prototype`, `constructor` 프로퍼티에 의해 연결되어 있기 때문이다. 다시 말해, 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.

리터럴 표기법에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체는 아니다. 하지만 큰 틀에서 생각해보면 리터럴 표기법으로 생성한 객체도 생성자 함수로 생성한 객체와 본질적인 면에서 큰 차이는 없다.

예를 들어 객체 리터럴에 의해 생성한 객체와 `Object` 생성자 함수에 의해 생성한 객체는 생성 과정에 미묘한 차이는 있지만 결국 객체로서 동일한 특성을 갖는다. 함수 리터럴에 의해 생성한 함수와 `Function` 생성자 함수에 의해 생성한 함수는 생성 과정과 스코프, 클로저 등의 차이가 있지만 결국 함수로서 동일한 특성을 갖는다.

따라서 프로토타입의 `constructor` 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 객체를 생성한 생성자 함수로 생각해도 크게 물니느 없다. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토 타입은 다음과 같다.

| 리터럴 표기법     | 생성자 함수 | 프로토타입           |
| ----------------- | ----------- | -------------------- |
| 객체 리터럴       | `Object`    | `Object.prototype`   |
| 함수 리터럴       | `Function`  | `Function.prototype` |
| 배열 리터럴       | `Array`     | `Array.prototype`    |
| 정규표현식 리터럴 | `RegExp`    | `RegExp.prototype`   |

<br/>

## 프로토타입의 생성 시점

**프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다**.  
=> 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문

생성자 함수는 2가지로 구분된다.

1. 사용자 정의 생성자 함수
2. 빌트인 생성자 함수

### 사용자 정의 생성자 함수와 프로토타입 생성 시점

생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.

```js
//"함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점"에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
    this.name = name;
}
// 함수 선언문은 런타임 이전에 JS엔진에 의해 먼저 실행 : 호이스팅
// 이때 평가돼서 함수 객체가 되므로, 이때 프로토타입도 생성된다.
// 생성된 프로토타입의 프로토타입은 Object.prototype
// 생성된 프로토타입은 Person 생성자 함수의 prototype 프로퍼티에 바인딩 된다.
```

+) 생성자 함수로서 호출할 수 없는 함수인 non-constructor는 프로토타입이 생성되지 않는다.

```js
// 화살표 함수는 non-constructor다.
const Person = (name) => {
    this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); // undefined
```

생성된 프로토타입은 오로지 `constuctor` 프로퍼티만을 갖는 객체다. 프로토타입도 객체이고 모든 객체틑 프로토타입을 가지므로, 프로토타입도 자신의 프로토타입을 갖는다. 생성된 프로토타입의 프로토타입 `Object.prototype`이다.

![](https://user-images.githubusercontent.com/110076475/266784822-2ce251a3-958c-4c3e-a684-f01d4651b210.png)

이처럼 **사용자 정의 생성자 함수**는 자신이 **평가되어 함수 객체로 생성되는 시점에 프로토타입도 더불어 생성**되며, **생성된 프로토타입의 프로토타입은 언제나 `Object.prototype`** 이다.

<br/>

### 빌트인 생성자 함수와 프로토타입 생성 시점

모든 **빌트인 생성자 함수**(`Object, String, Number, Function, Array, RefExp, Date, Promise` 등)는 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다. 즉, **전역 객체가 생성되는 시점에 생성**된다. 생성된 프로토타입은 빌트인 생성자 함수의 `prototype` 프로퍼티에 바인딩된다.

![](https://user-images.githubusercontent.com/110076475/266784940-a119e5ee-7ddd-4249-be0b-a753f209e497.png)

이처럼 **객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재**한다.

이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 `[[Prototype]]` 내부 슬롯에 할당된다. 이로써 생성된 객체는 프로토타입을 상속받는다.

<br/>

## 객체 생성 방식과 프로토타입의 결정

객체 생성 방식은 각각 차이가 있지만, 추상 연산 `OrdinaryObjectCreate`에 의해 생성된다는 공통점이 있다.

추상 연산 `OrdinaryObjectCreate`는 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달받는다. 그리고 자신이 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달할 수 있다.

빈 객체 생성 후, 객체에 추가할 프로퍼티 목록이 인수로 전달된 경우 프로퍼티를 객체에 추가한다. 그리고 인수로 전달받은 프로토타입을 자신이 생성한 객체의 `[[Prototype]]` 내부 슬롯에 할당한 다음, 생성한 객체를 반환한다.

즉, 프로토타입은 추상 연산 `OrdinaryObjectCreate`에 전달되는 인수에 의해 결정된다. 이 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다.

#### 객체 생성 방법들

-   객체 리터럴
-   Object 생성자 함수
-   생성자 함수
-   Object.create 메서드
-   클래스(es6)

<br/>

### 객체 리터럴에 의해 생성된 객테의 프로토타입

```js
const obj = {x: 1};
```

1. 객체 리터럴 평가
2. 추상 연산 `OrdinaryObjectCreate`에 의해 [**`Object` 생성자 함수**]와 [**`Object.prototype`**]과 [**생성된 객체**] 사이에 연결이 만들어진다.
3. 객체 리터럴에 생성된 obj 객체 Object.prototype을 프로토타입으로 갖게되며, Object.prototype을 상속받는다.  
   => obj 객체는 costurctor 프로퍼티와 hasOwnProperty 메서드 등을 소유하지 않지만, 자신의 프로토타입인 Object.prototype의 costurctor 프로퍼티와 hasOwnProperty 메서드를 자신의 것처럼 자유롭게 사용할 수 있다.

![](https://velog.velcdn.com/images/qhahd78/post/94dd4a26-644b-4fe7-aa7a-15e2996c99ff/image.png)

```js
const obj = {x: 1};

// 객체 리터럴에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty("x")); // true
```

<br/>

### Object 생성자 함수에 의해 생성된 객체의 프로토타입

```js
const obj = new Object();
obj.x = 1;
```

1. Object 생성자 함수를 인수 없이 호출하면 빈 객체가 생성됨
2. 추상 연산 `OrdinaryObjectCreate` 호출한다. 이때 전달되는 프로토타입은 Object.prototype이다.(Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 Object.prototype이다.)

추상 연산 `OrdinaryObjectCreate` 의해 [**`Object` 생성자 함수**]와 [**`Object.prototype`**]과 [**생성된 객체**] 사이에 연결이 만들어진다.

\*\*) 객체 리터럴에 의해 생성된 객체와 동일한 구조를 갖는다

#### 객체 리터럴과 Object 생성자 함수에 의한 객체 생성 방식의 차이는 프로퍼티를 추가하는 방식에 있다.

-   객체 리터럴 : 객체 리터럴 내부에 프로퍼티 추가
-   Object 생성자 함수 방식 : 일단 빈 객체 생성 후 프로퍼티 추가

<br/>

### 생성자 함수에 의해 생성된 객체의 프로토타입

1. `new` 연산자와 함께 생성자 함수를 호출
2. 추상 연산 `OrdinaryObjectCreate` 호출한다. 이때, `OrdinaryObjectCreate`에 전달되는 프로토타입은 생성자 함수의 `prototype` 프로퍼티에 바인딩되어 있는 객체다.

\*\*) 생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어있는 객체다.

```js
function Person(name) {
    this.name = name;
}

const me = new Person("Lee");
```

![](https://velog.velcdn.com/images/qhahd78/post/7bb4becb-afc0-4e56-a618-b889e67fea03/image.png)

표준 빌트인 객체인 Object 생성자 함수와 더불어 생성된 프로토타입 `Object.prototype`은 다양한 빌트인 메서드(`hasOwnProperty, propertyIsEnumerable` 등)을 가지고 있다. 하지만 사용자 정의 생성자 함수 Person과 더불어 생성된 프로토타입 `Person.prototype`의 프로퍼티는 `constructor` 뿐이다.

<br/>

프로토타입 `Person.prototype`에 프로퍼티를 추가해 하위(자식) 객체가 상속받을 수 있도록 구현해본다면 아래와 같다.

```js
function Person(name) {
    this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Lee");
const you = new Person("Kim");

me.sayHello(); // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
```

![](https://user-images.githubusercontent.com/110076475/266785956-3c8cc4f0-bbc2-486a-9c7d-89025d4b9a2f.png)

Person 생성자 함수를 통해 생성된 모든 객체는 프로토타입에 추가된 sayHello 메서드를 상속받아 자신의 메서드처럼 사용할 수 있다.

<br/>

## 프로토타입 체인

JS는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `[[Prototype]]`의 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 **프로토타입 체인**이라고 한다. 프로토타입 체인은 JS가 객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.

![](https://velog.velcdn.com/images%2Fsonwj0915%2Fpost%2Fc7c0ba80-3a5b-475f-83d4-eb6f4b64f417%2Fimage.png)

```js
function Person(name) {
    this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Lee");

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty("name")); // true
```

프로토타입의 최상위에 위치하는 객체는 언제나 Object.prototype이다. 때문에 **`Object.prototype`을 프로토타입 체인의 종점(end of prototype chain)**이라고 한다.  
그렇기 때문에 `Object.prototype`의 프로토타입, 즉 `[[Prototype]]` 내부 슬롯의 값은 null이다.

프로토타입 체인의 종점인 Object.prototype에서도 프로퍼티를 검색할 수 없는 경우엔 undefined를 반환한다. (에러를 발생시키진 않는다.)

<br/>

-   프로토타입 체인: 상속과 프로퍼티 검색을 위한 메커니즘
-   스코프 체인: 식별자 검색을 위한 메커니즘

```js
me.hasOwnProperty("name");
```

1. 스코프 체인에서 me 식별자 검색  
   => 전역에서 선언 되었으니, 전역 스코프에서 검색됨
2. 이후 me 객체의 프로토타입에서 hasOwnProperty 메서드 검색

위와 같이, **스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용**된다.

<br/>

## 오버라이딩과 프로퍼티 섀도잉

```js
const Person = (function () {
    // 생성자 함수
    function Person(name) {
        this.name = name;
    }

    // 프로토타입 메서드
    Person.prototype.sayHello = function () {
        console.log(`Hi! My name is ${this.name}`);
    };

    // 생성자 함수를 반환
    return Person;
})();

const me = new Person("Lee"); // 생성자 함수로 객체 생성

// 인스턴스 메서드 추가
me.sayHello = function () {
    console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```

![](https://velog.velcdn.com/images%2Fhangem422%2Fpost%2F681a4c55-88b9-41c1-827b-0dc0d112fc40%2Fjavascript-prototype08.png)

프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 검색하여 프로토타입 프로퍼티를 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 추가한다.

이때 인스턴스 메서드는 프로토타입 메서드를 오버라이딩했고 프로토타입 메서드는 가려진다. 이처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 프로퍼티 섀도잉이라 한다.

> 오버라이딩
>
> > 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식

> 오버로딩
>
> > 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식 JS는 오버로딩을 지원하지 않지만 arguments 객체를 사용해 구현할 수 있다.

<br/>

```js
// 인스턴스 메서드를 삭제한다.
delete me.sayHello;
// 인스턴스에는 sayHello 메서드가 없으므로 프로토타입 메서드가 호출된다.
me.sayHello(); // Hi! My name is Lee

// 프로토타입 체인을 통해 프로토타입 메서드가 "삭제되지 않는다".
delete me.sayHello;
// 프로토타입 메서드가 호출된다.
me.sayHello(); // Hi! My name is Lee
```

하위 객체를 통해 프로토타입에 get 엑세스는 허용이 되나 set 엑세스는 허용이 되지 않는다. 만약 프로토타입 프로퍼티를 변경/삭제하려면 하위 객체를 통해 프로토타입 체인으로 접근하는 것이 아니라 프로토타입에 직접 접근해야 한다.

```js
// 프로토타입 메서드 변경
Person.prototype.sayHello = function () {
    console.log(`Hey! My name is ${this.name}`);
};
me.sayHello(); // Hey! My name is Lee

// 프로토타입 메서드 삭제
delete Person.prototype.sayHello;
me.sayHello(); // TypeError: me.sayHello is not a function
```

<br/>

## 프로토타입의 교체

프로토타입은 임의의 다른 객체로 변경할 수 있다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다. 이러한 특징을 활용하여 **객체 간의 상속 관계를 동적으로 변경할 수 있다.**

1. 생성자 함수에 의한 교체
2. 인스턴스에 의한 교체

### 생성자 함수에 의한 프로토타입의 교체

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/fd8f0dc3-f1d6-4a64-a58e-6782d3d27987)

1에서 `Person.prototype`에 객체 리터럴을 할당함.  
이는 Person 생성자 함수가 생성할 객체의 프로토타입을 객체 리터럴로 교체한 것

![](https://user-images.githubusercontent.com/110076475/266787127-c76374dd-e2c4-46e0-b9cb-296a03330d18.png)

프로토타입으로 교체한 객체 리터럴에는 constructor 프로퍼티가 없다. constructor 프로퍼티는 JS 엔진이 프로토타입을 생성할 때 암묵적으로 추가한 프로퍼티다. 때문에 me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나온다. 프로토타입을 유지하려면 프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하면 된다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/d6cf43ad-d7c6-4154-8afa-427a97861a7f)

<br/>

### 인스턴스에 의한 프로토타입 교체

인스턴스의 `__proto__` 접근자 프로퍼티(또는 `Object.setPrototypeOf` 메서드)를 통해 프로토타입을 교체할 수 있다.

생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩 하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것이다. `__proto__` 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것이다.

```js
function Person(name) {
    this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {
    sayHello() {
        console.log(`Hi! My name is ${this.name}`);
    },
};

// ① me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee
```

1에서 me 객체의 프로토타입을 parent 객체로 교체했다.

![](https://user-images.githubusercontent.com/110076475/266787210-0134f60b-7a0f-418b-860d-d5e6fdfa048e.png)

프로토타입으로 교체한 객체에는 constructor 프로퍼티가 없으므로 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다. 따라서 프로토타입의 constructor 프로퍼티로 me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나온다.

<br/>

1. 생성자 함수에 의한 교체
2. 인스턴스에 의한 교체

위 두가지 방법은 거의 비슷하지만 약간의 차이는 존재한다.

![](https://user-images.githubusercontent.com/52737532/190850069-8dae6351-1171-4a5b-a89e-8d5f6e460a2a.jpeg)

인스턴스에 의한 프로토타입의 교체 방식에서, 파괴된 생성자 함수와 프로토타입 간의 연결을 살리려면 아래와 같이 하면 된다.

```js
unction Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  }
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정 ***************
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
console.log(Person.prototype === Object.getPrototypeOf(me)); // true
```

프로토타입 교체를 통해 객체 간 상속 관계를 동적으로 변경하는 것은 꽤 번거롭기 대문에, 직접 교체하지 않는 것이 좋다.

<br/>

## instaceof 연산자

instanceof 연산자는 이항 연산자로서, 좌변에 객체를 가리는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받는다. 만약 우변의 피연산자가 함수가 아닌 경우 TypeError가 발생한다.

`객체 instanceof 생성자 함수`

**우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true로 평가되고, 그렇지 않은 경우에는 false로 평가된다.**

```js
// 생성자 함수
function Person(name) {
    this.name = name;
}

const me = new Person("Lee");

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

```js
// 프로토타입 교체 후 확인해보기.

// 생성자 함수
function Person(name) {
    this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체 ***************************
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않기 때문에 false로 평가된다.
console.log(me instanceof Person); // false

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

me 객체는 비록 프로토타입이 교체되어 프로토타입과 생성자 함수 간 연결이 파괴되었지만 Person 생성자 함수에 의해 생성된 인스턴스임에는 틀림없다. 하지만 `me instanceof Person` 은 false로 평가된다. 이는 Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않기 때문이다. 때문에 프로토타입으로 교체한 parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩하면 `me instanceof Person`은 true로 평가된다.

<br/>

```js
// 생성자 함수
function Person(name) {
    this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩한다.
Person.prototype = parent; //********************************************

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

이처럼 **`instanceof` 연산자는 생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인**한다. 때문에 constructor 프로퍼티와 생성자 함수간의 연결이 파괴되어도 `instanceof` 연산에는 아무런 영향을 받지 않는다.

![image](https://github.com/dooli1971039/Algorithm/assets/70802352/6d172ddc-5c8d-4efe-addb-2c4abbe22a86)

<br/>

## 직접 상속

### Object.create에 의한 직접 상속

Object.create 메서드는 명시적으로 프로토타입을 지정해 새로운 객체를 생성한다. Object.create 메서드도 다른 객체 생성 방식과 마찬가지로 추상 연산 OrdinaryObjectCreate를 호출한다.

Object.create 메서드

-   첫 번째 매개변수: 생성할 객체의 프로토타입으로 지정할 객체 전달
-   두 번째 매개변수(옵션): 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이뤄진 객제 전달. (이 객체의 형식은 Object.defineProperties 메서드의 두번째 인수와 동일)

```js
// 프로토타입이 null인 객체를 생성한다. 생성된 객체는 프로토타입 체인의 종점에 위치한다.
// obj → null
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true
// Object.prototype을 상속받지 못한다.
console.log(obj.toString()); // TypeError: obj.toString is not a function

// obj → Object.prototype → null
// obj = {};와 동일하다.
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj → Object.prototype → null
// obj = { x: 1 };와 동일하다.
obj = Object.create(Object.prototype, {
    x: {value: 1, writable: true, enumerable: true, configurable: true},
});
// 위 코드는 다음과 동일하다.
// obj = Object.create(Object.prototype);
// obj.x = 1;
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = {x: 10};
// 임의의 객체를 직접 상속받는다.
// obj → myProto → Object.prototype → null
obj = Object.create(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

// 생성자 함수
function Person(name) {
    this.name = name;
}

// obj → Person.prototype → Object.prototype → null
// obj = new Person('Lee')와 동일하다.
obj = Object.create(Person.prototype);
obj.name = "Lee";
console.log(obj.name); // Lee
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
```

#### Object.create에 의한 직접 상속의 장점

-   new 연산자 없이도 객체 생성이 가능하다.
-   프로토타입을 지정하면서 객체를 생성한다.
-   객체 리터럴에 의해 생성된 객체도 상속 가능하다.

<br/>

`Object.create` 메서드를 통해 프로토타입 체인의 종점에 위치하는 객체를 생성할 수 있기 때문에 `Object.prototype`의 빌트인 메서드를 객체가 직접 호출하는 것을 권장하지 않는다. 프로토타입의 체인의 종점에 위치하는 객체는 `Object.prototype`의 빌트인 메서드를 사용할 수 없다.

`Object.prototype`의 빌트인 메서드는 `Object.prototype.hasOwnProperty.call`로 같이 간접적으로 호출하는 것이 좋다.

<br/>

### 객체 리터럴 내부에서 `__proto__`에 의한 직접 상속

Object.create에 의한 직접 상속은 여러 장점이 있으나, 두 번째 인자로 프로퍼티를 정의하는 것은 번거롭다. 객체 생성 후에 추가하는 방법도 있으나, 이 또한 깔끔한 방법은 아니다.

es6에서는 객체 리터럴 내부에서 `__proto__` 접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있다.

```js
const myProto = {x: 10};

// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj = {
    y: 20,
    // 객체를 직접 상속받는다.
    // obj → myProto → Object.prototype → null
    __proto__: myProto,
};
/* 위 코드는 아래와 동일하다.
const obj = Object.create(myProto, {
  y: { value: 20, writable: true, enumerable: true, configurable: true }
});
*/

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```

<br/>

## 정적 프로퍼티/메서드

정적(static) 프로퍼티/메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말한다.

```js
// 생성자 함수
function Person(name) {
    this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
};

// 정적 프로퍼티
Person.staticProp = "static prop";

// 정적 메서드
Person.staticMethod = function () {
    console.log("staticMethod");
};

const me = new Person("Lee");

// 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다.
Person.staticMethod(); // staticMethod

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
me.staticMethod(); // TypeError: me.staticMethod is not a function
```

정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.

![](https://user-images.githubusercontent.com/110076475/266787911-53b0bdc4-33cd-4c2d-a52f-383da89a5866.png)

생성자 함수가 생성한 인스턴스는 자신의 프로토타입 체인에 속한 객체의 프로퍼티/메서드에 접근할 수 있다. 하지만 정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속한 객체의 프로퍼티/메서드가 아니므로 인스턴스로 접근할 수 없다.

> Object.create 메서드는 Object 생성자 함수의 정적 메서드이다.
>
> > Object.create 메서드는 인스턴스로 호출할 수 없다.

> Object.prototype.hasOwnProperty 메서드는 Object.prototype의 메서드이다.
>
> > Object.prototype.hasOwnProperty 메서드는 모든 객체의 프로토타입의 종점, 즉 Object.prototype의 메서드이므로 모든 객체가 호출할 수 있다.

<br/>

인스턴스/프로토타입 메서드 내에서 `this`를 사용하지 않는다면 그 메서드는 정적 메서드로 변경할 수 있다. 인스턴스가 호출한 인스턴스/프로토타입 메서드 내에서 `this`는 인스턴스를 가리킨다. 메서드 내에서 인스턴스를 참조할 필요가 없다면 정적 메서드로 변경하여도 동작한다. 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 하지만 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.

```js
function Foo() {}

// 프로토타입 메서드
// this를 참조하지 않는 프로토타입 메소드는 정적 메서드로 변경해도 동일한 효과를 얻을 수 있다.
Foo.prototype.x = function () {
    console.log("x");
};

const foo = new Foo();
// 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 한다.
foo.x(); // x

// 정적 메서드
Foo.x = function () {
    console.log("x");
};

// 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.
Foo.x(); // x
```

<br/>

## 프로퍼티 존재 확인

### in 연산자

in 연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인한다.

```
/*
* key: 프로퍼티 키를 나타내는 문자열
* object: 객체로 평가되는 표현식
*/
key in object
```

```js
const person = {
    name: "Lee",
    address: "Seoul",
};

// person 객체에 name 프로퍼티가 존재한다.
console.log("name" in person); // true
// person 객체에 address 프로퍼티가 존재한다.
console.log("address" in person); // true
// person 객체에 age 프로퍼티가 존재하지 않는다.
console.log("age" in person); // false
```

in 연산자는 확인 대상 객체의 프로퍼티뿐만 아니라 확인 대상 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인하므로 주의가 필요하다.

```js
console.log("toString" in person); // true

// in 연산자가 person 객체가 속한 프로토타입 체인 상에 존재하는 모든 프로토타입에서 toString 프로퍼티를 검색했기 때문.
// toString은 Object.prototype의 메서드임
```

in 연산자 대신 ES6에서 도입된 `Reflect.has` 메서드를 사용할 수 있다.

```js
const person = {name: "Lee"};

console.log(Reflect.has(person, "name")); // true
console.log(Reflect.has(person, "toString")); // true
```

<br/>

### Object.prototype.hasOwnProperty 메서드

`Object.prototype.hasOwnProperty` 메서드는 마찬가지로 객체에 특정 프로퍼티가 존재하는지를 확인할 수 있다.

-   인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환한다.
-   상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다.

```js
console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("age")); // false
console.log(person.hasOwnProperty("toString")); // false
```

<br/>

## 프로퍼티 열거

### for...in 문

객체의 모든 프로퍼티를 순회하면 열거(enumeration)하려면 for...in 문을 사용한다.

```
for (변수선언문 in 객체) {...}
```

for ... in 문은 in 연산자처럼 순회 대상 객체의 프로퍼티 뿐만 아니라 상속받은 프로토타입의 프로퍼티까지 열거한다.

```js
const person = {
    name: "Lee",
    address: "Seoul",
    __proto__: {age: 20},
};

for (const key in person) {
    console.log(key + ": " + person[key]);
}
// name: Lee
// address: Seoul
// age: 20
```

하지만 toString 메서드는 열거할 수 없도록 정의되어 있는 프로퍼티이기 때문에 열거하지 않는다.  
=> `[[Enumerable]]` 의 값이 false이기 때문

```js
const person = {
    name: "Lee",
    address: "Seoul",
};

// in 연산자는 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다.
console.log("toString" in person); // true

// for...in 문도 객체가 상속받은 모든 프로토타입의 프로퍼티를 열거한다.
// 하지만 toString과 같은 Object.prototype의 프로퍼티가 열거되지 않는다.
// [[Enumerable]] 의 값이 false이기 때문
for (const key in person) {
    // for...in 문의 변수 key에 person 객체의 프로퍼티 키가 할당된다.
    console.log(key + ": " + person[key]);
}

// name: Lee
// address: Seoul
```

**for ... in 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 `[[Enumerable]]`의 값이 true인 프로퍼티를 순회하며 열거**한다.  
또한, 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.

```js
const sym = Symbol();
const obj = {
    a: 1,
    [sym]: 10,
};

for (const key in obj) {
    console.log(key + ": " + obj[key]);
}
// a: 1
```

Object.prototype.hasOwnProperty 메서드를 사용하여 객체 자신의 프로퍼티인지 확인하여 객체 자신의 프로퍼티만 열거할 수 있다.

```js
const person = {
    name: "Lee",
    address: "Seoul",
    __proto__: {age: 20},
};

for (const key in person) {
    // 객체 자신의 프로퍼티인지 확인한다.
    if (!person.hasOwnProperty(key)) continue;
    console.log(key + ": " + person[key]);
}
// name: Lee
// address: Seoul
```

<br/>

for ... in 문은 프로퍼티를 열거할 때 순서를 보장하지 않으므로 주의해야 한다. 하지만 대부분의 모던 브라우저는 순서를 보장하고 숫자(사실은 문자열)인 프로퍼티 키에 대해서는 정렬을 실시한다.

배열에는 일반적인 for 문이나 for ... of 문 또는 Array.prototype.forEach 메서드를 사용하는 것이 좋다.

```js
const arr = [1, 2, 3];
arr.x = 10; // 배열도 객체이므로 프로퍼티를 가질 수 있다.

for (const i in arr) {
    // 프로퍼티 x도 출력된다.
    console.log(arr[i]); // 1 2 3 10
}

// arr.length는 3이다.
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // 1 2 3
}

// forEach 메서드는 요소가 아닌 프로퍼티는 제외한다.
arr.forEach((v) => console.log(v)); // 1 2 3

// for...of는 변수 선언문에서 선언한 변수에 키가 아닌 값을 할당한다.
for (const value of arr) {
    console.log(value); // 1 2 3
}
```

<br/>

### Object.keys/values/entries 메서드

객체 자신의 고유 프로퍼티만 열거하기 위해서는 for ... in 문을 사용하는 것보다 Object.keys/values/entries 메서드를 사용하는 것이 좋다.

```js
const person = {
    name: "Lee",
    address: "Seoul",
    __proto__: {age: 20},
};

console.log(Object.keys(person)); // ["name", "address"]
console.log(Object.values(person)); // ["Lee", "Seoul"]
console.log(Object.entries(person)); // [["name", "Lee"], ["address", "Seoul"]]

Object.entries(person).forEach(([key, value]) => console.log(key, value));
/*
name Lee
address Seoul
*/
```
