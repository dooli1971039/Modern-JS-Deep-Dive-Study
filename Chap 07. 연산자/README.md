# Chap 07. 연산자

**연산자(Operator)** : 하나 이상의 표현식을 대상으로 `산술, 할당, 비교, 논리, 타입, 지수 연산 등`을 수행하여 하나의 값을 만듬.  
**피연산자(Operand)** : 연산의 대상으로, 값으로 평가될 수 있는 표현식이어야 함.

```js
// 산술 연산자
5 * 4; // -> 20
// 문자열 연결 연산자
"My name is " + "Lee"; // -> 'My name is Lee'
// 할당 연산자
color = "red"; // -> 'red'
// 비교 연산자
3 > 5; // -> false
// 논리 연산자
true && false; // -> false
// 타입 연산자
typeof "Hi"; // -> string
```

피연산자와 연산자의 조합으로 이루어진 "연산자 표현식"도 값으로 평가될 수 있는 표현식이다.

<br/>

## 산술 연산자

산술 연산자(arithmatic operator)는 피연산자를 대상으로 수학적 계산을 수행해 새로운 숫자 값을 만든다.  
산술 연산이 불가능할 경우 `NaN`을 반환한다.

### 이항 산술 연산자

이항 산술 연산자는 **2개의 피연산자**를 산술 연산한다. 모든 이항 산술 연산자는 피연산자의 값을 변경하는 부수 효과(side effect)가 없다.

```js
5 + 2; // -> 7
5 - 2; // -> 3
5 * 2; // -> 10
5 / 2; // -> 2.5 (그냥 나눗셈)
5 % 2; // -> 1 (나머지 연산)
```

### 단항 산술 연산자

단항 산술 연산자는 1개의 피연산자를 산술 연산한다. (`++, --, +, -`)

1. `++`, `--`는 값의 증감이 이루어지고, 부수 효과가 생긴다.

    ```js
    var x = 5,
    var result;

    // 선할당 후증가(postfix increment operator)
    result = x++;
    console.log(result, x); // 5 6

    // 선증가 후할당(prefix increment operator)
    result = ++x;
    console.log(result, x); // 7 7

    // 선할당 후감소(postfix decrement operator)
    result = x--;
    console.log(result, x); // 7 6

    // 선감소 후할당 (prefix decrement operator)
    result = --x;
    console.log(result, x); // 5 5
    ```

2. `+`, `-`는 양수/음수를 나타낼 때 쓰이고, 부수 효과는 없다.

    ```c
    // +는 아무런 효과가 없다.
    +10;    // -> 10
    +(-10); // -> -10

    // -는 양수를 음수로, 음수를 양수로 전환한다.
    -(10); // -> -10
    -(-10); // -> 10
    ```

    숫자 타입이 아닌 피연산자에 `+, - 단항 연산자`를 사용하면, 피연산자를 숫자 타입으로 변환하여 반환한다. 이렇게 타입이 바뀌는 것을 **암묵적 타입 변환(implicit coercion)** 또는 **타입 강제 변환(type coercion)** 이라고 한다.

    ```js
    var x = "1";

    // 문자열을 숫자로 타입 변환한다.
    console.log(+x); // 1
    // 부수 효과는 없다.
    console.log(x); // "1"

    // 불리언 값을 숫자로 타입 변환한다.
    x = true;
    console.log(+x); // 1
    // 부수 효과는 없다.
    console.log(x); // true

    // 불리언 값을 숫자로 타입 변환한다.
    x = false;
    console.log(+x); // 0
    // 부수 효과는 없다.
    console.log(x); // false

    // 문자열을 숫자로 타입 변환할 수 없으므로 NaN을 반환한다.
    x = "Hello";
    console.log(+x); // NaN
    // 부수 효과는 없다.
    console.log(x); // "Hello"
    ```

### 문자열 연결 연산자

`+ 연산자`는 **피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작**한다.  
(그 외의 경우는 산술 연산자로 동작함)

```js
// 문자열 연결 연산자
"1" + 2; // -> '12'
1 + "2"; // -> '12'

// 산술 연산자
1 + 2; // -> 3

// true는 1로 타입 변환된다.
1 + true; // -> 2

// false는 0으로 타입 변환된다.
1 + false; // -> 1

// null은 0으로 타입 변환된다.
1 + null; // -> 1

// undefined는 숫자로 타입 변환되지 않는다.
+undefined; // -> NaN
1 + undefined; // -> NaN
```

<br/>

## 할당 연산자

할당 연산자(assignment operator)는 **우항에 있는 피연산자의 평가 결과를 좌항에 있는 변수에 대입**한다. 좌항의 변수에 값을 할당하기 때문에 **변수의 값이 변하는 부수 효과가 있다**.

