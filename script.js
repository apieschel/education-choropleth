/* globals d3, topojson */

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

    const w = 1000
    const h = 670;
  
    const path = d3.geoPath();
  
    const svg = d3.select(".container")
      .append("svg")
      .attr("id", "chart")
      .attr("width", w)
      .attr("height", h)
    
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .style("opacity", 0)

    d3.select(".heading")
      .append("h1")
      .attr("id", "title")
      .text("Higher Education in the United States");

    d3.select(".heading")
      .append("h2")
      .attr("id", "description")
      .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)");
    
  console.log(topojson.feature(dataset2, dataset2.objects.counties).features);
    svg.append("g")
      .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(dataset2, dataset2.objects.counties).features)
      .enter()
      .append("path")
      .attr("class", "county")
      .attr("data-fips", (d) => d.id)
      .attr("data-education", function(d) {
        var result = dataset1.filter(function( obj ) {
          return obj.fips == d.id;
        });
        if(result[0]){
          return result[0].bachelorsOrHigher
        }
        //could not find a matching fips id in the data
        console.log('could find data for: ', d.id);
        return 0
       })
      .attr("d", path)
      .attr("fill", (d,i) => {
        let education;
        let result = dataset1.filter(function( obj ) {
          return obj.fips == d.id;
        });
        if(result[0]){
          education = result[0].bachelorsOrHigher;
        } else {
          education = 0;
        }
        if(education < 10) {
          return "blue"
        } else if(education > 10 && education < 20) {
          return "skyblue"
        } else if(education > 20 && education < 30) {
          return "yellow"
        } else {
          return "red"
        }
      })
      .on("mouseover", function(d,i) {
          let education;
          let name; 
          let state;
          let result = dataset1.filter(function( obj ) {
            return obj.fips == d.id;
          });
          if(result[0]){
            education = result[0].bachelorsOrHigher;
            name = result[0].area_name;
            state = result[0].state;
          } else {
            education = 0;
          }
          tooltip
            .transition()
            .duration(100)
            .style("opacity", 0.85);
          tooltip
            .html("<p>" + name + ", " + state +  " " + education + "%</p>")
            .style("left", d3.event.pageX + 15 + "px")
            .style("top", d3.event.pageY + 15 + "px");
          tooltip.attr("data-education", education);
        })
        .on("mouseout", function(d) {
          tooltip
            .transition()
            .style("opacity", 0);
        });
    
        svg.append("path")
            .datum(topojson.mesh(dataset2, dataset2.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "states")
            .attr("d", path)
            .attr("fill", "none")
            .attr("stroke", "#fff");
  
    const legend = svg.append("g")
                    .attr("id", "legend");
      
    legend.append("rect")
      .attr("x", 0)
      .attr("y", h - 16)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "blue")
      
    legend.append("text")
      .text("Less than 10 percent of the county's population (age 25 and up) has college degree or higher.")
      .attr("x", 20)
      .attr("y", (h - 5))
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", (h - 31))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "skyblue")
      
    legend.append("text")
      .text("Between 10 and 20 percent of the county's population (age 25 and up) has college degree or higher.")
      .attr("x", 20)
      .attr("y", (h - 20))
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", (h - 46))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "yellow")
      
    legend.append("text")
      .text("Between 20 and 30 percent of the county's population (age 25 and up) has college degree or higher.")
      .attr("x", 20)
      .attr("y", (h - 35))
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", (h - 61))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "red")
      
    legend.append("text")
      .text("Greater than 30 percent of the county's population (age 25 and up) has college degree or higher.")
      .attr("x", 20)
      .attr("y", (h - 50))
  });