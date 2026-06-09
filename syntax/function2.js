console.log(Math.round(1.6));   //내장 함수의 출력은 다양한 용도로 쓸 수 있음.
console.log(Math.round(1.4));

function sum(first, second){     // 매개변수 = parameter
 console.log('a');
 return first+second;      // 우리가 만든 함수는 융통성이 없음.(단지 더하는 값을 출력용도로만 사용 가능)
 console.log('b');
}

console.log(sum(2,4));  // 각각의 값 = argument
