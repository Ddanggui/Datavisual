// Read the CSV file
d3.csv("database/all.csv").then(function (data) {
    // Group data by age and calculate the sum of ITM40, the count of people, the max and min of ITM40 for each age
    let groupedData = data.reduce((acc, row) => {
        let age = row["AGE"];
        let income = Number(row["ITM40"]);

        if (!acc[age]) {
            acc[age] = { sum: 0, count: 0, max: income, min: income };
        }

        acc[age].sum += income;
        acc[age].count += 1;
        acc[age].max = Math.max(acc[age].max, income);
        acc[age].min = Math.min(acc[age].min, income);

        return acc;
    }, {});

    // Calculate the average income for each age
    let ages = Object.keys(groupedData);
    let avgIncomes = ages.map(age => groupedData[age].sum / groupedData[age].count);
    let maxIncomes = ages.map(age => groupedData[age].max);
    let minIncomes = ages.map(age => groupedData[age].min);

    // Create the line chart
    let traceAvg = {
        x: ages,
        y: avgIncomes,
        mode: 'lines',
        name: '平均年收入'
    };

    let traceMax = {
        x: ages,
        y: maxIncomes,
        mode: 'lines',
        name: '最大年收入'
    };

    let traceMin = {
        x: ages,
        y: minIncomes,
        mode: 'lines',
        name: '最小年收入'
    };

    let layout = {
        title: '年齡與年收入分佈圖',
        xaxis: {
            title: '年齡'
        },
        yaxis: {
            title: '年收入'
        }
    };

    Plotly.newPlot("myGraph4", [traceAvg, traceMax, traceMin], layout);
});