# Chap 09. 타입 변환과 단축 평가

## 타입 변환

1. **명시적 타입 변환(explicit coercion)**

    - 개발자가 의도적으로 값의 타입을 변환하는 것
    - 타입 캐스팅(type casting)이라고도 함
    - 코드에 개발자의 의지가 명백히 드러남

    ```js
    var x = 10;

    // 명시적 타입 변환
    // 숫자를 문자열로 타입 캐스팅한다.
    var str = x.toString();
    console.log(typeof str, str); // string 10

    // x 변수의 값이 변경된 것은 아니다.
    console.log(typeof x, x); // number 10
    ```

2. **암묵적 타입 변환(implicit coercion)**

    - 표현식을 평가하는 도중, JS엔진에 의해 암묵적으로 타입이 자동 변환되는 것
    - 타입 강제 변환(type coercion)이라고도 함
    - 코드에 개발자의 의지가 명백히 나타나지 않음 (자동으로 변환되기에, 어떻게 평가될 것인지 예측 가능해야 함)

    ```js
    var x = 10;

    // 암묵적 타입 변환
    // 문자열 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열을 생성한다.
    var str = x + "";
    console.log(typeof str, str); // string 10

    // x 변수의 값이 변경된 것은 아니다.
    console.log(typeof x, x); // number 10
    ```

명시적 타입 변환이나 암묵적 타입 변환이 기존 원시 값을 직접 변경하는 것은 아니다. **원시 값은 변경 불가능한 값(immutable value)** 이므로 변경할 수가 없다. 타입 변환이란 기존 원시값을 사용해, **다른 타입의 새로운 원시 값을 생성**하는 것이다.

> 위의 예제에서, JS 엔진은 `x + ''`을 평가하기 위해, x변수의 숫자 값을 바탕으로 새로운 문자열 값 '10'을 생성하고, 이것으로 표현식 `'10' + ''` 평가한다. 이때 암묵적으로 생성된 문자열 '10'은 x변수에 재할당 되지 않는다.

<br/>
<br/>

## 암묵적 타입 변환

JS엔진은 표현식을 평가할 때 개발자의 의도와는 상관없이 "코드의 문맥을 고려해" 암묵적으로 데이터 타입을 강제 변환할 때가 있다.  
암묵적 타입 변환이 발생하면 `string`, `number`, `boolean`과 같은 원시 타입 중 하나로 타입을 자동 변환한다.

<br/>

### 문자열 타입으로 변환

연산자는 피연산자 중 하나 이상이 문자열이므로 문자열 연결 연산자로 동작한다. 문자열 연결 연산의 모든 피연산자는 코드의 문맥상 모두 문자열 타입이어야 한다.  
 => JS 엔진은 문자열 연결 연산자 표현식을 평가하기 위해, 피연산자 중에 문자열 타입이 아닌 것을 문자열 타입으로 암묵적 타입 변환을 한다.

표현식의 피연산자 뿐만 아니라, es6에 도입된 템플릿 리터럴의 표현식 삽입도 표현식 평가 결과를 문자열 타입으로 암묵적 타입 변환 한다.

```js
1 + '2' // -> "12"
`1 + 1 = ${1 + 1}` // -> "1 + 1 = 2"


// + 연산자
// 숫자 타입
0 + ''         // -> "0"
-0 + ''        // -> "0"
1 + ''         // -> "1"
-1 + ''        // -> "-1"
NaN + ''       // -> "NaN"
Infinity + ''  // -> "Infinity"
-Infinity + '' // -> "-Infinity"

// 불리언 타입
true + ''  // -> "true"
false + '' // -> "false"

// null 타입
null + '' // -> "null"

// undefined 타입
undefined + '' // -> "undefined"

// 심벌 타입
(Symbol()) + '' // -> TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + ''           // -> "[object Object]"
Math + ''           // -> "[object Math]"
[] + ''             // -> ""
[10, 20] + ''       // -> "10,20"
(function(){}) + '' // -> "function(){}"
Array + ''          // -> "function Array() { [native code] }"
```

<br/>

### 숫자 타입으로 변환

