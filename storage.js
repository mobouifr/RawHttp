const fs = require('fs');

async function loadData()
{
    try 
    {
        const data = await fs.promises.readFile("./data.json", "utf-8");
        return (JSON.parse(data));
    }
    catch (error)
    {
        console.error("Error loading data:", error);
        return ([]);
    }
}

async function saveData(data)
{
    const jsonData = JSON.stringify(data, null, 4);
   
    try
    {
        await fs.promises.writeFile("./data.json", jsonData, "utf-8");
    }
    catch (error)
    {
        console.error("500 Internal Server Error");
    }
}

module.exports = {loadData, saveData};