/*******************************************************************************
 * Purpose:     Convert CSV file into JSON file
 * Created by:  Björn G. D. Persson (KiltedViking)
 * Created:     2018-07-09
 * Comments:    This Node.js program was created as assignment 1 on Microsoft's
 *              edX course Introduction to Node.js.
 *              I've chosen not to use any existing packages in an attempt to learn
 *              more. ;-)
 ******************************************************************************/
const fs = require("fs");
const csvFileName = "customer-data.csv";
const jsonFileName = "customer-data.json";

//Read data from file
var fileData = fs.readFileSync(csvFileName, "utf-8");
//Convert data to array of lines
var lines = fileData.split("\r\n");
//Remove first line with headings
var properties = lines.shift().split(",");
var lineObjects = [];

for(var i = 0; i < lines.length; i++) {
  let lineArray = lines[i].split(",");
  let lineObject = {};

  for(var j = 0; j < properties.length; j++ ) {
    lineObject[properties[j]] = lineArray[j];
  }
  
  lineObjects.push(lineObject);
}

var jsonData = JSON.stringify(lineObjects);
fs.writeFileSync(jsonFileName, jsonData);