산술 연산자의 역할은 숫자 값을 만드는 것이다. 따라서 산술 연산자의 모든 피연산자는 코드 문맥상 모두 숫자 타입이어야 한다.  
JS엔진의 암묵적 타입 변환에서, 피연산자를 숫자 타입으로 변환할 수 없는 경우는 산술 연산을 수행할 수 없기 때문에 `NaN`이 평가 결과가 된다.

```js
1 - "1"; // -> 0
1 * "10"; // -> 10
1 / "one"; // -> NaN
```

산술 연산자 말고도, 비교 연산자를 사용할 때도 암묵적 타입 변환이 일어난다. 비교 연산자는 피연산자를 비교하여 boolean값을 만들어야 한다.

```js
"1" > 0; // -> true
```

**+단항 연산자**를 사용하면 숫자 타입의 값이 아닌 것을 숫자 타입의 값으로 암묵적 타입 변환을 실행한다.

```js
// 문자열 타입
+""; // -> 0
+"0"; // -> 0
+"1"; // -> 1
+"string"; // -> NaN

// 불리언 타입
+true; // -> 1
+false; // -> 0

// null 타입
+null; // -> 0

// undefined 타입
+undefined; // -> NaN

// 심벌 타입
+Symbol(); // -> TypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{}; // -> NaN
+[]; // -> 0
+[10, 20]; // -> NaN
+function () {}; // -> NaN
```

> 빈 문자열(''), 빈 배열([]), null, false : 0  
> 객체, 배열, undefined : NaN  
> true, 이 외의 경우 : 1

<br/>

### boolean 타입으로 변환

JS엔진은 조건식의 평과 결과를 boolean 타입으로 암묵적 타입 변환 한다.

```js
if ("") console.log("1");
if (true) console.log("2");
if (0) console.log("3");
if ("str") console.log("4");
if (null) console.log("5");

// 2 4
```

이때 JS엔진은 boolean 타입이 아닌 값을 **Truthy(참으로 평가되는 값)** 또는 **Falsy(거짓으로 평가되는 값)** 으로 구분한다.

1. **Falsy로 평가되는 값**

    - false
    - undefined
    - null
    - 0, -0
    - NaN
    - 빈 문자열('')

    ```js
    // 아래의 조건문은 모두 코드 블록을 실행한다.
    if (!false) console.log(false + " is falsy value");
    if (!undefined) console.log(undefined + " is falsy value");
    if (!null) console.log(null + " is falsy value");
    if (!0) console.log(0 + " is falsy value");
    if (!NaN) console.log(NaN + " is falsy value");
    if (!"") console.log("" + " is falsy value");
    ```

2. **Truthy로 평가되는 값**

    - falsy로 평가되는 값을 제외하고 전부
    - `[]`, `{}`도 truthy 이다.

    ```js
    // 전달받은 인수가 Falsy 값이면 true, Truthy 값이면 false를 반환한다.
    function isFalsy(v) {
        return !v;
    }

    // 전달받은 인수가 Truthy 값이면 true, Falsy 값이면 false를 반환한다.
    function isTruthy(v) {
        return !!v;
    }

    // 모두 true를 반환한다.
    isFalsy(false);
    isFalsy(undefined);
    isFalsy(null);
    isFalsy(0);
    isFalsy(NaN);
    isFalsy("");

    // 모두 true를 반환한다.
    isTruthy(true);
    isTruthy("0"); // 빈 문자열이 아닌 문자열은 Truthy 값이다.
    isTruthy({});
    isTruthy([]);
    ```

<br/>
<br/>

## 명시적 타입 변환

개발자의 의도에 따라 명시적으로 타입을 변경하는 방법은 다양하다.

1. 표준 빌트인 생성자 함수(String, Number, Boolean)을 `new 연산자` 없이 호출하는 방법
2. 빌트인 메서드를 사용하는 방법
3. 암묵적 타입 변환을 이용하는 방법

<br/>

### 문자열 타입으로 변환

1. `String` 생성자 함수를 `new 연산자` 없이 호출하는 방법
2. `Object.prototype.toString` 메서드를 사용하는 방법
3. `+ 문자열 연결 연산자`를 이용하는 방법

