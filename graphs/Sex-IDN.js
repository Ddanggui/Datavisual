// Read the CSV file
d3.csv("database/all.csv").then(function (data) {
  console.log(data);

  // Filter data for males
  let dataMen = data.filter((row) => row["SEX"] === "男");
  // Filter data for females
  let dataWomen = data.filter((row) => row["SEX"] === "女");

  // Count occupations for men
  let countMen = dataMen.reduce((acc, row) => {
      acc[row["IND"]] = (acc[row["IND"]] || 0) + 1;
      return acc;
  }, {});

  // Count occupations for women
  let countWomen = dataWomen.reduce((acc, row) => {
      acc[row["IND"]] = (acc[row["IND"]] || 0) + 1;
      return acc;
  }, {});

  // Calculate the total number of men and women
  let totalMen = dataMen.length;
  let totalWomen = dataWomen.length;

  // Group occupations with less than 1.5% of the total into "Other"
  let otherMen = 0;
  let otherWomen = 0;

  for (let occupation in countMen) {
      if (countMen[occupation] / totalMen < 0.015) {
          otherMen += countMen[occupation];
          delete countMen[occupation];
      }
  }

  for (let occupation in countWomen) {
      if (countWomen[occupation] / totalWomen < 0.015) {
          otherWomen += countWomen[occupation];
          delete countWomen[occupation];
      }
  }

  countMen["其餘"] = otherMen;
  countWomen["其餘"] = otherWomen;

  // Create subplots for the pie charts
  let trace_Men = {
      values: Object.values(countMen),
      labels: Object.keys(countMen),
      type: 'pie',
      name: '男',
      title: '男性職業分佈',
      domain: {
          row: 0,
          column: 0
      }
  };

  let trace_Women = {
      values: Object.values(countWomen),
      labels: Object.keys(countWomen),
      type: 'pie',
      name: '女',
      title: '女性職業分佈',
      domain: {
          row: 0,
          column: 1
      }
  };

  let layout = {
      title: '各職業類別的人數分佈',
      showlegend: true,
      grid: {rows: 1, columns: 2},
  };

  let config = {responsive: true}

  Plotly.newPlot("myGraph3", [trace_Men, trace_Women], layout, config);
});