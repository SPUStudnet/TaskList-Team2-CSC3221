const fs = require("fs/promises")

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