![할당 연산자](https://velog.velcdn.com/images/jhk5242/post/4ab43411-1253-4271-8ffa-9d894d9f466e/image.png)

할당문은 **값으로 평가되는 표현식인 문으로서 할당된 값으로 평가된다**.  
그렇기 때문에 할당문을 다른 변수에 할당할 수 있다. (연쇄 할당)

```js
var a, b, c;
// 연쇄 할당. 오른쪽에서 왼쪽으로 진행.
// ① c = 0 : 0으로 평가된다
// ② b = 0 : 0으로 평가된다
// ③ a = 0 : 0으로 평가된다
a = b = c = 0;
console.log(a, b, c); // 0 0 0
```

<br/>

## 비교 연산자

비교 연산자(comparison operator)는 **좌항과 우항의 피연산자를 비교하여 그 결과를 boolean값으로 반환**한다. 비교 연산자는 부수 효과가 없다.

### 동등/일치 비교 연산자

두 연산자 모두 좌항과 우항의 피연산자가 같은 값으로 평가되는지 비교해 boolean 값을 반환한다. 하지만 두 연산자의 비교하는 엄격성은 다르다.

![비교 연산자](https://velog.velcdn.com/images/jhk5242/post/8bffbca5-8ab5-42cf-b76f-ad8dbcbfbcaf/image.png)

1. **동등 비교 연산자 (==)**

    - 비교 전에 먼저 암묵적 타입 변환을 통해 타입을 일치시킨 후 같은 값인지 비교한다.
        ```js
        // 동등 비교
        5 == 5; // -> true
        // 타입은 다르지만 암묵적 타입 변환을 통해 타입을 일치시키면 동등하다.
        5 == "5"; // -> true
        ```
    - 결과를 예측하기 어렵다.
        ```js
        "0" == ""; // -> false
        0 == ""; // -> true
        0 == "0"; // -> true
        false == "false"; // -> false
        false == "0"; // -> true
        false == null; // -> false
        false == undefined; // -> false
        ```

2. **일치 비교 연산자 (===)**

    - 피연산자의 타입과 값을 모두 비교한다.
        ```js
        // 일치 비교
        5 === 5; // -> true
        // 값과 타입이 모두 같은 경우만 true를 반환한다.
        5 === "5"; // -> false
        ```
    - NaN은 자신과 일치하지 않는 유일한 값이기 때문에 주의해야 한다.

        ```js
        // NaN은 자신과 일치하지 않는 유일한 값이다.
        NaN === NaN; // -> false

        // Number.isNaN 함수는 지정한 값이 NaN인지 확인하고 그 결과를 boolean으로 반환.
        Number.isNaN(NaN); // -> true
        Number.isNaN(10); // -> false
        Number.isNaN(1 + undefined); // -> true
        ```

    - 숫자 0의 경우 양의 0 과 음의 0 이 동일하다.
        ```js
        // 양의 0과 음의 0의 비교. 일치 비교/동등 비교 모두 결과는 true이다.
        0 === -0; // -> true
        0 == -0; // -> true
        ```
    - **Object.is 메서드**: es6에서 도입된 Object.is 메서드는 0과 NaN의 경우도 예측 가능한 비교를 한다.

        ```js
        -0 === +0; // -> true
        Object.is(-0, +0); // -> false

        NaN === NaN; // -> false
        Object.is(NaN, NaN); // -> true
        ```

3. **대소 관계 비교 연산자** - 피연산자의 크기를 비교하여 boolean 값을 반환한다.
    ```js
    // 대소 관계 비교
    5 > 0; // -> true
    5 > 5; // -> false
    5 >= 5; // -> true
    5 <= 5; // -> true
    ```

## 삼항 조건 연산자

`(조건식) ? (참일 때 수행) : (거짓일 때 수행)`

삼항 조건 연산자(ternary operator)는 **조건식의 평가 결과에 따라 어떤 문을 수행할지가 결정**된다.  
삼항 조건 연산자 표현식은 `if ~ else`문과 유사하지만, 값처럼 사용할 수 없는 `if ~ else`문과 달리, **값으로 평가할 수 있는 표현식인 문**이다.

```js
var x = 10;

// 삼항 조건 연산자 표현식은 표현식인 문이다. 따라서 값처럼 사용할 수 있다.
var result = x % 2 ? "홀수" : "짝수";
console.log(result); // 짝수
```

<br/>

## 논리 연산자

논리 연산자(logical operator)는 우항과 좌항의 피연산자를 논리 연산한다.

```js
// 논리합(||) 연산자 : or
true || true; // -> true
true || false; // -> true
false || true; // -> true
false || false; // -> false

// 논리곱(&&) 연산자 : and
true && true; // -> true
true && false; // -> false
false && true; // -> false
false && false; // -> false

// 논리 부정(!) 연산자 : not
!true; // -> false
!false; // -> true
```

-   논리 부정 연산자는 항상 boolean 값을 반환한다. 하지만 피연산자가 반드시 boolean일 필요는 없다. (암묵적 타입 변환이 발생함)
-   논리합, 논리곱 연산자 표현식의 평가 결과는 boolean이 아닐 수도 있다. 2개의 피연산자 중 어느 한쪽으로 평가된다.
    ```js
    // 단축 평가
    "Cat" && "Dog"; // -> 'Dog'
    ```

<br/>

## 쉼표 연산자

쉼표 연산자는 왼쪽 피연산자부터 차례로 피연산자를 평가하고, 마지막 피연산자의 평가가 끝나면 마지막 피연산자의 평가 결과를 반환한다.

```js
var x, y, z;
(x = 1), (y = 2), (z = 3); // 3
```

<br/>

## 그룹 연산자

`()`로 피연산자를 감싸는 그룹 연산자는, 자신의 피연산자인 표현식을 가장 먼저 평가한다.  
이로써 연산자의 우선순위를 조정할 수 있다. (그룹 연산자의 연산자 우선순위가 가장 높다.)

```js
10 * 2 + 3; // -> 23

// 그룹 연산자를 사용하여 우선순위를 조절
10 * (2 + 3); // -> 50
```

<br/>

## typeof 연산자

typeof 연산자는 피연산자의 데이터 타입을 문자열로 반환한다.  
`string, number, boolean, undefined, symbol, object, function` 중 하나를 반환한다.

```js
typeof ""; // -> "string"
typeof 1; // -> "number"
typeof NaN; // -> "number"
typeof true; // -> "boolean"
typeof undefined; // -> "undefined"
typeof Symbol(); // -> "symbol"
typeof null; // -> "object"
typeof []; // -> "object"
typeof {}; // -> "object"
typeof new Date(); // -> "object"
typeof /test/gi; // -> "object"
typeof function () {}; // -> "function"

// 선언하지 않은 식별자를 typeof로 연산해보면 undefined가 나온다.
typeof undeclared; // -> undefined
```

<br/>

## 지수 연산자

es7에서 도입된 지수 연산자는 좌항의 피연산자를 "밑"으로, 우항의 피연산자를 "지수"로 거듭제곱 한다.

```js
2 ** 2; // -> 4
2 ** 2.5; // -> 5.65685424949238
2 ** 0; // -> 1
2 ** -2; // -> 0.25
```

이전에는 `Math.pow()`를 통해 지수 연산을 했다.

```js
Math.pow(2, 2); // -> 4
Math.pow(2, 2.5); // -> 5.65685424949238
Math.pow(2, 0); // -> 1
Math.pow(2, -2); // -> 0.25

// 지수 연산자의 결합 순서는 우항에서 좌항이다. 즉, 우결합성을 갖는다.
2 ** (3 ** 2); // -> 512
Math.pow(2, Math.pow(3, 2)); // -> 512
```

음수를 거듭제곱의 밑으로 사용하려면, 반드시 괄호로 묶어야 한다.

```js
-5 ** 2;
// SyntaxError: Unary operator used immediately before exponentiation expression.
// Parenthesis must be used to disambiguate operator precedence

(-5) ** 2; // -> 25
```

지수 연산자는 할당 연산자와 함께 쓰일 수 있고, 이항 연산자 중에 우선순위가 가장 높다.

```js
var num = 5;
num **= 2; // -> 25

2 * 5 ** 2; // -> 50
```

<br/>

## 그 외의 연산자

![연산자](https://velog.velcdn.com/images/jhk5242/post/3b3b1b2c-c0fb-46b2-95cf-b662df49d4f0/image.png)

```js
var o = {a: 1};

// delete 연산자는 객체의 프로퍼티를 삭제하는 부수 효과가 있다.
// 이는 o 객체를 사용하는 다른 코드에 영향을 준다.
delete o.a;
console.log(o); // {}
```

## 연산자 우선 순위

![연산자 우선 순위1](https://velog.velcdn.com/images/jhk5242/post/9e23e5e9-1bf1-4b28-b69e-89cf7f5460a8/image.png)

![연산자 우선 순위2](https://velog.velcdn.com/images/jhk5242/post/1130ac9a-d553-4495-a497-1100a7f67072/image.png)

## 연산자 결합 순서

![연산자 결합 순서](https://velog.velcdn.com/images/jhk5242/post/b325168b-c4de-4824-8875-e320cf980800/image.png)
