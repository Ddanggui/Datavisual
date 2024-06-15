let myGraph1 = document.getElementById('myGraph1');

let attributes = ['不識字', '博士', '國中', '國小', '大學', '專科', '碩士', '自修', '高中', '高職'];
let attributes2 = ['不識字', '博士', '國(初)中(初職)', '國小', '大學', '專科(五專前三年劃記高職)', '碩士', '自修', '高中', '高職'];
let data = [];

// 创建一个对象来存储每个name的总和
let nameSums = {};

for (let i = 0; i < attributes.length; i++) {
    for (let j = 0; j < eval(attributes[i]).length; j++) {
        let name = eval(attributes[i])[j]['name'];
        let count = eval(attributes[i])[j]['count'];
        if (name in nameSums) {
            nameSums[name] += count;
        } else {
            nameSums[name] = count;
        }
    }
}

for (let i = 0; i < attributes.length; i++) {
    let trace = {};
    trace.type = "bar";
    trace.name = attributes2[i];
    trace.x = [];
    trace.y = [];

    for (let j = 0; j < eval(attributes[i]).length; j++) {
        let name = eval(attributes[i])[j]['name'];
        // 检查name是否为我们要删除的值
        if (name === '武職退休(軍人)' || name === '國外(含大陸)' || name === '文職退休(含警察月退、勞工退休金月退)' || name === '') {
            continue;  // 如果是，跳过这个循环
        }
        trace.x[j] = eval(attributes[i])[j]['name'];
        // 将trace.y除以对应name之和
        trace.y[j] = eval(attributes[i])[j]['count'] / nameSums[trace.x[j]];
    }

    data.push(trace);
}

let layout = {
    margin: { t: 0 },
    title: '教育程度分佈圖',  // 添加图表标题
    barmode:'stack'
};

Plotly.newPlot("graph_disofedu", data, layout);