```js
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
// 숫자 타입 => 문자열 타입
String(1); // -> "1"
String(NaN); // -> "NaN"
String(Infinity); // -> "Infinity"
// 불리언 타입 => 문자열 타입
String(true); // -> "true"
String(false); // -> "false"

// 2. Object.prototype.toString 메서드를 사용하는 방법
// 숫자 타입 => 문자열 타입
(1).toString(); // -> "1"
NaN.toString(); // -> "NaN"
Infinity.toString(); // -> "Infinity"
// 불리언 타입 => 문자열 타입
true.toString(); // -> "true"
false.toString(); // -> "false"

// 3. 문자열 연결 연산자를 이용하는 방법
// 숫자 타입 => 문자열 타입
1 + ""; // -> "1"
NaN + ""; // -> "NaN"
Infinity + ""; // -> "Infinity"
// 불리언 타입 => 문자열 타입
true + ""; // -> "true"
false + ""; // -> "false"
```

<br/>

### 숫자 타입으로 변환

1. `Number` 생성자 함수를 `new 연산자` 없이 호출하는 방법
2. `parseInt`,`parseFloat` 등의 함수를 사용하는 방법 (문자열만 숫자 타입으로 변환 가능)
3. `+ 단항 산술 연산자`를 이용하는 방법
4. `* 산술 연산자`를 이용하는 방법

```js
// 1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 숫자 타입
Number("0"); // -> 0
Number("-1"); // -> -1
Number("10.53"); // -> 10.53
// 불리언 타입 => 숫자 타입
Number(true); // -> 1
Number(false); // -> 0

// 2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 변환 가능)
// 문자열 타입 => 숫자 타입
parseInt("0"); // -> 0
parseInt("-1"); // -> -1
parseFloat("10.53"); // -> 10.53

// 3. + 단항 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
+"0"; // -> 0
+"-1"; // -> -1
+"10.53"; // -> 10.53
// 불리언 타입 => 숫자 타입
+true; // -> 1
+false; // -> 0

// 4. * 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
"0" * 1; // -> 0
"-1" * 1; // -> -1
"10.53" * 1; // -> 10.53
// 불리언 타입 => 숫자 타입
true * 1; // -> 1
false * 1; // -> 0
```

<br/>

### boolean 타입으로 변환

1. `Boolean` 생성자 함수를 `new 연산자` 없이 호출하는 방법
2. `! 부정 논리 연산자`를 두 번 사용하는 방법

```js
// 1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 불리언 타입
Boolean("x"); // -> true
Boolean(""); // -> false
Boolean("false"); // -> true
// 숫자 타입 => 불리언 타입
Boolean(0); // -> false
Boolean(1); // -> true
Boolean(NaN); // -> false
Boolean(Infinity); // -> true
// null 타입 => 불리언 타입
Boolean(null); // -> false
// undefined 타입 => 불리언 타입
Boolean(undefined); // -> false
// 객체 타입 => 불리언 타입
Boolean({}); // -> true
Boolean([]); // -> true

// 2. ! 부정 논리 연산자를 두번 사용하는 방법
// 문자열 타입 => 불리언 타입
!!"x"; // -> true
!!""; // -> false
!!"false"; // -> true
// 숫자 타입 => 불리언 타입
!!0; // -> false
!!1; // -> true
!!NaN; // -> false
!!Infinity; // -> true
// null 타입 => 불리언 타입
!!null; // -> false
// undefined 타입 => 불리언 타입
!!undefined; // -> false
// 객체 타입 => 불리언 타입
!!{}; // -> true
!![]; // -> true
```

<br/>

## 단축 평가

### 논리 연산자를 사용한 단축 평가

논리합(`||`) 또는 논리곱(`&&`) 연산자 표현식은 언제나 **2개의 피연산자 중 어느 한쪽으로 평가**된다.  
논리 연산의 결과를 결정한 피연산자를 타입 변환하지 않고 그대로 반환한다.

```js
// 논리합(||) 연산자
"Cat" || "Dog"; // -> "Cat"
false || "Dog"; // -> "Dog"
"Cat" || false; // -> "Cat"

// 논리곱(&&) 연산자
"Cat" && "Dog"; // -> "Dog"
false && "Dog"; // -> false
"Cat" && false; // -> false
```

