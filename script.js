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
  .then((d) => {
    const dataset1 = data[0];
    const dataset2 = data[1];
    console.log(dataset1);
    console.log(dataset2);  
     
    const w = 1200
    const h = 750;
  
    const projection = d3.geoAlbersUsa()
        .translate([w/2, h/2])
        .scale([500]);

    //Define default path generator
    const path = d3.geoPath()
      .projection(projection);
  
    const svg = d3.select(".container")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)

    d3.select(".heading")
      .append("h1")
      .attr("id", "title")
      .text("United States Educational Attainment");

    d3.select(".heading")
      .append("h2")
      .attr("id", "description")
      .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)");
  
    svg.selectAll("path")
          .data(json.features)
          .enter()
          .append("path")
          .attr("d", path)

  });