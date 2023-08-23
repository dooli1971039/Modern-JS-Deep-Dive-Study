# Chap 06. 데이터 타입

data type은 "값의 종류"를 말한다.  
JS의 모든 값은 데이터 타입을 가지고, ES6에서는 7개의 데이터 타입을 제공한다.  
7개의 데이터 타입은 원시 타입(primitive type)과 객체 타입(object/reference type)으로 분류할 수 있다.

![image](https://github.com/dooli1971039/Modern-JS-Deep-Dive-Study/assets/70802352/f1b61d28-074c-45ee-88a1-d6b2db2c9acf)

-   원시 타입(primitive): 한 번에 **한 개의 값**만 가질 수 있다.
-   비원시 타입(non-primitive): 한 번에 **여러 개의 값**을 가질 수 있다.

<br/>

## 숫자 타입 : number

JS는 다른 언어들과 달리 **정수와 실수를 구분하지 않고**, 모두 number 타입이다.  
(C나 Java에서는 int, float, double 등 다양한 숫자 타입을 제공함)

```js
// 모두 숫자 타입이다.
var integer = 10; // 정수
var double = 10.12; // 실수
var negative = -20; // 음의 정수

/* JS는 2진수, 8진수, 16진수를 표현하기 위한 데이터 타입을 제공하지 않기 때문에
 * 아래 변수들을 참조하면 모두 10진수로 해석된다.
 */
var binary = 0b01000001; // 2진수
var octal = 0o101; // 8진수
var hex = 0x41; // 16진수

// 표기법만 다를 뿐 모두 같은 값이다.
console.log(binary); // 65
console.log(octal); // 65
console.log(hex); // 65
console.log(binary === octal); // true
console.log(octal === hex); // true
```

number type의 값은 배정밀도 64비트 부동소수점 형식을 따른다.  
 => **모든 수(정수, 실수, 2진수, 8진수, 16진수 리터럴)를 실수로 처리**함

```js
// 숫자 타입은 모두 실수로 처리된다.
console.log(1 === 1.0); // true
console.log(4 / 2); // 2
console.log(3 / 2); // 1.5
```

숫자 타입에는 `Infinity`, `-Infinity`, `NaN` 이라는 값도 존재한다.

```js
// 숫자 타입의 세 가지 특별한 값
console.log(10 / 0); // Infinity
console.log(10 / -0); // -Infinity
console.log(1 * "String"); // NaN : Not a Number (산술 연산 불가)

// 자바스크립트는 대소문자를 구별한다.
var x = nan; // ReferenceError: nan is not defined
```

<details>
<summary>NaN</summary>

NaN은 수학 연산에서 유효하지 않은 값을 반환할 때 사용된다.  
NaN과 <, >, <=, >= 과 같은 비교 연산을 수행하면 그 결과는 항상 `false`이다.  
해당 값이 NaN인지 확인하려면 `isNaN()`을 사용해야 한다.

```js
console.log(typeof NaN); // number
console.log(NaN === NaN); // false
console.log(NaN == NaN); // false
console.log(isNaN(NaN)); // true
```

</details>

<br/>

## 문자열 타입 : string

텍스트 데이터를 나타낼 때 사용하는 자료형으로, 문자열은 16비트 유니코드 문자(UTF-16)로 구성된다.  
작은 따옴표, 큰 따옴표, 백틱으로 텍스트를 감싸서 나타낼 수 있다.

```js
// 문자열 타입
var string;
string = "문자열"; // 작은따옴표
string = "문자열"; // 큰따옴표
string = `문자열`; // 백틱 (ES6)

string = '작은따옴표로 감싼 문자열 내의 "큰따옴표"는 문자열로 인식된다.';
string = "큰따옴표로 감싼 문자열 내의 '작은따옴표'는 문자열로 인식된다.";
```

<br/>

### 템플릿 리터럴

es6에 추가된 문법으로, **멀티라인 문자열**, **표현식 삽입**, **태그드 템플릿** 기능이 제공된다.  
템플릿 리터럴은 런타인에 일반 문자열로 변환되어 처리되며, 반드시 **백틱**을 사용해야 한다.

1.  **Multi-line String**  
    백틱을 사용하여 문자열 내에서 줄바꿈, 탭 등의 공백을 추가할 수 있다.

    ```js
    var str = 'Hello
    world.';
    // SyntaxError: Invalid or unexpected token
    // 일반 문자열에서 줄바꿈을 하려면 이스케이프 시퀀스를 사용해야 한다. (\로 시작)

    var newStr = `Hello
    world.`;
    ```

2.  **Expression Interpolation**  
    `${}`로 표현식을 감싸, 문자열에 표현식을 삽입할 수 있다.  
    es6 이전까지는 + 연산자를 사용하여 문자열을 연결할 수 있었다.

    ```js
    var first = "Ung-mo";
    var last = "Lee";

    // ES5: 문자열 연결
    console.log("My name is " + first + " " + last + "."); // My name is Ung-mo Lee.

    // ES6: 표현식 삽입
    console.log(`My name is ${first} ${last}.`); // My name is Ung-mo Lee.
    ```

3.  **Tagged Template**  
    template literal이 더욱 발전된 형태로, 태그를 사용하면 템플릿 리터럴을 함수로 파싱할 수 있다.
    Tagged Template은 styled-component를 사용해보았다면 눈에 익은 문법이다.

    ```js
    const person = "Mike";
    const age = 28;

    function myTag(strings, personExp, ageExp) {
        const str0 = strings[0]; // "That "
        const str1 = strings[1]; // " is a "
        const str2 = strings[2]; // "."

        const ageStr = ageExp > 99 ? "centenarian" : "youngster";

        // We can even return a string built using a template literal
        return `${str0}${personExp}${str1}${ageStr}${str2}`;
    }

    const output = myTag`That ${person} is a ${age}.`; // <----- 이 부분 주목!!

    console.log(output);
    // That Mike is a youngster.
    ```

    myTag의 첫 번째 인자는 표현식을 제외한 스트링 값의 배열, 그 뒤의 인자들은 표현식들이 쓰인 만큼 나열된다.  
    [참고 링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)

<br/>

## boolean 타입

boolean 타입에는 `true` / `false` 두 가지 값만 존재한다.

```js
console.log(typeof true); //boolean
console.log(typeof false); //boolean
```

<br/>

## undefined 타입

undefined 타입의 값은 `undefined`가 유일하다.  
변수 선언 후, 변수에는 암묵적으로 undefined가 할당 된다. 이는 쓰레기 값을 참조하지 못하게 하기 위함이다. 개발자가 의도적으로 할당한 값이 아니기 때문에, 변수에 undefined를 넣는 행위는 본래의 취지와 어긋나게 된다.

```js
var undefinedVariable;
console.log(typeof undefinedVariable); // undefined
```

<br/>

## null 타입

변수에 값이 없음을 명시적으로 나타내고 싶을 때 `null`을 사용한다.  
JS는 대소문자를 구분하기 때문에 Null, NULL이라고 쓰면 안 된다.

```js
var nullVariable = null;
console.log(typeof nullVariable); // object
```

undefined의 타입이 undefined인 것과 다르게, null의 타입은 object이다.  
그 이유는 초기 JS에서 null이 object로 구현되었었기 때문이다. 하위 호환성을 위해 고쳐지지 않았다. 특정 값이 null인지를 확인하고 싶다면 === 연산자를 사용하면 된다.

```js
null === undefined; // false
null == undefined; // true
null === null; // true
null == null; // true
!null; // true
isNaN(1 + null); // false
isNaN(1 + undefined); // true
```

<br/>

## symbol 타입

symbol 값은 다른 값과 중복되지 않는 유일무이한 값이다.  
다른 원시 타입은 리터럴을 통해 생성하지만, symbol타입은 Symbol() 함수를 통해 생성한다.  
es6에서 새로 추가되었으며, 변경 불가능한 원시 타입의 값이다.

```js
// 심벌 값 생성
var key = Symbol("key");
console.log(typeof key); // symbol

// 객체 생성
var obj = {};

// 이름이 충돌할 위험이 없는 유일무이한 값인 심벌을 프로퍼티 키로 사용한다.
obj[key] = "value";
console.log(obj[key]); // value
console.log(obj); // { [Symbol(key)]: 'value' }
```

<br/>

## 객체 타입

원시 타입을 제외한 나머지 타입으로, Non-primitive 타입으로도 불린다.  
객체 타입에는 **배열, 객체, 함수 등**이 포함된다.

```js
console.log(typeof []); //object
console.log(typeof {}); //object
```

<br/>

## 데이터 타입의 필요성

### 1. 값을 저장할 때 확보해야 하는 메모리 공간의 크기를 결정하기 위해

값을 메모리에 저장할 하려면, 메모리 공간을 확보하는 것이 선행되어야 한다.  
=> JS 엔진은 데이터 타입에 따라 정해진 크기의 메모리 공간을 확보한다.

### 2. 값을 참조할 때 한 번에 읽어 들여야 할 메모리 공간의 크기를 결정하기 위해

식별자를 통해 우리는 메모리 공간의 주소를 찾아갈 수 있다. 하지만 이는 우리가 참조하고 싶은 값을 "선두" 메모리 주소일 뿐이다. 값을 참조하기 위해서는, 해당 주소부터 한 번에 읽어 들여야 할 메모리 크기, 즉 메모리 셀의 개수를 알아야 한다.  
=> 변수의 타입으로 얼마만큼 읽어들여야 할지 알 수 있다.

<details>
<summary>심볼 테이블</summary>

컴파일러 또는 인터프리터는 심볼 테이블이라고 부르는 자료 구조를 통해, 식별자를 키로 바인딩된 값의 메모리 주소, 데이터 타입, 스코프 등을 관리한다.

</details>

### 3. 메모리에서 읽어 들인 2진수를 어떻게 해석할지 결정하기 위해

모든 값은 데이터 타입을 가지며, 메모리에 2진수로 저장이 된다. 메모리에 저장된 값은 데이터에 따라 다르게 해석될 수 있다.

```js
// 메모리에 저장되는 2진수는 같지만, 데이터 타입이 다르다
let ch = "A"; // 0100 0001
let num = 65; // 0100 0001
```

<br/>

## 동적 타이핑

### 정적 타입 언어

C, Java 같은 **정적 타입 언어**는 변수를 선언할 때 데이터 타입을 사전에 선언해야 한다. 이를 **명시적 타입 선언(explicit type declaration)** 이라고 한다.  
정적 타입 언어는 변수의 타입을 변경할 수 없으며, 선언한 타입에 맞는 값만 할당할 수 있다. 컴파일 시점에 진행하는 **타입 체크**를 통과하지 못하면, 에러를 발생시키고 프로그램 실행 자체를 막는다.  
=> 타입의 일관성을 강제함으로써 안정적인 코드를 구현할 수 있고, 런타임에 발생하는 에러를 줄인다.

```c
// 변수 지정 시 타입 지정 필수
int next = 40;
char str[20]="hello";
double dd = 3.242;
```

### 동적 타입 언어

JS의 변수는 선언이 아닌 할당에 의해 타입이 결정된다. 이를 **타입 추론(type inference)**라고 한다. 그리고 재할당에 의해 변수의 타입은 언제든지 동적으로 변할 수 있다. 이러한 특징을 **동적 타이핑(dynamic typing)**이라고 한다.

-   변수 선언 당시 타입을 따로 지정하지 않는 동적 타입 언어에는 JS 말고도 Python, PHP, Ruby, Perl 등이 있다.
-   동적 타입 언어의 변수 값과 타입은 언제든지 바뀔 수 있기 때문에 의도치 않은 오류가 발생할 수 있다. (신뢰성이 떨어진다.)
-   하지만 타입을 지정하지 않기 때문에 유연성은 높다.

```js
// 변수 선언 시 타입 지정 X
let next = 40;
let dd = 3.42;
let str = "Hello~~~~";
```
