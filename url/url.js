import url from 'url';

var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q);

// getting full url 

console.log(q.href);

// getting hostname
console.log(q.hostname);

// port number

console.log(q.port);

// requested url

console.log(q.path);

// search  query which start from ?
console.log(q.search);

// parsed query into json format
console.log(q.query);
