const fs = require('fs');

function loadData()
{
    try 
    {
        const data = fs.readFileSync("./data.json", "utf-8");
        return (JSON.parse(data));
    }
    catch (error)
    {
        console.error("Error loading data:", error);
        return ([]);
    }
}

function saveData(data)
{
    const jsonData = JSON.stringify(data, null, 4);
    fs.writeFileSync("./data.json", jsonData, "utf-8");

}

module.exports = {loadData, saveData};