-   논리합(`||`) 연산자는 첫 번째 피연산자가 truthy이면 바로 첫 번째 피연산자를 반환한다.
-   논리곱(`&&`) 연산자는 두 번째 피연산자가 falsy이면 바로 첫 번째 피연산자를 반환한다.

이를 **단축평가**라고 한다.  
단축 평가(short-circuit evaluation)은 표현식을 평가하는 도중에 평가 결과가 확정된 경우 **나머지 평가 과정을 생략**하는 것을 말한다.

<br/>

**객체를 가리키기 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때**

객체를 가리키는 기대하는 변수의 값이 객체가 아니라 null이나 undefined인 경우, 객체의 프로퍼티를 참조하면 TypeError가 발생한다.

```js
var elem = null;
var value = elem.value; // TypeError: Cannot read property 'value' of null

// elem이 null이나 undefined와 같은 Falsy 값이면 elem으로 평가되고
// elem이 Truthy 값이면 elem.value로 평가된다.
var value = elem && elem.value; // -> null
```

<br/>

**함수 매개변수에 기본값을 설정할 때**

함수를 호출할 때 인수를 전달하지 않으면 매개변수에는 undefined가 할당된다.  
이때 단축평가를 사용해 매개변수의 기본값을 설정하면 undefined로 인해 발생할 수 있는 에러를 방지할 수 있다.

```js
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
    str = str || "";
    return str.length;
}
getStringLength(); // -> 0
getStringLength("hi"); // -> 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = "") {
    return str.length;
}
getStringLength(); // -> 0
getStringLength("hi"); // -> 2
```

<br/>

### 옵셔널 체이닝 연산자

es11에서 도입된 옵셔널 체이닝(optional chaining) 연산자 `?.`는 좌항의 피연산자가 **null 또는 undefined인 경우** undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

```js
var elem = null;

// elem이 null 또는 undefined이면 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
var value = elem?.value;
console.log(value); // undefined
```

이전까지는 `&&`을 사용한 단축평가를 통해 값을 체크했었다.  
`&&`는 좌항 피연산자가 falsy이면 해당 피연산자를 그대로 반환한다. 하지만 `0`이나 `''`는 객체로 평가될 때도 있다.  
하지만 옵셔널 체이닝 연산자 `?.`은 좌항 피연산자가 falsy (false, undefined, null, 0, -0, NaN, '')여도 **null 또는 undefined가 아니라면 우항의 프로퍼티 참조를 이어간다**.

```js
var str = "";

// 문자열의 길이(length)를 참조한다.
var length = str && str.length; // str이 선택됨
// 문자열의 길이(length)를 참조하지 못한다.
console.log(length); // ''

// 문자열의 길이(length)를 참조한다. 이때 좌항 피연산자가 false로 평가되는 Falsy 값이라도
// null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.
var length = str?.length;
console.log(length); // 0
```

<br/>

### null 병합 연산자

es11에서 도입된 null 병합(nullish coalescing) 연산자 `??`는 좌항의 피연산자가 **null 또는 undefined인 경우** 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.  
null 병합 연산자는 변수에 기본값을 설정할 때 유용하다.

```js
// 좌항의 피연산자가 null 또는 undefined이면 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.
var foo = null ?? "default string";
console.log(foo); // "default string"
```

이전까지는 `||`를 사용한 단축평가를 통해 기본값을 설정했다.  
`||`은 좌항 피연산자가 falsy이면 우항의 피연산자를 반환한다. 하지만 만약 falsy 값인 `0`이나 `''`도 기본값으로서 유효하다면 예기치 않은 동작이 발생할 수 있다.  
null 병합 연산자 `??` 좌항 피연산자가 falsy (false, undefined, null, 0, -0, NaN, '')여도 **null 또는 undefined가 아니라면 좌항의 피연산자를 그대로 반환한다**.

```js
// Falsy 값인 0이나 ''도 기본값으로서 유효하다면 예기치 않은 동작이 발생할 수 있다.
var foo = "" || "default string"; // 기본값으로  ""를 가지고 싶을 수도 있다.
console.log(foo); // "default string"

// 좌항의 피연산자가 Falsy 값이라도 null 또는 undefined가 아니면 좌항의 피연산자를 반환한다.
var foo = "" ?? "default string";
console.log(foo); // ""
```
