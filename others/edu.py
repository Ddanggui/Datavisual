import pandas as pd
#生成edu.js文件，可以刪除
# 读取CSV文件
df = pd.read_csv('平均年收入\\all.csv')

# 按照EDU和WORKPLACE属性对数据进行分组，并计算每个组的数量
grouped = df.groupby(['EDU', 'WORKPLACE']).size().reset_index(name='count')

# 打开一个新的JavaScript文件
with open('edu.js', 'w', encoding='utf-8') as f:
    # 对于每个EDU属性
    for edu in grouped['EDU'].unique():
        # 获取这个EDU属性的所有数据
        data = grouped[grouped['EDU'] == edu]
        # 写入JavaScript变量的定义
        f.write('let ' + edu + ' = [\n')
        # 对于这个EDU属性的每个数据
        for _, row in data.iterrows():
            # 写入JavaScript对象的定义
            f.write('    {"name": "' + row['WORKPLACE'] + '", "count": ' + str(row['count']) + '},\n')
        # 写入JavaScript数组的结束
        f.write('];\n\n')