import csv
import json
#生成ITM40.JSON文件，可以刪除
# 读取CSV文件
with open('all.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    data = list(reader)

# 创建一个字典，键是WORKPLACE，值是一个包含所有相应ITM40值的列表
workplace_dict = {}
for row in data:
    if row['WORKPLACE'] not in workplace_dict:
        workplace_dict[row['WORKPLACE']] = []
    workplace_dict[row['WORKPLACE']].append(int(row['ITM40']))

# 计算每个WORKPLACE的平均ITM40值
avg_income_dict = []
for workplace, itm40_list in workplace_dict.items():
    avg_income = sum(itm40_list) / len(itm40_list)
    avg_income_dict.append({"縣市別": workplace, "收入": avg_income})

# 将结果写入JSON文件
with open('ITM40.JSON', 'w', encoding='utf-8') as f:
    json.dump(avg_income_dict, f, ensure_ascii=False, indent=4)