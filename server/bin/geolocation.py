import json
import googlemaps
import os
gmaps = googlemaps.Client(key=os.environ['GOOGLEMAPS_API_KEY'])

with open('data.json') as f:
    crimeDataSet = json.loads(f.read())

print("Working on {} entries from the data set.".format(len(crimeDataSet)))

for entry in crimeDataSet:
    fixed_location = entry['Location'].replace(' BLOCK', '') + ' Miami'
    try:
        geocode_result = gmaps.geocode(fixed_location)[0]
        lat_lon = geocode_result['geometry']['location']
        entry['location'] = [lat_lon['lng'], lat_lon['lat']]
    except:
        print('\tFailed to find geocode for location: {}'.format(fixed_location))

with open('dataGeocoded.json', 'w') as outfile:
    json.dump(crimeDataSet, outfile)
print('Finished writing out geocode appended JSON file.')