var index = ["https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json", 
             "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json"],
    proms = index.map(d => fetch(d));

Promise.all(proms)
       .then(ps => Promise.all(ps.map(p => p.json()))) // p.json() also returns a promise
       .then(js => js.forEach((j,i) => (console.log(`RESPONSE FOR: ${index[i]}:`), console.log(j))));