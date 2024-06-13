d3.csv("database/all.csv", function (data) {
  // Define a mapping from education levels to numbers based on chatgpt's output
  const eduMapping = {
    不識字: 1,
    自修: 4,
    國小: 4,
    "國(初)中(初職)": 7,
    高職: 10,
    "專科(五專前三年劃記高職)": 13,
    高中: 14,
    大學: 17,
    碩士: 19,
    博士: 20,
  };

  // Use the mapping to transform the EDU field
  return {
    AGE: data.AGE,
    EDU: eduMapping[data.EDU] || 0, // Default to 0 if the education level is not found
    ITM40: data.ITM40 / 1000000, // Convert to million
  };
})
  .then(function (data) {
    // Verify the data structure
    if (!Array.isArray(data)) {
      throw new TypeError("Expected data to be an array");
    }

    if (data.length === 0) {
      throw new Error("No data loaded from CSV");
    }

    function unpack(rows, key) {
      return rows.map(function (row) {
        return row[key];
      });
    }

    console.log(data);

    var trace = {
      x: unpack(data, "AGE"),
      y: unpack(data, "EDU"),
      z: unpack(data, "ITM40"),
      mode: "markers",
      marker: {
        size: 12,
        line: {
          color: "rgba(217, 217, 217, 0.14)",
          width: 0.5,
        },
        opacity: 0.8,
        symbol: "circle",
      },
      type: "scatter3d",
    };

    var layout = {
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
      },
      title: "Impact of Education Level and Age on Annual Income",
      xaxis: {
        title: "AGE",
      },
      yaxis: {
        title: "EDU",
      },
      zaxis: {
        title: "Annual Income (Million)",
      },
    };
    Plotly.newPlot("graph_AGE-EDU-ITM", [trace], layout);
  })
  .catch(function (error) {
    console.log(error);
  });
