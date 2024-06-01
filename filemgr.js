/**
 * filemgr.js
 * File manager for list project.
 * 
 * CSC 3221
 * 
 * Joyce Tang
 * Kyler Veenstra
 * Dorothy Prosser
 * 5/31/2024
 * 
 */


const fs = require("fs/promises");
const route = "./listdata.json";

/**
 * Reads the data from listdata.json
 * @returns an array of string values read from listdata.json, -1 if there is an error
 */
async function ReadData() {
	try {
		const data = await fs.readFile(route, "utf8");
		const thing = JSON.parse(data.toString());
		return thing;
	} catch (err) {
		console.error("Error reading file:", err);
		return -1;
	}
}

/**
 * WriteData
 * Write all of dataOut to the file.
 * @param {} dataOut The data to write
 * @returns True if successful. False otherwise.
 */
async function WriteData(dataOut) {
	try {
		await fs.writeFile("./listdata.json", stringify(dataOut), "utf8");
		console.log("Content written successfully");
		return true;
	} catch (err) {
		console.error("Error writing to file:", err);
		return false;
	}
}


/**
 * ModifyItem
 * This function and AddItem both read the entire list into server memory to add one item.
 * This is incredibly inefficient and should probably be fixed.
 * @param {} index The index to modify.
 * @param {*} stringData The data to change the item to.
 * @returns True if successful. False otherwise.
 */
async function ModifyItem(index, stringData) {
  try {
    const data = await fs.readFile(route, "utf8");
    const list = JSON.parse(data.toString());

    if (list.length >= index) {
      if (stringData == "") {
        // If the item passed is empty, simply remove the item from the list.
        list.splice(index, 1);
      }
      else {
        list[index] = stringData;
      }
      
    }
    else {
      throw new Error("Index requested does not exist!");
    }
    await fs.writeFile("./listdata.json", JSON.stringify(list), "utf8");
    return true;
  } catch (err) {
    console.error("Could not write to file: ", err);
    return false;
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
    await fs.writeFile("./listdata.json", JSON.stringify(dataOut), 'utf8');
    console.log('Content written successfully');
    return true;
} catch (err) {
    console.error('Error writing to file:', err);
    return false;
}
}

/**
 * AddItem
 * Add an item to the list.
 * This function and modify reads the entire list into server memory to add one item.
 * This is incredibly inefficient and should probably be fixed.
 * @param {} index The index to add at.
 * @param {*} stringData The data to add.
 * @returns true if successful. False otherwise.
 */
async function AddItem(index, stringData) {
  try {
    console.log(stringData);
    const data = await fs.readFile(route, "utf8");
    const list = JSON.parse(data.toString());

    if (list.length >= index) {
      if (stringData == "") {
        list.splice(index, 1);
      }
      else {
        list.push(stringData);
      }
    }
    else {
      throw new Error("Index requested does not exist!");
    }
    await fs.writeFile("./listdata.json", JSON.stringify(list), "utf8");
    return true;
  } catch (err) {
    console.error("Could not write to file: ", err);
    return false;
  }
}

/**
 * DeleteItem
 * @returns true if successful.
 */
async function DeleteItem() {
  try {
    const data = await fs.readFile(route, "utf8");
    const list = JSON.parse(data.toString());
    if (list.length > 0) {
      list.shift();
      WriteData(list);
      return true;
    }
    else {
      return false;
    }

  } catch {
    console.error("Could not delete from file: ", error);
    return false;
  }
}

exports.AddItem = AddItem;
exports.ReadData = ReadData;
exports.WriteData = WriteData;
exports.ModifyItem = ModifyItem;
exports.DeleteItem = DeleteItem;
