/* globals d3 */

// Stack Overflow: How to use multiple XMLHttpRequest?
// Answer: https://stackoverflow.com/a/46505251
const index = ["https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json", 
             "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json"]
const proms = index.map(d => fetch(d));
let data = [];

Promise.all(proms)
       .then(ps => Promise.all(ps.map(p => p.json()))) // p.json() also returns a promise
       .then(js => js.forEach((j,i) => (data.push(j))))
       .then(console.log(data));