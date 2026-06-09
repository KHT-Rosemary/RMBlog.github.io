var name = '자바'
var letter = 'Dear '+name+'\n\nJavaScript (/ˈdʒɑːvəˌskrɪpt/[6]), often abbreviated as JS, is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language. '+name+' Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production. It is used to make webpages interactive and provide online programs, including video games. The majority of websites employ it, and all modern web browsers support it without the need for plug-ins by means of a built-in JavaScript engine. Each of the many JavaScript engines represent a different implementation of JavaScript, all based on the ECMAScript specification, with '+name+' some engines not supporting the spec fully, and with many engines supporting additional features beyond ECMA. '+name+''

console.log(letter);

//var a = 1;    // 우항에 있는 1은 literal 정보를 표현하는 방법, 기호

//` : 그레이브 엑센트라는 뜻. 템플릿 리터럴의 시작과 끝을 나타냄

var letter = `Dear ${name}

JavaScript (/ˈdʒɑːvəˌskrɪpt/[6]), often abbreviated as JS, is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language. ${name} Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production. It is used to make webpages interactive and provide online programs, including video games. The majority of websites employ it, and all modern web browsers support it without the need for plug-ins by means of a built-in JavaScript engine. Each of the many JavaScript engines represent a different implementation of JavaScript, all based on the ECMAScript specification, with ${name} some engines not supporting the spec fully, and with many engines supporting additional features beyond ECMA. ${name}`
