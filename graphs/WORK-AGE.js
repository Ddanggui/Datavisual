// Read the CSV file
d3.csv("database/all.csv").then(function (data) {
    let incomeData = {};

    // Calculate total income and count for each workplace and age
    data.forEach(function(row) {
        let workplace = row['WORKPLACE'];
        let age = row['AGE'];
        let income = parseInt(row['ITM40']);

        // Skip if workplace is empty
        if (workplace === '') {
            return;
        }

        if (!incomeData[workplace]) {
            incomeData[workplace] = {};
        }

        if (!incomeData[workplace][age]) {
            incomeData[workplace][age] = { totalIncome: 0, count: 0 };
        }

        incomeData[workplace][age].totalIncome += income;
        incomeData[workplace][age].count += 1;
    });

    let workplaces = [];
    let ages = [];
    let averageIncomes = [];

    // Calculate average income for each workplace and age
    for (let workplace in incomeData) {
        for (let age in incomeData[workplace]) {
            workplaces.push(workplace);
            ages.push(age);
            averageIncomes.push(incomeData[workplace][age].totalIncome / incomeData[workplace][age].count);
        }
    }

    let trace = {
        x: workplaces,
        y: ages,
        z: averageIncomes,
        type: 'heatmap'
    };

    let layout = {
        title: '縣市與年齡層的平均收入分佈',
        xaxis: { title: '工作縣市' },
        yaxis: { title: '年齡' }
    };

    Plotly.newPlot("myGraph6", [trace], layout);
});