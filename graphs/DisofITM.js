let data_url = "database/ITM40.json";
let geo_url = "database/taiwan_geo.json";

Promise.all([d3.json(data_url), d3.json(geo_url)]).then(function(data) {
    draw_map(data[0], data[1]);
});

function unpack(rows, key) {
    return rows.map(function(row) {
        return row[key];
    });
}

function draw_map(school_data, geo_data) {
    console.log(unpack(school_data, "縣市別").sort());

    let all_cities = [];
    for (let i = 0; i < geo_data.features.length; i++) {
        all_cities.push(geo_data.features[i].properties.COUNTYNAME);
    }

    console.log(all_cities.sort());
    // Confirm the availability of junior high school population data for each city
    console.log(unpack(school_data, "收入"));

    let trace1 = {
        name: "",
        type: "choropleth",
        locationmode: "geojson-id",
        featureidkey: "properties.COUNTYNAME",
        locations: unpack(school_data, "縣市別"),
        geojson: geo_data,
        z: unpack(school_data, "收入"),
        colorscale: [[0, 'lightyellow'], [1, 'brown']],
        hovertemplate: "%{location}: %{z:,}元",
        hoverlabel: {
            bgcolor: "white",
            bordercolor: "black",
            font: {
                family: "Arial",
                size: 30,
                color: "black"
            }
        }
    };
    let data = [trace1];
    let layout = {
        title: {
            text: "平均年收入",
            font: {
                size: 40,
                color: "black"
            },
            x: 0.5,
            y: 0.98,
        },
        geo: {
            center: {
                lon: 120.32,
                lat: 23.84
            },
            fitbounds: "locations",
            projection: {
                type: "mercator"
            },
            resolution: 50,
        },
        margin: {
            l: 10,
            r: 10,
            t: 60,
            b: 10,
        }
    };

    Plotly.newPlot("graph_disofitm", data, layout);
}