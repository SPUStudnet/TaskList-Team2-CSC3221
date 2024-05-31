const fs = require("fs/promises");
const route = "./listdata.json";

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
 * This function and AddItem both read the entire list into server memory to add one item.
 * This is incredibly inefficient and should probably be fixed.
 * @param {} index 
 * @param {*} stringData 
 * @returns 
 */
async function ModifyItem(index, stringData) {
  try {
    const data = await fs.readFile(route, "utf8");
    const list = JSON.parse(data.toString());

    if (list.length >= index) {
      if (stringData == "") {
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

async function AddItem(stringData) {
  try {
    const data = await fs.readFile(route, "utf8");
    const list = JSON.parse(data.toString());
    list.push(stringData);
    await fs.writeFile("./listdata.json", JSON.stringify(list), "utf8");
    return true;
  }
  catch (error) {
    console.error("Could not write to file: ", error);
    return false;
  }

}

exports.AddItem = AddItem;
exports.ReadData = ReadData;
exports.WriteData = WriteData;
exports.ModifyItem = ModifyItem;
