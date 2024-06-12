// Read the CSV file
d3.csv("database/all.csv").then(function (data) {
  console.log(data);

  // Filter data for males
  let dataMen = data.filter((row) => row["SEX"] === "男");
  // Filter data for females
  let dataWomen = data.filter((row) => row["SEX"] === "女");

  // Aggregate total income and count per age group for men
  let ageGroupSumsMen = dataMen.reduce((acc, row) => {
    if (!acc[row.AGE]) acc[row.AGE] = { totalIncome: 0, count: 0 };
    acc[row.AGE].totalIncome += +row.ITM40;
    acc[row.AGE].count += 1;
    return acc;
  }, {});

  // Calculate average income per age group for men
  let averageIncomeByAgeMen = Object.keys(ageGroupSumsMen).map((age) => ({
    age,
    averageIncome:
      ageGroupSumsMen[age].totalIncome / ageGroupSumsMen[age].count,
  }));

  // Adjust trace_Men for visualization
  let trace_Men = {
    type: "bar",
    x: averageIncomeByAgeMen.map((item) => item.age),
    y: averageIncomeByAgeMen.map((item) => item.averageIncome),
    name: "Men",
    marker: { color: "blue" },
  };

  // Repeat the process for women
  let ageGroupSumsWomen = dataWomen.reduce((acc, row) => {
    if (!acc[row.AGE]) acc[row.AGE] = { totalIncome: 0, count: 0 };
    acc[row.AGE].totalIncome += +row.ITM40;
    acc[row.AGE].count += 1;
    return acc;
  }, {});

  let averageIncomeByAgeWomen = Object.keys(ageGroupSumsWomen).map((age) => ({
    age,
    averageIncome:
      ageGroupSumsWomen[age].totalIncome / ageGroupSumsWomen[age].count,
  }));
  let trace_Women = {
    type: "bar",
    x: averageIncomeByAgeWomen.map((item) => item.age),
    y: averageIncomeByAgeWomen.map((item) => item.averageIncome),
    name: "Women",
    marker: { color: "pink" },
  };

  let layout = {
    title: "Average Annual Income by Age Group: A Gender Comparison",
    xaxis: {
      title: "Age Group",
    },
    yaxis: {
      title: "Average Annual Income",
    },
  };

  Plotly.newPlot("graph_SEX-ITM", [trace_Men, trace_Women], layout);
});
