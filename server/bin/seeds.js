const csv = require('csvtojson')
const fs = require('fs')
const Hazard = require('../models/Hazard')
const mongoose = require('mongoose')

function connectToDB() {
    const uri = process.env.MONGODB_URI || `mongodb://localhost/willISurvive`
    mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(db => console.log(`Connected to Mongo! Database name: "${db.connections[0].name}"`))
        .catch(err => console.error('Error connecting to mongo', err))
    var db = mongoose.connection;
    db.collection('willISurvive').conn.collections.hazards.createIndex({ location: "2dsphere" })
}

/**
 * This is meant to be run on data.csv coming in from Talal.  It only converts to JSON and hardcodes the filepath.
 */
function convertCSVtoJSON() {
    csv()
        .fromFile('data.csv')
        .then((crimeDataSet) => {
            fs.writeFile("data.json", JSON.stringify(crimeDataSet), 'utf8', function(err) {
                if (err) {
                    console.log("An error occurred while writing JSON Object to File.");
                    return console.log(err);
                }
                console.log("JSON file has been saved.");
            });
        })
}

/**
 * This is meant to be run on dataGeocoded (After running geolocation.py).  
 * It renames all fields to the proper field names in Hazard.
 */
function fillCollectionFromJSON() {
    connectToDB()
    let rawData = fs.readFileSync('./dataGeocoded.json');
    let crimeDataSet = JSON.parse(rawData);

    let crimeDataSetCorrected = crimeDataSet.map((crimeData, i) => {
        const { Description, Location, Agency, location } = crimeData
        const incidentNum = crimeData['Incident#']
        const crimeDate = crimeData['Date']
        return {
            description: Description,
            address: Location,
            agency: Agency,
            date: crimeDate,
            location: {
                type: "Point",
                coordinates: location || [0, 0]
            },
            incidentNum
        }
    })

    Hazard.collection.insertMany(crimeDataSetCorrected, function(err, results) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Multiple documents inserted to Collection...closing...");
            mongoose.connection.close()
        }
    });
}

module.exports = {
    fillCollectionFromJSON,
    convertCSVtoJSON
}