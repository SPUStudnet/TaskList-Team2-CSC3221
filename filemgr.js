/**
 * filemgr.js
 * CSC 3221
 * Main Code: Dorothy Prosser
 * Comments: Dorothy Prosser
 * Created 5/30/24
 */

const fs = require("fs/promises")

/**
 * Reads the data from listdata.json
 * @returns an array of string values read from listdata.json, -1 if there is an error
 */
async function ReadData() {
  try {
    const route = "./listdata.json";
    const data = await fs.readFile(route, "utf8");
    const thing = JSON.parse(data.toString());
    return thing;
  } catch (err) {
    console.error("Error reading file:", err);
    return -1;
  }
}

/** 
 * WriteData Function
 * @param {*} dataOut is the data that will be written when the function is called
 * returns true if the data was successfully written
 * returns false if the data was not successfully written
*/
async function WriteData(dataOut) {
  try {
    await fs.writeFile("./listdata.json", stringify(dataOut), 'utf8');
    console.log('Content written successfully');
    return true;
} catch (err) {
    console.error('Error writing to file:', err);
    return false;
}
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;
