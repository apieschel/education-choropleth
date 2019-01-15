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
    const counties = dataset2.objects.counties.geometries;
    const nation = dataset2.objects.nation.geometries[0].arcs[0][0];
    let nationPath = "";
   
    console.log(dataset2);
    console.log(counties);
    
    for(let i = 0; i < nation.length; i++) {
      if(i === 0) {
        nationPath = "M " + nation[i];
      } else {
        nationPath = nationPath + " L " + nation[i];
      }
    }
    
    //console.log(nationPath);
     
    const w = 1200
    const h = 700;
  
    dataset1.map((d, i) => d.polygon = counties[i].arcs);
    console.log(dataset1);
  
    const projection = d3.geoAlbersUsa()
        .translate([w/2, h/2])
        .scale([500]);
    console.log(projection);
  
    //Define default path generator
    const path = d3.geoPath();
  
    console.log(path);
  
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
      .text("United States Educational Attainment");

    d3.select(".heading")
      .append("h2")
      .attr("id", "description")
      .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)");
    
    svg.selectAll("path")
      .data(topojson.feature(dataset2, dataset2.objects.counties).features)
      .enter()
      .append("path")
      .attr("class", "county")
      .attr("data-fips", (d,i) => dataset1[i].fips)
      .attr("data-education", (d,i) => dataset1[i].bachelorsOrHigher)
      .attr("d", path)
      .attr("fill", d)
      .on("mouseover", function(d,i) {
          tooltip
            .transition()
            .duration(100)
            .style("opacity", 0.85);
          tooltip
            .html("<p>" + dataset1[i].bachelorsOrHigher + "</p>")
            .style("left", d3.event.pageX + 15 + "px")
            .style("top", d3.event.pageY + 15 + "px");
          tooltip.attr("data-year", d.year);
        })
        .on("mouseout", function(d) {
          tooltip
            .transition()
            .duration(100)
            .style("opacity", 0);
        });
    
    const legend = svg.append("g")
                    .attr("id", "legend");
      
    legend.append("rect")
      .attr("x", 0)
      .attr("y", h - 11)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "blue")
      
    legend.append("text")
      .text("less than -0.1 variance")
      .attr("x", 20)
      .attr("y", (h))
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", (h - 26))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "skyblue")
      
    legend.append("text")
      .text("between 0 and -0.1 variance")
      .attr("x", 20)
      .attr("y", (h - 15))
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", (h - 41))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "yellow")
      
    legend.append("text")
      .text("between 0 and 0.1 variance")
      .attr("x", 20)
      .attr("y", (h - 30))
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", (h - 56))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "red")
      
    legend.append("text")
      .text("greater than 0.1 variance")
      .attr("x", 20)
      .attr("y", (h - 45))

  });