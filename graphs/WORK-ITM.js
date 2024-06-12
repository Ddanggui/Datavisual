d3.csv("database/all.csv").then(function (data) {
  let dataRetail = data.filter((row) => row["IND"] === "批發及零售業");
  let dataManufacturing = data.filter((row) => row["IND"] === "製造業");
  let dataFinance = data.filter((row) => row["IND"] === "金融及保險業");
  let dataProfessional = data.filter(
    (row) => row["IND"] === "專業、科學及技術服務業"
  );
  let dataEducation = data.filter((row) => row["IND"] === "教育服務業");
  let dataHealth = data.filter(
    (row) => row["IND"] === "醫療保健及社會工作服務業"
  );
  let dataArts = data.filter((row) => row["IND"] === "藝術、娛樂及休閒服務業");
  let dataAccommodation = data.filter((row) => row["IND"] === "住宿及餐飲業");
  let dataInformation = data.filter((row) => row["IND"] === "資訊及通訊業");
  let dataTransport = data.filter((row) => row["IND"] === "運輸及倉儲業");
  let dataOther = data.filter((row) => row["IND"] === "其他服務業");
  let dataSupport = data.filter((row) => row["IND"] === "支援服務業");
  let dataFarming = data.filter((row) => row["IND"] === "農、牧業");
  let dataNoWork = data.filter(
    (row) => row["IND"] === "無業者（含無職業家庭之經濟戶長）"
  );

  let dataRetailValues = dataRetail.map((row) => +row.ITM40);
  let dataManufacturingValues = dataManufacturing.map((row) => +row.ITM40);
  let dataFinanceValues = dataFinance.map((row) => +row.ITM40);
  let dataProfessionalValues = dataProfessional.map((row) => +row.ITM40);
  let dataEducationValues = dataEducation.map((row) => +row.ITM40);
  let dataHealthValues = dataHealth.map((row) => +row.ITM40);
  let dataArtsValues = dataArts.map((row) => +row.ITM40);
  let dataAccommodationValues = dataAccommodation.map((row) => +row.ITM40);
  let dataInformationValues = dataInformation.map((row) => +row.ITM40);
  let dataTransportValues = dataTransport.map((row) => +row.ITM40);
  let dataOtherValues = dataOther.map((row) => +row.ITM40);
  let dataSupportValues = dataSupport.map((row) => +row.ITM40);
  let dataFarmingValues = dataFarming.map((row) => +row.ITM40);
  let dataNoWorkValues = dataNoWork.map((row) => +row.ITM40);

  var colors = [
    "rgba(93, 164, 214, 0.5)",
    "rgba(255, 144, 14, 0.5)",
    "rgba(44, 160, 101, 0.5)",
    "rgba(255, 65, 54, 0.5)",
    "rgba(207, 114, 255, 0.5)",
    "rgba(127, 96, 0, 0.5)",
    "rgba(255, 140, 184, 0.5)",
    "rgba(79, 90, 117, 0.5)",
    "rgba(222, 223, 0, 0.5)",
    "rgba(0, 0, 0, 0.5)",
  ];

  var traceRetail = {
    y: dataRetailValues,
    type: "box",
    name: "Annual Income in Retail Industry",
    // jitter: 0.5,
    pointpos: -1.8,
    marker: {
      color: colors[0],
    },
    boxmean: true,
    boxpoints: false,
  };

  var traceManufacturing = {
    y: dataManufacturingValues,
    type: "box",
    name: "Annual Income in Manufacturing Industry",
    marker: {
      color: colors[1],
    },
    boxmean: true,
    boxpoints: false,
  };

  var traceFinance = {
    y: dataFinanceValues,
    type: "box",
    name: "Annual Income in Finance Industry",
    marker: {
      color: colors[2],
      outliercolor: "rgba(219, 64, 82, 0.6)",
      line: {
        outliercolor: "rgba(219, 64, 82, 1.0)",
        outlierwidth: 2,
      },
    },
    boxmean: true,
    boxpoints: "suspectedoutliers",
  };

  var traceProfessional = {
    y: dataProfessionalValues,
    type: "box",
    name: "Annual Income in Professional",
    marker: {
      color: colors[3],
    },
    boxmean: true,
    boxpoints: false,
  };

  var traceEducation = {
    y: dataEducationValues,
    type: "box",
    name: "Annual Income in Education",
    marker: {
      color: colors[4],
    },
    boxmean: true,
    boxpoints: false
  };

  var traceHealth = {
    y: dataHealthValues,
    type: "box",
    name: "Annual Income in Health",
    marker: {
      color: colors[5],
    },
    boxmean: true,
    boxpoints: false,
  };

  var traceArts = {
    y: dataArtsValues,
    type: "box",
    name: "Annual Income in Arts",
    marker: {
      color: colors[6],
    },
    boxmean: true,
    boxpoints: false
  };

  var traceAccommodation = {
    y: dataAccommodationValues,
    type: "box",
    name: "Annual Income in Accommodation",
    marker: {
      color: colors[7],
    },
    boxmean: true,
    boxpoints: false
  };

  var traceInformation = {
    y: dataInformationValues,
    type: "box",
    name: "Annual Income in Information",
    marker: {
      color: colors[8],
    },
    boxmean: true,
    boxpoints: false
  };

  var traceTransport = {
    y: dataTransportValues,
    type: "box",
    name: "Annual Income in Transport",
    marker: {
      color: colors[9],
    },
    boxmean: true,
    boxpoints: false
  };

  var traceOther = {
    y: dataOtherValues,
    type: "box",
    name: "Annual Income in Other",
    marker: {
      color: colors[0],
    },
    boxmean: true,
    boxpoints: false
  };

  var traceSupport = {
    y: dataSupportValues,
    type: "box",
    name: "Annual Income in Support",
    marker: {
      color: colors[1],
    },
    boxmean: true,
    boxpoints: false
  };

  var traceFarming = {
    y: dataFarmingValues,
    type: "box",
    name: "Annual Income in Farming",
    marker: {
      color: colors[2],
    },
    boxmean: true,
    boxpoints: false
  };

  var traceNoWork = {
    y: dataNoWorkValues,
    type: "box",
    name: "Annual Income in No Work",
    marker: {
      color: colors[3],
    },
    boxmean: true,
    boxpoints: false
  };

  var data_1 = [
    traceRetail,
    traceManufacturing,
    traceFinance,
    traceProfessional,
    traceEducation,
    traceHealth,
    traceArts,
  ];

  var data_2 = [
    traceAccommodation,
    traceInformation,
    traceTransport,
    traceOther,
    traceSupport,
    traceFarming,
    traceNoWork,
  ];

  var layout_1 = {
    title: "Income Distribution by Occupation",
  };

  var layout_2 = {
    title: "",
  };

  Plotly.newPlot("graph_WORK-ITM-1", data_1, layout_1);
  Plotly.newPlot("graph_WORK-ITM-2", data_2, layout_2);
});
