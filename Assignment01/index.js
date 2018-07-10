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

var fileData = fs.readFileSync(csvFileName, "utf-8"); //Read CSV file
var lines = fileData.split("\r\n");         //Convert data to array of lines
var properties = lines.shift().split(",");  //Remove first line with headings
var lineObjects = [];                       //Init. array to store objects in

//For each line in file...
for(var i = 0; i < lines.length; i++) {
  let lineArray = lines[i].split(",");      //Convert line to array
  let lineObject = {};                      //Initialise object

  //For each heading in file...
  for(var j = 0; j < properties.length; j++ ) {
    lineObject[properties[j]] = lineArray[j]; //... add property w value from current line
  }
  
  lineObjects.push(lineObject);             //Add object to array
}

var jsonData = JSON.stringify(lineObjects); //Convert array of objects to JSON
fs.writeFileSync(jsonFileName, jsonData);   //Save to JSON file
