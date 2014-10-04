import csv
import json

monthdata = []

with open('menu.csv', 'rb') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='|')

    for row in reader:

        data = {}

        month, date, year, entree, side, veggie, holiday = row

        data['month'] = month
        data['date'] = date
        data['year'] = year
        data['entree'] = entree
        data['side'] = side
        data['veggie'] = veggie

        monthdata.append(data)


print json.dumps(monthdata)
