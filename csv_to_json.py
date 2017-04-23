import csv
import json
from collections import defaultdict

file = open("src/govtData.csv")
reader = csv.reader(file)
data = list(reader)
header1 = data[0]
header2 = data[1]
state_data = data[2:]
out_json = {}
defaultdict(lambda : {})
for i, row in enumerate(state_data):
    header_dict = defaultdict(lambda : {})
    for j, val in enumerate(row[1:]):
        header_dict[header1[j + 1]][header2[j + 1]] = val
    out_json[row[0]] = header_dict
file.close()
print out_json

with open("data.json","w") as out:
    json.dump(out_json, out)
