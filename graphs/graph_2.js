Promise.all([
  d3.json("database/taiwan_geo.json"),
  d3.csv("database/workplace.csv"),
]).then(function (data) {
  drawMap(data[0], data[1]);
});


function drawMap(geo_data, workPlace_data) {
    let all_cities = [];
    for (let i = 0; i < geo_data.features.length; i++) {
      all_cities.push(geo_data.features[i].properties.COUNTYNAME);
    }

    let trace = {
        name: "",
        type: "choropleth",
        locationmode: "geojson-id",
        featureidkey: "properties.COUNTYNAME",
        locations: unpack(workPlace_data, "WORKPLACE"),
        geojson: geo_data,
        z: unpack(workPlace_data, "salary_mean"),
        colorscale: [
          [0, "lightyellow"],
          [1, "brown"],
        ],
        hovertemplate: "%{location}:" + "%{z:,}人",
        hoverlabel: {
          bgcolor: "white",
          bordercolor: "black",
          font: {
            family: "Arial",
            size: 30,
            color: "black",
          },
        },
      };

      let data = [trace];
      
      let layout = {
        title: {
          text: "111學年度各縣市國中生人數",
          font: {
            size: 40,
            color: "black",
          },
          x: 0.5,
          y: 0.98,
        },
        geo: {
          center: {
            lon: 120.32,
            lat: 23.84,
          },
          fitbounds: "locations",
          projection: {
            type: "mercator",
          },
          resolution: 50,
        },
        margin: {
          l: 10,
          r: 10,
          t: 60,
          b: 10,
        },
      };
    
      Plotly.newPlot("graph_2", data, layout);
}






